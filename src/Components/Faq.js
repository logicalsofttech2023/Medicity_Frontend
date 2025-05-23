import React, { useEffect, useState } from "react";
import axios from "axios";
import { DNA } from "react-loader-spinner";

const Faq = () => {
  const [faqList, setFaqList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFaqs = async () => {
    try {
      const res = await axios.get(
        "http://157.66.191.24:3088/api/admin/faqList"
      );
      if (res?.data?.result) {
        setFaqList(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  return (
    <section className="faq-section-one">
      <div className="container">
        <div
          className="section-header sec-header-one text-center aos"
          data-aos="fade-up"
        >
          <span className="badge badge-primary">FAQ’S</span>
          <h2>Your Questions are Answered</h2>
        </div>
        <div className="row">
          <div className="col-md-10 mx-auto">
            <div className="faq-info aos" data-aos="fade-up">
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
              ) : faqList.length === 0 ? null : (
                <div className="accordion" id="faq-details">
                  {faqList.map((faq, index) => (
                    <div className="accordion-item" key={faq._id}>
                      <h2 className="accordion-header" id={`heading${index}`}>
                        <button
                          className={`accordion-button ${
                            index !== 0 ? "collapsed" : ""
                          }`}
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#collapse${index}`}
                          aria-expanded={index === 0 ? "true" : "false"}
                          aria-controls={`collapse${index}`}
                        >
                          {faq.question}
                        </button>
                      </h2>
                      <div
                        id={`collapse${index}`}
                        className={`accordion-collapse collapse ${
                          index === 0 ? "show" : ""
                        }`}
                        aria-labelledby={`heading${index}`}
                        data-bs-parent="#faq-details"
                      >
                        <div className="accordion-body">
                          <div className="accordion-content">
                            <p>{faq.answer}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
