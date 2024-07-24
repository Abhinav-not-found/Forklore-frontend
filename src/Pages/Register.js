import React, { useState } from 'react';
import foodPng from '../Assets/Images/foodPng.png';
import foodPng2 from '../Assets/Images/foodPng2.png';
import foodPng3 from '../Assets/Images/foodPng3.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://localhost:5001/register', { email, password,username});
            if (response.status === 200) {
                toast.success('Successfully registered');
                navigate('/login');
            } else if (response.status === 201) {
                toast.error('Email already used');
            }
            else if (response.status === 202){
                toast.error('Username already used')
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred');
        }
    };


    return (
        <div className='bg-[#F5E8D2] h-[97vh] flex'>
            <div className='w-1/2 p-4 ml-10'>
                <h1 className='text-7xl font-bold mt-14'>Register</h1>
                <div className='ml-5'>
                    <p className='text-2xl mt-5'>Username</p>
                    <div className='flex items-center'>
                        <input 
                            value={username} 
                            onChange={handleUsernameChange}
                            className='border border-black text-xl px-1 py-1 outline-none rounded-md bg-transparent' 
                            type="text" 
                        />
                    </div>
                    <p className='text-2xl mt-5'>Email</p>
                    <input 
                        value={email} 
                        onChange={handleEmailChange} 
                        className='border border-black text-xl px-1 py-1 outline-none rounded-md bg-transparent' 
                        type="text" 
                    /><br/>
                    <p className='text-2xl mt-5'>Password</p>
                    <input 
                        value={password} 
                        onChange={handlePasswordChange} 
                        className='border border-black text-xl px-1 py-1 outline-none rounded-md bg-transparent' 
                        type="password" 
                    /><br/>
                    
                    <button 
                        className='border border-black text-white bg-black p-2 mt-5 rounded-md text-2xl' 
                        onClick={handleRegister}
                    >
                        Register
                    </button>
                    
                    <p className='text-xl mt-6'>
                        Already have an account? <span 
                            onClick={() => navigate('/login')} 
                            className='underline cursor-pointer'
                        >
                            Login
                        </span> here
                    </p>
                </div>
            </div>
            
            <div className='w-1/2 relative p-4' style={{ zIndex: 100 }}>
                <h1 className='text-7xl font-bold mt-14'>
                    Authentic <span className='font-serif'>Indian</span>
                </h1>
                <h1 className='text-7xl font-bold mt-1'>
                    <span className='bg-black rounded-full pl-8 pr-5 text-[#F5E8D2]'>Food</span> Recipes
                </h1>
                <div className='flex w-full mt-2'>
                    <div>
                        <img src={foodPng} className='h-auto w-80' alt="food" />
                        <img src={foodPng2} className='h-auto w-80 z-20' alt="food" />
                    </div>
                    <div className='w-full'>
                        <img src={foodPng3} className='h-auto w-80' alt="food" />
                    </div>
                </div>
                <div style={{ zIndex: -1 }} className='CIRCLE w-96 h-96 absolute bg-red-300 top-48 left-20 rounded-full z-10'></div>
                <div className='bg-red-500 w-fit text-xl absolute top-56 left-[460px] text-white px-3 py-1 rounded-md'>
                    Available
                </div>
            </div>
        </div>
    );
};

export default Register;
