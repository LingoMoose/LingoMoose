import Stories from "./pages/stories/Stories";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Profile from "./pages/Profile";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import PrivateRoute from "./components/auth/PrivateRoute";
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import CreateEditStory from "./pages/stories/CreateEditStory";
import StoryPreview from "./pages/stories/StoryPreview";
import Category from "./pages/stories/Category";
import Read from "./pages/stories/Read";
import Landing from "./pages/static/Landing";
import PrivacyPolicy from "./pages/static/PrivacyPolicy";
import FAQ from "./pages/static/FAQ";
import SupportUs from "./pages/static/SupportUs";
import Listen from "./pages/stories/Listen";
import { useEffect } from "react";
import Search from "./pages/stories/Search";
import AdminDictionary from "./pages/admin/AdminDictionary";


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
                            <Route path="/" element={<Stories />} />
                        </Route>
                        <Route path="/search" element={<PrivateRoute />}>
                            <Route path="/search/:searchValue" element={<Search />} />
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
                        <Route path="/admin" element={<PrivateRoute />}>
                            <Route path="/admin/dictionary" element={<AdminDictionary />} />   
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