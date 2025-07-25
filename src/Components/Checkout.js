import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { DNA } from "react-loader-spinner";
import { Link } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

const Checkout = () => {
  const [cartdata, setCartdata] = useState([]);
  const [packageId, setPackageId] = useState(null);
  const [testId, setTestId] = useState(null);
  let userId = secureLocalStorage.getItem("medicityuser");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    getCartItems();
  }, []);

  const getCartItems = () => {
    setLoading(true);
    const data = {
      userId: userId,
    };
    axios
      .post(`${process.env.REACT_APP_API_KEY}getCartItems`, data)
      .then((res) => {
        setCartdata(res.data.result ? res.data.data : []);
      })
      .catch((error) => {
        console.log(error);
        setCartdata([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

 const deleteCartItem = () => {
    const data = {
      userId: userId,
      packageId: packageId,
      testId: testId,
    };

    axios
      .post(`${process.env.REACT_APP_API_KEY}deleteFromCart`, data)
      .then((res) => {
        toast.success(res.data.message);
        getCartItems();
        setPackageId(null);
        setTestId(null);
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Failed to delete item");
      });
  };


  const prepareDelete = (item, isPackageItem) => {
    if (isPackageItem) {
      setPackageId(item.packageId._id);
      setTestId(null);
    } else {
      if (item.testDetails.length === 1) {
        setTestId(item.testDetails[0].test_id);
        setPackageId(null);
      } else {
        setTestId(item.testDetails[0].test_id);
        setPackageId(null);
      }
    }
  };

  const confirmDelete = () => {
    deleteCartItem();
  };

  // Calculate totals
  const calculateTotals = () => {
    let packageTotal = 0;
    let testTotal = 0;
    let totalDiscount = 0;

    cartdata.forEach((item) => {
      if (item.packageId) {
        packageTotal += item.packageId.price || 0;
        const discountPerc = item.packageId.offer?.[0]?.disc_percantage || 0;
        totalDiscount += (item.packageId.price * discountPerc) / 100;
      } else if (item.testDetails?.length > 0) {
        item.testDetails.forEach((test) => {
          testTotal += parseFloat(test.test_rate) || 0;
        });
      }
    });

    const diagnosticFee = 223;
    const tax = 18;
    const subtotal = packageTotal + testTotal;
    const grandTotal = subtotal - totalDiscount + diagnosticFee + tax;

    return {
      packageTotal,
      testTotal,
      subtotal,
      totalDiscount,
      diagnosticFee,
      tax,
      grandTotal,
    };
  };

  const totals = calculateTotals();

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

      <div className="content doctor-content">
        <div className="container">
          <div className="row">
            <div
              className={`col-lg-${cartdata?.length > 0 ? "6" : "12"} col-xl-5`}
            >
              <div className="dashboard-header">
                <h3>Cart List</h3>
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
              ) : cartdata?.length > 0 ? (
                <>
                  {/* Packages */}
                  {cartdata
                    .filter((item) => item.packageId)
                    .map((data, index) => (
                      <div
                        className="dependent-wrap mb-3 p-3"
                        key={`package-${index}`}
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
                        <div
                          className="patient-info fw-bold"
                          style={{ flex: 1 }}
                        >
                          <Link
                            to={`/Healthcheckuppackagedetails/${data?.packageId?._id}`}
                            className="text-decoration-none text-dark"
                          >
                            {data?.packageId?.title}
                          </Link>
                        </div>

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
                            onClick={() => {
                              prepareDelete(data, true);
                            }}
                            data-bs-toggle="modal"
                            data-bs-target="#delete_modal"
                          >
                            <i className="isax isax-trash" />
                          </button>
                        </div>
                      </div>
                    ))}

                  {/* Tests */}
                  {cartdata
                    .filter((item) => item.testDetails?.length > 0)
                    .map((data, index) => (
                      <div
                        className="dependent-wrap mb-3 p-3"
                        key={`test-${index}`}
                        style={{
                          border: "1px solid #ddd",
                          borderRadius: "8px",
                          background: "#fff",
                        }}
                      >
                        {data.testDetails.map((test, testIndex) => (
                          <div
                            key={`test-detail-${testIndex}`}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              flexWrap: "wrap",
                              marginBottom:
                                testIndex < data.testDetails.length - 1
                                  ? "10px"
                                  : "0",
                              paddingBottom:
                                testIndex < data.testDetails.length - 1
                                  ? "10px"
                                  : "0",
                              borderBottom:
                                testIndex < data.testDetails.length - 1
                                  ? "1px solid #eee"
                                  : "none",
                              width: "100%",
                            }}
                          >
                            <div
                              className="patient-info fw-bold"
                              style={{ flex: 1 }}
                            >
                              {test.test_name}
                            </div>
                            <div className="d-flex align-items-center gap-3">
                              <div className="blood-info text-end me-2">
                                <p className="mb-0 fw-bold text-success">
                                  ₹{test.test_rate}
                                </p>
                              </div>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => {
                                  prepareDelete(data, false);
                                }}
                                data-bs-toggle="modal"
                                data-bs-target="#delete_modal"
                              >
                                <i className="isax isax-trash" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                </>
              ) : (
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
                    Looks like you haven't added any items yet.
                  </p>
                  <div className="d-flex gap-2">
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
                    <Link
                      to="/bookAnyTest"
                      className="btn btn-primary mt-3"
                      style={{
                        padding: "10px 20px",
                        borderRadius: "25px",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        textDecoration: "none",
                      }}
                    >
                      Browse Tests
                    </Link>
                  </div>
                </div>
              )}

              <div className="d-flex justify-content-center align-items-center mb-3">
                <Link
                  style={{ width: "100%" }}
                  to="/bookAnyTest"
                  className="p-2 justify-content-center btn btn-md btn-primary-gradient d-inline-flex align-items-center rounded-pill"
                >
                  + Add Tests
                </Link>
              </div>
              <div>
                <img
                  alt=""
                  src="https://redcliffelabs.com/_next/image?url=https%3A%2F%2Fstatic-redcliffelabs.s3.amazonaws.com%2Fmedia%2Fgallary-file%2FNone%2F7b5a523b-5964-43fd-a12b-8a2eff1b3df1.png&w=1200&q=75"
                />
              </div>
            </div>

            {cartdata?.length > 0 && (
              <div className="col-lg-6 col-xl-5">
                <div className="profile-sidebar patient-sidebar profile-sidebar-new">
                  <div className="pro-widget-content">
                    <div className="profile-info-widget">
                      <div className="profile-det-info">
                        <h3>Price Details</h3>
                      </div>
                    </div>
                  </div>

                  <div className="dashboard-widget">
                    {/* Discount offers section */}
                    <div className="d-flex gap-3">
                      {/* ... (keep your existing discount offer SVGs and text) ... */}
                    </div>

                    <div className="pt-3 border-top booking-more-info">
                      <h6 className="mb-3">Payment Info</h6>

                      {/* Packages Total */}
                      {totals.packageTotal > 0 && (
                        <div className="d-flex align-items-center flex-wrap rpw-gap-2 justify-content-between mb-2">
                          <p className="mb-0">Packages Total</p>
                          <span className="fw-medium d-block">
                            ₹{totals.packageTotal.toFixed(2)}
                          </span>
                        </div>
                      )}

                      {/* Tests Total */}
                      {totals.testTotal > 0 && (
                        <div className="d-flex align-items-center flex-wrap rpw-gap-2 justify-content-between mb-2">
                          <p className="mb-0">Tests Total</p>
                          <span className="fw-medium d-block">
                            ₹{totals.testTotal.toFixed(2)}
                          </span>
                        </div>
                      )}

                      {/* Subtotal */}
                      <div className="d-flex align-items-center flex-wrap rpw-gap-2 justify-content-between mb-2">
                        <p className="mb-0">Subtotal</p>
                        <span className="fw-medium d-block">
                          ₹{totals.subtotal.toFixed(2)}
                        </span>
                      </div>

                      {/* Diagnostic Fee */}
                      <div className="d-flex align-items-center flex-wrap rpw-gap-2 justify-content-between mb-2">
                        <p className="mb-0">Diagnostic Fee</p>
                        <span className="fw-medium d-block">
                          ₹{totals.diagnosticFee.toFixed(2)}
                        </span>
                      </div>

                      {/* Tax */}
                      <div className="d-flex align-items-center flex-wrap rpw-gap-2 justify-content-between mb-2">
                        <p className="mb-0">Tax</p>
                        <span className="fw-medium d-block">
                          ₹{totals.tax.toFixed(2)}
                        </span>
                      </div>

                      {/* Discount */}
                      {totals.totalDiscount > 0 && (
                        <div className="d-flex align-items-center flex-wrap rpw-gap-2 justify-content-between mb-2">
                          <p className="mb-0">Discount</p>
                          <span className="fw-medium text-danger d-block">
                            -₹{totals.totalDiscount.toFixed(2)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Final Total */}
                    <div className="bg-primary d-flex align-items-center flex-wrap rpw-gap-2 justify-content-between p-3 rounded">
                      <h6 className="text-white">Total</h6>
                      <h6 className="text-white">
                        ₹{totals.grandTotal.toFixed(2)}
                      </h6>
                    </div>

                    <hr />
                    <div className="d-flex justify-content-center align-items-center p-2">
                      <button
                        style={{ width: "100%" }}
                        className="p-2 justify-content-center btn btn-md btn-primary-gradient d-inline-flex align-items-center rounded-pill"
                      >
                        Amount would be calculated in the next step
                      </button>
                    </div>
                    <div className="d-flex justify-content-center align-items-center p-2">
                      <button
                        style={{ width: "100%", color: "#114371" }}
                        className="p-2 justify-content-center btn btn-md btn-primary-gradient d-inline-flex align-items-center rounded-pill"
                      >
                        ₹10395 saved so far
                      </button>
                    </div>
                    <div className="d-flex justify-content-center align-items-center p-2">
                      <Link
                        to="/Bookingform"
                        style={{ width: "100%", background: "#114371" }}
                        className="p-2 justify-content-center btn btn-md btn-primary-gradient d-inline-flex align-items-center rounded-pill"
                        onClick={() => {
                          localStorage.setItem(
                            "paymentInfo",
                            JSON.stringify({
                              packageTotal: totals.packageTotal,
                              testTotal: totals.testTotal,
                              subtotal: totals.subtotal,
                              diagnosticFee: totals.diagnosticFee,
                              tax: totals.tax,
                              totalDiscount: totals.totalDiscount,
                              grandTotal: totals.grandTotal,
                            })
                          );

                          // Store cart IDs for packages and tests
                          const packageIds = cartdata
                            .filter((item) => item.packageId)
                            .map((item) => item.packageId._id);

                          const testDetails = cartdata
                            .filter((item) => item.testDetails?.length > 0)
                            .flatMap((item) => item.testDetails);

                          localStorage.setItem(
                            "packageIds",
                            JSON.stringify(packageIds)
                          );
                          localStorage.setItem(
                            "testDetails",
                            JSON.stringify(testDetails)
                          );
                        }}
                      >
                        Proceed to Checkout
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <div className="modal fade custom-modals" id="delete_modal">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body p-4 text-center">
              <div>
                <span className="del-icon mb-2 mx-auto">
                  <i className="isax isax-trash"></i>
                </span>
                <h3 className="mb-2">Remove Item</h3>
                <p className="mb-3">
                  Are you sure you want to remove this item from your cart?
                </p>
                <div className="d-flex justify-content-center flex-wrap gap-3">
                  <button
                    className="btn btn-md btn-dark rounded-pill"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-md btn-primary-gradient rounded-pill"
                    data-bs-dismiss="modal"
                    onClick={confirmDelete}
                  >
                    Yes, Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Discount Info Modal */}
      <div className="modal fade custom-modals" id="off_modal">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body p-4 text-center">
              <div>
                <h3 className="mb-4">
                  How can you get discounts on health tests/packages?
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

                <div className="d-flex justify-content-center flex-wrap gap-3">
                  <button
                    className="btn btn-md btn-dark rounded-pill"
                    data-bs-dismiss="modal"
                  >
                    Got it
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
