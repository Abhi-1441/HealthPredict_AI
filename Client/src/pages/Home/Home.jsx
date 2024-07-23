import React from "react";
import DRDImage from "/drd.png";
import BrainMriImage from "/brain_mri.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="text-white dark:text-black w-5/5 min-h-screen flex flex-col items-center relative">
      <main className="text-center mt-8 px-4 z-10 w-4/5">
        <h2 className="text-3xl md:text-5xl font-semibold text-purple-400 mb-4">
          Welcome to HealthPredict AI
        </h2>
        <p className="text-lg md:text-2xl mb-6">
          Discover a smarter way to manage your health with our cutting-edge
          diagnostic tools. At HealthPredict AI, we leverage advanced technology
          to provide accurate and reliable health predictions.
        </p>
        <div className="mt-16">
          <h3 className="text-2xl md:text-3xl font-semibold mb-4">
            Our Key Features
          </h3>
          <div className="flex justify-around ">
            <div className="text-lg w-2/5 md:text-l mb-8 bg-gray-700 dark:bg-gray-50 p-4 rounded-lg shadow">
              <h4 className="font-bold text-purple-300 mb-2 ">
                Diabetic Retinopathy Detection:
              </h4>
              <p className="mb-2">
                Upload your retinal images and get detailed insights into your
                eye health.
              </p>
              <img
                src={DRDImage}
                alt="Diabetic Retinopathy Detection"
                className="w-full md:w-1/2 mx-auto mb-4 rounded-md"
              />
            </div>
            <div className="text-lg w-2/5 md:text-l mb-8 bg-gray-700 dark:bg-gray-50 p-4 rounded-lg shadow">
              <h4 className="font-bold text-purple-300 mb-2">
                Brain Tumor Detection:
              </h4>
              <p className="mb-2">
                Submit your MRI scans for an in-depth analysis and visual
                results.
              </p>
              <img
                src={BrainMriImage}
                alt="Brain Tumor Detection"
                className="w-full md:w-1/2 mx-auto mb-4 rounded-md"
              />
            </div>
          </div>
        </div>
        <div className="mt-12">
          <button
            onClick={() => navigate("/login")}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded mx-2"
          >
            Get Started
          </button>
        </div>
      </main>
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full object-cover opacity-20" />
      </div>
    </div>
  );
};

export default Home;
