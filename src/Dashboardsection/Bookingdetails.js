import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import ProfileSidebar from "./ProfileSidebar";

const Bookingdetails = () => {
  const Navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state || {};
  const [UserData, setUserData] = useState();
  const [UserBookingData, setUserBookingData] = useState();
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
      .catch((error) => {});
  };

  useEffect(() => {
    GetgetbookingOrder(id);
  }, [0]);
  const GetgetbookingOrder = async (id) => {
    const data = {
      bookingOrderId: id,
    };

    axios
      .post(`${process.env.REACT_APP_API_KEY}getbookingOrder`, data)
      .then((res) => {
        setUserBookingData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
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
      <div className="content">
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
              <div className="dashboard-header mb-4">
                <div className="header-back d-flex align-items-center gap-3">
                  <Link
                    to="/Bookingappoinment"
                    className="back-arrow text-dark"
                    style={{ fontSize: "20px" }}
                  >
                    <i className="fa-solid fa-arrow-left" />
                  </Link>
                  <h3 className="m-0 fw-semibold">Appointment Details</h3>
                </div>
              </div>

              <div className="appointment-details-wrap">
                {/* Appointment Detail Card */}
                <div
                  className="appointment-detail-card bg-white rounded-3 p-4 mb-4"
                  style={{
                    border: "1px solid #e0e0e0",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                  }}
                >
                  <div className="mb-3">
                    {/* First Row - Booking ID and Date */}
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <div style={{ marginBottom: "15px" }}>
                        <h5 className="m-0 text-primary fw-bold">
                          #{UserBookingData?.bookingId}
                        </h5>
                      </div>
                      <div>
                        <small className="text-muted">
                          Booked on:{" "}
                          {new Date(
                            UserBookingData?.bookingDate
                          ).toLocaleString()}
                        </small>
                      </div>
                    </div>

                    {/* Second Row - Status Badges */}
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center gap-3">
                        {/* Payment Method */}
                        <div className="d-flex align-items-center gap-1">
                          <small className="text-muted">Method:</small>
                          <span
                            className="badge bg-light text-dark"
                            style={{
                              padding: "5px 10px",
                              borderRadius: "20px",
                              border: "1px solid #dee2e6",
                              fontWeight: "500",
                              fontSize: "0.8rem",
                            }}
                          >
                            {UserBookingData?.paymentMode}
                          </span>
                        </div>

                        {/* Payment Status */}
                        <div className="d-flex align-items-center gap-1">
                          <small className="text-muted">Payment:</small>
                          <span
                            className={`badge ${
                              UserBookingData?.paymentStatus
                                ? "bg-success"
                                : "bg-warning"
                            }`}
                            style={{
                              padding: "5px 10px",
                              borderRadius: "20px",
                              fontWeight: "500",
                              fontSize: "0.8rem",
                            }}
                          >
                            {UserBookingData?.paymentStatus
                              ? "Paid"
                              : "Pending"}
                          </span>
                        </div>
                      </div>

                      {/* Booking Status - Right aligned */}
                      <div className="d-flex align-items-center gap-1">
                        <small className="text-muted">Status:</small>
                        <span
                          className={`badge ${
                            UserBookingData?.bookingStatus === 1
                              ? "bg-success"
                              : UserBookingData?.bookingStatus === 2
                              ? "bg-danger"
                              : "bg-info"
                          }`}
                          style={{
                            padding: "5px 10px",
                            borderRadius: "20px",
                            fontWeight: "500",
                            fontSize: "0.8rem",
                          }}
                        >
                          {UserBookingData?.bookingStatus === 1
                            ? "Completed"
                            : UserBookingData?.bookingStatus === 2
                            ? "Cancelled"
                            : "Upcoming"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-4 p-3 bg-light rounded">
                    <div>
                      <h6 className="m-0 text-muted">Total Amount</h6>
                      <div className="d-flex align-items-baseline gap-2">
                        <h4 className="m-0 text-success fw-bold">
                          ₹{UserBookingData?.payableAmount}
                        </h4>
                        {UserBookingData?.discountAmount > 0 && (
                          <small className="text-danger text-decoration-line-through">
                            ₹{UserBookingData?.totalAmount}
                          </small>
                        )}
                      </div>
                    </div>
                    {!UserBookingData?.paymentStatus && (
                      <button className="btn btn-primary px-4 py-2">
                        Pay Now
                      </button>
                    )}
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="pricing-breakdown mb-4 p-3 bg-light rounded">
                    <h6 className="mb-3 fw-semibold">Pricing Breakdown</h6>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">Base Price</span>
                      <span>₹{UserBookingData?.totalAmount}</span>
                    </div>
                    {UserBookingData?.discountAmount > 0 && (
                      <div className="d-flex justify-content-between mb-2">
                        <span className="text-muted">Discount</span>
                        <span className="text-danger">
                          -₹{UserBookingData?.discountAmount}
                        </span>
                      </div>
                    )}
                    {UserBookingData?.offerAmount > 0 && (
                      <div className="d-flex justify-content-between mb-2">
                        <span className="text-muted">Offer</span>
                        <span className="text-danger">
                          -₹{UserBookingData?.offerAmount}
                        </span>
                      </div>
                    )}
                    {UserBookingData?.giftAmount > 0 && (
                      <div className="d-flex justify-content-between mb-2">
                        <span className="text-muted">Gift Card</span>
                        <span className="text-danger">
                          -₹{UserBookingData?.giftAmount}
                        </span>
                      </div>
                    )}
                    <hr className="my-2" />
                    <div className="d-flex justify-content-between fw-bold">
                      <span>Total Payable</span>
                      <span>₹{UserBookingData?.payableAmount}</span>
                    </div>
                  </div>

                  <div className="detail-info-section">
                    <div className="d-flex mb-3">
                      <div className="me-4">
                        <i className="far fa-calendar-alt text-muted me-2"></i>
                      </div>
                      <div>
                        <h6 className="mb-1 fw-semibold">
                          Appointment Date & Time
                        </h6>
                        <p className="m-0 text-dark">
                          {UserBookingData?.sampleCollectDate ||
                            "Not specified"}{" "}
                          - {UserBookingData?.sampleCollectTime}
                        </p>
                        <small className="text-muted">
                          Report Time:{" "}
                          {UserBookingData?.packageIds[0]?.report_time} hours
                        </small>
                      </div>
                    </div>

                    <div className="d-flex mb-3">
                      <div className="me-4">
                        <i className="fas fa-map-marker-alt text-muted me-2"></i>
                      </div>
                      <div>
                        <h6 className="mb-1 fw-semibold">Address</h6>
                        <p className="m-0 text-dark">
                          {`${UserBookingData?.address[0]?.houseNo || ""}, ${
                            UserBookingData?.address[0]?.landMark || ""
                          }, ${UserBookingData?.address[0]?.address || ""}`}
                        </p>
                        <p className="m-0 text-dark">
                          Pincode:{" "}
                          {UserBookingData?.address[0]?.pincode ||
                            "Not specified"}
                        </p>
                      </div>
                    </div>

                    <div className="d-flex mb-3">
                      <div className="me-4">
                        <i className="fas fa-home text-muted me-2"></i>
                      </div>
                      <div>
                        <h6 className="mb-1 fw-semibold">Place Type</h6>
                        <p className="m-0 text-dark">
                          {UserBookingData?.address[0]?.placeType ||
                            "Not specified"}
                        </p>
                      </div>
                    </div>

                    <div className="d-flex">
                      <div className="me-4">
                        <i className="fas fa-info-circle text-muted me-2"></i>
                      </div>
                      <div>
                        <h6 className="mb-1 fw-semibold">
                          Additional Information
                        </h6>
                        <p className="m-0 text-dark">
                          Fasting Required:{" "}
                          {UserBookingData?.packageIds[0]?.fasting_time} hours
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Members Section */}
                <div className="recent-appointments">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="m-0 fw-semibold">
                      Members ({UserBookingData?.members?.length})
                    </h5>
                  </div>

                  {UserBookingData?.members?.map((data, index) => (
                    <div
                      key={index}
                      className="appointment-member-card bg-white rounded-3 p-4 mb-3"
                      style={{
                        border: "1px solid #e9ecef",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                      }}
                    >
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div>
                          <span className="text-muted small">
                            Member ID: {data?._id}
                          </span>
                          <h5 className="my-2 fw-semibold">{data?.fullName}</h5>
                          <div className="d-flex flex-wrap gap-2">
                            <span className="badge bg-light text-dark">
                              <i className="fas fa-birthday-cake me-1"></i>
                              {data?.age} years (DOB:{" "}
                              {new Date(data?.dob).toLocaleDateString()})
                            </span>
                            <span className="badge bg-light text-dark">
                              <i className="fas fa-venus-mars me-1"></i>
                              {data?.gender}
                            </span>
                            <span className="badge bg-light text-dark">
                              <i className="fas fa-phone me-1"></i>
                              {data?.phone}
                            </span>
                            {data?.email && (
                              <span className="badge bg-light text-dark">
                                <i className="fas fa-envelope me-1"></i>
                                {data?.email}
                              </span>
                            )}
                            <span className="badge bg-light text-dark">
                              <i className="fas fa-users me-1"></i>
                              Relation: {data?.relationName || "Self"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <hr className="my-3" />

                      <h6 className="fw-semibold mb-3">Selected Packages</h6>

                      {UserBookingData?.packageIds?.map((pack, i) => (
                        <div
                          key={i}
                          className="package-item d-flex justify-content-between align-items-center mb-3 p-3 bg-light rounded"
                        >
                          <div>
                            <h6 className="m-0 fw-semibold">{pack?.title}</h6>
                            <div className="d-flex flex-wrap gap-2 mt-2">
                              <span className="badge bg-info text-white">
                                ₹{pack?.discount_price} (Original: ₹
                                {pack?.price})
                              </span>
                              <span className="badge bg-secondary text-white">
                                {pack?.total_test} Tests
                              </span>
                              <span className="badge bg-dark text-white">
                                For {pack?.gender}, Age {pack?.ageGroup}+
                              </span>
                            </div>
                            <div className="mt-2">
                              <h6 className="small fw-semibold mb-1">
                                Tests Included:
                              </h6>
                              <div className="d-flex flex-wrap gap-2">
  {pack?.test?.map((test, idx) => (
    <span key={idx} className="badge bg-light text-dark">
      {test.test_name}
    </span>
  ))}
</div>

                            </div>
                          </div>
                          <button
                            onClick={() =>
                              Navigate(
                                `/Healthcheckuppackagedetails/${pack?._id}`
                              )
                            }
                            className="btn btn-sm btn-outline-primary align-self-start"
                          >
                            View
                          </button>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookingdetails;
