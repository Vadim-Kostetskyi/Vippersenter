import ProductCategoryModel from "modules/product/components/ProductCategoryModel";
import { categories, eyelashes, glue } from "./data";

const ProductCategory = () => (
  <>
    {categories.map((category) => (
      <ProductCategoryModel
        image={category.lashes.image}
        category={category.lashes.category}
        filterItems={glue}
      />
    ))}
  </>
);

export default ProductCategory;
