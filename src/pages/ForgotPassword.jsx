import { sendPasswordResetEmail, getAuth } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";


const ForgotPassword = () => {
    const [email, setEmail] = useState("");

    function onChange(e){
        setEmail(e.target.value)
    }

    async function onSubmit(e){
        e.preventDefault();
        try {
            const auth = getAuth();
            await sendPasswordResetEmail(auth, email);
            toast.success("Email was sent!")
        } catch(error){
            toast.error("User not found");
        }
    }

    return ( 
        <section>
            <h1 className="text-3xl text-center mt-6 font-bold">Forgot Password</h1>
            <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
                <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
                    <img className="w-full rounded-2xl" src="/sign-in-logo.jpg" alt="house keys" />
                </div>
                <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
                    <form onSubmit={onSubmit}>
                        <input 
                        className="w-full mb-6 px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded ease-in-out"
                        type="email" 
                        id="email" 
                        value={email}
                        onChange={onChange}
                        placeholder="Email address"
                          />

                        <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
                            <p className="mb-6">Don't have an account?
                                <Link to="/sign-up" className="ml-1 text-red-600 hover:text-red-700 transition duration-200 ease-in-out">Register</Link>
                            </p>
                            <p>
                                <Link to="/sign-in" className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out">Sign In</Link>
                            </p>
                        </div>
                            <button 
                            type="submit" 
                            className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-sm transition duration-150 ease-in-out hover:shadow-md"
                        >send password reset</button>
     
                        
                    </form>
                </div>
            </div>
        </section>
     );
}
 
export default ForgotPassword;
