import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGetProductBySlugQuery } from "storeRedux/productsApi";
import PlusSubtle from "assets/svg/PlusSubtle";
import Minus from "assets/svg/Minus";
import { addProductToCart } from "utils/card";
import ProductAttributes from "../ProductAttributes";
import { parseDescription } from "utils/text";
import { Attribute, SelectedAttributes } from "storeRedux/types";
import { groupAttributes } from "utils/groupAttributes";
import styles from "./index.module.scss";
import { getAvailableAttributeValues } from "utils/getAvailableAttributeValuesProductCard";

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
  const [selectedAttributes, setSelectedAttributes] = useState<
    SelectedAttributes[]
  >([]);

  const { t } = useTranslation();

  const selected = useMemo(() => {
    return Object.fromEntries(
      selectedAttributes.map(({ parameter, attribute }) => [
        parameter,
        attribute,
      ])
    );
  }, [selectedAttributes]);

  useEffect(() => {
    setCount(1);
  }, [selected]);

  const getSelectedVariantData = (
    attributes: Attribute[],
    selectedAttributes: SelectedAttributes[]
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
      const selected: SelectedAttributes[] = [];

      product.attributes.forEach((attr) => {
        const entries = [
          {
            name: attr.attribute_main,
            value: attr.value_main,
            qty: parseInt(attr.quantity || "0"),
          },
          {
            name: attr.attribute_secondary,
            value: attr.value_secondary,
            qty: parseInt(attr.quantity || "0"),
          },
          {
            name: attr.attribute_tertiary,
            value: attr.value_tertiary,
            qty: parseInt(attr.quantity || "0"),
          },
        ];

        entries.forEach(({ name, value, qty }) => {
          if (name && value && qty > 0) {
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
          selected.push({ parameter: name, attribute: values[0] });
        }
      }

      setSelectedAttributes(selected);
    }
  }, [product]);

  const variant = useMemo(
    () => getSelectedVariantData(product?.attributes ?? [], selectedAttributes),
    [product?.attributes, selectedAttributes]
  );
  console.log(product);

  useEffect(() => {
    const updateMaxCount = () => {
      if (!product?.attributes) return;

      const cart = JSON.parse(localStorage.getItem("cart") || "[]");

      if (product.attributes.length === 0) {
        const productInCart = cart.find((p: any) => p.slug === productId);
        const maxAddable = Math.max(
          +product?.quantity - productInCart?.quantity,
          0
        );
        setMaxCount(productInCart ? maxAddable : +product?.quantity);
        return;
      }

      const variant = getSelectedVariantData(
        product.attributes,
        selectedAttributes
      );
      const qty = parseInt(variant?.quantity || "0");

      const productInCart = cart.find(
        (p: any) =>
          p.slug === productId &&
          p.attributes[0]?.attributeName === selectedAttributes[0]?.attribute &&
          (p.attributes[1]?.attributeName === undefined ||
            p.attributes[1]?.attributeName ===
              selectedAttributes[1]?.attribute) &&
          (p.attributes[2]?.attributeName === undefined ||
            p.attributes[2]?.attributeName === selectedAttributes[2]?.attribute)
      );

      const alreadyInCart = productInCart?.quantity || 0;
      const maxAddable = Math.max(qty - alreadyInCart, 0);
      const alreadyInCartMaxAddable = Math.max(
        +product.quantity - alreadyInCart,
        0
      );

      if (variant) {
        setMaxCount(maxAddable);
      } else if (alreadyInCart) {
        setMaxCount(alreadyInCartMaxAddable);
      } else {
        setMaxCount(+product.quantity);
      }
    };

    updateMaxCount(); // перший запуск

    window.addEventListener("cartUpdated", updateMaxCount);
    return () => window.removeEventListener("cartUpdated", updateMaxCount);
  }, [selectedAttributes, product, productId, product?.attributes]);

  if (isLoading) return <div>...</div>;
  if (isError || !product) return <div>Data loading error</div>;

  const { slug, name, image, price, quantity, description, attributes } =
    product;

  const extraPrice = variant ? parseFloat(variant.extraPrice) || 0 : 0;
  const fullPrice = Number(price) + extraPrice;

  const handleIncrement = () => setCount((prev) => prev + 1);
  const handleDecrement = () => setCount((prev) => (prev > 1 ? prev - 1 : 1));

  const grouped = groupAttributes(attributes || []);

  const onAddToCart = () => {
    addProductToCart(slug, +fullPrice, count, selectedAttributes);
    setMaxCount((prev) => prev - count);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleSelectAttribute = (name: string, value: string) => {
    const valueAsValues: SelectedAttributes = {
      parameter: name,
      attribute: value,
    };
    setSelectedAttributes((prev) => {
      const existsIndex = prev.findIndex((attr) => attr.parameter === name);

      if (existsIndex !== -1) {
        const updated = [...prev];
        updated[existsIndex] = valueAsValues;
        return updated;
      }

      return [...prev, valueAsValues];
    });
  };

  const availableValues = getAvailableAttributeValues(
    product.attributes ?? [],
    selectedAttributes
  );

  const availableValuesArray = Object.values(availableValues).flatMap((set) => [
    ...set,
  ]);

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
          {fullPrice.toFixed(2)}
          {t("currency")}
        </p>
        {inStock ? (
          <p className={styles.inStock}>In stock</p>
        ) : (
          <p className={styles.outStock}>Out of stock</p>
        )}
        {quantity ? (
          <>
            {grouped.map(({ name, values }) => (
              <ProductAttributes
                key={name}
                title={name}
                values={values}
                selectedValue={
                  selectedAttributes.find((attr) => attr.parameter === name)
                    ?.attribute
                }
                onSelect={handleSelectAttribute}
                availableValues={availableValuesArray}
              />
            ))}

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
