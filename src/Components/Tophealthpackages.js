import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import Slider from "react-slick";
import { DNA } from "react-loader-spinner";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Tophealthpackages = () => {
  const Navigate = useNavigate();
  const [TopData, setTopData] = useState();
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { triggerOnce: true, margin: "-100px" });

  let userId = secureLocalStorage.getItem("medicityuser");
  useEffect(() => {
    GetFeaturedList();
  }, [0]);
  const GetFeaturedList = () => {
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_API_KEY}packageList`)
      // tophealthCheckuppackageList
      .then((res) => {
        setTopData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
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
        Tophealthpackages();
        toast.success(res?.data?.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
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
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <section className="doctor-section" ref={ref}>
      <div className="container">
        <div className="row align-items-center mb-3">
          <div className="col-md-6" data-aos="fade-up">
            <div className="section-heading">
              <h2>Top Health Packages</h2>
              <p>Our Highlighted Packages</p>
            </div>
          </div>
          <div className="col-md-6 text-end" data-aos="fade-up">
            {/* Arrows will appear here */}
          </div>
        </div>

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
        ) : TopData?.length === 0 ? (
          <div className="no-data">No Doctors Curated Category Found.</div>
        ) : (
          <Slider {...settings}>
            {TopData?.map((data, index) => (
              <motion.div
                key={data._id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div key={data._id}>
                  <div className="card mx-2">
                    <div
                      onClick={() =>
                        Navigate(`/Healthcheckuppackagedetails/${data?._id}`)
                      }
                      className="card-img card-img-hover"
                    >
                      <Link to={`/Healthcheckuppackagedetails/${data?._id}`}>
                        <img
                          src={
                            data?.image
                              ? `${process.env.REACT_APP_IMG_URL}${data?.image}`
                              : "assets/img/blog/book-lab-02.jpg"
                          }
                          alt=""
                          style={{
                            height: "200px",
                            width: "100%",
                            objectFit: "cover",
                          }}
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
                      <div className="d-flex active-bar align-items-center justify-content-between p-3">
                        <a href="#" className="text-indigo fw-medium fs-14">
                          Reports in
                        </a>
                        <span className="badge bg-success-light d-inline-flex align-items-center">
                          <i className="fa-solid fa-circle fs-5 me-1" />
                          {data?.report_time} hrs
                        </span>
                      </div>
                      <div className="p-3 pt-0">
                        <div className="doctor-info-detail mb-3 pb-3">
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
                              {data?.title}
                            </Link>
                          </h3>

                          {data.test ? (
                            data.test.slice(0, 4).map((item, index) => (
                              <span
                                key={index}
                                className="badge bg-light text-dark me-2 mb-2"
                                style={{
                                  fontSize: "0.85rem",
                                  padding: "6px 12px",
                                  borderRadius: "20px",
                                }}
                              >
                                {item}
                              </span>
                            ))
                          ) : (
                            <h6 className="text-light mb-2">{data?.badges}</h6>
                          )}
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                          <div>
                            <p className="mb-1">
                              <b>78% off</b> for a limited
                            </p>
                            <h3 className="text-orange">₹{data?.price}</h3>
                          </div>
                          <Link
                            onClick={() => handleSubmit(data._id)}
                            className="btn btn-md btn-dark d-inline-flex align-items-center rounded-pill"
                          >
                            <i className="isax isax-calendar-1 me-2" />
                            Book Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </Slider>
        )}
      </div>
    </section>
  );
};

export default Tophealthpackages;
