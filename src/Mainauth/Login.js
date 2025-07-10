import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import secureLocalStorage from "react-secure-storage";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import { nav } from "framer-motion/client";

const Login = () => {
  const navigate = useNavigate();
  const [showOTP, setShowOTP] = useState(false);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [totp, settotp] = useState();
  const [resendDisabled, setResendDisabled] = useState(true);
  const [timer, setTimer] = useState(30);
  const mendicityUser = secureLocalStorage.getItem("medicityuser");
  const [isSubmit , setIsSubmit] = useState(false);

  useEffect(() => {
    if (mendicityUser) {
      navigate("/Dashboard");
    }
  }, [mendicityUser]);

  
  
  useEffect(() => {
    let countdown;
    if (resendDisabled && showOTP) {
      countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(countdown);
            setResendDisabled(false);
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(countdown);
  }, [resendDisabled, showOTP]);
  const handleSignUpClick = async (e) => {
    setIsSubmit(true);
    e.preventDefault();
    setError("");

    if (!phone) {
      toast.error("Please enter your phone number.");
      return;
    }
    if (!phone || phone.length !== 10) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_KEY}userLogin`,
        { phone }
      );

      if (response.data.message) {
        settotp(response.data.data.otp);
        setShowOTP(true);
        setResendDisabled(true);
        setTimer(30);
        toast.success(response.data.message);
        setIsSubmit(false);
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred.");
      setIsSubmit(false);
    }
  };

  const handleVerifyOTP = async () => {
    setError("");

    if (!otp) {
      toast.error("Please enter the OTP.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_KEY}userVerify`,
        { phone, otp }
      );

      if (response.data.message) {
        console.log(response.data);

        toast.success(response.data.message);
        secureLocalStorage.setItem("medicityuser", response.data.data._id);

        navigate("/Dashboard");
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
    }
  };

  const handleResendOTP = async () => {
    setError("");

    if (!phone) {
      toast.error("Please enter your phone number.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_KEY}resendOtp`,
        { phone }
      );

      if (response.data.message) {
        settotp(response.data.data.otp);
        toast.success(response.data.message);
        setResendDisabled(true);
        setTimer(30);
      } else {
        toast.error("Failed to resend OTP. Please try again.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
    }
  };



  return (
    <div className="content">
      <Toaster />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <div className="account-content">
              <div className="row align-items-center justify-content-center">
                <div className="col-md-7 col-lg-6 login-left">
                  <img src="assets/img/login-banner.png" alt="Doccure Login" />
                </div>
                <div className="col-md-12 col-lg-6 login-right">
                  <div className="login-header">
                    <h1>
                      Login <span>Klar</span>
                    </h1>
                  </div>
                  <div>
                    {!showOTP ? (
                      <div className="mb-3">
                        <label className="form-label">
                          Enter Mobile Number
                        </label>
                        <input
                          placeholder="Enter phone number"
                          className="form-control form-control-lg"
                          id="number"
                          name="number"
                          type="number"
                          maxLength={10}
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                          }}
                        />
                      </div>
                    ) : (
                      <div className="mb-3">
                        <label className="form-label">
                          Enter OTP{" "}
                          <span className="text-primary">:-{totp}</span>
                        </label>
                        <input
                          maxLength={4}
                          minLength={4}
                          placeholder="Enter OTP"
                          className="form-control form-control-lg"
                          id="otp"
                          name="otp"
                          type="text"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                        />
                        <div className="text-end">
                          <button
                            type="button"
                            className="btn btn-primary-gradient p-1 mt-3"
                            onClick={handleResendOTP}
                            disabled={resendDisabled}
                          >
                            {resendDisabled
                              ? `Resend OTP- ${timer}s`
                              : "Resend OTP"}
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="mb-3 form-check-box mt-3">
                      <div className="form-group-flex">
                        <div className="form-check mb-0">
                          <input className="form-check-input" type="checkbox" />
                          <label className="form-check-label">
                            By clicking continue, you agree with our{" "}
                            <Link to="#">TnC</Link> and{" "}
                            <Link to="#">Privacy Policies</Link>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      {!showOTP ? (
                        <button
                          className="btn btn-primary-gradient w-100"
                          type="submit"
                          onClick={handleSignUpClick}
                        >
                          Login With OTP
                        </button>
                      ) : (
                        <button
                          onClick={handleVerifyOTP}
                          className="btn btn-primary-gradient w-100"
                          type="submit"
                        >
                          Verify OTP
                        </button>
                      )}
                    </div>

                    <div className="login-or">
                      <span className="or-line" />
                      <span className="span-or">or</span>
                    </div>
                    <div className="social-login-btn">
                      <a  className="btn w-100">
                        <img
                          src="assets/img/icons/google-icon.svg"
                          alt="google-icon"
                        />
                        Sign in With Google
                      </a>
                    </div>
                    <div className="account-signup">
                      <p>
                        Don't have an account ?{" "}
                        <Link to="/Register">Sign up</Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Login Tab Content */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
