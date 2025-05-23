import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import ProfileSidebar from "./ProfileSidebar";
import { DNA } from "react-loader-spinner";

const Reports = () => {
  const [reportid, setreportid] = useState(null);
  const [report, setreport] = useState();
  const [UserReportData, setUserReportData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetUserReport();
  }, [0]);
  const GetUserReport = async () => {
    setLoading(true);
    const data = {
      userId: secureLocalStorage.getItem("medicityuser"),
    };

    axios
      .post(`${process.env.REACT_APP_API_KEY}userReportsList`, data)
      .then((res) => {
        setUserReportData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const DeleteReport = async () => {
    const data = {
      reportId: reportid,
    };

    axios
      .post(`${process.env.REACT_APP_API_KEY}reportsDelete`, data)
      .then((res) => {
        GetUserReport();
        setUserReportData((prev) =>
          prev.filter((item) => item._id !== reportid)
        );
        toast.success(res.data.message);
      })
      .catch((error) => {});
  };

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
                  <li className="breadcrumb-item active">Medical Reports</li>
                </ol>
                <h2
                  style={{ textAlign: "justify" }}
                  className="breadcrumb-title"
                >
                  Reports
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
              <ProfileSidebar />
              {/* /Profile Sidebar */}
            </div>
            <div className="col-lg-7 col-xl-8">
              <div className="dashboard-header flex-wrap">
                <h3>Reports</h3>
                <div className="appointment-tabs">
                  <ul className="nav">
                    <li>
                      <a
                        href="#"
                        className="nav-link active"
                        data-bs-toggle="tab"
                        data-bs-target="#medical"
                      >
                        Medical Reports
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="tab-content pt-0">
                {/* Medical Records Tab */}
                <div className="tab-pane fade show active" id="medical">
                  <div className="dashboard-header border-0 m-0">
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
                    {/* <a href="#" className="btn btn-md btn-primary-gradient rounded-pill" data-bs-toggle="modal" data-bs-target="#add_medical_records">Add Medical Record</a> */}
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
                  ) : UserReportData?.length > 0 ? (
                    <div className="custom-table">
                      <div className="table-responsive">
                        <table className="table table-center mb-0">
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Test Name</th>
                              <th>Date</th>
                              <th>Record For</th>
                              <th>Comments</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {UserReportData?.map((data) => {
                              return (
                                <tr>
                                  <td>
                                    <a
                                      className="link-primary"
                                      data-bs-toggle="modal"
                                      data-bs-target="#view_report"
                                    >
                                      #MR12
                                    </a>
                                  </td>
                                  <td>
                                    <a className="lab-icon">{data?.testName}</a>
                                  </td>
                                  <td>{data?.date?.slice(0, 16)}</td>
                                  <td>
                                    <h2 className="table-avatar">
                                      {/* <a
                                        href="patient-details.html"
                                        className="avatar avatar-sm me-2"
                                      >
                                        <img
                                          className="avatar-img rounded-3"
                                          src="assets/img/doctors-dashboard/profile-06.jpg"
                                          alt="User Image"
                                        />
                                      </a> */}
                                      <a href="paitent-details.html">
                                        {data?.recordFor}
                                      </a>
                                    </h2>
                                  </td>
                                  <td>{data?.comment}</td>
                                  <td>
                                    <div className="action-item">
                                      <a
                                        onClick={() => setreport(data)}
                                        data-bs-toggle="modal"
                                        data-bs-target="#view_report"
                                      >
                                        <i className="isax isax-link-2" />
                                      </a>
                                      {/* <a  data-bs-toggle="modal" data-bs-target="#edit_medical_records">
                                <i className="isax isax-edit-2" />
                              </a> */}
                                      <a
                                        href={`${process.env.REACT_APP_IMG_URL}${data?.file}`}
                                        download={data?.file?.split("/").pop()}
                                      >
                                        <i className="isax isax-import" />
                                      </a>

                                      <a
                                        onClick={() => setreportid(data._id)}
                                        data-bs-toggle="modal"
                                        data-bs-target="#delete_modal"
                                      >
                                        <i className="isax isax-trash" />
                                      </a>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
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
                        alt="No Reports"
                        style={{
                          width: "150px",
                          height: "150px",
                          objectFit: "contain",
                          marginBottom: "20px",
                        }}
                      />
                      <div style={{ fontSize: "18px", color: "#555" }}>
                        No reports are available at the moment.
                      </div>
                    </div>
                  )}
                  {/* Pagination */}
                  {/* <div className="pagination dashboard-pagination">
                <ul>
                  <li>
                    <a href="#" className="page-link prev">Prev</a>
                  </li>
                  <li>
                    <a href="#" className="page-link">1</a>
                  </li>
                  <li>
                    <a href="#" className="page-link active">2</a>
                  </li>
                  <li>
                    <a href="#" className="page-link">3</a>
                  </li>
                  <li>
                    <a href="#" className="page-link">4</a>
                  </li>
                  <li>
                    <a href="#" className="page-link next">Next</a>
                  </li>
                </ul>
              </div> */}
                  {/* /Pagination */}
                </div>
                {/* /Medical Records Tab */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Medical Records Modal */}
      <div className="modal fade custom-modals" id="edit_medical_records">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Edit Medical Record</h3>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-xmark" />
              </button>
            </div>
            <form>
              <div className="modal-body pb-0">
                <div className="row">
                  <div className="mb-3">
                    <label className="col-form-label">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="Glucose Test V12"
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Record For <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue="Hendrita Clark"
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Date <span className="text-danger">*</span>
                      </label>
                      <div className="form-icon">
                        <input
                          type="text"
                          className="form-control datetimepicker"
                          defaultValue="23/04/2024"
                        />
                        <span className="icon">
                          <i className="isax isax-calendar-1" />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Comments <span className="text-danger">*</span>
                      </label>
                      <textarea
                        className="form-control"
                        rows={3}
                        defaultValue={"Take Good Rest"}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Record <span className="text-danger">*</span>
                      </label>
                      <div>
                        <div className="file-upload">
                          <input type="file" />
                          <p>
                            <i className="isax isax-document-upload me-1" />
                            Upload File
                          </p>
                        </div>
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
                    data-bs-toggle="modal"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </a>
                  <button
                    type="submit"
                    className="btn btn-md btn-primary-gradient rounded-pill"
                  >
                    Save Medical Records
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* /Edit Medical Records Modal */}
      {/*View Report */}
      <div className="modal fade custom-modals" id="view_report">
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">View Report</h3>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-xmark" />
              </button>
            </div>
            <div className="modal-body pb-0">
              {/* PDF Viewer or Image Preview */}
              <div className="prescribe-download gap-2">
                {report?.file?.endsWith(".pdf") ? (
                  <iframe
                    src={`${process.env.REACT_APP_IMG_URL}${report?.file}`}
                    style={{ width: "100%", height: "350px" }}
                    title="Report PDF"
                  />
                ) : (
                  <img
                    style={{
                      width: "100%",
                      height: "350px",
                      objectFit: "contain",
                    }}
                    src={`${process.env.REACT_APP_IMG_URL}${report?.file}`}
                    alt="Report"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "assets/img/no-image.png";
                    }}
                  />
                )}
              </div>

              {/* Report Date and Actions */}
              <div className="prescribe-download gap-2">
                <h5>
                  {new Date(
                    report?.date || report?.createdAt
                  ).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </h5>
                <ul>
                  <li>
                    <a className="print-link" onClick={() => window.print()}>
                      <i className="fa-solid fa-print" />
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      href={`${process.env.REACT_APP_IMG_URL}${report?.file}`}
                      download={report?.file?.split("/").pop()}
                      className="btn btn-md btn-primary-gradient rounded-pill"
                    >
                      Download
                    </a>
                  </li>
                </ul>
              </div>

              {/* Report Details */}
              <div className="view-prescribe-details p-0 border-0">
                <div className="invoice-item">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="invoice-info">
                        <h6 className="fs-16 fw-semibold">
                          {report?.testName || "Test Report"}
                        </h6>
                        <p className="fs-14 fw-medium">
                          Record For: {report?.recordFor || "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="invoice-info2">
                        <p>
                          <span>Test Name: </span>
                          {report?.testName || "N/A"}
                        </p>
                        <p>
                          <span>Collected On: </span>
                          {new Date(
                            report?.date || report?.createdAt
                          ).toLocaleString("en-US", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                        <p>
                          <span>Reported On: </span>
                          {new Date(report?.updatedAt).toLocaleString("en-US", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Comments Section */}
                {report?.comment && (
                  <div className="mt-3">
                    <h6>Comments</h6>
                    <p>{report.comment}</p>
                  </div>
                )}

                {/* File Info */}
                <div className="mt-3">
                  <p>
                    <span className="text-gray-9 fw-medium">File: </span>
                    {report?.file}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /View Report */}
      {/*View Prescription */}
      <div className="modal fade custom-modals" id="view_prescription">
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">View Prescription</h3>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-xmark" />
              </button>
            </div>
            <div className="modal-body pb-0">
              <div className="prescribe-download">
                <h5>21 Mar 2024</h5>
                <ul>
                  <li>
                    <a className="print-link">
                      <i className="isax isax-printer" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="btn btn-primary-gradient rounded-pill"
                    >
                      Download
                    </a>
                  </li>
                </ul>
              </div>
              <div className="view-prescribe invoice-content mb-0">
                <div className="invoice-item">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="invoice-logo">
                        <img src="assets/img/logo.svg" alt="logo" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <p className="invoice-details">
                        <strong>Prescription ID :</strong> #PR-123 <br />
                        <strong>Issued:</strong> 21 Mar 2024
                      </p>
                    </div>
                  </div>
                </div>
                {/* Invoice Item */}
                <div className="invoice-item">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="invoice-info">
                        <h6 className="customer-text">Doctor Details</h6>
                        <p className="invoice-details invoice-details-two">
                          Edalin Hendry <br />
                          806 Twin Willow Lane, <br />
                          Newyork, USA <br />
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="invoice-info invoice-info2">
                        <h6 className="customer-text">Patient Details</h6>
                        <p className="invoice-details">
                          Adrian Marshall <br />
                          299 Star Trek Drive,
                          <br />
                          Florida, 32405, USA <br />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Invoice Item */}
                {/* Invoice Item */}
                <div className="invoice-item invoice-table-wrap">
                  <div className="row">
                    <div className="col-md-12">
                      <h6>Prescription Details</h6>
                      <div className="table-responsive">
                        <table className="invoice-table table table-bordered">
                          <thead>
                            <tr>
                              <th>Medicine Name</th>
                              <th>Dosage</th>
                              <th>Frequency</th>
                              <th>Duration</th>
                              <th>Timings</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Ecosprin 75MG [Asprin 75 MG Oral Tab]</td>
                              <td>
                                75 mg <span>Oral Tab</span>
                              </td>
                              <td>1-0-0-1</td>
                              <td>1 month</td>
                              <td>Before Meal</td>
                            </tr>
                            <tr>
                              <td>Alexer 90MG Tab</td>
                              <td>
                                90 mg <span>Oral Tab</span>
                              </td>
                              <td>1-0-0-1</td>
                              <td>1 month</td>
                              <td>Before Meal</td>
                            </tr>
                            <tr>
                              <td>Ramistar XL2.5</td>
                              <td>
                                60 mg <span>Oral Tab</span>
                              </td>
                              <td>1-0-0-0</td>
                              <td>1 month</td>
                              <td>After Meal</td>
                            </tr>
                            <tr>
                              <td>Metscore</td>
                              <td>
                                90 mg <span>Oral Tab</span>
                              </td>
                              <td>1-0-0-1</td>
                              <td>1 month</td>
                              <td>After Meal</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Invoice Item */}
                {/* Invoice Information */}
                <div className="other-info">
                  <h4>Other information</h4>
                  <p className="mb-0">
                    An account of the present illness, which includes the
                    circumstances surrounding the onset of recent health changes
                    and the chronology of subsequent events that have led the
                    patient to seek medicine
                  </p>
                </div>
                <div className="other-info">
                  <h4>Follow Up</h4>
                  <p className="mb-0">
                    Follow up after 3 months, Have to come on empty stomach
                  </p>
                </div>
                <div className="prescriber-info">
                  <h6>Dr. Edalin Hendry</h6>
                  <p>Dept of Cardiology</p>
                </div>
                {/* /Invoice Information */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /View Prescription */}
      {/* Delete */}
      <div className="modal fade custom-modals" id="delete_modal">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body p-4 text-center">
              <div>
                <span className="del-icon mb-2 mx-auto">
                  <i className="isax isax-trash" />
                </span>
                <h3 className="mb-2">Delete Record</h3>
                <p className="mb-3">
                  Are you sure you want to delete this record?
                </p>
                <div className="d-flex justify-content-center flex-wrap gap-3">
                  <a
                    href="#"
                    className="btn btn-md btn-dark rounded-pill"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </a>
                  <button
                    onClick={DeleteReport}
                    type="button"
                    className="btn btn-md btn-primary-gradient rounded-pill"
                    data-bs-dismiss="modal"
                  >
                    Yes Delete
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

export default Reports;
