import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import secureLocalStorage from "react-secure-storage";

const Deleteaccount = () => {
  const navigate = useNavigate();
  const [reason, setReason] = useState("Other (Please specify)");
  const [customReason, setCustomReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleReasonChange = (event) => {
    setReason(event.target.value);
    if (event.target.value !== "Other (Please specify)") {
      setCustomReason("");
    }
  };
  const deleteAccount = async () => {
    const userId = secureLocalStorage.getItem("medicityuser");
    const finalReason =
      reason === "Other (Please specify)" ? customReason : reason;

    // Validation
    if (!finalReason.trim()) {
      toast.error("Please specify a reason for account deletion.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_KEY}deleteUser`,
        {
          userId: userId,
          reason: finalReason,
        }
      );

      toast.success(response.data.message);
      secureLocalStorage.clear();
      setTimeout(() => navigate("/Login"), 2000);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete account. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const userId = secureLocalStorage.getItem("medicityuser");
        if (!userId) {
          navigate("/Login");
          return;
        }

        const response = await axios.post(
          `${process.env.REACT_APP_API_KEY}getUser`,
          {
            userId: userId,
          }
        );

        setUserData(response.data.data);
      } catch (error) {
        toast.error("Failed to load user data");
      }
    };

    getUser();
  }, [navigate]);
  return (
    <div>
      <Toaster />
      <div className="breadcrumb-bar">
        <div className="container">
          <div className="row align-items-center inner-banner">
            <div className="col-md-12 col-12 text-center">
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol style={{ justifyContent: "start" }} className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/">
                      <i className="isax isax-home-15" />
                    </a>
                  </li>
                  <li className="breadcrumb-item" aria-current="page">
                    Patient
                  </li>
                  <li className="breadcrumb-item active">Settings</li>
                </ol>
                <h2
                  style={{ textAlign: "justify" }}
                  className="breadcrumb-title"
                >
                  Delete Account
                </h2>
              </nav>
            </div>
          </div>
        </div>
        <div className="breadcrumb-bg">
          <img
            src="assets/img/bg/breadcrumb-bg-01.png"
            alt="img"
            className="breadcrumb-bg-01"
          />
          <img
            src="assets/img/bg/breadcrumb-bg-02.png"
            alt="img"
            className="breadcrumb-bg-02"
          />
          <img
            src="assets/img/bg/breadcrumb-icon.png"
            alt="img"
            className="breadcrumb-bg-03"
          />
          <img
            src="assets/img/bg/breadcrumb-icon.png"
            alt="img"
            className="breadcrumb-bg-04"
          />
        </div>
      </div>
      {/* /Breadcrumb */}
      {/* Page Content */}
      <div className="content doctor-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-xl-4">
              {/* Profile Sidebar */}
              <div className="profile-sidebar patient-sidebar profile-sidebar-new">
                <div className="widget-profile pro-widget-content">
                  <div className="profile-info-widget">
                    <Link to="/Settings" className="booking-doc-img">
                      {userData?.userProfile ? (
                        <img
                          src={`${process.env.REACT_APP_IMG_URL}${userData?.userProfile}`}
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
                          {userData?.name ? userData?.name : "Guest"}
                        </Link>
                      </h3>
                      <div className="patient-details">
                        <h5 className="mb-0">Patient ID : PT254654</h5>
                      </div>
                      <span>
                        {userData?.gender ? userData?.gender : "Not Found"}
                        <i className="fa-solid fa-circle" />{" "}
                        {userData?.dob ? userData?.dob : "Not Found"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="dashboard-widget">
                  <nav className="dashboard-menu">
                    <ul>
                      <li>
                        <Link to="/Dashboard">
                          <i className="isax isax-category-2" />
                          <span>Dashboard</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/Bookingappoinment">
                          <i className="isax isax-calendar-1" />
                          <span>Booking </span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/Reports">
                          <i className="isax isax-star-1" />
                          <span>Reports</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/Familymember">
                          <i className="isax isax-user-octagon" />
                          <span>Family Members</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/Prescription">
                          <i className="isax isax-note-21" />
                          <span>Prescription</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/Wallet">
                          <i className="isax isax-wallet-2" />
                          <span>Wallet</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/Invoices">
                          <i className="isax isax-document-text" />
                          <span>Invoices</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/Message">
                          <i className="isax isax-messages-1" />
                          <span>Message</span>
                          <small className="unread-msg">7</small>
                        </Link>
                      </li>
                      <li>
                        <Link to="/Vitals">
                          <i className="isax isax-note-1" />
                          <span>Vitals</span>
                        </Link>
                      </li>
                      <li className="active">
                        <Link to="/Settings">
                          <i className="isax isax-setting-2" />
                          <span>Settings</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/Login">
                          <i className="isax isax-logout" />
                          <span>Logout</span>
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
              {/* /Profile Sidebar */}
            </div>
            {/* Change Password */}
            <div className="col-lg-7 col-xl-8">
              <nav className="settings-tab mb-1">
                <ul className="nav nav-tabs-bottom" role="tablist">
                  <li className="nav-item" role="presentation">
                    <Link className="nav-link" to="/Settings">
                      Profile
                    </Link>
                  </li>
                  {/* <li className="nav-item" role="presentation">
                    <Link className="nav-link" to="/Changepassword">
                      Change Password
                    </Link>
                  </li> */}
                  {/* <li className="nav-item" role="presentation">
                <a className="nav-link" href="two-factor-authentication.html">2 Factor Authentication</a>
              </li> */}
                  <li className="nav-item" role="presentation">
                    <Link className="nav-link active" to="/Deleteaccount">
                      Delete Account
                    </Link>
                  </li>
                </ul>
              </nav>
              <div className="card mb-0">
                <div className="card-body">
                  <div className="border-bottom pb-3 mb-3">
                    <h5>Delete Account</h5>
                  </div>
                  <h6 className="fs-16">
                    Are you sure you want to delete your account?
                  </h6>
                  <p>
                    Refers to the action of permanently removing a user's
                    account and associated data from a system, service and
                    platform.
                  </p>
                  <p>
                    Refers to the action of permanently removing a user's
                    account and associated data from a system, service and
                    platform.
                  </p>
                  <p>
                    Refers to the action of permanently removing a user's
                    account and associated data from a system, service and
                    platform.
                  </p>
                  <p>
                    Refers to the action of permanently removing a user's
                    account and associated data from a system, service and
                    platform.
                  </p>
                  <p>
                    Refers to the action of permanently removing a user's
                    account and associated data from a system, service and
                    platform.
                  </p>
                  <p>
                    Refers to the action of permanently removing a user's
                    account and associated data from a system, service and
                    platform.
                  </p>
                  <p>
                    Refers to the action of permanently removing a user's
                    account and associated data from a system, service and
                    platform.
                  </p>
                  <div className="text-end">
                    <a
                      href="#"
                      className="bg-red btn btn-md btn-primary-gradient rounded-pill"
                      data-bs-toggle="modal"
                      data-bs-target="#del-acc"
                    >
                      {isSubmitting ? "Processing..." : "Delete Account"}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* /Change Password */}
          </div>
        </div>
      </div>
      <div
        className="modal fade custom-modals"
        id="del-acc"
        data-bs-backdrop="static"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5>Delete Account</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                disabled={isSubmitting}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div>
              <div className="modal-body">
                <h6 className="FS-16 mb-1">
                  Why Are You Deleting Your Account?
                </h6>
                <p className="mb-3">
                  We're sorry to see you go! To help us improve, please let us
                  know your reason for deleting your account.
                </p>

                {/* Reason Selection */}
                {[
                  "No longer using the service",
                  "Privacy concerns",
                  "Too many notifications/emails",
                  "Poor user experience",
                  "Other (Please specify)",
                ].map((option, index) => (
                  <div
                    className="form-check d-flex mb-3"
                    key={`del-acc${index + 1}`}
                  >
                    <input
                      className="form-check-input"
                      type="radio"
                      name="delete"
                      id={`del-acc${index + 1}`}
                      value={option}
                      checked={reason === option}
                      onChange={handleReasonChange}
                      disabled={isSubmitting}
                    />
                    <label
                      className="form-check-label fs-14 ms-2"
                      htmlFor={`del-acc${index + 1}`}
                    >
                      <span className="text-gray-9 fw-medium">{option}</span>
                      {index < 4 && (
                        <span className="d-block">
                          {
                            [
                              "I no longer need this service and won't be using it in the future.",
                              "I am concerned about how my data is handled and want to remove my information.",
                              "I'm overwhelmed by the volume of notifications or emails.",
                              "I've had difficulty using the platform, and it didn't meet my expectations.",
                              "",
                            ][index]
                          }
                        </span>
                      )}
                    </label>
                  </div>
                ))}

                {/* Custom Reason Input */}
                {reason === "Other (Please specify)" && (
                  <div className="ms-4 mb-4">
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="Please specify your reason"
                      value={customReason}
                      onChange={(e) => setCustomReason(e.target.value)}
                      disabled={isSubmitting}
                    />
                    {!customReason.trim() && (
                      <small className="text-danger">
                        Please provide a reason
                      </small>
                    )}
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="modal-footer">
                <div className="modal-btn text-end">
                  <button
                    type="button"
                    className="btn btn-md btn-dark rounded-pill"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={deleteAccount}
                    data-bs-dismiss="modal"
                    type="button"
                    className="bg-red btn btn-md btn-primary-gradient rounded-pill"
                    disabled={
                      isSubmitting ||
                      (reason === "Other (Please specify)" &&
                        !customReason.trim())
                    }
                  >
                    {isSubmitting ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Deleting...
                      </>
                    ) : (
                      "Confirm Delete"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deleteaccount;
