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
  const [gender, setgender] = useState("Male");
  const [fullName, setfullName] = useState("");
  const [relationName, setrelationName] = useState("");
  const [age, setage] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [dob, setdob] = useState("");
  const [addressId, setaddressId] = useState("");
  const [genderupdate, setgenderupdate] = useState("");
  const [fullNameupdate, setfullNameupdate] = useState("");
  const [relationNameupdate, setrelationNameupdate] = useState("");
  const [ageupdate, setageupdate] = useState("");
  const [phoneupdate, setphoneupdate] = useState("");
  const [emailupdate, setemailupdate] = useState("");
  const [dobupdate, setdobupdate] = useState("");
  const [pincode, setpincode] = useState("");
  const [address, setaddress] = useState("");
  const [placeType, setplaceType] = useState("");
  const [landMark, setlandMark] = useState("");
  const [houseNo, sethouseNo] = useState("");
  const [pincodeupdate, setpincodeupdate] = useState("");
  const [addressupdate, setaddressupdate] = useState("");
  const [placeTypeupdate, setplaceTypeupdate] = useState("");
  const [landMarkupdate, setlandMarkupdate] = useState("");
  const [houseNoupdate, sethouseNoupdate] = useState("");
  const [MemberData, setMemberData] = useState();
  const [AddressData, setAddressData] = useState();
  const [Loading, setLoading] = useState(true);

  const AddMember = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = {
      userId: secureLocalStorage.getItem("medicityuser"),
      fullName,
      relationName,
      age,
      dob,
      gender,
      phone,
      email,
    };
    axios
      .post(`${process.env.REACT_APP_API_KEY}member`, formData)
      .then((res) => {
        GetMember();
        toast.success("Member Added Successfully");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    GetMember();
  }, [0]);
  const GetMember = async () => {
    setLoading(true);
    const data = {
      userId: secureLocalStorage.getItem("medicityuser"),
    };
    axios
      .post(`${process.env.REACT_APP_API_KEY}getMembersByUser`, data)
      .then((res) => {
        setMemberData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const UpdatedMember = () => {
    setLoading(true);
    const data = {
      memberId: addressId,
      fullName: fullNameupdate,
      relationName: relationNameupdate,
      age: ageupdate,
      dob: dobupdate,
      gender: genderupdate,
      phone: phoneupdate,
      email: emailupdate,
    };
    axios
      .post(`${process.env.REACT_APP_API_KEY}updateMember`, data)
      .then((res) => {
        GetMember();
        toast.success("Data Updated Successfully");
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
    axios
      .post(`${process.env.REACT_APP_API_KEY}deleteMember`, data)
      .then((res) => {
        toast.success(res.data.message);
        GetMember();
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Something went wrong");
        setLoading(false);
      });
  };

  const AddAddress = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = {
      userId: secureLocalStorage.getItem("medicityuser"),
      address,
      placeType,
      landMark,
      houseNo,
      pincode,
    };
    axios
      .post(`${process.env.REACT_APP_API_KEY}address`, formData)
      .then((res) => {
        GetAddress();
        toast.success("Address Added Successfully");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    GetAddress();
  }, [0]);
  const GetAddress = async () => {
    setLoading(true);
    const data = {
      userId: secureLocalStorage.getItem("medicityuser"),
    };
    axios
      .post(`${process.env.REACT_APP_API_KEY}getAddressesByUser`, data)
      .then((res) => {
        setAddressData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const UpdatedAddress = () => {
    setLoading(true);
    const data = {
      addressId,
      address: addressupdate,
      placeType: placeTypeupdate,
      landMark: landMarkupdate,
      houseNo: houseNoupdate,
      pincode: pincodeupdate,
    };
    axios
      .post(`${process.env.REACT_APP_API_KEY}updateAddress`, data)
      .then((res) => {
        GetAddress();
        toast.success("Data Updated Successfully");
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
    axios
      .post(`${process.env.REACT_APP_API_KEY}deleteAddress`, data)
      .then((res) => {
        toast.success(res.data.message);
        GetAddress();
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Something went wrong");
        setLoading(false);
      });
  };
  const today = new Date().toISOString().split("T")[0]; // format: YYYY-MM-DD

  const [selectedDate, setSelectedDate] = useState(today);
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
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const [selectedDependants, setSelectedDependants] = useState([]);

  const [paymentMode, setPaymentMode] = useState("online");

  useEffect(() => {
    const dependantIdsString = selectedDependants.join(",");
  }, [selectedDependants]);

  const [dependantIdsString, setDependantIdsString] = useState("");

  const handleCheckboxChange = (id) => {
    const updated = selectedDependants.includes(id)
      ? selectedDependants.filter((item) => item !== id)
      : [...selectedDependants, id];

    setSelectedDependants(updated);
    setDependantIdsString(updated.join(","));
  };

  const [report, setReport] = useState("No");

  const handleCheckboxChanges = (e) => {
    setReport(e.target.checked ? "Yes" : "No");
  };

  const cartIds = localStorage.getItem("cartIds");

  const paymentInfo = JSON.parse(localStorage.getItem("paymentInfo"));
  const [bookingid, setbookingid] = useState("");

  // const BookAppoinment = () => {
  //   setLoading(true);
  //   const data = {
  //     userId: secureLocalStorage.getItem("medicityuser"),
  //     packageIds: cartIds,
  //     members: dependantIdsString,
  //     address: selectedAddressId,
  //     discountAmount: paymentInfo.discount,
  //     totalAmount: paymentInfo.totalAmount,
  //     payableAmount: paymentInfo.finalTotal,
  //     offerAmount: "10",
  //     giftAmount: "20",
  //     paymentMode: paymentMode,
  //     report: report,
  //     sampleCollectDate: selectedDate,
  //     sampleCollectTime: selectedSlot,
  //   };

  //   axios
  //     .post(`${process.env.REACT_APP_API_KEY}bookedOrder`, data)
  //     .then((res) => {
  //       GetAddress();
  //       setbookingid(res.data.data.bookingId);
  //       Swal.fire({
  //         icon: "success",
  //         title: "Booking Successful!",
  //         text: res.data.message,
  //         confirmButtonText: "View Booking",
  //         showCancelButton: true,
  //         cancelButtonText: "Close",
  //         width: "90%",
  //         maxWidth: "400px",
  //         backdrop: true,
  //       }).then((result) => {
  //         if (result.isConfirmed) {
  //           Navigate(`/Bookingappoinment`);
  //         }
  //       });
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       toast.error(error.response?.data?.message || "Something went wrong");
  //       setLoading(false);
  //     });
  // };

  const BookAppoinment = async () => {
    setLoading(true);
    Swal.fire({
      title: "Processing Payment",
      html: "Please wait while we process your payment...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const userId = secureLocalStorage.getItem("medicityuser");
    const amountToPay = paymentInfo.finalTotal;

    try {
      // Step 1: Create Razorpay Order
      const orderResponse = await axios.post(
        `${process.env.REACT_APP_API_KEY}createRazorpayOrder`,
        {
          amount: amountToPay,
        }
      );

      const { id: orderId } = orderResponse.data;

      // Step 2: Open Razorpay Checkout
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY,
        amount: amountToPay * 100,
        currency: "INR",
        name: "Medicity Booking",
        description: "Package Payment",
        order_id: orderId,
        handler: async function (response) {
          try {
            Swal.fire({
              title: "Processing Booking",
              html: "Your payment was successful! Completing your booking...",
              allowOutsideClick: false,
              didOpen: () => {
                Swal.showLoading();
              },
            });

            // Step 3: After Payment Success, Call bookedOrder API
            const bookingData = {
              userId,
              packageIds: cartIds.toString(),
              members: dependantIdsString.toString(),
              address: selectedAddressId.toString(),
              discountAmount: paymentInfo.discount,
              totalAmount: paymentInfo.totalAmount,
              payableAmount: paymentInfo.finalTotal,
              offerAmount: "10",
              giftAmount: "20",
              paymentStatus: true,
              paymentMode: "Online",
              paymentId: response.razorpay_payment_id,
              report: report,
              sampleCollectDate: selectedDate,
              sampleCollectTime: selectedSlot,
            };

            const bookRes = await axios.post(
              `${process.env.REACT_APP_API_KEY}bookedOrder`,
              bookingData
            );

            setbookingid(bookRes.data.data.bookingId);
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
              }
            });
          } catch (error) {
            Swal.fire({
              icon: "error",
              title: "Booking Failed",
              text: "Your payment was successful but booking failed. Please contact support.",
              confirmButtonText: "OK",
            });
            console.error("Booking error:", error);
          }
        },
        prefill: {
          name: "Test User",
          email: "user@medicity",
          contact: "1234567890",
        },
        theme: {
          color: "#0e76a8",
        },
        modal: {
          ondismiss: function () {
            Swal.fire({
              icon: "info",
              title: "Payment Cancelled",
              text: "You cancelled the payment process",
              confirmButtonText: "OK",
            });
          },
        },
      };

      const razor = new window.Razorpay(options);
      razor.on("payment.failed", function (response) {
        Swal.fire({
          icon: "error",
          title: "Payment Failed",
          text: "Payment could not be processed. Please try again.",
          confirmButtonText: "OK",
        });
      });
      razor.open();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Payment Error",
        text: "Failed to initiate payment. Please try again.",
        confirmButtonText: "OK",
      });
      console.error("Payment error:", error);
    } finally {
      setLoading(false);
    }
  };

  const get18YearsAgoDate = () => {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 18);
    return today.toISOString().split("T")[0];
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
                  <li className="progress-active">
                    <div className="profile-step">
                      <span className="multi-steps">1</span>
                      <div className="step-section">
                        <h6>Member</h6>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="profile-step">
                      <span className="multi-steps">2</span>
                      <div className="step-section">
                        <h6>Address & Date &amp; Time</h6>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="profile-step">
                      <span className="multi-steps">3</span>
                      <div className="step-section">
                        <h6>Payment</h6>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="profile-step">
                      <span className="multi-steps">4</span>
                      <div className="step-section">
                        <h6>Confirmation</h6>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="booking-widget multistep-form mb-5">
                <fieldset id="first">
                  <div className="card booking-card mb-0">
                    <div className="card-body booking-body">
                      <div className="content doctor-content card">
                        <div className="container">
                          <div className="row">
                            {/* Profile Sidebar */}

                            {/* / Profile Sidebar */}
                            <div className="col-lg-12 col-xl-12">
                              <div className="dashboard-header">
                                <h3>Dependants</h3>
                              </div>

                              {/* Depeendent Item */}
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
                                      checked={selectedDependants.includes(
                                        data._id
                                      )}
                                      onChange={() =>
                                        handleCheckboxChange(data._id)
                                      }
                                    />
                                    <div className="flex-grow-1">
                                      <div className="dependent-info">
                                        <div className="patinet-information">
                                          <div className="patient-info">
                                            <h5>Name: {data?.fullName}</h5>
                                            <ul>
                                              <li>
                                                Relationship:{" "}
                                                {data?.relationName}
                                              </li>
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
                                            setgenderupdate(data.gender);
                                            setfullNameupdate(data.fullName);
                                            setrelationNameupdate(
                                              data.relationName
                                            );
                                            setageupdate(data.age);
                                            setphoneupdate(data.phone);
                                            setemailupdate(data.email);
                                            setdobupdate(data.dob);
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
                                <div className="text-center py-4">
                                  No members found.
                                </div>
                              )}

                              {selectedDependants?.length === 0 && (
                                <div className="alert alert-danger text-center py-2">
                                  Please select at least one dependant.
                                </div>
                              )}

                              <div className="dashboard-header border-0 m-0">
                                <ul className="header-list-btns">
                                  <li>
                                    <div className="input-block dash-search-input">
                                      <span className="search-icon">
                                        &nbsp;
                                      </span>
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
                          //
                          className="btn btn-md btn-dark inline-flex align-items-center rounded-pill"
                        >
                          <i className="isax isax-arrow-left-2 me-1" />
                          Back
                        </Link>
                        {/* <a
                          // 

                          className="btn btn-md btn-primary-gradient next_btns inline-flex align-items-center rounded-pill"
                        >
                          Select Address & Date-Time
                          <i className="isax isax-arrow-right-3 ms-1" />
                        </a> */}
                        <button
                          type="button"
                          className={`btn btn-md btn-primary-gradient next_btns inline-flex align-items-center rounded-pill ${
                            selectedDependants.length === 0 ? "disabled" : ""
                          }`}
                        >
                          Select Address & Date-Time
                          <i className="isax isax-arrow-right-3 ms-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                </fieldset>

                <fieldset>
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
                                    checked={selectedAddressId === data._id}
                                    onChange={() =>
                                      setSelectedAddressId(data._id)
                                    }
                                    required
                                  />
                                  <div className="flex-grow-1">
                                    <div className="dependent-info">
                                      <div className="patinet-information">
                                        <div className="patient-info">
                                          <h5>Address: {data?.address}</h5>
                                          <ul>
                                            <li>
                                              PlaceType: {data?.placeType}
                                            </li>
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
                                          setaddressupdate(data.address);
                                          setplaceTypeupdate(data.placeType);
                                          setlandMarkupdate(data.landMark);
                                          sethouseNoupdate(data.houseNo);
                                          setpincodeupdate(data.pincode);
                                        }}
                                        //
                                        className="edit-icon me-2"
                                        data-bs-toggle="modal"
                                        data-bs-target="#edit_dependentt"
                                      >
                                        <i className="isax isax-edit-2" />
                                      </a>
                                      <a
                                        onClick={() => {
                                          setaddressId(data._id);
                                        }}
                                        //
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
                              <div className="text-center py-4">
                                No members found.
                              </div>
                            )}

                            {!selectedAddressId && (
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
                                    value={selectedDate}
                                    onChange={(e) => {
                                      setSelectedDate(e.target.value);
                                    }}
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
                          className="btn btn-md btn-dark prev_btns inline-flex align-items-center rounded-pill"
                        >
                          <i className="isax isax-arrow-left-2 me-1" />
                          Back
                        </a>
                        {/* <a
                          // 
                          className="btn btn-md btn-primary-gradient next_btns inline-flex align-items-center rounded-pill"
                        >
                          Add Payment Information
                          <i className="isax isax-arrow-right-3 ms-1" />
                        </a> */}

                        <button
                          type="button"
                          className={`btn btn-primary-gradient next_btns inline-flex align-items-center rounded-pill ${
                            !selectedAddressId ? "disabled" : ""
                          }`}
                          disabled={!selectedAddressId}
                        >
                          Add Payment Information
                          <i className="isax isax-arrow-right-3 ms-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                </fieldset>

                <fieldset>
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
                                    E-reports will be sent on your SMS,
                                    WhatsApp, &amp; e-mail. Additionally, you
                                    can get a hard copy of your reports by
                                    paying ₹150.
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

                                {/* Optional: Show current value */}
                                <div className="mt-2">
                                  <strong>Report:</strong> {report}
                                </div>
                              </div>
                              <hr />
                              <div className="payment-tabs">
                                <ul
                                  className="nav nav-pills mb-3 row"
                                  id="pills-tab"
                                  role="tablist"
                                >
                                  <li
                                    className="nav-item col-sm-12 mb-3"
                                    role="presentation"
                                  >
                                    <button
                                      className={`nav-link ${
                                        paymentMode === "online" ? "active" : ""
                                      }`}
                                      id="pills-home-tab"
                                      data-bs-toggle="pill"
                                      data-bs-target="#pills-home"
                                      type="button"
                                      role="tab"
                                      onClick={() => setPaymentMode("online")}
                                    >
                                      <img
                                        src="assets/img/icons/payment-icon-05.svg"
                                        className="me-2"
                                        alt=""
                                      />
                                      Pay By Online
                                    </button>
                                  </li>
                                  <li
                                    className="nav-item col-sm-12"
                                    role="presentation"
                                  >
                                    <button
                                      className={`nav-link ${
                                        paymentMode === "cash" ? "active" : ""
                                      }`}
                                      id="pills-profile-tab"
                                      data-bs-toggle="pill"
                                      data-bs-target="#pills-profile"
                                      type="button"
                                      role="tab"
                                      onClick={() => setPaymentMode("cash")}
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
                                <label className="form-label">
                                  Date &amp; Time
                                </label>
                                <div className="form-plain-text">
                                  {selectedSlot}, {selectedDate}
                                </div>
                              </div>
                              <div className="mb-3">
                                <label className="form-label">
                                  Appointment type
                                </label>
                                <div className="form-plain-text">
                                  (Klar Path){" "}
                                </div>
                              </div>
                              <div className="pt-3 border-top booking-more-info">
                                <h6 className="mb-3">Payment Info</h6>
                                <div className="d-flex align-items-center flex-wrap rpw-gap-2 justify-content-between mb-2">
                                  <p className="mb-0">Echocardiograms</p>
                                  <span className="fw-medium d-block">
                                    ₹200
                                  </span>
                                </div>
                                <div className="d-flex align-items-center flex-wrap rpw-gap-2 justify-content-between mb-2">
                                  <p className="mb-0">Booking Fees</p>
                                  <span className="fw-medium d-block">₹20</span>
                                </div>
                                <div className="d-flex align-items-center flex-wrap rpw-gap-2 justify-content-between mb-2">
                                  <p className="mb-0">Tax</p>
                                  <span className="fw-medium d-block">₹18</span>
                                </div>
                                <div className="d-flex align-items-center flex-wrap rpw-gap-2 justify-content-between mb-2">
                                  <p className="mb-0">Discount</p>
                                  <span className="fw-medium text-danger d-block">
                                    -₹15
                                  </span>
                                </div>
                              </div>
                              <div className="bg-primary d-flex align-items-center flex-wrap rpw-gap-2 justify-content-between p-3 rounded">
                                <h6 className="text-white">Total</h6>
                                <h6 className="text-white">
                                  ₹{paymentInfo.totalAmount}
                                </h6>
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
                          className="btn btn-md btn-dark prev_btns inline-flex align-items-center rounded-pill"
                        >
                          <i className="isax isax-arrow-left-2 me-1" />
                          Back
                        </a>
                        <a
                          onClick={BookAppoinment}
                          //
                          className="btn btn-md btn-primary-gradient next_btns inline-flex align-items-center rounded-pill"
                        >
                          Confirm &amp; Pay
                          <i className="isax isax-arrow-right-3 ms-1" />
                        </a>
                      </div>
                    </div>
                  </div>
                </fieldset>
                <fieldset>
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
                                      <label className="form-label">
                                        Total Amount
                                      </label>
                                      <div className="form-plain-text">
                                        ₹{paymentInfo.totalAmount}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="mb-3">
                                      <label className="form-label">
                                        Payable Amount
                                      </label>
                                      <div className="form-plain-text">
                                        ₹{paymentInfo.finalTotal}
                                      </div>
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="mb-3">
                                      <label className="form-label">
                                        Date &amp; Time
                                      </label>
                                      <div className="form-plain-text">
                                        {selectedSlot}, {selectedDate}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="mb-3">
                                      <label className="form-label">
                                        Hard Copy Request
                                      </label>
                                      <div className="form-plain-text">
                                        {report}
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
                                        <a
                                          //
                                          className="text-primary"
                                        >
                                          View Location
                                        </a>
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
                                    Call us in case you face any Issue on
                                    Booking / Cancellation
                                  </p>
                                </div>
                                <a
                                  //
                                  className="btn btn-light rounded-pill"
                                >
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
                                <span className="booking-id-badge mb-3">
                                  {bookingid}
                                </span>
                                <span className="d-block mb-3">
                                  <img
                                    src="assets/img/icons/payment-qr.svg"
                                    alt
                                  />
                                </span>
                                <p>
                                  Scan this QR Code to Download the details of
                                  Appointment
                                </p>
                              </div>
                              <div>
                                {/* <Link to='/Checkout'
                                  
                                  className="btn w-100 mb-3 btn-md btn-dark prev_btns inline-flex align-items-center rounded-pill"
                                >
                                  Add To Calendar
                                </Link> */}
                                <a
                                  href="/"
                                  className="btn w-100 btn-md btn-primary-gradient next_btns inline-flex align-items-center rounded-pill"
                                >
                                  Start New Booking
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Link to="/Checkout" className>
                      <i className="isax isax-arrow-left-2 me-1" />
                      Back to Bookings
                    </Link>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Terms */}
      {/* Cursor */}
      <div className="mouse-cursor cursor-outer" />
      <div className="mouse-cursor cursor-inner" />

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
                          value={fullName}
                          onChange={(e) => setfullName(e.target.value)}
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
                          value={relationName}
                          onChange={(e) => setrelationName(e.target.value)}
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
                            value={age}
                            min={0}
                            onChange={(e) => setage(e.target.value)}
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
                            value={dob}
                            onChange={(e) => setdob(e.target.value)}
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
                            value={phone}
                            required
                            onChange={(e) => setphone(e.target.value)}
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
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
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
                              checked={gender === "Male"}
                              onChange={(e) => setgender(e.target.value)}
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
                              checked={gender === "Female"}
                              onChange={(e) => setgender(e.target.value)}
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
                              checked={gender === "Others"}
                              onChange={(e) => setgender(e.target.value)}
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
                          value={address}
                          onChange={(e) => setaddress(e.target.value)}
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
                          value={placeType}
                          onChange={(e) => setplaceType(e.target.value)}
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
                            value={landMark}
                            min={0}
                            onChange={(e) => setlandMark(e.target.value)}
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
                            value={houseNo}
                            onChange={(e) => sethouseNo(e.target.value)}
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
                            value={pincode}
                            required
                            onChange={(e) => setpincode(e.target.value)}
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
      {/* /Add Dependent Modal*/}
      {/* Edit Dependent Modal*/}
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
                          value={fullNameupdate}
                          onChange={(e) => setfullNameupdate(e.target.value)}
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
                          value={relationNameupdate}
                          onChange={(e) =>
                            setrelationNameupdate(e.target.value)
                          }
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
                            value={ageupdate}
                            min={0}
                            onChange={(e) => setageupdate(e.target.value)}
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
                            value={dobupdate}
                            onChange={(e) => setdobupdate(e.target.value)}
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
                            value={phoneupdate}
                            required
                            onChange={(e) => setphoneupdate(e.target.value)}
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
                            value={emailupdate}
                            onChange={(e) => setemailupdate(e.target.value)}
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
                              checked={genderupdate === "Male"}
                              onChange={(e) => setgenderupdate(e.target.value)}
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
                              checked={genderupdate === "Female"}
                              onChange={(e) => setgenderupdate(e.target.value)}
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
                              checked={genderupdate === "Others"}
                              onChange={(e) => setgenderupdate(e.target.value)}
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
                    onClick={UpdatedMember}
                    type="submit"
                    className="btn btn-md btn-primary-gradient rounded-pill"
                    data-bs-dismiss="modal"
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
                          value={addressupdate}
                          onChange={(e) => setaddressupdate(e.target.value)}
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
                          value={placeTypeupdate}
                          onChange={(e) => setplaceTypeupdate(e.target.value)}
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
                            value={landMarkupdate}
                            min={0}
                            onChange={(e) => setlandMarkupdate(e.target.value)}
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
                            value={houseNoupdate}
                            onChange={(e) => sethouseNoupdate(e.target.value)}
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
                            value={pincodeupdate}
                            required
                            onChange={(e) => setpincodeupdate(e.target.value)}
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
                    type="submit"
                    className="btn btn-md btn-primary-gradient rounded-pill"
                    data-bs-dismiss="modal"
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
      {/* /Edit Dependent Modal*/}
      {/* Delete */}
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
                    data-bs-dismiss="modal"
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
