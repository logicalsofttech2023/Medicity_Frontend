import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

const Booking = () => {
  const Navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState();
  const [selectedSlot, setSelectedSlot] = useState("07:00 AM - 08:00 AM");

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
    axios
      .post(`${process.env.REACT_APP_API_KEY}addAppointment`, formData)
      .then((res) => {
        toast.success(res.data.message);
        setTimeout(() => {
          Navigate("/Dashboard");
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleNext = () => {
    let newErrors = {};

    if (activeStep === 1) {
      if (!selectedDate) newErrors.selectedDate = "Date is required";
      if (!selectedSlot) newErrors.selectedSlot = "Time slot is required";
    }

    if (activeStep === 2) {
      if (!customerName) newErrors.customerName = "Full name is required";
      if (!customerPhone) newErrors.customerPhone = "Phone number is required";
      if (!customerEmail) newErrors.customerEmail = "Email is required";
      if (!clinicName_hpName_drName)
        newErrors.clinicName_hpName_drName =
          "Clinic/Hospital/Doctor name is required";
      if (!testName) newErrors.testName = "Test name is required";
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
                            // href="javascript:void(0);"
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
                            // href="javascript:void(0);"
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
                            // href="javascript:void(0);"
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
                              <div className="col-lg-6 col-md-6">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Fullname as per Adhaar Card
                                  </label>
                                  <input
                                    value={customerName}
                                    onChange={(e) =>
                                      setcustomerName(e.target.value)
                                    }
                                    type="text"
                                    placeholder="Fullname as per Adhaar Card"
                                    className="form-control"
                                  />

                                  {errors.customerName && (
                                    <span className="text-danger">
                                      {errors.customerName}
                                    </span>
                                  )}
                                </div>
                              </div>

                              <div className="col-lg-6 col-md-6">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Phone Number
                                  </label>
                                  <input
                                    value={customerPhone}
                                    onChange={(e) =>
                                      setcustomerPhone(e.target.value)
                                    }
                                    type="text"
                                    placeholder="Phone Number"
                                    className="form-control"
                                  />

                                  {errors.customerPhone && (
                                    <span className="text-danger">
                                      {errors.customerPhone}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Email Address
                                  </label>
                                  <input
                                    value={customerEmail}
                                    onChange={(e) =>
                                      setcustomerEmail(e.target.value)
                                    }
                                    type="email"
                                    placeholder="Email Address"
                                    className="form-control"
                                  />
                                  {errors.customerEmail && (
                                    <span className="text-danger">
                                      {errors.customerEmail}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Address (If Required)
                                  </label>
                                  <input
                                    value={customerAddress}
                                    onChange={(e) =>
                                      setcustomerAddress(e.target.value)
                                    }
                                    type="text"
                                    placeholder="Address (If Required)"
                                    className="form-control"
                                  />
                                  {errors.customerAddress && (
                                    <span className="text-danger">
                                      {errors.customerAddress}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Name of Clinic | Hospital | Doctors
                                  </label>
                                  <input
                                    value={clinicName_hpName_drName}
                                    onChange={(e) =>
                                      setclinicName_hpName_drName(
                                        e.target.value
                                      )
                                    }
                                    type="text"
                                    placeholder="Name of Clinic | Hospital | Doctors"
                                    className="form-control"
                                  />
                                  {errors.clinicName_hpName_drName && (
                                    <span className="text-danger">
                                      {errors.clinicName_hpName_drName}
                                    </span>
                                  )}
                                </div>
                              </div>

                              <div className="col-lg-6">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Attachment
                                  </label>
                                  <input
                                    accept="image/*"
                                    onChange={(e) =>
                                      setimage(e.target.files[0])
                                    }
                                    type="file"
                                    className="form-control"
                                  />
                                  
                                </div>
                              </div>
                              <div className="col-lg-12">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Test Name
                                  </label>
                                  <textarea
                                    value={testName}
                                    onChange={(e) =>
                                      settestName(e.target.value)
                                    }
                                    className="form-control"
                                    rows={3}
                                    placeholder="Test Name "
                                    defaultValue={""}
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
                      <div className="card-footer">
                        <div className="d-flex align-items-center flex-wrap rpw-gap-2 justify-content-between">
                          <a
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
                            onClick={(e) => {
                              e.preventDefault(); // Prevent the default anchor click behavior
                              handleNext(); // Move to the next step
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
                                    style={{ borderRadius: "50%" }}
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMcCzXefrN53jgzGJxRx7N92PFVcsw_MnUon8LVfhbwyvAhisXP4gSp2zaw1XngqGUiBg&usqp=CAU"
                                  />
                                  <h6>Summary</h6>
                                  <p>Your appointment booking summary</p>
                                </div>
                                <div className="mb-3">
                                  <label className="form-label">Customer</label>
                                  <div className="form-plain-text">
                                    {customerName}
                                  </div>
                                </div>
                                <div className="mb-3">
                                  <label className="form-label">
                                    Date &amp; Time
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
                            className="btn btn-md btn-dark prev_btns inline-flex align-items-center rounded-pill"
                          >
                            <i className="isax isax-arrow-left-2 me-1" />
                            Back
                          </a>
                          <a
                            onClick={BookAppoinment}
                            className="btn btn-md btn-primary-gradient next_btns inline-flex align-items-center rounded-pill"
                          >
                            Book Appoinment
                            <i className="isax isax-arrow-right-3 ms-1" />
                          </a>
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
