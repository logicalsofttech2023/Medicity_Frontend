import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import toast, { Toaster } from "react-hot-toast";
import { nav } from "framer-motion/client";
import Swal from "sweetalert2";

const ProfileSidebar = () => {
  const [UserData, setUserData] = useState();
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  useEffect(() => {
    GetUser();
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
        toast.error(error.response?.data?.message || "Something went wrong");
      });
  };

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
        navigate("/Login");
      }
    });
  };

  return (
    <div>
      {/* Profile Sidebar */}
      <div className="profile-sidebar patient-sidebar profile-sidebar-new">
        <div className="widget-profile pro-widget-content">
          <div className="profile-info-widget">
            <Link to="/Settings" className="booking-doc-img">
              {UserData?.userProfile ? (
                <img
                  src={`${process.env.REACT_APP_IMG_URL}${UserData?.userProfile}`}
                />
              ) : (
                <img
                  src="assets/img/doctors-dashboard/profile-06.jpg"
                  alt="User Image"
                />
              )}
            </Link>
            <div className="profile-det-info">
              <h3>
                <Link to="/Settings">
                  {UserData?.name ? UserData?.name : "Guest"}
                </Link>
              </h3>
              <div className="patient-details">
                <h5 className="mb-0">Patient ID : PT254654</h5>
              </div>
              <span>
                {UserData?.gender ? UserData?.gender : "Not Found"}
                <i className="fa-solid fa-circle" />{" "}
                {UserData?.dob ? UserData?.dob : "Not Found"}
              </span>
            </div>
          </div>
        </div>
        <div className="dashboard-widget">
          <nav className="dashboard-menu">
            <ul>
              <li className={currentPath === "/Dashboard" ? "active" : ""}>
                <Link to="/Dashboard">
                  <i className="isax isax-category-2" />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li
                className={currentPath === "/Bookingappoinment" ? "active" : ""}
              >
                <Link to="/Bookingappoinment">
                  <i className="isax isax-calendar-1" />
                  <span>Booking</span>
                </Link>
              </li>
              {/* <li className={currentPath === "/Reports" ? "active" : ""}>
                <Link to="/Reports">
                  <i className="isax isax-star-1" />
                  <span>Reports</span>
                </Link>
              </li> */}
              <li className={currentPath === "/Familymember" ? "active" : ""}>
                <Link to="/Familymember">
                  <i className="isax isax-user-octagon" />
                  <span>Family Members</span>
                </Link>
              </li>
              <li className={currentPath === "/Prescription" ? "active" : ""}>
                <Link to="/Prescription">
                  <i className="isax isax-note-21" />
                  <span>Prescription</span>
                </Link>
              </li>
              {/* <li className={currentPath === "/Wallet" ? "active" : ""}>
        <Link to="/Wallet">
          <i className="isax isax-wallet-2" />
          <span>Wallet</span>
        </Link>
      </li> */}
              {/* <li className={currentPath === "/Invoices" ? "active" : ""}>
        <Link to="/Invoices">
          <i className="isax isax-document-text" />
          <span>Invoices</span>
        </Link>
      </li>
      <li className={currentPath === "/Message" ? "active" : ""}>
        <Link to="/Message">
          <i className="isax isax-messages-1" />
          <span>Message</span>
          <small className="unread-msg">7</small>
        </Link>
      </li>
      <li className={currentPath === "/Vitals" ? "active" : ""}>
        <Link to="/Vitals">
          <i className="isax isax-note-1" />
          <span>Vitals</span>
        </Link>
      </li> */}
              <li className={currentPath === "/Settings" ? "active" : ""}>
                <Link to="/Settings">
                  <i className="isax isax-setting-2" />
                  <span>Settings</span>
                </Link>
              </li>
              <li
                className={currentPath === "/Login" ? "active" : ""}
                style={{
                  listStyle: "none",
                  margin: "10px 0",
                }}
              >
                <button
                  onClick={handleLogout}
                  style={{
                    backgroundColor: "#0c30b9",
                    color: "#fff",
                    padding: "10px 15px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <i className="isax isax-logout" />
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      {/* /Profile Sidebar */}
    </div>
  );
};

export default ProfileSidebar;
