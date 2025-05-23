import React, { useEffect } from "react";
import Doctorscurated from "./Doctorscurated";
import Tophealthpackages from "./Tophealthpackages";
import Featuredfamilycarepackage from "./Featuredfamilycarepackage";
import Bestpackages from "./Bestpackages";
import Routinehealthcheckupmenwomen from "./Routinehealthcheckupmenwomen";
import RecentView from "./RecentView";
import { Link } from "react-router-dom";
import Faq from "./Faq";
import Blog from "./Blog";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = () => {

 

  
  return (
    <div className="main-wrapper">
      {/* Top Header */}
      {/* <Mainheader/> */}
      {/* /Header */}
      {/* Home Banner */}
      <section className="banner-section banner-sec-one">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <div className="banner-content aos" data-aos="fade-up">
                <div className="rating-appointment d-inline-flex align-items-center gap-2">
                  <div className="avatar-list-stacked avatar-group-lg">
                    <span className="avatar avatar-rounded">
                      <img
                        className="border border-white"
                        src="assets/img/doctors/doctor-thumb-22.jpg"
                        alt="img"
                      />
                    </span>
                    <span className="avatar avatar-rounded">
                      <img
                        className="border border-white"
                        src="assets/img/doctors/doctor-thumb-23.jpg"
                        alt="img"
                      />
                    </span>
                    <span className="avatar avatar-rounded">
                      <img
                        src="assets/img/doctors/doctor-thumb-24.jpg"
                        alt="img"
                      />
                    </span>
                  </div>
                  <div className="me-2">
                    <h6 className="mb-1">5K+ Appointments</h6>
                    <div className="d-flex align-items-center">
                      <div className="d-flex align-items-center">
                        <i className="fa-solid fa-star text-orange me-1" />
                        <i className="fa-solid fa-star text-orange me-1" />
                        <i className="fa-solid fa-star text-orange me-1" />
                        <i className="fa-solid fa-star text-orange me-1" />
                        <i className="fa-solid fa-star text-orange me-1" />
                      </div>
                      <p>5.0 Ratings</p>
                    </div>
                  </div>
                </div>
                <h1 className="display-5">
                  Blood Test at Home with Medicity
                  <span className="banner-icon">
                    <img src="assets/img/icons/video.svg" alt="img" />
                  </span>{" "}
                  <span className="text-gradient">Home Blood Sample</span>
                  Collection
                </h1>
                <div
                  style={{ width: "100%" }}
                  className="search-box-one aos"
                  data-aos="fade-up"
                >
                  <form action="/Doctorscurateddetails">
                    <div
                      style={{ width: "75%" }}
                      className="search-input search-line"
                    >
                      <i className="isax isax-search-normal  bficon " />
                      <div className=" mb-0">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search doctors, clinics, hospitals, etc"
                        />
                      </div>
                    </div>

                    <div className="form-search-btn">
                      <Link
                        to="/Doctorscurateddetails"
                        className="btn btn-primary"
                        type="submit"
                      >
                        <i className="isax isax-search-normal5 me-2" />
                        Search
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="banner-img aos" data-aos="fade-up">
                <img
                  src="assets/img/banner/banner-doctor.svg"
                  className="img-fluid"
                  alt="patient-image"
                />
                <div className="banner-appointment">
                  <h6>1K</h6>
                  <p>
                    Appointments <span className="d-block">Completed</span>
                  </p>
                </div>
                <div className="banner-patient">
                  <div className="avatar-list-stacked avatar-group-sm">
                    <span className="avatar avatar-rounded">
                      <img src="assets/img/patients/patient19.jpg" alt="img" />
                    </span>
                    <span className="avatar avatar-rounded">
                      <img src="assets/img/patients/patient16.jpg" alt="img" />
                    </span>
                    <span className="avatar avatar-rounded">
                      <img src="assets/img/patients/patient18.jpg" alt="img" />
                    </span>
                  </div>
                  <p>15K+</p>
                  <p>Satisfied Patients</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="banner-bg">
          <img
            src="assets/img/bg/banner-bg-02.png"
            alt="img"
            className="banner-bg-01"
          />
          <img
            src="assets/img/bg/banner-bg-03.png"
            alt="img"
            className="banner-bg-02"
          />
          <img
            src="assets/img/bg/banner-bg-04.png"
            alt="img"
            className="banner-bg-03"
          />
          <img
            src="assets/img/bg/banner-bg-05.png"
            alt="img"
            className="banner-bg-04"
          />
          <img
            src="assets/img/bg/banner-icon-01.svg"
            alt="img"
            className="banner-bg-05"
          />
          <img
            src="assets/img/bg/banner-icon-01.svg"
            alt="img"
            className="banner-bg-06"
          />
        </div>
      </section>
      {/* /Home Banner */}
      {/* List */}
      <div className="list-section">
        <div className="container">
          <div className="list-card card mb-0">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-center justify-content-xl-between flex-wrap gap-4 list-wraps">
                <Link
                  to="/Booking"
                  className="list-item aos"
                  data-aos="fade-up"
                >
                  <div className="list-icon bg-secondary">
                    <img src="assets/img/icons/list-icon-01.svg" alt="img" />
                  </div>
                  <h6>Book Appointment</h6>
                </Link>
                <Link
                  to="/Bookingappoinment"
                  className="list-item aos"
                  data-aos="fade-up"
                >
                  <div className="list-icon bg-primary">
                    <img src="assets/img/icons/list-icon-02.svg" alt="img" />
                  </div>
                  <h6>Booking</h6>
                </Link>
                <Link
                  to="/Reports"
                  className="list-item aos"
                  data-aos="fade-up"
                >
                  <div className="list-icon bg-pink">
                    <img src="assets/img/icons/list-icon-03.svg" alt="img" />
                  </div>
                  <h6>Reports</h6>
                </Link>
                <Link
                  to="/Vitals"
                  className="list-item aos"
                  data-aos="fade-up"
                >
                  <div className="list-icon bg-cyan">
                    <img src="assets/img/icons/list-icon-04.svg" alt="img" />
                  </div>
                  <h6>Vitals</h6>
                </Link>
                <a
                  href="#"
                  className="list-item aos"
                  data-aos="fade-up"
                >
                  <div className="list-icon bg-purple">
                    <img src="assets/img/icons/list-icon-05.svg" alt="img" />
                  </div>
                  <h6>Quality</h6>
                </a>
                <a
                  href="#"
                  className="list-item aos"
                  data-aos="fade-up"
                >
                  <div className="list-icon bg-orange">
                    <img src="assets/img/icons/list-icon-06.svg" alt="img" />
                  </div>
                  <h6>On-Time Services</h6>
                </a>
                <a
                  href="#"
                  className="list-item aos"
                  data-aos="fade-up"
                >
                  <div className="list-icon bg-teal">
                    <img src="assets/img/icons/list-icon-07.svg" alt="img" />
                  </div>
                  <h6>Availability</h6>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /List */}
      {/* Categories Section */}
      <section className="section categorie-section">
        <div className="container">
          <div className="pharmacy-section-header aos" data-aos="fade-up">
            <div className="row">
              <div className="col-md-12">
                <div className="pharmacy-title mb-0">
                  <h4>Are You Looking for a Test?</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 d-flex aos" data-aos="fade-up">
              <div className="categorie-card cash-card">
                <div className="categorie-details">
                  <h4>Select Health Package</h4>
                  <p>Book Now, Pay Later</p>
                </div>
                <div className="categorie-btn">
                  <Link to="/Doctorscurateddetails" className="btn">
                    <img
                      src="assets/img/icons/eventss.svg"
                      alt="Order Icon"
                      style={{ height: "20px" }}
                    />{" "}
                    Book Now
                  </Link>
                </div>
                <div className="categorie-shapes">
                  <div className="categorie-shape-top">
                    <img src="assets/img/shapes/shape-11.png" alt="Shape Img" />
                  </div>
                  <div className="categorie-shape-bottom">
                    <img src="assets/img/shapes/shape-12.png" alt="Shape Img" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 d-flex aos" data-aos="fade-up">
              <div className="categorie-card sale-card">
                <div className="categorie-details">
                  <h4>Upload Prescription</h4>
                  <p>Offer Prices in all medecines</p>
                </div>
                <div className="categorie-btn">
                  <Link to="/Descriptions" className="btn">
                    Upload Now
                    <img
                      src="assets/img/icons/uploadsvg.svg"
                      alt="Order Icon"
                      style={{ height: "20px" }}
                    />
                  </Link>
                </div>
                <div className="categorie-shapes">
                  <div className="categorie-shape-top">
                    <img src="assets/img/shapes/shape-11.png" alt="Shape Img" />
                  </div>
                  <div className="categorie-shape-bottom">
                    <img src="assets/img/shapes/shape-12.png" alt="Shape Img" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* /Categories Section */}
      {/* Speciality Section */}
      <Doctorscurated />
      {/* /Speciality Section */}
      {/* Doctor Section */}
      <Tophealthpackages />

      
      {/* /Doctor Section */}
      {/* Benifit Section */}
      <section className="benifit-section">
        <div className="bg-shapes">
          <img
            src="assets/img/bg/benefit-bg.png"
            alt="image"
            className="img-fluid"
          />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-head-twelve" data-aos="fade-up">
                <h2>
                  Labs Healthy India ki <span> Trusted Lab</span>
                </h2>
                <p>
                  At Our Labs, we have a single goal: to give India its right to
                  quality diagnostics.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-sm-6 d-flex aos" data-aos="fade-up">
              <div className="benifit-wrap flex-fill">
                <span>
                  <img src="assets/img/icons/benefit-icon-01.svg" alt="img" />
                </span>
                <h5>70,00,000+</h5>
                <p>Customers served</p>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 d-flex aos" data-aos="fade-up">
              <div className="benifit-wrap flex-fill">
                <span>
                  <img src="assets/img/icons/benefit-icon-02.svg" alt="img" />
                </span>
                <h5>70,000+</h5>
                <p>Tests Processed Everyday</p>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 d-flex aos" data-aos="fade-up">
              <div className="benifit-wrap flex-fill">
                <span>
                  <img src="assets/img/icons/benefit-icon-03.svg" alt="img" />
                </span>
                <h5>1000+</h5>
                <p>Home Collection Experts</p>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 d-flex aos" data-aos="fade-up">
              <div className="benifit-wrap flex-fill">
                <span>
                  <img src="assets/img/icons/benefit-icon-04.svg" alt="img" />
                </span>
                <h5>Qualified Doctors</h5>
                <p>Urgent Help When You Need It Most</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* /Benifit Section */}
      {/* Feature Packages Section */}
      <Featuredfamilycarepackage />
      {/* /Feature Packages Section */}
      {/* Best Packages Section */}
      <Bestpackages />
      {/* /Best Packages Section */}
      {/* Deals Section */}
      <Routinehealthcheckupmenwomen />
      {/* /Deals Section */}
      {/* Services Section */}
      <section className="services-section aos" data-aos="fade-up">
        <div
          className="horizontal-slide d-flex"
          data-direction="right"
          data-speed="slow"
        >
          <div className="slide-list d-flex gap-4">
            <div className="services-slide">
              <h6>
                <a href="javascript:void(0);">
                  Multi Speciality Treatments &amp; Doctors
                </a>
              </h6>
            </div>
            <div className="services-slide">
              <h6>
                <a href="javascript:void(0);">Lab Testing Services</a>
              </h6>
            </div>
            <div className="services-slide">
              <h6>
                <a href="javascript:void(0);">Medecines &amp; Supplies</a>
              </h6>
            </div>
            <div className="services-slide">
              <h6>
                <a href="javascript:void(0);">Hospitals &amp; Clinics</a>
              </h6>
            </div>
            <div className="services-slide">
              <h6>
                <a href="javascript:void(0);">Health Care Services</a>
              </h6>
            </div>
            <div className="services-slide">
              <h6>
                <a href="javascript:void(0);">Talk to Doctors</a>
              </h6>
            </div>
            <div className="services-slide">
              <h6>
                <a href="javascript:void(0);">Home Care Services</a>
              </h6>
            </div>
          </div>
        </div>
      </section>

      <section className="bookus-section bg-dark">
        <div className="container">
          <div className="row align-items-center row-gap-4">
            <div className="col-lg-6">
              <div className="bookus-img">
                <div className="row g-3">
                  <div className="col-md-12 aos" data-aos="fade-up">
                    <img
                      src="assets/img/book-01.jpg"
                      alt="img"
                      className="img-fluid"
                    />
                  </div>
                  <div className="col-sm-6 aos" data-aos="fade-up">
                    <img
                      src="assets/img/book-02.jpg"
                      alt="img"
                      className="img-fluid"
                    />
                  </div>
                  <div className="col-sm-6 aos" data-aos="fade-up">
                    <img
                      src="assets/img/book-03.jpg"
                      alt="img"
                      className="img-fluid"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div
                className="section-header sec-header-one mb-2 aos"
                data-aos="fade-up"
              >
                <span className="badge badge-primary">Why Book With Us</span>
                <h2 className="text-white mb-3">
                  We are committed to understanding your{" "}
                  <span className="text-primary-gradient">
                    unique needs and delivering care.
                  </span>
                </h2>
              </div>
              <p className="text-light mb-4">
                As a trusted healthAs a trusted healthcare provider in our
                community, we are passionate about promoting health and wellness
                beyond the clinic. We actively engage in community outreach
                programs, health fairs, and educational workshop.
              </p>
              <div className="faq-info aos" data-aos="fade-up">
                <div className="accordion" id="faq-details">
                  {/* FAQ Item */}
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                      <a
                        href="javascript:void(0);"
                        className="accordion-button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        01 . Our Vision
                      </a>
                    </h2>
                    <div
                      id="collapseOne"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingOne"
                      data-bs-parent="#faq-details"
                    >
                      <div className="accordion-body">
                        <div className="accordion-content">
                          <p>
                            We envision a community where everyone has access to
                            high-quality healthcare and the resources they need
                            to lead healthy, fulfilling lives.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /FAQ Item */}
                  {/* FAQ Item */}
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                      <a
                        href="javascript:void(0);"
                        className="accordion-button collapsed"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-controls="collapseTwo"
                      >
                        02 . Our Mission
                      </a>
                    </h2>
                    <div
                      id="collapseTwo"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingTwo"
                      data-bs-parent="#faq-details"
                    >
                      <div className="accordion-body">
                        <div className="accordion-content">
                          <p>
                            We envision a community where everyone has access to
                            high-quality healthcare and the resources they need
                            to lead healthy, fulfilling lives.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /FAQ Item */}
                </div>
              </div>
            </div>
          </div>
          <div className="bookus-sec">
            <div className="row g-4">
              <div className="col-lg-3">
                <div className="book-item">
                  <div className="book-icon bg-primary">
                    <i className="isax isax-search-normal5" />
                  </div>
                  <div className="book-info">
                    <h6 className="text-white mb-2">Search For Tests</h6>
                    <p className="fs-14 text-light">
                      Search for a doctor based on specialization, location, or
                      availability for your Treatements
                    </p>
                  </div>
                  <div className="way-icon">
                    <img src="assets/img/icons/way-icon.svg" alt="img" />
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="book-item">
                  <div className="book-icon bg-orange">
                    <i className="isax isax-security-user5" />
                  </div>
                  <div className="book-info">
                    <h6 className="text-white mb-2">Check  Profile</h6>
                    <p className="fs-14 text-light">
                      Explore detailed profiles on our platform to make
                      informed healthcare decisions.
                    </p>
                  </div>
                  <div className="way-icon">
                    <img src="assets/img/icons/way-icon.svg" alt="img" />
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="book-item">
                  <div className="book-icon bg-cyan">
                    <i className="isax isax-calendar5" />
                  </div>
                  <div className="book-info">
                    <h6 className="text-white mb-2">Schedule Appointment</h6>
                    <p className="fs-14 text-light">
                      After choose your preferred doctor, select a convenient
                      time slot, &amp; confirm your appointment.
                    </p>
                  </div>
                  <div className="way-icon">
                    <img src="assets/img/icons/way-icon.svg" alt="img" />
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="book-item">
                  <div className="book-icon bg-indigo">
                    <i className="isax isax-blend5" />
                  </div>
                  <div className="book-info">
                    <h6 className="text-white mb-2">Get Your Solution</h6>
                    <p className="fs-14 text-light">
                      Discuss your health concerns with the doctor and receive
                      the personalized advice &amp; with solution.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* /Bookus Section */}
      {/* Doctor Recently Viewed */}
      <RecentView />
      {/* /Doctor Recently Viewed Section */}
      {/* Blog Section */}
      {/* <section className="our-blog-fourteen">
        <div className="section-bg">
          <img src="assets/img/bg/blog-bg-14.png" alt="Img" />
        </div>
        <div className="container">
          <div className="section-header sec-header-one">
            <h2>
              Recent <span> Articles </span>
            </h2>
          </div>
          <div className="blog-slide-fourteen owl-carousel">
            <div
              className="blog-grid-fourteen"
              data-aos="fade-up"
              data-aos-delay={500}
            >
              <div className="blog-grig-img">
                <Link to="/Blogdetails">
                  <img src="assets/img/blog/blog-18.jpg" alt="Img" />
                </Link>
              </div>
              <div className="blog-grid-content">
                <div className="grid-head">
                  <span className="badge badge-blue">Health and Safety</span>
                  <span>01 May 2024</span>
                </div>
                <h4>
                  <Link to="/Blogdetails">
                    Adapting Homes for Aging Gracefully: Design Tips for Old Age
                    Comfort
                  </Link>
                </h4>
                <p>
                  Explore practical design tips to make living spaces in old age
                  homes adaptable and comfortable, enhancing the quality of life
                  for seniors. Learn about accessibility, safety features, and
                  creating a warm environment.
                </p>
                <div className="grid-footer">
                  <span>
                    <i className="feather-eye" />
                    1k views
                  </span>
                  <Link to="/Blogdetails">
                    Read More
                    <i className="feather-arrow-right-circle" />
                  </Link>
                </div>
              </div>
            </div>
            <div
              className="blog-grid-fourteen"
              data-aos="fade-up"
              data-aos-delay={600}
            >
              <div className="blog-grig-img">
                <Link to="/Blogdetails">
                  <img src="assets/img/blog/blog-19.jpg" alt="Img" />
                </Link>
              </div>
              <div className="blog-grid-content">
                <div className="grid-head">
                  <span className="badge badge-pink">Caregiving</span>
                  <span>06 May 2024</span>
                </div>
                <h4>
                  <Link to="/Blogdetails">
                    Navigating the Transition: A Guide to Choosing the Right Old
                    Age Home
                  </Link>
                </h4>
                <p>
                  Explore factors to consider when selecting age home, ensuring
                  a seamless transition for your loved ones. Gain insights into
                  facility options, care services, and creating a supportive
                  environment.
                </p>
                <div className="grid-footer">
                  <span>
                    <i className="feather-eye" />
                    850 views
                  </span>
                  <Link to="/Blogdetails">
                    Read More
                    <i className="feather-arrow-right-circle" />
                  </Link>
                </div>
              </div>
            </div>
            <div
              className="blog-grid-fourteen"
              data-aos="fade-up"
              data-aos-delay={700}
            >
              <div className="blog-grig-img">
                <Link to="/Blogdetails">
                  <img src="assets/img/blog/blog-20.jpg" alt="Img" />
                </Link>
              </div>
              <div className="blog-grid-content">
                <div className="grid-head">
                  <span className="badge badge-info">Physiotherapy</span>
                  <span>10 May 2024</span>
                </div>
                <h4>
                  <Link to="/Blogdetails">
                    Empowering Aging Bodies: The Impact of Physiotherapy in Old
                    Age Home Wellness
                  </Link>
                </h4>
                <p>
                  Discover the transformative effects of physiotherapy in home
                  care, focusing on tailored interventions that address mobility
                  challenges, pain management, and overall physical health for
                  elderly residents.
                </p>
                <div className="grid-footer">
                  <span>
                    <i className="feather-eye" />
                    4.5k views
                  </span>
                  <Link to="/Blogdetails">
                    Read More
                    <i className="feather-arrow-right-circle" />
                  </Link>
                </div>
              </div>
            </div>
            <div
              className="blog-grid-fourteen"
              data-aos="fade-up"
              data-aos-delay={800}
            >
              <div className="blog-grig-img">
                <Link to="/Blogdetails">
                  <img src="assets/img/blog/blog-18.jpg" alt="Img" />
                </Link>
              </div>
              <div className="blog-grid-content">
                <div className="grid-head">
                  <span className="badge badge-pink">Health and Safety</span>
                  <span>01 May 2024</span>
                </div>
                <h4>
                  <Link to="/Blogdetails">
                    Adapting Homes for Aging Gracefully: Design Tips for Old Age
                    Comfort
                  </Link>
                </h4>
                <p>
                  Explore practical design tips to make living spaces in old age
                  homes adaptable and comfortable, enhancing the quality of life
                  for seniors. Learn about accessibility, safety features, and
                  creating a warm environment.
                </p>
                <div className="grid-footer">
                  <span>
                    <i className="feather-eye" />
                    1k views
                  </span>
                  <Link to="/Blogdetails">
                    Read More
                    <i className="feather-arrow-right-circle" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="owl-nav-button">
            <div className="owl-nav blog-slide-nav nav-control" />
            <Link to="Bloglist" className="view-all">
              View All Blogs
            </Link>
          </div>
        </div>
      </section> */}
      {/* /Blog Section */}
      {/* Testimonial Section */}
      {/* <section className="testimonial-section-one">
        <div className="container">
          <div className="section-header sec-header-one" data-aos="fade-up">
            <h2>What Doctors Are Saying</h2>
          </div>
         
          <div
            className="owl-carousel testimonials-slider aos"
            data-aos="fade-up"
          >
            <div className="card shadow-none mb-0">
              <div className="card-body">
                <div className="d-flex align-items-center mb-4">
                  <div className="rating d-flex">
                    <i className="fa-solid fa-star filled me-1" />
                    <i className="fa-solid fa-star filled me-1" />
                    <i className="fa-solid fa-star filled me-1" />
                    <i className="fa-solid fa-star filled me-1" />
                    <i className="fa-solid fa-star filled" />
                  </div>
                  <span>
                    <img src="assets/img/icons/quote-icon.svg" alt="img" />
                  </span>
                </div>
                <h6 className="fs-16 fw-medium mb-2">Nice Treatment</h6>
                <p>
                  I had a wonderful experience the staff was friendly and
                  attentive, and Dr. Smith took the time to explain everything
                  clearly.
                </p>
                <div className="d-flex align-items-center">
                  <a href="javascript:void(0);" className="avatar avatar-lg">
                    <img
                      src="assets/img/patients/patient22.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </a>
                  <div className="ms-2">
                    <h6 className="mb-1">
                      <a href="javascript:void(0);">Deny Hendrawan</a>
                    </h6>
                    <p className="fs-14 mb-0">United States</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card shadow-none mb-0">
              <div className="card-body">
                <div className="d-flex align-items-center mb-4">
                  <div className="rating d-flex">
                    <i className="fa-solid fa-star filled me-1" />
                    <i className="fa-solid fa-star filled me-1" />
                    <i className="fa-solid fa-star filled me-1" />
                    <i className="fa-solid fa-star filled me-1" />
                    <i className="fa-solid fa-star filled" />
                  </div>
                  <span>
                    <img src="assets/img/icons/quote-icon.svg" alt="img" />
                  </span>
                </div>
                <h6 className="fs-16 fw-medium mb-2">Good Hospitability</h6>
                <p>
                  Genuinely cares about his patients. He helped me understand my
                  condition and worked with me to create a plan.
                </p>
                <div className="d-flex align-items-center">
                  <a href="javascript:void(0);" className="avatar avatar-lg">
                    <img
                      src="assets/img/patients/patient21.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </a>
                  <div className="ms-2">
                    <h6 className="mb-1">
                      <a href="javascript:void(0);">Johnson DWayne</a>
                    </h6>
                    <p className="fs-14 mb-0">United States</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card shadow-none mb-0">
              <div className="card-body">
                <div className="d-flex align-items-center mb-4">
                  <div className="rating d-flex">
                    <i className="fa-solid fa-star filled me-1" />
                    <i className="fa-solid fa-star filled me-1" />
                    <i className="fa-solid fa-star filled me-1" />
                    <i className="fa-solid fa-star filled me-1" />
                    <i className="fa-solid fa-star filled" />
                  </div>
                  <span>
                    <img src="assets/img/icons/quote-icon.svg" alt="img" />
                  </span>
                </div>
                <h6 className="fs-16 fw-medium mb-2">Nice Treatment</h6>
                <p>
                  I had a great experience with Dr. Chen. She was not only
                  professional but also made me feel comfortable discussing.
                </p>
                <div className="d-flex align-items-center">
                  <a href="javascript:void(0);" className="avatar avatar-lg">
                    <img
                      src="assets/img/patients/patient.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </a>
                  <div className="ms-2">
                    <h6 className="mb-1">
                      <a href="javascript:void(0);">Rayan Smith</a>
                    </h6>
                    <p className="fs-14 mb-0">United States</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card shadow-none mb-0">
              <div className="card-body">
                <div className="d-flex align-items-center mb-4">
                  <div className="rating d-flex">
                    <i className="fa-solid fa-star filled me-1" />
                    <i className="fa-solid fa-star filled me-1" />
                    <i className="fa-solid fa-star filled me-1" />
                    <i className="fa-solid fa-star filled me-1" />
                    <i className="fa-solid fa-star filled" />
                  </div>
                  <span>
                    <img src="assets/img/icons/quote-icon.svg" alt="img" />
                  </span>
                </div>
                <h6 className="fs-16 fw-medium mb-2">Excellent Service</h6>
                <p>
                  I had a wonderful experience the staff was friendly and
                  attentive, and Dr. Smith took the time to explain everything
                  clearly.
                </p>
                <div className="d-flex align-items-center">
                  <a href="javascript:void(0);" className="avatar avatar-lg">
                    <img
                      src="assets/img/patients/patient23.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </a>
                  <div className="ms-2">
                    <h6 className="mb-1">
                      <a href="javascript:void(0);">Sofia Doe</a>
                    </h6>
                    <p className="fs-14 mb-0">United States</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
         
        </div>
      </section> */}
      <Blog />
      {/* /Testimonial Section */}
      <Faq />

      <div className="mouse-cursor cursor-outer" />
      <div className="mouse-cursor cursor-inner" />
    </div>
  );
};

export default Home;
