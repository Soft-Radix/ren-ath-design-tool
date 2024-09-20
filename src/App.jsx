import { Route, Routes } from "react-router-dom";
import "./scss/App.scss";
import Home from "./pages/home";
import ProductView from "./pages/productView";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./contexts/AuthContext";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
function App() {
  return (
    <div className="app">
      <Routes>
        <Route index element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/product-view" element={<ProductView />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
export const AppWrapper = () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};
