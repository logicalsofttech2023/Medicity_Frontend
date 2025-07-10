import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import Slider from "react-slick";
import { DNA } from "react-loader-spinner";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Swal from "sweetalert2";

const Featuredfamilycarepackage = () => {
  const Navigate = useNavigate();
  const [FeaturedData, setFeaturedData] = useState();
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { triggerOnce: true, margin: "-100px" });

  useEffect(() => {
    GetFeaturedList();
  }, []);

  const GetFeaturedList = () => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}familyCarepackageList`)
      .then((res) => {
        setFeaturedData(res.data.data);
        setLoading(false); // Stop loading once data is fetched
      })
      .catch((err) => {
        console.error("Error fetching featured list:", err);
        setLoading(false); // Stop loading even if there's an error
      });
  };

  let userId = secureLocalStorage.getItem("medicityuser");

  const handleSubmit = (id) => {
    if (!userId) {
      Swal.fire({
        icon: "error",
        title: "Login Required",
        text: "Please login to add items to your cart",
        confirmButtonText: "Go to Login",
        showCancelButton: true,
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          Navigate("/login");
        }
      });
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
        toast.error(error.response.data.message);
      });
  };
  const colors = ["#DFFFE3", "#E9F1FF", "#FFF1E4"];
  const colorss = ["#0E9384", "#0E82FD", "#E04F16"];

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
    <section className="features-section-sixteen" ref={ref}>
      <Toaster />
      <div className="container">
        <div className="section-head-twelve">
          <h2>Featured Family Care Packages</h2>
          <p>
            {" "}
            Explore Our Top-Tier Packages for Your Personalized Wellness
            Experience
          </p>
        </div>
        <div className="row">
          <div className="col-md-12">
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
            ) : FeaturedData?.length === 0 ? (
              <div className="no-data">No Doctors Curated Category Found.</div>
            ) : (
              <Slider {...settings}>
                {FeaturedData?.map((data, index) => (
                  <motion.div
                    key={data._id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div
                      className="feature-package-card"
                      style={{
                        background: colors[index % colors.length],
                        width: "302px",
                      }}
                    >
                      <div className="feature-package-type">
                        <h3
                          onClick={() =>
                            Navigate(
                              `/Healthcheckuppackagedetails/${data?._id}`
                            )
                          }
                        >
                          {data?.title}
                        </h3>
                        <div
                          onClick={() =>
                            Navigate(
                              `/Healthcheckuppackagedetails/${data?._id}`
                            )
                          }
                          className="package-cost"
                        >
                          <h6 className="text-primary">
                            {data?.total_test} Test Included
                          </h6>
                          <h5>
                            ₹{data?.price} <span> ₹{data?.discount_price}</span>
                          </h5>
                        </div>
                        <button
                          onClick={() => handleSubmit(data._id)}
                          style={{
                            background: colorss[index % colorss.length],
                          }}
                          className="package-book-btn"
                        >
                          Book Now
                        </button>
                      </div>
                      <div
                        onClick={() =>
                          Navigate(`/Healthcheckuppackagedetails/${data?._id}`)
                        }
                        className="package-img"
                      >
                        <img
                          src={
                            data?.image2
                              ? `${process.env.REACT_APP_IMG_URL}${data?.image2}`
                              : "assets/img/features/package-card-img-03.svg"
                          }
                          className="package-img-user"
                          alt="Img"
                        />
                        <img
                          src="assets/img/bg/package-card-bg-01.png"
                          className="package-img-bg"
                          alt="Img"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </Slider>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Featuredfamilycarepackage;
