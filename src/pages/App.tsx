import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";

function App() {
  const admin = import.meta.env.VITE_ADMIN_KEY;

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path={admin} element={<LoginPage />} />
    </Routes>
  );
}

export default App;
