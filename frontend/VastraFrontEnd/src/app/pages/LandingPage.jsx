import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { Button } from "../components/ui/button";
import {
  ShoppingBag,
  Truck,
  RotateCcw,
  Shield,
  ArrowRight,
} from "lucide-react";
import { Input } from "../components/ui/input";
import { toast } from "sonner";

export default function LandingPage() {
  const navigate = useNavigate();
  const { login } = useApp();

  const handleGetStarted = () => {
    login(false);
    navigate("/auth");
    toast.success("Welcome! You are now signed in.");
  };

  const handleAdminLogin = () => {
    login(true);
    navigate("/admin/login");
    toast.success("Admin access granted!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-8 w-8 text-indigo-600" />
              <span className="text-2xl font-semibold text-gray-900">
                Vasthra
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={handleAdminLogin}>
                Admin
              </Button>
              <Button onClick={handleGetStarted}>User</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block">
                <span className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-sm">
                  Premium Fashion Collection 2026
                </span>
              </div>
              <h1 className="text-5xl lg:text-6xl tracking-tight text-gray-900">
                Elevate Your
                <span className="block text-indigo-600">Wardrobe</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-lg">
                Discover timeless pieces crafted with care. Premium quality
                meets contemporary design.
              </p>
              <div className="flex gap-4">
                <Button size="lg" onClick={handleGetStarted} className="group">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button size="lg" variant="outline">
                  Explore Collections
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100">
                <img
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800"
                  alt="Fashion collection"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-indigo-50 rounded-full flex items-center justify-center">
                    <ShoppingBag className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-2xl">1000+</p>
                    <p className="text-sm text-gray-600">Premium Products</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-gray-900 mb-4">
              Featured Collections
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our curated selections of the finest fashion pieces
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Men",
                image:
                  "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=600",
              },
              {
                title: "Women",
                image:
                  "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600",
              },
              {
                title: "Accessories",
                image:
                  "https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?w=600",
              },
            ].map((collection) => (
              <div
                key={collection.title}
                className="group cursor-pointer rounded-2xl overflow-hidden relative h-96"
                onClick={handleGetStarted}
              >
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl mb-2">{collection.title}</h3>
                  <p className="text-sm opacity-90">Explore Collection →</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Truck,
                title: "Free Shipping",
                description:
                  "On orders over $50. Fast and reliable delivery worldwide.",
              },
              {
                icon: RotateCcw,
                title: "Easy Returns",
                description:
                  "30-day return policy. No questions asked, hassle-free returns.",
              },
              {
                icon: Shield,
                title: "Secure Payments",
                description:
                  "SSL encrypted payments. Your data is safe with us.",
              },
            ].map((benefit) => (
              <div
                key={benefit.title}
                className="text-center p-8 rounded-2xl bg-white border border-gray-100 hover:border-indigo-200 hover:shadow-lg transition-all"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-50 rounded-full mb-4">
                  <benefit.icon className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-xl mb-2 text-gray-900">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl text-white mb-4">Stay in the Loop</h2>
          <p className="text-indigo-100 mb-8">
            Subscribe to get special offers, free giveaways, and exclusive
            deals.
          </p>
          <div className="flex gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-white"
            />
            <Button variant="secondary" className="whitespace-nowrap">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <ShoppingBag className="h-6 w-6 text-indigo-400" />
                <span className="text-xl text-white">Vasthra</span>
              </div>
              <p className="text-sm text-gray-400">
                Premium fashion for the modern lifestyle.
              </p>
            </div>
            <div>
              <h4 className="text-white mb-4">Shop</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white">
                    New Arrivals
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Best Sellers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Sale
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white mb-4">About</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white">
                    Our Story
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Sustainability
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white">
                    Help Center
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
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2026 Vasthra. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
