import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Error = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/assets/js/theme-script.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="container-fluid p-0">
      <div className="w-100 overflow-hidden position-relative flex-wrap d-block vh-100">
        <div className="row justify-content-center align-items-center vh-100 overflow-auto flex-wrap">
          <div className="col-lg-8 col-md-12 text-center">
            <div className="error-info">
              <div className="error-404-img">
                <img
                  src="/assets/img/error-404.png"
                  className="img-fluid"
                  alt="error-404-image"
                />
                <div className="error-content">
                  <h5 className="mb-2">Oops! That Page Can’t Be Found.</h5>
                  <p>The page you are looking for never existed.</p>
                  <a href="/" className="btn btn-primary-gradient btn-sm">
                    Back to Home
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;
