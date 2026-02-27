import { useNavigate } from "react-router-dom";
import { ShoppingBag, ShoppingCart, Heart, User, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useApp } from "../context/AppContext";
/*import { ProfilePage } from "/src/app/pages/ProfilePage";*/
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function Navbar() {
  const navigate = useNavigate();
  const { cart, wishlist, isAdmin, logout } = useApp();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* LOGO */}
          <div
            onClick={() => navigate("/profile")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <ShoppingBag className="h-7 w-7 text-indigo-600" />
            <span className="text-xl text-gray-900 font-semibold">Vasthra</span>
          </div>

          {/* NAV LINKS */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => navigate("/home")}
              className="text-gray-600 hover:text-gray-900"
            >
              Home
            </button>
            <button
              onClick={() => navigate("/products")}
              className="text-gray-600 hover:text-gray-900"
            >
              Products
            </button>
            {isAdmin && (
              <button
                onClick={() => navigate("/admin")}
                className="text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Admin
              </button>
            )}
          </nav>

          {/* ICONS */}
          <div className="flex items-center gap-3">
            {/* Wishlist */}
            <button
              onClick={() => navigate("/wishlist")}
              className="relative p-2 hover:bg-gray-100 rounded-full"
            >
              <Heart className="h-6 w-6 text-gray-600" />
              {wishlist.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                  {wishlist.length}
                </Badge>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={() => navigate("/cart")}
              className="relative p-2 hover:bg-gray-100 rounded-full"
            >
              <ShoppingCart className="h-6 w-6 text-gray-600" />
              {cart.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                  {cart.length}
                </Badge>
              )}
            </button>

            {/* Profile */}
            <button
              onClick={() => navigate("/profile")}
              className="relative p-2 hover:bg-gray-100 rounded-full"
            >
              <User className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
