import React from "react";
import { Link } from "react-router-dom";
import footerImg1 from "./footer-bg-01.png";
import footerImg2 from "./footer-bg-02.png";
import footerImg3 from "./footer-bg-03.png";
import footerImg4 from "./footer-bg-04.png";
import footerImg5 from "./footer-bg-05.png";

const Footer = () => {
  return (
    <footer className="footer inner-footer footer-info">
  {/* Floating Call Button */}
  <div
    style={{
      position: "fixed",
      right: "20px",
      bottom: "70px",
      zIndex: "9999",
      transition: "all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)",
      transform: "translateY(0)",
      filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.2))",
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = "translateY(-5px)";
      e.currentTarget.style.filter = "drop-shadow(0 6px 16px rgba(0,0,0,0.3))";
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.filter = "drop-shadow(0 4px 12px rgba(0,0,0,0.2))";
    }}
  >
    <a
      href="tel:7099060888"
      style={{
        background: "linear-gradient(135deg, #2a7de1 0%, #1a5bbf 100%)",
        color: "white",
        padding: "16px 20px",
        borderRadius: "50px",
        textDecoration: "none",
        fontWeight: "700",
        fontSize: "16px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        boxShadow: "0 8px 24px rgba(42, 125, 225, 0.3)",
        transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
        border: "2px solid rgba(255,255,255,0.15)",
        textTransform: "uppercase",
        letterSpacing: "1px",
        lineHeight: "1.3",
        position: "relative",
        zIndex: "99999",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.background = "linear-gradient(135deg, #1f6fd8 0%, #154ea0 100%)";
        e.currentTarget.style.boxShadow = "0 12px 24px rgba(42, 125, 225, 0.4)";
        e.currentTarget.style.transform = "scale(1.02)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.background = "linear-gradient(135deg, #2a7de1 0%, #1a5bbf 100%)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(42, 125, 225, 0.3)";
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.25)",
          borderRadius: "50%",
          width: "44px",
          height: "44px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          transition: "all 0.3s ease",
        }}
      >
        <i
          className="fas fa-phone-alt"
          style={{
            fontSize: "18px",
            transform: "rotate(15deg)",
            transition: "transform 0.3s ease",
          }}
        ></i>
      </div>
      <div style={{ textAlign: "left" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: "12px",
            opacity: "0.9",
            fontWeight: "600",
            lineHeight: "1.2",
            letterSpacing: "0.5px",
          }}
        >
          <span>CALL TO BOOK</span>
          <span style={{ fontSize: "14px", marginTop: "2px" }}>709-906-0888</span>
        </div>
      </div>
    </a>
  </div>

  {/* Footer Content */}
  <div className="footer-top" style={{ backgroundColor: "#f9fafc", padding: "60px 0 30px" }}>
    <div className="container">
      <div className="row">
        <div className="col-lg-9 col-md-5">
          <div className="row">
            <div className="col-lg-4 col-md-4 mb-4">
              <div className="footer-widget footer-menu">
                <h6 className="footer-title" style={{ color: "#2a7de1", fontSize: "18px", marginBottom: "20px", fontWeight: "700" }}>
                  Health Checkups
                </h6>
                <p style={{ color: "#6c757d", marginBottom: "20px", lineHeight: "1.6" }}>
                  Comprehensive health checkup packages for early disease detection and better wellness.
                </p>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  <li style={{ marginBottom: "10px" }}>
                    <Link to={"/Doctorscurateddetails"} style={{ color: "#495057", textDecoration: "none", transition: "color 0.2s", fontWeight: "500" }}>
                      Full Body Checkup
                    </Link>
                  </li>
                  <li style={{ marginBottom: "10px" }}>
                    <Link to={"/Doctorscurateddetails"} style={{ color: "#495057", textDecoration: "none", transition: "color 0.2s", fontWeight: "500" }}>
                      Diabetes Test
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-4 col-md-4 mb-4">
              <div className="footer-widget footer-menu">
                <h6 className="footer-title" style={{ color: "#2a7de1", fontSize: "18px", marginBottom: "20px", fontWeight: "700" }}>
                  Quick Links
                </h6>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  <li style={{ marginBottom: "10px" }}>
                    <Link to={"/aboutUs"} style={{ color: "#495057", textDecoration: "none", transition: "color 0.2s", fontWeight: "500" }}>
                      About
                    </Link>
                  </li>
                  <li style={{ marginBottom: "10px" }}>
                    <a style={{ color: "#495057", textDecoration: "none", transition: "color 0.2s", fontWeight: "500", cursor: "pointer" }}>
                      Careers
                    </a>
                  </li>
                  <li style={{ marginBottom: "10px" }}>
                    <a style={{ color: "#495057", textDecoration: "none", transition: "color 0.2s", fontWeight: "500", cursor: "pointer" }}>
                      Our Labs
                    </a>
                  </li>
                  <li style={{ marginBottom: "10px" }}>
                    <a style={{ color: "#495057", textDecoration: "none", transition: "color 0.2s", fontWeight: "500", cursor: "pointer" }}>
                      Have a Query
                    </a>
                  </li>
                  <li style={{ marginBottom: "10px" }}>
                    <Link to={"/faqs"} style={{ color: "#495057", textDecoration: "none", transition: "color 0.2s", fontWeight: "500" }}>
                      FAQs
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-4 col-md-4 mb-4">
              <div className="footer-widget footer-menu">
                <h6 className="footer-title" style={{ color: "#2a7de1", fontSize: "18px", marginBottom: "20px", fontWeight: "700" }}>
                  Connect with us
                </h6>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  <li style={{ marginBottom: "10px" }}>
                    <Link to={"/contactUs"} style={{ color: "#495057", textDecoration: "none", transition: "color 0.2s", fontWeight: "500" }}>
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-lg-3 col-md-7 mb-4">
          <div className="footer-widget">
            <div className="social-icon">
              <h6 className="mb-3" style={{ color: "#2a7de1", fontSize: "18px", fontWeight: "700" }}>
                Follow us on
              </h6>
              <ul style={{ display: "flex", gap: "15px", padding: 0, listStyle: "none" }}>
                <li>
                  <a style={{ 
                    color: "#6c757d", 
                    fontSize: "20px", 
                    transition: "all 0.3s",
                    ":hover": { color: "#2a7de1", transform: "translateY(-3px)" }
                  }}>
                    <i className="fa-brands fa-facebook" />
                  </a>
                </li>
                <li>
                  <a style={{ 
                    color: "#6c757d", 
                    fontSize: "20px", 
                    transition: "all 0.3s",
                    ":hover": { color: "#2a7de1", transform: "translateY(-3px)" }
                  }}>
                    <i className="fa-brands fa-x-twitter" />
                  </a>
                </li>
                <li>
                  <a style={{ 
                    color: "#6c757d", 
                    fontSize: "20px", 
                    transition: "all 0.3s",
                    ":hover": { color: "#2a7de1", transform: "translateY(-3px)" }
                  }}>
                    <i className="fa-brands fa-instagram" />
                  </a>
                </li>
                <li>
                  <a style={{ 
                    color: "#6c757d", 
                    fontSize: "20px", 
                    transition: "all 0.3s",
                    ":hover": { color: "#2a7de1", transform: "translateY(-3px)" }
                  }}>
                    <i className="fa-brands fa-linkedin" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-4 pt-3 border-top" style={{ borderColor: "#e9ecef !important" }}>
            <h6 className="mb-3" style={{ color: "#2a7de1", fontSize: "18px", fontWeight: "700" }}>
              Our Location
            </h6>
            <div className="d-flex mb-3">
              <i className="fas fa-map-marker-alt text-primary mt-1 me-3" style={{ color: "#2a7de1" }}></i>
              <p className="text-muted mb-0" style={{ lineHeight: "1.6" }}>
                Ground Floor, FIEE Complex, A-19, Block A, Okhla Phase II, 
                Okhla Industrial Estate, New Delhi, Delhi 110020
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="footer-bg">
      <img src={footerImg1} alt="img" className="footer-bg-01" />
      <img src={footerImg2} alt="img" className="footer-bg-02" />
      <img src={footerImg3} alt="img" className="footer-bg-03" />
      <img src={footerImg4} alt="img" className="footer-bg-04" />
      <img src={footerImg5} alt="img" className="footer-bg-05" />
    </div>
  </div>
  
  {/* Footer Bottom */}
  <div className="footer-bottom" style={{ backgroundColor: "#2a7de1", padding: "20px 0" }}>
    <div className="container">
      <div className="copyright" style={{ display: "flex", flexDirection: "raw", alignItems: "center", textAlign: "center" }}>
        <div className="copyright-text">
          <p className="mb-2" style={{ color: "rgba(255,255,255,0.8)", fontSize: "14px" }}>
            Copyright © 2025 Logical Softtech. All Rights Reserved
          </p>
        </div>
        <div className="copyright-menu">
          <ul className="policy-menu" style={{ display: "flex", gap: "20px", padding: 0, listStyle: "none", margin: 0 }}>
            <li>
              <Link to="/legalNotice" style={{ color: "white", textDecoration: "none", fontSize: "14px", fontWeight: "500" }}>
                Legal Notice
              </Link>
            </li>
            <li>
              <Link to="/privacyPolicy" style={{ color: "white", textDecoration: "none", fontSize: "14px", fontWeight: "500" }}>
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</footer>
  );
};

export default Footer;
