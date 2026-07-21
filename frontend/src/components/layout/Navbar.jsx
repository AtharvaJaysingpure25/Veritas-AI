import { useState, useEffect, useRef } from "react";
import { User, Menu, Moon } from "lucide-react";
import logo from "../../assets/verifyit-logo.png";

function Navbar({
  isLoggedIn,
  user,
  sidebarOpen,
  setSidebarOpen,
}) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div className="w-full h-16 md:h-20 px-3 sm:px-4 md:px-6 border-b border-white/10 flex justify-between items-center bg-bgPrimary relative z-50">
      {/* Left */}
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-card transition"
        >
          <Menu size={24} />
        </button>

        <img
          src={logo}
          alt="Verify IT"
          className="w-20 sm:w-24 md:w-40 object-contain"
        />
      </div>

      {/* Right */}
      <div
        className="flex items-center gap-2 md:gap-4 relative"
        ref={menuRef}
      >
        {/* Dark mode button only desktop */}
        <button className="hidden md:flex w-11 h-11 rounded-full bg-card items-center justify-center hover:bg-white/10">
          <Moon size={18} />
        </button>

        {!isLoggedIn ? (
          <>
            {/* Mobile */}
            <button
              onClick={() =>
                (window.location.href = "/login")
              }
              className="md:hidden px-3 py-2 rounded-xl bg-accent text-sm font-medium"
            >
              Login
            </button>

            {/* Desktop */}
            <div className="hidden md:flex gap-3">
              <button
                onClick={() =>
                  (window.location.href = "/login")
                }
                className="px-5 py-2 rounded-xl border border-white/20 hover:bg-card"
              >
                Login
              </button>

              <button
                onClick={() =>
                  (window.location.href = "/signup")
                }
                className="px-5 py-2 rounded-xl bg-accent hover:bg-accent2"
              >
                Sign Up
              </button>
            </div>
          </>
        ) : (
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-accent flex items-center justify-center"
            >
              <User size={18} />
            </button>

            {showMenu && (
              <div className="absolute right-0 top-14 w-44 sm:w-48 bg-card rounded-xl p-3 border border-white/10 shadow-xl">
                <button
                  onClick={() =>
                    alert(
                      `Name: ${user?.name}\nEmail: ${user?.email}`
                    )
                  }
                  className="w-full text-left px-3 py-2 hover:bg-black/20 rounded-lg text-sm"
                >
                  My Profile
                </button>

                <button
                  onClick={logout}
                  className="w-full text-left px-3 py-2 hover:bg-red-500/20 rounded-lg text-red-400 text-sm"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;