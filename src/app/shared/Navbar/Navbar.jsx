"use client";

import { useSelector, useDispatch } from "react-redux";
import { logout, setUser } from "@/app/redux/features/auth/authSlice";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        dispatch(
          setUser({
            id: decoded?.id,
            name: decoded?.name || "User",
            role: decoded?.role,
          })
        );
      } catch {
        dispatch(logout());
      }
    }
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-xl font-bold text-blue-600">LMS</div>

        <div className="flex items-center gap-6">
          <Link href="/" className="hover:text-blue-700">
            Courses
          </Link>

          {!user && (
            <Link href="/components/login-form" className="hover:text-blue-700">
              Login
            </Link>
          )}

          {user?.role === "admin" && (
            <>
              <Link href="/dashboard" className="hover:text-blue-700">
                Dashboard
              </Link>
              <span className="text-sm font-medium">{user?.name}</span>
              <button onClick={handleLogout} className="text-red-500">
                Logout
              </button>
            </>
          )}

          {user?.role === "user" && (
            <>
              <span className="text-sm font-medium">{user?.name}</span>
              <button onClick={handleLogout} className="text-red-500">
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
