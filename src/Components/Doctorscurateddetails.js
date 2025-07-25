import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { DNA } from "react-loader-spinner";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import Swal from "sweetalert2";

const Doctorscurateddetails = () => {
  const Navigate = useNavigate();
  const location = useLocation();
  const { ids } = location.state || {};

  const [loading, setLoading] = useState(false);
  const [packageList, setPackageList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [filters, setFilters] = useState({
    priceRange: [0, 10000],
    reportTime: "",
    testCount: "",
    categoryId: ids ? [ids] : [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [Categoryres, setCategoryres] = useState();

  useEffect(() => {
    GetpackageList();
    GetpackageCategoryList();
    applyFilters();
    window.scrollTo(0, 0);
  }, [ids]);

  useEffect(() => {
    applyFilters();
  }, [filters, packageList, ids]);

  useEffect(() => {
    if (ids) {
      setFilters((prev) => ({
        ...prev,
        categoryId: [ids],
      }));
    }
  }, [ids]);

  const GetpackageList = () => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_KEY}getAllPackageList`)
      .then((res) => {
        setPackageList(res.data.data);
        setFilteredList(res.data.data);
      })
      .catch((err) => {
        console.log("err", err);
        toast.error("Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const GetpackageCategoryList = () => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}packageCategoryList`)
      .then((res) => {
        setCategoryres(res.data.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const applyFilters = () => {
    let result = [...packageList];

    // Filter by price range
    result = result.filter(
      (item) =>
        item.price >= filters.priceRange[0] &&
        item.price <= filters.priceRange[1]
    );

    // Filter by category
    if (filters.categoryId && filters.categoryId.length > 0) {
      result = result.filter((item) =>
        filters.categoryId.includes(item.package_categoryId)
      );
    }

    // Filter by report time
    if (filters.reportTime) {
      result = result.filter((item) => {
        const reportTime = parseInt(item.report_time);
        switch (filters.reportTime) {
          case "24":
            return reportTime <= 24;
          case "48":
            return reportTime > 24 && reportTime <= 48;
          case "72":
            return reportTime > 48;
          default:
            return true;
        }
      });
    }

    // Filter by test count
    if (filters.testCount) {
      result = result.filter((item) => {
        const testCount = parseInt(item.total_test);
        switch (filters.testCount) {
          case "10":
            return testCount <= 10;
          case "30":
            return testCount > 10 && testCount <= 30;
          case "50":
            return testCount > 30;
          default:
            return true;
        }
      });
    }

    setFilteredList(result);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handlePriceChange = (e, index) => {
    const newPriceRange = [...filters.priceRange];
    newPriceRange[index] = parseInt(e.target.value);
    setFilters({ ...filters, priceRange: newPriceRange });
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const resetFilters = () => {
    setFilters({
      priceRange: [0, 10000],
      reportTime: "",
      testCount: "",
      categoryId: [],
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
        GetpackageList();
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
          text: error.response.data.message || "Something went wrong",
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
                    <li className="breadcrumb-item">Health Checkup</li>
                    <li className="breadcrumb-item active">
                      Health Checkup Package
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>

        <div className="content mt-0 pt-3">
          <div className="container">
            <div className="row">
              {/* Sidebar with filters */}
              <div className="col-xl-3 col-lg-3">
                <div className="card shadow-sm mb-4">
                  <div className="card-header bg-white">
                    <h5 className="mb-0">Filters</h5>
                  </div>
                  <div className="card-body">
                    {/* Price Range Filter */}
                    {/* <div className="mb-4">
                      <h6 className="mb-3">Price Range</h6>
                      <div className="d-flex justify-content-between mb-2">
                        <span>₹{filters.priceRange[0]}</span>
                        <span>₹{filters.priceRange[1]}</span>
                      </div>
                      <input
                        type="range"
                        className="form-range"
                        min="0"
                        max="10000"
                        step="500"
                        value={filters.priceRange[0]}
                        onChange={(e) => handlePriceChange(e, 0)}
                      />
                      <input
                        type="range"
                        className="form-range"
                        min="0"
                        max="10000"
                        step="500"
                        value={filters.priceRange[1]}
                        onChange={(e) => handlePriceChange(e, 1)}
                      />
                    </div> */}

                    {/* Package Category Filter */}
                    <div className="mb-4">
                      <h6 className="mb-3">Package Category</h6>
                      <div
                        className="form-control"
                        style={{ maxHeight: "200px", overflowY: "auto" }}
                      >
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="all-categories"
                            checked={
                              !filters.categoryId ||
                              filters.categoryId.length === 0
                            }
                            onChange={() =>
                              setFilters({ ...filters, categoryId: [] })
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="all-categories"
                          >
                            All Categories
                          </label>
                        </div>
                        {Categoryres?.map((category) => (
                          <div className="form-check" key={category._id}>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={`category-${category._id}`}
                              checked={filters.categoryId?.includes(
                                category._id
                              )}
                              onChange={(e) => {
                                const newCategories = filters.categoryId || [];
                                if (e.target.checked) {
                                  setFilters({
                                    ...filters,
                                    categoryId: [
                                      ...newCategories,
                                      category._id,
                                    ],
                                  });
                                } else {
                                  setFilters({
                                    ...filters,
                                    categoryId: newCategories.filter(
                                      (id) => id !== category._id
                                    ),
                                  });
                                }
                              }}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`category-${category._id}`}
                            >
                              {category.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Report Time Filter */}
                    <div className="mb-4">
                      <h6 className="mb-3">Report Time</h6>
                      <select
                        className="form-select"
                        name="reportTime"
                        value={filters.reportTime}
                        onChange={handleFilterChange}
                      >
                        <option value="">All</option>
                        <option value="24">Within 24 hours</option>
                        <option value="48">24-48 hours</option>
                        <option value="72">More than 48 hours</option>
                      </select>
                    </div>

                    {/* Test Count Filter */}
                    <div className="mb-4">
                      <h6 className="mb-3">Number of Tests</h6>
                      <select
                        className="form-select"
                        name="testCount"
                        value={filters.testCount}
                        onChange={handleFilterChange}
                      >
                        <option value="">All</option>
                        <option value="10">Up to 10 tests</option>
                        <option value="30">10-30 tests</option>
                        <option value="50">More than 30 tests</option>
                      </select>
                    </div>

                    <button
                      className="btn btn-outline-primary w-100"
                      onClick={resetFilters}
                    >
                      Reset Filters
                    </button>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="col-xl-9 col-lg-9">
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
                              Showing results for{" "}
                              <span className="text-secondary">
                                "Full Body"
                              </span>{" "}
                              package
                            </h3>
                            <p className="text-muted">
                              {currentItems.length} packages found
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : null}

                    <div className="row">
                      {currentItems?.length > 0
                        ? currentItems?.map((packageData, index) => (
                            <div className="col-lg-6 col-md-6 mb-4" key={index}>
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
                                    onClick={() =>
                                      Navigate(
                                        `/Healthcheckuppackagedetails/${packageData?._id}`
                                      )
                                    }
                                    className="fw-bold mb-0"
                                    style={{ minHeight: "30px" }}
                                  >
                                    {packageData?.title}
                                  </h5>
                                  <div
                                    onClick={() =>
                                      Navigate(
                                        `/Healthcheckuppackagedetails/${packageData?._id}`
                                      )
                                    }
                                    className="d-flex justify-content-between align-items-center"
                                  >
                                    <a
                                      href="#"
                                      className="gap-1 d-flex text-light text-decoration-none"
                                    >
                                      <span className="fs-14 fw-bold">
                                        {packageData?.price}
                                      </span>
                                      <del className="fs-14">
                                        {packageData?.discount_price}
                                      </del>
                                    </a>
                                  </div>

                                  {/* Tags */}
                                  {/* <div
                                    onClick={() =>
                                      Navigate(
                                        `/Healthcheckuppackagedetails/${packageData?._id}`
                                      )
                                    }
                                    className="my-0"
                                  >
                                    {packageData.test ? (
                                      packageData?.test.map((data) => {
                                        return (
                                          <span
                                            className="badge bg-light text-dark me-2 mb-2"
                                            style={{
                                              fontSize: "0.85rem",
                                              padding: "6px 12px",
                                              borderRadius: "20px",
                                            }}
                                          >
                                            {data}
                                          </span>
                                        );
                                      })
                                    ) : (
                                      <h6 className=" text-light mb-2 flexwrap-wrap">
                                        {packageData?.badges}
                                      </h6>
                                    )}
                                  </div> */}

                                  <div className="my-0 d-flex flex-wrap">
                                    {Array.isArray(packageData?.test) &&
                                    packageData.test.length > 0 ? (
                                      packageData.test.map((testItem, i) => (
                                        <span
                                          key={i}
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
                                          title={
                                            testItem?.test_name ||
                                            "Unnamed Test"
                                          } // tooltip
                                        >
                                          {testItem?.test_name ||
                                            "Unnamed Test"}
                                        </span>
                                      ))
                                    ) : (
                                      <h6 className="text-light mb-2">
                                        {packageData?.badges ||
                                          "No tests available"}
                                      </h6>
                                    )}
                                  </div>

                                  <div
                                    onClick={() =>
                                      Navigate(
                                        `/Healthcheckuppackagedetails/${packageData?._id}`
                                      )
                                    }
                                    className="d-flex justify-content-between align-items-center text-light small"
                                  >
                                    <span>
                                      Reports in {packageData.report_time} hours
                                    </span>
                                    <span className="fw-bold">
                                      {packageData.total_test} Tests
                                    </span>
                                  </div>

                                  <Link
                                    onClick={() =>
                                      handleSubmit(packageData?._id)
                                    }
                                    className="btn btn-light w-100 mt-1 rounded-pill fw-bold"
                                    style={{ color: "#333" }}
                                  >
                                    <i className="isax isax-shopping-cart me-2"></i>{" "}
                                    Add to Cart
                                  </Link>
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
                                      Sorry! No packages match your filters.
                                    </h5>
                                    <button
                                      className="btn btn-primary"
                                      onClick={resetFilters}
                                    >
                                      Reset Filters
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

export default Doctorscurateddetails;
