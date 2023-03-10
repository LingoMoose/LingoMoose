import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import CreateEditStory from "./pages/CreateEditStory";
import StoryPreview from "./pages/StoryPreview";
import Category from "./pages/Category";
import Read from "./pages/Read";
import Landing from "./pages/Landing";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import FAQ from "./pages/FAQ";
import SupportUs from "./pages/SupportUs";
import Listen from "./pages/Listen";
import { useEffect } from "react";


function App() {

    useEffect(() => {
        if (!(document.body.className === "light-mode" || document.body.className === "light-dark")) {
            document.body.className = "light-mode";
        }
    }, [])


    return (
        <div>
            <div
                className="min-h-screen min-w-full"
                style={{ backgroundColor: 'var(--background-color)', color: 'var(--text-color)', borderColor: `var(--border-color)` }}
            >
                <Router>
                    <Header />
                    <Routes>
                        <Route path="/landing" element={<Landing />} />
                        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                        <Route path="/faq" element={<FAQ />} />
                        <Route path="/support-us" element={<SupportUs />} />
                        <Route path="/sign-in" element={<SignIn />} />
                        <Route path="/sign-up" element={<SignUp />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/" element={<PrivateRoute />}>
                            <Route path="/" element={<Home />} />
                        </Route>
                        <Route path="/profile" element={<PrivateRoute />}>
                            <Route path="/profile" element={<Profile />} />
                        </Route>
                        <Route path="/category/" element={<PrivateRoute />}>
                            <Route path="/category/:categoryName/:storyId" element={<StoryPreview />} />
                            <Route path="/category/:categoryName" element={<Category />} />
                        </Route>
                        <Route path="/create-story" element={<PrivateRoute />}>
                            <Route path="/create-story" element={<CreateEditStory />} />
                        </Route>
                        <Route path="/edit-story" element={<PrivateRoute />}>
                            <Route path="/edit-story/:storyId" element={<CreateEditStory />} />
                        </Route>
                        <Route path="/read" element={<PrivateRoute />}>
                            <Route path="/read/:storyId" element={<Read />} />
                        </Route>
                        <Route path="/listen" element={<PrivateRoute />}>
                            <Route path="/listen/:storyId" element={<Listen />} />
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