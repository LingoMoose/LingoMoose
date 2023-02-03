import {FcGoogle} from 'react-icons/fc'

const OAuth = () => {
    return ( 
        <button className='w-full flex items-center justify-center bg-red-700 hover:bg-red-800 active:bg-red-900 text-white px-7 py-3 rounded uppercase text-sm font-medium shadow-md hover:shadow-lg active:shadow-lg transition duration-150 ease-in-out'>
            <FcGoogle className='2xl bg-white rounded-full mr-2' />
            Continue with Google
        </button>
     );
}
 
export default OAuth;