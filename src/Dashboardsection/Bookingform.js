import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import "./booking.css";
import { DNA } from "react-loader-spinner";
import Swal from "sweetalert2";

const Bookingform = () => {
  const Navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  // Member form data
  const [memberForm, setMemberForm] = useState({
    gender: "Male",
    fullName: "",
    relationName: "",
    age: "",
    phone: "",
    email: "",
    dob: "",
  });

  // Address form data
  const [addressForm, setAddressForm] = useState({
    pincode: "",
    address: "",
    placeType: "",
    landMark: "",
    houseNo: "",
  });

  // Booking details
  const [bookingDetails, setBookingDetails] = useState({
    selectedDate: new Date().toISOString().split("T")[0],
    selectedSlot: "07:00 AM - 08:00 AM",
    selectedAddressId: null,
    selectedDependants: [],
    paymentMode: "online",
    report: "No",
    paymentStatus: null,
  });

  // Data from API
  const [MemberData, setMemberData] = useState([]);
  const [AddressData, setAddressData] = useState([]);
  const [Loading, setLoading] = useState(true);

  // Other state
  const [bookingid, setbookingid] = useState("");
  const [addressId, setaddressId] = useState("");
  const cartIds = localStorage.getItem("packageIds");
  const paymentInfo = JSON.parse(localStorage.getItem("paymentInfo"));
  console.log(paymentInfo);

  // Time slots
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

  // Handlers for member form
  const handleMemberChange = (e) => {
    const { name, value } = e.target;
    setMemberForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handlers for address form
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handlers for booking details
  const handleBookingChange = (name, value) => {
    setBookingDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Navigation between steps
  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const goToStep = (step) => {
    if (validateStep(currentStep)) {
      setCurrentStep(step);
    }
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        if (bookingDetails.selectedDependants.length === 0) {
          toast.error("Please select at least one dependant");
          return false;
        }
        return true;
      case 2:
        if (!bookingDetails.selectedAddressId) {
          toast.error("Please select an address");
          return false;
        }
        return true;
      case 3:
        if (!bookingDetails.paymentMode) {
          toast.error("Please select a payment method");
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  // API functions
  const AddMember = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = {
        userId: secureLocalStorage.getItem("medicityuser"),
        ...memberForm,
      };
      await axios.post(`${process.env.REACT_APP_API_KEY}member`, formData);
      await GetMember();
      toast.success("Member Added Successfully");
      document
        .getElementById("add_dependent")
        .querySelector(".btn-close")
        .click();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const GetMember = async () => {
    setLoading(true);
    try {
      const data = {
        userId: secureLocalStorage.getItem("medicityuser"),
      };
      const res = await axios.post(
        `${process.env.REACT_APP_API_KEY}getMembersByUser`,
        data
      );
      setMemberData(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const UpdatedMember = () => {
    setLoading(true);
    const data = {
      memberId: addressId,
      ...memberForm,
    };
    axios
      .post(`${process.env.REACT_APP_API_KEY}updateMember`, data)
      .then((res) => {
        GetMember();
        toast.success("Data Updated Successfully");
        document
          .getElementById("edit_dependent")
          .querySelector(".btn-close")
          .click();
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const Deletedmember = async () => {
    setLoading(true);
    const data = {
      memberId: addressId,
    };
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_KEY}deleteMember`,
        data
      );
      toast.success(res.data.message);
      GetMember();
      document
        .getElementById("delete_modal")
        .querySelector(".btn-close")
        .click();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const AddAddress = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = {
        userId: secureLocalStorage.getItem("medicityuser"),
        ...addressForm,
      };
      await axios.post(`${process.env.REACT_APP_API_KEY}address`, formData);
      await GetAddress();
      toast.success("Address Added Successfully");
      document
        .getElementById("add_dependentt")
        .querySelector(".btn-close")
        .click();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetMember();
    GetAddress();
  }, []);

  const GetAddress = async () => {
    setLoading(true);
    try {
      const data = {
        userId: secureLocalStorage.getItem("medicityuser"),
      };
      const res = await axios.post(
        `${process.env.REACT_APP_API_KEY}getAddressesByUser`,
        data
      );
      setAddressData(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const UpdatedAddress = () => {
    setLoading(true);
    const data = {
      addressId,
      ...addressForm,
    };
    axios
      .post(`${process.env.REACT_APP_API_KEY}updateAddress`, data)
      .then((res) => {
        GetAddress();
        toast.success("Data Updated Successfully");
        document
          .getElementById("edit_dependentt")
          .querySelector(".btn-close")
          .click();
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const DeletedAddress = async () => {
    setLoading(true);
    const data = {
      addressId,
    };
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_KEY}deleteAddress`,
        data
      );
      toast.success(res.data.message);
      GetAddress();
      document
        .getElementById("delete_modall")
        .querySelector(".btn-close")
        .click();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (id) => {
    const updated = bookingDetails.selectedDependants.includes(id)
      ? bookingDetails.selectedDependants.filter((item) => item !== id)
      : [...bookingDetails.selectedDependants, id];

    handleBookingChange("selectedDependants", updated);
  };

  const handleCheckboxChanges = (e) => {
    handleBookingChange("report", e.target.checked ? "Yes" : "No");
  };

  const get18YearsAgoDate = () => {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 18);
    return today.toISOString().split("T")[0];
  };

  // const BookAppoinment = async () => {
  //   setLoading(true);
  //   Swal.fire({
  //     title: "Processing Payment",
  //     html: "Please wait while we process your payment...",
  //     allowOutsideClick: false,
  //     didOpen: () => {
  //       Swal.showLoading();
  //     },
  //   });

  //   const userId = secureLocalStorage.getItem("medicityuser");
  //   const amountToPay = paymentInfo.finalTotal;

  //   try {
  //     // Step 1: Create Razorpay Order
  //     const orderResponse = await axios.post(
  //       `${process.env.REACT_APP_API_KEY}createRazorpayOrder`,
  //       {
  //         amount: amountToPay,
  //       }
  //     );

  //     const { id: orderId } = orderResponse.data;

  //     // Step 2: Open Razorpay Checkout
  //     const options = {
  //       key: process.env.REACT_APP_RAZORPAY_KEY,
  //       amount: amountToPay * 100,
  //       currency: "INR",
  //       name: "Medicity Booking",
  //       description: "Package Payment",
  //       order_id: orderId,
  //       handler: async function (response) {
  //         try {
  //           Swal.fire({
  //             title: "Processing Booking",
  //             html: "Your payment was successful! Completing your booking...",
  //             allowOutsideClick: false,
  //             didOpen: () => {
  //               Swal.showLoading();
  //             },
  //           });

  //           // Step 3: After Payment Success, Call bookedOrder API
  //           const bookingData = {
  //             userId,
  //             packageIds: cartIds || [],
  //             members: bookingDetails.selectedDependants.join(","),
  //             address: bookingDetails.selectedAddressId.toString(),
  //             discountAmount: paymentInfo.discount,
  //             totalAmount: paymentInfo.totalAmount,
  //             payableAmount: paymentInfo.finalTotal,
  //             offerAmount: "10",
  //             giftAmount: "20",
  //             paymentStatus: true,
  //             paymentMode: "Online",
  //             paymentId: response.razorpay_payment_id,
  //             report: bookingDetails.report,
  //             sampleCollectDate: bookingDetails.selectedDate,
  //             sampleCollectTime: bookingDetails.selectedSlot,
  //             testDetail: JSON.parse(localStorage.getItem("testDetails")),
  //           };

  //           const bookRes = await axios.post(
  //             `${process.env.REACT_APP_API_KEY}bookedOrder`,
  //             bookingData
  //           );

  //           setbookingid(bookRes.data.data.bookingId);
  //           handleBookingChange("paymentStatus", "success");
  //           GetAddress();

  //           Swal.fire({
  //             icon: "success",
  //             title: "Booking Successful!",
  //             text: bookRes.data.message,
  //             showCancelButton: true,
  //             confirmButtonText: "View Booking",
  //             cancelButtonText: "Close",
  //           }).then((result) => {
  //             if (result.isConfirmed) {
  //               Navigate(`/Bookingappoinment`);
  //               localStorage.removeItem("paymentInfo");
  //               localStorage.removeItem("packageIds");
  //               localStorage.removeItem("testDetails");
  //             } else {
  //               nextStep();
  //             }
  //           });
  //         } catch (error) {
  //           handleBookingChange("paymentStatus", "failed");
  //           Swal.fire({
  //             icon: "error",
  //             title: "Booking Failed",
  //             text: "Your payment was successful but booking failed. Please contact support.",
  //             confirmButtonText: "OK",
  //           });
  //           console.error("Booking error:", error);
  //         }
  //       },
  //       prefill: {
  //         name: "Test User",
  //         email: "user@medicity",
  //         contact: "1234567890",
  //       },
  //       theme: {
  //         color: "#0e76a8",
  //       },
  //       modal: {
  //         ondismiss: function () {
  //           handleBookingChange("paymentStatus", "failed");
  //           Swal.fire({
  //             icon: "info",
  //             title: "Payment Cancelled",
  //             text: "You cancelled the payment process",
  //             confirmButtonText: "OK",
  //           });
  //         },
  //       },
  //     };

  //     const razor = new window.Razorpay(options);
  //     razor.on("payment.failed", function (response) {
  //       handleBookingChange("paymentStatus", "failed");
  //       Swal.fire({
  //         icon: "error",
  //         title: "Payment Failed",
  //         text: "Payment could not be processed. Please try again.",
  //         confirmButtonText: "OK",
  //       });
  //     });
  //     razor.open();
  //   } catch (error) {
  //     handleBookingChange("paymentStatus", "failed");
  //     Swal.fire({
  //       icon: "error",
  //       title: "Payment Error",
  //       text: "Failed to initiate payment. Please try again.",
  //       confirmButtonText: "OK",
  //     });
  //     console.error("Payment error:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const BookAppoinment = async () => {
    setLoading(true);
    Swal.fire({
      title: "Processing Booking",
      html: "Please wait while we complete your booking...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const userId = secureLocalStorage.getItem("medicityuser");

    try {
      const bookingData = {
        userId,
        packageIds: cartIds || [],

        members: bookingDetails.selectedDependants.join(","),
        address: bookingDetails.selectedAddressId.toString(),
        discountAmount: paymentInfo.totalDiscount,
        totalAmount: paymentInfo.grandTotal,
        payableAmount: paymentInfo.grandTotal,
        offerAmount: "10",
        giftAmount: "20",
        paymentStatus: true, // assume success for testing
        paymentMode: "Testing",
        paymentId: "test_payment_id_123", // mock ID
        report: bookingDetails.report,
        sampleCollectDate: bookingDetails.selectedDate,
        sampleCollectTime: bookingDetails.selectedSlot,
        testDetail: JSON.parse(localStorage.getItem("testDetails")),
      };

      const bookRes = await axios.post(
        `${process.env.REACT_APP_API_KEY}bookedOrder`,
        bookingData
      );

      setbookingid(bookRes.data.data.bookingId);
      handleBookingChange("paymentStatus", "success");
      GetAddress();

      Swal.fire({
        icon: "success",
        title: "Booking Successful!",
        text: bookRes.data.message,
        showCancelButton: true,
        confirmButtonText: "View Booking",
        cancelButtonText: "Close",
      }).then((result) => {
        if (result.isConfirmed) {
          Navigate(`/Bookingappoinment`);
          localStorage.removeItem("paymentInfo");
          localStorage.removeItem("packageIds");
          localStorage.removeItem("testDetails");
        } else {
          nextStep();
        }
      });
    } catch (error) {
      handleBookingChange("paymentStatus", "failed");
      Swal.fire({
        icon: "error",
        title: "Booking Failed",
        text: "There was an error while booking. Please try again.",
        confirmButtonText: "OK",
      });
      console.error("Booking error:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="card booking-card mb-0">
      <div className="card-body booking-body">
        <div className="content doctor-content card">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-xl-12">
                <div className="dashboard-header">
                  <h3>Dependants</h3>
                </div>

                {Loading ? (
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
                ) : MemberData?.length > 0 ? (
                  MemberData.map((data) => (
                    <div
                      className="dependent-wrap d-flex align-items-start gap-3"
                      key={data._id}
                    >
                      <input
                        type="checkbox"
                        className="form-check-input mt-1"
                        checked={bookingDetails.selectedDependants.includes(
                          data._id
                        )}
                        onChange={() => handleCheckboxChange(data._id)}
                      />
                      <div className="flex-grow-1">
                        <div className="dependent-info">
                          <div className="patinet-information">
                            <div className="patient-info">
                              <h5>Name: {data?.fullName}</h5>
                              <ul>
                                <li>Relationship: {data?.relationName}</li>
                                <li>Gender: {data?.gender}</li>
                                <li>Age: {data?.age}</li>
                              </ul>
                            </div>
                          </div>
                          <div className="blood-info">
                            <p>Dob: {data?.dob}</p>
                            <h6>Phone: {data?.phone}</h6>
                            <h6>Email: {data?.email}</h6>
                          </div>
                        </div>
                        <div className="dependent-status mt-2">
                          <a
                            onClick={() => {
                              setaddressId(data._id);
                              setMemberForm({
                                gender: data.gender,
                                fullName: data.fullName,
                                relationName: data.relationName,
                                age: data.age,
                                phone: data.phone,
                                email: data.email,
                                dob: data.dob,
                              });
                            }}
                            className="edit-icon me-2"
                            data-bs-toggle="modal"
                            data-bs-target="#edit_dependent"
                          >
                            <i className="isax isax-edit-2" />
                          </a>
                          <a
                            onClick={() => setaddressId(data._id)}
                            className="edit-icon"
                            data-bs-toggle="modal"
                            data-bs-target="#delete_modal"
                          >
                            <i className="isax isax-trash" />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4">No members found.</div>
                )}

                {bookingDetails.selectedDependants?.length === 0 && (
                  <div className="alert alert-danger text-center py-2">
                    Please select at least one dependant.
                  </div>
                )}

                <div className="dashboard-header border-0 m-0">
                  <ul className="header-list-btns">
                    <li>
                      <div className="input-block dash-search-input">
                        <span className="search-icon">&nbsp;</span>
                      </div>
                    </li>
                  </ul>
                  <a
                    href="#"
                    className="btn btn-md btn-primary-gradient rounded-pill"
                    data-bs-toggle="modal"
                    data-bs-target="#add_dependent"
                  >
                    Add Dependants
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card-footer">
        <div className="d-flex align-items-center flex-wrap rpw-gap-2 justify-content-between">
          <Link
            to="/Checkout"
            className="btn btn-md btn-dark inline-flex align-items-center rounded-pill"
          >
            <i className="isax isax-arrow-left-2 me-1" />
            Back
          </Link>
          <button
            type="button"
            className={`btn btn-md btn-primary-gradient inline-flex align-items-center rounded-pill ${
              bookingDetails.selectedDependants.length === 0 ? "disabled" : ""
            }`}
            onClick={nextStep}
            disabled={bookingDetails.selectedDependants.length === 0}
          >
            Select Address & Date-Time
            <i className="isax isax-arrow-right-3 ms-1" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="card booking-card mb-0">
      <div className="card-header">
        <div className="booking-header pb-0">
          <div className="card mb-0">
            <div className="card-body">
              {Loading ? (
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
              ) : AddressData?.length > 0 ? (
                AddressData.map((data) => (
                  <div
                    className="dependent-wrap d-flex align-items-start gap-3"
                    key={data._id}
                  >
                    <input
                      type="radio"
                      name="selectedAddress"
                      className="form-check-input mt-1"
                      checked={bookingDetails.selectedAddressId === data._id}
                      onChange={() =>
                        handleBookingChange("selectedAddressId", data._id)
                      }
                      required
                    />
                    <div className="flex-grow-1">
                      <div className="dependent-info">
                        <div className="patinet-information">
                          <div className="patient-info">
                            <h5>Address: {data?.address}</h5>
                            <ul>
                              <li>PlaceType: {data?.placeType}</li>
                              <li>LandMark: {data?.landMark}</li>
                              <li>H.No.: {data?.houseNo}</li>
                              <li>Pincode: {data?.pincode}</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="dependent-status mt-2">
                        <a
                          onClick={() => {
                            setaddressId(data._id);
                            setAddressForm({
                              address: data.address,
                              placeType: data.placeType,
                              landMark: data.landMark,
                              houseNo: data.houseNo,
                              pincode: data.pincode,
                            });
                          }}
                          className="edit-icon me-2"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_dependentt"
                        >
                          <i className="isax isax-edit-2" />
                        </a>
                        <a
                          onClick={() => setaddressId(data._id)}
                          className="edit-icon"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_modall"
                        >
                          <i className="isax isax-trash" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4">No addresses found.</div>
              )}

              {!bookingDetails.selectedAddressId && (
                <div className="alert alert-danger text-center py-2">
                  Please select at least one Address.
                </div>
              )}

              <div className="dashboard-header border-0 m-0">
                <ul className="header-list-btns">
                  <li>
                    <div className="input-block dash-search-input">
                      <span className="search-icon">&nbsp;</span>
                    </div>
                  </li>
                </ul>
                <a
                  href="#"
                  className="btn btn-md btn-primary-gradient rounded-pill"
                  data-bs-toggle="modal"
                  data-bs-target="#add_dependentt"
                >
                  Add Address
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card-body booking-body">
        <div className="card mb-0">
          <div className="card-body pb-1">
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-body p-2 pt-3">
                    <input
                      type="date"
                      className="form-control"
                      value={bookingDetails.selectedDate}
                      onChange={(e) =>
                        handleBookingChange("selectedDate", e.target.value)
                      }
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="card booking-wizard-slots">
                  <div className="card-body">
                    {slots.slice(0, 7).map((slot) => (
                      <label
                        key={slot}
                        className={`mb-1 slot-option ${
                          slot === bookingDetails.selectedSlot
                            ? "slot-active"
                            : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name="slot"
                          value={slot}
                          checked={slot === bookingDetails.selectedSlot}
                          onChange={() =>
                            handleBookingChange("selectedSlot", slot)
                          }
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
                          slot === bookingDetails.selectedSlot
                            ? "slot-active"
                            : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name="slot"
                          value={slot}
                          checked={slot === bookingDetails.selectedSlot}
                          onChange={() =>
                            handleBookingChange("selectedSlot", slot)
                          }
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
          <button
            className="btn btn-md btn-dark inline-flex align-items-center rounded-pill"
            onClick={prevStep}
          >
            <i className="isax isax-arrow-left-2 me-1" />
            Back
          </button>
          <button
            type="button"
            className={`btn btn-primary-gradient inline-flex align-items-center rounded-pill ${
              !bookingDetails.selectedAddressId ? "disabled" : ""
            }`}
            onClick={nextStep}
            disabled={!bookingDetails.selectedAddressId}
          >
            Add Payment Information
            <i className="isax isax-arrow-right-3 ms-1" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="card booking-card mb-0">
      <div className="card-body booking-body">
        <div className="row">
          <div className="col-lg-6 d-flex">
            <div className="card flex-fill mb-3 mb-lg-0">
              <div className="card-body">
                <h6 className="mb-3">Payment Gateway</h6>

                <div className="mt-3 mb-3 HardCopy_hard__copy__wrapper__aNxlf">
                  <div className="HardCopy_top__0S83E">
                    <h6>Hard Copy Reports</h6>
                    <p>
                      E-reports will be sent on your SMS, WhatsApp, &amp;
                      e-mail. Additionally, you can get a hard copy of your
                      reports by paying ₹150.
                    </p>
                  </div>
                  <div className="card-footer d-flex gap-2 HardCopy_bottom__PpmW_">
                    <input
                      type="checkbox"
                      onChange={handleCheckboxChanges}
                      className="form-check-input"
                      id="hardCopyCheckbox"
                    />
                    <label
                      htmlFor="hardCopyCheckbox"
                      className="form-check-label"
                    >
                      Add Hard Copy Reports @ ₹150
                    </label>
                  </div>

                  <div className="mt-2">
                    <strong>Report:</strong> {bookingDetails.report}
                  </div>
                </div>
                <hr />
                <div className="payment-tabs">
                  <ul
                    className="nav nav-pills mb-3 row"
                    id="pills-tab"
                    role="tablist"
                  >
                    <li className="nav-item col-sm-12 mb-3" role="presentation">
                      <button
                        className={`nav-link ${
                          bookingDetails.paymentMode === "online"
                            ? "active"
                            : ""
                        }`}
                        id="pills-home-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-home"
                        type="button"
                        role="tab"
                        onClick={() =>
                          handleBookingChange("paymentMode", "online")
                        }
                      >
                        <img
                          src="assets/img/icons/payment-icon-05.svg"
                          className="me-2"
                          alt=""
                        />
                        Pay By Online
                      </button>
                    </li>
                    <li className="nav-item col-sm-12" role="presentation">
                      <button
                        className={`nav-link ${
                          bookingDetails.paymentMode === "cash" ? "active" : ""
                        }`}
                        id="pills-profile-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-profile"
                        type="button"
                        role="tab"
                        onClick={() =>
                          handleBookingChange("paymentMode", "cash")
                        }
                      >
                        Pay by Cash/Card during sample collection
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 d-flex">
            <div className="card flex-fill mb-0">
              <div className="card-body">
                <h6 className="mb-3">Booking Info</h6>
                <div className="mb-3">
                  <label className="form-label">Date &amp; Time</label>
                  <div className="form-plain-text">
                    {bookingDetails.selectedSlot}, {bookingDetails.selectedDate}
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Appointment type</label>
                  <div className="form-plain-text">(Klar Path) </div>
                </div>
                <div className="pt-3 border-top booking-more-info">
                  <h6 className="mb-3">Payment Info</h6>
                  <div className="d-flex align-items-center flex-wrap rpw-gap-2 justify-content-between mb-2">
                    <p className="mb-0">Packages Total</p>
                    <span className="fw-medium d-block">
                      ₹{paymentInfo.packageTotal}
                    </span>
                  </div>
                  <div className="d-flex align-items-center flex-wrap rpw-gap-2 justify-content-between mb-2">
                    <p className="mb-0">Tests Total</p>
                    <span className="fw-medium d-block">
                      ₹{paymentInfo.testTotal}
                    </span>
                  </div>
                  <div className="d-flex align-items-center flex-wrap rpw-gap-2 justify-content-between mb-2">
                    <p className="mb-0">Subtotal</p>
                    <span className="fw-medium d-block">
                      ₹{paymentInfo.subtotal}
                    </span>
                  </div>
                  <div className="d-flex align-items-center flex-wrap rpw-gap-2 justify-content-between mb-2">
                    <p className="mb-0">Diagnostic Fee</p>
                    <span className="fw-medium text-danger d-block">
                      ₹{paymentInfo.diagnosticFee}
                    </span>
                  </div>
                  <div className="d-flex align-items-center flex-wrap rpw-gap-2 justify-content-between mb-2">
                    <p className="mb-0">Tax</p>
                    <span className="fw-medium text-danger d-block">
                      ₹{paymentInfo.tax}
                    </span>
                  </div>

                  <div className="d-flex align-items-center flex-wrap rpw-gap-2 justify-content-between mb-2">
                    <p className="mb-0">Discount</p>
                    <span className="fw-medium text-danger d-block">
                      ₹{paymentInfo.totalDiscount}
                    </span>
                  </div>
                </div>
                <div className="bg-primary d-flex align-items-center flex-wrap rpw-gap-2 justify-content-between p-3 rounded">
                  <h6 className="text-white">Total</h6>
                  <h6 className="text-white">₹{paymentInfo.grandTotal}</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card-footer">
        <div className="d-flex align-items-center flex-wrap rpw-gap-2 justify-content-between">
          <button
            className="btn btn-md btn-dark inline-flex align-items-center rounded-pill"
            onClick={prevStep}
          >
            <i className="isax isax-arrow-left-2 me-1" />
            Back
          </button>
          <button
            onClick={BookAppoinment}
            className="btn btn-md btn-primary-gradient inline-flex align-items-center rounded-pill"
            disabled={Loading}
          >
            {Loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Processing...
              </>
            ) : (
              <>
                Confirm &amp; Pay
                <i className="isax isax-arrow-right-3 ms-1" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="card booking-card">
      <div className="card-body booking-body pb-1">
        <div className="row">
          <div className="col-lg-8 d-flex">
            <div className="flex-fill">
              <div className="card ">
                <div className="card-header">
                  <h5 className="d-flex align-items-center flex-wrap rpw-gap-2">
                    <i className="isax isax-tick-circle5 text-success me-2" />
                    Booking Confirmed
                  </h5>
                </div>

                <div className="card-body pb-1">
                  <div className="d-flex align-items-center flex-wrap rpw-gap-2 justify-content-between mb-3">
                    <h6>Booking Info</h6>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Total Amount</label>
                        <div className="form-plain-text">
                          ₹{paymentInfo.grandTotal}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Payable Amount</label>
                        <div className="form-plain-text">
                          ₹{paymentInfo.grandTotal}
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Date &amp; Time</label>
                        <div className="form-plain-text">
                          {bookingDetails.selectedSlot},{" "}
                          {bookingDetails.selectedDate}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Hard Copy Request</label>
                        <div className="form-plain-text">
                          {bookingDetails.report}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          Clinic Name &amp; Location
                        </label>
                        <div className="form-plain-text">
                          Klar Pathology{" "}
                          <a className="text-primary">View Location</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-body d-flex align-items-center flex-wrap rpw-gap-2 justify-content-between">
                  <div>
                    <h6 className="mb-1">Need Our Assistance</h6>
                    <p className="mb-0">
                      Call us in case you face any Issue on Booking /
                      Cancellation
                    </p>
                  </div>
                  <a className="btn btn-light rounded-pill">
                    <i className="isax isax-call5 me-1" />
                    Call Us
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 d-flex">
            <div className="card flex-fill">
              <div className="card-body d-flex flex-column justify-content-between">
                <div className="text-center">
                  <h6 className="fs-14 mb-2">Booking Number</h6>
                  <span className="booking-id-badge mb-3">{bookingid}</span>
                  <span className="d-block mb-3">
                    <img src="assets/img/icons/payment-qr.svg" alt />
                  </span>
                  <p>
                    Scan this QR Code to Download the details of Appointment
                  </p>
                </div>
                <div>
                  <a
                    href="/"
                    className="btn w-100 btn-md btn-primary-gradient inline-flex align-items-center rounded-pill"
                  >
                    Start New Booking
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Link
          to="/Checkout"
          className="btn btn-md btn-dark inline-flex align-items-center rounded-pill m-3"
        >
          <i className="isax isax-arrow-left-2 me-1" />
          Back to Bookings
        </Link>
      </div>
    </div>
  );

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
                  {[1, 2, 3, 4].map((step) => (
                    <li
                      key={step}
                      className={currentStep >= step ? "progress-active" : ""}
                      onClick={() => currentStep > step && goToStep(step)}
                      style={{
                        cursor: currentStep > step ? "pointer" : "default",
                      }}
                    >
                      <div className="profile-step">
                        <span className="multi-steps">{step}</span>
                        <div className="step-section">
                          <h6>
                            {step === 1 && "Member"}
                            {step === 2 && "Address & Date & Time"}
                            {step === 3 && "Payment"}
                            {step === 4 && "Confirmation"}
                          </h6>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="booking-widget multistep-form mb-5">
                {currentStep === 1 && renderStep1()}
                {currentStep === 2 && renderStep2()}
                {currentStep === 3 && renderStep3()}
                {currentStep === 4 && renderStep4()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Dependent Modal */}
      <div className="modal fade custom-modals" id="add_dependent">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Add Dependant</h3>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-xmark" />
              </button>
            </div>
            <form onSubmit={AddMember}>
              <div className="add-dependent">
                <div className="modal-body pb-0">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-wrap">
                        <label className="form-label">
                          Full-Name <span className="text-danger">*</span>
                        </label>
                        <input
                          placeholder="Full-Name"
                          name="fullName"
                          value={memberForm.fullName}
                          onChange={handleMemberChange}
                          type="text"
                          required
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-wrap">
                        <label className="form-label">
                          Relationship <span className="text-danger">*</span>
                        </label>
                        <input
                          placeholder="Relationship"
                          name="relationName"
                          value={memberForm.relationName}
                          onChange={handleMemberChange}
                          type="text"
                          required
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-wrap">
                        <label className="form-label">
                          Age <span className="text-danger">*</span>
                        </label>
                        <div className="form-icon">
                          <input
                            placeholder="Age"
                            required
                            name="age"
                            value={memberForm.age}
                            onChange={handleMemberChange}
                            min={0}
                            type="number"
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-wrap">
                        <label className="form-label">
                          Date of Birth <span className="text-danger">*</span>
                        </label>
                        <div className="form-icon">
                          <input
                            required
                            name="dob"
                            value={memberForm.dob}
                            onChange={handleMemberChange}
                            type="date"
                            className="form-control"
                            max={get18YearsAgoDate()}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-wrap">
                        <label className="form-label">
                          Phone <span className="text-danger">*</span>
                        </label>
                        <div className="form-icon">
                          <input
                            placeholder="Phone"
                            name="phone"
                            value={memberForm.phone}
                            onChange={handleMemberChange}
                            required
                            type="text"
                            maxLength={10}
                            minLength={10}
                            min={0}
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-wrap">
                        <label className="form-label">
                          Email <span className="text-danger">*</span>
                        </label>
                        <div className="form-icon">
                          <input
                            placeholder="Email"
                            required
                            name="email"
                            value={memberForm.email}
                            onChange={handleMemberChange}
                            type="email"
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-wrap">
                        <label className="form-label">
                          Select Gender <span className="text-danger">*</span>
                        </label>
                        <div className="radio-selection d-flex border">
                          <div className="flex-grow-1">
                            <input
                              type="radio"
                              className="btn-check"
                              name="gender"
                              id="option1"
                              value="Male"
                              checked={memberForm.gender === "Male"}
                              onChange={handleMemberChange}
                            />
                            <label className="btn btn-white" htmlFor="option1">
                              Male
                            </label>
                          </div>
                          <div className="flex-grow-1">
                            <input
                              type="radio"
                              className="btn-check"
                              name="gender"
                              id="option2"
                              value="Female"
                              checked={memberForm.gender === "Female"}
                              onChange={handleMemberChange}
                            />
                            <label className="btn btn-white" htmlFor="option2">
                              Female
                            </label>
                          </div>
                          <div className="flex-grow-1">
                            <input
                              type="radio"
                              className="btn-check"
                              name="gender"
                              id="option3"
                              value="Others"
                              checked={memberForm.gender === "Others"}
                              onChange={handleMemberChange}
                            />
                            <label className="btn btn-white" htmlFor="option3">
                              Others
                            </label>
                          </div>
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
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </a>
                  <button
                    type="submit"
                    className="btn btn-md btn-primary-gradient rounded-pill"
                    disabled={Loading}
                  >
                    {Loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Adding...
                      </>
                    ) : (
                      "Add Dependant"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Add Address Modal */}
      <div className="modal fade custom-modals" id="add_dependentt">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Add Address</h3>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-xmark" />
              </button>
            </div>
            <form onSubmit={AddAddress}>
              <div className="add-dependent">
                <div className="modal-body pb-0">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-wrap">
                        <label className="form-label">
                          Address <span className="text-danger">*</span>
                        </label>
                        <input
                          placeholder="address"
                          name="address"
                          value={addressForm.address}
                          onChange={handleAddressChange}
                          type="text"
                          required
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-wrap">
                        <label className="form-label">
                          PlaceType <span className="text-danger">*</span>
                        </label>
                        <input
                          placeholder="placeType"
                          name="placeType"
                          value={addressForm.placeType}
                          onChange={handleAddressChange}
                          type="text"
                          required
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-wrap">
                        <label className="form-label">
                          LandMark <span className="text-danger">*</span>
                        </label>
                        <div className="form-icon">
                          <input
                            placeholder="landMark"
                            required
                            name="landMark"
                            value={addressForm.landMark}
                            onChange={handleAddressChange}
                            min={0}
                            type="text"
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-wrap">
                        <label className="form-label">
                          House No. <span className="text-danger">*</span>
                        </label>
                        <div className="form-icon">
                          <input
                            required
                            name="houseNo"
                            value={addressForm.houseNo}
                            onChange={handleAddressChange}
                            type="number"
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-wrap">
                        <label className="form-label">
                          Pincode <span className="text-danger">*</span>
                        </label>
                        <div className="form-icon">
                          <input
                            placeholder="Pincode"
                            name="pincode"
                            value={addressForm.pincode}
                            onChange={handleAddressChange}
                            required
                            type="text"
                            className="form-control"
                          />
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
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </a>

                  <button
                    type="submit"
                    className="btn btn-md btn-primary-gradient rounded-pill"
                    disabled={Loading}
                  >
                    {Loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Adding...
                      </>
                    ) : (
                      "Add Address"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Edit Dependent Modal */}
      <div className="modal fade custom-modals" id="edit_dependent">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Edit Dependant</h3>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-xmark" />
              </button>
            </div>
            <div>
              <div className="add-dependent">
                <div className="modal-body pb-0">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-wrap">
                        <label className="form-label">
                          Full-Name <span className="text-danger">*</span>
                        </label>
                        <input
                          placeholder="Full-Name"
                          name="fullName"
                          value={memberForm.fullName}
                          onChange={handleMemberChange}
                          type="text"
                          required
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-wrap">
                        <label className="form-label">
                          Relationship <span className="text-danger">*</span>
                        </label>
                        <input
                          placeholder="Relationship"
                          name="relationName"
                          value={memberForm.relationName}
                          onChange={handleMemberChange}
                          type="text"
                          required
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-wrap">
                        <label className="form-label">
                          Age <span className="text-danger">*</span>
                        </label>
                        <div className="form-icon">
                          <input
                            placeholder="Age"
                            required
                            name="age"
                            value={memberForm.age}
                            onChange={handleMemberChange}
                            min={0}
                            type="number"
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-wrap">
                        <label className="form-label">
                          Date of Birth <span className="text-danger">*</span>
                        </label>
                        <div className="form-icon">
                          <input
                            required
                            name="dob"
                            value={memberForm.dob}
                            onChange={handleMemberChange}
                            type="date"
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-wrap">
                        <label className="form-label">
                          Phone <span className="text-danger">*</span>
                        </label>
                        <div className="form-icon">
                          <input
                            placeholder="Phone"
                            name="phone"
                            value={memberForm.phone}
                            onChange={handleMemberChange}
                            required
                            type="text"
                            maxLength={10}
                            minLength={10}
                            min={0}
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-wrap">
                        <label className="form-label">
                          Email <span className="text-danger">*</span>
                        </label>
                        <div className="form-icon">
                          <input
                            placeholder="Email"
                            required
                            name="email"
                            value={memberForm.email}
                            onChange={handleMemberChange}
                            type="email"
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-wrap">
                        <label className="form-label">
                          Select Gender <span className="text-danger">*</span>
                        </label>
                        <div className="radio-selection d-flex border">
                          <div className="flex-grow-1">
                            <input
                              type="radio"
                              className="btn-check"
                              name="gender"
                              id="option1edit"
                              value="Male"
                              checked={memberForm.gender === "Male"}
                              onChange={handleMemberChange}
                            />
                            <label
                              className="btn btn-white"
                              htmlFor="option1edit"
                            >
                              Male
                            </label>
                          </div>
                          <div className="flex-grow-1">
                            <input
                              type="radio"
                              className="btn-check"
                              name="gender"
                              id="option2edit"
                              value="Female"
                              checked={memberForm.gender === "Female"}
                              onChange={handleMemberChange}
                            />
                            <label
                              className="btn btn-white"
                              htmlFor="option2edit"
                            >
                              Female
                            </label>
                          </div>
                          <div className="flex-grow-1">
                            <input
                              type="radio"
                              className="btn-check"
                              name="gender"
                              id="option3edit"
                              value="Others"
                              checked={memberForm.gender === "Others"}
                              onChange={handleMemberChange}
                            />
                            <label
                              className="btn btn-white"
                              htmlFor="option3edit"
                            >
                              Others
                            </label>
                          </div>
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
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </a>
                  <button
                    onClick={UpdatedMember}
                    type="button"
                    className="btn btn-md btn-primary-gradient rounded-pill"
                    disabled={Loading}
                  >
                    {Loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Address Modal */}
      <div className="modal fade custom-modals" id="edit_dependentt">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Edit Address</h3>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-xmark" />
              </button>
            </div>
            <div>
              <div className="add-dependent">
                <div className="modal-body pb-0">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-wrap">
                        <label className="form-label">
                          Address <span className="text-danger">*</span>
                        </label>
                        <input
                          placeholder="address"
                          name="address"
                          value={addressForm.address}
                          onChange={handleAddressChange}
                          type="text"
                          required
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-wrap">
                        <label className="form-label">
                          PlaceType <span className="text-danger">*</span>
                        </label>
                        <input
                          placeholder="placeType"
                          name="placeType"
                          value={addressForm.placeType}
                          onChange={handleAddressChange}
                          type="text"
                          required
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-wrap">
                        <label className="form-label">
                          LandMark <span className="text-danger">*</span>
                        </label>
                        <div className="form-icon">
                          <input
                            placeholder="landMark"
                            required
                            name="landMark"
                            value={addressForm.landMark}
                            onChange={handleAddressChange}
                            min={0}
                            type="text"
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-wrap">
                        <label className="form-label">
                          House No. <span className="text-danger">*</span>
                        </label>
                        <div className="form-icon">
                          <input
                            required
                            name="houseNo"
                            value={addressForm.houseNo}
                            onChange={handleAddressChange}
                            type="number"
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-wrap">
                        <label className="form-label">
                          Pincode <span className="text-danger">*</span>
                        </label>
                        <div className="form-icon">
                          <input
                            placeholder="pincode"
                            name="pincode"
                            value={addressForm.pincode}
                            onChange={handleAddressChange}
                            required
                            type="text"
                            className="form-control"
                          />
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
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </a>
                  <button
                    onClick={UpdatedAddress}
                    type="button"
                    className="btn btn-md btn-primary-gradient rounded-pill"
                    disabled={Loading}
                  >
                    {Loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Member Modal */}
      <div className="modal fade custom-modals" id="delete_modal">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body p-4 text-center">
              <div>
                <span className="del-icon mb-2 mx-auto">
                  <i className="isax isax-trash" />
                </span>
                <h3 className="mb-2">Delete Dependent</h3>
                <p className="mb-3">
                  Are you sure you want to delete this dependent?
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
                    onClick={Deletedmember}
                    type="button"
                    className="btn btn-md btn-primary-gradient rounded-pill"
                    disabled={Loading}
                  >
                    {Loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Deleting...
                      </>
                    ) : (
                      "Yes Delete"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Address Modal */}
      <div className="modal fade custom-modals" id="delete_modall">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body p-4 text-center">
              <div>
                <span className="del-icon mb-2 mx-auto">
                  <i className="isax isax-trash" />
                </span>
                <h3 className="mb-2">Delete Address</h3>
                <p className="mb-3">
                  Are you sure you want to delete this address?
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
                    onClick={DeletedAddress}
                    type="button"
                    className="btn btn-md btn-primary-gradient rounded-pill"
                    disabled={Loading}
                  >
                    {Loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Deleting...
                      </>
                    ) : (
                      "Yes Delete"
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

export default Bookingform;
