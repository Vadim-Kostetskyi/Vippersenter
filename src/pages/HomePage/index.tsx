import Banner from "modules/core/containers/Banner";
import Categories from "modules/core/containers/Categories";
import Footer from "modules/core/containers/Footer";
import Header from "modules/core/containers/Header";
import PopularProducts from "modules/product/containers/PopularProducts";

const HomePage = () => {
  return (
    <>
      <Header />
      <Banner />
      <Categories />
      <PopularProducts />
      <Footer />
    </>
  );
};

export default HomePage;
