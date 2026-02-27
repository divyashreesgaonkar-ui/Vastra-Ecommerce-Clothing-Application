import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

/* ✅ API base */
const API_BASE = "http://localhost:8081/api/orders";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH ORDERS ================= */
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_BASE);

      if (!res.ok) throw new Error("Failed to fetch orders");

      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch orders error:", err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  /* ================= UPDATE STATUS ================= */
  const updateOrderStatus = async (order, newStatus) => {
    try {
      const res = await fetch(`${API_BASE}/${order.orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        /**
         * ✅ VERY IMPORTANT
         * If your backend expects FULL OrderDTO
         */
        body: JSON.stringify({
          ...order,
          status: newStatus,
        }),
      });

      if (!res.ok) throw new Error("Update failed");

      setOrders((prev) =>
        prev.map((o) =>
          o.orderId === order.orderId ? { ...o, status: newStatus } : o
        )
      );
    } catch (err) {
      console.error("Update status error:", err);
      alert("Failed to update order status");
    }
  };

  /* ================= UI ================= */
  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl mb-8">Order Management</h1>

        <div className="bg-white rounded-2xl border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Expected Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {/* LOADING */}
              {loading && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6">
                    Loading orders...
                  </TableCell>
                </TableRow>
              )}

              {/* EMPTY */}
              {!loading && orders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6">
                    No orders found
                  </TableCell>
                </TableRow>
              )}

              {/* DATA */}
              {!loading &&
                orders.map((order) => (
                  <TableRow key={order.orderId}>
                    <TableCell>{order.orderId}</TableCell>
                    <TableCell>{order.customerName}</TableCell>

                    <TableCell>
                      {order.orderDate
                        ? new Date(order.orderDate).toLocaleDateString()
                        : "-"}
                    </TableCell>

                    <TableCell>
                      {order.expectedDate
                        ? new Date(order.expectedDate).toLocaleDateString()
                        : "-"}
                    </TableCell>

                    <TableCell>{order.noOfItems}</TableCell>
                    <TableCell>₹{order.totalAmount}</TableCell>

                    <TableCell>
                      <Select
                        value={order.status}
                        onValueChange={(value) =>
                          updateOrderStatus(order, value)
                        }
                      >
                        <SelectTrigger className="w-36">
                          <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                          {/* ✅ MUST MATCH BACKEND ENUM EXACTLY */}
                          <SelectItem value="PENDING">Pending</SelectItem>
                          <SelectItem value="PROCESSING">Processing</SelectItem>
                          <SelectItem value="SHIPPED">Shipped</SelectItem>
                          <SelectItem value="DELIVERED">Delivered</SelectItem>
                          <SelectItem value="CANCELLED">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
}
