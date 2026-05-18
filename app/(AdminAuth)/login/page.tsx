"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useAdminAuthStore } from "@/store/useAdminAuthStore";
import { createClient } from "@/utils/client";
import { useRouter } from "next/navigation";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function page() {
  const router = useRouter();
  const { adminAuthForm, changeForm, resetForm } = useAdminAuthStore();
  const supabase = createClient();
  const email = adminAuthForm.email;
  const password = adminAuthForm.password;

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      resetForm();
      return;
    }
    router.push("/admin/products");
    resetForm();
  };

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold mt-7">Admin Dashboard</h1>
        <p className="text-lg text-gray-500 mt-2">
          Sign in to manage pizza postings
        </p>

        <div className="w-112.5 p-7 rounded-2xl bg-white border mt-6">
          <p className="font-bold">Email</p>
          <Input
            value={adminAuthForm.email}
            onChange={(e) => changeForm("email", e.target.value)}
            className="mt-1 py-4"
            placeholder="admin@pizzashop.com"
          />

          <p className="font-bold mt-6">Password</p>
          <Input
            value={adminAuthForm.password}
            onChange={(e) => changeForm("password", e.target.value)}
            className="mt-1 py-4"
            placeholder="Enter your password"
          />

          <button
            onClick={handleLogin}
            className="w-full bg-black text-white py-2 rounded-xl text-lg cursor-pointer mt-5"
          >
            Sign In
          </button>
          <Link className="mt-10 w-fit mx-auto" href={"/"}>
            <button className="flex items-center mx-auto mt-3 transition justify-center gap-2 cursor-pointer">
              <FaArrowLeftLong />
              Go To Home Page
            </button>
          </Link>

          <div className="text-sm bg-gray-100 rounded-2xl p-5 mt-6">
            <p className="font-bold mb-2">Demo Credentials:</p>
            <p className="text-gray-500">Email: admin@gmail.com</p>
            <p className="text-gray-500">Password: admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
