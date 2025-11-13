import { Routes, Route } from "react-router-dom";

// 🔹 Layouts
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";

// 🔹 Front pages
import Dashboard from "./pages/frontpages/Dashboard"; // bisa juga disebut Home
import ProductDetail from "./pages/frontpages/ProductDetail";
import Cart from "./pages/frontpages/Cart";
import Checkout from "./pages/frontpages/Checkout";

// 🔹 Auth pages
import LoginPage from "./pages/frontpages/LoginPage";
import LogoutPage from "./pages/frontpages/LogoutPage";

// 🔹 Admin pages
import AdminDashboard from "./pages/adminpages/AdminDashboard";
import AboutPage from "./pages/adminpages/AboutPage";
import ProductForm from "./pages/adminpages/ProductForm";
import ProductEdit from "./pages/adminpages/ProductEdit";

export default function App() {
  return (
    <Routes>
      {/* ================================================
          AUTH ROUTES
      ================================================= */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/logout" element={<LogoutPage />} />

      {/* ================================================
          FRONTEND ROUTES
      ================================================= */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>

      {/* ================================================
          ADMIN ROUTES
      ================================================= */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="add-product" element={<ProductForm />} />
        <Route path="edit-product/:id" element={<ProductEdit />} />
      </Route>
    </Routes>
  );
}
