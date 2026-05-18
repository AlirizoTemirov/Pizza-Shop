"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import { Category, Product } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCategoryStore } from "@/store/useCategoryStore";

interface ProductProps {
  products: Product[];
  categories: Category[];
}

export default function ProductsTable({ products, categories }: ProductProps) {
  const {
    modalOpen,
    setVisable,
    changeForm,
    resetForm,
    editingId,
    setEditingId,
    categoryForm,
  } = useCategoryStore();

  const router = useRouter();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId === null) {
        await axios.post(
          "https://serve.faux-api.com/f92ae21abaa048e1a243f392/categories",
          { ...categoryForm }
        );
      } else {
        await axios.put(
          `https://serve.faux-api.com/f92ae21abaa048e1a243f392/categories/${editingId}`,
          { ...categoryForm }
        );
      }

      resetForm();
      setVisable(false);
      setEditingId(null);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(
        `https://serve.faux-api.com/f92ae21abaa048e1a243f392/categories/${id}`
      );
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-[30px] font-bold">Categories</h1>
        <button
          onClick={() => {
            setEditingId(null);
            resetForm();
            setVisable(true);
          }}
          className="bg-[#FE5F1E] text-white px-4 py-3 rounded-xl cursor-pointer transition hover:bg-[#fe5d1edc]"
        >
          + Add Category
        </button>
      </div>
      <div className="border rounded-2xl overflow-hidden mt-8">
        <Table className="text-center">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">N</TableHead>
              <TableHead className="text-center">Category Name</TableHead>
              <TableHead className="text-center">Products</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category, index) => (
              <TableRow key={category.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <h1 className="text-[22px] font-bold">{category.name}</h1>
                </TableCell>
                <TableCell>
                  {
                    products.filter(
                      (product) => Number(product.category) === index + 1
                    ).length
                  }
                </TableCell>
                <TableCell>
                  <button
                    onClick={() => {
                      setVisable(true);
                      setEditingId(category.id);

                      changeForm("name", category.name);
                    }}
                    className="bg-green-100 border border-green-600 text-green-600 p-2 rounded-lg cursor-pointer hover:bg-green-200 transition"
                  >
                    <MdEdit size={17} />
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="bg-red-100 border ml-2 border-red-600 text-red-600 p-2 rounded-lg cursor-pointer hover:bg-red-200 transition"
                  >
                    <RiDeleteBin6Line size={17} />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn"
          onClick={() => setVisable(false)}
        >
          {/* Modal */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg mx-4 bg-white rounded-3xl p-6 shadow-2xl animate-modalScale"
          >
            {/* Close Button */}
            <button
              onClick={() => setVisable(false)}
              className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-red-100 hover:text-red-500 transition"
            >
              ✕
            </button>

            {/* Header */}
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-800">
                {editingId === null ? "Add Category" : "Edit Category"}
              </h2>
            </div>

            {/* Form */}
            <form onSubmit={handleSave} className="space-y-5">
              {/* Product Name */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Category Name
                </label>

                <input
                  value={categoryForm.name}
                  onChange={(e) => changeForm("name", e.target.value)}
                  type="text"
                  placeholder="Enter product name"
                  className="w-full border border-gray-200 bg-gray-50 rounded-2xl px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                />
              </div>

              {/* Footer Buttons */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setVisable(false)}
                  className="px-5 py-3 rounded-2xl border border-gray-300 font-medium hover:bg-gray-100 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-3 rounded-2xl bg-[#FE5F1E] text-white font-medium shadow-lg shadow-orange-200 hover:scale-105 hover:bg-[#e65316] transition duration-300"
                >
                  {editingId === null ? "Save Category" : "Edit Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
