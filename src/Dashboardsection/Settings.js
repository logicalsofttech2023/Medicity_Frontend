import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import ProfileSidebar from "./ProfileSidebar";

const Settings = () => {
  const [UserData, setUserData] = useState();
  const [name, setname] = useState();
  const [gender, setgender] = useState();
  const [dob, setdob] = useState();
  const [country, setcountry] = useState();
  const [pincode, setpincode] = useState();
  const [email, setemail] = useState();
  const [bloodGroup, setbloodGroup] = useState();
  const [address, setaddress] = useState();
  const [cityName, setcityName] = useState();
  const [stateName, setstateName] = useState();
  const [userProfile, setuserProfile] = useState();

  useEffect(() => {
    GetUser();
  }, [0]);
  const GetUser = async () => {
    const data = {
      userId: secureLocalStorage.getItem("medicityuser"),
    };

    axios
      .post(`${process.env.REACT_APP_API_KEY}getUser`, data)
      .then((res) => {
        setUserData(res.data.data);
        const userdatares = res.data.data;
        setname(userdatares?.name);
        setgender(userdatares?.gender);
        setdob(userdatares?.dob);
        setemail(userdatares?.email);
        setbloodGroup(userdatares?.bloodGroup);
        setaddress(userdatares?.address);
        setcityName(userdatares?.cityName);
        setstateName(userdatares?.stateName);
        setcountry(userdatares?.country);
        setpincode(userdatares?.pincode);
      })
      .catch((error) => {});
  };

  // updateUser

  const updateUserProfile = (e) => {
    e.preventDefault();
    // Validate DOB
    if (!dob) {
      toast.error("Date of Birth is required.");
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    if (dob > today) {
      toast.error("Date of Birth cannot be a future date.");
      return;
    }
    const formData = new FormData();
    formData.append("userId", secureLocalStorage.getItem("medicityuser"));
    formData.append("name", name || "");

    formData.append("gender", gender || "");
    formData.append("dob", dob || "");
    formData.append("email", email || "");
    formData.append("bloodGroup", bloodGroup || "");
    formData.append("address", address || "");
    formData.append("cityName", cityName || "");
    formData.append("stateName", stateName || "");
    formData.append("country", country || "");
    formData.append("pincode", pincode || "");
    formData.append("userProfile", userProfile || "");
    axios
      .post(`${process.env.REACT_APP_API_KEY}updateUser`, formData)
      .then((res) => {
        toast.success(res.data.message);
        GetUser();
        setuserProfile(null);
      })
      .catch((error) => {});
  };

  const get18YearsAgoDate = () => {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 18);
    return today.toISOString().split("T")[0];
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
                  <li className="breadcrumb-item active">Settings</li>
                </ol>
                <h2
                  style={{ textAlign: "justify" }}
                  className="breadcrumb-title"
                >
                  Edit Profile
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
            <div className="col-lg-5 col-xl-4">
              {/* Profile Sidebar */}
              <ProfileSidebar />
              {/* /Profile Sidebar */}
            </div>
            <div className="col-lg-7 col-xl-8">
              <nav className="settings-tab mb-1">
                <ul className="nav nav-tabs-bottom" role="tablist">
                  <li className="nav-item" role="presentation">
                    <Link className="nav-link active" to="/Settings">
                      Profile
                    </Link>
                  </li>
                  {/* <li className="nav-item" role="presentation">
                    <Link className="nav-link" to="/Changepassword">
                      Change Password
                    </Link>
                  </li> */}
                  {/* <li className="nav-item" role="presentation">
                <a className="nav-link" href="two-factor-authentication.html">2 Factor Authentication</a>
              </li> */}
                  <li className="nav-item" role="presentation">
                    <Link className="nav-link" to="/Deleteaccount">
                      Delete Account
                    </Link>
                  </li>
                </ul>
              </nav>
              <div className="card">
                <div className="card-body">
                  <div className="border-bottom pb-3 mb-3">
                    <h5>Profile Settings</h5>
                  </div>
                  <form onSubmit={updateUserProfile}>
                    <div className="setting-card">
                      <label className="form-label mb-2">Profile Photo</label>
                      <div className="change-avatar img-upload">
                        {userProfile ? (
                          <img
                            className="profile-img"
                            src={URL.createObjectURL(userProfile)}
                            alt="Uploaded profile"
                          />
                        ) : UserData?.userProfile ? (
                          <img
                            className="profile-img"
                            src={`${process.env.REACT_APP_IMG_URL}${UserData?.userProfile}`}
                            alt="User profile"
                          />
                        ) : (
                          <div className="profile-img">
                            <i className="fa-solid fa-file-image" />
                          </div>
                        )}
                        <div className="upload-img">
                          <div className="imgs-load d-flex align-items-center">
                            <div className="change-photo">
                              Upload New
                              <input
                                onChange={(e) => {
                                  setuserProfile(e.target.files[0]);
                                }}
                                type="file"
                                className="upload"
                                accept="image/*"
                              />
                            </div>
                          </div>
                          <p>
                            Your Image should Below 4 MB, Accepted format
                            jpg,png,svg
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="setting-title">
                      <h6>Information</h6>
                    </div>
                    <div className="setting-card">
                      <div className="row">
                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Full Name <span className="text-danger">*</span>
                            </label>
                            <input
                              value={name}
                              onChange={(e) => setname(e.target.value)}
                              type="text"
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Gender <span className="text-danger">*</span>
                            </label>
                            <select
                              value={gender}
                              onChange={(e) => setgender(e.target.value)}
                              className="select form-control"
                            >
                              <option>Select</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Date of Birth{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <div className="form-icon">
                              <input
                                value={dob}
                                onChange={(e) => setdob(e.target.value)}
                                type="date"
                                className="form-control"
                                placeholder="Select Date"
                                max={get18YearsAgoDate()}
                              />
                              {/* <span className="icon">
        <i className="isax isax-calendar-1" />
      </span> */}
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Phone Number{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              disabled
                              value={UserData?.phone}
                              type="text"
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Email Address{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              value={email}
                              onChange={(e) => setemail(e.target.value)}
                              type="email"
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Blood Group <span className="text-danger">*</span>
                            </label>
                            <select
                              value={bloodGroup}
                              onChange={(e) => setbloodGroup(e.target.value)}
                              className="select form-control"
                            >
                              <option>Select</option>
                              <option value="B+ve">B+ve</option>
                              <option value="AB+ve">AB+ve</option>
                              <option value="B-ve">B-ve</option>
                              <option value="O+ve">O+ve</option>
                              <option value="O-ve">O-ve</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="setting-title">
                      <h6>Address</h6>
                    </div>
                    <div className="setting-card">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="mb-3">
                            <label className="form-label">
                              Address <span className="text-danger">*</span>
                            </label>
                            <input
                              value={address}
                              onChange={(e) => setaddress(e.target.value)}
                              type="text"
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              City <span className="text-danger">*</span>
                            </label>
                            <input
                              value={cityName}
                              onChange={(e) => setcityName(e.target.value)}
                              type="text"
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              State <span className="text-danger">*</span>
                            </label>
                            <input
                              value={stateName}
                              onChange={(e) => setstateName(e.target.value)}
                              type="text"
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Country <span className="text-danger">*</span>
                            </label>
                            <input
                              value={country}
                              onChange={(e) => setcountry(e.target.value)}
                              type="text"
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Pincode <span className="text-danger">*</span>
                            </label>
                            <input
                              value={pincode}
                              onChange={(e) => setpincode(e.target.value)}
                              type="text"
                              className="form-control"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="modal-btn text-end">
                      {/* <a href="#" className="btn btn-md btn-light rounded-pill">Cancel</a> */}
                      <button
                        type="submit"
                        className="btn btn-md btn-primary-gradient rounded-pill"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
