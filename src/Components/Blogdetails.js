import axios from "axios";
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Blogdetails = () => {
  const location = useLocation();
  const blogId = location.state?.id;
  const [blog, setBlog] = React.useState(null);

  useEffect(() => {
    // Fetch blog details using the ID from the state
    const fetchBlogDetails = async () => {
      try {
        const response = await axios.post(
          `https://admin.klardaignostics.com/api/admin/getBlog`,
          {
            blogId: blogId,
          }
        );
        const data = response.data.data;
        setBlog(data);
      } catch (error) {
        console.error("Error fetching blog details:", error);
      }
    };

    fetchBlogDetails();
    window.scrollTo(0, 0);
  }, [blogId]);

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
                  <li className="breadcrumb-item active">Blog Details</li>
                </ol>
                <h2
                  style={{ textAlign: "justify" }}
                  className="breadcrumb-title"
                >
                  Blog Details
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
            <div className="col-lg-12 col-md-12">
              <div className="blog-view">
                <h3 className="mb-3">{blog?.title} </h3>
                <div className="blog blog-single-post">
                  <div className="blog-image">
                    <a>
                      <img
                        style={{
                          height: "300px",
                          overflow: "hidden",
                          borderRadius: "8px",
                          position: "relative",
                          objectFit: "cover",
                          width: "100%",
                        }}
                        alt="blog-image"
                        src={`${process.env.REACT_APP_IMG_URL}${blog?.image}`}
                      />
                    </a>
                  </div>
                  <div className="blog-info d-md-flex align-items-center justify-content-between flex-wrap">
                    <div className="post-left">
                      <ul>
                        <li>
                          <span className="badge badge-dark fs-14 fw-medium">
                            {blog?.categoryName}
                          </span>
                        </li>
                        <li>
                          <i className="isax isax-calendar" />
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
                    </div>
                    <div className="blog-views d-flex align-items-center justify-content-md-end">
                      
                      <span className="badge badge-outline-primary">
                        <i className="isax isax-eye me-1" />
                        {blog?.totalViewsCount || 0}
                      </span>
                    </div>
                  </div>
                  <div className="blog-content">
                    <p>{blog?.description}</p>

                   
                  </div>
                </div>
                {/* <h4 className="mb-3">About Author</h4>
                <div className="about-author">
                  <div className="about-author-img">
                    <div className="author-img-wrap">
                      <a href="#">
                        <img
                          alt="Darren Elder"
                          src="assets/img/doctors/doctor-thumb-02.jpg"
                        />
                      </a>
                    </div>
                  </div>
                  <div className="author-details">
                    <p className="mb-0">
                      As a certified nutritionist and wellness coach, I’m
                      passionate about helping others achieve a balanced
                      lifestyle and lasting health. My journey into health
                      started with my own desire to feel better physically and
                      mentally, and along the way, I’ve learned the importance
                      of consistency and small, sustainable changes. I love
                      exploring new ways to stay active, experimenting with
                      healthy meals, and sharing tips that are practical and
                      realistic for people with busy lives.
                    </p>
                  </div>
                </div>
                <h4 className="mb-3">Tags</h4>
                <div className="d-flex align-items-center flex-wrap blog-tags gap-3 mb-4">
                  <a  className="badge">
                    Health Tips
                  </a>
                  <a  className="badge">
                    Awareness
                  </a>
                  <a  className="badge">
                    Health
                  </a>
                  <a  className="badge">
                    Wellness
                  </a>
                </div> */}
              </div>
            </div>
            {/* Blog Sidebar */}
            {/* <div className="col-lg-4 col-md-12 sidebar-right theiaStickySidebar">
             
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
                    <li>
                      <a href="#">
                        Health Care <span>(2)</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        Nutritions <span>(4)</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        Health Tips <span>(5)</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        Medical Research <span>(4)</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        Health Treatment <span>(6)</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="card post-widget">
                <div className="card-body">
                  <h5 className="mb-3">Latest News</h5>
                  <ul className="latest-posts">
                    <li>
                      <div className="post-thumb">
                        <Link to="/Blogdetails">
                          <img
                            src="assets/img/blog/blog-thumb-11.jpg"
                            alt="blog-image"
                          />
                        </Link>
                      </div>
                      <div className="post-info">
                        <p>06 Nov 2024</p>
                        <h4>
                          <Link to="/Blogdetails">
                            Managing Chronic Conditions: Expert Advice for
                            Better Living
                          </Link>
                        </h4>
                      </div>
                    </li>
                    <li>
                      <div className="post-thumb">
                        <Link to="/Blogdetails">
                          <img
                            src="assets/img/blog/blog-thumb-12.jpg"
                            alt="blog-image"
                          />
                        </Link>
                      </div>
                      <div className="post-info">
                        <p>15 Nov 2024</p>
                        <h4>
                          <Link to="/Blogdetails">
                            Understanding Common Symptoms: When to See a Doctor
                          </Link>
                        </h4>
                      </div>
                    </li>
                    <li>
                      <div className="post-thumb">
                        <Link to="/Blogdetails">
                          <img
                            src="assets/img/blog/blog-thumb-13.jpg"
                            alt="blog-image"
                          />
                        </Link>
                      </div>
                      <div className="post-info">
                        <p>08 Dec 2024</p>
                        <h4>
                          <Link to="/Blogdetails">
                            Nutrition and Wellness: A Guide to Balanced Eating
                          </Link>
                        </h4>
                      </div>
                    </li>
                    <li>
                      <div className="post-thumb">
                        <Link to="/Blogdetails">
                          <img
                            src="assets/img/blog/blog-thumb-14.jpg"
                            alt="blog-image"
                          />
                        </Link>
                      </div>
                      <div className="post-info">
                        <p>17 Dec 2024</p>
                        <h4>
                          <Link to="/Blogdetails">
                            Top Preventive Health Measures Everyone Should Take
                          </Link>
                        </h4>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            
              <div className="card tags-widget">
                <div className="card-body">
                  <h5 className="mb-3">Tags</h5>
                  <ul className="tags">
                    <li>
                      <a href="#" className="tag">
                        Health Tips
                      </a>
                    </li>
                    <li>
                      <a href="#" className="tag">
                        Awareness
                      </a>
                    </li>
                    <li>
                      <a href="#" className="tag">
                        Health
                      </a>
                    </li>
                    <li>
                      <a href="#" className="tag">
                        Wellness
                      </a>
                    </li>
                    <li>
                      <a href="#" className="tag">
                        Treatments
                      </a>
                    </li>
                    <li>
                      <a href="#" className="tag">
                        Checkup
                      </a>
                    </li>
                    <li>
                      <a href="#" className="tag">
                        Prevention
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
             
            </div> */}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogdetails;
