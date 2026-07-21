import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";

function MainLayout({ children }) {
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < 1024
  );

  const [sidebarOpen, setSidebarOpen] = useState(
    window.innerWidth >= 1024
  );

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);

      if (!mobile) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () =>
      window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile && sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [sidebarOpen, isMobile]);

  return (
    <div className="flex bg-bgPrimary text-white min-h-screen overflow-hidden relative">
      {/* Backdrop */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={
          isMobile
            ? `fixed top-0 left-0 h-screen z-50 transform transition-transform duration-300 ${
                sidebarOpen
                  ? "translate-x-0"
                  : "-translate-x-full"
              }`
            : "relative"
        }
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 relative overflow-hidden">
        {typeof children === "function"
          ? children({ sidebarOpen, setSidebarOpen })
          : children}
      </div>
    </div>
  );
}

export default MainLayout;