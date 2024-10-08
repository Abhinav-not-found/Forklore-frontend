import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
// import defaultProfile from '../Assets/Images/Profile.png';

const Navbar = () => {
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);
    const [profilePic, setProfilePic] = useState('');
    // const []

    useEffect(() => {
        const handleLoggedIn = () => {
            if (localStorage.getItem('token')) {
                setLoggedIn(true);
            } else {
                setLoggedIn(false);
            }
        };
        handleLoggedIn();

        const fetchProfilePicture = async () => {
            try {
                const userId = localStorage.getItem('userId');
                const response = await axios.get(`https://froklore-backend.onrender.com/getUserInfo/${userId}`);
                setProfilePic(response.data.findUser.username);
                 // Ensure profilePic is correctly set
                // console.log(profilePic[0])
                // console.log(response.data.findUser.username)
            } catch (error) {
                console.error('Error fetching profile picture:', error);
            }
        };

        if (loggedIn) {
            fetchProfilePicture();
        }
    }, [loggedIn]);

    const handleLogout = () => {
        localStorage.clear();
        toast('Good Bye! Stay hungry! 😋', { icon: '👋' });
        navigate('/');
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };

    const handleProfile = async () => {
        try {
            const userId = localStorage.getItem('userId');
            navigate(`/profile/${userId}`);
        } catch (error) {
            console.error('Error fetching profile:', error);
            toast.error('Failed to fetch profile');
        }
    };

    return (
        <div className='flex justify-between items-center py-3 cursor-pointer mb-2'>
            <p onClick={() => navigate('/')} className='text-lg font-bold'>Forklore</p>
            {
                loggedIn ?
                    <div className='flex gap-4'>
                        <button onClick={() => navigate('/create')} className='border border-black py-1 px-3 rounded-lg hover:bg-black hover:text-white'>Create</button>
                        <button onClick={handleLogout} className='border border-black px-3 py-1 rounded-lg hover:bg-black hover:text-white'>Logout</button>
                        <div
                            onClick={handleProfile}
                            className='PROFILE_PICTURE w-10 h-10 rounded-full cursor-pointer bg-red-300 flex items-center justify-center text-xl'
                        >
                            {profilePic[0]}
                        </div>
                    </div>
                    :
                    <button onClick={() => navigate('/login')} className='bg-black text-[#F5E8D2] py-1 px-3 rounded-lg'>Login</button>
            }
        </div>
    );
}

export default Navbar;
