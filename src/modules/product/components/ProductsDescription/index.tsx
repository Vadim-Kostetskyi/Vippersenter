import { useGetProductsQuery } from "storeRedux/productsApi";
import { Product } from "storeRedux/types";
import ProductsTableFunctional from "../ProductsTableFunctional";

const ProductsDescription = () => {
  const { data: products, isLoading, isError } = useGetProductsQuery();

  if (isLoading) return <div>...</div>;
  if (isError || !products) return <div>Data loading error</div>;

  const grouped = products.reduce<Record<string, Product[]>>((acc, product) => {
    acc[product.category] = acc[product.category] || [];
    acc[product.category].push(product);
    return acc;
  }, {});

  return <ProductsTableFunctional products={products} grouped={grouped} />;
};

export default ProductsDescription;
