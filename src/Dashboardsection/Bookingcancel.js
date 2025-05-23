import React from "react";
import { Link } from "react-router-dom";

const Bookingcancel = () => {
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
            <div className="col-lg-5 col-xl-4 theiaStickySidebar">
              {/* Profile Sidebar */}
              <div className="profile-sidebar patient-sidebar profile-sidebar-new">
                <div className="widget-profile pro-widget-content">
                  <div className="profile-info-widget">
                    <Link to="/Settings" className="booking-doc-img">
                      <img
                        src="assets/img/doctors-dashboard/profile-06.jpg"
                        alt="User Image"
                      />
                    </Link>
                    <div className="profile-det-info">
                      <h3>
                        <Link to="/Settings">Hendrita Hayes</Link>
                      </h3>
                      <div className="patient-details">
                        <h5 className="mb-0">Patient ID : PT254654</h5>
                      </div>
                      <span>
                        Female <i className="fa-solid fa-circle" /> 32 years 03
                        Months
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
                      <li className="active">
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
                      <li>
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
            {/* / Profile Sidebar */}
            <div className="col-lg-7 col-xl-8">
              <div className="dashboard-header">
                <div className="header-back">
                  <Link to="/Bookingappoinment" className="back-arrow">
                    <i className="fa-solid fa-arrow-left" />
                  </Link>
                  <h3>Appointment Details</h3>
                </div>
              </div>
              <div className="appointment-details-wrap">
                {/* Appointment Detail Card */}
                <div className="appointment-wrap appointment-detail-card">
                  <ul>
                    <li>
                      <div className="patinet-information">
                        <a href="#">
                          <img
                            src="assets/img/doctors-dashboard/doctor-profile-img.jpg"
                            alt="User Image"
                          />
                        </a>
                        <div className="patient-info">
                          <p>#Apt0001</p>
                          <h6>
                            <a href="#">Dr Edalin Hendry </a>
                          </h6>
                          <div className="mail-info-patient">
                            <ul>
                              <li>
                                <i className="isax isax-sms5" />
                                <a
           
                                  className="__cf_email__"
                                  data-cfemail="35505154595c5b75504d54584559501b565a58"
                                >
                                  [email&nbsp;protected]
                                </a>
                              </li>
                              <li>
                                <i className="isax isax-call5" />
                                +1 504 368 6874
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="appointment-info">
                      <div className="person-info">
                        <p>Person with patient</p>
                        <ul className="d-flex apponitment-types">
                          <li>Andrew</li>
                        </ul>
                      </div>
                      <div className="person-info">
                        <p>Type of Appointment</p>
                        <ul className="d-flex apponitment-types">
                          <li>
                            <i className="isax isax-video5 text-indigo" />
                            Video Call
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="appointment-action">
                      <div className="detail-badge-info">
                        <span className="badge bg-red me-2">Cancelled</span>
                        <a
                          href="#reject_reason"
                          className="reject-popup"
                          data-bs-toggle="modal"
                        >
                          Reason
                        </a>
                      </div>
                      <div className="consult-fees">
                        <h6>Consultation Fees : $200</h6>
                      </div>
                      <ul>
                        <li>
                          <a href="#">
                            <i className="isax isax-messages-25" />
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                  <ul className="detail-card-bottom-info">
                    <li>
                      <h6>Appointment Date &amp; Time</h6>
                      <span>22 Jul 2023 - 12:00 pm</span>
                    </li>
                    <li>
                      <h6>Visit Type</h6>
                      <span>General</span>
                    </li>
                    <li>
                      <div className="detail-badge-info">
                        <span className="badge bg-soft-red me-2">
                          Status : Reschedule
                        </span>
                        <a
                          href="booking-popup.html"
                          className="reschedule-btn btn btn-primary-gradient rounded-pill"
                        >
                          Reschedule Appointment
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>
                {/* /Appointment Detail Card */}
                <div className="recent-appointments">
                  <h5 className="head-text">Recent Appointments</h5>
                  {/* Appointment List */}
                  <div className="appointment-wrap">
                    <ul>
                      <li>
                        <div className="patinet-information">
                          <a href="#">
                            <img
                              src="assets/img/doctors/doctor-15.jpg"
                              alt="User Image"
                            />
                          </a>
                          <div className="patient-info">
                            <p>#Apt0002</p>
                            <h6>
                              <a href="#">Dr.Shanta Nesmith</a>
                            </h6>
                          </div>
                        </div>
                      </li>
                      <li className="appointment-info">
                        <p>
                          <i className="isax isax-clock5" />
                          11 Nov 2024 10.45 AM
                        </p>
                        <ul className="d-flex apponitment-types">
                          <li>General Visit</li>
                          <li>Chat</li>
                        </ul>
                      </li>
                      <li className="mail-info-patient">
                        <ul>
                          <li>
                            <i className="isax isax-sms5" />
                            <a
       
                              className="__cf_email__"
                              data-cfemail="25564d444b514465405d44485549400b464a48"
                            >
                              [email&nbsp;protected]
                            </a>
                          </li>
                          <li>
                            <i className="isax isax-call5" />
                            +1 504 368 6874
                          </li>
                        </ul>
                      </li>
                      <li className="appointment-action">
                        <ul>
                          <li>
                            <a href="#">
                              <i className="isax isax-eye4" />
                            </a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  {/* /Appointment List */}
                  {/* Appointment List */}
                  <div className="appointment-wrap">
                    <ul>
                      <li>
                        <div className="patinet-information">
                          <a href="#">
                            <img
                              src="assets/img/doctors/doctor-thumb-02.jpg"
                              alt="User Image"
                            />
                          </a>
                          <div className="patient-info">
                            <p>#Apt0003</p>
                            <h6>
                              <a href="#">Dr.John Ewel</a>
                            </h6>
                          </div>
                        </div>
                      </li>
                      <li className="appointment-info">
                        <p>
                          <i className="isax isax-clock5" />
                          27 Oct 2024 09.30 AM
                        </p>
                        <ul className="d-flex apponitment-types">
                          <li>General Visit</li>
                          <li>Video Call</li>
                        </ul>
                      </li>
                      <li className="mail-info-patient">
                        <ul>
                          <li>
                            <i className="isax isax-sms5" />
                            <a
       
                              className="__cf_email__"
                              data-cfemail="dcb6b3b4b29cb9a4bdb1acb0b9f2bfb3b1"
                            >
                              [email&nbsp;protected]
                            </a>
                          </li>
                          <li>
                            <i className="isax isax-call5" />
                            +1 749 104 6291
                          </li>
                        </ul>
                      </li>
                      <li className="appointment-action">
                        <ul>
                          <li>
                            <a href="#">
                              <i className="isax isax-eye4" />
                            </a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  {/* /Appointment List */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
                    <a href="javascript:void(0);" className="print-link">
                      <i className="fa-solid fa-print" />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="btn btn-primary prime-btn">
                      Download
                    </a>
                  </li>
                </ul>
              </div>
              <div className="view-prescribe-details">
                <div className="hospital-addr">
                  <div className="invoice-logo">
                    <img src="assets/img/logo.png" alt="logo" />
                  </div>
                  <h5>
                    16, Wardlow, Buxton, Derbyshire, SK17 8RW. Phone : 01298
                    872268{" "}
                  </h5>
                  <p>Monday to Sunday - 09:30am to 12:00pm</p>
                </div>
                {/* Invoice Item */}
                <div className="invoice-item">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="invoice-info">
                        <h6 className="customer-text">Dr Edalin Hendry</h6>
                        <p>BDS, MDS - Oral &amp; Maxillofacial Surgery</p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="invoice-info2">
                        <p>
                          <span>Date : </span>25 Jan 2024, 07:00
                        </p>
                        <p>
                          <span>Appointment Type :</span>Video
                        </p>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="patient-id">
                        <h6>Patient Details</h6>
                        <div className="patient-det">
                          <h6>Kelly Joseph</h6>
                          <ul>
                            <li>28Y / Male</li>
                            <li>Blood : O+ve</li>
                            <li>
                              Patient / Consult ID : OP1245654 / C243546566{" "}
                            </li>
                            <li>Type : Outpatient</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Invoice Item */}
                <div className="appointment-notes">
                  <h3>Appointment Note</h3>
                </div>
                <div className="appoint-wrap">
                  <h5>Vitals</h5>
                  <ul>
                    <li>
                      <span>Pulse : </span> 64 Bpm
                    </li>
                    <li>
                      <span>Systolic BP : </span>100mmHg
                    </li>
                    <li>
                      <span>Diastolic : </span>60mmHg
                    </li>
                    <li>
                      <span>Spo2 : </span>100%
                    </li>
                    <li>
                      <span>BSA : </span>1.68
                    </li>
                    <li>
                      <span>Height :</span>159 cm
                    </li>
                    <li>
                      <span>Weight : </span>64 Kg
                    </li>
                    <li>
                      <span>Patient Direct from : </span>Walk in / OPD
                    </li>
                    <li>
                      <span>Body Mass Index : </span>25.16 BMI
                    </li>
                    <li>
                      <span>Allergies : </span>Pain near left chest, Pelvic
                      salinity
                    </li>
                  </ul>
                </div>
                <div className="appoint-wrap">
                  <h5>Previous Medical History</h5>
                  <p>
                    The patient has a history of type 2 diabetes mellitus
                    diagnosed in 2018, well-controlled on metformin.
                    Additionally, the patient underwent appendectomy in 2020
                    without postoperative complications.
                  </p>
                </div>
                <div className="appoint-wrap">
                  <h5>Clinical Notes</h5>
                  <p>
                    The patient presents with a 3-day history of worsening cough
                    and fever, peaking at 38.5°C, noted for decreased appetite.
                    Physical examination reveals bilateral wheezing and crackles
                    on lung auscultation, suggestive of a respiratory infection.
                  </p>
                </div>
                <div className="appoint-wrap">
                  <h5>Complaint</h5>
                  <p>
                    An account of the present illness, which includes the
                    circumstances surrounding the onset of recent health changes
                    and the chronology of subsequent events that have led the
                    patient to seek medi
                  </p>
                </div>
                <div className="appoint-wrap">
                  <h5>Medications</h5>
                  <p>
                    The patient has a history of type 2 diabetes mellitus
                    diagnosed in 2018, well-controlled on metformin.
                    Additionally, the patient underwent appendectomy in 2020
                    without postoperative complications.
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
                              <th>SNO</th>
                              <th>Medecine Name</th>
                              <th>Dosage</th>
                              <th>Frequency</th>
                              <th>Duration</th>
                              <th>Timings</th>
                              <th>Instruction</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>Ecosprin 75MG [Asprin 75 MG Oral Tab]</td>
                              <td>
                                75 mg <span>Oral Tab</span>
                              </td>
                              <td>1-0-0-1</td>
                              <td>1 month</td>
                              <td>Before Meal</td>
                              <td>Take in alternate das, with hot water</td>
                            </tr>
                            <tr>
                              <td>2</td>
                              <td>Alexer 90MG Tab</td>
                              <td>
                                90 mg <span>Oral Tab</span>
                              </td>
                              <td>1-0-0-1</td>
                              <td>1 month</td>
                              <td>Before Meal</td>
                              <td>Take in alternate das, with hot water</td>
                            </tr>
                            <tr>
                              <td>3</td>
                              <td>Ramistar XL2.5</td>
                              <td>
                                60 mg <span>Oral Tab</span>
                              </td>
                              <td>1-0-0-0</td>
                              <td>1 month</td>
                              <td>After Meal</td>
                              <td>Take in alternate das, with hot water</td>
                            </tr>
                            <tr>
                              <td>4</td>
                              <td>Metscore</td>
                              <td>
                                90 mg <span>Oral Tab</span>
                              </td>
                              <td>1-0-0-1</td>
                              <td>1 month</td>
                              <td>After Meal</td>
                              <td>Take in alternate das, with hot water</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Invoice Item */}
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
      {/* /View Prescription */}
      {/*View Prescription */}
      <div className="modal fade custom-modals" id="view_prescription2">
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
                    <a href="javascript:void(0);" className="print-link">
                      <i className="fa-solid fa-print" />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="btn btn-primary prime-btn">
                      Download
                    </a>
                  </li>
                </ul>
              </div>
              <div className="view-prescribe-details">
                <div className="hospital-addr">
                  <div className="invoice-logo">
                    <img src="assets/img/logo.png" alt="logo" />
                  </div>
                  <h5>
                    16, Wardlow, Buxton, Derbyshire, SK17 8RW. Phone : 01298
                    872268{" "}
                  </h5>
                  <p>Monday to Sunday - 09:30am to 12:00pm</p>
                </div>
                {/* Invoice Item */}
                <div className="invoice-item">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="invoice-info">
                        <h6 className="customer-text">Dr Edalin Hendry</h6>
                        <p>BDS, MDS - Oral &amp; Maxillofacial Surgery</p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="invoice-info2">
                        <p>
                          <span>Date : </span>25 Jan 2024, 07:00
                        </p>
                        <p>
                          <span>Appointment Type :</span>Video
                        </p>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="patient-id">
                        <h6>Patient Details</h6>
                        <div className="patient-det">
                          <h6>Kelly Joseph</h6>
                          <ul>
                            <li>28Y / Male</li>
                            <li>Blood : O+ve</li>
                            <li>
                              Patient / Consult ID : OP1245654 / C243546566{" "}
                            </li>
                            <li>Type : Outpatient</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Invoice Item */}
                <div className="appointment-notes">
                  <h3>Appointment Note</h3>
                </div>
                <div className="appoint-wrap">
                  <h5>Advice</h5>
                  <p>
                    An account of the present illness, which includes the
                    circumstances surrounding the onset of recent health changes
                    and the chronology of subsequent events that have led the
                    patient to seek medicine
                  </p>
                </div>
                <div className="appoint-wrap">
                  <h5>Lab Tests</h5>
                  <p className="mb-0">1. Liver Function Tests (LFTs)</p>
                  <p>2. Hemoglobin A1c (HbA1c)</p>
                </div>
                <div className="appoint-wrap">
                  <h5>Follow Up</h5>
                  <p className="mb-0">After 3 Months in empty Stomach</p>
                  <p>Lab test for Glucose Level</p>
                </div>
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
                    Page{" "}
                    <a
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#view_prescription"
                      data-bs-dismiss="modal"
                    >
                      02
                    </a>{" "}
                    of 02
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /View Prescription */}
      {/* Appointment Cancel Reason Modal */}
      <div
        className="modal fade custom-modal custom-modal-two"
        id="reject_reason"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Reject Reason</h5>
              <button type="button" data-bs-dismiss="modal" aria-label="Close">
                <span>
                  <i className="fa-solid fa-x" />
                </span>
              </button>
            </div>
            <div className="modal-body">
              <div className="reason-of-rejection">
                <p>
                  I have an urgent surgery, while our Appointment so i am
                  rejecting appointment, you can book an reschedule by next
                  week.
                </p>
                <span className="text-danger">
                  Cancelled By You on 23 March 2023
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookingcancel;
