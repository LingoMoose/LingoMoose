
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";
import Offers from "./pages/Offers";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import CreateListing from "./pages/CreateListing";
import EditListing from "./pages/EditListing";
import Listing from "./pages/Listing";
import Category from "./pages/Category";
import Read from "./pages/Read";
import Landing from "./pages/Landing";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import FAQ from "./pages/FAQ";
import SupportUs from "./pages/SupportUs";


function App() {


  return (
    <div>
      <div className="min-h-screen min-w-full">
      
      <Router>
        <Header />
        <Routes>
          <Route path="/landing" element={<Landing/>} />
          <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
          <Route path="/faq" element={<FAQ/>} />
          <Route path="/support-us" element={<SupportUs/>} />
          <Route path="/" element={<Home/>} />
          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile/>} />
          </Route>


          <Route path="/sign-in" element={<SignIn/>} />
          <Route path="/sign-up" element={<SignUp/>} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />

          <Route path="/category/:categoryName/:listingId" element={<Listing/>} />
          <Route path="/offers" element={<Offers/>} />
          <Route path="/category/:categoryName" element={<Category/>} />  
          <Route path="/create-listing" element={<CreateListing />}>
            <Route path="/create-listing" element={<CreateListing/>} />
          </Route>
          <Route path="/edit-listing" element={<PrivateRoute />}>
            <Route path="/edit-listing/:listingId" element={<EditListing/>} />
          </Route>
          <Route path="/read" element={<PrivateRoute />}>
            <Route path="/read/:storyId" element={<Read/>} />
          </Route>  

        </Routes>
      </Router>
      <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
      />
      </div>
    </div>
  );
}

export default App;