import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage';
import ProfileSidebar from './ProfileSidebar';

const Wallet = () => {
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
                <li className="breadcrumb-item active">Wallet</li>
              </ol>
              <h2 style={{textAlign:'justify'}} className="breadcrumb-title">Wallet</h2>
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
          <div className="col-lg-5 col-xl-4 ">
            {/* Profile Sidebar */}
            <ProfileSidebar />
            {/* /Profile Sidebar */}
          </div>
          {/* / Profile Sidebar */}
          <div className="col-lg-7 col-xl-8">
            <div className="accunts-sec">
              <div className="dashboard-header">
                <div className="header-back">									
                  <h3>Wallet</h3>
                </div>
              </div>
              <div className="account-details-box">
                <div className="row">
                  <div className="col-xxl-7 col-lg-7">
                    <div className="account-payment-info">
                      <div className="row">
                        <div className="col-lg-6 col-md-6">
                          <div className="payment-amount">
                            <h6><i className="isa isax-wallet-25 text-warning" />Total Balance</h6>
                            <span>$1200</span>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="payment-amount">
                            <h6><i className="isax isax-document5 text-success" />Total Transaction</h6>
                            <span>$2300</span>
                          </div>
                        </div>
                      </div>
                      <div className="payment-request">
                        <span>Last Payment request : 24 Mar 2023</span>
                        <a href="#payment_request" className="btn btn-md btn-primary-gradient rounded-pill" data-bs-toggle="modal">Add Payment</a>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-5 col-lg-5">
                    <div className="bank-details-info">
                      <h3>Bank Details</h3>
                      <ul>
                        <li>
                          <h6>Bank Name</h6>
                          <h5>Citi Bank Inc</h5>
                        </li>
                        <li>
                          <h6>Account Number</h6>
                          <h5>5396 5250 1908 XXXX</h5>
                        </li>
                        <li>
                          <h6>Branch Name</h6>
                          <h5>London</h5>
                        </li>
                        <li>
                          <h6>Account Name</h6>
                          <h5>Darren</h5>
                        </li>
                      </ul>
                      <div className="edit-detail-link d-flex align-items-center justify-content-between w-100">
                        <div>
                          <a href="#edit_card" data-bs-toggle="modal">Edit Details</a>
                          <a href="#add_card" data-bs-toggle="modal">Add Cards</a>
                        </div>
                        <a href="#other_accounts" data-bs-toggle="modal">Other Accounts</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <div className="account-detail-table">
                  <div className="custom-new-table">
                    <div className="table-responsive">
                      <table className="table table-center mb-0">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Account No</th>
                            <th>Reason</th>
                            <th>Debited / Credited On</th>
                            <th>Amount</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <a href="javascript:void(0);" className="link-primary">#AC1234</a>
                            </td>
                            <td className="text-gray-9">5396 5250 1908 XXXX</td>
                            <td>Appointment</td>
                            <td>26 Mar 2024</td>
                            <td>$300</td>
                            <td>
                              <span className="badge badge-success-transparent inline-flex align-items-center"><i className="fa-solid fa-circle me-1 fs-5" />Completed</span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <a href="javascript:void(0);" className="link-primary">#AC3656</a>
                            </td>
                            <td className="text-gray-9">6372 4902 4902 XXXX</td>
                            <td>Appointment</td>
                            <td>28 Mar 2024</td>
                            <td>$480</td>
                            <td>
                              <span className="badge badge-success-transparent inline-flex align-items-center"><i className="fa-solid fa-circle me-1 fs-5" />Completed</span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <a href="javascript:void(0);" className="link-primary">#AC1246</a>
                            </td>
                            <td className="text-gray-9">4892 0204 4924 XXXX</td>
                            <td>Appointment</td>
                            <td>11 Apr 2024</td>
                            <td>$250</td>
                            <td>
                              <span className="badge badge-success-transparent inline-flex align-items-center"><i className="fa-solid fa-circle me-1 fs-5" />Completed</span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <a href="javascript:void(0);" className="link-primary">#AC6985</a>
                            </td>
                            <td className="text-gray-9">5730 4892 0492 XXXX</td>
                            <td>Refund</td>
                            <td>18 Apr 2024</td>
                            <td>$220</td>
                            <td>
                              <span className="badge badge-warning-transparent inline-flex align-items-center"><i className="fa-solid fa-circle me-1 fs-5" />Pending</span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <a href="javascript:void(0);" className="link-primary">#AC3659</a>
                            </td>
                            <td className="text-gray-9">7922 9024 5824 XXXX</td>
                            <td>Appointment</td>
                            <td>29 Apr 2024</td>
                            <td>$350</td>
                            <td>
                              <span className="badge badge-success-transparent inline-flex align-items-center"><i className="fa-solid fa-circle me-1 fs-5" />Completed</span>
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
    </div>




    
  <div className="modal fade custom-modals" id="payment_request">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Add Payment</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
            <i className="fa-solid fa-xmark" />
          </button>
        </div>
        <form action="https://doccure.dreamstechnologies.com/html/template/patient-accounts.html">
          <div className="modal-body pb-0">
            <div className="mb-3">
              <label className="form-label">Enter Amount <span className="text-danger">*</span></label>
              <input type="text" className="form-control" />
            </div>	
            <div className="mb-3">
              <label className="form-label ">Select Payment Gateway <span className="text-danger">*</span></label>
              <select className="select form-control">
                <option>Select</option>
                <option>Card</option>
                <option>Paypal</option>
              </select>
            </div>			
          </div>
          <div className="modal-footer">					
            <div className="modal-btn text-end">
            <button type="button" class=" btn btn-md btn-dark rounded-pill" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
                           
              <button type="button" className="btn btn-md btn-primary-gradient rounded-pill" data-bs-dismiss="modal" aria-label="Clos">Add to Wallet</button>
            </div>
          </div>
        </form>		
      </div>
    </div>
  </div>
  {/* /Payment Moodal */}
  {/* Account Details Modal*/}
  <div className="modal fade custom-modals" id="add_card">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Add Card</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
            <i className="fa-solid fa-xmark" />
          </button>
        </div>
        <form action="https://doccure.dreamstechnologies.com/html/template/patient-accounts.html">
          <div className="modal-body pb-0">
            <div className="mb-3">
              <label className="form-label">Card Holder Name <span className="text-danger">*</span></label>
              <input type="text" className="form-control" />
            </div>	
            <div className="mb-3">
              <label className="form-label">Card Number <span className="text-danger">*</span></label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Expire Date <span className="text-danger">*</span></label>
              <div className="form-icon">
                <input type="text" className="form-control datetimepicker" />
                <span className="icon"><i className="isax isax-calendar-1" /></span>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">CVV <span className="text-danger">*</span></label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Branch <span className="text-danger">*</span></label>
              <select className="select form-control">
                <option>Select</option>
                <option>London</option>
                <option>Newyork</option>
              </select>
            </div>				
          </div>
          <div className="modal-footer">				
            <div className="modal-btn d-flex align-items-center justify-content-between flex-wrap gap-3 w-100">
              <div className="form-check d-flex">
                <input className="form-check-input" type="checkbox" id="mark" />
                <label className="form-check-label fs-14 ms-2" htmlFor="mark">
                  Mark as Default
                </label>
              </div>
              <div>
                <a href="#" className="btn btn-md btn-dark rounded-pill" data-bs-dismiss="modal" aria-label="Close">Cancel</a>
                <button type="button" className="btn btn-md btn-primary-gradient rounded-pill" data-bs-dismiss="modal" aria-label="Close">Add Card</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  {/* /Account Details Modal*/}
  {/* Account Details Modal*/}
  <div className="modal fade custom-modals" id="edit_card">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Edit Card</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
            <i className="fa-solid fa-xmark" />
          </button>
        </div>
        <form action="https://doccure.dreamstechnologies.com/html/template/patient-accounts.html">
          <div className="modal-body pb-0">
            <div className="mb-3">
              <label className="form-label">Card Holder Name <span className="text-danger">*</span></label>
              <input type="text" className="form-control" defaultValue="Darren" />
            </div>	
            <div className="mb-3">
              <label className="form-label">Card Number <span className="text-danger">*</span></label>
              <input type="text" className="form-control" defaultValue="5396 5250 1908 1647" />
            </div>
            <div className="mb-3">
              <label className="form-label">Expire Date <span className="text-danger">*</span></label>
              <div className="form-icon">
                <input type="text" className="form-control datetimepicker" defaultValue="15-04-2026" />
                <span className="icon"><i className="isax isax-calendar-1" /></span>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">CVV <span className="text-danger">*</span></label>
              <input type="text" className="form-control" defaultValue={556} />
            </div>
            <div className="mb-3">
              <label className="form-label">Branch <span className="text-danger">*</span></label>
              <select className="select form-control">
                <option>Select</option>
                <option selected>London</option>
                <option>Newyork</option>
              </select>
            </div>				
          </div>
          <div className="modal-footer">					
            <div className="modal-btn d-flex align-items-center justify-content-between flex-wrap gap-3 w-100">
              <div className="form-check d-flex">
                <input className="form-check-input" type="checkbox" id="mark1" defaultChecked />
                <label className="form-check-label fs-14 ms-2" htmlFor="mark1">
                  Mark as Default
                </label>
              </div>
              <div>
                <button type="button" className="btn btn-md btn-dark rounded-pill" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
                <button type="button" data-bs-dismiss="modal" className="btn btn-md btn-primary-gradient rounded-pill">Save Changes</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  {/* /Account Details Modal*/}
  {/* Other Accounts Modal*/}
  <div className="modal fade custom-modals modal-lg" id="other_accounts">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Other Accounts</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
            <i className="fa-solid fa-xmark" />
          </button>
        </div>
        <div className="modal-body">
          <div className="other-accounts-info">
            <ul>
              <li>
                <ul className="other-bank-info">
                  <li>
                    <h6>Name</h6>
                    <span>Citi Bank Inc</span>
                  </li>
                  <li>
                    <h6>Account No</h6>
                    <span>5396 5250 1908 XXXX</span>
                  </li>
                  <li>
                    <h6>Branch</h6>
                    <span>London</span>
                  </li>
                  <li>
                    <h6>Name on Bank Account</h6>
                    <span>Edalin Hendry</span>
                  </li>
                  <li>
                    <a href="#">Current</a>
                  </li>
                </ul>
              </li>
              <li>
                <ul className="other-bank-info">
                  <li>
                    <h6>Name</h6>
                    <span>HDFC Bank Inc</span>
                  </li>
                  <li>
                    <h6>Account No</h6>
                    <span>7382 4924 4924 XXXX</span>
                  </li>
                  <li>
                    <h6>Branch</h6>
                    <span>New York</span>
                  </li>
                  <li>
                    <h6>Name on Bank Account</h6>
                    <span>Edalin Hendry</span>
                  </li>
                  <li>
                    <a href="#">Change to default</a>
                  </li>
                </ul>
              </li>
              <li>
                <ul className="other-bank-info">
                  <li>
                    <h6>Name</h6>
                    <span>Union Bank Inc</span>
                  </li>
                  <li>
                    <h6>Account No</h6>
                    <span>8934 4902 9024 XXXX</span>
                  </li>
                  <li>
                    <h6>Branch</h6>
                    <span>Chicago</span>
                  </li>
                  <li>
                    <h6>Name on Bank Account</h6>
                    <span>Edalin Hendry</span>
                  </li>
                  <li>
                    <a href="#">Change to default</a>
                  </li>
                </ul>
              </li>
              <li>
                <ul className="other-bank-info">
                  <li>
                    <h6>Name</h6>
                    <span>KVB Bank Inc</span>
                  </li>
                  <li>
                    <h6>Account No</h6>
                    <span>5892 4920 4829 XXXX</span>
                  </li>
                  <li>
                    <h6>Branch</h6>
                    <span>Austin</span>
                  </li>
                  <li>
                    <h6>Name on Bank Account</h6>
                    <span>Edalin Hendry</span>
                  </li>
                  <li>
                    <a href="#">Change to default</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div className="modal-footer">					
          <div className="modal-btn text-end">
            <button type="submit" className="btn btn-md btn-primary-gradient rounded-pill" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* /Other Accounts Modal*/}
  {/* Request Completed Modal*/}
  <div className="modal fade custom-modal custom-modal-two" id="request_details_modal">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Request Details <span className="badge badge-success-bg">Completed</span></h5>
          <button type="button" data-bs-dismiss="modal" aria-label="Close">
            <span><i className="fa-solid fa-x" /></span>
          </button>
        </div>
        <div className="modal-body">
          <div className="completed-request">
            <ul>
              <li>
                <h6>ID</h6>
                <span>#AC-1234</span>
              </li>
              <li>
                <h6>Requested on</h6>
                <span>24 Mar 2024</span>
              </li>
              <li>
                <h6>Credited Date</h6>
                <span>24 Mar 2024</span>
              </li>
              <li>
                <h6>Amount</h6>
                <span className="link-primary">$300</span>
              </li>
            </ul>
            <div className="bank-detail">
              <h4>Bank Details</h4>
              <div className="accont-information">
                <h6>Name</h6>
                <span>Citi Bank Inc</span>
              </div>
              <div className="accont-information">
                <h6>Account No</h6>
                <span>5396 5250 1908 XXXX</span>
              </div>
              <div className="accont-information">
                <h6>Branch</h6>
                <span>London</span>
              </div>
            </div>
            <div className="request-des">
              <h4>Reqeust Description</h4>
              <p>I recently completed a series of dental treatments with Dr.Edalin Hendry, 
                and I couldn't be more pleased with the results. From my very first appointment.
              </p>
            </div>
            <a href="#" className="btn btn-primary prime-btn w-100" data-bs-dismiss="modal">Close</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* /Request Completed Modal*/}
  {/* Request Cancel Modal*/}
  <div className="modal fade custom-modal custom-modal-two" id="request_cancel_modal">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Request Details <span className="badge badge-danger-bg">Cancelled</span></h5>
          <button type="button" data-bs-dismiss="modal" aria-label="Close">
            <span><i className="fa-solid fa-x" /></span>
          </button>
        </div>
        <div className="modal-body">
          <div className="cancelled-request">
            <div className="canceled-user-info d-flex align-items-center">
              <div className="patinet-information">
                <a href="doctor-upcoming-appointment.html">
                  <img src="assets/img/doctors-dashboard/profile-01.jpg" alt="User Image" />
                </a>
                <div className="patient-info">
                  <p>#Apt0001</p>
                  <h6><a href="doctor-upcoming-appointment.html">Adrian</a></h6>
                </div>
              </div>
              <div className="email-info">
                <ul>
                  <li><i className="isax isax-sms5" /><a className="__cf_email__" data-cfemail="89e8edfbe8e7c9ecf1e8e4f9e5eca7eae6e4">[email&nbsp;protected]</a></li>
                  <li><i className="isax isax-call5" />+1 504 368 6874</li>
                </ul>
              </div>
            </div>
            <div className="cancellation-fees">
              <h6>Consultation Fees : $200</h6>
              <div className="cancellation-info">
                <div className="appointment-type">
                  <p className="md-text">Type of Appointment</p>
                  <p><i className="fa-solid fa-building text-green" />Direct Visit</p>
                </div>
                <div className="appointment-type">
                  <p className="md-text">Clinic Location</p>
                  <p>Adrian’s Dentistry</p>
                </div>
              </div>
            </div>
            <div className="cancel-reason">
              <h5>Reason</h5>
              <p>I have an urgent surgery, while our Appointment so i am rejecting appointment </p>
              <span className="text-danger">Cancelled By You on 23 Mar 2024</span>
            </div>
            <div className="refund-status">
              <span className="link-primary refund">Status :  Initiated</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* /Request Cancel Modal*/}
  {/* Refund Request Modal*/}
  <div className="modal fade info-modal" id="refund-request">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-body">
          <div className="success-wrap text-center">
            <span className="icon-success"><i className="fa-solid fa-calendar-check" /></span>
            <h3>Refund initiated Successfully</h3>
            <p>Your Payment will be credited in your bank account in 3 working days</p>
            <a href="#" className="btn btn-primary prime-btn" data-bs-dismiss="modal">Okay</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}

export default Wallet
