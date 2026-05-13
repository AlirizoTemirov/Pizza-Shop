"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { FaChevronLeft } from "react-icons/fa";
import { useCartStore } from "@/store/useCartStore";

export default function page() {
  const { cart, clearCart, decrement, increment, removeItem } = useCartStore();
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.count,
    0
  );
  const totalCount = cart.reduce((sum, item) => sum + item.count, 0);

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
                    src={cart.image}
                    alt="ProductImg"
                  />
                  <div>
                    <h1 className="text-[22px] font-bold">{cart.name}</h1>
                    <p className="text-[18px] text-[#8D8D8D]">
                      {cart.type} тесто, {cart.size} см.
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
                    <h1 className="text-[22px] font-bold">{cart.count}</h1>
                    <button
                      onClick={() => increment(cart.id)}
                      className="w-8 h-8 border border-[#FE5F1E] rounded-full text-2xl cursor-pointer text-[#FE5F1E] hover:bg-[#FE5F1E] hover:text-white transition"
                    >
                      <FaPlus size={16} className="mx-auto" />
                    </button>
                  </div>

                  <h1 className="text-[22px] font-bold">
                    {cart.price * cart.count} ₽
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
            <button className="px-5.5 py-3 flex gap-2 items-center cursor-pointer rounded-4xl text-white bg-[#FE5F1E] hover:bg-[#fe5d1ed3] transition">
              Оплатить сейчас
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
