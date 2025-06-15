import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import CategoryNames from "components/CategoryNames";
import { useGetProductsQuery } from "storeRedux/productsApi";
import ProductListCart from "modules/product/components/ProductListCart";
import styles from "./index.module.scss";

const ProductListCategory = () => {
  const { category } = useParams();
  const { t } = useTranslation();
  const { list } = CategoryNames(t);

  const categoryChosen = list.filter(({ key }) => key === category);
  const { data: removerProducts } = useGetProductsQuery({
    category: categoryChosen[0].label,
  });

  console.log(removerProducts);

  return (
    <div className={styles.productListCategory}>
      {removerProducts?.map(({ image, price, name, _id }) => (
        <ProductListCart image={image} price={price} name={name} id={_id} />
      ))}
    </div>
  );
};

export default ProductListCategory;
