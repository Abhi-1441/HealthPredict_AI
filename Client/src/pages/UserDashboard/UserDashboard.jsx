import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserDashboard = () => {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    const loadDRDModel = async () => {
      const formData = new FormData();
      formData.append("file", "/drd.png");
      const res = await axios.post(
        "https://drd-prediction-api.onrender.com/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res) console.log("DRD Model loaded successfully");
      else console.error("Error occured while loading DRD model..");
    };
    loadDRDModel();
  }, []);

  return (
    <div className="min-h-screen dark:bg-gray-100 bg-gray-900 dark:text-gray-900 text-white">
      <main className="px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="dark:bg-white bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">
                Welcome back, {userInfo.username}!
              </h2>

              <section className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Health Summary</h3>
                {userInfo.DRDPastPredictions.length > 0 ? (
                  <p className="px-4">Recent Diabetic Retinopathy prediction : <span className="font-extrabold">{userInfo.DRDPastPredictions[userInfo.DRDPastPredictions.length - 1].maxPrediction}</span></p>
                ) : (
                  <p>No data found</p>
                )

                }
              </section>

              <section className="mb-6">
                <h3 className="text-xl font-semibold mb-2">
                  Upload for Detection
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-700 dark:bg-gray-50 p-4 rounded-lg shadow">
                    <h4 className="font-bold mb-2">
                      Diabetic Retinopathy Detection
                    </h4>
                    <p>Upload your retinal images for analysis.</p>
                    <div
                      onClick={() => navigate("/predict-drd")}
                      className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-4 inline-block"
                    >
                      Upload Retinal Image
                    </div>
                  </div>
                  <div className="bg-gray-700 dark:bg-gray-50 p-4 rounded-lg shadow">
                    <h4 className="font-bold mb-2">Brain Tumor Detection</h4>
                    <p>Upload your MRI scans for analysis.</p>
                    <div
                      className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-4 inline-block"
                    >
                      Coming soon ...
                    </div>
                  </div>
                </div>
              </section>

              <section className="my-12">
                <h3 className="text-xl font-semibold mb-2">Past Diabetic Retinopathy Predictions</h3>
                {userInfo.DRDPastPredictions.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[...userInfo.DRDPastPredictions].reverse().map((prediction) => (
                      <div
                        key={prediction._id}
                        className="bg-gray-700 dark:bg-gray-50 p-4 rounded-lg shadow relative group"
                      >
                        <h4 className="font-bold mb-2">
                          Prediction: <span className="text-blue-400">{prediction.maxPrediction}</span>
                        </h4>
                        <p>
                          Uploaded on: {new Date(prediction.uploadedAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
                        </p>
                        <div className="relative">
                          <img
                            src={prediction.imageUrl}
                            alt="Prediction"
                            className="rounded-lg border-2 border-purple-600 h-48 w-4/5 max-h-96 transition-opacity duration-1000 ease-in-out group-hover:opacity-20"
                          />
                          <div className="absolute inset-0 m-2 flex flex-col justify-center w-3/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-in-out text-white">
                            {Object.entries(prediction.predictions).map(([label, probability]) => (
                              <p key={label} className="bg-black bg-opacity-50 p-1 rounded-md mb-1">
                                {`${label}: ${probability.toFixed(3)}`}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}

                  </div>

                ) : (
                  <p>No past predictions found.</p>
                )}
              </section>

              <section className="mb-6">
                <h3 className="text-xl font-semibold mb-2">
                  Tips and Articles
                </h3>
                <ul>
                  {/* Map through articles */}
                  <li className="mb-2">
                    <a
                      href="https://en.wikipedia.org/wiki/Diabetic_retinopathy"
                      className="text-purple-500"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Understanding Diabetic Retinopathy
                    </a>
                  </li>
                  <li className="mb-2">
                    <a
                      href="https://en.wikipedia.org/wiki/Brain_tumor"
                      className="text-purple-500"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Brain Tumor Symptoms and Treatment
                    </a>
                  </li>
                </ul>
              </section>

              {/* <section className="mb-6">
                        <h3 className="text-xl font-semibold mb-2">Settings and Preferences</h3>
                        <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                          Change Theme
                        </button>
                      </section> */}

              <section className="mb-6">
                <h3 className="text-xl font-semibold mb-2">
                  Support and Feedback
                </h3>
                <p>
                  If you have any issues or feedback, please{" "}
                  <a
                    href="mailto:abhiworld1441@gmail.com"
                    className="text-purple-500"
                  >
                    contact us
                  </a>
                  .
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
