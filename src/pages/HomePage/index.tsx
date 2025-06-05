import Banner from "modules/core/components/Banner";
import Categories from "modules/core/containers/Categories";
import MenuBar from "modules/core/components/MenuBar";
import NewProducts from "modules/product/containers/NewProducts";
import PopularProducts from "modules/product/containers/PopularProducts";
import { useGetProductsQuery } from "storeRedux/productsApi";
import MainLayout from "modules/core/components/MainLayout";

const HomePage = () => {
  const { data: products, error, isLoading } = useGetProductsQuery();
  console.log(products);

  return (
    <>
      <MenuBar />
      <MainLayout>
        <main>
          <Banner />
          <Categories />
          <PopularProducts />
          <NewProducts />
        </main>
      </MainLayout>
    </>
  );
};

export default HomePage;
