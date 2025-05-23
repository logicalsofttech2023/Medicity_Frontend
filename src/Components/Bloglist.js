import axios from "axios";
import React, { useEffect, useState } from "react";
import { DNA } from "react-loader-spinner";
import { Link } from "react-router-dom";

const Bloglist = () => {
  const [blogList, setBlogList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 2;
  const [blogCategories, setBlogCategories] = useState([]);

  useEffect(() => {
    // Fetch blog details using the ID from the state
    const fetchBlogList = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_KEY}/blogList`
        );
        const data = response.data.data;
        setBlogList(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog details:", error);
        setLoading(false);
      }
    };

    const fetchBlogCategories = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_KEY}/blogCategoryList`
        );
        const data = response.data.data;
        setBlogCategories(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog categories:", error);
        setLoading(false);
      }
    };

    fetchBlogCategories();
    fetchBlogList();
  }, []);

  // Pagination logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogList.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogList.length / blogsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };
  return (
    <div>
      <div className="breadcrumb-bar">
        <div className="container">
          <div className="row align-items-center inner-banner">
            <div className="col-md-12 col-12 text-center">
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol style={{ justifyContent: "start" }} className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/">
                      <i className="isax isax-home-15" />
                    </a>
                  </li>
                  <li className="breadcrumb-item">Blogs</li>
                  <li className="breadcrumb-item active">Blog List</li>
                </ol>
                <h2
                  style={{ textAlign: "justify" }}
                  className="breadcrumb-title"
                >
                  Blog List
                </h2>
              </nav>
            </div>
          </div>
        </div>
        <div className="breadcrumb-bg">
          <img
            src="assets/img/bg/breadcrumb-bg-01.png"
            alt="img"
            className="breadcrumb-bg-01"
          />
          <img
            src="assets/img/bg/breadcrumb-bg-02.png"
            alt="img"
            className="breadcrumb-bg-02"
          />
          <img
            src="assets/img/bg/breadcrumb-icon.png"
            alt="img"
            className="breadcrumb-bg-03"
          />
          <img
            src="assets/img/bg/breadcrumb-icon.png"
            alt="img"
            className="breadcrumb-bg-04"
          />
        </div>
      </div>
      {/* /Breadcrumb */}
      {/* Page Content */}
      <div className="content">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-12">
              {/* Blog Post */}
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
              ) : currentBlogs.length > 0 ? (
                currentBlogs.map((blog, index) => (
                  <div className="blog">
                    <div className="blog-image">
                      <Link to="/Blogdetails" state={{ id: blog._id }}>
                        <img
                          src={`${process.env.REACT_APP_IMG_URL}${blog?.image}`}
                          alt="Post Image"
                          style={{
                            height: "282px",
                            overflow: "hidden",
                            borderRadius: "8px",
                            position: "relative",
                            objectFit: "cover",
                            width: "100%",
                          }}
                        />
                      </Link>
                      <span className="badge badge-cyan category-slug">
                        {blog?.categoryName}
                      </span>
                    </div>
                    <div className="blog-content">
                      <ul className="entry-meta meta-item">
                        <li>
                          <i className="isax isax-calendar-1 me-1" />
                          {new Date(blog?.updatedAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </li>
                      </ul>
                      <h3 className="blog-title">
                        <Link to="/Blogdetails" state={{ id: blog._id }}>
                          {blog?.title}
                        </Link>
                      </h3>
                      <p className="mb-0">{blog?.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12 text-center mt-5">
                  <img src="assets/img/error-500.png" alt="No data" />
                  <h5 className="mt-3">Sorry! No blog posts found.</h5>
                </div>
              )}
              {/* /Blog Post */}
              {/* Blog Pagination */}
              <div className="row">
                {blogList.length > blogsPerPage && (
                  <div className="col-md-12">
                    <div className="pagination dashboard-pagination mt-md-3 mt-0 mb-4">
                      <ul>
                        <li>
                          <button
                            className="page-link prev"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                          >
                            Prev
                          </button>
                        </li>
                        {Array.from({ length: totalPages }, (_, i) => (
                          <li key={i}>
                            <button
                              className={`page-link ${
                                currentPage === i + 1 ? "active" : ""
                              }`}
                              onClick={() => handlePageChange(i + 1)}
                            >
                              {i + 1}
                            </button>
                          </li>
                        ))}
                        <li>
                          <button
                            className="page-link next"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                          >
                            Next
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
              {/* /Blog Pagination */}
            </div>
            {/* Blog Sidebar */}
            <div className="col-lg-4 col-md-12 sidebar-right ">
              <div className="card search-widget">
                <div className="card-body">
                  <form className="search-form">
                    <div className="input-group">
                      <input
                        type="text"
                        placeholder="Search..."
                        className="form-control"
                      />
                      <button type="submit" className="btn btn-primary">
                        <i className="isax isax-search-normal" />
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <div className="card category-widget">
                <div className="card-body">
                  <h5 className="mb-3">Categories</h5>
                  <ul className="categories">
                    {blogCategories.map((category) => (
                      <li key={category._id}>
                        <Link>
                          {category.categoryName}{" "}
                          <span>({category?.totalBlogs})</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="card post-widget">
                <div className="card-body">
                  <h5 className="mb-3">Latest News</h5>
                  <ul className="latest-posts">
                    {currentBlogs
                      .sort(
                        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
                      )
                      .slice(0, 5)

                      .map((blog, index) => (
                        <li key={index}>
                          <div className="post-thumb">
                            <Link to="/Blogdetails" state={{ id: blog._id }}>
                              <img
                                src={`${process.env.REACT_APP_IMG_URL}${blog?.image}`}
                                alt="blog-image"
                              />
                            </Link>
                          </div>
                          <div className="post-info">
                            <p>
                              {new Date(blog?.updatedAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </p>
                            <h4>
                              <Link to="/Blogdetails" state={{ id: blog._id }}>
                                {blog?.title}
                              </Link>
                            </h4>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
            {/* /Blog Sidebar */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bloglist;
