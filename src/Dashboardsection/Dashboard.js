import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import ProfileSidebar from "./ProfileSidebar";
import { DNA } from "react-loader-spinner";
import AppointmentCard from "./AppointmentCard";

const Dashboard = () => {
  const [UserAppointment, setUserAppointment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    GetUserBooking();
  }, [0]);
  const GetUserBooking = async () => {
    setLoading(true);
    const data = {
      userId: secureLocalStorage.getItem("medicityuser"),
    };
    axios
      .post(`${process.env.REACT_APP_API_KEY}getAllAppointments`, data)
      .then((res) => {
        console.log(res);

        setUserAppointment(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching appointments", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Filter appointments based on search term
  const filteredAppointments = UserAppointment.filter((appointment) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (appointment.clinicName_hpName_drName &&
        appointment.clinicName_hpName_drName.toLowerCase().includes(searchLower)) ||
      (appointment.customerName &&
        appointment.customerName.toLowerCase().includes(searchLower)) ||
      (appointment.customerPhone &&
        appointment.customerPhone.toLowerCase().includes(searchLower)) ||
      (appointment.status &&
        appointment.status.toLowerCase().includes(searchLower))
      // Add other fields you want to search by
    );
  });

  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAppointments.slice(
    indexOfFirstItem,
    indexOfLastItem
  );


  const buttonStyle = {
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
};
const getPaginationItems = (currentPage, totalPages) => {
  const delta = 1;
  const range = [];
  const rangeWithDots = [];
  let l;

  for (
    let i = 1;
    i <= totalPages;
    i++
  ) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - delta && i <= currentPage + delta)
    ) {
      range.push(i);
    }
  }

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push("...");
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  return rangeWithDots;
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
                  <li className="breadcrumb-item active">Dashboard</li>
                </ol>
                <h2
                  style={{ textAlign: "justify" }}
                  className="breadcrumb-title"
                >
                  Patient Dashboard
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
              <div className="dashboard-header">
                <h3>Dashboard</h3>
                <ul className="header-list-btns">
                  <li></li>
                </ul>
              </div>
              <div className="row">
                <div className="col-xl-12 d-flex flex-column">
                  <div className="dashboard-card flex-fill">
                    <div className="dashboard-card-head">
                      <div className="header-title">
                        <h5>Book Appointment</h5>
                      </div>
                      <div className="card-view-link">
                        <div className="owl-nav slide-nav text-end nav-control" />
                      </div>
                    </div>
                    <div className="dashboard-card-body">
                      <div className="dashboard-header border-0 m-0">
                        <ul className="header-list-btns">
                          <li>
                            <div className="input-block dash-search-input">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Search appointments..."
                                value={searchTerm}
                                onChange={(e) => {
                                  setSearchTerm(e.target.value);
                                  setCurrentPage(1); // Reset to first page when searching
                                }}
                              />
                              <span className="search-icon">
                                <i className="isax isax-search-normal" />
                              </span>
                            </div>
                          </li>
                        </ul>
                        {/* <a href="#" className="btn btn-md btn-primary-gradient rounded-pill" data-bs-toggle="modal" data-bs-target="#add_medical_records">Add Medical Record</a> */}
                      </div>
                      <div className="apponiment-dates">
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
                          currentItems.map((data) => (
                            <AppointmentCard key={data._id} data={data} />
                          ))
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
                              {searchTerm
                                ? "No appointments match your search."
                                : "No appointments have been booked."}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Pagination */}
                      <div
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    marginTop: "24px",
    marginBottom: "40px",
    flexWrap: "wrap",
  }}
>
  {/* Previous Button */}
  <button
    style={buttonStyle}
    disabled={currentPage === 1}
    onClick={() => handlePageChange(currentPage - 1)}
  >
    <i className="isax isax-arrow-left-1" style={{ fontSize: "16px" }} />
    Previous
  </button>

  {/* Page Numbers with Ellipsis */}
  {getPaginationItems(currentPage, totalPages).map((item, idx) =>
    item === "..." ? (
      <span key={idx} style={{ padding: "8px", fontSize: "14px" }}>
        ...
      </span>
    ) : (
      <button
        key={item}
        style={{
          ...buttonStyle,
          backgroundColor: item === currentPage ? "#2a7de1" : "#f8fafc",
          color: item === currentPage ? "white" : "#334155",
          border:
            item === currentPage
              ? "1px solid #2a7de1"
              : "1px solid #e2e8f0",
        }}
        onClick={() => handlePageChange(item)}
      >
        {item}
      </button>
    )
  )}

  {/* Next Button */}
  <button
    style={buttonStyle}
    disabled={currentPage === totalPages}
    onClick={() => handlePageChange(currentPage + 1)}
  >
    Next
    <i className="isax isax-arrow-right-1" style={{ fontSize: "16px" }} />
  </button>
</div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
