import { Route, Routes } from "react-router-dom";
import "./scss/App.scss";
import Home from "./pages/home";
import ProductView from "./pages/productView";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route index element={<Home />} />
        <Route path="/product-view" element={<ProductView />} />
      </Routes>
    </div>
  );
}

export default App;
