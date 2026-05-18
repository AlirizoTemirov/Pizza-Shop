import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import Image from "next/image";
import { PiBagSimpleThin } from "react-icons/pi";
import { TbCategory } from "react-icons/tb";
import { FiShoppingCart } from "react-icons/fi";

export default async function AdminLoyout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <div className="fixed left-0 h-screen p-6 bg-[#101926]">
        <Link href={"/"}>
          <div className="flex items-center gap-4">
            <Image width={45} height={45} src={"/images/logo.svg"} alt="Logo" />
            <div>
              <h1 className="text-[24px] font-bold text-white">REACT PIZZA</h1>
              <p className="text-white">Admin Panel</p>
            </div>
          </div>
        </Link>

        <div className="mt-10 flex flex-col gap-3">
          <Link href={"/admin/products"}>
            <button className="w-60 py-3 px-5 flex items-center gap-4 rounded-2xl text-white text-start text-xl cursor-pointer hover:bg-[#FE5F1E] transition">
              <PiBagSimpleThin size={30} strokeWidth={13} />
              Products
            </button>
          </Link>
          <Link href={"/admin/categories"}>
            <button className="w-60 py-3 px-5 flex items-center gap-4 rounded-2xl text-white text-start text-xl cursor-pointer hover:bg-[#FE5F1E] transition">
              <TbCategory size={30} />
              Categories
            </button>
          </Link>
          <Link href={"/admin/orders"}>
            <button className="w-60 py-3 px-5 flex items-center gap-4 rounded-2xl text-white text-start text-xl cursor-pointer hover:bg-[#FE5F1E] transition">
              <FiShoppingCart size={30} />
              Orders
            </button>
          </Link>
          <Link className="mt-10 w-fit mx-auto" href={"/"}>
            <button className="flex items-center text-gray-400 hover:text-white transition justify-center gap-2 cursor-pointer">
              <FaArrowLeftLong />
              Go To Home Page
            </button>
          </Link>
        </div>
      </div>
      <div className="ml-72 min-h-screen w-full p-10 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
