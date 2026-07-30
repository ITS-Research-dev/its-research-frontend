"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useAuth } from "@/hooks/useAuth";
import AlertModal from "../common/AlertModal";
import Loading from "../common/Loading";

export default function LoginForm() {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const start = Date.now();

    try {
      await login({
        username,
        password,
      });
    } catch (error: any) {
      setLoading(false);

      setErrorMessage(error?.response?.data?.message ?? "Terjadi kesalahan.");

      setOpenError(true);

      return;
    } finally {
      const elapsed = Date.now() - start;

      const minimumLoading = 1200;

      if (elapsed < minimumLoading) {
        await new Promise((resolve) =>
          setTimeout(resolve, minimumLoading - elapsed),
        );
      }

      setLoading(false);
    }
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

      <Loading open={loading} text="Sedang masuk..." />

      <AlertModal
        open={openError}
        type="error"
        title="Login Gagal"
        description={errorMessage}
        onClose={() => setOpenError(false)}
      />
    </div>
  );
}
