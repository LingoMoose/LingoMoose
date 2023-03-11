import React from 'react';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
  return (
    <div className=''>
      <div className="flex flex-col justify-center flex-start p-10 max-w-3xl mx-auto text-left">
        <img src="./images/lock.svg" alt="lock" className='w-20 mb-4' />
        <h1 className="text-3xl font-bold mb-5 w-full">Privacy Policy</h1>
        <p className="text-xl w-full">
        At LingoMoose, we are committed to protecting your privacy and ensuring that your personal information is handled in a responsible and transparent manner. This Privacy Policy explains how we collect, use, disclose, and protect your information when you use our website or services. By accessing or using our website or services, you agree to the terms of this Privacy Policy.
        </p>
        <p className="text-2xl mt-5 font-semibold w-full">
          Information Collection and Use
        </p>
        <p className="text-xl mt-2 w-full">
        We may collect personal information from you in several ways. This includes information you provide when you use our website or services, such as your name, email address, and any other information you choose to provide. We may also collect information automatically about your device, such as IP address, browser type, and operating system, as well as information about your use of our website or services, such as pages visited and links clicked. This information is used to improve our website and services, to personalize your experience, and to communicate with you about our products and services.
        </p>
        <p className="text-2xl mt-5 font-semibold w-full">
          Information Sharing and Disclosure
        </p>
        <p className="text-xl mt-2 w-full">
        We understand the importance of keeping your personal information private and secure. We do not sell, rent, or share your information with third parties except as described in this Privacy Policy. We may share your personal information with third-party service providers who help us operate our website or services, but only to the extent necessary to provide those services.
        </p>
        <p className="text-2xl mt-5 font-semibold w-full">
          Changes to Our Privacy Policy
        </p>
        <p className="text-xl mt-2 w-full">
        We may update our Privacy Policy from time to time to reflect changes in our practices or to comply with applicable laws and regulations. We will notify you of any changes by posting the new Privacy Policy on our website. Your continued use of our website or services after any changes to this Privacy Policy means you accept the changes.
        </p>
        <p className="text-2xl mt-5 font-semibold w-full">
          Contact Us
        </p>
        <p className="text-xl mt-2 w-full">
        If you have any questions about our Privacy Policy or how we handle your personal information, please contact us. We are committed to protecting your privacy and will do our best to respond promptly to any questions or concerns you may have.
        </p>
      </div>
      <Footer className=""/> 
    </div>
  );
};

export default PrivacyPolicy;
