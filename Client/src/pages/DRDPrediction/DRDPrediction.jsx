import React, { useState } from "react";
import axios from "axios";
import { axiosInstance } from "../../utils/axiosConfig";
import { Cloudinary } from "@cloudinary/url-gen";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "../../redux/userSlice";
import { toast } from "react-toastify";

function DRDPrediction() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.userInfo);

  const [image, setImage] = useState(null);
  const [maxPrediction, setMaxPrediction] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [originalImage, setOriginalImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const cloud_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const cloud_preset = import.meta.env.VITE_CLOUDINARY_CLOUD_PRESET;

  const cld = new Cloudinary({ cloud: { cloudName: cloud_name } });
  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
    setOriginalImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", image);

      // First request to your prediction API
      const res = await axios.post(
        "https://drd-prediction-api.onrender.com/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const predictions = res.data.predictions;
      setPredictions(predictions);
      console.log(predictions);
      const maxLabel = Object.keys(predictions).reduce((a, b) =>
        predictions[a] > predictions[b] ? a : b
      );
      setMaxPrediction(maxLabel);
      setErrorMessage("");

      // Prepare form data for Cloudinary upload
      formData.append("upload_preset", cloud_preset);

      // Cloudinary upload request
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        formData
      );

      // Extract the image URL from Cloudinary response
      const imageUrl = response.data.secure_url;
      setImageUrl(imageUrl);

      // Now make the final request to save the data in your database
      await axiosInstance.post("/auth/upload-drd-predictions", {
        imageUrl, predictions, maxLabel, user
      })
        .then((res) => {
          toast.success(res.data.message, {
            className: "text-l",
          });
          dispatch(fetchUserInfo());
        })
        .catch((err) => {
          toast.error(err.response.data.msg, {
            className: "text-l",
          });
        });

    } catch (error) {
      console.error(error);
      setPredictions(null);
      setMaxPrediction(null);
      setErrorMessage(
        "Error occurred while processing the image. Please try again."
      );
    }
    setIsLoading(false);
  };


  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded-lg shadow-lg dark:text-black text-white">
      <h1 className="text-2xl font-bold mb-4">
        Diabetic Retinopathy Detection
      </h1>
      <input
        type="file"
        accept=".jpg,.jpeg,.png"
        onChange={handleFileChange}
        className="mb-4"
      />
      <button
        onClick={handleSubmit}
        className="bg-purple-500  py-2 px-4 rounded hover:bg-purple-600"
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Submit"}
      </button>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <div className="flex p-4">
        {originalImage && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Uploaded Image</h2>
            <img
              src={originalImage}
              alt="Original"
              className="rounded-lg border-2 border-purple-600 h-48 max-w-full max-h-96"
            />
          </div>
        )}
        {/* Show predictions object */}
        {/* {predictions && (
          <div className="flex flex-col items-start ml-12 ">
            <h2 className="text-xl font-semibold mb-1">DR Predictions</h2>
            <ul className="list-disc pl-8">
              {Object.entries(predictions).map(([label, probability]) => (
                <li key={label} className="text-gray-700">
                  {`${label}: ${probability.toFixed(3)}`}
                </li>
              ))}
            </ul>
          </div>
        )} */}
      </div>

      {maxPrediction && !isLoading && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Prediction</h2>
          <p className="text-green-500 font-semibold">{`The predicted label is : ${maxPrediction}`}</p>
        </div>
      )}
    </div>
  );
}

export default DRDPrediction;
