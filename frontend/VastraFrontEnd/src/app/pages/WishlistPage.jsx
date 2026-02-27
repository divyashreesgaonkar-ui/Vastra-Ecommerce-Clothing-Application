import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Button } from "../components/ui/button";
import { Trash2, ShoppingCart } from "lucide-react";
import { useApp } from "../context/AppContext";
import { toast } from "sonner";

export default function WishlistPage() {
  const navigate = useNavigate();
  const { wishlist, removeFromWishlist, addToCart } = useApp();

  const handleMoveToCart = (product) => {
    addToCart({
      ...product,
      quantity: 1,
      price: Number(product.price),
    });

    removeFromWishlist(product.id);
    toast.success("Moved to cart!");

    navigate("/cart");
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl mb-4">Your wishlist is empty</h2>
          <Button onClick={() => navigate("/products")}>Browse Products</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl mb-8">My Wishlist</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden border hover:shadow-lg transition-all"
            >
              <div
                className="aspect-square bg-gray-100 cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="mb-2 line-clamp-2">{product.name}</h3>
                <p className="text-xl mb-4">₹{product.price}</p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={() => handleMoveToCart(product)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Move to Cart
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => removeFromWishlist(product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
