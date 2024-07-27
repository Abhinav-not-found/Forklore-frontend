import axios from 'axios'
import React, {  useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Create = () => {
    const [title,setTitle]=useState('')
    const [shortDesc,setShortDesc]=useState('')
    const [image,setImage]=useState('')
    const [ingredients,setIngredients]=useState('')
    const [recipe,setRecipe]=useState('')
    const [userId,setUserId]=useState('')

    const navigate = useNavigate()

    useEffect(()=>{
        setUserId(localStorage.getItem('userId'))
    })

    const handleSubmit =async()=>{
        try {
            const response = await axios.post(`http://localhost:5001/create/${userId}`,{title,shortDesc,image,ingredients,recipe})
            if(response.status === 200){
                toast.success('Recipe Created Successfully')
                navigate('/')
            }
        } catch (error) {
            toast.error('Something Went Wrong')
        }
    }
    return (
        <div className='h-full'>
            <p className='text-xl'>Title</p>
            <input value={title} onChange={(e)=>setTitle(e.target.value)}
            className='text-2xl px-1 outline-none bg-transparent border border-black rounded-md mb-5' type="text"/>

            <p className='text-xl'>Short description</p>
            <textarea value={shortDesc} onChange={(e)=>setShortDesc(e.target.value)} cols='40' rows='5' className='text-2xl px-1 outline-none bg-transparent border border-black rounded-md mb-5'></textarea>

            <p className='text-xl'>Image</p>
            <input value={image} onChange={(e)=>setImage(e.target.value)} className='text-2xl px-1 outline-none bg-transparent border border-black rounded-md mb-5' type="text"/>

            <p className='text-xl'>Ingredients</p>
            <textarea value={ingredients} onChange={(e)=>setIngredients(e.target.value)} cols='60' rows='10' className='text-2xl px-1 outline-none bg-transparent border border-black rounded-md mb-5'></textarea>
            
            <p className='text-xl'>Recipe</p>
            <textarea value={recipe} onChange={(e)=>setRecipe(e.target.value)} cols='60' rows='10' className='text-2xl px-1 outline-none bg-transparent border border-black rounded-md mb-5'></textarea><br/>

            <button onClick={handleSubmit} className='border border-black rounded-lg px-3 py-1 mb-20' >Submit</button>
        </div>
    )
}

export default Create
