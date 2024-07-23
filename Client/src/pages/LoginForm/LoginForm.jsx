import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { cn } from "../../utils/cn";
import { IconBrandGoogle } from "@tabler/icons-react";
import BottomGradient from "../../components/BottomGradient";
import { axiosInstance } from "../../utils/axiosConfig";
import { toast } from "react-toastify";
import ReactLoading from 'react-loading';
import { handleGoogleSignIn } from '../../utils/handleGoogleSignIn';

const LoginForm = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const validateForm = (email, password) => {
        if (!email || !password) {
            return "All fields are required";
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return "Invalid email address";
        }
        return "valid";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const errorMessage = validateForm(email, password);
        if (errorMessage !== "valid") {
            toast.error(errorMessage, {
                className: 'text-l '
            });
            setLoading(false);
            return;
        }
        await axiosInstance.post('/auth/login', {
            email,
            password
        }).then((res) => {
            const otpFlag = res.data.otpFlag || false;
            const generatePassword = res.data.generatePassword || false;
            if (otpFlag) {
                toast.warning("Email already exist but not verified", {
                    className: 'text-l'
                });
                toast.success("OTP has been sent to your email", {
                    className: 'text-l'
                });
                navigate('/verifyOTP', { state: { email } });
            }
            else if (generatePassword) {
                toast.info("User signed up through google\nSign in with google or generate a password", {
                    className: 'text-l'
                });
                navigate('/resetPassword', { state: { email } });
            }
            else {
                const { token } = res.data;
                navigate(`/auth/success?token=${token}`)
            }
        }).catch((err) => {
            toast.error(err.response.data.msg, {
                className: ' text-l'
            });
            // console.log(err.response);
        }).finally(() => {
            setLoading(false);
        });
    }

    const handleForgotPassword = async () => {
        setLoading(true);
        if (!email) {
            toast.error('Please provide the registered email', { className: 'text-l ' });
            setLoading(false);
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error('Invalid email address', { className: 'text-l ' });
            setLoading(false);
            return;
        }
        await axiosInstance.post('/auth/send-otp', {
            email
        }).then((res) => {
            const otpFlag = res.data.otpFlag || false;
            if (otpFlag) {
                toast.success("OTP has been sent to your email", {
                    className: 'text-l'
                });
                const passwordResetFlag = true;
                navigate('/verifyOTP', { state: { email, passwordResetFlag } });
            }
        }).catch((err) => {
            toast.error(err.response.data.msg, {
                className: ' text-l'
            });
        }).finally(() => {
            setLoading(false);
        });
    }

    return (
        <div className="min-h-screen flex items-center decoration-sky-300">
            <div className="h-fit max-w-md w-full mx-auto rounded-none m-5 md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
                <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                    Welcome to HealthPredict AI
                </h2>
                <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                    Login to health monitoring system
                </p>

                <form className="mt-8" onSubmit={handleSubmit}>
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                            id="email"
                            placeholder="projectmayhem@fc.com"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </LabelInputContainer>
                    <LabelInputContainer className="mb-4">
                        <div className="flex justify-between items-center">
                            <Label htmlFor="password">Password</Label>
                            <div onClick={handleForgotPassword} className="text-red-600 text-sm hover:cursor-pointer hover:font-bold hover:underline" >Forgot Password ?</div>
                        </div>
                        <Input
                            id="password"
                            placeholder="••••••••"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </LabelInputContainer>

                    <button
                        className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                        type="submit"
                    >
                        {loading ?
                            <div className="w-full px-5 flex items-center justify-center h-4 ">
                                <ReactLoading type={"balls"} className="w-12 fill-white dark:fill-black" />
                            </div>
                            :
                            <div>
                                Log In &rarr;
                                <BottomGradient />
                            </div>
                        }
                    </button>

                    <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

                    <div className="flex flex-col space-y-4">
                        <button
                            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                            type="button"
                            onClick={handleGoogleSignIn}
                        >
                            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                            <span onClick={handleGoogleSignIn} className="text-neutral-700 dark:text-neutral-300 text-sm">
                                Google
                            </span>
                            <BottomGradient />
                        </button>
                    </div>

                    <div className="text-gray-600 mt-8 ">
                        Don't have an account?&nbsp;
                        <div className="inline hover:underline hover:cursor-pointer hover:text-blue-500 dark:hover:text-white" onClick={() => navigate('/signup')}>
                            Sign Up
                        </div>.
                    </div>
                </form>
            </div>
        </div>

    )
}

export default LoginForm;

// LabelInputContainer component
const LabelInputContainer = ({ children, className }) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};