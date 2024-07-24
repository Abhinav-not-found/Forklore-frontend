import React from 'react'

const Create = () => {
    return (
        <div className='h-full'>
            <p className='text-xl'>Title</p>
            <input className='text-2xl px-1 outline-none bg-transparent border border-black rounded-md mb-5' type="text"/>

            <p className='text-xl'>Short description</p>
            <textarea cols='40' rows='5' className='text-2xl px-1 outline-none bg-transparent border border-black rounded-md mb-5'></textarea>

            <p className='text-xl'>Image</p>
            <input className='text-2xl px-1 outline-none bg-transparent border border-black rounded-md mb-5' type="text"/>

            <p className='text-xl'>Ingredients</p>
            <textarea cols='60' rows='10' className='text-2xl px-1 outline-none bg-transparent border border-black rounded-md mb-5'></textarea>

            <p className='text-xl'>Recipe</p>
            <textarea cols='60' rows='10' className='text-2xl px-1 outline-none bg-transparent border border-black rounded-md mb-5'></textarea>
            
        </div>
    )
}

export default Create
