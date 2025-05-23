import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer inner-footer footer-info">
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-9 col-md-5">
              <div className="row">
                <div className="col-lg-3 col-md-3">
                  <div className="footer-widget footer-menu">
                    <h6 className="footer-title">Health Checkups</h6>
                    <p>
                      Comprehensive health checkup packages for early disease
                      detection and better wellness.
                    </p>
                    <ul>
                      <li>
                        <Link to={"/Doctorscurateddetails"}>Full Body Checkup</Link>
                      </li>
                      <li>
                        <Link to={"/Doctorscurateddetails"}>Diabetes Test</Link>
                      </li>
                      <li>
                        <Link to={"/Doctorscurateddetails"}>Heart Health Screening</Link>
                      </li>
                      <li>
                        <Link to={"/Doctorscurateddetails"}>Liver Function Test</Link>
                      </li>
                      <li>
                        <Link to={"/Doctorscurateddetails"}>Kidney Function Test</Link>
                      </li>
                      <li>
                        <Link to={"/Doctorscurateddetails"}>Thyroid Profile</Link>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="col-lg-3 col-md-3">
                  <div className="footer-widget footer-menu">
                    <h6 className="footer-title">Quick Links</h6>
                    <ul>
                      <li>
                        <Link to={"/aboutUs"}>About</Link>
                      </li>
                      <li>
                        <a >Careers</a>
                      </li>
                      <li>
                        <a>Our Labs</a>
                      </li>
                      <li>
                        <a>ESG Practices</a>
                      </li>
                      <li>
                        <a>Collection Centres</a>
                      </li>
                      <li>
                        <a>Have a Query</a>
                      </li>
                      
                      
                      <li>
                        <Link to={"/faqs"}>FAQs</Link>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="col-lg-3 col-md-3">
                  <div className="footer-widget footer-menu">
                    <h6 className="footer-title">
                      Health Checkups & Diagnostics
                    </h6>

                    <ul>
                      <li>
                        <Link to={"/Doctorscurateddetails"} >Complete Blood Test</Link>
                      </li>
                      <li>
                        <Link to={"/Doctorscurateddetails"}>Hormone Analysis</Link>
                      </li>
                      <li>
                        <Link to={"/Doctorscurateddetails"}>Arthritis Screening</Link>
                      </li>
                      <li>
                        <Link to={"/Doctorscurateddetails"}>Lung Function Test</Link>
                      </li>
                      <li>
                        <Link to={"/Doctorscurateddetails"} >
                          Stress & Anxiety Assessment
                        </Link>
                      </li>
                      <li>
                        <Link to={"/Doctorscurateddetails"}>Allergy & Immunity Test</Link>
                      </li>
                      <li>
                        <Link to={"/Doctorscurateddetails"}>Cancer Risk Evaluation</Link>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="col-lg-3 col-md-3">
                  <div className="footer-widget footer-menu">
                    <h6 className="footer-title">Connect with us</h6>
                    <ul>
                      <li>
                        <Link to={"/contactUs"}>Contact</Link>
                      </li>
                      <li>
                        <Link to={"/membership"} >Premium Membership</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-7">
              <div className="footer-widget">
                <div className="social-icon">
                  <h6 className="mb-3">Follow us on</h6>
                  <ul>
                    <li>
                      <a >
                        <i className="fa-brands fa-facebook" />
                      </a>
                    </li>
                    <li>
                      <a >
                        <i className="fa-brands fa-x-twitter" />
                      </a>
                    </li>
                    <li>
                      <a >
                        <i className="fa-brands fa-instagram" />
                      </a>
                    </li>
                    <li>
                      <a >
                        <i className="fa-brands fa-linkedin" />
                      </a>
                    </li>
                    <li>
                      <a >
                        <i className="fa-brands fa-pinterest" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bg">
          <img
            src="http://157.66.191.24:74/assets/img/bg/footer-bg-01.png"
            alt="img"
            className="footer-bg-01"
          />
          <img
            src="http://157.66.191.24:74/assets/img/bg/footer-bg-02.png"
            alt="img"
            className="footer-bg-02"
          />
          <img
            src="http://157.66.191.24:74/assets/img/bg/footer-bg-03.png"
            alt="img"
            className="footer-bg-03"
          />
          <img
            src="http://157.66.191.24:74/assets/img/bg/footer-bg-04.png"
            alt="img"
            className="footer-bg-04"
          />
          <img
            src="http://157.66.191.24:74/assets/img/bg/footer-bg-05.png"
            alt="img"
            className="footer-bg-05"
          />
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          {/* Copyright */}
          <div className="copyright">
            <div className="copyright-text">
              <p className="mb-0">
                Copyright © 2025 Logical Softtech. All Rights Reserved
              </p>
            </div>
            {/* Copyright Menu */}
            <div className="copyright-menu">
              <ul className="policy-menu">
                <li>
                  <Link to="/legalNotice">Legal Notice</Link>
                </li>
                <li>
                  <Link to="/privacyPolicy">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/refundPolicy">Refund Policy</Link>
                </li>
              </ul>
            </div>
            {/* /Copyright Menu */}
            <ul className="payment-method">
              <li>
                <a >
                  <img
                    src="http://157.66.191.24:74/assets/img/icons/card-01.svg"
                    alt="Img"
                  />
                </a>
              </li>
              <li>
                <a >
                  <img
                    src="http://157.66.191.24:74/assets/img/icons/card-02.svg"
                    alt="Img"
                  />
                </a>
              </li>
              <li>
                <a >
                  <img
                    src="http://157.66.191.24:74/assets/img/icons/card-03.svg"
                    alt="Img"
                  />
                </a>
              </li>
              <li>
                <a >
                  <img
                    src="http://157.66.191.24:74/assets/img/icons/card-04.svg"
                    alt="Img"
                  />
                </a>
              </li>
              <li>
                <a >
                  <img
                    src="http://157.66.191.24:74/assets/img/icons/card-05.svg"
                    alt="Img"
                  />
                </a>
              </li>
              <li>
                <a >
                  <img
                    src="http://157.66.191.24:74/assets/img/icons/card-06.svg"
                    alt="Img"
                  />
                </a>
              </li>
            </ul>
          </div>
          {/* /Copyright */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
