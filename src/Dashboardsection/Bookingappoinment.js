import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import ProfileSidebar from "./ProfileSidebar";
import { DNA } from "react-loader-spinner";
import Swal from "sweetalert2";

const Bookingappoinment = () => {
  const [Orderlist, setOrderlist] = useState();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [reportStatus, setReportStatus] = useState({});

  useEffect(() => {
    BookingOrderlist();
  }, []);

  const BookingOrderlist = async () => {
    setLoading(true);
    const data = {
      userId: secureLocalStorage.getItem("medicityuser"),
    };

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_KEY}bookingOrder_list`,
        data
      );
      setOrderlist(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (bookingId, reason) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_KEY}cancelBooking`,
        {
          bookingId: bookingId,
          reason: reason,
          userId: secureLocalStorage.getItem("medicityuser"),
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error cancelling booking:", error);
      throw error;
    }
  };

  const handleCancelConfirmation = async (bookingId) => {
    const { value: reason } = await Swal.fire({
      title: "Cancel Appointment",
      input: "textarea",
      inputLabel: "Reason for Cancellation",
      inputPlaceholder: "Please specify your reason...",
      inputAttributes: {
        "aria-label": "Type your cancellation reason here",
      },
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Confirm Cancellation",
      preConfirm: (reason) => {
        if (!reason) {
          Swal.showValidationMessage("Reason is required");
        }
        return reason;
      },
    });

    if (reason) {
      try {
        const result = await Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, cancel it!",
        });

        if (result.isConfirmed) {
          const response = await cancelBooking(bookingId, reason);
          if (response.success) {
            Swal.fire(
              "Cancelled!",
              "Your appointment has been cancelled.",
              "success"
            );
            BookingOrderlist();
          }
        }
      } catch (error) {
        Swal.fire(
          "Error!",
          error.message || "Failed to cancel booking",
          "error"
        );
      }
    }
  };

  const filteredData = Orderlist?.filter((data) => {
    if (activeTab === "upcoming") return data?.bookingStatus === 0;
    if (activeTab === "cancel") return data?.bookingStatus === 2;
    if (activeTab === "complete") return data?.bookingStatus === 1;
    return true;
  });

  // Pagination logic remains the same
  const totalPages = Math.ceil(filteredData?.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData?.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const checkReportAvailability = async (memberId, billNo) => {
    try {
      const formData = new FormData();
      formData.append("empId", "KLR099101");
      formData.append("secretKey", "KLR@74123");
      formData.append("member_id", memberId);
      formData.append("bill_no", billNo);

      const response = await axios.post(
        "https://medicityguwahati.in/klar_diag/api/getReport/",
        formData
      );
      return response.data.response[0];
    } catch (error) {
      console.error("Error checking report:", error);
      return { status: "error", message: "Failed to check report status" };
    }
  };

  return (
    <div>
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
                  <li className="breadcrumb-item active">Appointments</li>
                </ol>
                <h2
                  style={{ textAlign: "justify" }}
                  className="breadcrumb-title"
                >
                  Appointments
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
            {/* Profile Sidebar */}
            <div className="col-lg-5 col-xl-4">
              {/* Profile Sidebar */}
              <ProfileSidebar />
              {/* /Profile Sidebar */}
            </div>
            {/* / Profile Sidebar */}
            <div className="col-lg-7 col-xl-8">
              <div className="dashboard-header">
                <h3>Appointments</h3>
                <ul className="header-list-btns">
                  <li>
                    <div className="input-block dash-search-input">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search"
                      />
                      <span className="search-icon">
                        <i className="isax isax-search-normal" />
                      </span>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="appointment-tab-head">
                <div className="appointment-tabs">
                  <ul
                    className="nav nav-pills inner-tab "
                    id="pills-tab"
                    role="tablist"
                  >
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link active"
                        id="pills-upcoming-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-upcoming"
                        type="button"
                        role="tab"
                        aria-controls="pills-upcoming"
                        aria-selected="false"
                        onClick={() => handleTabChange("upcoming")}
                      >
                        Upcoming
                        <span>
                          {
                            Orderlist?.filter(
                              (order) => order?.bookingStatus === 0
                            ).length
                          }
                        </span>
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="pills-cancel-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-cancel"
                        type="button"
                        role="tab"
                        aria-controls="pills-cancel"
                        aria-selected="true"
                        onClick={() => handleTabChange("cancel")}
                      >
                        Cancelled
                        <span>
                          {
                            Orderlist?.filter(
                              (order) => order?.bookingStatus === 2
                            ).length
                          }
                        </span>
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="pills-complete-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-complete"
                        type="button"
                        role="tab"
                        aria-controls="pills-complete"
                        aria-selected="true"
                        onClick={() => handleTabChange("complete")}
                      >
                        Completed
                        <span>
                          {
                            Orderlist?.filter(
                              (order) => order?.bookingStatus === 1
                            ).length
                          }
                        </span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>

              {loading ? (
                <div className="d-flex justify-content-center my-5">
                  <DNA
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper"
                  />
                </div>
              ) : currentItems?.length > 0 ? (
                <>
                  <div className="tab-content appointment-tab-content">
                    <div
                      className="tab-pane fade show active"
                      id="pills-upcoming"
                      role="tabpanel"
                      aria-labelledby="pills-upcoming-tab"
                    >
                      {currentItems?.map((data) => (
                        <div className="appointment-wrap">
                          <ul>
                            <li>
                              <div className="patinet-information">
                                <Link
                                  to="/Bookingdetails"
                                  state={{ id: data?._id || "dummy-id" }}
                                >
                                  <img
                                    src={
                                      data?.members?.[0]?.profileImage ||
                                      "assets/img/doctors/doctor-thumb-21.jpg"
                                    }
                                    alt="User Image"
                                  />
                                </Link>
                                <div className="patient-info">
                                  <p>#{data?.bookingId || "BK123456"}</p>
                                  <h6>
                                    <Link
                                      to="/Bookingdetails"
                                      state={{ id: data?._id || "dummy-id" }}
                                    >
                                      {data?.members?.[0]?.fullName ||
                                        "John Doe"}
                                    </Link>
                                  </h6>
                                </div>
                              </div>
                            </li>

                            <li className="appointment-info">
                              <p>
                                <i className="isax isax-clock5" />
                                {data?.bookingDate?.slice(0, 21) ||
                                  "11 Nov 2024 10:45 AM"}
                              </p>
                              <ul className="d-flex justify-content-center align-items-center apponitment-types">
                                <li className="mx-2">
                                  {data?.paymentMode || "Cash"}
                                </li>
                                <li className="mx-2">
                                  ₹ {data?.totalAmount || "1000"}
                                </li>
                              </ul>
                            </li>

                            <li className="mail-info-patient">
                              <ul>
                                <li>
                                  <i className="isax isax-sms5" />
                                  <a className="__cf_email__">
                                    {data?.members?.[0]?.email ||
                                      "[email protected]"}
                                  </a>
                                </li>
                                <li>
                                  <i className="isax isax-call5" />
                                  {data?.members?.[0]?.phone ||
                                    "+91 9876543210"}
                                </li>
                              </ul>
                            </li>

                            <li className="appointment-action d-flex align-items-center justify-content-between">
                              <ul className="d-flex">
                                <li>
                                  <Link
                                    to="/Bookingdetails"
                                    state={{ id: data?._id || "dummy-id" }}
                                  >
                                    <i className="isax isax-eye4" />
                                  </Link>
                                </li>
                                {activeTab === "upcoming" && (
                                  <li>
                                    <a
                                      href="#"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        handleCancelConfirmation(data?._id);
                                      }}
                                    >
                                      <i className="isax isax-close-circle text-danger" />
                                    </a>
                                  </li>
                                )}
                              </ul>

                              {(activeTab === "upcoming" ||
                                activeTab === "complete") && (
                                <a
                                  href="#"
                                  className="btn btn-md btn-primary-gradient ms-2"
                                  onClick={async (e) => {
                                    e.preventDefault();
                                    const reportKey = `${data?.memberId}-${data?.bill_no}`;

                                    // If not checked yet
                                    if (!reportStatus[reportKey]) {
                                      const result =
                                        await checkReportAvailability(
                                          data?.memberId,
                                          data?.bill_no
                                        );
                                      setReportStatus((prev) => ({
                                        ...prev,
                                        [reportKey]: result,
                                      }));

                                      if (result.url) {
                                        window.open(result.url, "_blank");
                                      } else {
                                        Swal.fire({
                                          icon: "info",
                                          title: "Report Not Available",
                                          text:
                                            result.message ||
                                            "Report not available yet",
                                        });
                                      }
                                    } else {
                                      // Show confirm dialog to re-check
                                      const { isConfirmed } = await Swal.fire({
                                        title: "Re-check Report?",
                                        text: "Do you want to check the report again?",
                                        icon: "question",
                                        showCancelButton: true,
                                        confirmButtonText: "Yes",
                                        cancelButtonText: "No",
                                      });

                                      if (isConfirmed) {
                                        const result =
                                          await checkReportAvailability(
                                            data?.memberId,
                                            data?.bill_no
                                          );
                                        setReportStatus((prev) => ({
                                          ...prev,
                                          [reportKey]: result,
                                        }));

                                        if (result.url) {
                                          window.open(result.url, "_blank");
                                        } else {
                                          Swal.fire({
                                            icon: "info",
                                            title: "Report Not Available",
                                            text:
                                              result.message ||
                                              "Report not available yet",
                                          });
                                        }
                                      } else if (reportStatus[reportKey]?.url) {
                                        window.open(
                                          reportStatus[reportKey].url,
                                          "_blank"
                                        );
                                      } else {
                                        Swal.fire({
                                          icon: "info",
                                          title: "Report Not Available",
                                          text:
                                            reportStatus[reportKey]?.message ||
                                            "Report not available yet",
                                        });
                                      }
                                    }
                                  }}
                                >
                                  View Report
                                </a>
                              )}
                            </li>
                          </ul>
                        </div>
                      ))}

                      {/* /Pagination */}
                    </div>
                    <div
                      className="tab-pane fade"
                      id="pills-cancel"
                      role="tabpanel"
                      aria-labelledby="pills-cancel-tab"
                    >
                      {/* Appointment List */}
                      {currentItems?.map((data) => {
                        return (
                          <div className="appointment-wrap">
                            <ul>
                              <li>
                                <div className="patinet-information">
                                  <Link to="/Bookingcancel">
                                    <img
                                      src={
                                        data?.members?.[0]?.profileImage ||
                                        "assets/img/doctors/doctor-thumb-21.jpg"
                                      }
                                      alt="User Image"
                                    />
                                  </Link>
                                  <div className="patient-info">
                                    <p>#{data?.bookingId || "BK123456"}</p>
                                    <h6>
                                      <Link to="/Bookingcancel">
                                        {data?.members?.[0]?.fullName ||
                                          "John Doe"}
                                      </Link>
                                    </h6>
                                  </div>
                                </div>
                              </li>

                              <li className="appointment-info">
                                <p>
                                  <i className="isax isax-clock5" />
                                  {data?.bookingDate?.slice(0, 21) ||
                                    "11 Nov 2024 10:45 AM"}
                                </p>
                                <ul className="d-flex justify-content-center align-items-center apponitment-types">
                                  <li className="mx-2">
                                    {data?.paymentMode || "Cash"}
                                  </li>
                                  <li className="mx-2">
                                    ₹ {data?.totalAmount || "1000"}
                                  </li>
                                </ul>
                              </li>

                              <li className="mail-info-patient">
                                <ul>
                                  <li>
                                    <i className="isax isax-sms5" />
                                    <a className="__cf_email__">
                                      {data?.members?.[0]?.email ||
                                        "[email protected]"}
                                    </a>
                                  </li>
                                  <li>
                                    <i className="isax isax-call5" />
                                    {data?.members?.[0]?.phone ||
                                      "+91 9876543210"}
                                  </li>
                                </ul>
                              </li>

                              <li className="appointment-action d-flex align-items-center justify-content-between">
                                <ul className="d-flex">
                                  <li>
                                    <Link
                                      to="/Bookingdetails"
                                      state={{ id: data?._id || "dummy-id" }}
                                    >
                                      <i className="isax isax-eye4" />
                                    </Link>
                                  </li>
                                  {activeTab === "upcoming" && (
                                    <li>
                                      <a
                                        href="#"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          handleCancelConfirmation(data?._id);
                                        }}
                                      >
                                        <i className="isax isax-close-circle text-danger" />
                                        Cancel Appointment
                                      </a>
                                    </li>
                                  )}
                                </ul>
                                {(activeTab === "upcoming" ||
                                  activeTab === "complete") && (
                                  <a
                                    href="#"
                                    className="btn btn-md btn-primary-gradient ms-2"
                                    onClick={async (e) => {
                                      e.preventDefault();
                                      const reportKey = `${data?.memberId}-${data?.bill_no}`;

                                      // If not checked yet
                                      if (!reportStatus[reportKey]) {
                                        const result =
                                          await checkReportAvailability(
                                            data?.memberId,
                                            data?.bill_no
                                          );
                                        setReportStatus((prev) => ({
                                          ...prev,
                                          [reportKey]: result,
                                        }));

                                        if (result.url) {
                                          window.open(result.url, "_blank");
                                        } else {
                                          Swal.fire({
                                            icon: "info",
                                            title: "Report Not Available",
                                            text:
                                              result.message ||
                                              "Report not available yet",
                                          });
                                        }
                                      } else {
                                        // Show confirm dialog to re-check
                                        const { isConfirmed } = await Swal.fire(
                                          {
                                            title: "Re-check Report?",
                                            text: "Do you want to check the report again?",
                                            icon: "question",
                                            showCancelButton: true,
                                            confirmButtonText: "Yes",
                                            cancelButtonText: "No",
                                          }
                                        );

                                        if (isConfirmed) {
                                          const result =
                                            await checkReportAvailability(
                                              data?.memberId,
                                              data?.bill_no
                                            );
                                          setReportStatus((prev) => ({
                                            ...prev,
                                            [reportKey]: result,
                                          }));

                                          if (result.url) {
                                            window.open(result.url, "_blank");
                                          } else {
                                            Swal.fire({
                                              icon: "info",
                                              title: "Report Not Available",
                                              text:
                                                result.message ||
                                                "Report not available yet",
                                            });
                                          }
                                        } else if (
                                          reportStatus[reportKey]?.url
                                        ) {
                                          window.open(
                                            reportStatus[reportKey].url,
                                            "_blank"
                                          );
                                        } else {
                                          Swal.fire({
                                            icon: "info",
                                            title: "Report Not Available",
                                            text:
                                              reportStatus[reportKey]
                                                ?.message ||
                                              "Report not available yet",
                                          });
                                        }
                                      }
                                    }}
                                  >
                                    View Report
                                  </a>
                                )}
                              </li>
                            </ul>
                          </div>
                        );
                      })}
                      {/* /Appointment List */}
                    </div>
                    <div
                      className="tab-pane fade"
                      id="pills-complete"
                      role="tabpanel"
                      aria-labelledby="pills-complete-tab"
                    >
                      {/* Appointment List */}

                      {currentItems?.map((data) => {
                        return (
                          <div className="appointment-wrap">
                            <ul>
                              <li>
                                <div className="patinet-information">
                                  <Link to="/Bookingcancel">
                                    <img
                                      src={
                                        data?.members?.[0]?.profileImage ||
                                        "assets/img/doctors/doctor-thumb-21.jpg"
                                      }
                                      alt="User Image"
                                    />
                                  </Link>
                                  <div className="patient-info">
                                    <p>#{data?.bookingId || "BK123456"}</p>
                                    <h6>
                                      <Link to="/Bookingcancel">
                                        {data?.members?.[0]?.fullName ||
                                          "John Doe"}
                                      </Link>
                                    </h6>
                                  </div>
                                </div>
                              </li>

                              <li className="appointment-info">
                                <p>
                                  <i className="isax isax-clock5" />
                                  {data?.bookingDate?.slice(0, 21) ||
                                    "11 Nov 2024 10:45 AM"}
                                </p>
                                <ul className="d-flex justify-content-center align-items-center apponitment-types">
                                  <li className="mx-2">
                                    {data?.paymentMode || "Cash"}
                                  </li>
                                  <li className="mx-2">
                                    ₹ {data?.totalAmount || "1000"}
                                  </li>
                                </ul>
                              </li>

                              <li className="mail-info-patient">
                                <ul>
                                  <li>
                                    <i className="isax isax-sms5" />
                                    <a className="__cf_email__">
                                      {data?.members?.[0]?.email ||
                                        "[email protected]"}
                                    </a>
                                  </li>
                                  <li>
                                    <i className="isax isax-call5" />
                                    {data?.members?.[0]?.phone ||
                                      "+91 9876543210"}
                                  </li>
                                </ul>
                              </li>

                              <li className="appointment-action d-flex align-items-center justify-content-between">
                                <Link
                                  to="/Bookingdetails"
                                  state={{ id: data?._id || "dummy-id" }}
                                  className="btn btn-md btn-primary-gradient"
                                >
                                  View Details
                                  <i className="isax isax-arrow-right-3 ms-1" />
                                </Link>
                              </li>
                            </ul>
                          </div>
                        );
                      })}
                      {/* /Appointment List */}
                    </div>
                  </div>
                </>
              ) : (
                <div
                  style={{
                    textAlign: "center",
                    marginTop: "40px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/7486/7486820.png"
                    alt="No Appointments"
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "contain",
                      marginBottom: "20px",
                    }}
                  />
                  <div style={{ fontSize: "18px", color: "#555" }}>
                    No appointments have been booked.
                  </div>
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                  marginTop: "24px",
                  marginBottom: "40px",
                }}
              >
                <button
                  style={{
                    padding: "8px 16px",
                    borderRadius: "8px",
                    backgroundColor: "#f8fafc",
                    color: "#334155",
                    border: "1px solid #e2e8f0",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    transition: "all 0.2s ease",
                    ":hover": {
                      backgroundColor: "#f1f5f9",
                      borderColor: "#cbd5e1",
                    },
                    ":disabled": {
                      opacity: 0.5,
                      cursor: "not-allowed",
                    },
                  }}
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  <i
                    className="isax isax-arrow-left-1"
                    style={{ fontSize: "16px" }}
                  />
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      style={{
                        padding: "8px 16px",
                        borderRadius: "8px",
                        backgroundColor:
                          page === currentPage ? "#2a7de1" : "#f8fafc",
                        color: page === currentPage ? "white" : "#334155",
                        border: `1px solid ${
                          page === currentPage ? "#2a7de1" : "#e2e8f0"
                        }`,
                        fontSize: "14px",
                        fontWeight: "600",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        ":hover": {
                          backgroundColor:
                            page === currentPage ? "#1e6fd6" : "#f1f5f9",
                          borderColor:
                            page === currentPage ? "#1e6fd6" : "#cbd5e1",
                        },
                      }}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  style={{
                    padding: "8px 16px",
                    borderRadius: "8px",
                    backgroundColor: "#f8fafc",
                    color: "#334155",
                    border: "1px solid #e2e8f0",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    transition: "all 0.2s ease",
                    ":hover": {
                      backgroundColor: "#f1f5f9",
                      borderColor: "#cbd5e1",
                    },
                    ":disabled": {
                      opacity: 0.5,
                      cursor: "not-allowed",
                    },
                  }}
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Next
                  <i
                    className="isax isax-arrow-right-1"
                    style={{ fontSize: "16px" }}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="modal fade custom-modals" id="add_review">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title">Add Review</h3>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="fa-solid fa-xmark" />
                </button>
              </div>
              <form action="#">
                <div className="add-dependent">
                  <div className="modal-body pb-0">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">
                            Rating <span className="text-danger">*</span>
                          </label>
                          <div className="selection-wrap">
                            <div className="d-inline-block">
                              <div className="rating-selction">
                                <input
                                  type="radio"
                                  name="rating"
                                  defaultValue={5}
                                  id="rating5"
                                />
                                <label htmlFor="rating5">
                                  <i className="fa-solid fa-star" />
                                </label>
                                <input
                                  type="radio"
                                  name="rating"
                                  defaultValue={4}
                                  id="rating4"
                                />
                                <label htmlFor="rating4">
                                  <i className="fa-solid fa-star" />
                                </label>
                                <input
                                  type="radio"
                                  name="rating"
                                  defaultValue={3}
                                  id="rating3"
                                />
                                <label htmlFor="rating3">
                                  <i className="fa-solid fa-star" />
                                </label>
                                <input
                                  type="radio"
                                  name="rating"
                                  defaultValue={2}
                                  id="rating2"
                                  defaultChecked
                                />
                                <label htmlFor="rating2">
                                  <i className="fa-solid fa-star" />
                                </label>
                                <input
                                  type="radio"
                                  name="rating"
                                  defaultValue={1}
                                  id="rating1"
                                  defaultChecked
                                />
                                <label htmlFor="rating1">
                                  <i className="fa-solid fa-star" />
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mb-3">
                          <label className="form-label">
                            Comments <span className="text-danger">*</span>
                          </label>
                          <textarea
                            className="form-control"
                            rows={3}
                            defaultValue={""}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <div className="modal-btn text-end">
                    <a
                      href="#"
                      className="btn btn-md btn-dark rounded-pill"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </a>
                    <button
                      type="button"
                      className="btn btn-md btn-primary-gradient rounded-pill"
                      data-bs-dismiss="modal"
                    >
                      Add Review
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* /Edit Dependent Modal*/}
        {/* Edit Dependent Modal*/}
        <div className="modal fade custom-modals" id="view_review">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title">Review Details</h3>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="fa-solid fa-xmark" />
                </button>
              </div>
              <form action="#">
                <div className="modal-body pb-0">
                  <div className="mb-3">
                    <div className="d-flex justify-content-between flex-wrap gap-3">
                      <div>
                        <label className="form-label text-gray-6">
                          Review for
                        </label>
                        <div className="d-flex align-items-center">
                          <span className="user-avatar me-2">
                            <img
                              src="assets/img/doctors/doctor-thumb-01.jpg"
                              alt="img"
                            />
                          </span>
                          <h6 className="fs-16 fw-medium">Dr Edalin</h6>
                        </div>
                      </div>
                      <div>
                        <label className="form-label text-gray-6">
                          Review By{" "}
                        </label>
                        <div className="d-flex align-items-center">
                          <span className="user-avatar me-2">
                            <img
                              src="assets/img/doctors-dashboard/profile-06.jpg"
                              alt="img"
                            />
                          </span>
                          <h6 className="fs-16 fw-medium">Hendrita</h6>
                        </div>
                      </div>
                      <div>
                        <label className="form-label text-gray-6">Rating</label>
                        <div className="d-flex align-items-center rating-list">
                          <i className="fa-solid fa-star selected" />
                          <i className="fa-solid fa-star selected" />
                          <i className="fa-solid fa-star selected" />
                          <i className="fa-solid fa-star selected" />
                          <i className="fa-solid fa-star" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-0">
                    <div className="review-wrap">
                      <label className="form-label text-gray-6">Review</label>
                      <p className="mb-0">
                        Dr. Edalin provided exceptional care and took the time
                        to listen to my concerns. I’m feeling better than ever
                        and highly recommend him!"
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookingappoinment;
