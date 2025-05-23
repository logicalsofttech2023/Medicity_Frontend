import React from "react";
import Faq from "./Faq";

const Faqs = () => {
  return (
    <div>
      <div className="breadcrumb-bar">
        <div className="container">
          <div className="row align-items-center inner-banner">
            <div className="col-md-12 col-12 text-center">
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="index.html">
                      <i className="isax isax-home-15" />
                    </a>
                  </li>
                  <li className="breadcrumb-item active">FAQs</li>
                </ol>
                <h2 className="breadcrumb-title">FAQs</h2>
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

      <Faq />
    </div>
  );
};

export default Faqs;
