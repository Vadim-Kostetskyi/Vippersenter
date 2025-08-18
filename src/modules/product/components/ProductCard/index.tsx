import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGetProductBySlugQuery } from "storeRedux/productsApi";
import PlusSubtle from "assets/svg/PlusSubtle";
import Minus from "assets/svg/Minus";
import { addProductToCart } from "utils/card";
import ProductAttributes from "../ProductAttributes";
import styles from "./index.module.scss";
import { parseDescription } from "utils/text";
import { Attribute } from "storeRedux/types";

interface Value {
  name: string;
  attributeName: string;
}

interface SelectedAttributes {
  name: string;
  attributeName: string;
}

const groupAttributes = (
  attrs: {
    attribute_main: string;
    value_main: string;
    attribute_secondary?: string;
    value_secondary?: string;
    attribute_tertiary?: string;
    value_tertiary?: string;
  }[]
): { name: string; values: string[] }[] => {
  const grouped: { name: string; values: string[] }[] = [];

  attrs.forEach((attr) => {
    const entries = [
      { name: attr.attribute_main, value: attr.value_main },
      { name: attr.attribute_secondary, value: attr.value_secondary },
      { name: attr.attribute_tertiary, value: attr.value_tertiary },
    ];

    entries.forEach(({ name, value }) => {
      if (!name || !value) return;

      const existing = grouped.find((item) => item.name === name);
      if (existing) {
        if (!existing.values.includes(value)) {
          existing.values.push(value);
        }
      } else {
        grouped.push({ name, values: [value] });
      }
    });
  });

  return grouped;
};

const ProductCard = () => {
  const { productId } = useParams();
  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductBySlugQuery(productId ?? "");
  const [loaded, setLoaded] = useState(false);
  const [count, setCount] = useState(1);
  const [maxCount, setMaxCount] = useState(0);
  const [selectedAttributes, setSelectedAttributes] = useState<Value[]>([]);

  const { t } = useTranslation();

  const selected = useMemo(() => {
    return Object.fromEntries(
      selectedAttributes.map(({ name, attributeName }) => [name, attributeName])
    );
  }, [selectedAttributes]);

  useEffect(() => {
    setCount(1);
  }, [selected]);


  const getSelectedVariantData = (
    attributes: Attribute[],
    selectedAttributes: Value[]
  ): Attribute | null => {
    if (selectedAttributes.length === 0) return null;

    return (
      attributes.find((attr) => {
        const mainMatch =
          attr.attribute_main &&
          attr.value_main === selected[attr.attribute_main];
        const secondaryMatch =
          attr.attribute_secondary &&
          attr.value_secondary === selected[attr.attribute_secondary];
        const tertiaryMatch =
          attr.attribute_tertiary &&
          attr.value_tertiary === selected[attr.attribute_tertiary];        

        if (selectedAttributes.length === 3) {
          return mainMatch && secondaryMatch && tertiaryMatch;
        } else if (selectedAttributes.length === 1) {
          return mainMatch;
        }
      }) ?? null
    );
  };

  useEffect(() => {
    if (product?.attributes && product.attributes.length > 0) {
      const grouped: Record<string, Set<string>> = {};
      const selected: Value[] = [];

      product.attributes.forEach((attr) => {
        const entries = [
          { name: attr.attribute_main, value: attr.value_main },
          { name: attr.attribute_secondary, value: attr.value_secondary },
          { name: attr.attribute_tertiary, value: attr.value_tertiary },
        ];

        entries.forEach(({ name, value }) => {
          if (name && value) {
            if (!grouped[name]) {
              grouped[name] = new Set();
            }
            grouped[name].add(value);
          }
        });
      });

      for (const name in grouped) {
        const values = Array.from(grouped[name]);

        if (values.length > 0) {
          selected.push({ name, attributeName: values[0] });
        }
      }
      setSelectedAttributes(selected);
    }
  }, [product]);

  const variant = useMemo(
    () => getSelectedVariantData(product?.attributes ?? [], selectedAttributes),
    [product?.attributes, selectedAttributes]
  );

  useEffect(() => {
    if (!product?.attributes) return;

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    if (product.attributes.length === 0) {
      const productInCart = cart.find((p: any) => p.slug === productId); 
      const maxAddable = Math.max(+product?.quantity - productInCart?.quantity, 0);

      setMaxCount(productInCart ? maxAddable : +product?.quantity);
      return
    }

    const variant = getSelectedVariantData(
      product.attributes,
      selectedAttributes
    );
    const qty = parseInt(variant?.quantity || "0");

    const productInCart = cart.find(
      (p: any) =>
        p.slug === productId &&
        p.attributes[0]?.attributeName ===
        selectedAttributes[0]?.attributeName
        &&
        (p.attributes[1]?.attributeName === undefined ||
          p.attributes[1]?.attributeName ===
        selectedAttributes[1]?.attributeName
    )
      &&
        (p.attributes[2]?.attributeName === undefined ||
          p.attributes[2]?.attributeName ===
            selectedAttributes[2]?.attributeName)
    );

    const alreadyInCart = productInCart?.quantity || 0;
    const maxAddable = Math.max(qty - alreadyInCart, 0);

    if (variant) {
      setMaxCount(maxAddable);
    }
    else {
      setMaxCount(+product.quantity);
    }
  }, [selectedAttributes, product, productId]);

  if (isLoading) return <div>...</div>;
  if (isError || !product) return <div>Data loading error</div>;

  const { slug, name, image, price, quantity, description, attributes } =
    product;

  const extraPrice = variant ? parseFloat(variant.extraPrice) || 0 : 0;
  const displayPrice = Number(price) + extraPrice;

  const handleIncrement = () => setCount((prev) => prev + 1);
  const handleDecrement = () => setCount((prev) => (prev > 1 ? prev - 1 : 1));

  const grouped = groupAttributes(attributes || []);

  const onAddToCart = () => {
    addProductToCart(slug, +price, count, selectedAttributes);
    setMaxCount((prev) => prev - count);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleSelectAttribute = (name: string, value: string) => {
    const valueAsValues: Value = {
      name,
      attributeName: value,
    };
    setSelectedAttributes((prev) => {
      const existsIndex = prev.findIndex((attr) => attr.name === name);

      if (existsIndex !== -1) {
        const updated = [...prev];
        updated[existsIndex] = valueAsValues;
        return updated;
      }

      return [...prev, valueAsValues];
    });
  };

  const getAvailableAttributeValues = (
    attributes: Attribute[],
    selected: SelectedAttributes[]
  ): {
    mainValues: Set<string>;
    secondaryValues: Set<string>;
    tertiaryValues: Set<string>;
  } => {
    const mainValues = new Set<string>();
    const secondaryValues = new Set<string>();
    const tertiaryValues = new Set<string>();

    attributes.forEach((attr) => {
      const qty = parseInt(attr.quantity || "0");
      if (qty <= 0) return;

      const isCompatible = (checkAttrName: string) => {
        return selected.every(({ name, attributeName }) => {
          if (name === checkAttrName) return true;
          if (name === attr.attribute_main)
            return attr.value_main === attributeName;
          if (name === attr.attribute_secondary)
            return attr.value_secondary === attributeName;
          if (name === attr.attribute_tertiary)
            return attr.value_tertiary === attributeName;
          return true;
        });
      };

      if (isCompatible(t("filter.bend")) && attr.attribute_main) {
        mainValues.add(attr.value_main);
      }
      if (
        isCompatible(t("filter.thickness")) &&
        attr.attribute_secondary &&
        attr.value_secondary
      ) {
        secondaryValues.add(attr.value_secondary);
      }
      if (
        isCompatible(t("filter.length")) &&
        attr.attribute_tertiary &&
        attr.value_tertiary
      ) {
        tertiaryValues.add(attr.value_tertiary);
      }
      if (isCompatible(t("filter.volume")) && attr.attribute_main) {
        mainValues.add(attr.value_main);
      }
    });

    return { mainValues, secondaryValues, tertiaryValues };
  }

  const availableValues = getAvailableAttributeValues(
    product.attributes ?? [],
    selectedAttributes
  );

  const inStock = variant ? variant?.quantity : product.quantity;

  return (
    <div className={styles.productCard}>
      <img
        src={image}
        alt=""
        className={`${styles.image} ${loaded ? styles.loaded : ""}`}
        onLoad={() => setLoaded(true)}
      />
      <div className={styles.infoBox}>
        <h1 className={styles.title}>{name}</h1>
        <p className={styles.price}>
          {displayPrice.toFixed(2)}
          {t("currency")}
        </p>
        {inStock ? (
          <p className={styles.inStock}>In stock</p>
        ) : (
          <p className={styles.outStock}>Out of stock</p>
        )}
        {quantity ? (
          <>
            {grouped.map(({ name, values }) => {
              let available: Set<string> = new Set();

              if (name === t("filter.bend"))
                available = availableValues.mainValues;
              else if (name === t("filter.thickness"))
                available = availableValues.secondaryValues;
              else if (name === t("filter.length"))
                available = availableValues.tertiaryValues;
              else if (name === t("filter.volume"))
                available = availableValues.mainValues;

              return (
                <ProductAttributes
                  key={name}
                  title={name}
                  values={values}
                  selectedValue={
                    selectedAttributes.find((attr) => attr.name === name)
                      ?.attributeName
                  }
                  onSelect={handleSelectAttribute}
                  availableValues={available}
                />
              );
            })}

            <p className={styles.quantity}>{t("product.quantity")}</p>

            <div className={styles.quantityBox}>
              <button
                className={count === 1 ? styles.disable : ""}
                onClick={handleDecrement}
              >
                <Minus />
              </button>
              <input
                type="number"
                value={count > maxCount ? maxCount : count}
                min={1}
                max={maxCount}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val >= 1 && val <= maxCount) {
                    setCount(val);
                  } else if (val > maxCount) {
                    setCount(maxCount);
                  }
                }}
              />

              <button
                className={maxCount <= count ? styles.disable : ""}
                onClick={handleIncrement}
                disabled={count >= maxCount}
              >
                <PlusSubtle />
              </button>
            </div>
            <button
              className={maxCount < count ? styles.disable : ""}
              style={{
                padding: 15,
                backgroundColor: "black",
                color: "white",
                marginBottom: 15,
              }}
              onClick={onAddToCart}
              disabled={maxCount < count}
            >
              {t("form.addToCard")}
            </button>
          </>
        ) : null}

        <h2 className={styles.description}>{t("form.description")}</h2>
        <div className={styles.descriptionText}>
          {parseDescription(description)}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
