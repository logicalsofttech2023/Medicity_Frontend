import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage';
import ProfileSidebar from './ProfileSidebar';

const Vitals = () => {
  const [UserData, setUserData] = useState();
useEffect(()=>{
  GetUser()
},[0])
const GetUser = async () => {
  
  const data ={
    userId:secureLocalStorage.getItem("medicityuser")
  }

    axios.post(`${process.env.REACT_APP_API_KEY}getUser`,data
      
    ).then((res)=>{
     setUserData(res.data.data)
    
     
    
    }).catch((error)=>{

    })
};
  return (
    <div>
    <div className="breadcrumb-bar">
      <div className="container">
        <div className="row align-items-center inner-banner">
          <div className="col-md-12 col-12 text-center">
            <nav aria-label="breadcrumb" className="page-breadcrumb">
              <ol style={{justifyContent:'start'}} className="breadcrumb">
                <li className="breadcrumb-item"><a href="/"><i className="isax isax-home-15" /></a></li>
                <li className="breadcrumb-item" aria-current="page">Patient</li>
                <li className="breadcrumb-item active">Vitals</li>
              </ol>
              <h2 style={{textAlign:'justify'}} className="breadcrumb-title">Vitals</h2>
            </nav>
          </div>
        </div>
      </div>
      <div className="breadcrumb-bg">
        <img src="assets/img/bg/breadcrumb-bg-01.png" alt="img" className="breadcrumb-bg-01" />
        <img src="assets/img/bg/breadcrumb-bg-02.png" alt="img" className="breadcrumb-bg-02" />
        <img src="assets/img/bg/breadcrumb-icon.png" alt="img" className="breadcrumb-bg-03" />
        <img src="assets/img/bg/breadcrumb-icon.png" alt="img" className="breadcrumb-bg-04" />
      </div>
    </div>
    {/* /Breadcrumb */}
    {/* Page Content */}
    <div className="content">
      <div className="container">
        <div className="row">
          {/* Profile Sidebar */}
          <div className="col-lg-5 col-xl-4">
            {/* Profile Sidebar */}
           <ProfileSidebar />
            {/* /Profile Sidebar */}
          </div>
          {/* / Profile Sidebar */}
          <div className="col-lg-7 col-xl-8">
            <div className="dashboard-header">
              <h3>Vitals</h3>
            </div>		
            <div className="dashboard-card w-100 medical-details-item">
              <div className="dashboard-card-head medical-detail-head">
                <div className="header-title">
                  <h6>Latest Updated Vitals</h6>
                </div>
                <div className="latest-update">
                  <p><i className="isax isax-calendar-tick5 me-2" />Last update on : 24Mar 2023</p>
                </div>
              </div>
              <div className="dashboard-card-body">
                <div className="row row-gap-3">
                  <div className="col-xl-2 col-lg-4 col-md-6">
                    <div className="health-records icon-red mb-0">
                      <span><i className="fa-solid fa-syringe" />Blood Pressure</span>
                      <h3>100 mg/dl</h3>
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-4 col-md-6">
                    <div className="health-records icon-orange mb-0">
                      <span><i className="fa-solid fa-heart" />Heart Rate</span>
                      <h3>140 Bpm</h3>
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-4 col-md-6">
                    <div className="health-records icon-dark-blue mb-0">
                      <span><i className="fa-solid fa-notes-medical" />Glucose Level</span>
                      <h3>70 - 90</h3>
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-4 col-md-6">
                    <div className="health-records icon-amber mb-0">
                      <span><i className="fa-solid fa-temperature-high" />Body Temprature</span>
                      <h3>37.5 C</h3>
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-4 col-md-6">
                    <div className="health-records icon-purple mb-0">
                      <span><i className="fa-solid fa-user-pen" />BMI </span>
                      <h3>20.1 kg/m2</h3>
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-4 col-md-6">
                    <div className="health-records icon-blue mb-0">
                      <span><i className="fa-solid fa-highlighter" />SPo2</span>
                      <h3>96%</h3>
                    </div>
                  </div>																		
                </div>
              </div>
            </div>	
            <div className="dashboard-header border-0 m-0">
              <ul className="header-list-btns">
                <li>
                  <div className="input-block dash-search-input">
                    <input type="text" className="form-control" placeholder="Search" />
                    <span className="search-icon"><i className="isax isax-search-normal" /></span>
                  </div>
                </li>
              </ul>
              <a href="#add-med-record" className="btn btn-md btn-primary-gradient rounded-pill" data-bs-toggle="modal">Add Vitals</a>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="custom-table">
                  <div className="table-responsive">
                    <table className="table table-center mb-0">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Patient Name</th>
                          <th>BMI</th>
                          <th>Heart Rate</th>
                          <th>FBC Status</th>
                          <th>Weight</th>
                          <th>Added on</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><a className="link-primary"  data-bs-toggle="modal" data-bs-target="#med-detail">#MD1236</a></td>
                          <td>
                            <h2 className="table-avatar">
                              <a href="patient-profile.html" className="avatar avatar-sm me-2">
                                <img className="avatar-img rounded-3" src="assets/img/doctors-dashboard/profile-06.jpg" alt="User Image" />
                              </a>
                              <a href="doctor-profile.html">Hendrita Kearns</a>
                            </h2>
                          </td>
                          <td>23.5</td>
                          <td>89</td>
                          <td>140</td>
                          <td>74Kg</td>
                          <td>22 Mar 2024</td>
                          <td>
                            <div className="action-item">
                              <a  data-bs-toggle="modal" data-bs-target="#med-detail">
                                <i className="isax isax-link-2" />
                              </a>
                              <a  data-bs-toggle="modal" data-bs-target="#edit-med-record">
                                <i className="isax isax-edit-2" />
                              </a>
                              <a  data-bs-toggle="modal" data-bs-target="#delete_modal">
                                <i className="isax isax-trash" />
                              </a>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>		
          </div>
        </div>
      </div>
    </div>
  
  <div className="modal fade custom-modals" id="add-med-record">
    <div className="modal-dialog modal-dialog-centered modal-md">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Add Vitals</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
            <i className="fa-solid fa-xmark" />
          </button>
        </div>
        <form action="https://doccure.dreamstechnologies.com/html/template/medical-details.html">
          <div className="modal-body pb-0">
            <div className="timing-modal">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">BMI <span className="text-danger">*</span></label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Heart Rate <span className="text-danger">*</span></label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Weight <span className="text-danger">*</span></label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">FBC <span className="text-danger">*</span></label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="mb-3">
                    <label className="col-form-label">Date <span className="text-danger">*</span></label>
                    <div className="form-icon">
                      <input type="text" className="form-control datetimepicker" placeholder="dd/mm/yyyy" />
                      <span className="icon"><i className="isax isax-calendar-1" /></span>
                    </div>
                  </div>	
                </div>
              </div>	
            </div>
          </div>
          <div className="modal-footer">	
            <div className="modal-btn text-end">
              <a href="#" className="btn btn-md btn-dark rounded-pill"  data-bs-dismiss="modal">Cancel</a>
              <button type="button" className="btn btn-md btn-primary-gradient rounded-pill" data-bs-dismiss="modal">Add Details</button>
            </div>			
          </div>
        </form>
      </div>
    </div>
  </div>
  {/* /Add Medical Detail */}
  {/* Edit Medical Detail */}
  <div className="modal fade custom-modals" id="edit-med-record">
    <div className="modal-dialog modal-dialog-centered modal-md">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Edit Medical Details</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
            <i className="fa-solid fa-xmark" />
          </button>
        </div>
        <form action="https://doccure.dreamstechnologies.com/html/template/medical-details.html">
          <div className="modal-body">
            <div className="timing-modal">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">BMI <span className="text-danger">*</span></label>
                    <input type="text" className="form-control" defaultValue="20.1 kg/m2" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Heart Rate <span className="text-danger">*</span></label>
                    <input type="text" className="form-control" defaultValue="140 Bpm" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Weight <span className="text-danger">*</span></label>
                    <input type="text" className="form-control" defaultValue={300} />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">FBC <span className="text-danger">*</span></label>
                    <input type="text" className="form-control" defaultValue="70 - 90" />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="mb-3">
                    <label className="col-form-label">Date <span className="text-danger">*</span></label>
                    <div className="form-icon">
                      <input type="text" className="form-control datetimepicker" defaultValue="23/12/2024" />
                      <span className="icon"><i className="isax isax-calendar-1" /></span>
                    </div>
                  </div>	
                </div>
              </div>	
            </div>
          </div>
          <div className="modal-footer">		
            <div className="modal-btn text-end">
              <a href="#" className="btn btn-md btn-dark rounded-pill" data-bs-dismiss="modal">Cancel</a>
              <button type="button" className="btn btn-md btn-primary-gradient rounded-pill" data-bs-dismiss="modal">Save Details</button>
            </div>			
          </div>
        </form>
      </div>
    </div>
  </div>
  {/* /Edit Medical Detail */}
  {/* Medical Detail */}
  <div className="modal fade custom-modals" id="med-detail">
    <div className="modal-dialog modal-dialog-centered modal-md">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Vital Details</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
            <i className="fa-solid fa-xmark" />
          </button>
        </div>
        <form action="https://doccure.dreamstechnologies.com/html/template/medical-details.html">
          <div className="modal-body pb-0">
            <div className="med-detail-patient">
              <div className="med-patient">
                <span><img src="assets/img/doctors-dashboard/profile-06.jpg" alt="Img" /></span>
                <div className="name-detail">
                  <h5>Hendrita Kearns</h5>
                  <ul>
                    <li>Age : 42 </li>
                    <li>Female</li>
                    <li>AB+ve</li>
                  </ul>
                </div>
              </div>
              <div className="date-cal">
                <p><span><i className="isax isax-calendar-tick5 me-1" />Last Updated</span>24 Mar 2024</p>
              </div>
            </div>
            <div className="med-detail-item pb-3">
              <div className="row">
                <div className="col-md-6 col-lg-4">
                  <div className="health-records icon-red">
                    <span><i className="fa-solid fa-syringe" />Blood Pressure</span>
                    <h3>100 mg/dl</h3>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4">
                  <div className="health-records icon-orange">
                    <span><i className="fa-solid fa-heart" />Heart Rate</span>
                    <h3>140 Bpm</h3>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4">
                  <div className="health-records icon-dark-blue">
                    <span><i className="fa-solid fa-notes-medical" />Glucose Level</span>
                    <h3>70 - 90</h3>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4">
                  <div className="health-records icon-amber mb-0">
                    <span><i className="fa-solid fa-temperature-high" />Body Temprature</span>
                    <h3>37.5 C</h3>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4">
                  <div className="health-records icon-purple mb-0">
                    <span><i className="fa-solid fa-user-pen" />BMI </span>
                    <h3>20 kg/m2</h3>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4">
                  <div className="health-records icon-blue mb-0">
                    <span><i className="fa-solid fa-highlighter" />SPo2</span>
                    <h3>96%</h3>
                  </div>
                </div>
              </div>																
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  {/* /Medical Detail */}		
  {/* Delete */}
  <div className="modal fade custom-modals" id="delete_modal">
    <div className="modal-dialog modal-dialog-centered" role="document">
      <div className="modal-content">
        <div className="modal-body p-4 text-center">
          <form action="https://doccure.dreamstechnologies.com/html/template/medical-details.html">
            <span className="del-icon mb-2 mx-auto">
              <i className="isax isax-trash" />
            </span>
            <h3 className="mb-2">Delete Vital</h3>
            <p className="mb-3">Are you sure you want to delete this vital?</p>
            <div className="d-flex justify-content-center flex-wrap gap-3">
              <a href="#" className="btn btn-md btn-dark rounded-pill" data-bs-dismiss="modal">Cancel</a>
              <button type="button" className="btn btn-md btn-primary-gradient rounded-pill" data-bs-dismiss="modal">Yes Delete</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}

export default Vitals
