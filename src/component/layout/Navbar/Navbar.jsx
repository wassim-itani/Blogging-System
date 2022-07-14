import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import { useUserContext } from "../../../context";
import { FaSearch, FaTimes, FaBars } from "react-icons/fa";

import { Button } from "../../ui";
import { SearchBar } from "../../post/";

import "./Navbar.scss";

const Navbar = () => {
  const [user, dispatch] = useUserContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBarOpen, setIsBarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = (e) => {
    if (
      e.currentTarget.classList.contains("nav-btn") ||
      e.target.className === "nav-mobile show" ||
      e.currentTarget.classList.contains("nav-mobile-closeBtn")
    ) {
      setIsMenuOpen(!isMenuOpen);
    }
  };

  const toggleSearchBar = () => {
    setIsBarOpen(!isBarOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const logout = () => {
    dispatch({ type: "LOG_OUT" });
    navigate("/");
  };

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
    setIsBarOpen(false);
  }, [location]);

  return (
    <nav className="nav">
      <div className="nav-container">
        <div className="nav-left">
          <FaBars className="nav-btn" onClick={toggleMenu} />
          <Link className="nav-brand" to="/">
            BLOGR
          </Link>
        </div>
        <ul className="nav-menu">
          <li>
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className="nav-link">
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className="nav-link">
              Contact
            </NavLink>
          </li>
        </ul>
        <div className="nav-right">
          {!isBarOpen ? (
            <FaSearch className="nav-searchIcon" onClick={toggleSearchBar} />
          ) : (
            <FaTimes className="nav-searchIcon" onClick={toggleSearchBar} />
          )}
          {!user ? (
            <>
              <Button text="Log in" type="ghost" to="/login" />
              <Button text="Create account" type="filled" to="/register" />
            </>
          ) : (
            <>
              <img
                src={user.image}
                alt="Profile image"
                className="nav-img"
                onClick={toggleDropdown}
              />
              <span className="nav-username">{user.username}</span>
              <ul className={`nav-dropdown ${isDropdownOpen ? "active" : ""}`}>
                <li>
                  <NavLink to="/create-post" className="nav-dropdown-link">
                    Create Post
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard" className="nav-dropdown-link">
                    Your Posts
                  </NavLink>
                </li>
                <li className="nav-dropdown-divider"></li>
                <li>
                  <span className="nav-dropdown-link" onClick={logout}>
                    Log Out
                  </span>
                </li>
              </ul>
            </>
          )}
        </div>
      </div>
      {isBarOpen && <SearchBar />}
      <div
        className={`nav-mobile ${isMenuOpen ? "show" : ""}`}
        onClick={toggleMenu}
      >
        <div className="nav-mobile-content">
          <div className="nav-mobile-top">
            <span className="nav-mobile-brand">BLOGR</span>
            <FaTimes className="nav-mobile-closeBtn" onClick={toggleMenu} />
          </div>
          <ul className="nav-mobile-menu">
            <li>
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="nav-link">
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="nav-link">
                Contact
              </NavLink>
            </li>
            {!user && (
              <li>
                <NavLink to="/login" className="nav-link">
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
