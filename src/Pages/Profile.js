import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import defaultProfile from '../Assets/Images/Profile.png'
const Profile = () => {
    const [email,setEmail]=useState('')
    const [username,setUsername]=useState('')
    const [oldPassword,setOldPassword]=useState('')
    const [newPassword,setNewPassword]=useState('')
    const [profilePic,setProfilePic]=useState(null)

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handleOldPasswordChange = (e) => setOldPassword(e.target.value);
    const handleNewPasswordChange = (e) => setNewPassword(e.target.value);

    useEffect(()=>{
        const profileInfo = async()=>{
            const userId = localStorage.getItem('userId')
            const response = await axios.get(`http://localhost:5001/profile/${userId}`)
            console.log(response.data.userInfo)
            setEmail(response.data.userInfo.email)
            setUsername(response.data.userInfo.username)
        }
        profileInfo()
    },[])
    const handleUpdate =async()=>{
        try {
            const userId = localStorage.getItem('userId')
            const response = await axios.put(`http://localhost:5001/profile/${userId}`,{email,username})
            if(response.status === 200){
                toast.success('Updated Successfully')
            }
            else{
                toast.error('Failed to Update')
            }
        } catch (error) {
            toast.error('Something Went Wrong')
        }
    }
    const handlePasswordChange = async() =>{
        const userId = localStorage.getItem('userId')
        const response = await axios.patch(`http://localhost:5001/profile/${userId}`,{oldPassword,newPassword})
        if(response.status === 200){
            toast.success('Updated Successfully')
        }
        else if(response.status===401){
            toast.error('Wrong Old Password')
        }
        else{
            toast.error('Something Went Wrong')
        }
    }

    const handleFileChange =(e)=>{setProfilePic(e.target.files[0])}

    const handleFileUpload = async()=>{
        if(!profilePic){
            toast.error('Please select file first')
        }
        const formData = new FormData();
        formData.append('profilePic',profilePic)
        try {
            const response = await axios.post('http://localhost:5001/upload',formData,{
                headers:{
                    'Content-Type':"multipart/form-data",
                }
            })
            if(response.status===200){
                toast.success('File Uploaded Successfully')
            }
            else{
                toast.error('File Uploaded Failed')
            }
        } catch (error) {
            toast.error('Something Went Wrong')
        }
    }

    const handleClick = () =>{
        document.getElementById('input').click()
    }
    return (
        <div className='h-screen'>
            {/* <div className='flex flex-col gap-3'>
                <p className='text-xl'>Profile Picture:</p>
                <div onClick={handleClick} className='Profile-Preview-Circle w-40 h-40 bg-red-300 rounded-full'
                style={{backgroundImage:`url(${defaultProfile})`,
                    backgroundSize:'cover',
                    backgroundPosition:'center',
                    backgroundRepeat:'no-repeat'
                    }}  
                >
                    <input id='input' type="file" onChange={handleFileChange} className='w-full hidden'/>
                </div>

                <button onClick={handleFileUpload} className='border border-black px-3 py-1 rounded-lg w-fit'>upload</button>

            </div> */}




            <p className='mt-5 text-xl'>Email</p>
            <input value={email} onChange={handleEmailChange} className='border border-black px-1 text-2xl rounded-md bg-transparent outline-none' type="text" /><br/>
            <p className='mt-5 text-xl'>Username</p>
            <input value={username} onChange={handleUsernameChange} className='border border-black px-1 text-2xl rounded-md bg-transparent outline-none' type="text" /><br/>
            <button onClick={handleUpdate} className='border border-black px-3 py-1 rounded-lg mt-5 bg-black text-white'>Update</button>





            <p className='text-xl mt-10'>Password Change</p>
            <p className='mt-5 text-xl'>Old Password</p>
            <input value={oldPassword} onChange={handleOldPasswordChange} type="text" className='border border-black text-2xl bg-transparent rounded-lg outline-none px-1'/>
            <p className='mt-2 text-xl'>New Password</p>
            <input value={newPassword} onChange={handleNewPasswordChange} type="text" className='border border-black text-2xl bg-transparent rounded-lg outline-none px-1'/><br/>
            <button onClick={handlePasswordChange} className='border border-black px-3 py-1 rounded-lg mt-5 bg-black text-white'>Change</button>
        </div>
    )
}

export default Profile
