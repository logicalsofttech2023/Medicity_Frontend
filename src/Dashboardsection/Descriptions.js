import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import secureLocalStorage from "react-secure-storage";

const Descriptions = () => {
  const [confirm, setconfirm] = useState(null);

  const [MemberData, setMemberData] = useState();
  const [selectedFiles, setSelectedFiles] = useState([]);

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const filesArray = Array.from(e.target.files);
    setSelectedFiles((prev) => [...prev, ...filesArray]);
  };

  const handleDelete = (indexToRemove) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleAddMoreClick = () => {
    fileInputRef.current.click();
  };

  const [gender, setgender] = useState("Male");
  const [fullName, setfullName] = useState("");
  const [relationName, setrelationName] = useState("");
  const [age, setage] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [dob, setdob] = useState("");

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
      .catch((error) => {});
  };

  useEffect(() => {
    GetMember();
  }, [0]);
  const GetMember = async () => {
    const data = {
      userId: secureLocalStorage.getItem("medicityuser"),
    };

    axios
      .post(`${process.env.REACT_APP_API_KEY}getMembersByUser`, data)
      .then((res) => {
        setMemberData(res.data);
      })
      .catch((error) => {});
  };

  const Addprescription = (item) => {
    const formData = new FormData();

            formData.append("userId", secureLocalStorage.getItem("medicityuser"));            
    formData.append("memberId", item);
    {
      selectedFiles?.map((images) => {
        formData.append("files", images);
      });
    }

    axios
      .post(`${process.env.REACT_APP_API_KEY}addPrescription`, formData)
      .then((res) => {
        GetMember();
        toast.success(res.data.message);
        setconfirm("success");
      })
      .catch((error) => {});
  };
  return (
    <div>
      <Toaster />
      {/* Breadcrumb Navigation */}
      <div className="breadcrumb-bar overflow-visible">
        <div className="container">
          <div className="row align-items-center inner-banner">
            <div className="col-md-12 col-12">
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol style={{ justifyContent: "start" }} className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/">
                      <i className="isax isax-home-15" />
                    </a>
                  </li>
                  <li onClick={(()=>setconfirm(null))} className="breadcrumb-item">
                  Prescription
                    </li>
                  <li className="breadcrumb-item active">
                    Upload Prescription
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Prescription Section */}

      {confirm === null ? (
        <div
          className="p-4"
          style={{ width: "90%", margin: "auto", marginTop: "20px" }}
        >
          <h3 style={{ marginBottom: "15px" }}>Upload Prescription</h3>
          {selectedFiles.length >= 1 ? (
            <div
              style={{
                border: "2px dashed #ccc",
                padding: "20px",
                textAlign: "center",
                borderRadius: "10px",
                background: "#f9f9f9",
                position: "relative",
              }}
            >
              <div>
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  height={50}
                  width={50}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1={12} y1={3} x2={12} y2={15} />
                </svg>

                <h4
                  className="mt-3"
                  style={{
                    color: "#007bff",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                  onClick={() => fileInputRef.current.click()}
                >
                  + Add More
                </h4>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".jpg,.jpeg,.png,.doc,.docx,.pdf,.heic"
                onChange={handleFileChange}
                style={{
                  opacity: 0,
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  left: 0,
                  top: 0,
                  cursor: "pointer",
                }}
              />
            </div>
          ) : (
            <div
              style={{
                border: "2px dashed #ccc",
                padding: "20px",
                textAlign: "center",
                borderRadius: "10px",
                background: "#f9f9f9",
                position: "relative",
              }}
            >
              <div>
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  height={50}
                  width={50}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1={12} y1={3} x2={12} y2={15} />
                </svg>
                <h4 style={{ margin: "15px 0", fontWeight: "bold" }}>
                  Drag and Drop here
                </h4>
                <span>or</span>
                <h4
                  style={{
                    color: "#007bff",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                  onClick={() => fileInputRef.current.click()}
                >
                  Browse Files
                </h4>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".jpg,.jpeg,.png,.doc,.docx,.pdf,.heic"
                onChange={handleFileChange}
                style={{
                  opacity: 0,
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  left: 0,
                  top: 0,
                  cursor: "pointer",
                }}
              />
            </div>
          )}
          {/* Selected File Preview */}
          {selectedFiles.length > 0 && (
            <div style={{ marginTop: "20px" }}>
              <h5 className="mb-2 mt-3">Selected Files:</h5>
              <div className="row gx-3 gy-3">
                {selectedFiles.map((file, index) => (
                  <div
                    className="col-md-6 col-lg-6 mb-3"
                    key={index}
                    style={{
                      position: "relative",
                      display: "flex",
                      flexDirection: "column",
                      background: "#f1f1f1",
                      padding: "10px",
                      borderRadius: "5px",
                    }}
                  >
                    <svg
                      onClick={() => handleDelete(index)}
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        zIndex: 2,
                        cursor: "pointer",
                        background: "#fff",
                        borderRadius: "50%",
                        boxShadow: "0 0 5px rgba(0,0,0,0.2)",
                        padding: "4px",
                      }}
                      width="20px"
                      height="20px"
                      viewBox="0 0 17 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.666 17.002a8.334 8.334 0 1 1 0-16.67 8.336 8.336 0 0 1 5.894 14.231 8.281 8.281 0 0 1-5.894 2.439Zm0-7.158 2.991 2.991 1.175-1.175-2.991-2.992 2.992-2.992-1.175-1.174-2.992 2.991-2.992-2.99L4.5 5.675l2.99 2.992L4.5 11.66l1.174 1.176 2.992-2.992Z"
                        fill="#000"
                      />
                    </svg>

                    <img
                      src={URL.createObjectURL(file)}
                      alt={`preview-${index}`}
                      style={{
                        width: "100%",
                        maxHeight: "230px",
                        objectFit: "cover",
                        borderRadius: "5px",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          {selectedFiles.length > 0 && (
            <div className="align-center">
              <button
                onClick={() => setconfirm("okay")}
                class="btn btn-primary-gradient w-50 mt-1 rounded-pill fw-bold"
              >
                Confirm
              </button>
            </div>
          )}
        </div>
      ) : confirm === "okay" ? (
        <div className="">
          <div className="content doctor-content card">
            <div className="container">
              <div className="row">
                {/* Profile Sidebar */}

                {/* / Profile Sidebar */}
                <div className="col-lg-12 col-xl-12">
                  <div className="dashboard-header">
                    <h3>Select an existing member</h3>
                  </div>

                  {/* Depeendent Item */}
                  {MemberData?.map((data) => {
                    return (
                      <div
                        onClick={() => Addprescription(data?._id)}
                        className="dependent-wrap d-flex align-items-start gap-3"
                        key={data._id}
                      >
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
                          <div className="dependent-status mt-2"></div>
                        </div>
                      </div>
                    );
                  })}

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
                      className="btn btn-md border w-100 btn-primary-gradient rounded-pill"
                      data-bs-toggle="modal"
                      data-bs-target="#add_dependent"
                    >
                      + Add Dependants
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : confirm === "success" ? (
        <div className="border p-5">
          <div class=" myPrescriptions_success_cardTop__oJxIA">
            <h4 className="align-center text-success">
              Uploaded Successfully!
            </h4>
            <h6 className="mt-2 mb-2 align-center">
              Your prescription is in good hands! We will review your
              prescription and call you within 5 minutes with the best price
            </h6>
          </div>
          <div class="align-center gap-3">
            <span class="myPrescriptions_success_cardBottom__text__EAzaJ">
              Need help right away?{" "}
            </span>

            <a
              href="tel:+918988988787"
              class="border p-2 myPrescriptions_call__btn__x_c7q"
            >
              <svg
                width="20"
                height="19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.458 1.214a7.056 7.056 0 0 1 6.234 6.226M12.458 4.35a3.92 3.92 0 0 1 3.1 3.1"
                  stroke="#E00646"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  clip-rule="evenodd"
                  d="M9.518 10.043c3.531 3.531 4.333-.554 6.581 1.694 2.168 2.167 3.416 2.601.668 5.347-.344.277-2.53 3.604-10.213-4.077-7.684-7.682-4.359-9.87-4.082-10.214 2.753-2.754 3.18-1.5 5.349.667 2.248 2.248-1.835 3.052 1.697 6.583Z"
                  stroke="url(#Calling_svg__a)"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <defs>
                  <linearGradient
                    id="Calling_svg__a"
                    x1="18.344"
                    y1="1.214"
                    x2="0.983"
                    y2="18.037"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#0E3F6C"></stop>
                    <stop offset="1" stop-color="#235B8E"></stop>
                  </linearGradient>
                </defs>
              </svg>{" "}
              &nbsp;
              <span class="myPrescriptions_success_cardBottom__callText__0ElIA">
                Call Now
              </span>
            </a>
          </div>
        </div>
      ) : null}
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
    </div>
  );
};

export default Descriptions;
