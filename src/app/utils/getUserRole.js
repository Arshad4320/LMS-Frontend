import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

export const getUserRole = () => {
  const token = Cookies.get("token");
  if (!token) return null;

  try {
    const decoded = jwt_decode(token);
    return decoded.role;
  } catch (error) {
    return null;
  }
};
