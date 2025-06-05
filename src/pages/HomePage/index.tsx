import Banner from "modules/core/components/Banner";
import Categories from "modules/core/containers/Categories";
import NewProducts from "modules/product/containers/NewProducts";
import PopularProducts from "modules/product/containers/PopularProducts";
import { useGetProductsQuery } from "storeRedux/productsApi";
import MainLayout from "modules/core/components/MainLayout";

const HomePage = () => {
  const { data: products } = useGetProductsQuery();
  console.log(products);

  return (
    <>
      <Banner />
      <MainLayout>
        <main>
          <Categories />
          <PopularProducts />
          <NewProducts />
        </main>
      </MainLayout>
    </>
  );
};

export default HomePage;
