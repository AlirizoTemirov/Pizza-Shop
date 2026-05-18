"use client";

import { createClient } from "@/utils/client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const supabase = createClient();
  const router = useRouter();

  const handleLogOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <button
      onClick={handleLogOut}
      className="py-2 rounded-2xl text-white mt-68 cursor-pointer bg-red-600"
    >
      logout
    </button>
  );
}
