import ProductCategoryModel from "modules/product/components/ProductCategoryModel";
import { categories, eyelashes } from "./data";

const ProductCategory = () => {
  console.log(categories);
  categories.map((i) => console.log(i));

  return (
    <>
      {categories.map((category) => (
        <ProductCategoryModel
          image={category.lashes.image}
          category={category.lashes.category}
          filterItems={eyelashes}
        />
      ))}
    </>
  );
};

export default ProductCategory;
