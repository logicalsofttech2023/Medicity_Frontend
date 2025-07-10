import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import Slider from "react-slick";
import { DNA } from "react-loader-spinner";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const RecentView = () => {
  const Navigate = useNavigate();
  const [RecentData, setRecentData] = useState([]);
  const [loading, setLoading] = useState(true); // Loader state
  let userId = secureLocalStorage.getItem("medicityuser");
  const ref = useRef(null);
  const isInView = useInView(ref, { triggerOnce: true, margin: "-100px" });

  useEffect(() => {
    if (userId) {
      GetFeaturedList();
    } else {
      setLoading(false); // Stop loader if no user
    }
  }, []);

  const GetFeaturedList = () => {
    const data = {
      userId: secureLocalStorage.getItem("medicityuser"),
    };

    axios
      .post(`${process.env.REACT_APP_API_KEY}getRecentlyViewedPackages`, data)
      .then((res) => {
        setRecentData(res?.data?.data || []);
        setLoading(false); // Done loading
      })
      .catch((error) => {
        console.error("Error fetching recent packages:", error);
        setLoading(false);
      });
  };

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
        GetFeaturedList();
        toast.success(res?.data?.message);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || "Something went wrong");
      });
  };

  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="custom-arrow next-arrow" onClick={onClick}>
        <i className="fas fa-chevron-right"></i>
      </div>
    );
  };

  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="custom-arrow prev-arrow" onClick={onClick}>
        <i className="fas fa-chevron-left"></i>
      </div>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <section className="doctor-section" ref={ref}>
      <Toaster />
      <div className="container">
        {loading ? (
          <div className="d-flex justify-content-center my-5">
            <DNA
              visible={true}
              height="80"
              width="80"
              ariaLabel="dna-loading"
              wrapperClass="dna-wrapper"
            />
          </div>
        ) : RecentData?.length > 0 ? (
          <>
            <div className="section-header sec-header-one" data-aos="fade-up">
              <h2>Recently Viewed</h2>
            </div>

            <Slider {...settings}>
              {RecentData.map((data, index) => (
                <motion.div
                  key={data._id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="card" key={data?._id}>
                    <div
                      onClick={() =>
                        Navigate(`/Healthcheckuppackagedetails/${data?._id}`)
                      }
                      className="card-img card-img-hover"
                    >
                      <Link to={`/Healthcheckuppackagedetails/${data?._id}`}>
                        <img
                          src={
                            data?.packageId?.image
                              ? `${process.env.REACT_APP_IMG_URL}${data?.packageId?.image}`
                              : "assets/img/blog/book-lab-02.jpg"
                          }
                          alt="Package"
                          style={{ height: "200px" }}
                        />
                      </Link>
                      <div className="grid-overlay-item d-flex align-items-center justify-content-between">
                        <span className="badge bg-orange">
                          <i className="fa-solid fa-star me-1" />
                          0.0
                        </span>
                      </div>
                    </div>

                    <div className="card-body p-0">
                      <div
                        onClick={() =>
                          Navigate(`/Healthcheckuppackagedetails/${data?._id}`)
                        }
                        className="d-flex active-bar align-items-center justify-content-between p-3"
                      >
                        <a href="#" className="text-indigo fw-medium fs-14">
                          Reports in
                        </a>
                        <span className="badge bg-success-light d-inline-flex align-items-center">
                          <i className="fa-solid fa-circle fs-5 me-1" />
                          {data?.report_time} hrs
                        </span>
                      </div>

                      <div className="p-3 pt-0">
                        <div
                          onClick={() =>
                            Navigate(
                              `/Healthcheckuppackagedetails/${data?._id}`
                            )
                          }
                          className="doctor-info-detail mb-3 pb-3"
                        >
                          <h3 className="mb-1">
                            <Link
                              to={`/Healthcheckuppackagedetails/${data?._id}`}
                              style={{
                                display: "-webkit-box",
                                WebkitBoxOrient: "vertical",
                                WebkitLineClamp: 2,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {data?.packageId?.title}
                            </Link>
                          </h3>
                          <div className="d-flex flex-wrap">
  {Array.isArray(data?.packageId?.test) && data.packageId.test.length > 0 ? (
    data.packageId.test.slice(0, 4).map((testItem, index) => (
      <span
        key={index}
        className="badge bg-light text-dark me-2 mb-2"
        style={{
          fontSize: "0.85rem",
          padding: "6px 12px",
          borderRadius: "20px",
          maxWidth: "120px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
        title={testItem?.test_name || "Unnamed Test"} // Tooltip on hover
      >
        {testItem?.test_name || "Unnamed Test"}
      </span>
    ))
  ) : (
    <h6 className="text-light mb-2">
      {data?.packageId?.badges || "No tests"}
    </h6>
  )}
</div>

                        </div>

                        <div className="d-flex align-items-center justify-content-between">
                          <div>
                            <p className="mb-1">
                              <b>78% off</b> for a limited
                            </p>
                            <h3 className="text-orange">
                              ₹{data?.packageId?.price}
                            </h3>
                          </div>
                          <Link
                            onClick={() => handleSubmit(data?._id)}
                            className="btn btn-md btn-dark d-inline-flex align-items-center rounded-pill"
                          >
                            <i className="isax isax-calendar-1 me-2" />
                            Book Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </Slider>
          </>
        ) : null}
      </div>
    </section>
  );
};

export default RecentView;
