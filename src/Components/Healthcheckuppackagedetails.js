import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Mainheader from "../Headersection/Mainheader";
import Footer from "../Footer/Footer";
import secureLocalStorage from "react-secure-storage";
import toast, { Toaster } from "react-hot-toast";

const Healthcheckuppackagedetails = () => {
  const [PackageDetails, setPackageDetails] = useState();
  const { id } = useParams();
  useEffect(() => {
    GetpackageCategoryList(id);
    window.scrollTo(0, 0);
  }, []);
  const GetpackageCategoryList = (id) => {
    const data = {
      packageId: id,
    };
    axios
      .post(`${process.env.REACT_APP_API_KEY}getPackageDetails`, data)
      .then((res) => {
        setPackageDetails(res.data.data);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    if (secureLocalStorage.getItem("medicityuser")) {
      AddpackageCategoryList(id);
    }
  }, [0]);

  const AddpackageCategoryList = (id) => {
    const data = {
      packageId: id,
      userId: secureLocalStorage.getItem("medicityuser"),
    };
    axios
      .post(`${process.env.REACT_APP_API_KEY}addViewsToPackage`, data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
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
        toast.success(res?.data?.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  return (
    <>
      <Mainheader />
      <Toaster />
      <div className="content">
        {/* <Mainheader/> */}
        <div className="container" style={{ marginTop: "25px" }}>
          <div className="row">
            <div
              style={{
                height: "1055px",
                overflow: "scroll",
                position: "-webkit-sticky",
                position: "sticky",
                scrollbarWidth: "none",
              }}
              className="col-md-8 col-lg-8 col-xl-8 "
            >
              {/* Doctor Widget */}
              <div className="card">
                <div className="card-body product-description">
                  <div className="doctor-widget">
                    <div className="doc-info-left">
                      <div className="doc-info-cont product-cont">
                        <h6 className="mb-3">0 people booked this recently</h6>
                        <h4 className="doc-name mb-3">
                          {PackageDetails?.title}
                        </h4>

                        {PackageDetails?.test?.map((data) => {
                          return (
                            <span className="badge badge-secondary-transparents ">
                              {data}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6 col-lg-6">
                      <div class="card  mt-1 mb-1">
                        <ul class="list-group list-group-flush benifits-col">
                          <li class="mb-2 list-group-item d-flex align-items-center">
                            <div>
                              {/* <i class="fas fa-shipping-fast"></i> */}
                              <img
                                alt="image_age_group"
                                loading="lazy"
                                width="38"
                                height="38"
                                decoding="async"
                                data-nimg="1"
                                src="https://redcliffelabs.com/_next/image?url=https%3A%2F%2Fstatic-redcliffelabs.s3.amazonaws.com%2Fmedia%2Fgallary-file%2FNone%2F553661f0-ef38-4d7c-a7f8-66e9e1485d81.png&w=48&q=75"
                                style={{ color: "transparent" }}
                              ></img>
                            </div>
                            <div>
                              Includes
                              <br />
                              <span class="text-sm">
                                {PackageDetails?.total_test} Parameters
                              </span>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-6">
                      <div class="card  mt-1 mb-1">
                        <ul class="list-group list-group-flush benifits-col">
                          <li class="mb-2 list-group-item d-flex align-items-center">
                            <div>
                              {/* <i class="far fa-question-circle"></i> */}
                              <img
                                alt="image_age_group"
                                loading="lazy"
                                width="38"
                                height="38"
                                decoding="async"
                                data-nimg="1"
                                src="https://redcliffelabs.com/_next/image?url=https%3A%2F%2Fstatic-redcliffelabs.s3.amazonaws.com%2Fmedia%2Fgallary-file%2FNone%2F057a2d4f-f7d3-4fee-87a6-f7469cc959fc.png&w=48&q=75"
                                style={{ color: "transparent" }}
                              ></img>
                            </div>
                            <div>
                              Reports in (T&C)
                              <br />
                              <span class="text-sm">
                                {PackageDetails?.report_time} hours
                              </span>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-6">
                      <div class="card  mt-1 mb-1">
                        <ul class="list-group list-group-flush benifits-col">
                          <li class="mb-2 list-group-item d-flex align-items-center">
                            <div>
                              {/* <i class="fas fa-hands"></i> */}
                              <img
                                alt="image_age_group"
                                loading="lazy"
                                width="38"
                                height="38"
                                decoding="async"
                                data-nimg="1"
                                src="https://redcliffelabs.com/_next/image?url=https%3A%2F%2Fstatic-redcliffelabs.s3.amazonaws.com%2Fmedia%2Fgallary-file%2FNone%2F05dbf848-91d5-4cf4-bfb1-bcf25eaed707.png&w=48&q=75"
                                style={{ color: "transparent" }}
                              ></img>
                            </div>
                            <div>
                              Fasting
                              <br />
                              <span class="text-sm">
                                {PackageDetails?.fasting_time} Hrs Required
                              </span>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-6">
                      <div class="card  mt-1 mb-1">
                        <ul class="list-group list-group-flush benifits-col">
                          <li class="mb-2 list-group-item d-flex align-items-center">
                            <div>
                              {/* <i class="fas fa-tag"></i> */}
                              <img
                                alt="image_age_group"
                                loading="lazy"
                                width="38"
                                height="38"
                                decoding="async"
                                data-nimg="1"
                                src="https://redcliffelabs.com/_next/image?url=https%3A%2F%2Fstatic-redcliffelabs.s3.amazonaws.com%2Fmedia%2Fgallary-file%2FNone%2F09b3a065-44b0-48e8-92e5-49b23a14b88f.png&w=48&q=75"
                              ></img>
                            </div>
                            <div>
                              Recommended Gender
                              <br />
                              <span class="text-sm">
                                {PackageDetails?.gender
                                  ? PackageDetails?.gender
                                  : "Not Found"}
                              </span>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-6">
                      <div class="card  mt-1 mb-1">
                        <ul class="list-group list-group-flush benifits-col">
                          <li class="mb-2 list-group-item d-flex align-items-center">
                            <div>
                              {/* <i class="fas fa-tag"></i> */}
                              <img
                                alt="image_age_group"
                                loading="lazy"
                                width="38"
                                height="38"
                                decoding="async"
                                data-nimg="1"
                                src="https://redcliffelabs.com/_next/image?url=https%3A%2F%2Fstatic-redcliffelabs.s3.amazonaws.com%2Fmedia%2Fgallary-file%2FNone%2F6c999347-be3f-4026-8b25-ce06f81c8084.png&w=48&q=75"
                                style={{ color: "transparent" }}
                              ></img>
                            </div>
                            <div>
                              Age Group
                              <br />
                              <span class="text-sm">
                                Above {PackageDetails?.ageGroup} Years
                              </span>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-2 mb-4" id="pack_Instructions">
                <div className="ProductDetailInstructions_product__jwOwl">
                  <div className="ProductDetailInstructions_product__about__uax7r">
                    <div className="ProductDetailInstructions_image_tag__5hWyu">
                      <img
                        alt="Stay Fit Plus Full Body Checkup With Free RA Factor - Male in Delhi "
                        fetchpriority="high"
                        width={768}
                        height={268}
                        decoding="async"
                        data-nimg={1}
                        className="ProductDetailInstructions_product__about__paramsBanner__v02Ox"
                        src="https://www.metropolisindia.com/newdata/images/bannerimages/Metropolis-web-banner-1-with-text.webp"
                        style={{
                          color: "transparent",
                          "border-radius": "10px",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="p-4 tab-content pt-0 dashboard-tab">
                  <div>
                    <h3 className="mt-3 mb-3">
                      Meidicity Labs - Healthy India ki Trusted Lab
                    </h3>
                    <p>
                      At Medicity Labs, we have a single goal: to give India its
                      right to quality diagnostics.
                    </p>
                    <div className="row flex-wrap">
                      <div className="col-md-6 col-lg-6">
                        <div
                          className="card shadow-sm p-1 mb-2 bg-white rounded"
                          style={{ marginRight: "15px" }}
                        >
                          <div className="card-body text-center">
                            <h3 className="mb-1">
                              <a href="#">0+</a>
                            </h3>
                            <span className="badge badge-secondary-transparents">
                              Tests Processed Everyday
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6 col-lg-6">
                        <div
                          className="card shadow-sm p-1 mb-2 bg-white rounded"
                          style={{ marginRight: "15px" }}
                        >
                          <div className="card-body text-center">
                            <h3 className="mb-1">
                              <a href="#">0+</a>
                            </h3>
                            <span className="badge badge-secondary-transparents">
                              Cities
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6 col-lg-6">
                        <div
                          className="card shadow-sm p-1 mb-2 bg-white rounded"
                          style={{ marginRight: "15px" }}
                        >
                          <div className="card-body text-center">
                            <h3 className="mb-1">
                              <a href="#">0+</a>
                            </h3>
                            <span className="badge badge-secondary-transparents">
                              Collection Centres
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-6">
                        <div
                          className="card shadow-sm p-1 mb-2 bg-white rounded"
                          style={{ marginRight: "15px" }}
                        >
                          <div className="card-body text-center">
                            <h3 className="mb-1">
                              <a href="#">0+</a>
                            </h3>
                            <span className="badge badge-secondary-transparents">
                              World Class In-house Labs
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-6">
                        <div
                          className="card shadow-sm p-1 mb-2 bg-white rounded"
                          style={{ marginRight: "15px" }}
                        >
                          <div className="card-body text-center">
                            <h3 className="mb-1">
                              <a href="#">0+</a>
                            </h3>
                            <span className="badge badge-secondary-transparents">
                              Home Collection Experts
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-6">
                        <div
                          className="card shadow-sm p-1 mb-2 bg-white rounded"
                          style={{ marginRight: "15px" }}
                        >
                          <div className="card-body text-center">
                            <h3 className="mb-1">
                              <a href="#">0+</a>
                            </h3>
                            <span className="badge badge-secondary-transparents">
                              Customers served
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-2 mb-4" id="pack_Instructions">
                <div className="ProductDetailInstructions_product__jwOwl">
                  <div className="ProductDetailInstructions_product__about__uax7r">
                    <div className="ProductDetailInstructions_image_tag__5hWyu">
                      <img
                        alt="Stay Fit Plus Full Body Checkup With Free RA Factor - Male in Delhi "
                        fetchpriority="high"
                        width={768}
                        height={268}
                        decoding="async"
                        data-nimg={1}
                        className="ProductDetailInstructions_product__about__paramsBanner__v02Ox"
                        src="https://www.metropolisindia.com/homebanners/06_03_2025_10_16_50_23.webp"
                        style={{
                          color: "transparent",
                          "border-radius": "10px",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-body pt-0">
                  {/* Tab Menu */}
                  <h3 className="pt-4">Included Tests</h3>
                  <hr />
                  {/* /Tab Menu */}
                  {/* Tab Content */}
                  <div className="tab-content pt-3">
                    {/* Overview Content */}
                    <div
                      role="tabpanel"
                      id="doc_overview"
                      className="tab-pane fade show active"
                    >
                      <div className="row">
                        <div className="col-md-9">
                          {/* About Details */}
                          <div className="widget about-widget">
                            <h4 className="widget-title">
                              Package includes following parameters
                            </h4>
                          </div>

                          <div className="widget awards-widget">
                            <h4 className="widget-title">
                              Complete Blood Count (CBC) (26)
                            </h4>
                            <div className="experience-box">
                              <ul className="experience-list">
                                <li>
                                  <div className="experience-user">
                                    <div className="before-circle" />
                                  </div>
                                  <div className="experience-content">
                                    <div className="timeline-content">
                                      <p>Absolute Basophils Count, Blood</p>
                                    </div>
                                  </div>
                                </li>
                                <li>
                                  <div className="experience-user">
                                    <div className="before-circle" />
                                  </div>
                                  <div className="experience-content">
                                    <div className="timeline-content">
                                      <p>Absolute Eosinophil Count, Blood</p>
                                    </div>
                                  </div>
                                </li>
                                <li>
                                  <div className="experience-user">
                                    <div className="before-circle" />
                                  </div>
                                  <div className="experience-content">
                                    <div className="timeline-content">
                                      <p>Absolute Lymphocyte Count, Blood</p>
                                    </div>
                                  </div>
                                </li>
                                <li>
                                  <div className="experience-user">
                                    <div className="before-circle" />
                                  </div>
                                  <div className="experience-content">
                                    <div className="timeline-content">
                                      <p>Absolute Monocyte Count, Blood</p>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="widget awards-widget">
                            <h4 className="widget-title">
                              Erythrocyte Sedimentation Rate (ESR) (1)
                            </h4>
                            <div className="experience-box">
                              <ul className="experience-list">
                                <li>
                                  <div className="experience-user">
                                    <div className="before-circle" />
                                  </div>
                                  <div className="experience-content">
                                    <div className="timeline-content">
                                      <p>
                                        ESR (Erythrocyte Sedimentation Rate)
                                      </p>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="widget awards-widget">
                            <h4 className="widget-title">
                              Glucose Fasting (1)
                            </h4>
                            <div className="experience-box">
                              <ul className="experience-list">
                                <li>
                                  <div className="experience-user">
                                    <div className="before-circle" />
                                  </div>
                                  <div className="experience-content">
                                    <div className="timeline-content">
                                      <p>Glucose Fasting</p>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="widget awards-widget">
                            <h4 className="widget-title">
                              HbA1C (Glycosylated Haemoglobin) (2)
                            </h4>
                            <div className="experience-box">
                              <ul className="experience-list">
                                <li>
                                  <div className="experience-user">
                                    <div className="before-circle" />
                                  </div>
                                  <div className="experience-content">
                                    <div className="timeline-content">
                                      <p>Average blood glucose</p>
                                    </div>
                                  </div>
                                </li>
                                <li>
                                  <div className="experience-user">
                                    <div className="before-circle" />
                                  </div>
                                  <div className="experience-content">
                                    <div className="timeline-content">
                                      <p>Glycated Hemoglobin</p>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="widget awards-widget">
                            <h4 className="widget-title">
                              High Sensitivity C-Reactive Protein (Hs-CRP) (1)
                            </h4>
                            <div className="experience-box">
                              <ul className="experience-list">
                                <li>
                                  <div className="experience-user">
                                    <div className="before-circle" />
                                  </div>
                                  <div className="experience-content">
                                    <div className="timeline-content">
                                      <p>
                                        HsCRP (High Sensitivity C Reactive
                                        Protein)
                                      </p>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="widget awards-widget">
                            <h4 className="widget-title">Iron Studies (4)</h4>
                            <div className="experience-box">
                              <ul className="experience-list">
                                <li>
                                  <div className="experience-user">
                                    <div className="before-circle" />
                                  </div>
                                  <div className="experience-content">
                                    <div className="timeline-content">
                                      <p>Iron, Serum</p>
                                    </div>
                                  </div>
                                </li>
                                <li>
                                  <div className="experience-user">
                                    <div className="before-circle" />
                                  </div>
                                  <div className="experience-content">
                                    <div className="timeline-content">
                                      <p>TIBC</p>
                                    </div>
                                  </div>
                                </li>
                                <li>
                                  <div className="experience-user">
                                    <div className="before-circle" />
                                  </div>
                                  <div className="experience-content">
                                    <div className="timeline-content">
                                      <p>Transferrin Saturation</p>
                                    </div>
                                  </div>
                                </li>
                                <li>
                                  <div className="experience-user">
                                    <div className="before-circle" />
                                  </div>
                                  <div className="experience-content">
                                    <div className="timeline-content">
                                      <p>Uibc</p>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="widget awards-widget">
                            <h4 className="widget-title">
                              Kidney Function Test (KFT) (12)
                            </h4>
                            <div className="experience-box">
                              <ul className="experience-list">
                                <li>
                                  <div className="experience-user">
                                    <div className="before-circle" />
                                  </div>
                                  <div className="experience-content">
                                    <div className="timeline-content">
                                      <p>Blood Urea</p>
                                    </div>
                                  </div>
                                </li>
                                <li>
                                  <div className="experience-user">
                                    <div className="before-circle" />
                                  </div>
                                  <div className="experience-content">
                                    <div className="timeline-content">
                                      <p>BUN</p>
                                    </div>
                                  </div>
                                </li>
                                <li>
                                  <div className="experience-user">
                                    <div className="before-circle" />
                                  </div>
                                  <div className="experience-content">
                                    <div className="timeline-content">
                                      <p>BUN/Creatinine Ratio</p>
                                    </div>
                                  </div>
                                </li>
                                <li>
                                  <div className="experience-user">
                                    <div className="before-circle" />
                                  </div>
                                  <div className="experience-content">
                                    <div className="timeline-content">
                                      <p>Calcium</p>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="widget awards-widget">
                            <h4 className="widget-title">Lipid Profile (9)</h4>
                            <div className="experience-box">
                              <ul className="experience-list">
                                <li>
                                  <div className="experience-user">
                                    <div className="before-circle" />
                                  </div>
                                  <div className="experience-content">
                                    <div className="timeline-content">
                                      <p>
                                        HsCRP (High Sensitivity C Reactive
                                        Protein)
                                      </p>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="widget awards-widget">
                            <h4 className="widget-title">
                              Liver Function Test (LFT) (12)
                            </h4>
                            <div className="experience-box">
                              <ul className="experience-list">
                                <li>
                                  <div className="experience-user">
                                    <div className="before-circle" />
                                  </div>
                                  <div className="experience-content">
                                    <div className="timeline-content">
                                      <p>
                                        HsCRP (High Sensitivity C Reactive
                                        Protein)
                                      </p>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="widget awards-widget">
                            <h4 className="widget-title">
                              Rheumatoid Factor (RF), Quantitative (1)
                            </h4>
                            <div className="experience-box">
                              <ul className="experience-list">
                                <li>
                                  <div className="experience-user">
                                    <div className="before-circle" />
                                  </div>
                                  <div className="experience-content">
                                    <div className="timeline-content">
                                      <p>
                                        HsCRP (High Sensitivity C Reactive
                                        Protein)
                                      </p>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="widget awards-widget">
                            <h4 className="widget-title">
                              Testosterone Total (1)
                            </h4>
                            <div className="experience-box">
                              <ul className="experience-list">
                                <li>
                                  <div className="experience-user">
                                    <div className="before-circle" />
                                  </div>
                                  <div className="experience-content">
                                    <div className="timeline-content">
                                      <p>
                                        HsCRP (High Sensitivity C Reactive
                                        Protein)
                                      </p>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="widget awards-widget">
                            <h4 className="widget-title">
                              Thyroid Profile Total (3)
                            </h4>
                            <div className="experience-box">
                              <ul className="experience-list">
                                <li>
                                  <div className="experience-user">
                                    <div className="before-circle" />
                                  </div>
                                  <div className="experience-content">
                                    <div className="timeline-content">
                                      <p>
                                        HsCRP (High Sensitivity C Reactive
                                        Protein)
                                      </p>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="widget awards-widget">
                            <h4 className="widget-title">
                              Urine Routine & Microscopic Examination (23)
                            </h4>
                            <div className="experience-box">
                              <ul className="experience-list">
                                <li>
                                  <div className="experience-user">
                                    <div className="before-circle" />
                                  </div>
                                  <div className="experience-content">
                                    <div className="timeline-content">
                                      <p>
                                        HsCRP (High Sensitivity C Reactive
                                        Protein)
                                      </p>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="widget awards-widget">
                            <h4 className="widget-title">
                              Vitamin B12 / Cyanocobalamin (1)
                            </h4>
                            <div className="experience-box">
                              <ul className="experience-list">
                                <li>
                                  <div className="experience-user">
                                    <div className="before-circle" />
                                  </div>
                                  <div className="experience-content">
                                    <div className="timeline-content">
                                      <p>
                                        HsCRP (High Sensitivity C Reactive
                                        Protein)
                                      </p>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="widget awards-widget">
                            <h4 className="widget-title">
                              Vitamin D 25 Hydroxy (1)
                            </h4>
                            <div className="experience-box">
                              <ul className="experience-list">
                                <li>
                                  <div className="experience-user">
                                    <div className="before-circle" />
                                  </div>
                                  <div className="experience-content">
                                    <div className="timeline-content">
                                      <p>
                                        HsCRP (High Sensitivity C Reactive
                                        Protein)
                                      </p>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Overview Content */}
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-body product-description">
                  <div className="doctor-widget">
                    <div className="doc-info-left">
                      <div className="doc-info-cont product-cont">
                        <h4 className="doc-name mb-2">Introduction</h4>

                        <p>{PackageDetails?.interduction}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-2 mb-4" id="pack_Instructions">
                <div className="ProductDetailInstructions_product__jwOwl">
                  <div className="ProductDetailInstructions_product__about__uax7r">
                    <div className="ProductDetailInstructions_image_tag__5hWyu">
                      <img
                        alt="Stay Fit Plus Full Body Checkup With Free RA Factor - Male in Delhi "
                        fetchpriority="high"
                        width={768}
                        height={268}
                        decoding="async"
                        data-nimg={1}
                        className="ProductDetailInstructions_product__about__paramsBanner__v02Ox"
                        src="https://www.metropolisindia.com/homebanners/06_03_2025_10_21_50_25.webp"
                        style={{
                          color: "transparent",
                          "border-radius": "10px",
                        }}
                      />
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
                    <span className="badge badge-primary">FAQ’S</span>
                    <h2>Your Questions are Answered</h2>
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
                                    Yes, you can usually request a specific
                                    doctor when booking your appointment, though
                                    availability may vary based on their
                                    schedule.
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
                                What should I do if I need to cancel or
                                reschedule my appointment?
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
                                    possible to inform them and to reschedule
                                    for another available time slot.
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
                                    Yes, in many cases, you can book
                                    appointments for family members or
                                    dependents. However, you may need to provide
                                    their personal information and consent to do
                                    so.
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
            <div
              className="col-md-4 col-lg-4 col-xl-4 "
              style={{
                overflow: "visible",
                boxSizing: "border-box",
                minHeight: "1px",
                position: "relative",
              }}
            >
              {/* Right Details */}
              <div className="card search-filter">
                <div className="card-body">
                  <div className="fs-10 mb-4">
                    Top Selling | 0 people booked this recently
                  </div>
                  <h3 className=" mb-4 fs-16"> {PackageDetails?.title}</h3>
                  <div className="clini-infos mt-0">
                    <h2>
                      ₹{PackageDetails?.price}{" "}
                      <del className="text-lg strike">
                        ₹{PackageDetails?.discount_price}
                      </del>{" "}
                      <span className="text-lg text-success">
                        <b>71% off</b>
                      </span>
                    </h2>
                  </div>
                  <div className="bg-gray ProductDetails_mobileHomeCollection__YwfNA gap-2 p-2 mb-2">
                    <svg
                      width={48}
                      height={33}
                      viewBox="0 0 112 77"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.772 54.67H6.809v.556h2.963v-.555ZM26.967 57.541H6.81v.555h20.158v-.555ZM22.523 61.846h-4.934v.555h4.934v-.555ZM9.315 63.804H0v.556h9.315v-.556ZM30.97 67.152H0v.556h30.97v-.556ZM102.652 51.415a2.392 2.392 0 0 0-.598-.293c-.347-.093-.678-.17-1.025-.185-.567-.016-1.087-.216-1.56-.494a5.685 5.685 0 0 1-1.45-1.28c-.568-.71-.915-1.513-1.214-2.346-.3-.818-.583-1.62-.914-2.422-.788-1.96-1.608-3.888-2.412-5.848a1.91 1.91 0 0 1-.141-.385c-.048-.14.031-.247.173-.263.173-.015.362-.03.552-.03h3.373c.299 0 .614 0 .898-.108.882-.325 1.592-.834 2.033-1.651a3.898 3.898 0 0 0 .41-1.682c.031-1.389-.568-2.422-1.86-3.04-.315-.154-.63-.293-.993-.277h-3.61c-.504 0-.913.185-1.276.509-.41.355-.646.818-.82 1.311-.063.186-.11.37-.173.617-.236-.185-.284-.4-.41-.57-.22-.278-.41-.556-.756-.695-1.23-.509-2.396-.416-3.389.556-.126.108-.22.231-.347.34-.283.246-.41.261-.693.045l-.615-.509c-.536-.463-1.056-.94-1.607-1.388-1.135-.957-2.191-1.975-3.294-2.963a2.648 2.648 0 0 1-.789-1.188c-.126-.385-.252-.756-.362-1.141-.567-2.099-.898-4.228-1.245-6.372-.126-.756-.158-1.559-.441-2.284-.048-.108-.048-.247-.048-.355 0-.555-.047-1.064-.284-1.589-.22-.432.08-.926.552-1.064.378-.124.74-.216 1.12-.34 1.45-.54 2.474-1.512 2.962-2.978.048-.138.11-.277.126-.4.048-.34.237-.54.584-.633.252-.062.472-.2.646-.417.3-.355.284-.756-.063-1.064-.095-.078-.19-.155-.3-.216-.504-.294-.662-.726-.583-1.281.016-.154.047-.309.095-.463.11-.355.189-.71.173-1.064-.016-.294.11-.494.315-.68.3-.277.583-.555.867-.863.394-.432.71-.926.835-1.497.174-.694-.031-1.28-.598-1.712a3.411 3.411 0 0 0-2.018-.756c-.993-.047-1.923.154-2.805.54a9.594 9.594 0 0 0-1.907 1.08c-.3.231-.631.37-1.025.324-.19-.031-.41-.031-.615 0-1.592.138-2.79.864-3.451 2.314-.489 1.095-.584 2.237-.237 3.394.11.37.252.725.426 1.065.346.74.804 1.388 1.292 2.036a3.21 3.21 0 0 1 .646 1.667c0 .139.048.277-.063.4-.078.078-.189.063-.283.078-.174.03-.3.139-.426.231-.236.186-.489.37-.71.571a2.3 2.3 0 0 1-.693.37c-.094.14-.252.232-.457.278l-.031.031s-.19.123-.316.154a1.154 1.154 0 0 1-.22.263v.03s0 .047-.016.062a.94.94 0 0 1 .315-.077.66.66 0 0 1 .284-.17c.079-.015.158-.015.236-.03h.016a.86.86 0 0 1 .379-.078h.031s.031-.03.047-.03c.158-.047.268-.078.426-.093h.031c.457-.062.899.046 1.324.278.221.139.457.277.662.432.804.617 1.545 1.311 2.097 2.16.22.308.346.648.41 1.003v.108c.204 1.558.472 3.085.772 4.628.22 1.219.457 2.438.835 3.626.094.278.19.57.3.848.141.417.41.772.724 1.096.852.833 1.766 1.62 2.664 2.407.536.478 1.088.956 1.64 1.435.314.277.63.57.96.833.269.2.316.447.206.74-.032.093-.064.185-.126.278-.205.37-.363.417-.741.247a44.34 44.34 0 0 1-5.422-2.9 15.96 15.96 0 0 1-1.67-1.235 3.311 3.311 0 0 1-.474-.463c-.772-.972-1.513-1.99-2.017-3.147-.347-.803-.615-1.651-.867-2.5a44.47 44.47 0 0 1-.583-2.067c-.11-.432-.205-.864-.268-1.296a3.142 3.142 0 0 1 .142-1.481c.205-.648.583-1.142 1.276-1.358.127-.046.268-.077.379-.185.078-.077.031-.262-.08-.293-.11-.062-.236-.031-.362 0-.74.185-1.229.663-1.56 1.326a2.934 2.934 0 0 0-.252 1.05c-.016.2 0 .4 0 .586-.032.51.047 1.003.173 1.497.126.432.252.879.363 1.326.047.14.079.263.11.402a.92.92 0 0 1 .047.262v.03s.016.032 0 .047c0 .046 0 .108-.015.154.157.54.157 1.127 0 1.667 0 .092-.048.17-.08.246-.125.402-.314.772-.614 1.08-.205.309-.41.618-.599.942-.646 1.11-1.213 2.237-1.67 3.44-.442 1.142-.757 2.33-1.01 3.518-.157.725-.157.74-.913.941-1.088.309-2.191.494-3.31.633a51.67 51.67 0 0 1-5.123.4c-.709 0-1.434.093-2.143.078-.82-.03-1.624-.077-2.443-.123h-.126c-.252-.047-.379-.155-.347-.402.032-.355.079-.725.142-1.064.236-1.28.614-2.5 1.182-3.657.016-.03.047-.061.047-.108.016-.03.032-.077.047-.108v-.03c.237-.525.52-1.019.773-1.528v-.031c.126-.37.268-.756.33-1.142 0-.03.016-.046.016-.077.016-.015.016-.03.032-.062-.094-.046-.205-.123-.3-.185-.015-.015-.03-.015-.047-.03a7.11 7.11 0 0 1-.22.509c.015.03.015.061.015.092 0 0-.015.108-.047.185-.063.14-.126.293-.205.432-.031.078-.079.14-.11.216l-.047.093c-.19.355-.379.725-.552 1.08-.252.524-.489 1.049-.662 1.589-.016 0-.016.016-.032.016-.299.802-.535 1.635-.709 2.483-.126.633-.22 1.266-.252 1.914-.047 1.342.063 2.669.378 3.98.347 1.42.899 2.747 1.829 3.904.236.277.488.524.74.802.048.062.127.123.08.2-.048.078-.143.093-.221.093h-2.144a.538.538 0 0 1-.504-.293c-.063-.093-.126-.2-.19-.293-.362-.463-.819-.725-1.402-.772-.237-.015-.457 0-.678 0h-6.383c-.583 0-1.182.016-1.781-.015-.568-.016-.914.247-1.166.71-.11.216-.19.447-.221.694-.032.278-.174.463-.457.57-.883.356-1.309 1.173-1.04 2.053.078.278-.032.494-.269.679-.252.2-.488.416-.725.632-1.197 1.096-2.253 2.315-3.23 3.61-.505.664-.379.54-1.088.649-.599.108-1.072.385-1.355.91-.08.139-.174.278-.253.416-.33.571-.662 1.142-.993 1.729-.173.324-.378.57-.74.74-.678.309-.694.941-.394 1.543a.37.37 0 0 0 .22.185c.126.015.252.046.363.046 1.008-.03.835.108.63.834-.33 1.234-.614 2.483-.614 3.78 0 .339-.064.678-.08 1.018a.506.506 0 0 1-.267.432c-.158.108-.316.2-.442.308-.472.402-.583.849-.394 1.404.237.695.505.88 1.261.88.678.015 1.356 0 2.034 0 .772 0 1.544 0 2.332.015.441 0 .715.206.82.617.094.37.173.741.315 1.096.835 2.252 2.38 3.888 4.523 4.999a11.154 11.154 0 0 0 6.273 1.234c2.08-.185 3.988-.849 5.659-2.083 1.796-1.327 2.978-3.04 3.451-5.215.032-.108.048-.2.08-.293.078-.278.141-.34.409-.355.236-.015.457-.015.678-.015h17.731c2.017 0 4.05.015 6.068 0a5.46 5.46 0 0 0 2.9-.833 4.219 4.219 0 0 0 1.245-1.22c1.75-2.745 3.767-5.276 6.179-7.513a18.323 18.323 0 0 1 3.373-2.484c.614-.355 1.276-.617 1.954-.833.425-.124.835-.2 1.277-.2.157 0 .331.015.488-.032.52-.107 1.025-.308 1.324-.771a5.168 5.168 0 0 0 .725-1.713c.158-.71-.094-1.311-.709-1.712h.031ZM75.181 10.699c.283-.216.567-.402.835-.617.268-.217.536-.433.725-.726.173-.231.142-.4-.11-.555-.757-.478-.978-1.188-.93-2.021 0-.232.11-.417.315-.556.22-.139.441-.154.678 0 .283.17.441.417.583.695.063.123.079.354.268.37.22.015.252-.216.362-.355.063-.093.11-.2.174-.309.142-.216.173-.432.142-.694a2.15 2.15 0 0 1-.032-.71c.016-.385.268-.524.63-.4.08.03.158.061.221.107.867.51 1.813.602 2.774.54.095 0 .174 0 .252-.03.41-.093.489.107.473.4 0 .232-.063.448-.126.649-.047.216-.11.432-.126.648-.063.678.19 1.218.772 1.589.048.03.11.061.158.092.268.155.347.37.016.617a.968.968 0 0 1-.505.201c-.41.015-.551.247-.614.617a3.79 3.79 0 0 1-.19.694c-.362 1.08-1.056 1.883-2.096 2.392-.41.216-.85.37-1.308.494-.158.03-.315.077-.473.123-.33.077-.599.216-.693.586-.048.186-.174.2-.316.078a1.008 1.008 0 0 0-.141-.124 5.72 5.72 0 0 0-1.135-.91c-.284-.17-.441-.386-.441-.725.015-.556-.11-1.08-.316-1.59-.11-.308-.094-.354.174-.555V10.7Zm-1.214 3.193c.126-.216.268-.308.394-.385.126-.062.236-.077.363-.016.961.54 1.86 1.157 2.49 2.083.079.108.142.232.205.37.079.185.079.37 0 .37-.142 0-.174-.138-.252-.215a10.285 10.285 0 0 0-1.703-1.482c-.441-.308-.945-.524-1.497-.725Zm18.062 20.536c.032-.093.063-.2.174-.231.268-.093.315-.325.362-.571.063-.247.11-.51.19-.756.346-.91.992-1.343 1.907-1.327.914.015 1.844 0 2.758.015.157 0 .205.093.126.232-.063.123-.142.246-.205.355-.567.91-.694 1.882-.52 2.9.094.57.3 1.11.567 1.636.063.108.126.216.173.324.142.262.095.339-.236.354h-3.861c-.363.016-.568-.123-.694-.447a57.027 57.027 0 0 0-.725-1.728c-.126-.247-.094-.494-.016-.756Zm-5.737.062s.08-.155.095-.232c.063-.231.189-.37.457-.386.284-.015.489-.2.662-.4.22-.217.425-.433.693-.602.741-.494 1.53-.494 2.333-.201.347.123.552.386.678.725l-.284-.231c-.599-.37-1.23-.432-1.86-.093-.599.324-.914.849-.914 1.528.016.216.047.432.063.663.016.093-.063.139-.157.139-.08 0-.158-.03-.237-.046l-1.371-.51c-.22-.077-.237-.138-.158-.354Zm-15.76.678c.535-2.53 1.465-4.906 2.852-7.112.173-.293.362-.586.567-.864l.032-.031c.094-.2.22-.37.378-.555.063-.078.126-.155.205-.232.063-.046.158-.062.205.016.063.092.11.185.142.277.362.957.945 1.805 1.513 2.654a8.41 8.41 0 0 0 2.38 2.314c1.26.864 2.585 1.605 3.94 2.315.694.354 1.387.678 2.096 1.018.284.139.584.247.93.262.457 0 .867.185 1.293.34.504.185.993.4 1.513.478.283.046.441.2.52.447.079.247.157.494.252.74.867 2.608 1.75 5.2 2.632 7.808.126.386.237.771.378 1.142.127.354.095.648-.078.972-.457.817-.867 1.65-1.23 2.499-.662 1.481-1.213 3.009-1.481 4.629-.126.802-.237 1.62-.08 2.437.08.355.143.71.316 1.034.19.309.126.54-.079.818a340.99 340.99 0 0 0-2.096 2.962c-.898 1.265-1.813 2.515-2.68 3.796-.346.509-.803.725-1.402.71h-1.261c-.047-.186.079-.201.158-.248.189-.123.378-.246.504-.432.315-.416.252-.802-.19-1.064a2.066 2.066 0 0 0-.504-.216c-.41-.108-.835-.2-1.245-.293-.22-.062-.441-.093-.662-.155-.472-.139-.835-.385-1.056-.833a1.746 1.746 0 0 0-.236-.355c-.032-.03-.11-.046-.158-.03-.094 0-.142.092-.142.17 0 .292.142.524.316.755.11.154.252.293.425.494-.677-.077-1.15-.34-1.418-.895-.08-.123-.142-.247-.237-.355-.015-.03-.11-.046-.157-.046-.095.015-.142.093-.158.17-.031.123 0 .231.063.354.22.556.63.91 1.198 1.111.347.108.71.185 1.072.263.33.092.678.154 1.008.246.142.047.268.108.394.17.127.077.158.263.064.37-.268.294-.568.51-.978.571H76.615c-.883 0-1.34-.4-1.513-1.265-.142-.632-.047-1.265.079-1.897.031-.232.126-.463.189-.695.016-.092.047-.2.063-.293a.2.2 0 0 0-.126-.185c-.11-.062-.205 0-.268.077a.634.634 0 0 0-.11.2c-.316.865-.458 1.744-.363 2.654.063.51.252.972.599 1.358.047.062.126.123.079.216-.048.077-.142.062-.22.062h-1.041c-.851 0-1.687-.016-2.522 0-1.387.03-2.6-.463-3.672-1.28-.978-.741-1.624-1.682-1.907-2.855a5.775 5.775 0 0 1-.158-2.083c.126-1.203.425-2.36.93-3.471.961-2.099 2.427-3.78 4.445-4.984.315-.185.646-.34.992-.478.3-.124.426-.324.442-.648a1.674 1.674 0 0 0-.284-1.08c-.378-.51-.756-1.003-1.277-1.358-.141-.092-.267-.2-.457-.355.126-.077.19-.123.268-.139 1.167-.447 2.333-.879 3.5-1.311.157-.062.346-.2.504-.062.204.155.094.37.063.556-.3 1.48-.489 2.962-.63 4.459-.127 1.48-.221 2.962-.127 4.428.063 1.188.19 2.36.552 3.502.142.432.33.849.567 1.25.363.632.93 1.064 1.592 1.357.52.232 1.025.247 1.513-.077.19-.108.347-.17.568-.092.299.108.567-.016.803-.185.221-.155.394-.355.552-.571.22-.309.394-.648.536-1.003.394-.972.646-1.975.835-3.009a40.74 40.74 0 0 1 .552-2.761c.347-1.59.71-3.163.961-4.768.22-1.265.379-2.53.473-3.81a15.94 15.94 0 0 0-.047-2.454c-.079-.895-.284-1.774-.772-2.561a2.307 2.307 0 0 0-.678-.772 5.706 5.706 0 0 1-.694-.678c-.693-.787-1.576-1.312-2.553-1.713-1.024-.432-2.08-.694-3.184-.864a28.08 28.08 0 0 0-2.553-.278 32.754 32.754 0 0 0-2.144-.077c-.094 0-.204 0-.3-.03-.14-.032-.204-.14-.204-.263s.032-.247.063-.355v.016ZM81.752 64.53c.331-.015.583.047.757.2.094.078.11.217.015.325a1.33 1.33 0 0 1-.677.493c.073-.4.042-.74-.095-1.018Zm-31.538.849c.378-1.543.993-2.993 2.002-4.258a10.172 10.172 0 0 1 2.947-2.515c1.529-.88 3.2-1.404 4.965-1.636a23.324 23.324 0 0 1 3.073-.231c.442-.016 1.214.123 1.986.139.11.015.205.03.3.061.283.062.33.155.252.432-.19.617-.363 1.235-.442 1.867-.142 1.142-.141 2.284.284 3.38a5.685 5.685 0 0 0 2.096 2.668c.252.17.52.324.773.494.031.015.063.062.047.093 0 .03-.032.077-.063.077-.378.123-.772.108-1.15.077-.6-.062-1.199-.062-1.782-.062-4.87 0-9.724-.015-14.595-.03-.205 0-.41 0-.614-.032-.08 0-.142-.077-.142-.17.016-.107.031-.23.063-.354Zm-.473-.154c-.157.617-.047.725-.883.71-2.6 0-5.185 0-7.786-.016-.709 0-.725-.031-.567-.725.552-2.237 1.56-4.259 3.09-6.002 1.024-1.173 2.237-2.16 3.593-2.978 2.143-1.28 4.46-2.144 6.919-2.7a39.451 39.451 0 0 1 3.861-.632c2.223-.263 4.445-.278 6.667-.201.993.03 2.002.17 2.995.262.173.016.347.078.489.108.031.14-.032.2-.08.247a11.315 11.315 0 0 0-1.701 2.577c-.3.617-.347.648-1.025.54-.788-.124-1.592-.062-2.38-.17-2.222.077-4.397.34-6.478 1.188-1.324.54-2.537 1.28-3.593 2.253-.804.74-1.45 1.62-1.986 2.576-.52.941-.883 1.929-1.135 2.962Zm-6.746-17.836s.08-.03.11-.046c.52-.124.741-.448.773-.957 0-.185.095-.386.173-.57.142-.294.379-.464.725-.464h8.149c.284 0 .567 0 .85.078.426.092.789.308.947.694.22.57.646.694 1.213.663.836-.03 1.67 0 2.522 0 .347-.015.662.062.977.263 1.009.632 2.128.987 3.31 1.172 1.324.2 2.648.17 3.972.031a16.143 16.143 0 0 0 2.71-.51c.269-.076.505-.06.742.093.41.278.803.571 1.119.942.031.03.047.123.031.154-.016.046-.094.077-.142.077-.205.015-.41.015-.614.015H42.807c-.33-.03-.425-.138-.457-.462-.063-.556.126-.91.646-1.173Zm-9.094 17.25c.079-.68.142-1.359.252-2.022a18.21 18.21 0 0 1 1.293-4.058c.961-2.16 2.27-4.12 3.798-5.924.883-1.034 1.86-1.96 2.9-2.855a.998.998 0 0 1 .662-.246c.19.015.363 0 .552 0h27.645c.22 0 .441 0 .678.015.205.015.33.139.378.324.047.216.047.417-.158.555a.852.852 0 0 1-.205.108c-1.008.432-1.875 1.05-2.695 1.76-.252.215-.488.277-.835.23-2.207-.292-4.429-.447-6.651-.385a52.291 52.291 0 0 0-4.098.309c-1.371.17-2.743.416-4.082.756a23.491 23.491 0 0 0-5.044 1.851c-1.97.972-3.704 2.268-5.138 3.919a13.904 13.904 0 0 0-2.963 5.523c-.095.355-.174.71-.268 1.05-.079.293-.174.37-.473.37-.662 0-1.324.03-1.97-.016-.93-.061-1.876-.046-2.821-.061-.158 0-.316 0-.489-.031-.158 0-.252-.124-.268-.278v-.895Zm22.696 6.186c-.756 1.358-1.844 2.376-3.23 3.117-1.435.756-2.964 1.11-4.587 1.126-2.128-.046-4.051-.633-5.737-1.929a7.174 7.174 0 0 1-2.396-3.209 8.566 8.566 0 0 1-.205-.679c-.063-.277-.016-.416.126-.478.3-.093.583-.015.694.216.078.17.141.34.204.51.93 2.499 3.436 4.427 6.179 4.782 2.632.355 4.886-.401 6.793-2.16a6.846 6.846 0 0 0 1.78-2.7c.048-.123.096-.262.143-.386.079-.2.22-.277.425-.293.363-.015.505.124.426.463a5.944 5.944 0 0 1-.615 1.62Zm-1.466-2.098c.804.015.836.046.52.771-.992 2.253-2.726 3.688-5.153 4.197-2.79.586-5.217-.139-7.203-2.176-.63-.663-1.072-1.45-1.419-2.299 0-.03 0-.061-.031-.107-.08-.247-.016-.355.236-.37.19-.016.363-.016.552-.016h12.498Zm45.739-13.593c-.93.031-1.812.309-2.647.694-1.025.463-1.97 1.065-2.853 1.744-1.53 1.157-2.853 2.515-4.098 3.95-.946 1.08-1.813 2.221-2.648 3.379-.331.478-.662.971-.962 1.465-.44.71-1.087 1.173-1.86 1.497-.63.262-1.276.37-1.97.37-8.321-.015-16.643 0-24.95 0h-24.84c-.204 0-.409-.015-.614-.015-.362.03-.551-.186-.678-.479-.141-.339-.094-.648.174-.879a1.948 1.948 0 0 1 1.103-.494c.158-.015.315-.015.489-.015 2.427.015 4.854-.031 7.297.03 6.888.14 13.76.062 20.647.078 6.872.03 13.744.015 20.616.03h.662c.678.016 1.182-.246 1.545-.802.662-.94 1.323-1.882 2.001-2.808l5.674-8.053c.63-.88 1.056-1.836 1.198-2.916.126-.91-.031-1.806-.268-2.67-.189-.678-.441-1.326-.662-1.99-1.135-3.363-2.27-6.727-3.388-10.09-.032-.093-.08-.2-.095-.293-.11-.37-.158-.525.378-.556.505-.03.914-.293 1.23-.71.126-.154.252-.138.33.031.237.54.474 1.065.694 1.605.914 2.145 1.828 4.29 2.695 6.434.536 1.311 1.009 2.623 1.513 3.934a6.53 6.53 0 0 0 1.53 2.36 5.462 5.462 0 0 0 2.032 1.312c.316.093.489.262.521.586.078.88.33 1.728.693 2.546.268.602.189.71-.489.725Z"
                        fill="#11416C"
                      />
                      <path
                        d="M71.903 50.428s-.127.077-.205.108c-1.01.432-1.876 1.049-2.696 1.759-.252.216-.488.277-.835.231-2.207-.293-4.429-.447-6.651-.386a52.294 52.294 0 0 0-4.098.309c-1.371.17-2.742.416-4.082.756a23.491 23.491 0 0 0-5.044 1.851c-1.97.972-3.704 2.268-5.138 3.92a13.903 13.903 0 0 0-2.963 5.523c-.095.355-.173.71-.268 1.049-.079.293-.173.37-.473.37-.662 0-1.324.031-1.97-.015-.93-.062-1.875-.047-2.821-.062-.158 0-.315 0-.489-.03-.157 0-.252-.124-.268-.279v-.894c.08-.68.142-1.358.252-2.022a18.21 18.21 0 0 1 1.293-4.057c.961-2.16 2.27-4.12 3.798-5.925.883-1.034 1.86-1.96 2.9-2.854a.998.998 0 0 1 .662-.247c.19.015.363 0 .552 0h27.645c.22 0 .441 0 .678.015.205.016.33.14.378.324.047.216.047.417-.157.556Z"
                        fill="#11426C"
                      />
                      <path
                        d="M81.501 65.934s-.031-.077-.063-.077c-.079 0-.158.015-.174.108 0 .015.032.061.064.061.079 0 .142 0 .173-.092ZM90.469 70.083h-2.143c-.253 0-.49-.03-.71-.17-.41-.262-.536-.647-.347-1.095.127-.278.316-.509.52-.74.52-.556 1.057-1.111 1.577-1.682 1.26-1.358 2.427-2.808 3.404-4.382 1.261-2.021 2.948-3.61 5.044-4.798a9.434 9.434 0 0 1 3.578-1.204 8.818 8.818 0 0 1 3.64.309c1.387.417 2.617 1.11 3.752 1.99.283.232.567.463.835.695.362.308.567.725.693 1.172.111.401.095.803-.173 1.142-.173.216-.142.386 0 .602a8.809 8.809 0 0 1 1.151 2.885c.567 2.746-.032 5.261-1.734 7.483-1.371 1.79-3.2 2.962-5.454 3.44-2.978.633-5.69 0-8.07-1.836a8.711 8.711 0 0 1-2.6-3.224c-.315-.68-.33-.618-1.009-.618H90.47v.031Zm18.693-3.379v-.293c-.032-1.635-.646-3.04-1.687-4.289-.283-.34-.599-.493-1.056-.478-1.465 0-2.884.216-4.271.725-1.418.51-2.616 1.312-3.515 2.515-.788 1.05-1.544 2.114-2.08 3.317-.158.355-.378.679-.678.91-.52.417-.441.479-.173 1.003.031.077.079.14.126.216 1.623 2.623 4.618 3.734 7.266 3.333 3.451-.525 6.162-3.58 6.052-6.943l.016-.016Zm.583-.817h-.047v1.589h.047v-1.59Zm-13.413 5.94c.147.226.279.36.394.401-.094-.093-.268-.278-.394-.401Zm4.949 2.376c-.22-.047-.331-.077-.457-.031.11.062.221.046.457.03Zm1.435 0c.22.03.33.046.425-.016-.11-.046-.221-.03-.425.016Zm-.662.046s-.079.031-.127.046c.032 0 .063.031.111.031.047 0 .094-.015.142-.03-.032 0-.063-.016-.126-.032v-.015ZM107.018 33.286h3.01c.189 0 .363-.015.552.047.079.03.142.092.142.17a.195.195 0 0 1-.111.185c-.094.03-.189.061-.299.077h-6.32c-.221 0-.457.03-.662-.047-.095-.03-.174-.092-.174-.216 0-.123.095-.185.19-.2.173-.03.362-.03.551-.03h3.121v.014ZM108.941 27.33c0 .077-.016.154-.094.216-.111.077-.221.17-.347.247-1.592.957-3.2 1.913-4.807 2.87a4.329 4.329 0 0 1-.379.2c-.126.062-.268.016-.315-.077-.063-.139 0-.231.111-.309a1.44 1.44 0 0 1 .204-.123c1.64-.972 3.263-1.96 4.902-2.931.158-.093.315-.186.505-.216.094 0 .22.077.22.154v-.031ZM108.91 38.5c-.032.078-.079.14-.174.155-.141.016-.283-.046-.409-.108-.584-.247-1.167-.494-1.734-.74-.962-.402-1.907-.818-2.869-1.22a3.544 3.544 0 0 1-.536-.277c-.094-.062-.11-.17-.063-.262.048-.077.127-.124.205-.093.142.031.284.062.41.108 1.576.679 3.137 1.358 4.697 2.037.126.061.252.123.378.2.079.047.095.124.095.216v-.015ZM76.552 7.042s.11.047.126.093c.047.278.094.54.268.771.031.031 0 .124-.016.17-.047.077-.126.093-.205.093a.335.335 0 0 1-.173-.062c-.3-.2-.41-.633-.22-.941.046-.062.11-.124.22-.108v-.016Z"
                        fill="#11416C"
                      />
                      <path
                        d="M101.991 63.635c1.749-.108 3.199 1.527 3.168 3.055-.016 1.712-1.372 3.085-3.137 3.116-1.718.031-3.168-1.358-3.168-3.085 0-1.837 1.497-3.117 3.137-3.086ZM48.087 68.417c-.079 0-.158-.031-.236-.046-.174.046-.347.108-.552.108-.205 0-.362-.062-.536-.108h-.378c-.079 0-.158-.031-.237-.031-.094.03-.189.046-.3.061a3.103 3.103 0 0 0 3.137 2.808c1.671-.03 2.948-1.25 3.105-2.823-1.34 0-2.679.03-4.019.03h.016Z"
                        fill="#11416C"
                      />
                      <path
                        d="M41.294 25.695s-.788 1.697 1.497 2.53"
                        stroke="#11426C"
                        strokeWidth="0.3"
                        strokeMiterlimit={10}
                      />
                      <path
                        d="m57.17 24.546-10.466-4.172-2.033 4.887 10.466 4.172 2.033-4.887Z"
                        fill="#11416C"
                      />
                      <path
                        d="M56.41 32.515s-.458 1.234-3.326.108M53.21 9.357s1.134.216 2.6.123c1.829-.123 2.396 1.003 4.02 2.685l-6.62-2.808Z"
                        stroke="#11426C"
                        strokeWidth="0.3"
                        strokeMiterlimit={10}
                      />
                      <path
                        d="M57.828 30.215a.543.543 0 0 1-.662-.231c-.315.771-.646 1.527-.962 2.299a5.404 5.404 0 0 1-.252.524c-.047.093-.142.17-.3.216H55.37c-.063.047-.142.062-.252.062-.063 0-.11 0-.158-.03-.047 0-.079.015-.126.015h-.11a.293.293 0 0 1-.047.154c.315-.031.63-.077.93-.17.141-.046.283-.108.425-.17.016 0 .047 0 .063-.015.047-.03.063-.093.11-.123a.767.767 0 0 1 .284-.309.733.733 0 0 1 .236-.139c.221-.37.458-.725.647-1.11.063-.14.126-.263.189-.402l.094-.231c.016-.047.158-.309.032-.078.047-.077.079-.17.11-.246l.032-.016ZM64.243 14.232c-.032-.124-.08-.247-.126-.37-.048-.062-.095-.14-.142-.201-.016 0-.032-.031-.063-.046l-.032-.031-.016-.016s-.031-.015-.047-.03c-.032-.016-.047-.031-.079-.047-.031 0-.047-.015-.047-.015a.12.12 0 0 1-.063-.031h-.095c-1.891-.772-3.798-1.528-5.69-2.299-2.679-1.08-5.343-2.16-8.022-3.225a4.052 4.052 0 0 0-.567-.185c-.316-.077-.568.031-.757.278-.11.139-.173.293-.236.463-.22.494-.426.987-.647 1.496-.22.54-.457 1.08-.677 1.62a.555.555 0 0 1 .441.062c.047 0 .079-.015.142-.015a.4.4 0 0 1 .142.015c-.158-.2-.095-.555.189-.632-.032-.078 0-.155.032-.278.315-.756.63-1.512.96-2.268.095-.232.253-.293.49-.2.598.23 1.182.462 1.765.709.205.093.252.216.157.432a102.39 102.39 0 0 1-1.024 2.299c0 .015-.237.494-.252.509 0 .046.078-.17.047-.123v.123c0 .03.079-.185.079-.154a.349.349 0 0 1 .063.216c0 .061 0 .108-.032.154a.245.245 0 0 1-.047.139 5.89 5.89 0 0 0 1.655.663c0-.108.079-.231.19-.293a1.56 1.56 0 0 1 .172-.416v-.016c.032-.123.095-.278.19-.494.205-.447.41-.91.614-1.357l.19-.417c.173-.34.22-.355.551-.231.11.03.205.077.315.108 1.687.678 3.373 1.373 5.06 2.052.126.046.236.108.362.17.047.03.079.092.142.154-.016.077-.016.17-.063.247-.347.771-.678 1.542-1.04 2.314-.048.108-.11.17-.19.185v.108c0 .062 0 .123-.031.185.52.17 1.04.37 1.545.602.142.062.283.139.394.231.047-.108.078-.231.094-.355v-.046c0-.062.016-.123.063-.2.316-.726.647-1.466.977-2.191.142-.309.253-.355.568-.232.504.2 1.024.401 1.529.617.346.155.394.278.268.618-.3.74-.615 1.465-.93 2.206 0 .03-.032.077-.047.108 0 .046-.032.092-.048.123-.079.124-.11.324-.173.494 0 .03-.032.062-.032.093 0 0 .032 0 .032.015.11 0 .22.046.315.154.032.031.063.077.079.124.441-1.034.867-2.068 1.308-3.101a.431.431 0 0 0 .063-.186v-.03c0-.062.016-.124.032-.186V14.232Z"
                        fill="#11416C"
                      />
                      <path
                        d="M57.481 30.215s6.95-12.481 15.289-15.938"
                        stroke="#11426C"
                        strokeWidth="0.3"
                        strokeMiterlimit={10}
                      />
                      <path
                        d="m62.225 19.184.567-1.358c.316-.2 6.92-4.69 11.869-3.132 1.733.54 2.49 1.389 3.073 2.84l.22 1.65c-.52-1.373-2.363-3.07-3.593-3.456-4.192-1.296-12.073 3.41-12.136 3.456ZM57.26 30.215l-.535 1.512c.362.062 8.731-.03 13.491-2.067 2.538-1.08 3.783-2.561 4.776-3.487l-.978-2.129c.127 1.466-3.42 3.857-4.633 4.29-5.217 1.881-12.058 1.897-12.136 1.881h.015ZM51.224 17.286s-.047.139-.08.2c0 0-.015.016-.03.016-.11 0-.19-.03-.253-.139-.047-.077-.063-.154-.094-.231-.063-.2-.126-.386-.19-.587-.015-.061-.047-.108-.11-.123-.063-.03-.142-.046-.205-.077-.094.247-.189.494-.283.725-.095-.03-.19-.077-.3-.108.236-.602.457-1.188.694-1.774h.031c.268.108.552.2.82.308a.56.56 0 0 1 .252.17.438.438 0 0 1 .11.355.667.667 0 0 1-.236.463.436.436 0 0 1-.41.108h-.063v.03c.047.155.095.31.158.463 0 .031.015.062.031.093.016.062.047.093.11.108h.048Zm-.851-1.219h.031c.158.062.3.123.457.17l.142.046c.063 0 .142 0 .19-.062a.438.438 0 0 0 .11-.277.173.173 0 0 0-.048-.124.344.344 0 0 0-.126-.077c-.173-.062-.347-.139-.52-.2h-.032c-.063.17-.126.339-.204.509v.015ZM58.222 18.675s.031-.092.063-.138c.031-.062.063-.124.11-.185.079-.078.158-.093.268-.093.11 0 .205.062.3.139-.032.077-.064.139-.08.216h-.031c-.031 0-.047-.016-.079-.031-.094-.03-.173 0-.205.093-.015.046-.031.077-.047.123.079.03.173.062.252.093-.047.061-.11.138-.157.2-.063-.015-.11-.046-.174-.062-.142.355-.284.71-.41 1.065-.094-.03-.189-.062-.283-.108.142-.355.268-.71.41-1.065a6.92 6.92 0 0 1-.395-.154c-.141.355-.283.71-.41 1.065-.094-.031-.188-.077-.283-.108.142-.355.284-.71.41-1.065-.063-.015-.11-.046-.158-.062l.095-.231c.063.015.11.03.157.062l.048-.14a.393.393 0 0 1 .126-.184.292.292 0 0 1 .268-.093c.11 0 .205.062.3.139-.032.077-.064.139-.08.216-.031 0-.063-.03-.094-.03-.016 0-.047 0-.063-.016-.063 0-.11.015-.142.077a.458.458 0 0 0-.063.154c.126.046.252.093.394.154l-.047-.03ZM54.266 17.209l.189-.463c.11 0 .205.015.315.03v.031c-.19.494-.378.972-.567 1.466-.048.108-.063.216-.048.324-.031 0-.047-.015-.078-.03-.064-.016-.127-.047-.174-.063-.031 0-.047-.03-.047-.061v-.124c-.032 0-.047.016-.079.031a.58.58 0 0 1-.646-.17c-.11-.123-.142-.277-.11-.447v-.062c.047-.154.094-.308.189-.447a.565.565 0 0 1 .394-.247c.11-.015.236 0 .346.03.11.032.221.078.316.155l.015.016-.015.03Zm-.095.262a.628.628 0 0 0-.378-.185c-.158-.031-.268.03-.347.154-.032.046-.047.092-.063.139a1.142 1.142 0 0 0-.079.247c0 .061 0 .123.016.185a.26.26 0 0 0 .236.139.864.864 0 0 0 .347-.062c.032 0 .032-.03.047-.046.032-.093.08-.2.11-.294.032-.092.064-.185.111-.277ZM59.892 20.141c-.315-.123-.63-.231-.961-.354-.032.046-.032.108-.032.154a.29.29 0 0 0 .08.2.552.552 0 0 0 .314.155c.063 0 .127 0 .19-.031h.031l.19.185c-.017 0-.032.03-.048.03a.513.513 0 0 1-.394.078.842.842 0 0 1-.52-.262.585.585 0 0 1-.142-.417c0-.108.047-.216.079-.309.015-.046.031-.077.047-.123a.557.557 0 0 1 .426-.34c.283-.046.52.031.709.232a.459.459 0 0 1 .126.34c0 .154-.047.293-.11.447l.015.015Zm-.189-.34v-.03c.032-.093 0-.185-.047-.262a.461.461 0 0 0-.363-.154c-.11 0-.189.046-.236.138 0 0 0 .031-.016.047.22.092.442.17.678.247l-.016.015ZM52.847 17.503c-.315-.124-.63-.232-.946-.355-.063.154-.031.293.095.386a.554.554 0 0 0 .236.108c.08.015.158 0 .221-.016h.063c.047.046.11.108.174.154-.048.047-.095.062-.142.093a.503.503 0 0 1-.3.03.914.914 0 0 1-.504-.246.53.53 0 0 1-.158-.386c0-.077 0-.154.047-.231.032-.093.064-.185.11-.262a.614.614 0 0 1 .348-.309c.267-.093.599.015.772.2.11.14.157.278.126.448 0 .123-.063.231-.11.355l-.032.03Zm-.189-.34s0-.077.016-.108a.298.298 0 0 0-.126-.247.446.446 0 0 0-.284-.092.322.322 0 0 0-.205.062.243.243 0 0 0-.079.123c.22.077.442.17.678.247v.015ZM51.65 18.844h.03c.253-.123.537.031.631.216a.562.562 0 0 1 .048.355 1.789 1.789 0 0 1-.142.37.553.553 0 0 1-.268.232c-.079.03-.158.03-.237.03-.094 0-.173-.03-.268-.061-.141-.062-.283-.123-.394-.232l-.031-.03c.19-.51.394-1.003.583-1.512.095 0 .19.015.284.03-.079.216-.158.417-.237.618v-.016Zm-.316.772a.936.936 0 0 0 .331.154c.142.03.237 0 .315-.139.063-.108.095-.216.127-.324v-.077c0-.093-.032-.154-.127-.2-.094-.047-.204-.062-.3 0a.316.316 0 0 0-.188.184c-.032.093-.079.201-.11.294 0 .03-.032.077-.048.108ZM50.688 19.632l-.237-.093c-.015 0-.031-.015-.015-.03v-.124h-.063c-.095.015-.19.03-.284.03a.445.445 0 0 1-.363-.184.368.368 0 0 1 .158-.587c.095-.046.205-.03.3 0 .11.031.204.078.315.108l.142.047c.031-.078.063-.155.015-.232a.278.278 0 0 0-.126-.108.663.663 0 0 0-.346-.061h-.095c0-.078-.032-.14-.032-.216h.08c.188 0 .377.015.55.123a.459.459 0 0 1 .206.216c.063.108.063.216.015.34-.063.154-.126.323-.189.478-.047.092-.063.2-.047.308l.016-.015Zm-.126-.587h-.032c-.126-.046-.236-.092-.362-.138-.016 0-.048 0-.063-.016-.063 0-.11 0-.142.062l-.047.093c0 .03 0 .077.031.092.047.046.11.077.19.077.125 0 .236 0 .362-.03 0 0 .015 0 .031-.016 0-.03.032-.062.047-.108l-.015-.015ZM52.422 20.033l.22-.046v.03a.315.315 0 0 0 .174.201c.078.031.157.078.252.062.047 0 .094-.03.11-.077.016-.046 0-.093 0-.123-.047-.062-.11-.093-.157-.14-.08-.061-.174-.107-.237-.17-.047-.06-.094-.122-.11-.184-.032-.2.094-.386.3-.386.204 0 .378.046.535.185a.685.685 0 0 1 .126.17v.015c-.063.031-.142.062-.205.093 0-.015-.015-.031-.031-.046-.047-.093-.142-.14-.252-.155-.048 0-.08 0-.126-.015-.063 0-.127.062-.08.139 0 .03.032.046.064.062.063.046.142.108.22.154a.978.978 0 0 1 .19.17.32.32 0 0 1 .078.2.349.349 0 0 1-.157.293c-.079.047-.158.077-.237.062a.713.713 0 0 1-.535-.232.448.448 0 0 1-.11-.262h-.032ZM55.385 18.752s.063.138.11.216c-.063.03-.142.046-.205.061a.894.894 0 0 1-.614-.231.53.53 0 0 1-.158-.386c0-.046 0-.108.016-.154a.982.982 0 0 1 .173-.417.552.552 0 0 1 .52-.262c.205 0 .378.077.536.216a.685.685 0 0 1 .126.17 1.6 1.6 0 0 0-.236.108c0-.016-.016-.031-.032-.047a.368.368 0 0 0-.142-.123c-.063-.015-.11-.046-.173-.062-.142-.03-.252 0-.347.124a.848.848 0 0 0-.157.432c0 .108.047.2.142.262a.573.573 0 0 0 .283.108h.158v-.015ZM56.362 17.472c.094 0 .205.015.315.03 0 .032-.016.062-.032.093-.126.34-.268.68-.394 1.019-.047.108-.078.2-.126.308 0 .016-.015.046-.015.077 0 .062 0 .108.063.14.031.015.063.03.078.045.016 0 .048.016.064.031-.032.077-.048.14-.08.216h-.03a.522.522 0 0 1-.221-.061.326.326 0 0 1-.205-.263c0-.061 0-.108.015-.17.142-.385.3-.755.442-1.141.031-.093.079-.185.11-.278v-.03l.016-.016ZM49.506 17.395c.094 0 .189.015.284.03-.032.078-.048.14-.08.201-.141.37-.283.726-.425 1.096v.03c-.016.078 0 .14.079.17.032.016.079.031.11.047-.031.061-.047.123-.078.2-.11-.015-.221-.03-.316-.108a.308.308 0 0 1-.094-.324l.142-.37c.11-.293.236-.602.346-.895 0-.015 0-.03.016-.062l.016-.015ZM56.913 18.181c.095.031.19.078.284.108-.173.432-.33.864-.504 1.296-.095-.03-.19-.077-.284-.108.174-.431.331-.864.505-1.296ZM48.45 14.463s.031.077.063.093c.079.077.173.138.268.2.173.108.362.216.536.293.047.016.094.046.142.046.031 0 .047.031.047.062s-.016.046-.047.062c-.032 0-.064 0-.064-.031 0-.03-.047-.062-.063-.077a3.289 3.289 0 0 0-.599-.34 3.091 3.091 0 0 0-.22-.092.227.227 0 0 1-.095-.031h-.079c-.078.03-.141.016-.204-.03-.063-.047-.08-.109-.063-.186a.184.184 0 0 1 .141-.139c.126-.015.205.062.221.155l.016.015ZM47.3 16.7a.165.165 0 0 1 .094-.185c.079-.03.158 0 .19.062a.291.291 0 0 0 .125.108c.158.077.331.123.505.139h.094c.047 0 .079 0 .11.03a.074.074 0 0 1 0 .109.107.107 0 0 1-.094.061c-.047 0-.095 0-.11-.046-.048-.108-.142-.154-.252-.185a1.337 1.337 0 0 0-.347-.046c-.032 0-.08 0-.11.03-.064.031-.142.031-.19-.03-.015-.016-.031-.047-.047-.062l.032.015ZM47.03 17.425s.158.031.174.093c.016.062.048.093.095.139.142.108.284.17.457.216.047 0 .11 0 .142-.03.047-.032.11-.016.142.015.031.046.015.092-.016.123a.077.077 0 0 1-.11 0 2.463 2.463 0 0 0-.662-.262c-.063 0-.11-.016-.174 0a.144.144 0 0 1-.173-.124.156.156 0 0 1 .126-.185v.015ZM48.103 16.53l-.142-.046c-.095-.015-.19-.046-.284-.062h-.094c-.063.031-.158 0-.205-.077a.182.182 0 0 1 0-.216c.047-.061.142-.092.205-.061.063.03.11.077.126.138 0 .062.031.093.078.124.095.062.19.108.3.154h.031l-.015.046ZM47.93 15.928s.016.062.047.093c.063.061.142.123.205.17.126.076.268.138.41.184.031 0 .063.016.094.016.032 0 .063.03.063.062 0 .03 0 .061-.031.077-.032.03-.095.015-.11-.016a.598.598 0 0 0-.174-.17 2.675 2.675 0 0 0-.473-.23c-.063-.016-.126-.047-.189-.032-.079 0-.157-.061-.157-.139 0-.077.047-.154.141-.17.08 0 .158.047.174.124v.031Z"
                        fill="#11416C"
                      />
                      <path
                        d="M47.536 16.886s.11 0 .142.062a.266.266 0 0 0 .094.092c.048.03.08.03.127-.015.078-.077.189-.047.22.03.032.062 0 .124-.047.17a.174.174 0 0 1-.174 0c-.015-.015-.031-.046-.063-.062a.217.217 0 0 0-.063-.046c-.047-.03-.094-.015-.142.016-.047.046-.094.061-.157.03-.063-.015-.095-.077-.095-.138 0-.062.048-.108.11-.124l.048-.015ZM47.961 15.775c-.015-.093.032-.155.11-.17.08 0 .158.046.158.123 0 .062.032.108.063.14a.758.758 0 0 0 .252.184c.032 0 .064.031.08.031h.078c.047 0 .095.031.095.062 0 .046 0 .093-.048.108-.047.03-.126 0-.142-.046-.015-.077-.078-.124-.141-.17a1.355 1.355 0 0 0-.41-.17c-.063 0-.11-.046-.126-.108l.031.016ZM47.772 17.58h.032c.063-.015.126 0 .141.062.032.061 0 .123-.047.139-.063.03-.126 0-.157-.047-.048-.123-.158-.139-.268-.139h-.095c-.079 0-.142-.061-.126-.154 0-.061.063-.108.126-.108.079 0 .126.047.126.108 0 .062.032.093.095.124.047.03.11.03.173.03v-.015ZM48.308 15.636s0-.108.047-.139a.12.12 0 0 1 .142 0c.047.031.063.077.063.139v.046c0 .046.016.077.063.077h.063c.047 0 .079 0 .11.047a.074.074 0 0 1 0 .108c-.016.046-.047.061-.094.061-.048 0-.08-.015-.095-.061 0-.031-.016-.047-.031-.078 0-.046-.048-.077-.095-.077h-.063c-.063 0-.095-.046-.11-.108v-.015ZM48.37 15.25s.032-.124.096-.155c.063-.015.126 0 .157.062.016.046.063.077.11.093.08.03.158.046.237.046h.079c.078 0 .126.046.11.108 0 .046-.047.077-.095.077-.031 0-.078-.015-.094-.062-.016-.092-.079-.108-.158-.123h-.142c-.031 0-.063 0-.094.03-.047.032-.079.032-.126 0-.048-.015-.063-.046-.08-.092v.016ZM48.844 15.08c-.079-.031-.157-.047-.252-.078h-.063c-.032 0-.063 0-.095.016-.078.046-.157.03-.205-.016-.047-.046-.063-.107-.031-.17.016-.061.079-.092.142-.092.063 0 .11.016.142.077a.32.32 0 0 0 .126.124c.063.046.142.077.205.123l.015.016h.016ZM57.245 18.012c-.095.015-.19-.047-.205-.124-.016-.077.047-.17.126-.185.095-.015.19.047.205.124.016.092-.032.17-.126.185Z"
                        fill="#11416C"
                      />
                      <path
                        d="M47.614 17.364s.032-.139.095-.154c.064 0 .143.03.158.092 0 .062-.031.14-.094.154-.064.016-.143-.03-.159-.092ZM48.718 15.42s.126.03.126.092-.032.108-.095.124c-.063 0-.11-.031-.126-.093 0-.062.032-.108.095-.123ZM47.662 18.011s.047 0 .063.016c.063 0 .126.03.205.03h.11c.032 0 .08 0 .095.047 0 .03 0 .062-.032.092-.031.016-.063.016-.078 0l-.032-.03a.256.256 0 0 0-.11-.062c-.063-.016-.126-.046-.19-.077h-.015l-.016-.016ZM48.308 16.607s.094.03.126.046c.047 0 .079.031.126.016.031 0 .063.015.079.046 0 .03 0 .062-.032.077-.032.016-.063.016-.079 0l-.031-.03c0-.047-.047-.062-.08-.093-.03-.031-.078-.047-.11-.062ZM49.017 15.158s.063.015.094.03c.048.016.11.047.158.031.047 0 .079.031.079.077 0 .031-.016.062-.063.078-.032 0-.079 0-.079-.047 0-.03-.032-.062-.047-.077-.032-.015-.063-.046-.095-.062 0 0-.031-.015-.047-.03ZM47.898 18.288h.174c.032 0 .063 0 .079.031v.078c-.016.015-.063.015-.079 0a.304.304 0 0 0-.158-.078h-.016v-.03ZM49.458 14.957s.08.046.127.031c.016 0 .047.015.047.03 0 .016 0 .047-.031.047h-.048a.681.681 0 0 1-.095-.108ZM48.087 18.474s.047 0 .047.03c0 .031 0 .047-.031.047-.016 0-.047 0-.047-.03 0-.016 0-.047.031-.047Z"
                        fill="#11416C"
                      />
                      <path
                        d="M49.018 15.158h-.032s.016 0 .032.015v-.015ZM48.844 15.08h.031s-.016 0-.031-.016v.016Z"
                        fill="#11416C"
                      />
                      <path
                        d="M47.362 11.177s-1.78 3.194-2.774 6.634c0 0-1.245 4.444-3.341 7.992"
                        stroke="#0F436D"
                        strokeWidth="0.3"
                        strokeMiterlimit={10}
                      />
                      <path
                        d="M42.76 28.225s2.995.941 6.037 2.422c0 0 6.02 3.271 7.108 2.3M62.714 17.38c-1.45 7.113-3.547 8.193-5.233 12.358-.33.818-.599 1.62-.93 2.438"
                        stroke="#11426C"
                        strokeWidth="0.3"
                        strokeMiterlimit={10}
                      />
                      <path
                        d="M47.473 11.177s5.69 2.715 7.628 3.1c0 0 4.004 1.158 7.613 2.994"
                        stroke="#11426C"
                        strokeWidth="0.5"
                        strokeMiterlimit={10}
                      />
                      <path
                        d="M41.184 26.713s.914-.309 1.608-1.82c0 0-1.419 1.943-1.718 1.496l.126.324h-.016Z"
                        fill="#11416C"
                      />
                      <path
                        d="M41.263 26.805s.567.124 1.387-.432c0 0-1.34.54-1.34.232l-.047.2Z"
                        fill="#11416C"
                      />
                      <path
                        d="M41.231 26.806s.378.432 1.371.478c0 0-1.402-.354-1.213-.617l-.158.139ZM55.448 33.225s.236-1.358-1.245-3.24c0 0 1.529 3.117.74 3.178l.505.077v-.015Z"
                        fill="#11416C"
                      />
                      <path
                        d="M55.605 33.193s.552-.601.41-2.02c0 0-.22 2.036-.646 1.82l.236.185v.015Z"
                        fill="#11416C"
                      />
                    </svg>{" "}
                    &nbsp; &nbsp;
                    <span className="fs-12">
                      Home Sample Collection Available{" "}
                    </span>
                  </div>
                  <div className="bg-gray ProductDetails_mobileHomeCollection__YwfNA gap-2 p-2 mb-2">
                    <span>
                      You will Save <b>₹6261</b> on this Package{" "}
                    </span>
                  </div>

                  <div className="clinic-details mt-4">
                    <div className="clinic-booking">
                      <Link className="btn btn-primary" onClick={() => handleSubmit(PackageDetails?.id)}>
                        Add To Cart
                      </Link>{" "}
                      <Link className="btn btn-success" onClick={() => handleSubmit(PackageDetails?.id)}>
                        ₹{PackageDetails?.price}
                        <br />
                        <font className="fs-12">Book Now</font>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card search-filter">
                <img src="https://www.metropolisindia.com/newdata/images/bannerimages/truhealth-home-page-desktop-banner-family-1.webp" />
              </div>
              <div className="card search-filter">
                <div className="card-body">
                  <div className="card flex-fill mt-0 mb-0">
                    <ul className="list-group list-group-flush benifits-col">
                      {PackageDetails?.offer
                        ? PackageDetails?.offer.map((data) => {
                            return (
                              <li className="list-group-item d-flex align-items-center">
                                <div>
                                  <font class="text-primary fs-16">
                                    {data?.disc_percantage}% Off
                                  </font>{" "}
                                  on {data?.no_patient} Patient
                                  <br />
                                  <span className="text-sm">
                                    <font class="fs-17">₹{data?.price}</font>{" "}
                                    <del class="text-primary">
                                      {" "}
                                      ₹{data?.offerPrice}
                                    </del>
                                  </span>
                                </div>
                              </li>
                            );
                          })
                        : null}
                    </ul>
                  </div>
                  <p className="fs-14 mt-3 mb-3">
                    Given amount is subject to change based on number of patient
                    you select, Applicable on minimum cart amount{" "}
                    <font class="fs-16">₹800</font>
                  </p>
                </div>
              </div>
              {/* /Right Details */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Healthcheckuppackagedetails;
