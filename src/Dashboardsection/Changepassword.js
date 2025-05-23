import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage';

const Changepassword = () => {
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
              <li className="breadcrumb-item active">Settings</li>
            </ol>
            <h2 style={{textAlign:'justify'}} className="breadcrumb-title">Change Password</h2>
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
  <div className="content doctor-content">
    <div className="container">
      <div className="row">
        <div className="col-lg-5 col-xl-4 ">
          {/* Profile Sidebar */}
          <div className="profile-sidebar patient-sidebar profile-sidebar-new">
          <div className="widget-profile pro-widget-content">
                         <div className="profile-info-widget">
                           <Link to="/Settings" className="booking-doc-img">
                           {UserData?.userProfile ? 
                           <img src={`${process.env.REACT_APP_IMG_URL}${UserData?.userProfile}`} />
                            : 
                             <img src="assets/img/doctors-dashboard/profile-06.jpg" alt="User Image" />
                           }
                             </Link>
                           <div className="profile-det-info">
                             <h3><Link to="/Settings">{UserData?.name ? UserData?.name : "Guest"}</Link></h3>
                             <div className="patient-details">
                               <h5 className="mb-0">Patient ID : PT254654</h5>
                             </div>
                             <span>{UserData?.gender ? UserData?.gender : "Not Found"}<i className="fa-solid fa-circle" /> {UserData?.dob ? UserData?.dob : "Not Found"}</span>
                           </div>
                         </div>
                       </div>
            <div className="dashboard-widget">
              <nav className="dashboard-menu">
                <ul>
                                               <li>
                                                 <Link to="/Dashboard">
                                                   <i className="isax isax-category-2" />
                                                   <span>Dashboard</span>
                                                 </Link>
                                               </li>
                                               <li>
                                                 <Link to="/Bookingappoinment">
                                                   <i className="isax isax-calendar-1" />
                                                   <span>Booking </span>
                                                 </Link>
                                               </li>
                                               <li>
                                                 <Link to="/Reports">
                                                   <i className="isax isax-star-1" />
                                                   <span>Reports</span>
                                                 </Link>
                                               </li>
                                               <li>
                                                 <Link to="/Familymember">
                                                   <i className="isax isax-user-octagon" />
                                                   <span>Family Members</span>
                                                 </Link>
                                               </li>
                                               <li>
                                                 <Link to="/Prescription">
                                                   <i className="isax isax-note-21" />
                                                   <span>Prescription</span>
                                                 </Link>
                                               </li>
                                               <li>
                                                 <Link to="/Wallet">
                                                   <i className="isax isax-wallet-2" />
                                                   <span>Wallet</span>
                                                 </Link>
                                               </li>
                                               <li>
                                                 <Link to="/Invoices">
                                                   <i className="isax isax-document-text" />
                                                   <span>Invoices</span>
                                                 </Link>
                                               </li>																																				
                                               <li>
                                                 <Link to="/Message">
                                                   <i className="isax isax-messages-1" />
                                                   <span>Message</span>
                                                   <small className="unread-msg">7</small>
                                                 </Link>
                                               </li>
                                               <li>
                                                 <Link to="/Vitals">
                                                   <i className="isax isax-note-1" />
                                                   <span>Vitals</span>
                                                 </Link>
                                               </li>
                                               <li className="active">
                                                 <Link to="/Settings">
                                                   <i className="isax isax-setting-2" />
                                                   <span>Settings</span>
                                                 </Link>
                                               </li>
                                               <li>
                                                 <Link to="/Login">
                                                   <i className="isax isax-logout" />
                                                   <span>Logout</span>
                                                 </Link>
                                               </li>
                                             </ul>
              </nav>
            </div>
          </div>
          {/* /Profile Sidebar */}
        </div>
        {/* Change Password */}
        <div className="col-lg-7 col-xl-8">
          <nav className="settings-tab mb-1">
          <ul className="nav nav-tabs-bottom" role="tablist">
              <li className="nav-item" role="presentation">
                <Link className="nav-link" to="/Settings">Profile</Link>
              </li>
              <li className="nav-item" role="presentation">
                <Link className="nav-link active" to="/Changepassword">Change Password</Link>
              </li>
              {/* <li className="nav-item" role="presentation">
                <a className="nav-link" href="two-factor-authentication.html">2 Factor Authentication</a>
              </li> */}
              <li className="nav-item" role="presentation">
                <Link className="nav-link" to="/Deleteaccount">Delete Account</Link>
              </li>
            </ul>
          </nav>
          <div className="card">
            <div className="card-body">
              <div className="border-bottom pb-3 mb-3">
                <h5>Change Password</h5>
              </div>
              <form action="https://doccure.dreamstechnologies.com/html/template/change-password.html">
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Current Password <span className="text-danger">*</span></label>
                      <div className="pass-group">
                        <input type="password" className="form-control pass-input-sub" />
                        <span className="feather-eye-off toggle-password-sub" />
                      </div>									
                    </div>
                    <div className="mb-3">
                      <label className="form-label">New Password <span className="text-danger">*</span></label>
                      <div className="pass-group">
                        <input type="password" className="form-control pass-input" />
                        <span className="feather-eye-off toggle-password" />
                      </div>									
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Confirm Password <span className="text-danger">*</span></label>
                      <div className="pass-group">
                        <input type="password" className="form-control pass-input-sub" />
                        <span className="feather-eye-off toggle-password-sub" />
                      </div>									
                    </div>
                  </div>
                </div>
                <div className="modal-btn border-top pt-3 text-end">
                  <a href="#" className="btn btn-md btn-light rounded-pill">Cancel</a>
                  <a href="#" className="btn btn-md btn-primary-gradient rounded-pill">Save Changes</a>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* /Change Password */}
      </div>
    </div>
  </div>
</div>
  )
}

export default Changepassword
