import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { DNA } from "react-loader-spinner";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Routinehealthcheckupmenwomen = () => {
  const [CheckupList, setCheckupList] = useState([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { triggerOnce: true, margin: "-100px" });

  useEffect(() => {
    GetAllCheckupRoutinesList();
  }, []);

  const GetAllCheckupRoutinesList = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_KEY}getAllCheckupRoutines`
      );
      setCheckupList(res.data.data);
    } catch (error) {
      console.error("Error fetching checkup routines:", error);
    } finally {
      setLoading(false);
    }
  };

  const getAgeRange = (name) => {
    if (!name) return { minAge: null, maxAge: null };

    // Case: "45 - 60"
    if (name.includes(" - ")) {
      const [min, max] = name.split(" - ").map((n) => parseInt(n.trim()));
      return { minAge: min, maxAge: max };
    }

    // Case: "Under 30"
    if (name.toLowerCase().includes("under")) {
      const max = parseInt(name.replace(/\D/g, ""));
      return { minAge: 0, maxAge: max };
    }

    // Case: "Above 60"
    if (name.toLowerCase().includes("above")) {
      const min = parseInt(name.replace(/\D/g, ""));
      return { minAge: min, maxAge: null };
    }

    return { minAge: null, maxAge: null };
  };

  return (
    <section className="section deals-section" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="pharmacy-section-header">
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="pharmacy-title">
                  <h4>Routine health checkups for men &amp; women</h4>
                </div>
              </div>
            </div>
          </div>

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
          ) : (
            <div className="deals-list">
              <ul className="nav">
                {CheckupList?.map((data) => (
                  <li key={data._id}>
                    <Link
                      to="/Healthmenwomen"
                      state={{
                        ...getAgeRange(data?.name),
                        gender: data?.gender,
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="deals-grid">
                        <div className="deals-box">
                          <img
                            src={
                              data?.image
                                ? `${process.env.REACT_APP_IMG_URL}${data?.image}`
                                : "assets/img/deals/deals-01.png"
                            }
                            alt="Deals Img"
                          />
                        </div>
                        <div className="deals-content">
                          <a>{data?.name} yrs</a>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Routinehealthcheckupmenwomen;
