import { FC, useState } from "react";
import LangLink from "utils/LangLink";
import { useGetProductBySlugQuery } from "storeRedux/productsApi";
import TrashIcon from "assets/svg/TrashCan.svg";
import { useTranslation } from "react-i18next";
import Minus from "assets/svg/Minus";
import PlusSubtle from "assets/svg/PlusSubtle";
import {
  getCartItems,
  removeCartItem,
  updateCartItemQuantity,
} from "utils/card";
import { Attribute } from "storeRedux/types";
import { CartAttributes, CartItem } from "types/types";
import styles from "./index.module.scss";

interface ShoppingBagCardProps {
  slug: string;
  savedPrice: number;
  assignedQuantity: number;
  setProducts: (items: CartItem[]) => void;
  delProduct: (productId: string, attributes?: CartAttributes[]) => void;
  assignedAttributes?: CartAttributes[];
  hasChanged?: boolean;
  availableQuantity?: number;
}

const ShoppingBagCard: FC<ShoppingBagCardProps> = ({
  slug,
  savedPrice,
  assignedQuantity,
  setProducts,
  delProduct,
  assignedAttributes,
  hasChanged,
  availableQuantity,
}) => {
  const { data: product } = useGetProductBySlugQuery(slug);
  const {
    name = "",
    image = "",
    // price = 0,
    quantity = 0,
    attributes,
  } = product ?? {};
  const [count, setCount] = useState(assignedQuantity);
  console.log(slug);

  console.log("hasChanged", hasChanged);
  console.log("availableQuantity", availableQuantity);

  const findQuantity = (
    allAttributes: Attribute[],
    searchAttributes: CartAttributes[],
  ): number | null => {
    const found = allAttributes.find((attr) => {
      return searchAttributes.every((search) => {
        if (search.parameter === attr.attribute_main) {
          return search.attribute === attr.value_main;
        }
        if (search.parameter === attr.attribute_secondary) {
          return search.attribute === attr.value_secondary;
        }
        if (search.parameter === attr.attribute_tertiary) {
          return search.attribute === attr.value_tertiary;
        }
        return false;
      });
    });

    return found ? (found.quantity ? +found.quantity : null) : null;
  };

  const productQuantity = findQuantity(
    attributes ?? [],
    assignedAttributes ?? [],
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

  const totalPrice = count * +savedPrice;
  const maxQuantity =
    attributes?.length === 1 ? +quantity : productQuantity || 0;

  return (
    <div className={styles.shoppingBagCard}>
      {hasChanged && (
        <div className={styles.warningBanner}>
          Товару залишилось {availableQuantity ?? 0}
        </div>
      )}

      <LangLink to={`/product/${slug}`}>
        {!!image && <img src={image} alt="" />}
      </LangLink>

      <div className={styles.infoBox}>
        <div>
          <LangLink to={`/product/${slug}`}>
            <h3>{name}</h3>
          </LangLink>
          <button
            onClick={() => {
              removeCartItem(slug, assignedAttributes);
              delProduct(slug, assignedAttributes);
            }}
          >
            <img src={TrashIcon} alt="delete item" />
          </button>
        </div>

        {assignedAttributes?.map(({ parameter, attribute }) => (
          <div key={parameter} className={styles.attributes}>
            <span>{parameter}:</span> <span>{attribute}</span>
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
            <input type="number" value={count} readOnly />
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
