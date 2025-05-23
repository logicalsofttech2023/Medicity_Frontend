import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useLocation } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

const Healthmenwomen = () => {
  const location = useLocation();
  const { minAge, maxAge, gender } = location.state || {};
  const [CategoryresDetailsList, setCategoryresDetailsList] = useState();
  useEffect(() => {
    GetpackageCategoryList(minAge, maxAge, gender);
    window.scrollTo(0, 0);
  }, []);
  const GetpackageCategoryList = (minAge, maxAge, gender) => {
    const data = {
      age1: minAge,
      age2: maxAge || 200,
      gender,
    };
    axios
      .post(
        `${process.env.REACT_APP_API_KEY}filterPackagesByAgeAndGender`,
        data
      )
      .then((res) => {
        setCategoryresDetailsList(res.data.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  let userId = secureLocalStorage.getItem("medicityuser");

  const handleSubmit = (id) => {
    if (!userId) {
      toast.error("Please Login First");

      return;
    }
    const formData = {
      userId: userId,
      packageId: id,
    };

    axios
      .post(`${process.env.REACT_APP_API_KEY}addToCart`, formData)
      .then((res) => {
        GetpackageCategoryList();
        toast.success(res?.data?.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  return (
    <div>
      <Toaster />
      <div>
        <div className="breadcrumb-bar overflow-visible">
          <div className="container">
            <div className="row align-items-center inner-banner">
              <div className="col-md-12 col-12">
                <nav aria-label="breadcrumb" className="page-breadcrumb">
                  <ol
                    style={{ justifyContent: "start" }}
                    className="breadcrumb"
                  >
                    <li className="breadcrumb-item">
                      <a href="/">
                        <i className="isax isax-home-15" />
                      </a>
                    </li>
                    <li className="breadcrumb-item">Health Checkup</li>
                    <li className="breadcrumb-item active">Routine Checkups</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
        {/* /Breadcrumb */}
        <div className="content mt-0 pt-3">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="row align-items-center">
                  <div className="col-md-12">
                    <div className="mb-4">
                      <h3>
                        Routine{" "}
                        <span className="text-secondary">
                          "Health Checkups"
                        </span>{" "}
                        for Men & Women in{" "}
                        <span className="text-secondary">Bhopal</span> City
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <img
                    style={{ borderRadius: "10px" }}
                    src="https://redcliffelabs.com/_next/image?url=https%3A%2F%2Fstatic-redcliffelabs.s3.amazonaws.com%2Fmedia%2Fgallary-file%2FNone%2Fbce53f4e-fbfc-4141-a6d6-afe59b1757a2.jpg&w=1200&q=75"
                  />
                </div>

                <div className="row">
                  {CategoryresDetailsList?.map((data) => {
                    return (
                      <div className="col-xxl-6 col-md-6 mb-3">
                        <div style={{ height: "100%" }} className="card">
                          <div className="card-img border-bottom card-img-hover">
                            <div className="d-flex align-items-center justify-content-between p-3">
                              <Link
                                to={`/Healthcheckuppackagedetails/${data?._id}`}
                                style={{
                                  display: "-webkit-box",
                                  WebkitBoxOrient: "vertical",
                                  WebkitLineClamp: 2,
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                                className="fw-medium fs-18"
                              >
                                {data?.title}
                              </Link>
                              {/* <i className="text-dark fa-solid fa-angle-down me-2" /> */}
                            </div>

                            <div className="p-3 pt-0">
                              <div className="d-flex align-items-center gap-2 mb-0">
                                <p className="mb-1">Reports in</p>
                                <span className="badge bg-primary-light d-inline-flex align-items-center">
                                  {data?.report_time} hours
                                </span>
                                <span className="divider">|</span>
                                <p className="mb-1">Parameters</p>
                                <span className="badge bg-primary-light d-inline-flex align-items-center">
                                  {data?.total_test}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="card-body p-0">
                            <div className="d-flex flex-wrap active-bar gap-3 p-3">
                              {data?.test ? (
                                data?.test.map((data) => {
                                  return (
                                    <span className="badge badge-secondary-transparents">
                                      {data}
                                    </span>
                                  );
                                })
                              ) : (
                                <h6 className=" text-light mb-2 flexwrap-wrap">
                                  {data?.badges}
                                </h6>
                              )}
                            </div>
                          </div>

                          <div
                            style={{
                              background: "#0b4670",
                              borderRadius: "0px",
                              borderBottomLeftRadius: "10px",
                              borderBottomRightRadius: "10px",
                            }}
                            className="card-img card-img-hover"
                          >
                            <div className="d-flex align-items-center justify-content-between gap-3 p-3">
                              <Link
                                to={`/Healthcheckuppackagedetails/${data?._id}`}
                                className="text-light fw-medium fs-19 d-flex gap-3"
                              >
                                <span>
                                  ₹{data?.price}
                                  <br />
                                  <del className="fs-16">
                                    ₹{data?.discount_price}
                                  </del>
                                </span>
                                <span
                                  className="divider"
                                  style={{
                                    height: "50px",
                                    width: "1px",
                                    backgroundColor: "#ffff",
                                  }}
                                ></span>
                                <span>
                                  <b>0% off</b>
                                  <br />
                                  <span className="fs-12">
                                    for a limited period
                                  </span>
                                </span>
                              </Link>

                              <Link
                                onClick={() => handleSubmit(data?._id)}
                                // to="/Checkout"
                                className="btn btn-md btn-white d-inline-flex align-items-center rounded-pill"
                              >
                                <i className="isax isax-shopping-cart me-2" />
                                Add Cart
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* <div className="col-md-12">
                    <div className="text-center mb-4">
                      <Link
                        to="#"
                        className="p-2 btn btn-md btn-primary-gradient d-inline-flex align-items-center rounded-pill"
                      >
                        <i className="isax isax-d-cube-scan5 me-2" />
                        Load More 425 Doctors
                      </Link>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>

          <div
            className="container"
            style={{
              "margin-top": "25px",
              "-webkit-transform": "none",
              "-ms-transform": "none",
              transform: "none",
            }}
          >
            <div
              className="row"
              style={{
                "-webkit-transform": "none",
                "-ms-transform": "none",
                transform: "none",
              }}
            >
              <div className="col-md-12 col-lg-12 col-xl-12 ">
                {/* Doctor Widget */}
                <div className="card">
                  <div className="card-body product-description">
                    <div className="doctor-widget">
                      <div className="doc-info-left">
                        {/* <div class="doctor-img1">
													<img src="assets/img/products/product.jpg" class="img-fluid" alt="User Image">
											</div> */}
                        <div className="doc-info-cont product-cont">
                          <h4 className="doc-name mb-2 text-indigo">
                            Your Health, Your Schedule, Your Convenience: Get
                            Health Checkups Done with Doorstep Sample Collection
                          </h4>

                          <p>
                            At Redcliffe Labs, we are committed to making
                            quality healthcare accessible and convenient for
                            everyone. With our home sample collection service,
                            you can enjoy seamless health checkups from the
                            comfort of your home. Our DMLT-certified
                            phlebotomists are trained to ensure a safe and
                            hygienic collection process, adhering to the highest
                            standards. We aim to empower you with timely and
                            accurate diagnostics, enabling informed decisions
                            about your health. Experience the convenience and
                            reliability of Healthy India's Trusted Lab- Giving
                            India its Right to Quality Diagnostics.
                          </p>
                          <div className="feature-product pt-4">
                            <h4 className="doc-name mb-2 text-indigo">About</h4>

                            <p>
                              Health check-up packages are designed to promote
                              men’s health. In a city like Pune, where lifestyle
                              diseases, stress, and pollution can significantly
                              impact one’s life, health checks become crucial.
                              Regular health check-up packages allow men to
                              monitor their health. They help detect any disease
                              early on, allowing prevention and timely
                              intervention. Redcliffe Labs offers men's health
                              checkup packages in Pune with the convenience of
                              home sample collection.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* /Doctor Widget */}
                {/* Doctor Details Tab */}

                {/* /Doctor Details Tab */}
              </div>
              <div className="col-md-12 col-lg-12 col-xl-12 ">
                <div>
                  <div className="card search-filter">
                    <div className="card-body">
                      <iframe
                        src="https://www.youtube.com/embed/-qqbQAbB3dI"
                        title="YouTube video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{
                          width: "100%",
                          height: "60vh",
                          border: "none",
                        }}
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-body product-description">
                <h4 className="doc-name mb-2 text-indigo">Test Details</h4>
                <div className="custom-table">
                  <div className="table-responsive">
                    <table className="table table-center mb-0">
                      <tbody>
                        <tr>
                          <td>Also known as</td>

                          <td>Routine health checkup for men in Pune</td>
                        </tr>
                        <tr>
                          <td>Purpose</td>

                          <td>
                            The health packages for men help detect early signs
                            of,
                            <br />
                            including heart disease, diabetes, liver and kidney
                            disorders.
                          </td>
                        </tr>
                        <tr>
                          <td>Preparation</td>

                          <td>Do not drink or smoke before the test.</td>
                        </tr>
                        <tr>
                          <td>Home sample collection</td>

                          <td>Available</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-body product-description">
                <div>
                  <div className="about_purpose__C0946">
                    <h1 className="about_purposeHeader__Rl3aj">
                      Purpose of a men's health check-up package in Pune from
                      Redcliffe Labs
                    </h1>
                    <p className="about_intro__JSsBy">
                      A men's health checkup package in Pune from Redcliffe Labs
                      aims to provide in-depth details of key health parameters.
                      They focus on early detection, prevention, and management
                      of diseases that affect men.
                    </p>
                    <div className="about_list__aZygb">
                      <p className="about_listed__l5EpY">
                        Listed below are a few reasons why a routine health
                        check for men is crucial because:
                      </p>
                      <ol className="about_reasonsList__etDYs">
                        <li>
                          <h3>Early detection of health issues</h3>
                          <p>
                            A routine health checkup for men is essential to
                            detect diseases or risk factors early. Sometimes,
                            conditions like hypertension, diabetes, heart
                            disease, and prostate issues do not show symptoms in
                            the early stages. A range of tests, such as ECG,
                            lipid profile, blood sugar, and kidney function
                            tests, helps identify these issues before they
                            become severe. Thus, they enable timely treatment
                            and reduce the risk of complications.
                          </p>
                        </li>
                        <li>
                          <h3>Helps Monitor Lifestyle Diseases</h3>
                          <p>
                            Men are likely to develop lifestyle diseases such as
                            diabetes, obesity, and hypertension due to a
                            sedentary lifestyle. Regular health screenings are
                            important in monitoring and managing these
                            conditions.
                          </p>
                          <ul className="about_unordered__I_MCM">
                            <h3>
                              Routine health check-up packages for men include
                              the following tests:
                            </h3>
                            <li>
                              <span className="about_li_val__wOTRl">
                                Diabetes:
                              </span>
                              <span>
                                {" "}
                                A doctor usually recommends fasting blood sugar
                                and Hb1AC tests to help assess blood sugar
                                control.{" "}
                              </span>
                            </li>
                            <li>
                              <span className="about_li_val__wOTRl">
                                Liver function test (LFT):
                              </span>
                              <span>
                                {" "}
                                Individuals are at risk of developing fatty
                                liver or liver diseases due to alcohol
                                consumption or poor diet.
                              </span>
                            </li>
                            <li>
                              <span className="about_li_val__wOTRl">
                                Kidney function test (KFT):
                              </span>
                              <span>
                                {" "}
                                This test helps detect kidney disease. It
                                reveals how well your kidneys are filtering
                                blood, called GFR ( glomerular filtration rate).
                              </span>
                            </li>
                            <li>
                              <span className="about_li_val__wOTRl">
                                A complete blood count (CBC) test:
                              </span>
                              <span>
                                {" "}
                                is often part of routine health checkups. It
                                helps detect various health disorders, including
                                infections, anemia, immune system diseases, and
                                blood cancers.
                              </span>
                            </li>
                            <li>
                              <span className="about_li_val__wOTRl">
                                Vitamin deficiency test:
                              </span>
                              <span>
                                {" "}
                                Vitamin D and B12 address nutrition-related
                                issues common in urban men.{" "}
                              </span>
                            </li>
                            <li>
                              <span className="about_li_val__wOTRl">
                                Cholesterol levels:
                              </span>
                              <span>
                                {" "}
                                A lipid profile test helps monitor LDL (bad
                                cholesterol), HDL (good cholesterol), and
                                triglycerides to track cholesterol and reduce
                                heart disease risk.
                              </span>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <h3>Preventive Health Care</h3>
                          <p>
                            Preventive health care is important to reduce the
                            risk of diseases, disabilities, and death.
                            Identifying early signs of diseases helps provide
                            personalized treatment plans for lifestyle
                            modifications.
                          </p>
                        </li>
                        <li>
                          <h3>Reduces Long-Term Health Costs</h3>
                          <p>
                            Regular health checkups for men reduce long-term
                            healthcare costs. Early detection or prevention of
                            diseases minimizes the chances of expensive
                            treatments or hospitalizations.
                          </p>
                        </li>
                        <li>
                          <h3>Convenience and Accuracy</h3>
                          <p>
                            Redcliffe Labs men's health checkup packages in Pune
                            are available with home sample collection
                            convenience. This saves time and allows individuals
                            to undergo health checkups without visiting a lab.
                            Besides, experts analyze all collected samples using
                            state-of-the-art technology, ensuring accuracy and
                            precision in test results.
                          </p>
                        </li>
                      </ol>
                    </div>
                  </div>{" "}
                  <div className="about_packageCity__PXuWz">
                    <p className="about_cityHeader__82ypu">
                      Men Health Checkup Packages for Men in Pune from Redcliffe
                      Labs are Affordable.{" "}
                      <span className="about_book__C90_3">Book now!</span>
                    </p>
                    <p className="about_cityContent___iLHG">
                      <span>
                        Redcliffe Labs offers men’s health checkup packages in
                        Pune that provide a comprehensive evaluation of a man’s
                        health status. Routine health checks help in the early
                        detection of diseases, monitoring underlying medical
                        conditions, and promoting preventive healthcare.
                      </span>
                      <span>
                        Choose from a wide range of packages, such as a lipid
                        profile test for men, a smart full-body checkup for men,
                        a heart-healthy package for men, and more. Health
                        checkup packages for men in Pune vary in price. Book a
                        health checkup package that suits your needs and
                        affordability.
                      </span>
                      <span>
                        So, why wait? Download the Redcliffe Labs mobile app or
                        call us directly to book an affordable health check-up
                        package for your father or any male family member. This
                        is the right opportunity to take charge of their health,
                        address lifestyle-related risks, and ensure long-term
                        wellness.
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <section className="faq-section-one card">
              <div className="container">
                <div
                  className="section-header sec-header-one text-center aos aos-init aos-animate"
                  data-aos="fade-up"
                >
                  <span className="badge badge-primary">
                    Frequently Asked Questions
                  </span>
                  <h2>Helps you know your test better</h2>
                </div>
                <div className="row">
                  <div className="col-md-10 mx-auto">
                    <div
                      className="faq-info aos aos-init aos-animate"
                      data-aos="fade-up"
                    >
                      <div className="accordion" id="faq-details">
                        {/* FAQ Item */}
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="headingOne">
                            <a
                              href="javascript:void(0);"
                              className="accordion-button collapsed"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseOne"
                              aria-expanded="false"
                              aria-controls="collapseOne"
                            >
                              How do I book an appointment with a doctor?
                            </a>
                          </h2>
                          <div
                            id="collapseOne"
                            className="accordion-collapse collapse"
                            aria-labelledby="headingOne"
                            data-bs-parent="#faq-details"
                            style={{}}
                          >
                            <div className="accordion-body">
                              <div className="accordion-content">
                                <p>
                                  Yes, simply visit our website and log in or
                                  create an account. Search for a doctor based
                                  on specialization, location, or availability
                                  &amp; confirm your booking.
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
                              aria-expanded="false"
                              aria-controls="collapseTwo"
                            >
                              Can I request a specific doctor when booking my
                              appointment?
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
                                  Yes, you can usually request a specific doctor
                                  when booking your appointment, though
                                  availability may vary based on their schedule.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* /FAQ Item */}
                        {/* FAQ Item */}
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="headingThree">
                            <a
                              href="javascript:void(0);"
                              className="accordion-button collapsed"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseThree"
                              aria-expanded="false"
                              aria-controls="collapseThree"
                            >
                              What should I do if I need to cancel or reschedule
                              my appointment?
                            </a>
                          </h2>
                          <div
                            id="collapseThree"
                            className="accordion-collapse collapse"
                            aria-labelledby="headingThree"
                            data-bs-parent="#faq-details"
                          >
                            <div className="accordion-body">
                              <div className="accordion-content">
                                <p>
                                  If you need to cancel or reschedule your
                                  appointment, contact the doctor as soon as
                                  possible to inform them and to reschedule for
                                  another available time slot.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* /FAQ Item */}
                        {/* FAQ Item */}
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="headingFour">
                            <a
                              href="javascript:void(0);"
                              className="accordion-button collapsed"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseFour"
                              aria-expanded="false"
                              aria-controls="collapseFour"
                            >
                              What if I'm running late for my appointment?
                            </a>
                          </h2>
                          <div
                            id="collapseFour"
                            className="accordion-collapse collapse"
                            aria-labelledby="headingFour"
                            data-bs-parent="#faq-details"
                          >
                            <div className="accordion-body">
                              <div className="accordion-content">
                                <p>
                                  If you know you will be late, it's courteous
                                  to call the doctor's office and inform them.
                                  Depending on their policy and schedule, they
                                  may be able to accommodate you or reschedule
                                  your appointment.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* /FAQ Item */}
                        {/* FAQ Item */}
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="headingFive">
                            <a
                              href="javascript:void(0);"
                              className="accordion-button collapsed"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseFive"
                              aria-expanded="false"
                              aria-controls="collapseFive"
                            >
                              Can I book appointments for family members or
                              dependents?
                            </a>
                          </h2>
                          <div
                            id="collapseFive"
                            className="accordion-collapse collapse"
                            aria-labelledby="headingFive"
                            data-bs-parent="#faq-details"
                          >
                            <div className="accordion-body">
                              <div className="accordion-content">
                                <p>
                                  Yes, in many cases, you can book appointments
                                  for family members or dependents. However, you
                                  may need to provide their personal information
                                  and consent to do so.
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
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Healthmenwomen;
