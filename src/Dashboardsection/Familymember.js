import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import toast, { Toaster } from "react-hot-toast";
import ProfileSidebar from "./ProfileSidebar";
import { DNA } from "react-loader-spinner";
const Familymember = () => {
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
  const [loading, setLoading] = useState(true);

  const [MemberData, setMemberData] = useState();

  const AddMember = (e) => {
    e.preventDefault();
    const formData = {
      userId: secureLocalStorage.getItem("medicityuser"),
      fullName: fullName,
      relationName: relationName,
      age: age,
      dob: dob,
      gender: gender,
      phone: phone,
      email: email,
    };
    axios
      .post(`${process.env.REACT_APP_API_KEY}member`, formData)
      .then((res) => {
        GetMember();
        toast.success("Member Added Successfully");
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Something went wrong");
        console.log(error);
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
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const UpdatedMember = () => {
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
        toast.success("Data Updated Successfuly");
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Something went wrong");
        console.log(error);
      });
  };

  const Deletedmember = async () => {
    const data = {
      memberId: addressId,
    };

    axios
      .post(`${process.env.REACT_APP_API_KEY}deleteMember`, data)
      .then((res) => {
        toast.success(res.data.message);
        GetMember();
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Something went wrong");
      });
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
                    Dependants
                  </li>
                  <li className="breadcrumb-item">Patient</li>
                </ol>
                <h2
                  style={{ textAlign: "justify" }}
                  className="breadcrumb-title active"
                >
                  Dependants
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
            <div className="col-lg-5 col-xl-4 ">
              <ProfileSidebar />
            </div>
            {/* / Profile Sidebar */}
            <div className="col-lg-7 col-xl-8">
              <div className="dashboard-header">
                <h3>Dependants</h3>
              </div>
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
                <a
                  href="#"
                  className="btn btn-md btn-primary-gradient rounded-pill"
                  data-bs-toggle="modal"
                  data-bs-target="#add_dependent"
                >
                  Add Dependants
                </a>
              </div>
              {/* Dependent Item */}
              {loading ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "300px",
                    backgroundColor: "#f8f9fa",
                    borderRadius: "10px",
                    margin: "20px 0",
                  }}
                >
                  <DNA
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper"
                  />
                </div>
              ) : MemberData && MemberData.length > 0 ? (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(350px, 1fr))",
                    gap: "20px",
                    padding: "10px",
                  }}
                >
                  {MemberData.map((data) => (
                    <div
                      key={data._id}
                      style={{
                        backgroundColor: "#fff",
                        borderRadius: "12px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        border: "1px solid #e0e0e0",
                        overflow: "hidden",
                        ":hover": {
                          transform: "translateY(-5px)",
                          boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
                        },
                      }}
                    >
                      <div style={{ padding: "20px" }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            marginBottom: "15px",
                          }}
                        >
                          <div style={{ flex: 1 }}>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                marginBottom: "10px",
                              }}
                            >
                              <h3
                                style={{
                                  margin: "0",
                                  fontSize: "18px",
                                  fontWeight: "600",
                                  color: "#333",
                                }}
                              >
                                {data?.fullName}
                              </h3>
                              <span
                                style={{
                                  marginLeft: "10px",
                                  padding: "4px 8px",
                                  backgroundColor: "#e3f2fd",
                                  color: "#1976d2",
                                  borderRadius: "20px",
                                  fontSize: "12px",
                                  fontWeight: "500",
                                }}
                              >
                                {data?.relationName}
                              </span>
                            </div>

                            <div style={{ marginTop: "15px" }}>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  marginBottom: "8px",
                                  fontSize: "14px",
                                }}
                              >
                                <i
                                  className="fas fa-venus-mars"
                                  style={{
                                    color: "#9e9e9e",
                                    width: "20px",
                                    textAlign: "center",
                                    marginRight: "10px",
                                  }}
                                ></i>
                                <span>{data?.gender}</span>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  marginBottom: "8px",
                                  fontSize: "14px",
                                }}
                              >
                                <i
                                  className="fas fa-birthday-cake"
                                  style={{
                                    color: "#9e9e9e",
                                    width: "20px",
                                    textAlign: "center",
                                    marginRight: "10px",
                                  }}
                                ></i>
                                <span>
                                  {data?.age} years (DOB:{" "}
                                  {new Date(data?.dob).toLocaleDateString()})
                                </span>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  marginBottom: "8px",
                                  fontSize: "14px",
                                }}
                              >
                                <i
                                  className="fas fa-phone"
                                  style={{
                                    color: "#9e9e9e",
                                    width: "20px",
                                    textAlign: "center",
                                    marginRight: "10px",
                                  }}
                                ></i>
                                <span>{data?.phone}</span>
                              </div>
                              {data?.email && (
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    marginBottom: "8px",
                                    fontSize: "14px",
                                  }}
                                >
                                  <i
                                    className="fas fa-envelope"
                                    style={{
                                      color: "#9e9e9e",
                                      width: "20px",
                                      textAlign: "center",
                                      marginRight: "10px",
                                    }}
                                  ></i>
                                  <span>{data?.email}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              gap: "8px",
                            }}
                          >
                            <button
                              onClick={() => {
                                setaddressId(data._id);
                                setgenderupdate(data.gender);
                                setfullNameupdate(data.fullName);
                                setrelationNameupdate(data.relationName);
                                setageupdate(data.age);
                                setphoneupdate(data.phone);
                                setemailupdate(data.email);
                                setdobupdate(data.dob);
                              }}
                              style={{
                                width: "32px",
                                height: "32px",
                                borderRadius: "50%",
                                border: "1px solid #1976d2",
                                color: "#1976d2",
                                backgroundColor: "transparent",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                                ":hover": {
                                  backgroundColor: "#1976d2",
                                  color: "#fff",
                                },
                              }}
                              data-bs-toggle="modal"
                              data-bs-target="#edit_dependent"
                            >
                              <i
                                className="fas fa-edit"
                                style={{ fontSize: "12px" }}
                              ></i>
                            </button>
                            <button
                              onClick={() => {
                                setaddressId(data._id);
                              }}
                              style={{
                                width: "32px",
                                height: "32px",
                                borderRadius: "50%",
                                border: "1px solid #d32f2f",
                                color: "#d32f2f",
                                backgroundColor: "transparent",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                                ":hover": {
                                  backgroundColor: "#d32f2f",
                                  color: "#fff",
                                },
                              }}
                              data-bs-toggle="modal"
                              data-bs-target="#delete_modal"
                            >
                              <i
                                className="fas fa-trash-alt"
                                style={{ fontSize: "12px" }}
                              ></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  style={{
                    textAlign: "center",
                    padding: "40px 20px",
                    backgroundColor: "#f8f9fa",
                    borderRadius: "12px",
                    margin: "20px 0",
                    border: "2px dashed #e0e0e0",
                  }}
                >
                  <div
                    style={{
                      marginBottom: "20px",
                      opacity: "0.7",
                    }}
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/7486/7486820.png"
                      alt="No Members"
                      style={{ width: "120px", height: "auto" }}
                    />
                  </div>
                  <h3
                    style={{
                      color: "#555",
                      marginBottom: "10px",
                      fontWeight: "600",
                    }}
                  >
                    No members added yet
                  </h3>
                  <p
                    style={{
                      color: "#777",
                      marginBottom: "25px",
                      fontSize: "15px",
                    }}
                  >
                    Add your first family member to get started
                  </p>
                  <button
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "#1976d2",
                      color: "#fff",
                      border: "none",
                      borderRadius: "6px",
                      fontSize: "15px",
                      fontWeight: "500",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      display: "inline-flex",
                      alignItems: "center",
                      ":hover": {
                        backgroundColor: "#1565c0",
                        transform: "translateY(-2px)",
                      },
                    }}
                    data-bs-toggle="modal"
                    data-bs-target="#add_member_modal"
                  >
                    <i
                      className="fas fa-plus"
                      style={{ marginRight: "8px", fontSize: "14px" }}
                    ></i>
                    Add Member
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

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
                    data-bs-dismiss="modal"
                  >
                    Add Dependant
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
                    Save Changes
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
    </div>
  );
};

export default Familymember;
