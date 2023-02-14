import React from "react";
import Footer from "../components/Footer";
import data from '../data/FAQ';
import SingleQuestion from '../components/FAQs';

const FAQ = () => {
  return (
    <div>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Frequently Asked Questions</h2>
        <div className="bg-white rounded-lg shadow-md p-8">
          <section className='info'>
            {data.map((question) => {
              return <SingleQuestion key={question.id} {...question}/>
            })}
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FAQ;
