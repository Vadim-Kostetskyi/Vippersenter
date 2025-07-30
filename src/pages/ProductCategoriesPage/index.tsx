import MainLayout from "modules/core/components/MainLayout";
import Catalog from "modules/product/containers/Catalog";
import ProductCategoryModel from "modules/product/components/ProductCategoryModel";

const ProductCategoriesPage = () => (
  <MainLayout>
    <ProductCategoryModel />
    <Catalog />
  </MainLayout>
);

export default ProductCategoriesPage;