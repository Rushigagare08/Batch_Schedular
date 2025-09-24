import Link from "next/link";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Logo */}
 

      <div className="logo">
  <span className="link">
        <Link href="/"> <img src="/linklogo.png"  alt="Linkcode Logo" className="footer-logo" /></Link>
    </span>
    </div>





      {/* Menu */}
      <ul className="nav-links">
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/schedule">Lec Dashboard</Link>
        </li>
        <li>
          <Link href="/admin">Admin</Link>
        </li>
        <li>
          <Link href="/login">Login</Link>
        </li>
        <li>
          <Link href="/user-info">
             <span className="user-icon">👤</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
