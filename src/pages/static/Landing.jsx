import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';

function Landing() {
  return (
    <div className='mt-[-40px]'>
    <div className="flex flex-col h-screen">
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl font-bold text-gray-900 text-center">
          The free, fun, and effective way to learn Vietnamese!
        </h1>
        <div className="mt-10">
          <Link to={"../sign-up"}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Get Started
          </button>
          </Link>  
          <Link to={"../sign-in"}>
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded-full ml-4">
            I Already Have an Account
          </button>
          </Link>
        </div>
      </div>
      </div>
      <div className="relative flex flex-col items-center justify-center min-h-screen color-1">
      <h3 className="landing-figs text-center font-bold text-2xl mb-12">Why you'll love learning with us!</h3>
      <div className="flex flex-wrap w-[380px] sm:w-[800px]">
      <div className="w-full md:w-1/2  rounded-lg transition-background ease-in-out duration-300 hover:bg-gray-300 opacity-75 p-12">
          <figure className="landing-figs text-center">
            <img
              className="landing-figs transition-opacity duration-300"
              src="/images/cuteBoy.png"
              alt="boy"
            />
          
            <figcaption className="landing-figs font-bold text-lg">Efficient Learning</figcaption>
            <p className="landing-figs">
            Maximize your learning potential by replacing flashcards and disconnected terminology with meaningful input through reading.
            </p>
          </figure>
        </div>
        <div className="w-full md:w-1/2 rounded-lg transition-background ease-in-out duration-300 hover:bg-gray-300 opacity-75  p-12">
        <figure className="landing-figs text-center">
            <img
            className="landing-figs transition-opacity duration-300"
            src="/images/cutegirl.png"
            alt='girl'
            />
            <figcaption className="landing-figs font-bold text-lg">HD Audio</figcaption>
            <p className="landing-figs">
            Don't compromise your learning with robotic text to speech. Experience the benefits of learning with native speakers from the very beginning.
            </p>
        </figure>
        </div>
        <div className="w-full md:w-1/2 rounded-lg transition-background ease-in-out duration-300 hover:bg-gray-300 opacity-75  p-12">
          <figure className="landing-figs text-center">
            <img
              className="landing-figs transition-opacity duration-300"
              src="/images/lanterngirl.png"
              alt='lantern girl'
            />
            <figcaption className="landing-figs font-bold text-lg">Engaging Stories</figcaption>
            <p className="landing-figs">
            Immerse yourself in captivating tales that seamlessly blend cultural insights and unique quirks, all while expanding your vocabulary and grasp of new expressions.
            </p>
          </figure>
        </div>
        <div className="w-full md:w-1/2 rounded-lg transition-background ease-in-out duration-300 hover:bg-gray-300 opacity-75  p-12">
          <figure className="landing-figs text-center">
            <img
              className="landing-figs transition-opacity duration-300"
              src="/images/foodgirl.png"
              alt='girl'
            />
            
            <figcaption className="landing-figs font-bold text-lg">Stay Motivated</figcaption>
            <p className="landing-figs">
            Forge sustainable language learning practices through the power of engaging storytelling and connecting with like-minded individuals.
            </p>
          </figure>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
}

export default Landing;