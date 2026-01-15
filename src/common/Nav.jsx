import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logoutAction } from "../redux/authSlice";
import { FiLogOut, FiUserPlus, FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";
import "./nav.css";

function Nav() {
  const { user } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart?.items || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);

  const closeAllMenus = () => {
    setMenuOpen(false);
    setProductOpen(false);
  };

  const handleLogout = () => {
    dispatch(logoutAction());
    closeAllMenus();
    navigate("/");
  };

  return (
    <header className="navbar">
      {/* LOGO */}
      <div className="logo">
        <img src="/src/assets/logo3.png" alt="Logo" />
      </div>

      {/* HAMBURGER */}
      <div
        className="menu-icon"
        onClick={() => {
          setMenuOpen(!menuOpen);
          setProductOpen(false);
        }}
      >
        {menuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
      </div>

      {/* NAV LINKS */}
      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        {user?.role === "admin" ? (
          <>
            <Link to="/home" onClick={closeAllMenus}>Home</Link>
            <Link to="/addProduct" onClick={closeAllMenus}>Add Products</Link>
            <Link to="/listProduct" onClick={closeAllMenus}>List Products</Link>
            <Link to="/order" onClick={closeAllMenus}>Orders</Link>
            <Link to="/offer" onClick={closeAllMenus}>Offers</Link>
            <span>About</span>
          </>
        ) : (
          <>
            <Link to="/home" onClick={closeAllMenus}>Home</Link>

            {/* PRODUCTS DROPDOWN */}
            <div className="dropdown">
              <span
                className="dropdown-title"
                onClick={() => setProductOpen((prev) => !prev)}
              >
                Our Products
              </span>

              {productOpen && (
                <div className="dropdown-menu show">
                  <Link to="/listProduct" onClick={closeAllMenus}>
                    All Products
                  </Link>
                  <Link to="/category/Nettipattam" onClick={closeAllMenus}>
                    Nettipattam
                  </Link>
                  <Link to="/category/Resin" onClick={closeAllMenus}>
                    Resin Products
                  </Link>
                  <Link to="/category/Painting" onClick={closeAllMenus}>
                    Paintings
                  </Link>
                  <Link to="/category/Craft" onClick={closeAllMenus}>
                    Craft Items
                  </Link>
                </div>
              )}
            </div>

            {/* CART */}
            <Link to="/cart" className="cart-link" onClick={closeAllMenus}>
              Cart
              {cartItems.length > 0 && (
                <span className="cart-badge">{cartItems.length}</span>
              )}
            </Link>

            <Link to="/myorder" onClick={closeAllMenus}>Orders</Link>
            <Link to="/offer" onClick={closeAllMenus}>Offers</Link>
            <span>About</span>
          </>
        )}

        {/* AUTH */}
        <div className="auth-section">
          {user ? (
            <button className="logout-btn" onClick={handleLogout}>
              <FiLogOut size={20} />
            </button>
          ) : (
            <button
              className="nav-icon-btn nav-icon-btn--green"
              onClick={() => {
                closeAllMenus();
                navigate("/login");
              }}
            >
              <FiUserPlus size={22} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Nav;
