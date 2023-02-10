import React from 'react';
import { FaPaypal, FaPatreon } from "react-icons/fa";
import Footer from '../components/Footer';

const SupportUs = () => {
  return (
    
    <div className="   w-full ">
        <div className='max-w-6xl mx-auto flex flex-col items-center mt-4 p-10'>
      <h1 className="text-3xl font-bold text-gray-800">Support Us</h1>
      <p className="text-lg text-gray-700 mt-4">
        Our free language learning website is built and maintained by a team of volunteers with a passion for helping people learn Vietnamese. Your support, whether it be through content contributions or financial donations, is greatly appreciated and helps us continue to bring the best content to the widest audience.
      </p>
      <h2 className="text-2xl font-bold text-gray-800 mt-8">Contribute Content</h2>
      <p className="text-lg text-gray-700 mt-4">
        If you're passionate about language learning and would like to help others, you can contribute to our website by writing stories, creating exercises, or providing feedback on existing content. We welcome any and all contributions that can help make our website a better resource for learners.
      </p>
      <h2 className="text-2xl font-bold text-gray-800 mt-8">Make a Financial Donation</h2>
      <p className="text-lg text-gray-700 mt-4">
        Running and maintaining a website requires time, effort, and resources. Your financial support can help us keep the lights on and continue to bring new and improved content to our users. Any amount, big or small, is greatly appreciated and goes directly towards supporting our mission.
      </p>
      <div className="flex mb-5">
        <a
          href="https://www.paypal.com"
          className="bg-gray-300 hover:bg-gray-400 py-3 px-5 rounded-lg mr-5"
        >
          <FaPaypal className="mr-2" />
          Donate with PayPal
        </a>
        <a
          href="https://www.patreon.com"
          className="bg-gray-300 hover:bg-gray-400 py-3 px-5 rounded-lg"
        >
          <FaPatreon className="mr-2" />
          Support on Patreon
        </a>
      </div>
      <p className="text-gray-700">
        Your contributions will help us bring the best content to the widest audience and improve the user experience for everyone. Thank you for your support!
      </p>


      <h2 className="text-2xl font-bold text-gray-800 mt-8">Thank You!</h2>
      <p className="text-lg text-gray-700 mt-4">
        Your contributions help us bring the best resources and content to the widest audience, and we couldn't do it without your support.
      </p>
      </div>
      <Footer />
    </div>
  );
};

export default SupportUs;
