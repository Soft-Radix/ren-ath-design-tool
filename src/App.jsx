import { Route, Routes } from "react-router-dom";
import "./scss/App.scss";
import Home from "./pages/home";
import ProductView from "./pages/productView";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./contexts/AuthContext";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import EditProfile from "./pages/Profile/Edit";
import Login from "./pages/Admin";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Admin/Dashboard";
import Users from "./pages/Admin/Users";
import Designs from "./pages/Admin/Designs";
import Mydesign from "./pages/myDesign";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route index element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-design" element={<Mydesign />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/product-view/:styleCode" element={<ProductView />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/admin">
          <Route index element={<Login />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="designs" element={<Designs />} />
        </Route>
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
