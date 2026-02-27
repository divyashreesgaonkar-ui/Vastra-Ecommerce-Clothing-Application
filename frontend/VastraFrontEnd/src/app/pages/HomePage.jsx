import { useNavigate } from "react-router-dom";
import { Search, ShoppingCart, Heart, User, Menu } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { useApp } from "../context/AppContext";

/*import { Product, categories } from '../data/mockData';*/
import { useEffect, useState } from "react";
import { getAllCategories } from "/src/services/categoryService";
import { getAllProducts } from "/src/services/productService";

import Navbar from "../components/Navbar";

export default function HomePage() {
  const navigate = useNavigate();
  const { cart, wishlist } = useApp();
  const [searchQuery, setSearchQuery] = useState("");

  /*const trendingProducts = products.filter(p => p.isTrending).slice(0, 4);
  const newArrivals = products.filter(p => p.isNew).slice(0, 6);*/

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  const trendingProducts = products.slice(0, 4);
  const newArrivals = products.slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Search Section */}
      <section className="bg-white border-b py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl mb-8 text-gray-900">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() =>
                  navigate("/products", { state: { category: category.name } })
                }
                className="group cursor-pointer"
              >
                <div className="aspect-square rounded-2xl overflow-hidden mb-3 bg-gray-100">
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-center">{category.name}</h3>
                <p className="text-center text-sm text-gray-500">
                  {category.productCount} items
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl text-gray-900">Trending Now</h2>
            <Button variant="ghost" onClick={() => navigate("/products")}>
              View All
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trendingProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => navigate(`/product/${product.id}`)}
                className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all"
              >
                <div className="aspect-square bg-gray-100 relative overflow-hidden">
                  <img
                    src={product.url}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {product.discount && (
                    <Badge className="absolute top-3 right-3 bg-red-500">
                      -{product.discount}%
                    </Badge>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-sm mb-1 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">₹{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        ₹{product.originalPrice}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <span className="text-sm text-yellow-500">★</span>
                    <span className="text-sm text-gray-600">
                      {product.rating}
                    </span>
                    <span className="text-sm text-gray-400">
                      ({product.reviews})
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offer Banner */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-white text-center">
            <h2 className="text-3xl mb-4">Special Offer</h2>
            <p className="text-xl mb-6 text-indigo-100">
              Get 30% off on your first order
            </p>
            <Button variant="secondary" size="lg">
              Shop Now
            </Button>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl mb-8 text-gray-900">New Arrivals</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {newArrivals.map((product) => (
              <div
                key={product.id}
                onClick={() => navigate(`/product/${product.id}`)}
                className="cursor-pointer"
              >
                <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden mb-3">
                  <img
                    src={product.url}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-sm line-clamp-2 mb-1">{product.name}</h3>
                <p className="font-semibold text-sm">₹{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8 mt-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white mb-4">About Vasthra</h4>
              <p className="text-sm text-gray-400">
                Premium fashion for the modern lifestyle.
              </p>
            </div>
            <div>
              <h4 className="text-white mb-4">Customer Service</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Track Order
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Returns
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white mb-4">Information</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white mb-4">Follow Us</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2026 Vasthra. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
