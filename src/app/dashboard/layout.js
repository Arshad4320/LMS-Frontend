// app/dashboard/layout.tsx
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/courses", label: "Courses" },
  { href: "/dashboard/settings", label: "Settings" },
];

const DashboardLayout = ({ children }) => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleSidebar = () => setMobileOpen(!mobileOpen);

  return (
    <div className="flex min-h-screen">
      <aside
        className={`bg-blue-900 text-white w-64 p-6 space-y-4 md:block fixed md:relative z-50 transition-all duration-300 h-full ${
          mobileOpen ? "left-0" : "-left-full"
        } md:left-0 top-0 md:top-auto`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Admin</h2>
          <button onClick={toggleSidebar} className="md:hidden text-white">
            <X size={24} />
          </button>
        </div>
        <nav className="space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-3 py-2 rounded-md font-medium transition ${
                pathname === link.href ? "bg-blue-700" : "hover:bg-blue-800"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>

      {mobileOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black opacity-50 md:hidden z-0"
        ></div>
      )}

      <div className="flex-1 flex flex-col md:ml-64">
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center md:hidden">
          <button onClick={toggleSidebar} className="text-blue-700">
            <Menu size={24} />
          </button>
          <h1 className="font-semibold text-lg">Dashboard</h1>
        </header>

        <main className="p-6 bg-gray-100 flex-1 min-h-[calc(100vh-64px)]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
