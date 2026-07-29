"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import { useRouter } from "next/navigation";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function LoginForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (username === "teacher@gmail.com") {
      router.push("/teacher/dashboard");
      return;
    }

    if (username === "student@gmail.com") {
      router.push("/student/materials");
      return;
    }

    alert("Username tidak ditemukan");
  };

  return (
    <div className="rounded-3xl bg-surface p-8 shadow-xl">
      {/* Logo */}

      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-primary">Koda</h1>

        <p className="mt-2 text-description">Asesmen Adaptif Python</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-5">
        <Input
          label="NISN / NIP"
          placeholder="Masukkan ID Anda"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          leftIcon={<User size={18} />}
          required
        />

        <Input
          label="Kata Sandi"
          type={showPassword ? "text" : "password"}
          placeholder="Masukkan Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          leftIcon={<Lock size={18} />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="transition hover:text-primary"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          }
          required
        />

        <Button type="submit" size="lg" fullWidth>
          Masuk
        </Button>
      </form>
    </div>
  );
}
