import React from "react";
import Footer from "../components/Footer";

const FAQ = () => {
  return (
    <div>
    <div className="max-w-screen-xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Frequently Asked Questions</h2>
      <div className="bg-white rounded-lg shadow-md p-8">
        <h3 className="text-xl font-medium text-gray-800 mb-4">What is this website all about?</h3>
        <p className="text-gray-700 mb-4">
          This website is a free, open-source platform for learning the Vietnamese language. Users can contribute to creating stories to help with the learning process.
        </p>

        <h3 className="text-xl font-medium text-gray-800 mb-4">Is this website free to use?</h3>
        <p className="text-gray-700 mb-4">Yes, this website is completely free to use.</p>

        <h3 className="text-xl font-medium text-gray-800 mb-4">What is the target audience for this website?</h3>
        <p className="text-gray-700 mb-4">
          This website is aimed at individuals who are interested in learning the Vietnamese language.
        </p>

        <h3 className="text-xl font-medium text-gray-800 mb-4">How can I contribute to the website?</h3>
        <p className="text-gray-700 mb-4">
          You can contribute by creating stories that will help others in their language learning journey. Simply sign up and start submitting your stories.
        </p>

        <h3 className="text-xl font-medium text-gray-800 mb-4">Do I need to have prior knowledge of Vietnamese to contribute?</h3>
        <p className="text-gray-700 mb-4">
          No, you don't need to have prior knowledge of Vietnamese. However, it would be helpful if you have some basic knowledge of the language to ensure the stories you create are accurate and helpful.
        </p>

        <h3 className="text-xl font-medium text-gray-800 mb-4">Are there any rules for contributing to the website?</h3>
        <p className="text-gray-700 mb-4">
          Yes, there are some rules for contributing to the website. All content must be appropriate and in line with the website's mission to provide a safe and supportive environment for language learning.
        </p>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default FAQ;
