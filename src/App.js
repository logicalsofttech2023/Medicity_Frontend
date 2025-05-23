import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Form,
} from "react-router-dom";
import Footer from "./Footer/Footer";
import Mainheader from "./Headersection/Mainheader";
import Home from "./Components/Home";
import Login from "./Mainauth/Login";
import Register from "./Mainauth/Register";
import Forgotpassword from "./Mainauth/Forgotpassword";
import Doctorscurateddetails from "./Components/Doctorscurateddetails";
import Healthcheckuppackagedetails from "./Components/Healthcheckuppackagedetails";
import Checkout from "./Components/Checkout";
import Findtestbycategory from "./Components/Findtestbycategory";
import Healthmenwomen from "./Components/Healthmenwomen";
import Error from "./Components/Error";
import Dashboard from "./Dashboardsection/Dashboard";
import Bookingappoinment from "./Dashboardsection/Bookingappoinment";
import Familymember from "./Dashboardsection/Familymember";
import Prescription from "./Dashboardsection/Prescription";
import Settings from "./Dashboardsection/Settings";
import Changepassword from "./Dashboardsection/Changepassword";
import Deleteaccount from "./Dashboardsection/Deleteaccount";
import Invoices from "./Dashboardsection/Invoices";
import Message from "./Dashboardsection/Message";
import Reports from "./Dashboardsection/Reports";
import Wallet from "./Dashboardsection/Wallet";
import Vitals from "./Dashboardsection/Vitals";
import Bookingdetails from "./Dashboardsection/Bookingdetails";
import Bookingcancel from "./Dashboardsection/Bookingcancel";
import Bookingcomplete from "./Dashboardsection/Bookingcomplete";
import Bookingform from "./Dashboardsection/Bookingform";
import Descriptions from "./Dashboardsection/Descriptions";
import Bloglist from "./Components/Bloglist";
import Blogdetails from "./Components/Blogdetails";
import Protect from "./Components/Protect";
import Booking from "./Components/Booking";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import secureLocalStorage from "react-secure-storage";
import PrivacyPolicy from "./Components/PrivacyPolicy";
import RefundPolicy from "./Components/RefundPolicy";
import LegalNotice from "./Components/LegalNotice";
import AboutUs from "./Components/AboutUs";
import ContactUs from "./Components/ContactUs";
import Faqs from "./Components/Faqs";
import Membership from "./Components/Membership";

function Layout() {
  const location = useLocation();

  const showHeader = [
    "/",
    "/Doctorscurateddetails",
    "/Healthcheckuppackagedetails",
    "/Checkout",
    "/Findtestbycategory",
    "/Healthmenwomen",
    "/Dashboard",
    "/Bookingappoinment",
    "/Familymember",
    "/Prescription",
    "/Settings",
    "/Changepassword",
    "/Deleteaccount",
    "/Invoices",
    "/Message",
    "/Reports",
    "/Wallet",
    "/Vitals",
    "/Bookingdetails",
    "/Bookingcancel",
    "/Bookingcomplete",
    "/Bookingform",
    "/Descriptions",
    "/Bloglist",
    "/Blogdetails",
    "/Booking",
    "/privacyPolicy",
    "/refundPolicy",
    "/legalNotice",
    "/aboutUs",
    "/contactUs",
    "/faqs",
    "/membership",
  ];
  const showFooter = [
    "/",
    "/Doctorscurateddetails",
    "/Healthcheckuppackagedetails",
    "/Checkout",
    "/Findtestbycategory",
    "/Healthmenwomen",
    "/Dashboard",
    "/Bookingappoinment",
    "/Familymember",
    "/Prescription",
    "/Settings",
    "/Changepassword",
    "/Deleteaccount",
    "/Invoices",
    "/Message",
    "/Reports",
    "/Wallet",
    "/Vitals",
    "/Bookingdetails",
    "/Bookingcancel",
    "/Bookingcomplete",
    "/Bookingform",
    "/Descriptions",
    "/Bloglist",
    "/Blogdetails",
    "/Booking",
    "/privacyPolicy",
    "/refundPolicy",
    "/legalNotice",
    "/aboutUs",
    "/contactUs",
    "/faqs",
    "/membership",
  ];

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div>
      {showHeader.includes(location.pathname) && <Mainheader />}
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Login&Register */}
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Forgotpassword" element={<Forgotpassword />}></Route>
        {/* Blog section */}
        <Route path="/Bloglist" element={<Bloglist />}></Route>
        <Route path="/Blogdetails" element={<Blogdetails />}></Route>
        {/* Details Pages */}
        <Route
          path="/Doctorscurateddetails"
          element={<Doctorscurateddetails />}
        ></Route>
        <Route
          path="/Healthcheckuppackagedetails/:id"
          element={<Healthcheckuppackagedetails />}
        ></Route>

        <Route
          path="/Findtestbycategory"
          element={<Findtestbycategory />}
        ></Route>
        <Route path="/Healthmenwomen" element={<Healthmenwomen />}></Route>
        <Route path="/Booking" element={<Booking />}></Route>

        {/* DashBoard */}
        <Route
          path="/Dashboard"
          element={<Protect ComponentName={Dashboard} />}
        ></Route>

        <Route
          path="/Bookingappoinment"
          element={<Protect ComponentName={Bookingappoinment} />}
        ></Route>
        <Route
          path="/Familymember"
          element={<Protect ComponentName={Familymember} />}
        ></Route>
        <Route
          path="/Prescription"
          element={<Protect ComponentName={Prescription} />}
        ></Route>
        <Route
          path="/Settings"
          element={<Protect ComponentName={Settings} />}
        ></Route>
        <Route
          path="/Changepassword"
          element={<Protect ComponentName={Changepassword} />}
        ></Route>
        <Route
          path="/Deleteaccount"
          element={<Protect ComponentName={Deleteaccount} />}
        ></Route>
        <Route
          path="/Invoices"
          element={<Protect ComponentName={Invoices} />}
        ></Route>
        <Route
          path="/Message"
          element={<Protect ComponentName={Message} />}
        ></Route>
        <Route
          path="/Reports"
          element={<Protect ComponentName={Reports} />}
        ></Route>
        <Route
          path="/Wallet"
          element={<Protect ComponentName={Wallet} />}
        ></Route>
        <Route
          path="/Vitals"
          element={<Protect ComponentName={Vitals} />}
        ></Route>
        <Route
          path="/Bookingdetails"
          element={<Protect ComponentName={Bookingdetails} />}
        ></Route>
        <Route
          path="/Bookingcancel"
          element={<Protect ComponentName={Bookingcancel} />}
        ></Route>
        <Route
          path="/Bookingcomplete"
          element={<Protect ComponentName={Bookingcomplete} />}
        ></Route>
        <Route
          path="/Bookingform"
          element={<Protect ComponentName={Bookingform} />}
        ></Route>
        <Route
          path="/Descriptions"
          element={<Protect ComponentName={Descriptions} />}
        ></Route>
        <Route
          path="/Checkout"
          element={<Protect ComponentName={Checkout} />}
        ></Route>

        <Route
          path="/privacyPolicy"
          element={<Protect ComponentName={PrivacyPolicy} />}
        ></Route>

        <Route
          path="/refundPolicy"
          element={<Protect ComponentName={RefundPolicy} />}
        ></Route>

        <Route
          path="/legalNotice"
          element={<Protect ComponentName={LegalNotice} />}
        ></Route>

        <Route
          path="/aboutUs"
          element={<Protect ComponentName={AboutUs} />}
        ></Route>

        <Route
          path="/contactUs"
          element={<Protect ComponentName={ContactUs} />}
        ></Route>

        <Route path="/faqs" element={<Protect ComponentName={Faqs} />}></Route>

        <Route
          path="/membership"
          element={<Protect ComponentName={Membership} />}
        ></Route>

        <Route path="*" element={<Error />} />
      </Routes>
      {showFooter.includes(location.pathname) && <Footer />}
    </div>
  );
}

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
    AOS.refresh();
  }, []);
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
