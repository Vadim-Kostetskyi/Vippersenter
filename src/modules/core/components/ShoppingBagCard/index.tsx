import { FC, useMemo, useState } from "react";
import LangLink from "utils/LangLink";
import { useGetProductBySlugQuery } from "storeRedux/productsApi";
import TrashIcon from "assets/svg/TrashCan.svg";
import { useTranslation } from "react-i18next";
import Minus from "assets/svg/Minus";
import PlusSubtle from "assets/svg/PlusSubtle";
import {
  getCartItems,
  removeCartItem,
  updateCartItemPrice,
  updateCartItemQuantity,
} from "utils/card";
import { Attribute, SelectedAttributes } from "storeRedux/types";
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
  // hasChanged,
  // availableQuantity,
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

  const selected = useMemo(() => {
    if (!assignedAttributes) return;
    return Object.fromEntries(
      assignedAttributes.map(({ parameter, attribute }) => [
        parameter,
        attribute,
      ]),
    );
  }, [assignedAttributes]);

  const getSelectedVariantData = (
    attributes: Attribute[],
    selectedAttributes: SelectedAttributes[],
  ): Attribute | null => {
    if (selectedAttributes.length === 0) return null;
    if (!selected) return null;

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

  const selectedVariant = getSelectedVariantData(
    attributes ?? [],
    assignedAttributes ?? [],
  );

  const newPrice = (product?.price ?? 0) + +(selectedVariant?.extraPrice ?? 0);
  const newPriceAdded = newPrice * count;
  const maxCount = selectedVariant?.quantity || maxQuantity;
  updateCartItemPrice(slug, newPrice, assignedAttributes);

  return (
    <div className={styles.shoppingBagCard}>
      {newPriceAdded !== totalPrice && (
        <div className={styles.warningPriceBanner}>
          Ціна змінилась: {savedPrice.toFixed(2)}
          {t("currency")} → {newPrice.toFixed(2)}
          {t("currency")}
        </div>
      )}
      {maxCount && +maxCount < count && (
        <div className={styles.warningQuantityBanner}>
          Товару залишилось {maxCount}
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
            {newPriceAdded === totalPrice
              ? totalPrice.toFixed(2)
              : newPriceAdded.toFixed(2)}
            {t("currency")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ShoppingBagCard;
