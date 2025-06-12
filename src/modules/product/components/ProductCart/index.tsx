import { useTranslation } from "react-i18next";
import { useGetProductByIdQuery } from "storeRedux/productsApi";
import styles from "./index.module.scss";
import Minus from "assets/svg/Minus";
import PlusSubtle from "assets/svg/PlusSubtle";
import { useState } from "react";

const ProductCart = () => {
  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductByIdQuery("684af5e4df559903a35058aa");
  const [count, setCount] = useState(1);

  const { t } = useTranslation();

  if (isLoading) return <div>...</div>;
  if (isError || !product) return <div>Data loading error</div>;

  const { name, image, price, quantity, description } = product;

  const handleIncrement = () => setCount((prev) => prev + 1);
  const handleDecrement = () => setCount((prev) => (prev > 1 ? prev - 1 : 1));

  console.log(product);

  return (
    <div className={styles.productCart}>
      <img src={image} alt="" className={styles.image} />
      <div className={styles.infoBox}>
        <h1 className={styles.title}>{name}</h1>
        <p className={styles.price}>
          {price}
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
