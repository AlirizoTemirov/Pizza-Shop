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
import { Order } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCategoryStore } from "@/store/useCategoryStore";
import { FaEye } from "react-icons/fa";
import { useState } from "react";

interface ProductProps {
  orders: Order[];
}

export default function ProductsTable({ orders }: ProductProps) {
  const { modalOpen, setVisable } = useCategoryStore();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const router = useRouter();

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
      <div>
        <h1 className="text-[30px] font-bold">Orders</h1>
      </div>
      <div className="border rounded-2xl overflow-hidden mt-8">
        <Table className="text-center">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">N</TableHead>
              <TableHead className="text-center">Name</TableHead>
              <TableHead className="text-center">Location</TableHead>
              <TableHead className="text-center">Phone Number</TableHead>
              <TableHead className="text-center">Orders</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order, index) => {
              const parsedOrders =
                typeof order.orders === "string"
                  ? JSON.parse(order.orders)
                  : order.orders;

              return (
                <TableRow key={order.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <h1 className="text-[22px] font-bold">{order.name}</h1>
                  </TableCell>
                  <TableCell>{order.location}</TableCell>
                  <TableCell>{order.phonenumber}</TableCell>
                  <TableCell>{parsedOrders.length}</TableCell>
                  <TableCell>
                    <button
                      onClick={() => {
                        setSelectedOrder(order);
                        setVisable(true);
                      }}
                      className="bg-gray-100 border border-gray-600 text-gray-600 p-2 rounded-lg cursor-pointer hover:bg-gray-200 transition"
                    >
                      <FaEye size={17} />
                    </button>
                    <button
                      onClick={() => handleDelete(order.id)}
                      className="bg-red-100 border ml-2 border-red-600 text-red-600 p-2 rounded-lg cursor-pointer hover:bg-red-200 transition"
                    >
                      <RiDeleteBin6Line size={17} />
                    </button>
                  </TableCell>
                </TableRow>
              );
            })}
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
              <h2 className="text-3xl font-bold text-gray-800">Order</h2>
            </div>

            {/* Form */}
            <div>
              {selectedOrder && (
                <>
                  <h1 className="text-xl font-bold">
                    Name: {selectedOrder.name}
                  </h1>

                  <p>Location: {selectedOrder.location}</p>
                  <p>Phone: {selectedOrder.phonenumber}</p>

                  <hr className="my-3" />

                  <h2 className="font-bold">Products:</h2>

                  {JSON.parse(selectedOrder.orders).map((item: any) => (
                    <div key={item.id} className="border p-2 rounded-lg mt-2">
                      <p>{item.title}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Price: {item.price}</p>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
