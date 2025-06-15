import { useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGetProductByIdQuery } from "storeRedux/productsApi";
import PlusSubtle from "assets/svg/PlusSubtle";
import Minus from "assets/svg/Minus";
import styles from "./index.module.scss";

const ProductCart = () => {
  const { productId } = useParams();
  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductByIdQuery(productId ?? "");
  const [count, setCount] = useState(1);

  const { t } = useTranslation();

  if (isLoading) return <div>...</div>;
  if (isError || !product) return <div>Data loading error</div>;

  const { name, image, price, quantity, description } = product;

  const handleIncrement = () => setCount((prev) => prev + 1);
  const handleDecrement = () => setCount((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className={styles.productCart}>
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
        <p className={styles.quantity}>{t("product.quantity")}</p>
        <div className={styles.quantityBox}>
          <button onClick={handleDecrement}>
            <Minus />
          </button>
          <input type="number" value={count} />
          <button onClick={handleIncrement}>
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
        >
          Add to cart
        </button>
        <h2 className={styles.description}>{t("form.description")}</h2>
        <p>
          {description[0]
            .split(/-\s*/)
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

export default ProductCart;
