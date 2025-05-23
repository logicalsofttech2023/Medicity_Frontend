import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const AppointmentCard = ({ data }) => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const handleCancel = async (orderId) => {
    if (!orderId) {
      toast("Order ID is missing.");
      return;
    }

    try {
      const response = await axios.post(
        "http://157.66.191.24:3088/api/admin/bookingOrderStatusChange",
        {
          orderId,
          status: 2,
        }
      );

      if (response.data.result) {
        toast("Order cancelled successfully.");
      } else {
        toast(response.data.message || "Cancellation failed.");
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
      toast("An error occurred while cancelling the order.");
    }
  };

  return (
    <>
      <Toaster />
      <div
        className="appointment-dash-card"
        key={data._id}
        style={{
          border: "1px solid #e0e0e0",
          borderRadius: "16px",
          padding: "24px",
          marginBottom: "24px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          backgroundColor: "#fff",
          transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
          position: "relative",
          overflow: "hidden",
          ":hover": {
            boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
            transform: "translateY(-2px)",
          },
        }}
      >
        {/* Doctor Info Section */}
        <div
          className="doctor-fav-list"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "20px",
            position: "relative",
          }}
        >
          <div
            className="doctor-info-profile"
            style={{
              display: "flex",
              gap: "16px",
              alignItems: "center",
              flex: "1",
              minWidth: 0,
            }}
          >
            <div className="table-avatar" style={{ flexShrink: 0 }}>
              <img
                src={
                  data.image
                    ? `${process.env.REACT_APP_IMG_URL}/${data.image}`
                    : "assets/img/doctors-dashboard/doctor-profile-img.jpg"
                }
                alt="Doctor"
                style={{
                  objectFit: "cover",
                  width: "88px",
                  height: "88px",
                  borderRadius: "14px",
                  border: "3px solid rgba(42, 125, 225, 0.1)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                }}
              />
            </div>
            <div
              className="doctor-name-info"
              style={{
                minWidth: 0,
                flex: "1",
              }}
            >
              <h5
                style={{
                  margin: "0 0 8px 0",
                  fontSize: "18px",
                  fontWeight: "700",
                  color: "#222",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {data.clinicName_hpName_drName}
              </h5>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                  marginBottom: "8px",
                }}
              >
                <span
                  style={{
                    backgroundColor: "rgba(42, 125, 225, 0.1)",
                    color: "#2a7de1",
                    padding: "6px 12px",
                    borderRadius: "5px",
                    fontSize: "13px",
                    fontWeight: "600",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <i
                    className="isax isax-brifecase-tick"
                    style={{ fontSize: "16px" }}
                  />
                  {data.serviceName}
                </span>
                <span
                  style={{
                    backgroundColor: "rgba(108, 117, 125, 0.1)",
                    color: "#6c757d",
                    padding: "6px 12px",
                    borderRadius: "10px",
                    fontSize: "13px",
                    fontWeight: "600",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <i className="isax isax-flask" style={{ fontSize: "16px" }} />
                  {data.testName}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div
          className="date-time"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "16px",
            marginBottom: "20px",
            padding: "16px",
            backgroundColor: "#f8fafc",
            borderRadius: "14px",
            border: "1px solid rgba(42, 125, 225, 0.1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                backgroundColor: "rgba(42, 125, 225, 0.1)",
                color: "#2a7de1",
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
              }}
            >
              <i className="isax isax-calendar" />
            </div>
            <div>
              <div
                style={{
                  fontSize: "13px",
                  color: "#64748b",
                  fontWeight: "500",
                }}
              >
                Date
              </div>
              <div style={{ fontWeight: "600", color: "#334155" }}>
                {data.appointmentDate}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                backgroundColor: "rgba(42, 125, 225, 0.1)",
                color: "#2a7de1",
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
              }}
            >
              <i className="isax isax-clock5" />
            </div>
            <div>
              <div
                style={{
                  fontSize: "13px",
                  color: "#64748b",
                  fontWeight: "500",
                }}
              >
                Time
              </div>
              <div style={{ fontWeight: "600", color: "#334155" }}>
                {data.appointmentTime}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                backgroundColor: "rgba(16, 185, 129, 0.1)",
                color: "#10b981",
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
              }}
            >
              <i className="isax isax-timer" />
            </div>
            <div>
              <div
                style={{
                  fontSize: "13px",
                  color: "#64748b",
                  fontWeight: "500",
                }}
              >
                Duration
              </div>
              <div style={{ fontWeight: "600", color: "#334155" }}>
                {data.duration}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                backgroundColor: "rgba(234, 179, 8, 0.1)",
                color: "#eab308",
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
              }}
            >
              <i className="isax isax-dollar-circle" />
            </div>
            <div>
              <div
                style={{
                  fontSize: "13px",
                  color: "#64748b",
                  fontWeight: "500",
                }}
              >
                Price
              </div>
              <div style={{ fontWeight: "600", color: "#334155" }}>
                ₹{data.price}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                backgroundColor: data.appointmentStatus
                  ? "rgba(34, 197, 94, 0.1)"
                  : "rgba(245, 158, 11, 0.1)",
                color: data.appointmentStatus ? "#22c55e" : "#f59e0b",
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
              }}
            >
              <i
                className={
                  data.appointmentStatus
                    ? "isax isax-tick-circle"
                    : "isax isax-clock"
                }
              />
            </div>
            <div>
              <div
                style={{
                  fontSize: "13px",
                  color: "#64748b",
                  fontWeight: "500",
                }}
              >
                Status
              </div>
              <div
                style={{
                  fontWeight: "600",
                  color: data.appointmentStatus ? "#22c55e" : "#f59e0b",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                {data.appointmentStatus ? "Confirmed" : "Pending"}
              </div>
            </div>
          </div>
        </div>

        {/* See More Button */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: showMore ? "20px" : "0",
          }}
        >
          <button
            onClick={toggleShowMore}
            style={{
              backgroundColor: "transparent",
              color: "#2a7de1",
              padding: "8px 20px",
              borderRadius: "20px",
              fontSize: "14px",
              fontWeight: "600",
              border: "1px solid rgba(42, 125, 225, 0.3)",
              cursor: "pointer",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              ":hover": {
                backgroundColor: "rgba(42, 125, 225, 0.05)",
                borderColor: "rgba(42, 125, 225, 0.5)",
              },
            }}
          >
            {showMore ? (
              <>
                <i
                  className="isax isax-arrow-up-2"
                  style={{ fontSize: "16px" }}
                />
                Show Less
              </>
            ) : (
              <>
                <i
                  className="isax isax-arrow-down-2"
                  style={{ fontSize: "16px" }}
                />
                Show Details
              </>
            )}
          </button>
        </div>

        {/* Additional Information (shown when expanded) */}
        {showMore && (
          <div
            style={{
              animation: "fadeIn 0.3s ease-out",
              marginTop: "16px",
            }}
          >
            {data.description && (
              <div
                className="desc mb-3"
                style={{
                  padding: "16px",
                  backgroundColor: "#f8fafc",
                  borderRadius: "12px",
                  marginBottom: "16px",
                  border: "1px solid rgba(42, 125, 225, 0.1)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                  }}
                >
                  <div
                    style={{
                      color: "#2a7de1",
                      fontSize: "18px",
                      marginTop: "2px",
                    }}
                  >
                    <i className="isax isax-note-text" />
                  </div>
                  <div>
                    <h6
                      style={{
                        margin: "0 0 8px 0",
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#334155",
                      }}
                    >
                      Appointment Notes
                    </h6>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "14px",
                        color: "#64748b",
                        lineHeight: "1.6",
                      }}
                    >
                      {data.description}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div
              className="customer-details"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "16px",
                padding: "16px",
                backgroundColor: "#f8fafc",
                borderRadius: "12px",
                marginBottom: "20px",
                border: "1px solid rgba(42, 125, 225, 0.1)",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "12px",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "rgba(99, 102, 241, 0.1)",
                      color: "#6366f1",
                      width: "36px",
                      height: "36px",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "16px",
                    }}
                  >
                    <i className="isax isax-user" />
                  </div>
                  <h6
                    style={{
                      margin: 0,
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#334155",
                    }}
                  >
                    Patient Details
                  </h6>
                </div>
                <div style={{ paddingLeft: "48px" }}>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#334155",
                      marginBottom: "4px",
                    }}
                  >
                    {data.customerName}
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      color: "#64748b",
                      marginBottom: "8px",
                    }}
                  >
                    <i
                      className="isax isax-call"
                      style={{ marginRight: "8px" }}
                    />
                    {data.customerPhone}
                  </div>
                  <div style={{ fontSize: "13px", color: "#64748b" }}>
                    <i
                      className="isax isax-sms"
                      style={{ marginRight: "8px" }}
                    />
                    {data.customerEmail}
                  </div>
                </div>
              </div>

              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "12px",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "rgba(239, 68, 68, 0.1)",
                      color: "#ef4444",
                      width: "36px",
                      height: "36px",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "16px",
                    }}
                  >
                    <i className="isax isax-location" />
                  </div>
                  <h6
                    style={{
                      margin: 0,
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#334155",
                    }}
                  >
                    Address
                  </h6>
                </div>
                <div
                  style={{
                    paddingLeft: "48px",
                    fontSize: "13px",
                    color: "#64748b",
                    lineHeight: "1.6",
                  }}
                >
                  {data.customerAddress}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div
          className="card-btns"
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            justifyContent: "flex-end",
          }}
        >
          {/* <button
          style={{
            padding: "10px 20px",
            borderRadius: "12px",
            backgroundColor: "white",
            color: "#2a7de1",
            border: "1px solid rgba(42, 125, 225, 0.3)",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "14px",
            fontWeight: "600",
            transition: "all 0.2s ease",
            cursor: "pointer",
            ":hover": {
              backgroundColor: "rgba(42, 125, 225, 0.05)",
              borderColor: "rgba(42, 125, 225, 0.5)",
            },
          }}
        >
          <i className="isax isax-messages-25" style={{ fontSize: "18px" }} />
          Message
        </button>

        <button
          style={{
            padding: "10px 24px",
            borderRadius: "12px",
            background: "linear-gradient(135deg, #2a7de1, #4a9df8)",
            color: "white",
            border: "none",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "14px",
            fontWeight: "600",
            transition: "all 0.2s ease",
            cursor: "pointer",
            boxShadow: "0 2px 6px rgba(42, 125, 225, 0.3)",
            ":hover": {
              background: "linear-gradient(135deg, #1a6dd1, #3a8de8)",
              boxShadow: "0 4px 10px rgba(42, 125, 225, 0.4)",
              transform: "translateY(-1px)",
            },
          }}
        >
          <i
            className="isax isax-calendar-tick5"
            style={{ fontSize: "18px" }}
          />
          Attend Appointment
        </button> */}

          <button
            style={{
              padding: "10px 16px",
              borderRadius: "12px",
              backgroundColor: "white",
              color: "#ef4444",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "14px",
              fontWeight: "600",
              transition: "all 0.2s ease",
              cursor: "pointer",
              ":hover": {
                backgroundColor: "rgba(239, 68, 68, 0.05)",
                borderColor: "rgba(239, 68, 68, 0.5)",
              },
            }}
            onClick={() => handleCancel(data._id)}
          >
            <i className="isax isax-trash" style={{ fontSize: "18px" }} />
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default AppointmentCard;
