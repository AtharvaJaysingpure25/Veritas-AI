import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../api/authApi";
import toast from "react-hot-toast";

function SignupPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isStrongPassword = (password) => {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(password)
    );
  };

  const handleSignup = async () => {
    if (
      !form.fullName.trim() ||
      !form.email.trim() ||
      !form.password.trim() ||
      !form.confirmPassword.trim()
    ) {
      toast.error("Please fill all fields");
      return;
    }

    if (!isValidEmail(form.email)) {
      toast.error("Please enter a valid email");
      return;
    }

    if (!isStrongPassword(form.password)) {
      toast.error(
        "Password must be 8+ chars with uppercase, lowercase, number & special symbol"
      );
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await signupUser(
        form.fullName,
        form.email,
        form.password
      );

      toast.success("Signup successful! Redirecting...");

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.detail ||
          error?.message ||
          "Signup failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bgPrimary flex items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-md bg-card p-6 sm:p-8 md:p-10 rounded-3xl border border-white/10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-white">
          Create Account
        </h1>

        <p className="text-muted mb-6 md:mb-8">
          Join Verify IT today
        </p>

        <div className="space-y-4">
          <input
            placeholder="Full Name"
            value={form.fullName}
            onChange={(e) =>
              setForm({ ...form, fullName: e.target.value })
            }
            className="w-full p-3 md:p-4 rounded-xl bg-black/20 text-white outline-none"
          />

          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            className="w-full p-3 md:p-4 rounded-xl bg-black/20 text-white outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            className="w-full p-3 md:p-4 rounded-xl bg-black/20 text-white outline-none"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({
                ...form,
                confirmPassword: e.target.value,
              })
            }
            onKeyDown={(e) =>
              e.key === "Enter" && handleSignup()
            }
            className="w-full p-3 md:p-4 rounded-xl bg-black/20 text-white outline-none"
          />

          <button
            onClick={handleSignup}
            disabled={loading}
            className={`w-full py-3 md:py-4 rounded-xl font-semibold transition ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-accent hover:bg-accent2"
            }`}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

          {/* Login redirect */}
          <div className="pt-2 text-center text-sm text-muted">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-accent font-semibold cursor-pointer hover:underline"
            >
              Login
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;