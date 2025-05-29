import Banner from "modules/core/containers/Banner";
import Categories from "modules/core/containers/Categories";
import Footer from "modules/core/containers/Footer";
import Header from "modules/core/containers/Header";
import MenuBar from "modules/core/containers/MenuBar";
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
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
