import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { FaChevronLeft } from "react-icons/fa";

export default function page() {
  return (
    <div>
      <div className="container mx-auto pl-19.25 pr-9.5 pb-10 pt-12.25 border-b border-gray-300 flex justify-between items-center">
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

      <div className="max-w-205.25 container mx-auto mt-23.5">
        <div className="flex justify-between items-center">
          <h1 className="text-[32px] font-bold flex gap-4.25 items-center">
            <Image
              src={"/images/cart_black.svg"}
              width={29}
              height={29}
              alt="CartImg"
              className=""
            />
            Корзина
          </h1>

          <Button
            variant={"ghost"}
            className="flex gap-1.75 text-[#B6B6B6] cursor-pointer hover:text-red-500 transition"
          >
            <RiDeleteBin6Line />
            Очистить корзину
          </Button>
        </div>

        <div className="mt-7.5">
          <div className="py-7.5 border-t border-[#F4F4F4] flex justify-between items-center">
            <div className="flex items-center gap-4">
              <img
                className="w-20 h-20"
                src="/images/cart_black.svg"
                alt="ProductImg"
              />
              <div>
                <h1 className="text-[22px] font-bold">Сырный цыпленок</h1>
                <p className="text-[18px] text-[#8D8D8D]">
                  тонкое тесто, 26 см.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-23.25">
              <div className="flex gap-3 items-center">
                <button className="w-8 h-8 border border-[#FE5F1E] rounded-full text-2xl cursor-pointer text-[#FE5F1E] hover:bg-[#FE5F1E] hover:text-white transition">
                  <FaMinus size={16} className="mx-auto" />
                </button>
                <h1 className="text-[22px] font-bold">2</h1>
                <button className="w-8 h-8 border border-[#FE5F1E] rounded-full text-2xl cursor-pointer text-[#FE5F1E] hover:bg-[#FE5F1E] hover:text-white transition">
                  <FaPlus size={16} className="mx-auto" />
                </button>
              </div>

              <h1 className="text-[22px] font-bold">770 ₽</h1>

              <button className="w-8 h-8 border border-[#D7D7D7] rounded-full text-2xl cursor-pointer text-[#D7D7D7] hover:bg-red-600 hover:text-white transition">
                <IoMdClose size={16} className="mx-auto" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-10">
          <h1 className="text-[22px]">
            Всего пицц: <span className="font-bold">3 шт.</span>
          </h1>
          <h1 className="text-[22px]">
            Сумма заказа:{" "}
            <span className="font-bold text-[#FE5F1E]">900 ₽</span>
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
    </div>
  );
}
