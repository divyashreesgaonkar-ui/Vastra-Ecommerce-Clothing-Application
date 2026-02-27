import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Heart, ShoppingCart, Truck, RotateCcw } from "lucide-react";
import { toast } from "sonner";

import { getProductById, getAllProducts } from "/src/services/productService";
import { useApp } from "../context/AppContext";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, addToWishlist } = useApp();

  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  /* ------------------ FETCH PRODUCT ------------------ */
  useEffect(() => {
    setLoading(true);
    getProductById(id)
      .then((data) => {
        setProduct({
          id: data.id,
          name: data.name,
          price: data.price,
          categoryId: data.categoryId,
          image: data.url,
          description: data.description,
          stock: data.stockQuantity,
        });

        return getAllProducts();
      })
      .then((allProducts) => {
        const normalized = allProducts.map((p) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          categoryId: p.categoryId,
          image: p.url,
        }));

        const related = normalized
          .filter((p) => p.categoryId === Number(product?.categoryId))
          .filter((p) => p.id !== Number(id))
          .slice(0, 4);

        setSimilarProducts(related);
      })
      .catch(() => toast.error("Failed to load product"))
      .finally(() => setLoading(false));
  }, [id]);

  /* ------------------ ADD TO CART ------------------ */
  const handleAddToCart = () => {
    if (quantity > product.stock) {
      toast.error("Quantity exceeds available stock");
      return;
    }
    addToCart(product, quantity);
    toast.success("Added to cart");
  };

  /* ------------------ UI STATES ------------------ */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Product not found
      </div>
    );
  }

  /* ------------------ UI ------------------ */
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* -------- PRODUCT CARD -------- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-3xl p-8">
          {/* Image */}
          <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-semibold mb-2">{product.name}</h1>
              <span className="text-3xl text-indigo-600">
                ₹{product.price}
              </span>
            </div>

            <p className="text-gray-600">{product.description}</p>

            <div className="flex items-center gap-4">
              <Badge
                className={
                  product.stock > 0 ? "bg-green-500" : "bg-red-500"
                }
              >
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </Badge>
              <span className="text-sm text-gray-600">
                {product.stock} units available
              </span>
            </div>

            {/* Quantity */}
            <div>
              <label className="block mb-2">Quantity</label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button
                size="lg"
                className="w-full"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="w-full"
                onClick={() => addToWishlist(product)}
              >
                <Heart className="mr-2 h-5 w-5" />
                Add to Wishlist
              </Button>
            </div>

            {/* Policies */}
            <div className="pt-6 border-t space-y-3">
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-gray-600" />
                <span className="text-sm text-gray-600">
                  Free shipping on orders above ₹999
                </span>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="h-5 w-5 text-gray-600" />
                <span className="text-sm text-gray-600">
                  7-day easy return policy
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* -------- SIMILAR PRODUCTS -------- */}
        {similarProducts.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl mb-6">Similar Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {similarProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => navigate(`/product/${p.id}`)}
                  className="cursor-pointer bg-white rounded-2xl overflow-hidden border hover:shadow-lg"
                >
                  <div className="aspect-square bg-gray-100">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm mb-1 line-clamp-2">{p.name}</h3>
                    <p className="font-semibold">₹{p.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
