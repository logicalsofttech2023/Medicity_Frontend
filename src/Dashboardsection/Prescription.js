import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import ProfileSidebar from "./ProfileSidebar";
import { DNA } from "react-loader-spinner";

const Prescription = () => {
  const [singleprecestion, setsingleprecestion] = useState();
  console.log("singleprecestion", singleprecestion);
  const [prescriptionId, setprescriptionId] = useState();
  const [PrescriptiondataData, setPrescriptiondataData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetPrescription();
  }, [0]);
  const GetPrescription = async () => {
    setLoading(true);

    const data = {
      userId: secureLocalStorage.getItem("medicityuser"),
    };

    axios
      .post(`${process.env.REACT_APP_API_KEY}getPrescriptionFiles`, data)
      .then((res) => {
        setPrescriptiondataData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const Deletedprescription = async () => {
    const data = {
      prescriptionId: prescriptionId,
    };

    axios
      .post(`${process.env.REACT_APP_API_KEY}deletePrescriptionFile`, data)
      .then((res) => {
        toast.success(res.data.message);
        GetPrescription();
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Something went wrong");
      });
  };

  const viewpreseceptions = (item) => {
    try {
      const data = {
        prescriptionId: item,
      };

      axios
        .post(`${process.env.REACT_APP_API_KEY}getByIdPrescriptionFile`, data)
        .then((res) => {
          setsingleprecestion(res?.data?.data);
        })
        .catch((error) => {
          toast.error(error.response?.data?.message || "Something went wrong");
          console.log(error);
        });
    } catch (error) {
      console.log("Error", error);
    }
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
                  <li className="breadcrumb-item active">
                    Prescription Records
                  </li>
                </ol>
                <h2
                  style={{ textAlign: "justify" }}
                  className="breadcrumb-title"
                >
                  Prescription Records
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
                <h3>Prescription</h3>
                <div className="appointment-tabs">
                  <ul className="nav">
                    <li>
                      <a
                        href="#"
                        className="nav-link active"
                        data-bs-toggle="tab"
                        data-bs-target="#prescription"
                      >
                        Prescriptions
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="tab-content pt-0">
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
                </div>
                {/* Prescription Tab */}

                <div className="tab-pane fade show active" id="prescription">
                  <div className="custom-table">
                    <div className="table-responsive">
                      <table className="table table-center mb-0">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {loading ? (
                            <tr>
                              <td colSpan="4" className="text-center py-5">
                                <DNA
                                  visible={true}
                                  height="80"
                                  width="80"
                                  ariaLabel="dna-loading"
                                  wrapperStyle={{}}
                                  wrapperClass="dna-wrapper"
                                />
                              </td>
                            </tr>
                          ) : PrescriptiondataData?.length > 0 ? (
                            PrescriptiondataData.map((data) => (
                              <tr key={data._id}>
                                <td>
                                  <a
                                    href="#!"
                                    className="lab-icon prescription"
                                  >
                                    {data?.memberId?.fullName}
                                  </a>
                                </td>
                                <td>{data?.memberId?.age}</td>
                                <td>{data?.memberId?.gender}</td>
                                <td>
                                  <div className="action-item">
                                    <a
                                      onClick={() =>
                                        viewpreseceptions(data._id)
                                      }
                                      href="#!"
                                      data-bs-toggle="modal"
                                      data-bs-target="#view_prescription"
                                    >
                                      <i className="isax isax-link-2" />
                                    </a>
                                    <a href="#!">
                                      <i className="isax isax-import" />
                                    </a>
                                    <a
                                      onClick={() =>
                                        setprescriptionId(data._id)
                                      }
                                      href="#!"
                                      data-bs-toggle="modal"
                                      data-bs-target="#delete_modal"
                                    >
                                      <i className="isax isax-trash" />
                                    </a>
                                  </div>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="4" className="text-center py-5">
                                <img
                                  src="https://cdn-icons-png.flaticon.com/512/7486/7486820.png"
                                  alt="No Prescriptions"
                                  style={{
                                    width: "150px",
                                    height: "150px",
                                    objectFit: "contain",
                                    marginBottom: "20px",
                                  }}
                                />
                                <div
                                  style={{ fontSize: "18px", color: "#555" }}
                                >
                                  No prescriptions available yet.
                                </div>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade custom-modals" id="add_medical_records">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Add Medical Record</h3>
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
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Title <span className="text-danger">*</span>
                      </label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Record For <span className="text-danger">*</span>
                      </label>
                      <input type="text" className="form-control" />
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
                        defaultValue={""}
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
                    Add Medical Records
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* /Add Medical Records Modal */}
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
              <div className="prescribe-download gap-2">
                <h5>21 Mar 2024</h5>
                <ul>
                  <li>
                    <a href="javascript:void(0);" className="print-link">
                      <i className="fa-solid fa-print" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="btn btn-md btn-primary-gradient rounded-pill"
                    >
                      Download
                    </a>
                  </li>
                </ul>
              </div>
              <div className="view-prescribe-details p-0 border-0">
                {/* Invoice Item */}
                <div className="invoice-item">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="invoice-info d-flex align-items-center">
                        <div className="clinic-image d-inline-flex align-items-center justify-content-center">
                          <img src="assets/img/icons/vtaplus.svg" alt="img" />
                        </div>
                        <div>
                          <h6 className="fs-16 fw-semibold">
                            Vitalplus Clinic
                          </h6>
                          <p className="fs-14 fw-medium">Dr. Sandy Maria</p>
                          <p className="fs-14">MBLS,MS</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="invoice-info2">
                        <p>
                          <span>Test Type : </span>CBC
                        </p>
                        <p>
                          <span>Collected On : </span>20 Mar 2024, 10:00 AM
                        </p>
                        <p>
                          <span>Reported On :</span>21 Mar 2024, 11:00 AM
                        </p>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="patient-infos d-flex align-items-center justify-content-between gap-3 flex-wrap">
                        <div className="d-flex align-items-center">
                          <span className="avatar me-2">
                            <img
                              src="assets/img/doctors-dashboard/profile-06.jpg"
                              className="rounded"
                              alt="img"
                            />
                          </span>
                          <div>
                            <h6 className="fs-14 fw-medium">Hendrita Kearns</h6>
                            <p>Patient ID : PT254654</p>
                          </div>
                        </div>
                        <div>
                          <h6 className="fs-14 fw-medium">Gender</h6>
                          <p>Female</p>
                        </div>
                        <div>
                          <h6 className="fs-14 fw-medium">Age</h6>
                          <p>32 years </p>
                        </div>
                        <div>
                          <h6 className="fs-14 fw-medium">Blood</h6>
                          <p>O+</p>
                        </div>
                        <div>
                          <h6 className="fs-14 fw-medium">Type</h6>
                          <p>Outpatient</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Invoice Item */}
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
                  <h6>Complete Blood Count(CBC)</h6>
                  <p className="fs-14 mb-0">
                    <span className="text-gray-9">Primary Test Type :</span>{" "}
                    Blood
                  </p>
                </div>
                {/* Invoice Item */}
                <div className="invoice-item invoice-table-wrap">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="table-responsive inv-table">
                        <table className="invoice-table table table-bordered">
                          <thead>
                            <tr>
                              <th>Investigation</th>
                              <th>Result</th>
                              <th>Reference Value</th>
                              <th>Unit</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="report-title" colSpan={4}>
                                HEMOGLOBIN
                              </td>
                            </tr>
                            <tr>
                              <td>Hemoglobin (Hb)</td>
                              <td>
                                12.5
                                <span className="badge badge-info-transparent text-xs d-inline-block rounded-pill ms-1">
                                  Low
                                </span>
                              </td>
                              <td>13.0 - 17.0</td>
                              <td>g/dL</td>
                            </tr>
                            <tr>
                              <td className="report-title" colSpan={4}>
                                RBC COUNT
                              </td>
                            </tr>
                            <tr>
                              <td>Total RBC Count</td>
                              <td>5.2</td>
                              <td>4.5 - 5.5</td>
                              <td>million cells/µL</td>
                            </tr>
                            <tr>
                              <td className="report-title" colSpan={4}>
                                BLOOD INDICES
                              </td>
                            </tr>
                            <tr>
                              <td>Packed Cell Volume (PCV)</td>
                              <td className="text-danger">
                                57.5
                                <span className="badge badge-danger-transparent text-xs d-inline-block rounded-pill ms-1">
                                  High
                                </span>
                              </td>
                              <td>40 - 50</td>
                              <td>%</td>
                            </tr>
                            <tr>
                              <td>
                                Mean Corpuscular Volume (MCV){" "}
                                <span className="fs-10 text-gray-6">
                                  Calculated
                                </span>
                              </td>
                              <td>87.75</td>
                              <td>83 - 101</td>
                              <td>fL</td>
                            </tr>
                            <tr>
                              <td>MCH Calculated</td>
                              <td>27.72</td>
                              <td>27 - 32</td>
                              <td>pg</td>
                            </tr>
                            <tr>
                              <td>MCHC Calculated</td>
                              <td>32.8</td>
                              <td>32.5 - 34.5</td>
                              <td>g/dL</td>
                            </tr>
                            <tr>
                              <td>RDW</td>
                              <td>13.6</td>
                              <td>11.6 - 14.0</td>
                              <td>%</td>
                            </tr>
                            <tr>
                              <td className="report-title" colSpan={4}>
                                WBC COUNT
                              </td>
                            </tr>
                            <tr>
                              <td>Total WBC Count</td>
                              <td>9000</td>
                              <td>4000 - 11000</td>
                              <td>cells/µL</td>
                            </tr>
                            <tr>
                              <td className="report-title" colSpan={4}>
                                DIFFERENTIAL WBC COUNT
                              </td>
                            </tr>
                            <tr>
                              <td>Neutrophils</td>
                              <td>60</td>
                              <td>50 - 62</td>
                              <td>%</td>
                            </tr>
                            <tr>
                              <td>Lymphocytes</td>
                              <td>31</td>
                              <td>20 - 40</td>
                              <td>%</td>
                            </tr>
                            <tr>
                              <td>Eosinophils</td>
                              <td>01</td>
                              <td>00 - 06</td>
                              <td>%</td>
                            </tr>
                            <tr>
                              <td>Monocytes</td>
                              <td>07</td>
                              <td>00 - 10</td>
                              <td>%</td>
                            </tr>
                            <tr>
                              <td>Basophils</td>
                              <td>01</td>
                              <td>00 - 02</td>
                              <td>%</td>
                            </tr>
                            <tr>
                              <td>Platelet Count</td>
                              <td>248157</td>
                              <td>150000 - 410000</td>
                              <td>µL</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Invoice Item */}
                <p className="mb-2">
                  <span className="text-gray-9 fw-medium">Instruments :</span>{" "}
                  Fully Automated Cell Counter - Mindray 300
                </p>
                <p className="mb-3">
                  <span className="text-gray-9 fw-medium">
                    Interpretation :
                  </span>{" "}
                  Further confirm for Anemia
                </p>
                <div className="row align-items-center">
                  <div className="col-md-6">
                    <div className="scan-wrap">
                      <h6>Scan to download report</h6>
                      <img src="assets/img/scan.png" alt="scan" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="prescriber-info">
                      <h6>Dr. Edalin Hendry</h6>
                      <p>Dept of Cardiology</p>
                    </div>
                  </div>
                </div>
                <ul className="nav inv-paginate justify-content-center">
                  <li>
                    Page 01 of{" "}
                    <a
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#view_prescription2"
                      data-bs-dismiss="modal"
                    >
                      02
                    </a>
                  </li>
                </ul>
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
              <div>
                <div className="row">
                  {singleprecestion?.files?.map((data) => {
                    return (
                      <div className="col-md-6 mb-2">
                        <img src={`${process.env.REACT_APP_IMG_URL}${data}`} />
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="prescribe-download">
                <h5>21 Mar 2024</h5>
                <ul>
                  <li>
                    <a href="javascript:void(0);" className="print-link">
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
                        <img
                          src="https://www.medicitylab.in/Images/medicity-logo_clipdrop-enhance.jpg"
                          alt="logo"
                        />
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
              <form action="https://doccure.dreamstechnologies.com/html/template/medical-records.html">
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
                    onClick={Deletedprescription}
                    type="button"
                    className="btn btn-md btn-primary-gradient rounded-pill"
                    data-bs-dismiss="modal"
                  >
                    Yes Delete
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prescription;
