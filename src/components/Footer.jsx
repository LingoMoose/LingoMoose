import { FaFacebook, FaInstagram, FaReddit, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return ( 
        <div className="bg-gray-900 py-6 mt-20">
        <div className="container flex flex-col items-center justify-between text-white  mx-auto">
            <div className="w-full md:w-1/2">
            <h3 className="text-lg font-bold mb-4 text-center">About Us</h3>
            <p className='text-center pb-4'>
                We are dedicated to providing a fun and effective way to learn a new language. With engaging stories, native speakers, and interactive lessons, you'll be speaking your target language in no time.
            </p>
            </div>
            <div className="w-full md:w-1/2">
            <h3 className="text-lg font-bold text-center">Contact Us</h3>
            <div className='relative flex text-center justify-center'>
                <ul className="list-reset absolute left-0 text-left">
                    <li>
                    <a className="text-white hover:text-gray-300 mr-4" href="/supportius">Support Us</a>
                    </li>
                    <li>
                    <a className="text-white hover:text-gray-300 mr-4" href="/FAQ">FAQ</a>
                    </li>
                    <li className='z-10'>
                    <a className="text-white hover:text-gray-300" href="/privacy-policy">Privacy Policy</a>
                    </li>
                </ul>
                <div className="flex justify-center items-center py-6">
                        <FaFacebook className='text-blue-500 hover:text-blue-800 text-lg cursor-pointer mr-1 ml-1' />
                        <FaInstagram className='text-blue-500 hover:text-blue-800 text-lg cursor-pointer mr-1 ml-1'/>
                        <FaReddit className='text-blue-500 hover:text-blue-800 text-lg cursor-pointer mr-1 ml-1'/>
                        <FaTwitter className='text-blue-500 hover:text-blue-800 text-lg cursor-pointer mr-1 ml-1'/>
                </div>
            </div>
            </div>
        </div>
        <div className="container flex items-center justify-center text-gray-600 mx-auto">
            <p>&copy; 2023 LingoMoose</p>
        </div>
        </div>
     );
}
 
export default Footer;