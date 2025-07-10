import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { DNA } from "react-loader-spinner";
import { Link } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

const Checkout = () => {
  const [cartdata, setcartdata] = useState();
  const [packageid, setpackageid] = useState();
  let userId = secureLocalStorage.getItem("medicityuser");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    GetFeaturedList();
  }, [0]);
  const GetFeaturedList = () => {
    setLoading(true);
    const data = {
      userId: userId,
    };
    axios
      .post(`${process.env.REACT_APP_API_KEY}getCartItems`, data)

      .then((res) => {
        setcartdata(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const DeleteCartItem = () => {
    const data = {
      userId: userId,
      packageId: packageid,
    };

    axios
      .post(`${process.env.REACT_APP_API_KEY}deleteFromCart`, data)

      .then((res) => {
        // Remove item from cartdata in UI
        setcartdata((prevData) =>
          prevData.filter((item) => item?.packageId?._id !== packageid)
        );

        setpackageid("");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        console.log(error);
      });
  };

  useEffect(() => {
    if (cartdata?.length > 0) {
      const cartIds = cartdata?.map((data) => data?.packageId?._id).join(",");
      localStorage.setItem("cartIds", cartIds);
    }
  }, [cartdata]);
  return (
    <div>
      <Toaster />
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
                  <li className="breadcrumb-item">Cart</li>
                  <li className="breadcrumb-item active">Checkout</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      {/* /Breadcrumb */}
      {/* Page Content */}
      <div className="content doctor-content">
        <div className="container">
          <div className="row">
            {/* Profile Sidebar */}

            {/* / Profile Sidebar */}
            <div
              className={`col-lg-${cartdata?.length > 0 ? "6" : "12"} col-xl-5`}
            >
              <div className="dashboard-header">
                <h3>Cart List</h3>
              </div>
              {/* Depeendent Item */}
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
              ) : cartdata?.length > 0 ? (
                cartdata.map((data, index) => (
                  <div
                    className="dependent-wrap mb-3 p-3"
                    key={index}
                    style={{
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      background: "#fff",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    {/* Title */}
                    <div className="patient-info fw-bold" style={{ flex: 1 }}>
                      <Link
                        to={`/Healthcheckuppackagedetails/${data?.packageId?._id}`}
                        className="text-decoration-none text-dark"
                      >
                        {data?.packageId?.title}
                      </Link>
                    </div>

                    {/* Price + Delete */}
                    <div className="d-flex align-items-center gap-3">
                      <div className="blood-info text-end me-2">
                        <p className="mb-0 fw-bold text-success">
                          ₹{data?.packageId?.price}
                        </p>
                        <h6 className="mb-0 text-muted">
                          <del>₹{data?.packageId?.discount_price}</del>
                        </h6>
                      </div>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => setpackageid(data?.packageId?._id)}
                        data-bs-toggle="modal"
                        data-bs-target="#delete_modal"
                      >
                        <i className="isax isax-trash" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                // Empty cart UI (as you already have)
                <div
                  className="text-center mt-4"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "40px",
                    backgroundColor: "#f9f9f9",
                    borderRadius: "8px",
                  }}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
                    alt="Empty Cart"
                    style={{
                      width: "120px",
                      height: "120px",
                      marginBottom: "20px",
                    }}
                  />
                  <h3 style={{ color: "#333", marginBottom: "10px" }}>
                    Your Cart is Empty
                  </h3>
                  <p style={{ color: "#777", fontSize: "16px" }}>
                    Looks like you haven't added any packages yet.
                  </p>
                  <Link
                    to="/Doctorscurateddetails"
                    className="btn btn-primary mt-3"
                    style={{
                      padding: "10px 20px",
                      borderRadius: "25px",
                      backgroundColor: "#007bff",
                      color: "#fff",
                      textDecoration: "none",
                    }}
                  >
                    Browse Packages
                  </Link>
                </div>
              )}
              {/* /Depeendent Item */}
              <div class="d-flex justify-content-center align-items-center mb-3">
                <Link
                  style={{ width: "100%" }}
                  to="/Findtestbycategory"
                  class="p-2 justify-content-center btn btn-md btn-primary-gradient d-inline-flex align-items-center rounded-pill"
                >
                  + Add Tests
                </Link>
              </div>
              <div>
                {" "}
                <img
                  alt=""
                  src="https://redcliffelabs.com/_next/image?url=https%3A%2F%2Fstatic-redcliffelabs.s3.amazonaws.com%2Fmedia%2Fgallary-file%2FNone%2F7b5a523b-5964-43fd-a12b-8a2eff1b3df1.png&w=1200&q=75"
                />
              </div>{" "}
            </div>
            {cartdata?.length > 0 ? (
              <div className="col-lg-6 col-xl-5">
                {/* Profile Sidebar */}
                <div className="profile-sidebar patient-sidebar profile-sidebar-new">
                  <div className=" pro-widget-content">
                    <div className="profile-info-widget">
                      <div className="profile-det-info">
                        <h3>
                          <a href="profile-settings.html">Price Details</a>
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="dashboard-widget">
                    <div className="d-flex gap-3">
                      <div>
                        <svg
                          width="50"
                          height="50"
                          viewBox="0 0 28 43"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M20 23.07c4.2 0 7.617 3.417 7.617 7.617v4.688H12.383v-4.688c0-4.2 3.417-7.617 7.617-7.617ZM14.727 17.797A5.28 5.28 0 0 1 20 12.523a5.28 5.28 0 0 1 5.273 5.274A5.28 5.28 0 0 1 20 23.07a5.28 5.28 0 0 1-5.273-5.273ZM7.696 17.797c3.095 0 5.754 1.863 6.945 4.521-2.76 1.773-4.601 4.854-4.601 8.37H0v-5.274c0-4.2 3.496-7.617 7.696-7.617ZM2.422 12.523A5.28 5.28 0 0 1 7.695 7.25a5.28 5.28 0 0 1 5.274 5.273 5.28 5.28 0 0 1-5.274 5.274 5.28 5.28 0 0 1-5.273-5.274Z"
                            fill="#D9D9D9"
                          ></path>
                        </svg>
                        <p
                          data-bs-toggle="modal"
                          data-bs-target="#off_modal"
                          className="fs-14"
                        >
                          Add tests for 2 members & get<b> % off</b>
                        </p>
                      </div>
                      <div>
                        <svg
                          width="50"
                          height="50"
                          viewBox="0 0 40 43"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M20 23.07c4.2 0 7.617 3.417 7.617 7.617v4.688H12.383v-4.688c0-4.2 3.417-7.617 7.617-7.617ZM14.727 17.797A5.28 5.28 0 0 1 20 12.523a5.28 5.28 0 0 1 5.273 5.274A5.28 5.28 0 0 1 20 23.07a5.28 5.28 0 0 1-5.273-5.273ZM27.031 12.523a5.28 5.28 0 0 1 5.274-5.273 5.28 5.28 0 0 1 5.273 5.273 5.28 5.28 0 0 1-5.273 5.274 5.28 5.28 0 0 1-5.274-5.274ZM7.696 17.797c3.095 0 5.754 1.863 6.945 4.521-2.76 1.773-4.601 4.854-4.601 8.37H0v-5.274c0-4.2 3.496-7.617 7.696-7.617ZM2.422 12.523A5.28 5.28 0 0 1 7.695 7.25a5.28 5.28 0 0 1 5.274 5.273 5.28 5.28 0 0 1-5.274 5.274 5.28 5.28 0 0 1-5.273-5.274Z"
                            fill="#D9D9D9"
                          />
                          <path
                            d="M25.36 22.318c1.19-2.658 3.849-4.521 6.945-4.521 4.2 0 7.695 3.417 7.695 7.617v5.273H29.96c0-3.515-1.841-6.596-4.6-8.369Z"
                            fill="#D9D9D9"
                          />
                        </svg>
                        <p
                          data-bs-toggle="modal"
                          data-bs-target="#off_modal"
                          className="fs-14"
                        >
                          Add tests for 3 members & get<b> % off</b>
                        </p>
                      </div>
                      <div>
                        <svg
                          width="50"
                          height="50"
                          viewBox="0 0 54 43"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M20 23.07c4.2 0 7.617 3.417 7.617 7.617v4.688H12.383v-4.688c0-4.2 3.417-7.617 7.617-7.617ZM14.727 17.797A5.28 5.28 0 0 1 20 12.523a5.28 5.28 0 0 1 5.273 5.274A5.28 5.28 0 0 1 20 23.07a5.28 5.28 0 0 1-5.273-5.273ZM27.031 12.523a5.28 5.28 0 0 1 5.274-5.273 5.28 5.28 0 0 1 5.273 5.273 5.28 5.28 0 0 1-5.273 5.274 5.28 5.28 0 0 1-5.274-5.274ZM7.696 17.797c3.095 0 5.754 1.863 6.945 4.521-2.76 1.773-4.601 4.854-4.601 8.37H0v-5.274c0-4.2 3.496-7.617 7.696-7.617ZM2.422 12.523A5.28 5.28 0 0 1 7.695 7.25a5.28 5.28 0 0 1 5.274 5.273 5.28 5.28 0 0 1-5.274 5.274 5.28 5.28 0 0 1-5.273-5.274Z"
                            fill="#D9D9D9"
                          />
                          <path
                            d="M25.36 22.318c1.19-2.658 3.849-4.521 6.945-4.521 4.2 0 7.695 3.417 7.695 7.617v5.273H29.96c0-3.515-1.841-6.596-4.6-8.369Z"
                            fill="#D9D9D9"
                          />
                          <path
                            d="M45.617 23.07c4.2 0 7.617 3.417 7.617 7.617v4.688H38v-4.688c0-4.2 3.417-7.617 7.617-7.617ZM40.344 17.797a5.28 5.28 0 0 1 5.273-5.274 5.28 5.28 0 0 1 5.274 5.274 5.28 5.28 0 0 1-5.274 5.273 5.28 5.28 0 0 1-5.273-5.273Z"
                            fill="#D9D9D9"
                          />
                          <path
                            d="M36.999 31.314c.092-3.57.88-5.472 4-8"
                            stroke="#fff"
                            strokeWidth={2}
                          />
                        </svg>
                        <p
                          data-bs-toggle="modal"
                          data-bs-target="#off_modal"
                          className="fs-14"
                        >
                          Add tests for 4 or more members & get <b> % off</b>
                        </p>
                      </div>
                    </div>
                    {cartdata?.length > 0 ? (
                      <div>
                        <div className="pt-3 border-top booking-more-info">
                          <h6 className="mb-3">Payment Info</h6>

                          {/* Total Amount (Before Discount) */}
                          <div className="d-flex align-items-center flex-wrap rpw-gap-2 justify-content-between mb-2">
                            <p className="mb-0">Total Amount</p>
                            <span className="fw-medium d-block">
                              ₹
                              {cartdata
                                ?.reduce((total, item) => {
                                  const price = item?.packageId?.price || 0;
                                  return total + price;
                                }, 0)
                                .toFixed(2)}
                            </span>
                          </div>

                          {/* Diagnostic Fee */}
                          <div className="d-flex align-items-center flex-wrap rpw-gap-2 justify-content-between mb-2">
                            <p className="mb-0">Diagnostic Fee</p>
                            <span className="fw-medium d-block">₹223</span>
                          </div>

                          {/* Tax */}
                          <div className="d-flex align-items-center flex-wrap rpw-gap-2 justify-content-between mb-2">
                            <p className="mb-0">Tax</p>
                            <span className="fw-medium d-block">₹18</span>
                          </div>

                          {/* Discount */}
                          <div className="d-flex align-items-center flex-wrap rpw-gap-2 justify-content-between mb-2">
                            <p className="mb-0">Discount</p>
                            <span className="fw-medium text-danger d-block">
                              -₹
                              {cartdata
                                ?.reduce((total, item) => {
                                  const price = item?.packageId?.price || 0;
                                  const discountPerc =
                                    item?.packageId?.offer?.[0]
                                      ?.disc_percantage || 0;
                                  const discountAmount =
                                    (price * discountPerc) / 100;
                                  return total + discountAmount;
                                }, 0)
                                .toFixed(2)}
                            </span>
                          </div>
                        </div>

                        {/* Final Total (after discount + diagnostic + tax) */}
                        <div className="bg-primary d-flex align-items-center flex-wrap rpw-gap-2 justify-content-between p-3 rounded">
                          <h6 className="text-white">Total</h6>
                          <h6 className="text-white">
                            ₹
                            {(() => {
                              const diagnostic = 223;
                              const tax = 18;

                              let originalTotal = 0;
                              let totalDiscount = 0;

                              cartdata?.forEach((item) => {
                                const price = item?.packageId?.price || 0;
                                const discountPerc =
                                  item?.packageId?.offer?.[0]
                                    ?.disc_percantage || 0;
                                const discountAmount =
                                  (price * discountPerc) / 100;

                                originalTotal += price;
                                totalDiscount += discountAmount;
                              });

                              const finalTotal =
                                originalTotal -
                                totalDiscount +
                                diagnostic +
                                tax;

                              return finalTotal.toFixed(2);
                            })()}
                          </h6>
                        </div>
                      </div>
                    ) : null}
                    <hr />
                    <div class="d-flex justify-content-center align-items-center p-2">
                      <button
                        style={{ width: "100%" }}
                        class="p-2 justify-content-center btn btn-md btn-primary-gradient d-inline-flex align-items-center rounded-pill"
                      >
                        Amount would be calculated in the next step
                      </button>
                    </div>
                    <div class="d-flex justify-content-center align-items-center p-2">
                      <button
                        style={{ width: "100%", color: "#114371" }}
                        class="p-2 justify-content-center btn btn-md btn-primary-gradient d-inline-flex align-items-center rounded-pill"
                      >
                        ₹10395 saved so far
                      </button>
                    </div>
                    <div class="d-flex justify-content-center align-items-center p-2">
                      <a
                        href={`/Bookingform`}
                        style={{ width: "100%", background: "#114371" }}
                        class="p-2 justify-content-center btn btn-md btn-primary-gradient d-inline-flex align-items-center rounded-pill"
                        onClick={() => {
                          const totalAmount = cartdata?.reduce(
                            (total, item) =>
                              total + (item?.packageId?.price || 0),
                            0
                          );
                          const diagnosticFee = 20;
                          const tax = 18;
                          const discount = 15;
                          const finalTotal =
                            totalAmount + diagnosticFee + tax - discount;
                          const paymentInfo = {
                            totalAmount,
                            diagnosticFee,
                            tax,
                            discount,
                            finalTotal,
                          };
                          localStorage.setItem(
                            "paymentInfo",
                            JSON.stringify(paymentInfo)
                          );
                          const cartIds = cartdata
                            ?.map((data) => data?.packageId?._id)
                            .join(",");
                          localStorage.setItem("cartIds", cartIds);
                        }}
                      >
                        Next
                      </a>
                    </div>
                  </div>
                </div>
                {/* /Profile Sidebar */}
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div class="modal fade custom-modals" id="off_modal">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-body p-4 text-center">
              <form action="/Checkout">
                <h3 class="mb-4">
                  How can you get discounts on health tests/packages ?
                </h3>
                <div>
                  <ol
                    style={{
                      listStyleType: "decimal",
                      paddingLeft: "20px",
                      textAlign: "justify",
                      color: "black",
                    }}
                  >
                    <li className="mb-3">
                      Add more than 2 members to your health package or test and
                      get an extra 10% discount on your booking (minimum cart
                      amount greater than ₹800)
                    </li>
                    <li className="mb-3">
                      Eg. For Smart Full Body checkup package Discounted cost:
                      ₹80/person Discount: ₹240
                    </li>
                  </ol>
                </div>

                <div class="d-flex justify-content-center flex-wrap gap-3">
                  <a
                    href="#"
                    class=" btn btn-md btn-dark rounded-pill"
                    data-bs-dismiss="modal"
                  >
                    Got it
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="modal fade custom-modals" id="delete_modal">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-body p-4 text-center">
              <form action="/Checkout">
                <span class="del-icon mb-2 mx-auto">
                  <i class="isax isax-trash"></i>
                </span>
                <h3 class="mb-2">Delete Dependent</h3>
                <p class="mb-3">
                  Are you sure you want to delete this dependent?
                </p>
                <div class="d-flex justify-content-center flex-wrap gap-3">
                  <a
                    href="#"
                    class="btn btn-md btn-dark rounded-pill"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </a>
                  <button
                    data-bs-dismiss="modal"
                    onClick={DeleteCartItem}
                    type="button"
                    class="btn btn-md btn-primary-gradient rounded-pill"
                  >
                    Yes Delete
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
