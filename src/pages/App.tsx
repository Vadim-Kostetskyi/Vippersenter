import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import PrivateRoute from "storeRedux/PrivateRoute";
import ProductFormPage from "./ProductFormPage";
import ProductPage from "./ProductPage";
import ProductCategoryPage from "./ProductCategoryPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/product/:productId" element={<ProductPage />} />
      <Route
        path="/product-category/:category"
        element={<ProductCategoryPage />}
      />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <ProductFormPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
