import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { DNA } from "react-loader-spinner";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import axios from "axios";


const Blog = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { triggerOnce: true, margin: "-100px" });
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_KEY}/blogList`
        );
        console.log(response);

        setBlogData(response.data.data);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };

    fetchBlogData();
  }, []);
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
    slidesToShow: 3,
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
  return (
    <div>
      <section className="our-blog-fourteen">
        <div className="section-bg">
          <img src="assets/img/bg/blog-bg-14.png" alt="Img" />
        </div>
        <div className="container">
          <div className="section-header sec-header-one">
            <h2>
              Recent <span> Articles </span>
            </h2>
          </div>
          <Slider {...settings}>
            {blogData.map((blog, index) => (
              <div
                className="blog-grid-fourteen"
                data-aos="fade-up"
                data-aos-delay={500 + index * 100}
                key={blog.id}
                style={{ padding: "20px" }}
              >
                <div
                  className="blog-grig-img"
                  style={{
                    height: "200px", // Fixed height
                    overflow: "hidden", // Hide overflow
                    borderRadius: "8px", // Optional: rounded corners
                    position: "relative", // For absolute positioning if needed
                  }}
                >
                  <Link to="/Blogdetails" state={{ id: blog._id }}>
                    <img
                      src={`${process.env.REACT_APP_IMG_URL}${blog.image}`}
                      alt="Blog"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover", // Maintain aspect ratio while filling container
                        transition: "transform 0.3s ease", // Smooth hover effect
                      }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/400x200";
                      }}
                    />
                  </Link>
                </div>
                <div className="blog-grid-content">
                  <div className="grid-head">
                    <span
                      className={`badge badge-${
                        index % 2 === 0 ? "blue" : "pink"
                      }`}
                    >
                      {blog.categoryName}
                    </span>
                    <span>
                      {new Date(blog.updatedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <h4>
                    <Link to="/Blogdetails" state={{ id: blog._id }}>{blog.title}</Link>
                  </h4>
                  <p
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 3, // Limit to 3 lines
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {blog.description}
                  </p>
                  <div className="grid-footer">
                    <span>
                      <i className="feather-eye" /> {blog.totalViewsCount} views
                    </span>
                    <Link to="/Blogdetails" state={{ id: blog._id }}>
                      Read More <i className="feather-arrow-right-circle" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
          <div className="owl-nav-button">
            <div className="owl-nav blog-slide-nav nav-control" />
            <Link to="Bloglist" className="view-all">
              View All Blogs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
