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
import { useProductStore } from "@/store/useProductStore";
import axios from "axios";
import { useRouter } from "next/navigation";

interface ProductProps {
  products: Product[];
  categories: Category[];
}

export default function ProductsTable({ products, categories }: ProductProps) {
  const {
    modalOpen,
    setVisable,
    changeForm,
    productForm,
    resetForm,
    editingId,
    setEditingId,
  } = useProductStore();

  const router = useRouter();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId === null) {
        await axios.post(
          "https://serve.faux-api.com/f92ae21abaa048e1a243f392/products",
          { ...productForm, price: parseInt(productForm.price) }
        );
      } else {
        await axios.put(
          `https://serve.faux-api.com/f92ae21abaa048e1a243f392/products/${editingId}`,
          { ...productForm, price: parseInt(productForm.price) }
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
        `https://serve.faux-api.com/f92ae21abaa048e1a243f392/products/${id}`
      );
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-[30px] font-bold">Products</h1>
        <button
          onClick={() => {
            setEditingId(null);
            resetForm();
            setVisable(true);
          }}
          className="bg-[#FE5F1E] text-white px-4 py-3 rounded-xl cursor-pointer transition hover:bg-[#fe5d1edc]"
        >
          + Add Product
        </button>
      </div>
      <div className="border rounded-2xl overflow-hidden mt-8">
        <Table className="text-center">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Image</TableHead>
              <TableHead className="text-center">Product Name</TableHead>
              <TableHead className="text-center">Category</TableHead>
              <TableHead className="text-center">Price</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <img
                    className="w-10 h-10 mx-auto"
                    src={product.imageUrl}
                    alt={product.title}
                  />
                </TableCell>
                <TableCell>
                  <h1 className="text-[22px] font-bold">{product.title}</h1>
                </TableCell>
                <TableCell>
                  <div className="p-1 font-bold border border-blue-700 bg-blue-100 text-blue-700 rounded-lg text-[12px] w-fit mx-auto">
                    {categories[product.category - 1]?.name}
                  </div>
                </TableCell>
                <TableCell className="font-bold">{product.price} ₽</TableCell>
                <TableCell>
                  <button
                    onClick={() => {
                      setVisable(true);
                      setEditingId(product.id);

                      changeForm("title", product.title);
                      changeForm("imageUrl", product.imageUrl);
                      changeForm("price", product.price + "");
                      changeForm("category", product.category + "");
                    }}
                    className="bg-green-100 border border-green-600 text-green-600 p-2 rounded-lg cursor-pointer hover:bg-green-200 transition"
                  >
                    <MdEdit size={17} />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
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
                {editingId === null ? "Add Product" : "Edit Product"}
              </h2>
              <p className="text-gray-500 mt-1 text-sm">
                Fill all product information
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSave} className="space-y-5">
              {/* Product Name */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Product Name
                </label>

                <input
                  value={productForm.title}
                  onChange={(e) => changeForm("title", e.target.value)}
                  type="text"
                  placeholder="Enter product name"
                  className="w-full border border-gray-200 bg-gray-50 rounded-2xl px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                />
              </div>

              {/* Image URL */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Image URL
                </label>

                <input
                  value={productForm.imageUrl}
                  onChange={(e) => changeForm("imageUrl", e.target.value)}
                  type="text"
                  placeholder="Enter image url"
                  className="w-full border border-gray-200 bg-gray-50 rounded-2xl px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Category
                </label>

                <select
                  value={productForm.category}
                  onChange={(e) => changeForm("category", e.target.value)}
                  className="w-full border border-gray-200 bg-gray-50 rounded-2xl px-4 py-3 outline-none transition "
                >
                  {categories.map((category, index) => (
                    <option key={category.id} value={index + 1}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Price
                </label>

                <input
                  value={productForm.price}
                  onChange={(e) => changeForm("price", e.target.value)}
                  type="number"
                  placeholder="Enter price"
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
                  {editingId === null ? "Save Product" : "Edit Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
