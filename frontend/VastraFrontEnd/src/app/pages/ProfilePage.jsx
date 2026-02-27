import Navbar from "../components/Navbar";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { Package, MapPin, User as UserIcon } from "lucide-react";

/*TEMP DATA (later replace with API) */
import { orders } from "../data/mockData";

export default function ProfilePage() {
  const user = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 8900",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl mb-8">My Profile</h1>

        <Tabs defaultValue="profile" className="space-y-6">
          {/* TABS */}
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="addresses">Addresses</TabsTrigger>
          </TabsList>

          {/* PROFILE TAB */}
          <TabsContent value="profile">
            <div className="bg-white p-8 rounded-2xl max-w-2xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center">
                  <UserIcon className="h-10 w-10 text-indigo-600" />
                </div>
                <div>
                  <h2 className="text-xl">
                    {user.firstName} {user.lastName}
                  </h2>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>First Name</Label>
                    <Input defaultValue={user.firstName} />
                  </div>
                  <div>
                    <Label>Last Name</Label>
                    <Input defaultValue={user.lastName} />
                  </div>
                </div>

                <div>
                  <Label>Email</Label>
                  <Input type="email" defaultValue={user.email} />
                </div>

                <div>
                  <Label>Phone</Label>
                  <Input type="tel" defaultValue={user.phone} />
                </div>

                <Button className="mt-2">Update Profile</Button>
              </div>
            </div>
          </TabsContent>

          {/* ORDERS TAB */}
          <TabsContent value="orders">
            {orders?.length ? (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="bg-white p-6 rounded-2xl">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3>Order #{order.id}</h3>
                        <p className="text-sm text-gray-600">{order.date}</p>
                      </div>

                      <Badge
                        className={
                          order.status === "Delivered"
                            ? "bg-green-500"
                            : order.status === "Shipped"
                            ? "bg-blue-500"
                            : order.status === "Processing"
                            ? "bg-yellow-500"
                            : "bg-gray-500"
                        }
                      >
                        {order.status}
                      </Badge>
                    </div>

                    <div className="space-y-3 mb-4">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4">
                          <Package className="h-5 w-5 text-gray-400" />
                          <div className="flex-1">
                            <p className="text-sm">{item.productName}</p>
                            <p className="text-sm text-gray-600">
                              Qty: {item.quantity}
                            </p>
                          </div>
                          <p>${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between border-t pt-4">
                      <span>Total</span>
                      <span className="text-xl">${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No orders placed yet.</p>
            )}
          </TabsContent>

          {/* ADDRESSES TAB */}
          <TabsContent value="addresses">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {orders?.[0]?.shippingAddress && (
                <div className="bg-white p-6 rounded-2xl border-2 border-indigo-200">
                  <div className="flex items-start justify-between mb-4">
                    <MapPin className="h-5 w-5 text-indigo-600" />
                    <Badge>Default</Badge>
                  </div>

                  <h3 className="mb-2">{orders[0].shippingAddress.name}</h3>
                  <p className="text-sm text-gray-600">
                    {orders[0].shippingAddress.address}
                  </p>
                  <p className="text-sm text-gray-600">
                    {orders[0].shippingAddress.city},{" "}
                    {orders[0].shippingAddress.zipCode}
                  </p>
                  <p className="text-sm text-gray-600">
                    {orders[0].shippingAddress.country}
                  </p>

                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                    <Button size="sm" variant="outline">
                      Delete
                    </Button>
                  </div>
                </div>
              )}

              <div className="bg-gray-50 p-6 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center min-h-[200px]">
                <Button variant="outline">+ Add New Address</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
