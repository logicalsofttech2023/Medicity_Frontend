// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./Bestpackages.css";
// import toast, { Toaster } from "react-hot-toast";
// import secureLocalStorage from "react-secure-storage";
// import Slider from "react-slick";
// import { DNA } from "react-loader-spinner";
// import { motion, useInView } from "framer-motion";
// import { useRef } from "react";

// const Bestpackages = () => {
//   const [idd, setidd] = useState(null);
//   const navigate = useNavigate();
//   const [categor, setcategor] = useState([]);
//   const [Bestdetails, setBestdetails] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const ref = useRef(null);
//   useEffect(() => {
//     GetPackageCategoryList();
//   }, []);

//   const GetPackageCategoryList = () => {
//     axios
//       .get(`${process.env.REACT_APP_API_KEY}bestPackageCategoryList`)
//       .then((res) => {
//         setcategor(res.data.data);
//       });
//   };

//   useEffect(() => {
//     Catedata(null);
//   }, []);

//   useEffect(() => {
//     if (idd !== null) {
//       Catedata(idd);
//     }
//   }, [idd]);

//   const Catedata = (categoryId) => {
//     setLoading(true);
//     const data = {
//       categoryId: categoryId || null,
//     };

//     axios
//       .post(`${process.env.REACT_APP_API_KEY}packagelist`, data)
//       .then((res) => {
//         setBestdetails(res.data.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.log("err", err);
//         setLoading(false);
//       });
//   };

//   let userId = secureLocalStorage.getItem("medicityuser");

//   const handleSubmit = (id) => {
//     if (!userId) {
//       toast.error("Please Login First");

//       return;
//     }
//     const formData = {
//       userId: userId,
//       packageId: id,
//     };

//     axios
//       .post(`${process.env.REACT_APP_API_KEY}addToCart`, formData)
//       .then((res) => {
//         Catedata();
//         toast.success(res?.data?.message);
//       })
//       .catch((error) => {
//         toast.error(error.response.data.message);
//       });
//   };

//   const NextArrow = (props) => {
//     const { onClick } = props;
//     return (
//       <div className="custom-packages-arrow next-arrow" onClick={onClick}>
//         <i className="fas fa-chevron-right"></i>
//       </div>
//     );
//   };

//   const PrevArrow = (props) => {
//     const { onClick } = props;
//     return (
//       <div className="custom-packages-arrow prev-arrow" onClick={onClick}>
//         <i className="fas fa-chevron-left"></i>
//       </div>
//     );
//   };

//   const getUniqueItems = (items) =>
//     items?.filter(
//       (item, index, self) => index === self.findIndex((t) => t._id === item._id)
//     );

//   const uniqueBestDetails = getUniqueItems(Bestdetails || []);

//   const sliderSettings = {
//     dots: true,
//     infinite: false,
//     speed: 1500,
//     slidesToShow: 2,
//     slidesToScroll: 1,
//     arrows: true,
//     nextArrow: <NextArrow />,
//     prevArrow: <PrevArrow />,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: { slidesToShow: 2 },
//       },
//       {
//         breakpoint: 768,
//         settings: { slidesToShow: 1 },
//       },
//     ],
//   };

//   useEffect(() => {
//     if (ref.current && typeof ref.current.slickGoTo === "function") {
//       setTimeout(() => {
//         ref.current.slickGoTo(0);
//       }, 100);
//     }
//   }, [idd]);

//   return (
//     <section className="best-packages-section">
//       <Toaster />
//       <div className="container">
//         <div className="section-head-twelve">
//           <h2>Best Packages</h2>
//           <p>
//             Explore Our Top-Tier Packages for Your Personalized Wellness
//             Experience
//           </p>
//         </div>

//         <ul className="nav nav-pills inner-tab">
//           <li
//             onClick={() => {
//               setidd(null);
//               Catedata(null);
//             }}
//             className="nav-item"
//           >
//             <div
//               style={{ cursor: "pointer" }}
//               className={`nav-link ${idd === null ? "active" : ""}`}
//             >
//               All Packages
//             </div>
//           </li>
//           {categor?.map((data, index) => (
//             <li
//               key={data?._id || index}
//               onClick={() => {
//                 setidd(data?._id);
//                 Catedata(data?._id);
//               }}
//               className="nav-item"
//               style={{ cursor: "pointer" }}
//             >
//               <div className={`nav-link ${idd === data?._id ? "active" : ""}`}>
//                 {data?.name}
//               </div>
//             </li>
//           ))}
//         </ul>

//         <div className="tab-content pt-0 dashboard-tab">
//           <div className="row">
//             <div className="col-md-12">
//               {loading ? (
//                 <div className="d-flex justify-content-center my-5">
//                   <DNA
//                     visible={true}
//                     height="80"
//                     width="80"
//                     ariaLabel="dna-loading"
//                     wrapperClass="dna-wrapper"
//                   />
//                 </div>
//               ) : uniqueBestDetails?.length === 0 ? (
//                 <div className="no-data">
//                   No Doctors Curated Category Found.
//                 </div>
//               ) : (
//                 <div className="best-package-slider">
//                   {uniqueBestDetails.length >= 2 ? (
//                     <Slider ref={ref} {...sliderSettings}>
//                       {uniqueBestDetails.map((data, index) => (
//                         <motion.div
//                           key={data._id}
//                           initial={{ opacity: 0, y: 50 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ duration: 0.6, delay: index * 0.1 }}
//                           exit={{ opacity: 0 }}
//                         >
//                           <div className="best-package-card">
//                             <div
//                               onClick={() =>
//                                 navigate(
//                                   `/Healthcheckuppackagedetails/${data._id}`
//                                 )
//                               }
//                               className="package-card-top"
//                             >
//                               <div className="card-img-right">
//                                 <img
//                                   src="assets/img/icons/sticker-icon.svg"
//                                   alt="Img"
//                                 />
//                               </div>
//                               <div className="package-icon">
//                                 <img
//                                   src={
//                                     data.image
//                                       ? `${process.env.REACT_APP_IMG_URL}${data.image}`
//                                       : "assets/img/icons/package-icon-01.svg"
//                                   }
//                                   alt="Img"
//                                 />
//                               </div>
//                               <h3 className="mb-1">
//                                 <Link
//                                   to={`/Healthcheckuppackagedetails/${data._id}`}
//                                 >
//                                   {data.title}
//                                 </Link>
//                               </h3>
//                               {data.test?.length > 0 ? (
//                                 data.test.map((testItem, index) => (
//                                   <span
//                                     key={index}
//                                     className="badge badge-secondary-transparents"
//                                   >
//                                     {testItem}
//                                   </span>
//                                 ))
//                               ) : (
//                                 <h6 className="text-light mb-2 flexwrap-wrap">
//                                   {data.badges}
//                                 </h6>
//                               )}
//                               <div className="d-flex active-bar align-items-center justify-content-between p-3">
//                                 <a
//                                   href="#"
//                                   className="text-indigo fw-medium fs-14"
//                                 >
//                                   Reports in
//                                 </a>
//                                 <span className="badge bg-success-light d-inline-flex align-items-center">
//                                   <i className="fa-solid fa-circle fs-5 me-1" />
//                                   {data.report_time} hrs
//                                 </span>
//                               </div>
//                             </div>
//                             <div className="package-footer d-flex justify-content-between align-items-center">
//                               <div className="package-cost">
//                                 <h5>
//                                   ₹{data.price}{" "}
//                                   <span> ₹{data.discount_price}</span>
//                                 </h5>
//                               </div>
//                               <div className="package-btn">
//                                 <button
//                                   className="btn btn-outline-primary bg-transparent border-primary text-primary"
//                                   onClick={() => handleSubmit(data._id)}
//                                 >
//                                   Book Now
//                                 </button>
//                               </div>
//                             </div>
//                           </div>
//                         </motion.div>
//                       ))}
//                     </Slider>
//                   ) : (
//                     uniqueBestDetails.map((data, index) => (
//                       <motion.div
//                         key={data._id}
//                         initial={{ opacity: 0, y: 50 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.6, delay: index * 0.1 }}
//                       >
//                         <div className="best-package-card">
//                           <div
//                             onClick={() =>
//                               navigate(
//                                 `/Healthcheckuppackagedetails/${data._id}`
//                               )
//                             }
//                             className="package-card-top"
//                           >
//                             <div className="card-img-right">
//                               <img
//                                 src="assets/img/icons/sticker-icon.svg"
//                                 alt="Img"
//                               />
//                             </div>
//                             <div className="package-icon">
//                               <img
//                                 src={
//                                   data.image
//                                     ? `${process.env.REACT_APP_IMG_URL}${data.image}`
//                                     : "assets/img/icons/package-icon-01.svg"
//                                 }
//                                 alt="Img"
//                               />
//                             </div>
//                             <h3 className="mb-1">
//                               <Link
//                                 to={`/Healthcheckuppackagedetails/${data._id}`}
//                               >
//                                 {data.title}
//                               </Link>
//                             </h3>
//                             {data.test?.length > 0 ? (
//                               data.test.map((testItem, index) => (
//                                 <span
//                                   key={index}
//                                   className="badge badge-secondary-transparents"
//                                 >
//                                   {testItem}
//                                 </span>
//                               ))
//                             ) : (
//                               <h6 className="text-light mb-2 flexwrap-wrap">
//                                 {data.badges}
//                               </h6>
//                             )}
//                             <div className="d-flex active-bar align-items-center justify-content-between p-3">
//                               <a
//                                 href="#"
//                                 className="text-indigo fw-medium fs-14"
//                               >
//                                 Reports in
//                               </a>
//                               <span className="badge bg-success-light d-inline-flex align-items-center">
//                                 <i className="fa-solid fa-circle fs-5 me-1" />
//                                 {data.report_time} hrs
//                               </span>
//                             </div>
//                           </div>
//                           <div className="package-footer d-flex justify-content-between align-items-center">
//                             <div className="package-cost">
//                               <h5>
//                                 ₹{data.price}{" "}
//                                 <span> ₹{data.discount_price}</span>
//                               </h5>
//                             </div>
//                             <div className="package-btn">
//                               <button
//                                 className="btn btn-outline-primary bg-transparent border-primary text-primary"
//                                 onClick={() => handleSubmit(data._id)}
//                               >
//                                 Book Now
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       </motion.div>
//                     ))
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Bestpackages;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Bestpackages.css";
import toast, { Toaster } from "react-hot-toast";
import secureLocalStorage from "react-secure-storage";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { DNA } from "react-loader-spinner";
import Swal from "sweetalert2";
const Bestpackages = () => {
  const [idd, setidd] = useState(null);
  const [categor, setcategor] = useState([]);
  const [Bestdetails, setBestdetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userId = secureLocalStorage.getItem("medicityuser");

  useEffect(() => {
    GetPackageCategoryList();
    setidd(null);
    Catedata(null);
  }, []);

  useEffect(() => {
    if (idd !== null) {
      Catedata(idd);
    }
  }, [idd]);

  const GetPackageCategoryList = () => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}bestPackageCategoryList`)
      .then((res) => {
        setcategor(res.data.data || []);
      })
      .catch((err) => console.error("Error fetching category list:", err));
  };

  const Catedata = (categoryId = null) => {
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_API_KEY}packagelist`, { categoryId })
      .then((res) => {
        setBestdetails(res.data.data || []);
      })
      .catch((err) => console.error("Error fetching packages:", err))
      .finally(() => setLoading(false));
  };

  const handleSubmit = (packageId) => {
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
          navigate("/login");
        }
      });
      return;
    }

    const formData = { userId, packageId };

    axios
      .post(`${process.env.REACT_APP_API_KEY}addToCart`, formData)
      .then((res) => {
        toast.success(res?.data?.message);
        Catedata(idd); // refresh current category list
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || "Error adding to cart");
      });
  };

  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="custom-packages-arrow next-arrow" onClick={onClick}>
        <i className="fas fa-chevron-right"></i>
      </div>
    );
  };

  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="custom-packages-arrow prev-arrow" onClick={onClick}>
        <i className="fas fa-chevron-left"></i>
      </div>
    );
  };

  return (
    <section className="best-packages-section">
      <Toaster />
      <div className="container">
        <div className="section-head-twelve">
          <h2>Best Packages</h2>
          <p>
            Explore Our Top-Tier Packages for Your Personalized Wellness
            Experience
          </p>
        </div>

        <ul className="nav nav-pills inner-tab">
          <li
            className="nav-item"
            onClick={() => {
              setidd(null);
              Catedata(null);
            }}
          >
            <div className={`nav-link ${idd === null ? "active" : ""}`}>
              All Packages
            </div>
          </li>
          {categor?.map((data, index) => (
            <li
              key={data?._id || index}
              className="nav-item"
              onClick={() => setidd(data?._id)}
            >
              <div className={`nav-link ${idd === data?._id ? "active" : ""}`}>
                {data?.name}
              </div>
            </li>
          ))}
        </ul>

        <div className="tab-content pt-0 dashboard-tab">
          <div className="row">
            <div className="col-md-12">
              <div className="best-package-slider">
                <Slider
                  dots={false}
                  infinite={Bestdetails.length > 2}
                  speed={500}
                  slidesToShow={Bestdetails.length < 2 ? 1 : 2}
                  slidesToScroll={1}
                  nextArrow={<NextArrow />}
                  prevArrow={<PrevArrow />}
                  responsive={[
                    {
                      breakpoint: 1024,
                      settings: {
                        dots: false,
                        slidesToShow: Bestdetails.length < 2 ? 1 : 2,
                      },
                    },
                    {
                      breakpoint: 600,
                      settings: {
                        slidesToShow: 1,
                      },
                    },
                  ]}
                >
                  {Bestdetails?.map((data) => (
                    <div key={data?._id} className="best-package-card">
                      <div
                        onClick={() =>
                          navigate(`/Healthcheckuppackagedetails/${data?._id}`)
                        }
                        className="package-card-top"
                      >
                        <div className="card-img-right">
                          <img
                            src="assets/img/icons/sticker-icon.svg"
                            alt="Img"
                          />
                        </div>
                        <div className="package-icon">
                          <img
                            src={
                              data?.image
                                ? `${process.env.REACT_APP_IMG_URL}${data.image}`
                                : "assets/img/icons/package-icon-01.svg"
                            }
                            alt="Img"
                          />
                        </div>
                        <h3 className="mb-1">
                          <Link
                            to={`/Healthcheckuppackagedetails/${data?._id}`}
                          >
                            {data?.title}
                          </Link>
                        </h3>
                       <div style={{ display: 'flex', flexWrap: 'wrap' }}>
  {Array.isArray(data?.test) && data.test.length > 0 ? (
    data.test.map((testItem, index) => (
      <span
        key={index}
        className="badge badge-secondary-transparents"
        style={{
          marginRight: '6px',
          marginBottom: '6px',
          display: 'inline-block',
          maxWidth: '120px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
        title={testItem?.test_name} // Tooltip on hover
      >
        {testItem?.test_name || 'Unnamed Test'}
      </span>
    ))
  ) : (
    <h6 className="text-light mb-2 flexwrap-wrap">
      {data?.badges || 'No tests'}
    </h6>
  )}
</div>


                        <div className="d-flex active-bar align-items-center justify-content-between p-3">
                          <a href="#" className="text-indigo fw-medium fs-14">
                            Reports in
                          </a>
                          <span className="badge bg-success-light d-inline-flex align-items-center">
                            <i className="fa-solid fa-circle fs-5 me-1" />
                            {data?.report_time} hrs
                          </span>
                        </div>
                      </div>
                      <div className="package-footer d-flex justify-content-between align-items-center">
                        <div className="package-cost">
                          <h5>
                            ₹{data?.price} <span> ₹{data?.discount_price}</span>
                          </h5>
                        </div>
                        <div className="package-btn">
                          <Link onClick={() => handleSubmit(data?._id)}>
                            Book Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bestpackages;
