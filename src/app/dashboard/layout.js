"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";

const navLinks = [
  { href: "/dashboard", label: "Dashboard" },
  {
    label: "Courses",
    children: [
      { href: "/dashboard/courses", label: "Courses List" },
      { href: "/dashboard/courses/add-course", label: "Add Course" },
    ],
  },
  {
    label: "Modules",
    children: [
      {
        href: "/dashboard/modules ",
        label: "Module List",
      },
      { href: "/dashboard/modules/add-modules", label: "Add Module" },
    ],
  },
  {
    label: "Lectures",
    children: [
      { href: "/dashboard/lecture", label: "Lecture List" },
      { href: "/dashboard/lecture/add-lecture", label: "Add Lecture" },
    ],
  },
];

const DashboardLayout = ({ children }) => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState();

  const toggleSidebar = () => setMobileOpen((prev) => !prev);
  const handleDropdown = (label) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  return (
    <div className="flex min-h-screen bg-gray-100 relative">
      {/* Sidebar */}
      <aside
        className={`bg-blue-900 text-white w-[280px] p-6 space-y-4 md:block fixed md:relative transition-all duration-300 h-full overflow-y-auto ${
          mobileOpen ? "left-0 z-50" : "-left-full"
        } md:left-0 md:z-0 top-0`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Admin</h2>
          <button onClick={toggleSidebar} className="md:hidden text-white z-50">
            <X size={24} />
          </button>
        </div>

        <nav className="space-y-1">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.label}>
                <button
                  onClick={() => handleDropdown(link.label)}
                  className={`w-full flex justify-between items-center px-4 py-2 rounded-md font-medium text-left transition-all duration-200 ${
                    pathname?.startsWith(
                      link.children[0].href.split("/").slice(0, 3).join("/")
                    )
                      ? "bg-white/10 border-l-4 border-white"
                      : "hover:bg-white/10"
                  }`}
                >
                  {link.label}
                  {openDropdown === link.label ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>

                {/* Dropdown Links */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    openDropdown === link.label ? "max-h-40 mt-1" : "max-h-0"
                  }`}
                >
                  <div className="ml-2 space-y-1">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`block px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                          pathname === child.href
                            ? "bg-white/10 border-l-4 border-white"
                            : "hover:bg-white/10"
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? "bg-white/10 border-l-4 border-white"
                    : "hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>
      </aside>

      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/50 md:hidden z-40"
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center md:hidden">
          <button onClick={toggleSidebar} className="text-blue-700">
            <Menu size={24} />
          </button>
          <h1 className="font-semibold text-lg">Dashboard</h1>
        </header>

        <main className="p-6 flex-1">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
