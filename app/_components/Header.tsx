import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <div className="pl-19.25 pr-9.5 pb-10 pt-12.25 border-b flex justify-between items-center">
      <Link href={"/"}>
        <div className="flex items-center gap-4">
          <Image width={38} height={38} src={"/images/logo.svg"} alt="Logo" />
          <div>
            <h1 className="text-[24px] font-bold">REACT PIZZA</h1>
            <p className="text-[#7B7B7B]">самая вкусная пицца во вселенной</p>
          </div>
        </div>
      </Link>

      <Button
        variant={"default"}
        className="px-5 py-4 rounded-2xl bg-[#FE5F1E] flex items-center"
      >
        520$
        <div className="border-r h-5"></div>
        <Image width={16} height={16} src={"/images/cart.svg"} alt="Cart" />
        14
      </Button>
    </div>
  );
}
