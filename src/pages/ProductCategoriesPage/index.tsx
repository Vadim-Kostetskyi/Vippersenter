import MainLayout from "modules/core/components/MainLayout";
import Catalog from "modules/product/Catalog";
import ProductCategoryModel from "modules/product/components/ProductCategoryModel";

const ProductCategoriesPage = () => {
  return (
    <MainLayout>
      <ProductCategoryModel />
      <Catalog />
    </MainLayout>
  );
};

export default ProductCategoriesPage;