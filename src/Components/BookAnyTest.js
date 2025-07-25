import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { DNA } from "react-loader-spinner";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import Swal from "sweetalert2";

const BookAnyTest = () => {
  let userId = secureLocalStorage.getItem("medicityuser");

  const Navigate = useNavigate();
  const location = useLocation();
  const { ids } = location.state || {};
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [testList, setTestList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    getCartItems();
    getTestList();
    window.scrollTo(0, 0);
  }, [ids, userId]);

  useEffect(() => {
    applyFilters();
  }, [searchQuery, testList, ids]);

  const getCartItems = async () => {
    if (!userId) return;

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_KEY}getCartTests`,
        {
          userId: userId,
        }
      );
      if (response.data.result) {
        setCartItems(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const getTestList = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("empId", "KLR099101");
    formData.append("secretKey", "KLR@74123");

    axios
      .post("https://medicityguwahati.in/klar_diag/api/getTestList/", formData)
      .then((res) => {
        console.log(res.data.labTest.length);
        
        if (res.data.status && res.data.labTest) {
          setTestList(res.data.labTest);
          setFilteredList(res.data.labTest);
        } else {
          toast.error("No tests available");
        }
      })
      .catch((err) => {
        console.log("err", err);
        toast.error("Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const applyFilters = () => {
    let result = [...testList];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((item) =>
        item.test_name.toLowerCase().includes(query)
      );
    }

    setFilteredList(result);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const resetFilters = () => {
    setSearchQuery("");
  };

  const handleSubmit = (test) => {
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

    // Check if test is already in cart
    const isAlreadyInCart = cartItems.some((cartItem) =>
      cartItem.testDetails.some((item) => item.test_id === test.test_id)
    );

    if (isAlreadyInCart) {
      Swal.fire({
        icon: "warning",
        title: "Already in Cart",
        text: "This test is already in your cart",
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }

    const formData = {
      userId: userId,
      testDetails: [
        {
          test_id: test.test_id,
          test_name: test.test_name,
          test_rate: test.test_rate,
          test_type: test.test_type || 1,
          category_id: test.category_id || "default_category",
        },
      ],
    };

    axios
      .post(`${process.env.REACT_APP_API_KEY}addToCart`, formData)
      .then((res) => {
        getCartItems(); // Refresh cart items after adding
        Swal.fire({
          icon: "success",
          title: "Success",
          text: res?.data?.message,
          timer: 2000,
          showConfirmButton: false,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response?.data?.message || "Something went wrong",
          timer: 2000,
          showConfirmButton: false,
        });
      });
  };

  const colors = [
    "linear-gradient(135deg, rgb(245, 166, 35), rgb(247, 107, 28))",
    "linear-gradient(135deg, rgb(54, 209, 220), rgb(91, 134, 229))",
    "linear-gradient(135deg, rgb(255, 126, 179), rgb(255, 117, 140))",
    "linear-gradient(135deg, rgb(54, 209, 220), rgb(91, 134, 229))",
  ];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredList.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

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
                    <li className="breadcrumb-item">Home</li>
                    <li className="breadcrumb-item active">Book Any Test</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>

        <div className="content mt-0 pt-3">
          <div className="container">
            <div className="row">
              {/* Sidebar with filters - Simplified to just search */}
              {/* Search Section */}
              <div className="col-xl-12 col-lg-12 mb-1">
                <div className="card shadow-sm border-0">
                  <div className="card-body p-4">
                    <div className="row align-items-center">
                      <div className="col-md-8">
                        <h4 className="mb-3 fw-bold text-primary">
                          Find Your Test
                        </h4>
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control form-control-lg border-end-0"
                            placeholder="Search tests by name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                          <span className="input-group-text bg-white border-start-0">
                            <i className="isax isax-search-normal-1"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="col-xl-12 col-lg-12">
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
                    {currentItems?.length > 0 ? (
                      <div className="row align-items-center">
                        <div className="col-md-12">
                          <div className="mb-4">
                            <h3>
                              {searchQuery ? (
                                <>
                                  Showing results for{" "}
                                  <span className="text-secondary">
                                    "{searchQuery}"
                                  </span>
                                </>
                              ) : (
                                "All Available Tests"
                              )}
                            </h3>
                            <p className="text-muted">
                              {filteredList.length} tests found
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : null}

                    <div className="row">
                      {currentItems?.length > 0
                        ? currentItems?.map((test, index) => (
                            <div className="col-lg-4 col-md-4 mb-4" key={index}>
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
                                    className="fw-bold mb-0"
                                    style={{ minHeight: "30px" }}
                                  >
                                    {test?.test_name}
                                  </h5>
                                  <div className="d-flex justify-content-between align-items-center">
                                    <span className="fs-14 fw-bold">
                                      ₹{test?.test_rate}
                                    </span>
                                  </div>

                                  <button
                                    onClick={() => handleSubmit(test)}
                                    className="btn btn-light w-100 mt-1 rounded-pill fw-bold"
                                    style={{ color: "#333" }}
                                    disabled={cartItems.some((cartItem) =>
                                      cartItem.testDetails.some(
                                        (item) => item.test_id === test.test_id
                                      )
                                    )}
                                  >
                                    <i className="isax isax-shopping-cart me-2"></i>
                                    {cartItems.some((cartItem) =>
                                      cartItem.testDetails.some(
                                        (item) => item.test_id === test.test_id
                                      )
                                    )
                                      ? "Already in Cart"
                                      : "Add to Cart"}
                                  </button>
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
                                      {searchQuery
                                        ? `No tests found for "${searchQuery}"`
                                        : "No tests available"}
                                    </h5>
                                    <button
                                      className="btn btn-primary"
                                      onClick={resetFilters}
                                    >
                                      {searchQuery ? "Reset Search" : "Refresh"}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                    </div>
                  </>
                )}
              </div>
              {filteredList.length > itemsPerPage && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "8px",
                    marginTop: "24px",
                    marginBottom: "40px",
                    flexWrap: "wrap",
                  }}
                >
                  <button
                    style={{
                      padding: "8px 16px",
                      borderRadius: "8px",
                      backgroundColor: "#f8fafc",
                      color: "#334155",
                      border: "1px solid #e2e8f0",
                      fontSize: "14px",
                      fontWeight: "600",
                      cursor: currentPage === 1 ? "not-allowed" : "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      opacity: currentPage === 1 ? 0.5 : 1,
                    }}
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    <i
                      className="isax isax-arrow-left-1"
                      style={{ fontSize: "16px" }}
                    />
                    Previous
                  </button>

                  {/* Always show first page */}
                  <button
                    key={1}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "8px",
                      backgroundColor:
                        1 === currentPage ? "#2a7de1" : "#f8fafc",
                      color: 1 === currentPage ? "white" : "#334155",
                      border: `1px solid ${
                        1 === currentPage ? "#2a7de1" : "#e2e8f0"
                      }`,
                      fontSize: "14px",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
                    onClick={() => handlePageChange(1)}
                  >
                    1
                  </button>

                  {/* Show ellipsis if current page is far from start */}
                  {currentPage > 3 && (
                    <span style={{ padding: "0 8px" }}>...</span>
                  )}

                  {/* Show pages around current page */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(
                      (page) =>
                        page === currentPage - 1 ||
                        page === currentPage ||
                        page === currentPage + 1 ||
                        (currentPage === 1 && page === 2) ||
                        (currentPage === totalPages && page === totalPages - 1)
                    )
                    .filter((page) => page > 1 && page < totalPages)
                    .map((page) => (
                      <button
                        key={page}
                        style={{
                          padding: "8px 16px",
                          borderRadius: "8px",
                          backgroundColor:
                            page === currentPage ? "#2a7de1" : "#f8fafc",
                          color: page === currentPage ? "white" : "#334155",
                          border: `1px solid ${
                            page === currentPage ? "#2a7de1" : "#e2e8f0"
                          }`,
                          fontSize: "14px",
                          fontWeight: "600",
                          cursor: "pointer",
                        }}
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </button>
                    ))}

                  {/* Show ellipsis if current page is far from end */}
                  {currentPage < totalPages - 2 && (
                    <span style={{ padding: "0 8px" }}>...</span>
                  )}

                  {/* Always show last page if there's more than 1 page */}
                  {totalPages > 1 && (
                    <button
                      key={totalPages}
                      style={{
                        padding: "8px 16px",
                        borderRadius: "8px",
                        backgroundColor:
                          totalPages === currentPage ? "#2a7de1" : "#f8fafc",
                        color: totalPages === currentPage ? "white" : "#334155",
                        border: `1px solid ${
                          totalPages === currentPage ? "#2a7de1" : "#e2e8f0"
                        }`,
                        fontSize: "14px",
                        fontWeight: "600",
                        cursor: "pointer",
                      }}
                      onClick={() => handlePageChange(totalPages)}
                    >
                      {totalPages}
                    </button>
                  )}

                  <button
                    style={{
                      padding: "8px 16px",
                      borderRadius: "8px",
                      backgroundColor: "#f8fafc",
                      color: "#334155",
                      border: "1px solid #e2e8f0",
                      fontSize: "14px",
                      fontWeight: "600",
                      cursor:
                        currentPage === totalPages ? "not-allowed" : "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      opacity: currentPage === totalPages ? 0.5 : 1,
                    }}
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    Next
                    <i
                      className="isax isax-arrow-right-1"
                      style={{ fontSize: "16px" }}
                    />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAnyTest;
