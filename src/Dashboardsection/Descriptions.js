import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import secureLocalStorage from "react-secure-storage";

const Descriptions = () => {
  const [confirm, setConfirm] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [memberData, setMemberData] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);

  const fileInputRef = useRef(null);

  // Form states
  const [formData, setFormData] = useState({
    gender: "Male",
    fullName: "",
    relationName: "",
    age: "",
    phone: "",
    email: "",
    dob: ""
  });

  const handleFileChange = (e) => {
    const filesArray = Array.from(e.target.files);
    setSelectedFiles((prev) => [...prev, ...filesArray]);
  };

  const handleDelete = (indexToRemove) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleAddMoreClick = () => {
    fileInputRef.current.click();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addMember = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const payload = {
        userId: secureLocalStorage.getItem("medicityuser"),
        ...formData
      };
      
      await axios.post(`${process.env.REACT_APP_API_KEY}member`, payload);
      await getMember();
      toast.success("Member Added Successfully");
      // Reset form
      setFormData({
        gender: "Male",
        fullName: "",
        relationName: "",
        age: "",
        phone: "",
        email: "",
        dob: ""
      });
    } catch (error) {
      toast.error("Failed to add member");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    getMember();
  }, []);

  const getMember = async () => {
    setIsLoading(true);
    try {
      const data = {
        userId: secureLocalStorage.getItem("medicityuser"),
      };
      const res = await axios.post(`${process.env.REACT_APP_API_KEY}getMembersByUser`, data);
      setMemberData(res.data);
    } catch (error) {
      toast.error("Failed to load members");
    } finally {
      setIsLoading(false);
    }
  };

  const addPrescription = async (memberId) => {
    if (!selectedFiles.length) {
      toast.error("Please select at least one file");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("userId", secureLocalStorage.getItem("medicityuser"));            
      formData.append("memberId", memberId);
      
      selectedFiles.forEach((image) => {
        formData.append("files", image);
      });

      const res = await axios.post(`${process.env.REACT_APP_API_KEY}addPrescription`, formData);
      toast.success(res.data.message);
      setConfirm("success");
      setSelectedFiles([]);
    } catch (error) {
      toast.error("Failed to upload prescription");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Toaster />
      {/* Breadcrumb Navigation */}
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
                  <li onClick={() => setConfirm(null)} className="breadcrumb-item">
                    Prescription
                  </li>
                  <li className="breadcrumb-item active">
                    Upload Prescription
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Prescription Section */}
      {confirm === null ? (
        <div className="p-4" style={{ width: "90%", margin: "auto", marginTop: "20px" }}>
          <h3 style={{ marginBottom: "15px" }}>Upload Prescription</h3>
          {selectedFiles.length >= 1 ? (
            <div className="upload-area">
              <div>
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  height={50}
                  width={50}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1={12} y1={3} x2={12} y2={15} />
                </svg>

                <h4 className="mt-3 add-more" onClick={handleAddMoreClick}>
                  + Add More
                </h4>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".jpg,.jpeg,.png,.doc,.docx,.pdf,.heic"
                onChange={handleFileChange}
                className="file-input"
              />
            </div>
          ) : (
            <div className="upload-area">
              <div>
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  height={50}
                  width={50}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1={12} y1={3} x2={12} y2={15} />
                </svg>
                <h4 className="upload-text">Drag and Drop here</h4>
                <span>or</span>
                <h4 className="browse-files" onClick={handleAddMoreClick}>
                  Browse Files
                </h4>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".jpg,.jpeg,.png,.doc,.docx,.pdf,.heic"
                onChange={handleFileChange}
                className="file-input"
              />
            </div>
          )}

          {/* Selected File Preview */}
          {selectedFiles.length > 0 && (
            <div className="file-preview-container">
              <h5 className="preview-title">Selected Files:</h5>
              <div className="row gx-3 gy-3">
                {selectedFiles.map((file, index) => (
                  <div className="col-md-6 col-lg-6 mb-3 file-preview-item" key={index}>
                    <svg
                      onClick={() => handleDelete(index)}
                      className="delete-icon"
                      viewBox="0 0 17 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.666 17.002a8.334 8.334 0 1 1 0-16.67 8.336 8.336 0 0 1 5.894 14.231 8.281 8.281 0 0 1-5.894 2.439Zm0-7.158 2.991 2.991 1.175-1.175-2.991-2.992 2.992-2.992-1.175-1.174-2.992 2.991-2.992-2.99L4.5 5.675l2.99 2.992L4.5 11.66l1.174 1.176 2.992-2.992Z"
                        fill="#000"
                      />
                    </svg>

                    <img
                      src={URL.createObjectURL(file)}
                      alt={`preview-${index}`}
                      className="preview-image"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {selectedFiles.length > 0 && (
            <div className="text-center mt-3">
              <button
                onClick={() => setConfirm("selectMember")}
                className="btn btn-primary-gradient w-50 rounded-pill fw-bold"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : 'Confirm'}
              </button>
            </div>
          )}
        </div>
      ) : confirm === "selectMember" ? (
        <div className="member-selection-container">
          <div className="content doctor-content card">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 col-xl-12">
                  <div className="dashboard-header">
                    <h3>Select a member</h3>
                    <button 
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => setConfirm(null)}
                    >
                      Back
                    </button>
                  </div>

                  {isLoading ? (
                    <div className="text-center py-5">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  ) : memberData.length > 0 ? (
                    <div className="member-list">
                      {memberData.map((member) => (
                        <div 
                          className={`member-item ${selectedMember === member._id ? 'selected' : ''}`}
                          key={member._id}
                          onClick={() => setSelectedMember(member._id)}
                        >
                          <div className="member-info">
                            <h5>{member.fullName}</h5>
                            <div className="member-details">
                              <span>Relationship: {member.relationName}</span>
                              <span>Age: {member.age}</span>
                              <span>Gender: {member.gender}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p>No members found. Please add a member first.</p>
                    </div>
                  )}

                  <div className="text-center mt-4">
                    <button
                      className="btn btn-primary me-2"
                      data-bs-toggle="modal"
                      data-bs-target="#add_dependent"
                    >
                      + Add New Member
                    </button>
                    
                    {selectedMember && (
                      <button
                        className="btn btn-success"
                        onClick={() => addPrescription(selectedMember)}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Uploading...' : 'Upload Prescription'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : confirm === "success" ? (
        <div className="success-container">
          <div className="success-message">
            <h4 className="text-success">Uploaded Successfully!</h4>
            <h6 className="mt-2 mb-2">
              Your prescription is in good hands! We will review your
              prescription and call you within 5 minutes with the best price
            </h6>
          </div>
          <div className="help-section">
            <span>Need help right away? </span>
            <a href="tel:+918988988787" className="call-btn">
              <svg
                width="20"
                height="19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.458 1.214a7.056 7.056 0 0 1 6.234 6.226M12.458 4.35a3.92 3.92 0 0 1 3.1 3.1"
                  stroke="#E00646"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  clipRule="evenodd"
                  d="M9.518 10.043c3.531 3.531 4.333-.554 6.581 1.694 2.168 2.167 3.416 2.601.668 5.347-.344.277-2.53 3.604-10.213-4.077-7.684-7.682-4.359-9.87-4.082-10.214 2.753-2.754 3.18-1.5 5.349.667 2.248 2.248-1.835 3.052 1.697 6.583Z"
                  stroke="url(#Calling_svg__a)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <defs>
                  <linearGradient
                    id="Calling_svg__a"
                    x1="18.344"
                    y1="1.214"
                    x2="0.983"
                    y2="18.037"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#0E3F6C" />
                    <stop offset="1" stopColor="#235B8E" />
                  </linearGradient>
                </defs>
              </svg>
              <span>Call Now</span>
            </a>
          </div>
          <div className="text-center mt-4">
            <button 
              className="btn btn-primary"
              onClick={() => {
                setConfirm(null);
                setSelectedFiles([]);
              }}
            >
              Upload Another Prescription
            </button>
          </div>
        </div>
      ) : null}

      {/* Add Member Modal */}
      <div className="modal fade custom-modals" id="add_dependent">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Add Member</h3>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-xmark" />
              </button>
            </div>
            <form onSubmit={addMember}>
              <div className="add-dependent">
                <div className="modal-body pb-0">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">
                          Full Name <span className="text-danger">*</span>
                        </label>
                        <input
                          placeholder="Full Name"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          type="text"
                          required
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">
                          Relationship <span className="text-danger">*</span>
                        </label>
                        <input
                          placeholder="Relationship"
                          name="relationName"
                          value={formData.relationName}
                          onChange={handleInputChange}
                          type="text"
                          required
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">
                          Age <span className="text-danger">*</span>
                        </label>
                        <input
                          placeholder="Age"
                          required
                          name="age"
                          value={formData.age}
                          min={0}
                          onChange={handleInputChange}
                          type="number"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">
                          Date of Birth <span className="text-danger">*</span>
                        </label>
                        <input
                          required
                          name="dob"
                          value={formData.dob}
                          onChange={handleInputChange}
                          type="date"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">
                          Phone <span className="text-danger">*</span>
                        </label>
                        <input
                          placeholder="Phone"
                          name="phone"
                          value={formData.phone}
                          required
                          onChange={handleInputChange}
                          type="tel"
                          pattern="[0-9]{10}"
                          maxLength={10}
                          minLength={10}
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">
                          Email <span className="text-danger">*</span>
                        </label>
                        <input
                          placeholder="Email"
                          required
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          type="email"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label className="form-label">
                          Gender <span className="text-danger">*</span>
                        </label>
                        <div className="radio-group">
                          <label className={`radio-label ${formData.gender === 'Male' ? 'active' : ''}`}>
                            <input
                              type="radio"
                              name="gender"
                              value="Male"
                              checked={formData.gender === "Male"}
                              onChange={handleInputChange}
                            />
                            Male
                          </label>
                          <label className={`radio-label ${formData.gender === 'Female' ? 'active' : ''}`}>
                            <input
                              type="radio"
                              name="gender"
                              value="Female"
                              checked={formData.gender === "Female"}
                              onChange={handleInputChange}
                            />
                            Female
                          </label>
                          <label className={`radio-label ${formData.gender === 'Others' ? 'active' : ''}`}>
                            <input
                              type="radio"
                              name="gender"
                              value="Others"
                              checked={formData.gender === "Others"}
                              onChange={handleInputChange}
                            />
                            Others
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <div className="modal-btn text-end">
                  <button
                    type="button"
                    className="btn btn-md btn-outline-secondary rounded-pill"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-md btn-primary rounded-pill"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Adding...' : 'Add Member'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Descriptions;

// Add these styles to your CSS file
/*
.upload-area {
  border: 2px dashed #ccc;
  padding: 20px;
  text-align: center;
  border-radius: 10px;
  background: #f9f9f9;
  position: relative;
  cursor: pointer;
}

.file-input {
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  cursor: pointer;
}

.add-more, .browse-files {
  color: #007bff;
  cursor: pointer;
  font-weight: bold;
}

.upload-text {
  margin: 15px 0;
  font-weight: bold;
}

.file-preview-container {
  margin-top: 20px;
}

.preview-title {
  margin-bottom: 15px;
}

.file-preview-item {
  position: relative;
  display: flex;
  flex-direction: column;
  background: #f1f1f1;
  padding: 10px;
  border-radius: 5px;
}

.delete-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 2;
  cursor: pointer;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 0 5px rgba(0,0,0,0.2);
  padding: 4px;
}

.preview-image {
  width: 100%;
  max-height: 230px;
  object-fit: cover;
  border-radius: 5px;
}

.member-selection-container {
  padding: 20px;
}

.member-list {
  margin-top: 20px;
}

.member-item {
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.member-item:hover {
  background-color: #f8f9fa;
}

.member-item.selected {
  background-color: #e7f5ff;
  border-color: #4dabf7;
}

.member-info h5 {
  margin-bottom: 5px;
}

.member-details {
  display: flex;
  gap: 15px;
  color: #666;
}

.success-container {
  max-width: 600px;
  margin: 40px auto;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0,0,0,0.1);
  text-align: center;
}

.success-message {
  margin-bottom: 30px;
}

.help-section {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.call-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 8px 15px;
  border: 1px solid #ddd;
  border-radius: 20px;
  color: #333;
  text-decoration: none;
  transition: all 0.3s ease;
}

.call-btn:hover {
  background-color: #f8f9fa;
}

.radio-group {
  display: flex;
  gap: 10px;
}

.radio-label {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
}

.radio-label.active {
  background-color: #e7f5ff;
  border-color: #4dabf7;
}

.radio-label input {
  display: none;
}
*/