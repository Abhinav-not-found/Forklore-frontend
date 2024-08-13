import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios'
import { useParams } from 'react-router-dom';
import Card from '../Components/Card';
const ProfilePage = () => {
    const {id} = useParams()
    // console.log(id)
    const [infoArr,setInfoArr]=useState('')
    const [userInfo,setUserInfo]=useState('')
    useEffect(()=>{
        const getInfoBasedOnUserId = async() =>{
            try {
                const response = await axios.get(`http://localhost:5001/getInfoUserId/${id}`)
                if(response.status === 200){
                    // console.log(response.data.getRecipe)
                    setInfoArr(response.data.getRecipe)
                }
            } catch (error) {
                console.log(error)
            }
        }
        const getUserInfo = async() =>{
            try {
                const response = await axios.get(`http://localhost:5001/getUserInfo/${id}`)
                if(response.status === 200){
                    // console.log(response.data.findUser)
                    setUserInfo(response.data.findUser)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getUserInfo()
        getInfoBasedOnUserId()
    },[id])
    return (
        <div className='h-screen'>
            <div className='USER_INFO flex items-center gap-4 mb-10'>
                <div className='bg-red-300 h-20 w-20 rounded-full flex items-center justify-center text-3xl' >{userInfo.username[0]}</div>
                <h1 className='text-3xl'>@{userInfo.username}</h1>
            </div>
            <div className='grid grid-cols-6 grid-rows-3 gap-y-5'>
            {Array.isArray(infoArr) && infoArr.map((recipe, index) => (
                <Card
                key={index}
                title={recipe.title}
                image={recipe.image}
                id={recipe._id}
                />
            ))}
            </div>
        </div>
    )
}

export default ProfilePage
