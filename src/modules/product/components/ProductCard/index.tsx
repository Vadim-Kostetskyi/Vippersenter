import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGetProductByIdQuery } from "storeRedux/productsApi";
import PlusSubtle from "assets/svg/PlusSubtle";
import Minus from "assets/svg/Minus";
import { addProductToCart } from "utils/card";
import ProductAttributes from "../ProductAttributes";
import styles from "./index.module.scss";

const ProductCard = () => {
  const { productId } = useParams();
  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductByIdQuery(productId ?? "");
  const [count, setCount] = useState(1);
  const [maxCount, setMaxCount] = useState(0);
  const [selectedAttributes, setSelectedAttributes] = useState<
    { name: string; value: string }[]
  >([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const productInCart = cart.find((p: any) => p.id === productId);

    const alreadyInCart = productInCart?.quantity || 0;
    const available = product?.quantity ?? 0;

    const maxAddable = Math.max(available - alreadyInCart, 0);
    setMaxCount(maxAddable);
  }, [productId, product?.quantity, count]);

  useEffect(() => {
    if (product?.attributes && product.attributes.length > 0) {
      const initialSelected = product.attributes.map(({ name, values }) => ({
        name,
        value: values[0],
      }));
      setSelectedAttributes(initialSelected);
    }
  }, [product]);

  const { t } = useTranslation();

  if (isLoading) return <div>...</div>;
  if (isError || !product) return <div>Data loading error</div>;

  const { _id, name, image, price, quantity, description, attributes } =
    product;

  const handleIncrement = () => setCount((prev) => prev + 1);
  const handleDecrement = () => setCount((prev) => (prev > 1 ? prev - 1 : 1));

  const onAddToCart = () => {
    addProductToCart(_id, price, count, selectedAttributes);
    setMaxCount((prev) => prev - count);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleSelectAttribute = (name: string, value: string) => {
    setSelectedAttributes((prev) => {
      const existsIndex = prev.findIndex((attr) => attr.name === name);

      if (existsIndex !== -1) {
        const newArr = [...prev];
        newArr[existsIndex] = { name, value };
        return newArr;
      } else {
        return [...prev, { name, value }];
      }
    });
  };

  return (
    <div className={styles.productCard}>
      <img src={image} alt="" className={styles.image} />
      <div className={styles.infoBox}>
        <h1 className={styles.title}>{name}</h1>
        <p className={styles.price}>
          {price.toFixed(2)}
          {t("currency")}
        </p>
        {quantity ? (
          <p className={styles.inStock}>In stock</p>
        ) : (
          <p className={styles.outStock}>Out of stock</p>
        )}
        {quantity ? (
          <>
            {attributes?.map(({ name, values }) => (
              <ProductAttributes
                key={name}
                title={name}
                values={values}
                selectedValue={
                  selectedAttributes.find((attr) => attr.name === name)?.value
                }
                onSelect={handleSelectAttribute}
              />
            ))}
            <p className={styles.quantity}>{t("product.quantity")}</p>

            <div className={styles.quantityBox}>
              <button onClick={handleDecrement}>
                <Minus />
              </button>
              <input
                type="number"
                value={count}
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

              <button onClick={handleIncrement} disabled={count >= maxCount}>
                <PlusSubtle />
              </button>
            </div>
            <button
              style={{
                padding: 15,
                backgroundColor: "black",
                color: "white",
                marginBottom: 15,
              }}
              onClick={onAddToCart}
              disabled={count > maxCount}
            >
              {t("form.addToCard")}
            </button>
          </>
        ) : null}

        <h2 className={styles.description}>{t("form.description")}</h2>
        <p>
          {(description && description.length > 0 && description[0]
            ? description[0].split(/—\s*/)
            : []
          )
            .filter(Boolean)
            .map((sentence, idx) => (
              <span key={idx}>
                {idx === 0 ? sentence.trim() : "– " + sentence.trim()}
                <br />
                <br />
              </span>
            ))}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
