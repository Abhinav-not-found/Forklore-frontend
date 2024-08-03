import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import burger from '../Assets/Images/burger.png'
import sushi from '../Assets/Images/sushi.png'
import friedChicken from '../Assets/Images/friedChicken.png'
import toast from 'react-hot-toast'
import axios from 'axios'
const Login = () => {
    const navigate= useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5001/login', { email, password});
            if (response.status === 200) {
                toast.success('Logged in! Ready to 🌶️ Spice 🔥 Up?');
                localStorage.setItem('token',response.data.token)
                localStorage.setItem('userId',response.data.userId)
                navigate('/');
            }
            else{
                toast.error('Login Failed')
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred');
        }
    };

    const [eyeActive,setEyeActive]=useState(true)
    const [inputType, setInputType]=useState('password')
    const handleEye=()=>{
        if(eyeActive){
            setEyeActive(false)
            setInputType('text')
        }
        else{
            setEyeActive(true)
            setInputType('password')
        }
    }
    return (
        <div className='h-screen flex'>
            <div  style={{zIndex:100}} className='LEFT w-1/2 p-4'> 
                <h1 className='text-7xl font-bold mt-14 ml-28'>Worlds <span className='font-serif'>Best</span>
                </h1>
                <h1 className='text-7xl font-bold mt-1 ml-16 mb-5'><span className='bg-black rounded-full pl-8 pr-5 text-[#F5E8D2]'>Food </span>Recipes</h1>
                <div className='flex w-full items-center justify-center relative'>
                    <div>
                        <img src={burger} alt="" className='h-auto w-32 ml-10' />
                        <img src={sushi} alt="" className='h-auto w-56 mt-5' />
                    </div>
                    <div>
                        <img src={friedChicken} alt="" className='h-auto w-72' />
                    </div>
                    <div style={{zIndex:-1}} className='CIRCLE w-96 h-96 bg-blue-300 rounded-full absolute' ></div>
                    <div className='bg-red-500 w-fit text-xl absolute -top-3 left-[460px] text-white px-3 py-1 rounded-md'>
                    Available
                </div>
                </div>
            </div>
            <div className='RIGHT w-1/2 p-4 pl-10 text-center'>
                <h1 className='text-7xl font-bold mt-20'>Login</h1>
                <div className='ml-5'>
                    <p className='text-2xl mt-10 -ml-48'>Email</p>
                    <input value={email} onChange={handleEmailChange} className='border border-black text-xl px-1 py-1 outline-none w-[46%] ml-0 rounded-md bg-transparent' type="text"/><br/>
                    <p className='text-2xl mt-5 -ml-36'>Password</p>
                    <div className=' flex items-center border border-black w-fit ml-[27%] rounded-md'>
                        <input value={password} onChange={handlePasswordChange} className='border  text-xl px-1 py-1 w-fit outline-none rounded-md bg-transparent' type={inputType}/>
                        <button onClick={handleEye}>
                            {eyeActive? 
                            <i class="fa-regular fa-eye-slash pl-4 pr-3"></i>
                            :
                            <i class="fa-regular fa-eye pl-4 pr-3"></i>
                            }
                        </button>
                    </div>
                    <br/>
                    <button onClick={handleLogin} className='border border-black text-white bg-black p-2 mt-5 rounded-md text-2xl'>Login</button>
                    <p className='text-xl mt-6'>Don't have an account? <span onClick={()=>navigate('/register')} className='underline cursor-pointer'>Register</span> here</p>
                </div>
            </div>
        </div>
    )
}

export default Login
