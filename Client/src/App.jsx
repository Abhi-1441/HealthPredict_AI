import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import NotFound from './pages/NotFound'
import SignupForm from './pages/SignUpForm/SignUpForm';
import LoginForm from './pages/LoginForm/LoginForm';
import OTPForm from './pages/OTPForm/OTPForm';
import ResetPasswordForm from './pages/ResetPasswordForm/ResetPasswordForm';
import AuthSuccess from './components/AuthSuccess';
import Copyright from './components/Copyright';
import PrivateRoute from './components/PrivateRoute';
import UserDashboard from './pages/UserDashboard/UserDashboard';
import Navbar from './components/Navbar';
import Home from './pages/Home/Home';
import DRDPrediction from './pages/DRDPrediction/DRDPrediction';

function App() {

  return (
    <div>
      <ToastContainer />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/verifyOTP" element={<OTPForm />} />
          <Route path="/resetPassword" element={<ResetPasswordForm />} />
          <Route path="/auth/success" element={<AuthSuccess />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path='/predict-drd' element={<DRDPrediction />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Copyright />
      </Router>
    </div>
  )
}

export default App
