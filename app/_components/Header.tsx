"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

export default function Header() {
  const { cart } = useCartStore();
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="pl-19.25 pr-9.5 py-6 sticky top-0 z-50 bg-white border-b border-gray-300 flex justify-between items-center">
      <Link href={"/"}>
        <div className="flex items-center gap-4">
          <Image width={38} height={38} src={"/images/logo.svg"} alt="Logo" />
          <div>
            <h1 className="text-[24px] font-bold">REACT PIZZA</h1>
            <p className="text-[#7B7B7B]">самая вкусная пицца во вселенной</p>
          </div>
        </div>
      </Link>

      <div className="flex gap-4 items-center">
        <Link className="flex items-center" href={"/admin/products"}>
          <button className="cursor-pointer">
            <MdOutlineAdminPanelSettings size={30} />
          </button>
        </Link>

        <Link href={"/cart"}>
          <Button
            variant={"default"}
            className="px-5 py-4 rounded-2xl bg-[#FE5F1E] text-white flex items-center transition-all cursor-pointer hover:bg-[#fe5d1ed2]"
          >
            {totalPrice}₽<div className="border-r h-5"></div>
            <Image width={16} height={16} src={"/images/cart.svg"} alt="Cart" />
            {totalCount}
          </Button>
        </Link>
      </div>
    </div>
  );
}
