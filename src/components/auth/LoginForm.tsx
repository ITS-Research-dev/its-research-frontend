"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === "teacher@gmail.com") {
      router.push("/teacher/dashboard");
      return;
    }

    if (email === "student@gmail.com") {
      router.push("/student/materials");
      return;
    }

    alert("Email tidak ditemukan");
  };

  return (
    <div className="rounded-3xl bg-white p-8 shadow-xl">
      {/* Logo */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-slate-900">Koda</h1>

        <p className="mt-2 text-gray-500 text-md">Asesmen Adaptif Python</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-5">
        {/* Email */}

        <div>
          <label className="mb-2 block font-medium text-black">
            NISN / NIP
          </label>

          <div className="flex items-center rounded-xl border border-gray-300 px-4">
            <User size={18} className="text-gray-400" />

            <input
              type="text"
              placeholder="Masukkan ID Anda"
              className="h-14 flex-1 border-none bg-transparent px-3 outline-none text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* Password */}

        <div>
          <label className="mb-2 block font-medium text-black">
            Kata Sandi
          </label>

          <div className="flex items-center rounded-xl border border-gray-300 px-4">
            <Lock size={18} className="text-gray-400" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Masukkan Password"
              className="h-14 flex-1 border-none bg-transparent px-3 outline-none text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Button */}

        <button
          type="submit"
          className="h-14 w-full rounded-xl bg-amber-400 font-medium transition hover:bg-amber-500 text-black"
        >
          Masuk
        </button>
      </form>
    </div>
  );
}
