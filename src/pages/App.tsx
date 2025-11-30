import { Route, Routes } from "react-router-dom";
import { Outlet } from "react-router-dom";
import AboutUsPage from "./AboutUsPage";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import ProductPage from "./ProductPage";
import CheckoutPage from "./CheckoutPage";
import ScrollToTop from "utils/scrollToTop";
import ProductFormPage from "./ProductFormPage";
import PrivateRoute from "storeRedux/PrivateRoute";
import ProductCategoryPage from "./ProductCategoryPage";
import ProductCategoriesPage from "./ProductCategoriesPage";

const App = () => (
  <>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/about-us" element={<AboutUsPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/product/:productId" element={<ProductPage />} />
      <Route path="/product-category" element={<ProductCategoriesPage />} />
      <Route
        path="/product-category/:category"
        element={<ProductCategoryPage />}
      />
      <Route path="/en" element={<Outlet />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="about-us" element={<AboutUsPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="product/:productId" element={<ProductPage />} />
        <Route path="product-category" element={<ProductCategoriesPage />} />
        <Route
          path="product-category/:category"
          element={<ProductCategoryPage />}
        />
        <Route
          path="dashboard"
          element={
            <PrivateRoute>
              <ProductFormPage />
            </PrivateRoute>
          }
        />
      </Route>
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <ProductFormPage />
          </PrivateRoute>
        }
      />
    </Routes>
  </>
);

export default App;
