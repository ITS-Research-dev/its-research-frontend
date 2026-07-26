import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main
      className="relative flex min-h-screen items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/bg-login.png')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md px-4">
        <LoginForm />
      </div>
    </main>
  );
}
