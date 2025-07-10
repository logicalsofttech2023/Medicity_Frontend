import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import logo from "./logo.png";
import Swal from "sweetalert2";
import bag from "./bag-2.svg";

const Mainheader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const mobileMenuRef = useRef(null);

  // Track active route
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Improved toggle dropdown - closes others when opening a new one
  const toggleDropdown = (dropdownName) => {
    setOpenDropdown((prev) => (prev === dropdownName ? null : dropdownName));
  };

  // Check if any service sub-route is active
  const isServiceActive = () => {
    return ["/Doctorscurateddetails", "/Booking", "/Findtestbycategory"].some(
      isActive
    );
  };

  // Check if current blood test category is active
  const isBloodTestActive = (categoryId) => {
    return (
      location.pathname === "/Doctorscurateddetails" &&
      location.state?.ids === categoryId
    );
  };

  // Scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Click outside detection for mobile menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        const mobileMenuButton = document.querySelector(
          ".mobile-header button"
        );
        if (!mobileMenuButton?.contains(event.target)) {
          setIsMobileMenuOpen(false);
          setOpenDropdown(null);
        }
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      setOpenDropdown(null);
    }
  };

  const mediid = secureLocalStorage.getItem("medicityuser");
  const [UserData, setUserData] = useState();

  // Fetch user data if logged in
  useEffect(() => {
    const GetUser = async () => {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_KEY}getUser`,
          {
            userId: mediid,
          }
        );
        setUserData(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    GetUser();
  }, []);

  // Fetch blood test categories
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_KEY}packageCategoryList`
        );
        setCategories(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getCategories();
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        secureLocalStorage.removeItem("medicityuser");
        localStorage.clear();
        navigate("/login");
      }
    });
  };

  return (
    <div>
      {/* Top Header (Desktop only) */}
      <div className="top-header d-none d-md-block">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              {/* Special offer content if needed */}
            </div>
            <div className="col-md-6">
              <div className="top-header-right">
                <ul className="nav">
                  <li className="header-theme me-0 pe-0">
                    <a id="dark-mode-toggle" className="theme-toggle">
                      <i className="isax isax-sun-1" />
                    </a>
                    <a id="light-mode-toggle" className="theme-toggle activate">
                      <i className="isax isax-moon" />
                    </a>
                  </li>
                  <li></li>
                  <li className="d-none d-md-block">
                    <div className="btn log-register">
                      {mediid ? (
                        <Link to="/Dashboard" className="me-1">
                          <span>
                            <i className="feather-user" />
                          </span>
                        </Link>
                      ) : (
                        <>
                          <Link to="/Login" className="me-1">
                            Sign In
                          </Link>{" "}
                          /
                          <Link to="/Register" className="ms-1">
                            Sign Up
                          </Link>
                        </>
                      )}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <header
        className={`mobile-header d-md-none ${isScrolled ? "scrolled" : ""}`}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: "#fff",
          boxShadow: isScrolled ? "0 2px 15px rgba(0,0,0,0.1)" : "none",
          transition: "all 0.3s ease",
          padding: "10px 15px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <button
            onClick={toggleMobileMenu}
            style={{
              background: "none",
              border: "none",
              fontSize: "24px",
              marginRight: "15px",
              color: "#333",
            }}
          >
            ☰
          </button>
          <Link to="/">
            <img
              src={logo}
              style={{ height: "30px", objectFit: "contain" }}
              alt="Logo"
            />
          </Link>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          {mediid && (
            <Link to="/Checkout" style={{ marginRight: "15px" }}>
              <img src={bag} alt="Cart" style={{ width: "24px" }} />
            </Link>
          )}
          {mediid ? (
            <Link to="/Dashboard">
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "2px solid #f0f0f0",
                }}
              >
                <img
                  src={
                    UserData?.userProfile
                      ? `${process.env.REACT_APP_IMG_URL}${UserData.userProfile}`
                      : "assets/img/doctors-dashboard/profile-06.jpg"
                  }
                  alt="User"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </Link>
          ) : (
            <Link
              to="/Login"
              style={{
                color: "#2d6bd2",
                fontWeight: "500",
                fontSize: "14px",
              }}
            >
              Login
            </Link>
          )}
        </div>
      </header>

      {/* Main Header (Desktop) */}
      <header
        className={`header header-custom header-fixed inner-header relative d-none d-md-block ${
          isScrolled ? "scrolled" : ""
        }`}
      >
        <div className="container">
          <nav className="navbar navbar-expand-lg header-nav">
            <div className="navbar-header">
              <a
                id="mobile_btn"
                onClick={toggleMobileMenu}
                className={isMobileMenuOpen ? "active" : ""}
              >
                <span className="bar-icon">
                  <span />
                  <span />
                  <span />
                </span>
              </a>
              <Link to="/" className="navbar-brand logo">
                <img src={logo} className="img-fluid" alt="Logo" />
              </Link>
            </div>

            <div className={`header-menu ${isMobileMenuOpen ? "active" : ""}`}>
              <div className="main-menu-wrapper">
                <div className="menu-header">
                  <Link to="/" className="menu-logo">
                    <img src={logo} className="img-fluid" alt="Logo" />
                  </Link>
                  <a
                    id="menu_close"
                    className="menu-close"
                    onClick={toggleMobileMenu}
                  >
                    <i className="fas fa-times" />
                  </a>
                </div>
                <ul className="main-nav">
                  <li className={isActive("/") ? "active" : ""}>
                    <Link style={{ color: "rgb(12, 48, 185)" }} to="/">Home</Link>
                  </li>

                  <li
                    className={`has-submenu ${
                      isServiceActive() ? "active" : ""
                    }`}
                  >
                    <Link to="#" onClick={() => toggleDropdown("service")}>
                      Service Book <i className="fas fa-chevron-down" />
                    </Link>
                    <ul
                      className={`submenu ${
                        openDropdown === "service" ? "show" : ""
                      }`}
                    >
                      <li
                        className={
                          isActive("/Doctorscurateddetails") ? "active" : ""
                        }
                      >
                        <Link to="/Doctorscurateddetails">Book Any Test</Link>
                      </li>
                      <li className={isActive("/Booking") ? "active" : ""}>
                        <Link to="/Booking">Book Appointment</Link>
                      </li>
                      <li
                        className={
                          isActive("/Findtestbycategory") ? "active" : ""
                        }
                      >
                        <Link to="/Findtestbycategory">
                          Book Health Packages
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li
                    className={`has-submenu ${
                      openDropdown === "blood" ? "active" : ""
                    }`}
                  >
                    <a href="#" onClick={() => toggleDropdown("blood")}>
                      Blood Tests <i className="fas fa-chevron-down" />
                    </a>
                    <ul
                      className={`submenu ${
                        openDropdown === "blood" ? "show" : ""
                      }`}
                      style={{
                        maxHeight: "300px",
                        overflowY: "auto",
                      }}
                    >
                      {categories.map((category) => (
                        <li
                          key={category._id}
                          className={
                            isBloodTestActive(category._id) ? "active" : ""
                          }
                        >
                          <Link
                            to="/Doctorscurateddetails"
                            state={{ ids: category._id }}
                          >
                            {category.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>

                  <li
                    className={`has-submenu ${
                      isActive("/Bloglist") ? "active" : ""
                    }`}
                  >
                    <a href="#" onClick={() => toggleDropdown("blog")}>
                      Health Blog <i className="fas fa-chevron-down" />
                    </a>
                    <ul
                      className={`submenu ${
                        openDropdown === "blog" ? "show" : ""
                      }`}
                    >
                      <li className={isActive("/Bloglist") ? "active" : ""}>
                        <Link to="Bloglist">Blog List</Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>

              <ul className="nav header-navbar-rht">
                {mediid && (
                  <>
                    <li className="d-none d-md-block" style={{ padding: "10px"}}>
                      <Link to="/Checkout">
                        <div className="shopping-cart-amount">
                          <div className="shopping-cart-icon">
                            <img src={bag} alt="Cart" />
                          </div>
                          <div className="shopping-cart-content">
                            <p>Cart</p>
                          </div>
                        </div>
                      </Link>
                    </li>

                    <li className="nav-item dropdown has-arrow logged-item">
                      <a
                        href="#"
                        className="nav-link ps-0"
                        data-bs-toggle="dropdown"
                      >
                        <span className="user-img">
                          <img
                            className="rounded-circle"
                            style={{ height: "40px" }}
                            src={
                              UserData?.userProfile
                                ? `${process.env.REACT_APP_IMG_URL}${UserData.userProfile}`
                                : "assets/img/doctors-dashboard/profile-06.jpg"
                            }
                            width="31"
                            alt="User"
                          />
                        </span>
                      </a>
                      <div className="dropdown-menu dropdown-menu-end">
                        <div className="user-header">
                          <div className="avatar avatar-sm">
                            <img
                              src={
                                UserData?.userProfile
                                  ? `${process.env.REACT_APP_IMG_URL}${UserData.userProfile}`
                                  : "assets/img/doctors-dashboard/profile-06.jpg"
                              }
                              alt="User"
                              className="avatar-img rounded-circle"
                            />
                          </div>
                          <div className="user-text">
                            <h6>{UserData?.name || "Guest"}</h6>
                            <p className="text-muted mb-0">Patient</p>
                          </div>
                        </div>
                        <Link className="dropdown-item" to="/Dashboard">
                          Dashboard
                        </Link>
                        <Link className="dropdown-item" to="/Reports">
                          Download Reports
                        </Link>
                        <Link className="dropdown-item" to="/Descriptions">
                          Upload Prescription
                        </Link>
                        <Link className="dropdown-item" to="/Settings">
                          Settings
                        </Link>
                        <Link className="dropdown-item" onClick={handleLogout}>
                          Logout
                        </Link>
                      </div>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu (Full Screen) */}
      <div
        className={`mobile-menu-overlay ${isMobileMenuOpen ? "active" : ""}`}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 999,
          opacity: isMobileMenuOpen ? 1 : 0,
          visibility: isMobileMenuOpen ? "visible" : "hidden",
          transition: "all 0.3s ease",
        }}
        onClick={toggleMobileMenu}
      />

      <div
        ref={mobileMenuRef}
        className={`mobile-menu-container ${isMobileMenuOpen ? "active" : ""}`}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "280px",
          height: "100%",
          backgroundColor: "#fff",
          zIndex: 1000,
          transform: isMobileMenuOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease",
          boxShadow: "2px 0 10px rgba(0,0,0,0.1)",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            padding: "20px",
            borderBottom: "1px solid #eee",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link to="/" onClick={toggleMobileMenu}>
            <img
              src={logo}
              style={{ height: "30px", objectFit: "contain" }}
              alt="Logo"
            />
          </Link>
          <button
            onClick={toggleMobileMenu}
            style={{
              background: "none",
              border: "none",
              fontSize: "24px",
              color: "#333",
            }}
          >
            ×
          </button>
        </div>

        <div style={{ padding: "20px" }}>
          {mediid && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "20px",
                paddingBottom: "15px",
                borderBottom: "1px solid #eee",
              }}
            >
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  marginRight: "15px",
                  border: "2px solid #f0f0f0",
                }}
              >
                <img
                  src={
                    UserData?.userProfile
                      ? `${process.env.REACT_APP_IMG_URL}${UserData.userProfile}`
                      : "assets/img/doctors-dashboard/profile-06.jpg"
                  }
                  alt="User"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: "16px", color: "#333" }}>
                  {UserData?.name || "Guest"}
                </h4>
                <p style={{ margin: 0, fontSize: "13px", color: "#777" }}>
                  Patient
                </p>
              </div>
            </div>
          )}

          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li style={{ marginBottom: "5px" }}>
              <Link
                to="/"
                onClick={toggleMobileMenu}
                style={{
                  display: "block",
                  padding: "12px 10px",
                  color: isActive("/") ? "#2d6bd2" : "#333",
                  textDecoration: "none",
                  borderRadius: "5px",
                  fontWeight: "500",
                  backgroundColor: isActive("/") ? "#f0f7ff" : "transparent",
                }}
              >
                Home
              </Link>
            </li>

            {/* Service Book Dropdown */}
            <li style={{ marginBottom: "5px" }}>
              <div
                onClick={() => toggleDropdown("service")}
                style={{
                  display: "block",
                  padding: "12px 10px",
                  color:
                    isServiceActive() || openDropdown === "service"
                      ? "#2d6bd2"
                      : "#333",
                  textDecoration: "none",
                  fontWeight: "500",
                  cursor: "pointer",
                  backgroundColor:
                    isServiceActive() || openDropdown === "service"
                      ? "#f0f7ff"
                      : "transparent",
                  borderRadius: "5px",
                }}
              >
                Service Book{" "}
                <span style={{ float: "right" }}>
                  {openDropdown === "service" ? "▲" : "▼"}
                </span>
              </div>
              {openDropdown === "service" && (
                <ul
                  style={{
                    listStyle: "none",
                    padding: "0 0 0 15px",
                    margin: 0,
                  }}
                >
                  <li>
                    <Link
                      to="/Doctorscurateddetails"
                      onClick={toggleMobileMenu}
                      style={{
                        display: "block",
                        padding: "10px",
                        color: isActive("/Doctorscurateddetails")
                          ? "#2d6bd2"
                          : "#555",
                        textDecoration: "none",
                        fontWeight: isActive("/Doctorscurateddetails")
                          ? "500"
                          : "400",
                      }}
                    >
                      Book Any Test
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/Booking"
                      onClick={toggleMobileMenu}
                      style={{
                        display: "block",
                        padding: "10px",
                        color: isActive("/Booking") ? "#2d6bd2" : "#555",
                        textDecoration: "none",
                        fontWeight: isActive("/Booking") ? "500" : "400",
                      }}
                    >
                      Book Appointment
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/Findtestbycategory"
                      onClick={toggleMobileMenu}
                      style={{
                        display: "block",
                        padding: "10px",
                        color: isActive("/Findtestbycategory")
                          ? "#2d6bd2"
                          : "#555",
                        textDecoration: "none",
                        fontWeight: isActive("/Findtestbycategory")
                          ? "500"
                          : "400",
                      }}
                    >
                      Book Health Packages
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Blood Tests Dropdown */}
            <li style={{ marginBottom: "5px" }}>
              <div
                onClick={() => toggleDropdown("blood")}
                style={{
                  display: "block",
                  padding: "12px 10px",
                  color: openDropdown === "blood" ? "#2d6bd2" : "#333",
                  textDecoration: "none",
                  fontWeight: "500",
                  cursor: "pointer",
                  backgroundColor:
                    openDropdown === "blood" ? "#f0f7ff" : "transparent",
                  borderRadius: "5px",
                }}
              >
                Blood Tests{" "}
                <span style={{ float: "right" }}>
                  {openDropdown === "blood" ? "▲" : "▼"}
                </span>
              </div>
              {openDropdown === "blood" && (
                <ul
                  style={{
                    listStyle: "none",
                    padding: "0 0 0 15px",
                    margin: 0,
                    maxHeight: "200px",
                    overflowY: "auto",
                  }}
                >
                  {categories.map((category) => (
                    <li key={category._id}>
                      <Link
                        to="/Doctorscurateddetails"
                        state={{ ids: category._id }}
                        onClick={toggleMobileMenu}
                        style={{
                          display: "block",
                          padding: "10px",
                          color: isBloodTestActive(category._id)
                            ? "#2d6bd2"
                            : "#555",
                          textDecoration: "none",
                          fontWeight: isBloodTestActive(category._id)
                            ? "500"
                            : "400",
                        }}
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {/* Health Blog Dropdown */}
            <li style={{ marginBottom: "5px" }}>
              <div
                onClick={() => toggleDropdown("blog")}
                style={{
                  display: "block",
                  padding: "12px 10px",
                  color:
                    isActive("/Bloglist") || openDropdown === "blog"
                      ? "#2d6bd2"
                      : "#333",
                  textDecoration: "none",
                  fontWeight: "500",
                  cursor: "pointer",
                  backgroundColor:
                    isActive("/Bloglist") || openDropdown === "blog"
                      ? "#f0f7ff"
                      : "transparent",
                  borderRadius: "5px",
                }}
              >
                Health Blog{" "}
                <span style={{ float: "right" }}>
                  {openDropdown === "blog" ? "▲" : "▼"}
                </span>
              </div>
              {openDropdown === "blog" && (
                <ul
                  style={{
                    listStyle: "none",
                    padding: "0 0 0 15px",
                    margin: 0,
                  }}
                >
                  <li>
                    <Link
                      to="Bloglist"
                      onClick={toggleMobileMenu}
                      style={{
                        display: "block",
                        padding: "10px",
                        color: isActive("/Bloglist") ? "#2d6bd2" : "#555",
                        textDecoration: "none",
                        fontWeight: isActive("/Bloglist") ? "500" : "400",
                      }}
                    >
                      Blog List
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {mediid ? (
              <>
                <li style={{ marginBottom: "5px" }}>
                  <Link
                    to="/Dashboard"
                    onClick={toggleMobileMenu}
                    style={{
                      display: "block",
                      padding: "12px 10px",
                      color: isActive("/Dashboard") ? "#2d6bd2" : "#333",
                      textDecoration: "none",
                      fontWeight: "500",
                      backgroundColor: isActive("/Dashboard")
                        ? "#f0f7ff"
                        : "transparent",
                    }}
                  >
                    Dashboard
                  </Link>
                </li>
                <li style={{ marginBottom: "5px" }}>
                  <Link
                    to="/Checkout"
                    onClick={toggleMobileMenu}
                    style={{
                      display: "block",
                      padding: "12px 10px",
                      color: isActive("/Checkout") ? "#2d6bd2" : "#333",
                      textDecoration: "none",
                      fontWeight: "500",
                      backgroundColor: isActive("/Checkout")
                        ? "#f0f7ff"
                        : "transparent",
                    }}
                  >
                    My Cart
                  </Link>
                </li>
                <li style={{ marginBottom: "5px" }}>
                  <Link
                    to="/Reports"
                    onClick={toggleMobileMenu}
                    style={{
                      display: "block",
                      padding: "12px 10px",
                      color: isActive("/Reports") ? "#2d6bd2" : "#333",
                      textDecoration: "none",
                      fontWeight: "500",
                      backgroundColor: isActive("/Reports")
                        ? "#f0f7ff"
                        : "transparent",
                    }}
                  >
                    Download Reports
                  </Link>
                </li>
                <li style={{ marginBottom: "5px" }}>
                  <Link
                    to="/Descriptions"
                    onClick={toggleMobileMenu}
                    style={{
                      display: "block",
                      padding: "12px 10px",
                      color: isActive("/Descriptions") ? "#2d6bd2" : "#333",
                      textDecoration: "none",
                      fontWeight: "500",
                      backgroundColor: isActive("/Descriptions")
                        ? "#f0f7ff"
                        : "transparent",
                    }}
                  >
                    Upload Prescription
                  </Link>
                </li>
                <li style={{ marginBottom: "5px" }}>
                  <Link
                    to="/Settings"
                    onClick={toggleMobileMenu}
                    style={{
                      display: "block",
                      padding: "12px 10px",
                      color: isActive("/Settings") ? "#2d6bd2" : "#333",
                      textDecoration: "none",
                      fontWeight: "500",
                      backgroundColor: isActive("/Settings")
                        ? "#f0f7ff"
                        : "transparent",
                    }}
                  >
                    Settings
                  </Link>
                </li>
                <li style={{ marginBottom: "5px" }}>
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMobileMenu();
                    }}
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      padding: "12px 10px",
                      color: "#d9534f",
                      background: "none",
                      border: "none",
                      fontWeight: "500",
                      cursor: "pointer",
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li style={{ marginBottom: "5px" }}>
                  <Link
                    to="/Login"
                    onClick={toggleMobileMenu}
                    style={{
                      display: "block",
                      padding: "12px 10px",
                      color: "#2d6bd2",
                      textDecoration: "none",
                      fontWeight: "500",
                      background: "#f0f7ff",
                      borderRadius: "5px",
                      textAlign: "center",
                      marginTop: "10px",
                    }}
                  >
                    Sign In
                  </Link>
                </li>
                <li style={{ marginBottom: "5px" }}>
                  <Link
                    to="/Register"
                    onClick={toggleMobileMenu}
                    style={{
                      display: "block",
                      padding: "12px 10px",
                      color: "#fff",
                      textDecoration: "none",
                      fontWeight: "500",
                      background: "#2d6bd2",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Mainheader;
