// src/components/Header.tsx
import { Link } from "react-router";

export default function Header() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <Link to="/" className="font-bold text-lg">
        UserManagerPro
      </Link>
      <div className="space-x-4">
        <Link to="/users" className="hover:underline">
          Users
        </Link>
        <Link to="/add" className="hover:underline">
          Add User
        </Link>
      </div>
    </nav>
  );
}
