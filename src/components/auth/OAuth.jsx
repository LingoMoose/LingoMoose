import {FcGoogle} from 'react-icons/fc';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from 'react-toastify';
import { db } from '../../ffirebase';
import { useNavigate } from "react-router-dom";

function OAuth() {
  const navigate = useNavigate();
  async function onGoogleClick() {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // check for the user

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      navigate("/");
    } catch (error) {
      // const errorCode = error.code;
      const errorMessage = error.message;
      toast(errorMessage);
    }
  }
    return ( 
        <button type="button" onClick={onGoogleClick} className='w-full flex items-center justify-center bg-red-700 hover:bg-red-800 active:bg-red-900 text-white px-7 py-3 rounded uppercase text-sm font-medium shadow-md hover:shadow-lg active:shadow-lg transition duration-150 ease-in-out'>
            <FcGoogle className='2xl bg-white rounded-full mr-2' />
            Continue with Google
        </button>
     );
}
 
export default OAuth;