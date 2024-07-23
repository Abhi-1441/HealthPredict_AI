import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from "react-toastify";
import { logout } from '../redux/userSlice';

const LogOutButton = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout()); 
        toast.success('User logged out successfully', {
            className: 'text-l',
        });
        navigate('/');
    };

    return (
        <button
        onClick={handleLogout}
        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mx-2"
      >
        Sign Out
      </button>
    );
};

export {LogOutButton};
