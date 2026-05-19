"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { FaChevronLeft } from "react-icons/fa";
import { useCartStore } from "@/store/useCartStore";
import { useOrderStore } from "@/store/useOrderStore";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function page() {
  const { cart, clearCart, decrement, increment, removeItem } = useCartStore();
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const { modalOpen, setVisable, changeForm, orderForm, resetForm } =
    useOrderStore();

  const router = useRouter();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://serve.faux-api.com/f92ae21abaa048e1a243f392/orders",
        { ...orderForm, orders: JSON.stringify(cart) }
      );

      router.refresh();
      clearCart();
      setVisable(false);
      alert("order created!");
    } catch (error) {
      alert("error");
      console.log(error);
    }
  };

  return (
    <div>
      <div className="container sticky top-0 z-50 bg-white mx-auto pl-19.25 pr-9.5 py-6 border-b border-gray-300 flex justify-between items-center">
        <Link href={"/"}>
          <div className="flex items-center gap-4">
            <Image width={38} height={38} src={"/images/logo.svg"} alt="Logo" />
            <div>
              <h1 className="text-[24px] font-bold">REACT PIZZA</h1>
              <p className="text-[#7B7B7B]">самая вкусная пицца во вселенной</p>
            </div>
          </div>
        </Link>
      </div>

      {cart.length === 0 ? (
        <div className="text-center mt-10">
          <h1 className="text-[32px] font-bold">Корзина пустая 😕</h1>
          <p className="text-[18px] text-[#777777] w-136.75 mt-2.5 mx-auto">
            Вероятней всего, вы не заказывали ещё пиццу. Для того, чтобы
            заказать пиццу, перейди на главную страницу.
          </p>
          <Image
            src={"/images/shopping-cart.png"}
            alt="Image"
            width={300}
            height={255}
            className="mt-11.75 mx-auto"
          />
          <Link href={"/"}>
            <button className="px-5.5 py-3 flex gap-2 items-center cursor-pointer rounded-4xl text-white bg-black mx-auto mt-18.5">
              Вернуться назад
            </button>
          </Link>
        </div>
      ) : (
        <div className="max-w-205.25 container mx-auto mt-23.5 pb-10">
          <div className="flex justify-between items-center">
            <h1 className="text-[32px] font-bold flex gap-4.25 items-center">
              <Image
                src={"/images/cart_black.svg"}
                width={29}
                height={29}
                alt="CartImg"
              />
              Корзина
            </h1>

            <Button
              onClick={() => clearCart()}
              variant={"ghost"}
              className="flex gap-1.75 text-[#B6B6B6] cursor-pointer hover:text-red-500 transition"
            >
              <RiDeleteBin6Line />
              Очистить корзину
            </Button>
          </div>

          <div className="mt-7.5">
            {cart.map((cart) => (
              <div
                key={cart.id}
                className="py-7.5 border-t border-[#F4F4F4] flex justify-between items-center"
              >
                <div className="flex items-center gap-4">
                  <img
                    className="w-20 h-20"
                    src={cart.imageUrl}
                    alt="ProductImg"
                  />
                  <div>
                    <h1 className="text-[22px] font-bold">{cart.title}</h1>
                    <p className="text-[18px] text-[#8D8D8D]">
                      {cart.types}, {cart.sizes} см.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between w-102.5">
                  <div className="flex w-28.25 items-center justify-between">
                    <button
                      onClick={() => decrement(cart.id)}
                      className="w-8 h-8 border border-[#FE5F1E] rounded-full text-2xl cursor-pointer text-[#FE5F1E] hover:bg-[#FE5F1E] hover:text-white transition"
                    >
                      <FaMinus size={16} className="mx-auto" />
                    </button>
                    <h1 className="text-[22px] font-bold">{cart.quantity}</h1>
                    <button
                      onClick={() => increment(cart.id)}
                      className="w-8 h-8 border border-[#FE5F1E] rounded-full text-2xl cursor-pointer text-[#FE5F1E] hover:bg-[#FE5F1E] hover:text-white transition"
                    >
                      <FaPlus size={16} className="mx-auto" />
                    </button>
                  </div>

                  <h1 className="text-[22px] font-bold">
                    {cart.price * cart.quantity} ₽
                  </h1>

                  <button
                    onClick={() => removeItem(cart.id)}
                    className="w-8 h-8 border border-[#D7D7D7] rounded-full text-2xl cursor-pointer text-[#D7D7D7] hover:bg-red-600 hover:text-white transition"
                  >
                    <IoMdClose size={16} className="mx-auto" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-10">
            <h1 className="text-[22px]">
              Всего пицц: <span className="font-bold">{totalCount} шт.</span>
            </h1>
            <h1 className="text-[22px]">
              Сумма заказа:{" "}
              <span className="font-bold text-[#FE5F1E]">{totalPrice} ₽</span>
            </h1>
          </div>

          <div className="mt-10 flex justify-between">
            <Link href={"/"}>
              <button className="px-5.5 py-3 flex gap-2 items-center cursor-pointer rounded-4xl border border-[#D3D3D3] text-[#D3D3D3] hover:bg-black hover:text-white transition">
                <FaChevronLeft />
                Вернуться назад
              </button>
            </Link>
            <button
              onClick={() => setVisable(true)}
              className="px-5.5 py-3 flex gap-2 items-center cursor-pointer rounded-4xl text-white bg-[#FE5F1E] hover:bg-[#fe5d1ed3] transition"
            >
              Оплатить сейчас
            </button>
          </div>
        </div>
      )}

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
                Order Product
              </h2>
            </div>

            {/* Form */}
            <form onSubmit={handleSave} className="space-y-5">
              {/* Product Name */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Name
                </label>

                <input
                  value={orderForm.name}
                  onChange={(e) => changeForm("name", e.target.value)}
                  type="text"
                  placeholder="Enter name"
                  className="w-full border border-gray-200 bg-gray-50 rounded-2xl px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                />

                <label className="block mb-2 mt-5 text-sm font-semibold text-gray-700">
                  Location
                </label>

                <input
                  value={orderForm.location}
                  onChange={(e) => changeForm("location", e.target.value)}
                  type="text"
                  placeholder="Enter Location"
                  className="w-full border border-gray-200 bg-gray-50 rounded-2xl px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                />

                <label className="block mb-2 mt-5 text-sm font-semibold text-gray-700">
                  Phone Number
                </label>

                <input
                  value={orderForm.phonenumber}
                  onChange={(e) => changeForm("phonenumber", e.target.value)}
                  type="text"
                  placeholder="Enter phone number"
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
                  className="px-5 py-3 cursor-pointer rounded-2xl bg-[#FE5F1E] text-white font-medium shadow-lg shadow-orange-200 hover:scale-105 hover:bg-[#e65316] transition duration-300"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
