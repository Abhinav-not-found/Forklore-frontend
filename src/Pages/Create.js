import axios from 'axios'
import React, {  useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const Create = () => {
    const [title,setTitle]=useState('')
    const [shortDesc,setShortDesc]=useState('')
    const [image,setImage]=useState('')
    const [ingredients,setIngredients]=useState('')
    const [recipe,setRecipe]=useState('')
    const [userId,setUserId]=useState('')
    const [wordCount,setWordCount]=useState(0)
    const maxWords = 60;

    // console.log(ingredients)
    const navigate = useNavigate()

    useEffect(()=>{
        setUserId(localStorage.getItem('userId'))
    })

    const handleShortDescChange = (e) => {
        const text = e.target.value
        const words = text.trim().split(/\s+/).filter(word => word.length > 0)
        setWordCount(words.length)
        if (words.length <= maxWords) {
            setShortDesc(text)
        }
    }

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
            className='text-2xl px-1 outline-none bg-transparent border border-black rounded-md mb-5' type="text" required/>

            <p className='text-xl'>Short description</p>
            <textarea value={shortDesc} onChange={handleShortDescChange} cols='40' rows='5' className='text-2xl px-2 outline-none bg-transparent border border-black rounded-md' required></textarea>
            <p className='mb-5 text-end w-1/3 ml-10'>{wordCount}/{maxWords} words</p>

            <p className='text-xl'>Image</p>
            <input value={image} onChange={(e)=>setImage(e.target.value)} className='text-2xl px-1 outline-none bg-transparent border border-black rounded-md mb-5' type="text"/>

            <p className='text-xl'>Ingredients</p>
        <ReactQuill value={ingredients} onChange={setIngredients} className='w-1/2 h-48 outline-none bg-transparent mt-2 mb-20' required></ReactQuill>
            
            <p className='text-xl'>Recipe</p>
            <ReactQuill value={recipe} onChange={setRecipe} cols='60' rows='10' className='w-1/2 h-48 outline-none bg-transparent rounded-md mb-20' required></ReactQuill><br/>

            <button onClick={handleSubmit} className='border border-black rounded-lg px-3 py-1 mb-20' >Submit</button>
        </div>
    )
}

export default Create
