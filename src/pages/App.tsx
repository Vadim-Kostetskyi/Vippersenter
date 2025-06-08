import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import PrivateRoute from "storeRedux/PrivateRoute";
import Dashboard from "modules/product/containers/Dashboard";

function App() {
  const admin = import.meta.env.VITE_LOGIN_KEY;

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path={admin} element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
