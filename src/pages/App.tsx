import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import Login from "modules/user/conteiners/Login";

function App() {
  const admin = import.meta.env.VITE_ADMIN_KEY;

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path={admin} element={<Login />} />
    </Routes>
  );
}

export default App;
