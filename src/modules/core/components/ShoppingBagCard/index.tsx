import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { useGetProductBySlugQuery } from "storeRedux/productsApi";
import TrashIcon from "assets/svg/TrashCan.svg";
import styles from "./index.module.scss";
import { useTranslation } from "react-i18next";
import Minus from "assets/svg/Minus";
import PlusSubtle from "assets/svg/PlusSubtle";
import {
  CartItem,
  getCartItems,
  removeCartItem,
  updateCartItemQuantity,
} from "utils/card";
import { Attributes } from "utils/card";
import { Attribute } from "storeRedux/types";

interface ShoppingBagCardProps {
  slug: string;
  assignedQuantity: number;
  setProducts: (items: CartItem[]) => void;
  delProduct: (productId: string, attributes?: Attributes[]) => void;
  assignedAttributes?: Attributes[];
}

const ShoppingBagCard: FC<ShoppingBagCardProps> = ({
  slug,
  assignedQuantity,
  setProducts,
  delProduct,
  assignedAttributes,
}) => {
  const { data: product } = useGetProductBySlugQuery(slug);
  const {
    name = "",
    image = "",
    price = 0,
    quantity = 0,
    attributes,
  } = product ?? {};
  const [count, setCount] = useState(assignedQuantity);

  const findQuantity = (
    allAttributes: Attribute[],
    searchAttributes: Attributes[]
  ): number | null => {
    const found = allAttributes.find((attr) => {
      return searchAttributes.every((search) => {
        if (search.name === attr.attribute_main) {
          return search.attributeName === attr.value_main;
        }
        if (search.name === attr.attribute_secondary) {
          return search.attributeName === attr.value_secondary;
        }
        if (search.name === attr.attribute_tertiary) {
          return search.attributeName === attr.value_tertiary;
        }
        return false;
      });
    });

    return found ? (found.quantity ? +found.quantity : null) : null;
  };

  const productQuantity = findQuantity(
    attributes ?? [],
    assignedAttributes ?? []
  );

  const { t } = useTranslation();

  const handleIncrement = () => {
    setCount((prev) => {
      const newCount = prev + 1;
      updateCartItemQuantity(slug, newCount, assignedAttributes);
      const cards = getCartItems();
      setProducts(cards);
      return newCount;
    });
  };

  const handleDecrement = () => {
    setCount((prev) => {
      const newCount = prev > 1 ? prev - 1 : 1;
      updateCartItemQuantity(slug, newCount, assignedAttributes);
      const cards = getCartItems();
      setProducts(cards);
      return newCount;
    });
  };

  const totalPrice = count * +price;
  const maxQuantity =
    attributes?.length === 0 ? +quantity : productQuantity || 0;
  

  return (
    <div className={styles.shoppingBagCard}>
      <Link to={`/product/${slug}`}>
        {!!image && <img src={image} alt="" />}
      </Link>
      <div className={styles.infoBox}>
        <div>
          <Link to={`/product/${slug}`}>
            <h3>{name}</h3>
          </Link>
          <button
            onClick={() => {
              removeCartItem(slug, assignedAttributes);
              delProduct(slug, assignedAttributes);
            }}
          >
            <img src={TrashIcon} alt="delete item" />
          </button>
        </div>
        {assignedAttributes?.map(({ name, attributeName }) => (
          <div key={name} className={styles.attributes}>
            <span>{name}:</span> <span>{attributeName}</span>
          </div>
        ))}
        <div>
          <div className={styles.quantityBox}>
            <button
              className={count === 1 ? styles.disabled : ""}
              onClick={handleDecrement}
              disabled={count === 1}
            >
              <Minus />
            </button>
            <input type="number" value={count} />
            <button
              className={count >= maxQuantity ? styles.disabled : ""}
              onClick={handleIncrement}
              disabled={count >= maxQuantity}
            >
              <PlusSubtle />
            </button>
          </div>
          <span className={styles.price}>
            {totalPrice.toFixed(2)}
            {t("currency")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ShoppingBagCard;
