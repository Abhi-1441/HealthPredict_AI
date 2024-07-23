import { toast } from "react-toastify";
const handleGoogleSignIn = async () => {
    try {
        window.location.href = `${import.meta.env.VITE_SERVER_BASE_URL}auth/google`;
    } catch (error) {
        toast.error(error.message || 'Error signing in with Google', {
            className: 'text-l',
        });
        console.error('Error signing in with Google:', error);
    }
};

export {handleGoogleSignIn};