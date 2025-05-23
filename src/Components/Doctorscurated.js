import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { DNA } from "react-loader-spinner";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Doctorscurated = () => {
  const [Categoryres, setCategoryres] = useState([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { triggerOnce: true, margin: "-100px" });

  useEffect(() => {
    GetpackageCategoryList();
  }, []);

  const GetpackageCategoryList = () => {
    setLoading(true);

    axios
      .get(`${process.env.REACT_APP_API_KEY}packageCategoryList`)
      .then((res) => {
        setCategoryres(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
        setLoading(false);
      });
  };

  // Custom arrows
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
    slidesToShow: 6,
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

  const filteredData = Categoryres?.filter(
    (data) => data.type === "Doctors Curated"
  );

  return (
    <section className="speciality-section" ref={ref}>
      <div className="container">
        <div className="section-header sec-header-one" data-aos="fade-up">
          <h2>Doctors Curated Health Checkup Packages</h2>
        </div>

        <div className="slider-wrapper">
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
          ) : filteredData?.length === 0 ? (
            <div className="no-data">No Doctors Curated Category Found.</div>
          ) : (
            <Slider {...settings}>
              {filteredData.map((data, index) => (
                <motion.div
                  key={data._id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link to="/Doctorscurateddetails" state={{ ids: data?._id }}>
                    <div key={data._id}>
                      <div className="spaciality-item">
                        <div className="spaciality-img">
                          <img
                            src="assets/img/specialities/speciality.jpg"
                            alt={data?.name || "Speciality"}
                            className="background-img"
                          />
                          <span className="spaciality-icon">
                            <img
                              src={`${process.env.REACT_APP_IMG_URL}${data?.image}`}
                              alt={data?.name || "Speciality icon"}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "assets/img/default-icon.jpg";
                              }}
                            />
                          </span>
                        </div>
                        <h6>
                          <Link
                            to="/Doctorscurateddetails"
                            state={{ ids: data?._id }}
                            className="speciality-link"
                          >
                            {data?.name || "Unnamed Speciality"}
                          </Link>
                        </h6>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </Slider>
          )}
        </div>
      </div>
    </section>
  );
};

export default Doctorscurated;
