import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi"
import { Link } from "react-router-dom";
import OAuth from "../../components/auth/OAuth";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db } from '../../Firebase'
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { generateUsername } from 'username-generator';
import { ShakeLittle } from "reshake";

function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
    });
    const { name, email, password } = formData;
    const navigate = useNavigate();
    function onChange(e) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value,
      }));
    }
    function randomName() {
      const randBoolean = Math.random() < 0.5;
      let randomNumber = Math.floor(Math.random()*1000);
      randomNumber = randBoolean ? "-" + randomNumber : randomNumber;
      let randomName = randBoolean ? generateUsername("-") : generateUsername("");
      randomName += randomNumber;

      setFormData((prevState) => ({
        ...prevState,
        name: randomName,
      }));
    }
    async function onSubmit(e) {
      e.preventDefault();
  
      try {
        const auth = getAuth();
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
  
        updateProfile(auth.currentUser, {
          displayName: name,
        });
        const user = userCredential.user;
        const formDataCopy = { ...formData };
        delete formDataCopy.password;
        formDataCopy.timestamp = serverTimestamp();
  
        await setDoc(doc(db, "users", user.uid), formDataCopy);
        // toast.success("Sign up was successful");
        navigate("/");
      } catch (error) {
        // const errorCode = error.code;
      const errorMessage = error.message;
      toast.error(errorMessage);
      }
    }

    return ( 
        <section className="w-full min-h-[100vh] mt-[-75px] border-box pt-80px flex items-center justify-center">
          <div>
            <h1 className="text-3xl text-center mt-6 font-bold">Sign Up</h1>
            <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
                <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
                    <img className="w-full rounded-2xl" src="/sign-in-logo.jpg" alt="house keys" />
                </div>
                <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
                    <form onSubmit={onSubmit}>
                      <div className="relative">                    
                          <input 
                          className="w-full mb-6 px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded ease-in-out"
                          type="name" 
                          id="name" 
                          value={name}
                          onChange={onChange}
                          placeholder="Username"
                            />

                          <div className="absolute right-3 top-3 text-xl cursor-pointer">
                            <ShakeLittle>
                              <GiPerspectiveDiceSixFacesRandom  onClick={randomName}/>
                            </ShakeLittle>
                          </div> 
                          
                        </div>
                        <input 
                        className="w-full mb-6 px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded ease-in-out"
                        type="email" 
                        id="email" 
                        value={email}
                        onChange={onChange}
                        placeholder="Email address"
                          />
                        <div className="relative mb-6">
                            <input 
                            className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded ease-in-out"
                            type={showPassword ? "text" : "password"}
                            id="password" 
                            value={password}
                            onChange={onChange}
                            placeholder="Password"
                            />
                            {showPassword ? 
                            <AiFillEyeInvisible className="absolute right-3 top-3 text-xl cursor-pointer" onClick={() => setShowPassword((prevState) => !prevState)} />: 
                            <AiFillEye className="absolute right-3 top-3 text-xl cursor-pointer" onClick={() => setShowPassword((prevState) => !prevState)}/>
                            }
                        </div>
                        <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
                            <p className="mb-6">Have an account?
                                <Link to="/sign-in" className="ml-1 text-red-600 hover:text-red-700 transition duration-200 ease-in-out">Sign In</Link>
                            </p>
                            <p>
                                <Link to="/forgot-password" className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out">Forgot Password?</Link>
                            </p>
                        </div>
                            <button 
                            type="submit" 
                            className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-sm transition duration-150 ease-in-out hover:shadow-md"
                        >Sign Up</button>
                        <div className="flex items-center my-4 before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300">
                            <p className="uppercase text-center font-semibold mx-4">or</p>
                        </div>
                        <OAuth />
                        
                    </form>
                </div>
            </div>
          </div>
        </section>
     );
}
 
export default SignUp;