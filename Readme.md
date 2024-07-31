# HealthPredict AI

HealthPredict AI is a web application that allows users to upload medical images and receive predictions for Diabetic Retinopathy (DR) stages and brain tumor using machine learning models. The application provides secure user authentication with options for Google Sign-In and OTP-based email verification. User health records and prediction results are stored and managed for future reference.

## Table of Contents

- [HealthPredict AI](#healthpredict-ai)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
    - [In ../server/.env](#in-serverenv)
    - [In ../client/.env](#in-clientenv)
  - [Usage](#usage)
  - [Deployment](#deployment)
  - [Contributing](#contributing)

## Features

- Secure user authentication (Google Sign-In and OTP-based email verification)
- Upload medical images and receive predictions for Diabetic Retinopathy stages and brain tumor 
- Store and manage user health records and prediction results
- Responsive and user-friendly interface

## Tech Stack

- **Frontend**: React.js, Redux, Tailwind CSS, 
- **Backend**: Node.js, Express.js, MongoDB
- **Machine Learning**: Flask
- **Deployment**: Vercel (Frontend + Backend)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Abhi-1441/healthpredict-ai.git
   cd healthpredict-ai

2. Install dependencies for the backend:
cd ../server
npm install

3. Install dependencies for the frontend:
cd ../client
npm install

## Environment Variables

Create a .env file in the both directories and add the following environment variables:

### In ../server/.env
- **MongoDB**
    MONGO_URI=your_mongodb_connection_string
- **JWT**
    JWT_SECRET=your_jwt_secret
- **Google OAuth**
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    GOOGLE_CALLBACK_URL=your_google_callback_url
    AUTH_REDIRECT_URL=your_client_redirect_url
- **SMTP USER**
    EMAIL_USER=user_email
    EMAIL_PASS=user_app_pass_key

### In ../client/.env
- **server**
    VITE_SERVER_BASE_URL=your_server_url
- **Cloudinary**
    VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
    VITE_CLOUDINARY_CLOUD_PRESET=your_cloud_preset

## Usage

1. Start the backend server:
    cd ../server
    node server.js

2. Start the frontend development server:
    cd ../client
    npm run dev

3. Access the application at http://localhost:5173.
   
## Deployment

- **Frontend**: [HealthPredict AI Client](https://health-predict-ai.vercel.app/) 
- **Backend**: [HealthhPredict AI Server](https://healthpredict-ai-server.vercel.app/)
  
## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.
