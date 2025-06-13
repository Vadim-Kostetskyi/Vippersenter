import { useParams } from "react-router-dom";
import ProductCategoryModel from "modules/product/components/ProductCategoryModel";
import { images } from "./data";

type CategoryKey = keyof typeof images;

const ProductCategory = () => {
  const { category } = useParams();

  if (!category || !(category in images)) return null;

  return (
    <ProductCategoryModel
      image={images[category as CategoryKey]}
      category={category}
    />
  );
};

export default ProductCategory;
