import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../../components/ui/dialog";
import { Plus, Trash2 } from "lucide-react";
import { Badge } from "../../components/ui/badge";

import {
  getAllProducts,
  createProduct,
  deleteProduct
} from "/src/services/productService";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stockQuantity: "",
    description: "",
    url: "",
    categoryId: ""
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await getAllProducts();
    setProducts(data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ NEW: proper submit handler
  const handleSubmit = async (e) => {
    e.preventDefault(); // 🔥 REQUIRED

    try {
      await createProduct({
        ...formData,
        price: Number(formData.price),
        stockQuantity: Number(formData.stockQuantity),
        categoryId: Number(formData.categoryId)
      });

      setIsDialogOpen(false);
      setFormData({
        name: "",
        price: "",
        stockQuantity: "",
        description: "",
        url: "",
        categoryId: ""
      });
      loadProducts();
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Failed to save product");
    }
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    loadProducts();
  };

  return (
    <AdminLayout>
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl">Product Management</h1>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Product
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Product</DialogTitle>
            </DialogHeader>

            {/* ✅ FORM START */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <Input
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <Input
                name="price"
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                required
              />

              <Input
                name="stockQuantity"
                type="number"
                placeholder="Stock"
                value={formData.stockQuantity}
                onChange={handleChange}
                required
              />

              <Input
                name="categoryId"
                placeholder="Category ID"
                value={formData.categoryId}
                onChange={handleChange}
                required
              />

              <Input
                name="url"
                placeholder="Image URL"
                value={formData.url}
                onChange={handleChange}
                required
              />

              <Input
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
              />

              <Button type="submit" className="w-full">
                Save
              </Button>
            </form>
            {/* ✅ FORM END */}
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.map((p) => (
            <TableRow key={p.id}>
              <TableCell>
                <img
                  src={p.url}
                  alt={p.name}
                  className="w-12 h-12 rounded"
                  onError={(e) => {
    e.target.onerror = null;
    e.target.src = "/images/placeholder.png";
  }}
                />
              </TableCell>
              <TableCell>{p.name}</TableCell>
              <TableCell>₹{p.price}</TableCell>
              <TableCell>
                <Badge>{p.stockQuantity}</Badge>
              </TableCell>
              <TableCell>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(p.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </AdminLayout>
  );
}
