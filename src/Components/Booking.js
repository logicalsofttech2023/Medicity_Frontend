import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import Swal from "sweetalert2";

const Booking = () => {
  const Navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedSlot, setSelectedSlot] = useState("07:00 AM - 08:00 AM");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const slots = [
    "06:00 AM - 07:00 AM",
    "07:00 AM - 08:00 AM",
    "08:00 AM - 09:00 AM",
    "09:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 01:00 PM",
    "01:00 PM - 02:00 PM",
    "02:00 PM - 03:00 PM",
    "03:00 PM - 04:00 PM",
    "04:00 PM - 05:00 PM",
    "05:00 PM - 06:00 PM",
    "06:00 PM - 07:00 PM",
    "07:00 PM - 08:00 PM",
  ];

  const [servicedata, setservicedata] = useState("");

  const [serviceName, setserviceName] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [duration, setduration] = useState("");

  const [customerName, setcustomerName] = useState("");
  const [customerPhone, setcustomerPhone] = useState("");
  const [customerEmail, setcustomerEmail] = useState("");
  const [customerAddress, setcustomerAddress] = useState("");
  const [clinicName_hpName_drName, setclinicName_hpName_drName] = useState("");
  const [testName, settestName] = useState("");
  const [image, setimage] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    Getservicedata();
  }, [0]);
  const Getservicedata = async () => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}allServices_list`)
      .then((res) => {
        setservicedata(res?.data?.data[0]);
        setserviceName(res?.data?.data[0]?.name);
        setdescription(res?.data?.data[0]?.description);
        setprice(res?.data?.data[0]?.price);
        setduration(res?.data?.data[0]?.duration);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const BookAppoinment = () => {
  const formData = new FormData();
  formData.append("userId", secureLocalStorage.getItem("medicityuser"));
  formData.append("appointmentDate", selectedDate);
  formData.append("appointmentTime", selectedSlot);
  formData.append("serviceName", serviceName);
  formData.append("description", description);
  formData.append("price", price);
  formData.append("duration", duration);
  formData.append("customerName", customerName);
  formData.append("customerPhone", customerPhone);
  formData.append("customerEmail", customerEmail);
  formData.append("customerAddress", customerAddress);
  formData.append("clinicName_hpName_drName", clinicName_hpName_drName);
  formData.append("testName", testName);
  formData.append("image", image);
  
  setIsSubmitting(true);

  axios
    .post(`${process.env.REACT_APP_API_KEY}addAppointment`, formData)
    .then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Booking Successful!',
        html: `
          <div>
            <p>${res.data.message}</p>
            <p class="mt-3"><strong>Need Help?</strong></p>
            <p><i class="fas fa-phone me-2"></i> Call us: <a href="tel:7099060888">7099060888</a></p>
          </div>
        `,
        confirmButtonText: 'Go to Dashboard',
        showCancelButton: true,
        cancelButtonText: 'View Details',
        width: '90%',
        maxWidth: '500px',
        backdrop: true
      }).then((result) => {
        if (result.isConfirmed) {
          Navigate("/Dashboard");
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Navigate(`/Dashboard`);
        }
      });
    })
    .catch((error) => {
      Swal.fire({
        icon: 'error',
        title: 'Booking Failed',
        html: `
          <div>
            <p>${error.response?.data?.message || "Something went wrong"}</p>
            <p class="mt-3"><strong>Need Help?</strong></p>
            <p><i class="fas fa-phone me-2"></i> Call us: <a href="tel:7099060888">7099060888</a></p>
          </div>
        `,
        confirmButtonText: 'Try Again',
        cancelButtonText: 'Cancel',
        width: '90%',
        maxWidth: '500px',
        backdrop: true
      });
    })
    .finally(() => {
      setIsSubmitting(false);
    });
};

  let userId = secureLocalStorage.getItem("medicityuser");

  const handleNext = () => {
    if (!userId) {
      Swal.fire({
        icon: "error",
        title: "Login Required",
        text: "Please login to book appoinment",
        confirmButtonText: "Go to Login",
        showCancelButton: true,
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          Navigate("/login");
        }
      });
      return;
    }
    let newErrors = {};

    if (activeStep === 1) {
      if (!selectedDate) newErrors.selectedDate = "Date is required";
      if (!selectedSlot) newErrors.selectedSlot = "Time slot is required";
    }

    if (activeStep === 2) {
      // Name validation
      if (!customerName?.trim()) {
        newErrors.customerName = "Full name is required";
      } else if (customerName.trim().length < 3) {
        newErrors.customerName = "Name must be at least 3 characters";
      } else if (!/^[a-zA-Z\s]*$/.test(customerName)) {
        newErrors.customerName = "Name can only contain letters and spaces";
      }

      // Phone validation
      if (!customerPhone?.trim()) {
        newErrors.customerPhone = "Phone number is required";
      } else if (!/^[0-9]{10}$/.test(customerPhone)) {
        newErrors.customerPhone = "Enter a valid 10-digit phone number";
      }

      // Email validation
      if (!customerEmail?.trim()) {
        newErrors.customerEmail = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
        newErrors.customerEmail = "Enter a valid email address";
      }

      // Clinic/Hospital/Doctor name validation
      if (!clinicName_hpName_drName?.trim()) {
        newErrors.clinicName_hpName_drName =
          "Clinic/Hospital/Doctor name is required";
      } else if (clinicName_hpName_drName.trim().length < 3) {
        newErrors.clinicName_hpName_drName = "Must be at least 3 characters";
      }

      // Test name validation
      if (!testName?.trim()) {
        newErrors.testName = "Test name is required";
      } else if (testName.trim().length < 2) {
        newErrors.testName = "Test name too short";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setActiveStep((prev) => prev + 1);
  };

  useEffect(() => {
    console.log("activeStep", activeStep);
  }, []);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  return (
    <div>
      <Toaster />
      <div className="doctor-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <div className="booking-wizard">
                <ul
                  className="form-wizard-steps d-sm-flex align-items-center justify-content-center"
                  id="progressbar2"
                >
                  {[
                    "Service",
                    "Date & Time",
                    "Basic Information",
                    "Summary",
                  ].map((label, index) => (
                    <li
                      key={index}
                      className={index === activeStep ? "progress-active" : ""}
                    >
                      <div className="profile-step">
                        <span className="multi-steps">{index + 1}</span>
                        <div className="step-section">
                          <h6>{label}</h6>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="booking-widget multistep-form mb-5">
                {activeStep === 0 && (
                  <fieldset id="first">
                    <div className="card booking-card mb-0">
                      <div className="card-body booking-body">
                        <div className="card mb-0">
                          <div className="card-body pb-1">
                            <h6 className="mb-3">Services</h6>
                            <div className="row">
                              <div className="col-lg-12 col-md-12">
                                <div className="service-item active">
                                  <label
                                    className="form-check-label ms-2"
                                    htmlFor="service1"
                                  >
                                    <span className="service-title d-block mb-1">
                                      {servicedata?.name}
                                    </span>
                                    <p>{servicedata?.description}</p>
                                    <span className="fs-14 d-block">
                                      Duration:{" "}
                                      <strong>{servicedata?.duration}</strong>
                                      &nbsp;&nbsp;&nbsp;&nbsp; Price:{" "}
                                      <strong class="badge bg-orange fs-12">
                                        ₹{servicedata?.price}
                                      </strong>
                                    </span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card-footer">
                        <div className="d-flex align-items-center flex-wrap rpw-gap-2 justify-content-between">
                          <a
                            onClick={(e) => {
                              e.preventDefault(); // Prevent the default anchor click behavior
                              handleBack(); // Move to the previous step
                            }}
                            className="btn btn-md btn-dark inline-flex align-items-center rounded-pill"
                          >
                            <i className="isax isax-arrow-left-2 me-1" />
                            Back
                          </a>
                          <a
                            //
                            onClick={(e) => {
                              e.preventDefault(); // Prevent the default anchor click behavior
                              handleNext(); // Move to the next step
                            }}
                            className="btn btn-md btn-primary-gradient next_btns inline-flex align-items-center rounded-pill"
                          >
                            Select Date & Time
                            <i className="isax isax-arrow-right-3 ms-1" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                )}
                {activeStep === 1 && (
                  <fieldset id="first">
                    <div className="card booking-card mb-0">
                      <div className="card-body booking-body">
                        <div className="card mb-0">
                          <div className="card-body pb-1">
                            <div className="row">
                              <div className="col-lg-12">
                                <div className="card">
                                  <div className="card-body p-2 pt-3">
                                    <h6 class="mb-2">Date & Time</h6>
                                    <input
                                      type="date"
                                      className="form-control mb-2"
                                      value={selectedDate}
                                      onChange={(e) => {
                                        setSelectedDate(e.target.value);
                                      }}
                                      min={
                                        new Date().toISOString().split("T")[0]
                                      }
                                    />
                                    {errors.selectedDate && (
                                      <span className="text-danger">
                                        {errors.selectedDate}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="card booking-wizard-slots">
                                  <div className="card-body">
                                    <h6 className="mb-2">Time Slot</h6>
                                    {slots.slice(0, 7).map((slot) => (
                                      <label
                                        key={slot}
                                        className={`mb-1 slot-option ${
                                          slot === selectedSlot
                                            ? "slot-active"
                                            : ""
                                        }`}
                                      >
                                        <input
                                          type="radio"
                                          name="slot"
                                          value={slot}
                                          checked={slot === selectedSlot}
                                          onChange={() => setSelectedSlot(slot)}
                                        />
                                        <div className="slot-time">
                                          <p>{slot}</p>
                                          <p className="slot-free">Free</p>
                                        </div>
                                      </label>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="card booking-wizard-slots">
                                  <div className="card-body">
                                    {slots.slice(7, 20).map((slot) => (
                                      <label
                                        key={slot}
                                        className={`mb-1 slot-option ${
                                          slot === selectedSlot
                                            ? "slot-active"
                                            : ""
                                        }`}
                                      >
                                        <input
                                          type="radio"
                                          name="slot"
                                          value={slot}
                                          checked={slot === selectedSlot}
                                          onChange={() => setSelectedSlot(slot)}
                                        />
                                        <div className="slot-time">
                                          <p>{slot}</p>
                                          <p className="slot-free">Free</p>
                                        </div>
                                      </label>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card-footer">
                        <div className="d-flex align-items-center flex-wrap rpw-gap-2 justify-content-between">
                          <a
                            //
                            onClick={(e) => {
                              e.preventDefault(); // Prevent the default anchor click behavior
                              handleBack(); // Move to the previous step
                            }}
                            className="btn btn-md btn-dark prev_btns inline-flex align-items-center rounded-pill"
                          >
                            <i className="isax isax-arrow-left-2 me-1" />
                            Back
                          </a>
                          <a
                            //
                            onClick={(e) => {
                              e.preventDefault(); // Prevent the default anchor click behavior
                              handleNext(); // Move to the previous step
                            }}
                            className="btn btn-md btn-primary-gradient next_btns inline-flex align-items-center rounded-pill"
                          >
                            Add Basic Information
                            <i className="isax isax-arrow-right-3 ms-1" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                )}
                {activeStep === 2 && (
                  <fieldset id="first">
                    <div className="card booking-card mb-0">
                      <div className="card-body booking-body">
                        <div className="card mb-0">
                          <div className="card-body pb-1">
                            <div className="row">
                              <h6 className="mb-2">Basic Details</h6>

                              {/* Fullname */}
                              <div className="col-lg-6 col-md-6">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Fullname as per Aadhaar Card
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Fullname as per Aadhaar Card"
                                    value={customerName}
                                    onChange={(e) =>
                                      setcustomerName(e.target.value)
                                    }
                                    required
                                  />
                                  {errors.customerName && (
                                    <span className="text-danger">
                                      {errors.customerName}
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* Phone */}
                              <div className="col-lg-6 col-md-6">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Phone Number
                                  </label>
                                  <input
                                    type="tel"
                                    className="form-control"
                                    placeholder="Phone Number"
                                    value={customerPhone}
                                    onChange={(e) =>
                                      setcustomerPhone(e.target.value)
                                    }
                                    pattern="[0-9]{10}"
                                    maxLength={10}
                                    required
                                  />
                                  {errors.customerPhone && (
                                    <span className="text-danger">
                                      {errors.customerPhone}
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* Email */}
                              <div className="col-lg-6 col-md-6">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Email Address
                                  </label>
                                  <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Email Address"
                                    value={customerEmail}
                                    onChange={(e) =>
                                      setcustomerEmail(e.target.value)
                                    }
                                    required
                                  />
                                  {errors.customerEmail && (
                                    <span className="text-danger">
                                      {errors.customerEmail}
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* Address */}
                              <div className="col-lg-6 col-md-6">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Address (If Required)
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Address (If Required)"
                                    value={customerAddress}
                                    onChange={(e) =>
                                      setcustomerAddress(e.target.value)
                                    }
                                  />
                                  {errors.customerAddress && (
                                    <span className="text-danger">
                                      {errors.customerAddress}
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* Clinic / Hospital / Doctor Name */}
                              <div className="col-lg-6 col-md-6">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Clinic / Hospital / Doctor Name
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Name of Clinic | Hospital | Doctors"
                                    value={clinicName_hpName_drName}
                                    onChange={(e) =>
                                      setclinicName_hpName_drName(
                                        e.target.value
                                      )
                                    }
                                    required
                                  />
                                  {errors.clinicName_hpName_drName && (
                                    <span className="text-danger">
                                      {errors.clinicName_hpName_drName}
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* File Upload */}
                              <div className="col-lg-6">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Attachment
                                  </label>
                                  <input
                                    type="file"
                                    className="form-control"
                                    accept="image/*,.pdf"
                                    onChange={(e) =>
                                      setimage(e.target.files[0])
                                    }
                                  />
                                </div>
                              </div>

                              {/* Test Name */}
                              <div className="col-lg-12">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Test Name
                                  </label>
                                  <textarea
                                    className="form-control"
                                    placeholder="Test Name"
                                    value={testName}
                                    onChange={(e) =>
                                      settestName(e.target.value)
                                    }
                                    rows={3}
                                    required
                                  />
                                  {errors.testName && (
                                    <span className="text-danger">
                                      {errors.testName}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="card-footer">
                        <div className="d-flex align-items-center flex-wrap rpw-gap-2 justify-content-between">
                          <a
                            onClick={(e) => {
                              e.preventDefault();
                              handleBack();
                            }}
                            className="btn btn-md btn-dark prev_btns inline-flex align-items-center rounded-pill"
                          >
                            <i className="isax isax-arrow-left-2 me-1" />
                            Back
                          </a>
                          <a
                            onClick={(e) => {
                              e.preventDefault();
                              handleNext();
                            }}
                            className="btn btn-md btn-primary-gradient next_btns inline-flex align-items-center rounded-pill"
                          >
                            Next Summary
                            <i className="isax isax-arrow-right-3 ms-1" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                )}

                {activeStep === 3 && (
  <fieldset id="first">
    <div className="card booking-card mb-0">
      <div className="card-body booking-body">
        <div className="row">
          <div className="col-lg-12 d-flex">
            <div className="card flex-fill mb-0">
              <div className="card-body">
                <h6 className="mb-3">Booking Info</h6>
                <div style={{ textAlign: "center" }}>
                  <img
                    style={{ borderRadius: "50%", width: "100px", height: "100px", objectFit: "cover" }}
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMcCzXefrN53jgzGJxRx7N92PFVcsw_MnUon8LVfhbwyvAhisXP4gSp2zaw1XngqGUiBg&usqp=CAU"
                    alt="Booking Summary"
                  />
                  <h6 className="mt-2">Summary</h6>
                  <p className="text-muted">Your appointment booking summary</p>
                </div>
                <div className="mb-3">
                  <label className="form-label">Customer</label>
                  <div className="form-plain-text">
                    {customerName}
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    Date & Time
                  </label>
                  <div className="form-plain-text">
                    {selectedSlot}, {selectedDate}
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Service</label>
                  <div className="form-plain-text">
                    {serviceName}
                  </div>
                </div>

                <div className="pt-3 border-top booking-more-info">
                  <h6 className="mb-3">Payment Info</h6>
                </div>
                <div className="bg-primary d-flex align-items-center flex-wrap rpw-gap-2 justify-content-between p-3 rounded">
                  <h6 className="text-white">
                    Total Amount Payable
                  </h6>
                  <h6 className="text-white">₹{price}</h6>
                </div>
                
                {/* Added support contact information */}
                <div className="mt-4 p-3 bg-light rounded text-center">
  <h6 className="mb-2">Call to Book</h6>
  <a 
    href="tel:7099060888" 
    className="btn btn-outline-primary btn-sm"
    style={{ whiteSpace: 'nowrap' }}
  >
    <i className="fas fa-phone-alt me-2"></i>
    7099060888
  </a>
</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card-footer">
        <div className="d-flex align-items-center flex-wrap rpw-gap-2 justify-content-between">
          <button
            onClick={handleBack}
            className="btn btn-md btn-dark prev_btns inline-flex align-items-center rounded-pill"
            disabled={isSubmitting}
          >
            <i className="isax isax-arrow-left-2 me-1" />
            Back
          </button>
          <button
            onClick={BookAppoinment}
            className="btn btn-md btn-primary-gradient next_btns inline-flex align-items-center rounded-pill"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Processing...
              </>
            ) : (
              <>
                Book Appointment
                <i className="isax isax-arrow-right-3 ms-1" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  </fieldset>
)}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Terms */}
      {/* Cursor */}
      <div className="mouse-cursor cursor-outer" />
      <div className="mouse-cursor cursor-inner" />
    </div>
  );
};

export default Booking;
