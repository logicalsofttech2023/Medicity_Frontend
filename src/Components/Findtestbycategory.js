import axios from "axios";
import React, { useEffect, useState } from "react";
import { DNA } from "react-loader-spinner";
import { Link } from "react-router-dom";

const Findtestbycategory = () => {
  const [Categoryres, setCategoryres] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    GetpackageCategoryList();
  }, []);
  const GetpackageCategoryList = () => {
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
  return (
    <div>
      <div className="breadcrumb-bar overflow-visible">
        <div className="container">
          <div className="row align-items-center inner-banner">
            <div className="col-md-12 col-12">
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol style={{ justifyContent: "start" }} className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/">
                      <i className="isax isax-home-15" />
                    </a>
                  </li>
                  <li className="breadcrumb-item">Category</li>
                  <li className="breadcrumb-item active">All Category</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <section style={styles.section}>
        <div style={styles.container}>
          <div style={styles.header}>
            <h2 style={{ textAlign: "left" }}>Find Tests By Category</h2>
          </div>
          <div style={styles.grid}>
            {/* Loading State */}
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
            ) : /* Actual Content */
            Categoryres?.filter((data) => data?.type === "Doctors Curated")
                ?.length > 0 ? (
              Categoryres?.filter(
                (data) => data?.type === "Doctors Curated"
              )?.map((data) => (
                <Link
                  to="/Doctorscurateddetails"
                  state={{ ids: data?._id }}
                  style={{ textDecoration: "none" }}
                >
                  <div style={styles.card} key={data._id}>
                    <div style={styles.imageWrapper}>
                      <img
                        src="assets/img/specialities/speciality.jpg"
                        alt="category"
                        style={styles.image}
                      />
                      <span style={styles.icon}>
                        <img
                          src={`assets/img/specialities/${data?.image}`}
                          alt={data?.name}
                          style={styles.iconImage}
                        />
                      </span>
                    </div>
                    <h6 style={styles.categoryText}>{data?.name}</h6>
                  </div>
                </Link>
              ))
            ) : (
              /* Empty State */
              <div
                style={{
                  width: "100%",
                  textAlign: "center",
                  padding: "40px",
                  color: "#666",
                }}
              >
                <img
                  src="assets/img/no-data-found.png"
                  alt="No data found"
                  style={{ width: "150px", marginBottom: "20px" }}
                />
                <p>No doctors curated packages found</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

// Inline CSS styles
const styles = {
  section: {
    padding: "50px 0",
    textAlign: "center",
    backgroundColor: "#f9f9f9",
  },
  container: {
    width: "90%",
    margin: "0 auto",
  },

  header: {
    marginBottom: "20px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    justifyContent: "center",
    padding: "20px",
  },
  card: {
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "15px",
    textAlign: "center",
    transition: "transform 0.3s ease-in-out",
  },
  cardHover: {
    transform: "scale(1.05)",
  },
  imageWrapper: {
    position: "relative",
    width: "100%",
    overflow: "hidden",
    borderRadius: "12px",
  },
  image: {
    width: "100%",
    borderRadius: "12px",
  },
  icon: {
    position: "absolute",
    bottom: "50%",
    left: "50%",
    transform: "translateX(-50%)",
    background: "#fff",
    borderRadius: "50%",
    padding: "10px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
  },
  iconImage: {
    width: "30px",
    height: "30px",
  },
  categoryText: {
    marginTop: "20px",
    fontSize: "16px",
    fontWeight: "bold",
  },
  link: {
    textDecoration: "none",
    color: "#333",
    transition: "color 0.3s",
  },
  linkHover: {
    color: "#007bff",
  },
};

export default Findtestbycategory;
