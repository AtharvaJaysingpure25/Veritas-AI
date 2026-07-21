import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../api/authApi";
import toast from "react-hot-toast";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!email.trim() || !password.trim()) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const data = await loginUser(email, password);

      localStorage.setItem(
        "user",
        JSON.stringify({
          id: data.id,
          name: data.name,
          email: data.email,
          token: data.token || null,
        })
      );

      toast.success("Login successful");

      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 800);
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.detail || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bgPrimary flex items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-md bg-card p-6 sm:p-8 md:p-10 rounded-3xl border border-white/10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-white">
          Welcome Back
        </h1>

        <p className="text-muted mb-6 md:mb-8 text-sm md:text-base">
          Login to continue using Verify IT
        </p>

        <div className="space-y-4 md:space-y-5">
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 md:p-4 rounded-xl bg-black/20 text-white outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && login()}
            className="w-full p-3 md:p-4 rounded-xl bg-black/20 text-white outline-none"
          />

          <button
            onClick={login}
            disabled={loading}
            className={`w-full py-3 md:py-4 rounded-xl font-semibold transition ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-accent hover:bg-accent2"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Signup redirect */}
          <div className="pt-2 text-center text-sm text-muted">
            Don&apos;t have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-accent font-semibold cursor-pointer hover:underline"
            >
              Sign up
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;