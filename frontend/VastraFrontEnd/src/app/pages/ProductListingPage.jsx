import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Slider } from "../components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Heart } from "lucide-react";
import { toast } from "sonner";

import { getAllProducts } from "/src/services/productService";
import { getAllCategories } from "/src/services/categoryService";
import { useApp } from "../context/AppContext";

export default function ProductListingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToWishlist, wishlist } = useApp();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const initialCategory = location.state?.categoryId || "ALL";
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [sortBy, setSortBy] = useState("featured");

  /* ------------------ API CALLS ------------------ */

  useEffect(() => {
    getAllProducts().then((data) => {
      const normalized = data.map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        categoryId: p.categoryId,
        image: p.url, // 🔑 backend → frontend
        description: p.description,
        stock: p.stockQuantity,
      }));
      setProducts(normalized);
    });
  }, []);

  useEffect(() => {
    getAllCategories().then((data) => {
      setCategories([{ id: "ALL", name: "All" }, ...data]);
    });
  }, []);

  /* ------------------ FILTERING ------------------ */

  let filteredProducts = [...products];

  if (selectedCategory !== "ALL") {
    filteredProducts = filteredProducts.filter(
      (p) => p.categoryId === selectedCategory
    );
  }

  filteredProducts = filteredProducts.filter(
    (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
  );

  /* ------------------ SORTING ------------------ */

  if (sortBy === "price-low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  /* ------------------ WISHLIST ------------------ */

  const isInWishlist = (id) => wishlist.some((w) => w.id === id);

  const handleWishlistToggle = (e, product) => {
    e.stopPropagation();
    addToWishlist(product);
    toast.success("Added to wishlist");
  };

  /* ------------------ UI ------------------ */

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* ----------- FILTER SIDEBAR ----------- */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-2xl border">
              <h3 className="mb-4 font-semibold">Category</h3>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg ${
                    selectedCategory === cat.id
                      ? "bg-indigo-50 text-indigo-600"
                      : "hover:bg-gray-50"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            <div className="bg-white p-6 rounded-2xl border">
              <h3 className="mb-4 font-semibold">Price Range</h3>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={10000}
                step={100}
              />
              <div className="flex justify-between text-sm mt-2">
                <span>₹{priceRange[0]}</span>
                <span>₹{priceRange[1]}</span>
              </div>
            </div>
          </aside>

          {/* ----------- PRODUCTS GRID ----------- */}
          <main className="lg:col-span-3">
            <div className="flex justify-between mb-6">
              <p>Showing {filteredProducts.length} products</p>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="bg-white rounded-2xl border hover:shadow-lg cursor-pointer"
                >
                  <div className="aspect-square bg-gray-100 relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={(e) => handleWishlistToggle(e, product)}
                      className={`absolute top-3 right-3 p-2 bg-white rounded-full ${
                        isInWishlist(product.id)
                          ? "text-red-500"
                          : "text-gray-600"
                      }`}
                    >
                      <Heart
                        className={`h-5 w-5 ${
                          isInWishlist(product.id) ? "fill-current" : ""
                        }`}
                      />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="mb-2 line-clamp-2">{product.name}</h3>
                    <span className="text-xl font-semibold">
                      ₹{product.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No products found</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSelectedCategory("ALL");
                    setPriceRange([0, 10000]);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
