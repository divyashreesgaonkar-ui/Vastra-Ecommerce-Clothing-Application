import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { useApp } from "../context/AppContext";
import { Check } from "lucide-react";
import { toast } from "sonner";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, clearCart } = useApp();
  const [step, setStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = cart.reduce((sum, item) => {
    const price = Number(item.price || 0);
    const quantity = Number(item.quantity || 1);
    return sum + price * quantity;
  }, 0);

  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      clearCart();
      toast.success("Order placed successfully!");
      navigate("/profile");
    }, 2000);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <div className="bg-white p-12 rounded-3xl">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-3xl mb-4">Order Placed Successfully!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for your purchase. We'll send you a confirmation email
              shortly.
            </p>
            <Button onClick={() => navigate("/home")}>Continue Shopping</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl mb-8">Checkout</h1>

        {/* Stepper */}
        <div className="flex items-center justify-center mb-12">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= s ? "bg-indigo-600 text-white" : "bg-gray-200"
                }`}
              >
                {s}
              </div>
              {s < 3 && (
                <div
                  className={`w-24 h-1 ${
                    step > s ? "bg-indigo-600" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {step === 1 && (
              <div className="bg-white p-8 rounded-2xl">
                <h2 className="text-xl mb-6">Shipping Address</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label>Full Name</Label>
                    <Input placeholder="John Doe" />
                  </div>
                  <div className="col-span-2">
                    <Label>Address</Label>
                    <Input placeholder="123 Main St" />
                  </div>
                  <div>
                    <Label>City</Label>
                    <Input placeholder="New York" />
                  </div>
                  <div>
                    <Label>ZIP Code</Label>
                    <Input placeholder="10001" />
                  </div>
                  <div className="col-span-2">
                    <Label>Country</Label>
                    <Input placeholder="USA" />
                  </div>
                </div>
                <Button className="mt-6" onClick={() => setStep(2)}>
                  Continue to Payment
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white p-8 rounded-2xl">
                <h2 className="text-xl mb-6">Payment Method</h2>
                <RadioGroup defaultValue="card">
                  <div className="flex items-center space-x-2 p-4 border rounded-lg mb-3">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex-1 cursor-pointer">
                      Credit/Debit Card
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg mb-3">
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi" className="flex-1 cursor-pointer">
                      UPI
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex-1 cursor-pointer">
                      Cash on Delivery
                    </Label>
                  </div>
                </RadioGroup>
                <div className="flex gap-3 mt-6">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button onClick={() => setStep(3)}>Continue to Review</Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="bg-white p-8 rounded-2xl">
                <h2 className="text-xl mb-6">Review Order</h2>
                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 border-b pb-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="text-sm">{item.name}</h3>
                        <p className="text-sm text-gray-600">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p>
                        ₹
                        {(
                          Number(item.price || 0) * Number(item.quantity || 1)
                        ).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <Button onClick={handlePlaceOrder}>Place Order</Button>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white p-6 rounded-2xl h-fit sticky top-24">
            <h2 className="text-xl mb-4">Order Summary</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-3 flex justify-between">
                <span>Total</span>
                <span className="text-xl">₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
