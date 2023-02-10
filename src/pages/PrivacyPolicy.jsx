import React from 'react';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
  return (
    <div>
    <div className="flex flex-col justify-center items-flexstart p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold w-full text-center">Privacy Policy</h1>
      <p className="text-xl mt-5">
        Our Privacy Policy explains how we collect, use, disclose, and protect
        your information when you use our website or services.
      </p>
      <p className="text-xl mt-5 ">
    <span className='underline'>Information Collection and Use</span> 
        <br />
        We collect information from you in a few different ways:
      </p>
      <ul className="text-xl mt-2">
        <li>
          Information you provide directly to us: This includes information
          you provide when you use our website or services, such as your name,
          email address, and any other information you choose to provide.
        </li><br />
        <li>
          Information we collect automatically: This includes information about
          your device, such as IP address, browser type, and operating system,
          as well as information about your use of our website or services,
          such as pages visited and links clicked.
        </li>
      </ul>
      <p className="text-xl mt-5">
      <span className='underline'>Information Sharing and Disclosure</span>
        <br />
        We do not sell, rent, or share your information with third parties
        except as described in this Privacy Policy.
      </p>
      <p className="text-xl mt-5">
      <span className='underline'>Changes to Our Privacy Policy</span>
        <br />
        We may update our Privacy Policy from time to time. We will notify you
        of any changes by posting the new Privacy Policy on our website.
      </p>
      <p className="text-xl mt-5">
      <span className='underline'>Contact Us</span>
        <br />
        If you have any questions about our Privacy Policy, please contact us.
      </p>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
