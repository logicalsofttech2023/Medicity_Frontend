import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import logo from "./logo.png";
import Swal from "sweetalert2";

const Mainheader = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const Logout = () => {
    secureLocalStorage.clear();
  };

  let mediid = secureLocalStorage.getItem("medicityuser");

  const [UserData, setUserData] = useState();
  useEffect(() => {
    if (mediid) {
      GetUser();
    }
  }, [0]);
  const GetUser = async () => {
    const data = {
      userId: secureLocalStorage.getItem("medicityuser"),
    };

    axios
      .post(`${process.env.REACT_APP_API_KEY}getUser`, data)
      .then((res) => {
        setUserData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getCategories = async () => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}packageCategoryList`)
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
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
      <div className="top-header">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="special-offer-content">
                <p>
                  Special offer! Get -20% off for first order with minimum{" "}
                  <span>₹200.00</span> in cart.
                </p>
              </div>
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
                  <li>
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
      {/* /Top Header */}
      {/* Header */}
      <header className="header header-custom header-fixed inner-header relative">
        <div className="container">
          <nav className="navbar navbar-expand-lg header-nav">
            <div className="navbar-header">
              <a id="mobile_btn" href="javascript:void(0);">
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
            <div className="header-menu">
              <div className="main-menu-wrapper">
                <div className="menu-header">
                  <a href="/" className="menu-logo">
                    <img
                      src="http://157.66.191.24:74/assets/img/logo.svg"
                      className="img-fluid"
                      alt="Logo"
                    />
                  </a>
                  <a
                    id="menu_close"
                    className="menu-close"
                    href="javascript:void(0);"
                  >
                    <i className="fas fa-times" />
                  </a>
                </div>
                <ul className="main-nav">
                  <li className="has-submenu megamenu active">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="has-submenu">
                    <Link to="#">
                      Service Book
                      <i className="fas fa-chevron-down" />
                    </Link>
                    <ul className="submenu">
                      <li>
                        <Link to="/Doctorscurateddetails">Book Any Test</Link>
                      </li>
                      <li>
                        <Link to="/Booking">Book Appointment</Link>
                      </li>
                      <li>
                        <Link to="/Findtestbycategory">
                          Book Health Packages
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="has-submenu">
                    <a href="#">
                      Blood Tests
                      <i className="fas fa-chevron-down" />
                    </a>
                    <ul
                      className="submenu"
                      style={{
                        maxHeight: "300px",
                        overflowY: "auto",
                        paddingRight: "8px",
                        scrollbarWidth: "thin", // For Firefox
                      }}
                    >
                      {categories.map((category) => (
                        <li key={category._id}>
                          <Link
                            to={`/Doctorscurateddetails`}
                            state={{ ids: category?._id }}
                          >
                            {category?.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>

                  {/* <li className="has-submenu">
                    <a href="#">
                      Health Conditions
                      <i className="fas fa-chevron-down" />
                    </a>
                    <ul className="submenu">
                      <li>
                        <Link to="/Doctorscurateddetails">Alcoholism</Link>
                      </li>
                      <li>
                        <Link to="/Doctorscurateddetails">Arthritis</Link>
                      </li>
                      <li>
                        <Link to="/Doctorscurateddetails">Fever</Link>
                      </li>
                      <li>
                        <Link to="/Doctorscurateddetails">Hypertension</Link>
                      </li>
                      <li>
                        <Link to="/Doctorscurateddetails">
                          STD (Sexually Transmitted Diseases)
                        </Link>
                      </li>
                      <li>
                        <Link to="/Doctorscurateddetails">Allergy</Link>
                      </li>
                      <li>
                        <Link to="/Doctorscurateddetails">Cancer</Link>
                      </li>
                      <li>
                        <Link to="/Doctorscurateddetails">Hepatitis</Link>
                      </li>
                      <li>
                        <Link to="/Doctorscurateddetails">Obesity</Link>
                      </li>
                      <li>
                        <Link to="/Doctorscurateddetails">Vitamins</Link>
                      </li>
                      <li>
                        <Link to="/Doctorscurateddetails">Anemia</Link>
                      </li>
                      <li>
                        <Link to="/Doctorscurateddetails">Diabetes</Link>
                      </li>
                      <li>
                        <Link to="/Doctorscurateddetails">Hormones</Link>
                      </li>
                      <li>
                        <Link to="/Doctorscurateddetails">Pregnancy</Link>
                      </li>
                    </ul>
                  </li> */}
                  {/* <li className="has-submenu megamenu">
                    <a href="/">Quality Assurance</a>
                  </li> */}

                  <li className="has-submenu">
                    <a href="#">
                      Health Blog <i className="fas fa-chevron-down" />
                    </a>
                    <ul className="submenu">
                      <li>
                        <Link to="Bloglist">Blog List</Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <ul className="nav header-navbar-rht">
                <div className="shopping-cart-list">
                  <ul className="nav">
                    {/* <li>
                    <a href="javascript:void(0);">
                      <img src="assets/img/icons/cart-favourite.svg" alt="Img" />
                    </a>
                  </li> */}

                    {mediid ? (
                      <>
                        <li>
                          <Link to="/Checkout">
                            <div className="shopping-cart-amount">
                              <div className="shopping-cart-icon">
                                <img
                                  src="http://157.66.191.24:74/assets/img/icons/bag-2.svg"
                                  alt="Img"
                                />
                                {/* <span>2</span> */}
                              </div>
                              <div className="shopping-cart-content">
                                <p>Cart</p>
                                {/* <h6>₹0.00</h6> */}
                              </div>
                            </div>
                          </Link>
                        </li>

                        <li class="nav-item dropdown has-arrow logged-item">
                          <a
                            href="#"
                            class="nav-link ps-0"
                            data-bs-toggle="dropdown"
                          >
                            <span class="user-img">
                              <img
                                class="rounded-circle"
                                style={{ height: "40px" }}
                                src={
                                  UserData?.userProfile
                                    ? `${process.env.REACT_APP_IMG_URL}` +
                                      UserData?.userProfile
                                    : "assets/img/doctors-dashboard/profile-06.jpg"
                                }
                                width="31"
                                alt="Darren Elder"
                              />
                            </span>
                          </a>
                          <div class="dropdown-menu dropdown-menu-end">
                            <div class="user-header">
                              <div class="avatar avatar-sm">
                                <img
                                  src={
                                    UserData?.userProfile
                                      ? `${process.env.REACT_APP_IMG_URL}` +
                                        UserData?.userProfile
                                      : "assets/img/doctors-dashboard/profile-06.jpg"
                                  }
                                  alt="User Image"
                                  class="avatar-img rounded-circle"
                                />
                              </div>
                              <div class="user-text">
                                <h6>
                                  {UserData?.name ? UserData?.name : "Guest"}
                                </h6>
                                <p class="text-muted mb-0">Patient</p>
                              </div>
                            </div>
                            <Link class="dropdown-item" to="/Dashboard">
                              Dashboard
                            </Link>
                            <Link class="dropdown-item" to="/Reports">
                              Download Reports
                            </Link>
                            <Link class="dropdown-item" to="/Descriptions">
                              Upload Prescription
                            </Link>
                            <Link class="dropdown-item" to="/Booking">
                              Book A Home Visit
                            </Link>
                            <Link class="dropdown-item" to="#">
                              Home Visit Booking
                              <br />
                              9982-782-555
                            </Link>
                            <Link class="dropdown-item" to="/Settings">
                              Settings
                            </Link>
                            <Link
                              className="dropdown-item"
                              onClick={handleLogout}
                            >
                              Logout
                            </Link>
                          </div>
                        </li>
                      </>
                    ) : null}
                  </ul>
                </div>
              </ul>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Mainheader;
