import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider, useApp } from "./context/AppContext";

import LandingPage from "./pages/LandingPage";
import Auth from "./pages/Auth";
import Login from "./pages/login";
import HomePage from "./pages/HomePage";
import ProductListingPage from "./pages/ProductListingPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProfilePage from "./pages/ProfilePage";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminCategories from "./pages/admin/AdminCategories";

import { Toaster } from "./components/ui/sonner";
import Navbar from "./components/Navbar";

/* ---------- Protected Route ---------- */
function ProtectedRoute({ children, adminOnly = false }) {
  const { isAuthenticated, isAdmin } = useApp();

  // 🔐 If not logged in → redirect
  if (!isAuthenticated) {
    return <Navigate to={adminOnly ? "/admin/login" : "/login"} replace />;
  }

  // 🔐 If admin route but user is not admin
  if (adminOnly && !isAdmin) {
    return <Navigate to="/home" replace />;
  }

  return children;
}

/* ---------- App Routes ---------- */
function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/auth" element={<Auth />} />

      {/* 🔑 ADMIN LOGIN (PUBLIC – VERY IMPORTANT) */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* User Routes */}
      <Route path="/home" element={<HomePage />} />
      <Route path="/products" element={<ProductListingPage />} />
      <Route path="/product/:id" element={<ProductDetailsPage />} />

      <Route path="/cart" element={<CartPage />} />

      <Route path="/wishlist" element={<WishlistPage />} />

      <Route path="/checkout" element={<CheckoutPage />} />

      <Route path="/profile" element={<ProfilePage />} />

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute adminOnly>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/products"
        element={
          <ProtectedRoute adminOnly>
            <AdminProducts />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/orders"
        element={
          <ProtectedRoute adminOnly>
            <AdminOrders />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/categories"
        element={
          <ProtectedRoute adminOnly>
            <AdminCategories />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

/* ---------- App ---------- */
export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRoutes />
        <Toaster />
        <Navbar />
      </BrowserRouter>
    </AppProvider>
  );
}
