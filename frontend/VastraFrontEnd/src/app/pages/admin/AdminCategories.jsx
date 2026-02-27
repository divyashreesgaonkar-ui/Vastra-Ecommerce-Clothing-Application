/* eslint-disable no-alert */
import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Card } from "../../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Plus, Trash2 } from "lucide-react";

import {
  getAllCategories,
  createCategory,
  deleteCategory,
} from "../../../services/categoryService";

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    code: "",
    description: "",
    imageUrl: "",
  });

  /* ---------- Fetch Categories ---------- */
  const loadCategories = async () => {
    try {
      const data = await getAllCategories();
      setCategories(data || []);
    } catch (err) {
      console.error("Failed to load categories", err);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  /* ---------- Create Category ---------- */
  const handleCreate = async () => {
    if (!form.name.trim()) {
      alert("Category name is required");
      return;
    }

    try {
      await createCategory({
        name: form.name,
        code: form.code,
        description: form.description,
        imageUrl: form.imageUrl,
      });

      setForm({ name: "", code: "", description: "", imageUrl: "" });
      setIsDialogOpen(false);
      loadCategories();
    } catch (err) {
      alert("Failed to create category");
    }
  };

  /* ---------- Delete Category ---------- */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;

    try {
      await deleteCategory(id);
      loadCategories();
    } catch (err) {
      alert("Failed to delete category");
    }
  };

  return (
    <AdminLayout>
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-semibold">Category Management</h1>

          {/* Add Category Dialog */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Category
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Category</DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                <div>
                  <Label>Category Name</Label>
                  <Input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>

                <div>
                  <Label>Category Code</Label>
                  <Input
                    value={form.code}
                    onChange={(e) => setForm({ ...form, code: e.target.value })}
                  />
                </div>

                <div>
                  <Label>Description</Label>
                  <Input
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label>Image URL</Label>
                  <input 
                    value={form.imageUrl}
                    onChange={(e) =>
                      setForm({ ...form, imageUrl: e.target.value })
                    
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <Button className="w-full" onClick={handleCreate}>
                  Save Category
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card key={category.id} className="p-6">
              <h3 className="text-xl mb-2">{category.name}</h3>
              <p className="text-gray-600 mb-4">
                {category.description || "No description"}
              </p>

              {/* ✅ Category Image */}
      <div className="w-full h-40 mb-4 rounded-lg overflow-hidden bg-gray-100">
        <img
          src={category.imageUrl || "/images/categories/default.png"}
          alt={category.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "/images/categories/default.png";
          }}
        />
      </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  Code: {category.code || "—"}
                </span>



                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(category.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </Card>
          ))}

          {/* Add New Card */}
          <Card
            className="border-2 border-dashed border-gray-300 flex items-center justify-center min-h-[200px] cursor-pointer hover:border-gray-400"
            onClick={() => setIsDialogOpen(true)}
          >
            <div className="text-center">
              <Plus className="h-10 w-10 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Add New Category</p>
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
