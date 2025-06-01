import Banner from "modules/core/components/Banner";
import Categories from "modules/core/containers/Categories";
import Footer from "modules/core/containers/Footer";
import Header from "modules/core/containers/Header";
import MenuBar from "modules/core/components/MenuBar";
import NewProducts from "modules/product/containers/NewProducts";
import PopularProducts from "modules/product/containers/PopularProducts";

const HomePage = () => {
  return (
    <>
      <Header />
      <MenuBar />
      <main>
        <Banner />
        <Categories />
        <PopularProducts />
        <NewProducts />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
