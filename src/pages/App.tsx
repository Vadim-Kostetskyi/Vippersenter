import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import Login from "modules/user/conteiners/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin" element={<Login />} />
    </Routes>
  );
}

export default App;
