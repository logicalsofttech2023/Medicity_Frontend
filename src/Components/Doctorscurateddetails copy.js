import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { DNA } from "react-loader-spinner";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

const Doctorscurateddetails = () => {
  const Navigate = useNavigate();
  const location = useLocation();
  const { ids, gender } = location.state || {};
  const [loading, setLoading] = useState(false);

  const [CategoryresDetailsList, setCategoryresDetailsList] = useState();
  useEffect(() => {
    GetpackageCategoryList(ids);
    window.scrollTo(0, 0);
  }, []);
  const GetpackageCategoryList = (ids) => {
    const data = {
      categoryId: ids,
    };
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_API_KEY}packageList`, data)
      .then((res) => {
        setCategoryresDetailsList(res.data.data);
      })
      .catch((err) => {
        console.log("err", err);
        toast.error("Something went wrong");
      })
      .finally(() => {
        setLoading(false);
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

  const colors = [
    "linear-gradient(135deg, rgb(245, 166, 35), rgb(247, 107, 28))",
    "linear-gradient(135deg, rgb(54, 209, 220), rgb(91, 134, 229))",
    "linear-gradient(135deg, rgb(255, 126, 179), rgb(255, 117, 140))",
    "linear-gradient(135deg, rgb(54, 209, 220), rgb(91, 134, 229))",
  ];
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
                    <li className="breadcrumb-item active">
                      Health Checkup Package
                    </li>
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
                {loading ? (
                  <div className="d-flex justify-content-center my-5">
                    <DNA
                      visible={true}
                      height="80"
                      width="80"
                      ariaLabel="dna-loading"
                      wrapperStyle={{}}
                      wrapperClass="dna-wrapper"
                    />
                  </div>
                ) : (
                  <>
                    {CategoryresDetailsList?.length > 0 ? (
                      <div className="row align-items-center">
                        <div className="col-md-12">
                          <div className="mb-4">
                            <h3>
                              Showing results for{" "}
                              <span className="text-secondary">
                                "Full Body"
                              </span>{" "}
                              package
                            </h3>
                          </div>
                        </div>
                      </div>
                    ) : null}

                    <div className="row">
                      {CategoryresDetailsList?.length > 0
                        ? CategoryresDetailsList?.map((packageData, index) => (
                            <div className="col-lg-4 col-md-6 mb-4" key={index}>
                              <div
                                className="card border-0 shadow-lg rounded overflow-hidden position-relative d-flex flex-column"
                                style={{
                                  background: colors[index % colors.length],
                                  color: "#fff",
                                  transition: "transform 0.3s ease-in-out",
                                  height: "100%",
                                }}
                                onMouseEnter={(e) =>
                                  (e.currentTarget.style.transform =
                                    "scale(1.05)")
                                }
                                onMouseLeave={(e) =>
                                  (e.currentTarget.style.transform = "scale(1)")
                                }
                              >
                                <div className="card-body d-flex flex-column justify-content-between">
                                  <h5
                                    onClick={() =>
                                      Navigate(
                                        `/Healthcheckuppackagedetails/${packageData?._id}`
                                      )
                                    }
                                    className="fw-bold mb-0"
                                    style={{ minHeight: "30px" }}
                                  >
                                    {packageData?.title}
                                  </h5>
                                  <div
                                    onClick={() =>
                                      Navigate(
                                        `/Healthcheckuppackagedetails/${packageData?._id}`
                                      )
                                    }
                                    className="d-flex justify-content-between align-items-center"
                                  >
                                    <a
                                      href="#"
                                      className="gap-1 d-flex text-light text-decoration-none"
                                    >
                                      <span className="fs-14 fw-bold">
                                        {packageData?.price}
                                      </span>
                                      <del className="fs-14">
                                        {packageData?.discount_price}
                                      </del>
                                    </a>
                                  </div>

                                  {/* Tags */}
                                  <div
                                    onClick={() =>
                                      Navigate(
                                        `/Healthcheckuppackagedetails/${packageData?._id}`
                                      )
                                    }
                                    className="my-0"
                                  >
                                    {packageData.test ? (
                                      packageData?.test.map((data) => {
                                        return (
                                          <span
                                            className="badge bg-light text-dark me-2 mb-2"
                                            style={{
                                              fontSize: "0.85rem",
                                              padding: "6px 12px",
                                              borderRadius: "20px",
                                            }}
                                          >
                                            {data}
                                          </span>
                                        );
                                      })
                                    ) : (
                                      <h6 className=" text-light mb-2 flexwrap-wrap">
                                        {packageData?.badges}
                                      </h6>
                                    )}
                                  </div>

                                  <div
                                    onClick={() =>
                                      Navigate(
                                        `/Healthcheckuppackagedetails/${packageData?._id}`
                                      )
                                    }
                                    className="d-flex justify-content-between align-items-center text-light small"
                                  >
                                    <span>
                                      Reports in {packageData.report_time} hours
                                    </span>
                                    <span className="fw-bold">
                                      {packageData.total_test} Tests
                                    </span>
                                  </div>

                                  <Link
                                    onClick={() =>
                                      handleSubmit(packageData?._id)
                                    }
                                    className="btn btn-light w-100 mt-1 rounded-pill fw-bold"
                                    style={{ color: "#333" }}
                                  >
                                    <i className="isax isax-shopping-cart me-2"></i>{" "}
                                    Add to Cart
                                  </Link>
                                </div>
                              </div>
                            </div>
                          ))
                        : !loading && (
                            <div className="col-lg-12 col-md-12 text-center">
                              <div className="error-info p-0">
                                <div className="error-404-img">
                                  <img
                                    src="assets/img/error-500.png"
                                    alt="error-500-image"
                                  />
                                  <div className="error-content">
                                    <h5 className="mb-2">
                                      Sorry! No Data Found.
                                    </h5>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctorscurateddetails;
