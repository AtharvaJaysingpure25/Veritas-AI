import ChatInput from "./ChatInput";
import { useNavigate } from "react-router-dom";
import { User, Menu } from "lucide-react";
import { useState } from "react";
import logo from "../../assets/verifyit-logo.png";

function WelcomeScreen({
  onSend,
  isLoggedIn,
  user,
  sidebarOpen,
  setSidebarOpen,
}) {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div className="h-full flex flex-col px-4 md:px-8 py-4 md:py-6">
      {/* Top Navbar */}
      <div className="w-full flex justify-between items-center mb-6 md:mb-8">
        <div className="flex items-center gap-3 md:gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-card transition"
          >
            <Menu size={22} />
          </button>

          <img
            src={logo}
            alt="Verify IT"
            className="w-24 md:w-32 object-contain"
          />
        </div>

        <div className="relative">
          {!isLoggedIn ? (
            <div className="flex gap-2 md:gap-4">
              <button
                onClick={() => navigate("/login")}
                className="px-3 md:px-5 py-2 text-sm md:text-base rounded-xl border border-white/20"
              >
                Login
              </button>

              <button
                onClick={() => navigate("/signup")}
                className="px-3 md:px-5 py-2 text-sm md:text-base rounded-xl bg-accent"
              >
                Sign Up
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-accent flex items-center justify-center"
              >
                <User size={18} />
              </button>

              {showMenu && (
                <div className="absolute right-0 top-14 w-48 bg-card rounded-xl p-3 border border-white/10 z-50">
                  <button
                    onClick={() =>
                      alert(`Name: ${user.name}\nEmail: ${user.email}`)
                    }
                    className="w-full text-left px-3 py-2 hover:bg-black/20 rounded-lg"
                  >
                    Profile
                  </button>

                  <button
                    onClick={logout}
                    className="w-full text-left px-3 py-2 hover:bg-red-500/20 rounded-lg text-red-400"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Center */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="text-center max-w-3xl mb-8 md:mb-10">
          <div className="flex justify-center mb-6 md:mb-8">
            <img
              src={logo}
              alt="Veritas AI"
              className="w-32 md:w-48 object-contain"
            />
          </div>

          <p className="text-muted text-base md:text-xl leading-relaxed px-2">
            Upload PDFs, images, or text to verify educational content.
          </p>
        </div>

        <div className="w-full max-w-2xl mt-4">
          <ChatInput onSend={onSend} />
        </div>
      </div>
    </div>
  );
}

export default WelcomeScreen;