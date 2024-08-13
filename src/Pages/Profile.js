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
    const [profilePicURL,setProfilePicURL]=useState(null)

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handleOldPasswordChange = (e) => setOldPassword(e.target.value);
    const handleNewPasswordChange = (e) => setNewPassword(e.target.value);

    useEffect(()=>{
        const profileInfo = async()=>{
            const userId = localStorage.getItem('userId')
            const response = await axios.get(`http://localhost:5001/profile/${userId}`)
            // console.log(response.data.userInfo)
            setEmail(response.data.userInfo.email)
            setUsername(response.data.userInfo.username)
            setProfilePic(response.data.userInfo.profilePic)
            
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



    const handleFileChange =(e)=>{
        const file = e.target.files[0];
        if (file) {
            setProfilePic(file);
            setProfilePicURL(URL.createObjectURL(file));
        } else {
            toast.error('No file selected!');
        }
    }

    const handleFileUpload = async () => {
        if (!profilePic) {
            toast.error('Please select a file first');
            return;
        }
    
        const formData = new FormData();
        formData.append('profilePic', profilePic);
        formData.append('userId', localStorage.getItem('userId'));

        console.log('FormData entries:', formData.entries())
    
        try {
            const response = await axios.post('http://localhost:5001/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
    
            if (response.status === 200) {
                toast.success('Profile picture updated successfully');
                setProfilePic(response.data.filePath)
                setProfilePicURL(null)
            } else {
                toast.error('File upload failed');
            }
        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
            toast.error('Something went wrong');
        }
    };
    

    const handleClick = () =>{
        document.getElementById('input').click()
    }
    return (
        <div className='h-screen'>

{/* 
            <div className='flex flex-col gap-3'>
                <p className='text-xl'>Profile Picture:</p>
                <div onClick={handleClick} className='Profile-Preview-Circle cursor-pointer w-40 h-40 rounded-full'
                style={{backgroundImage:`url(${profilePicURL || (profilePic ? `http://localhost:5001/${profilePic}` : defaultProfile)})`,
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
