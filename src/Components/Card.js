import React from 'react'
import { useNavigate } from 'react-router-dom'

const Card = () => {
    const navigate = useNavigate()
    return (
        <div onClick={()=>navigate('/recipe')} className='border border-black w-fit p-2 rounded flex flex-col items-center cursor-pointer bg-[#f2efea]'>
            <div className='h-20 w-24 bg-red-200 rounded-lg'>
                
            </div>
            <div className=''>
                <h1 className='text-lg'>Title</h1>
                <div>
                    <i className="fa-regular fa-star text-sm"></i>
                    <i className="fa-regular fa-star text-sm"></i>
                    <i className="fa-regular fa-star text-sm"></i>
                    <i className="fa-regular fa-star text-sm"></i>
                    <i className="fa-regular fa-star text-sm"></i>
                </div>
            </div>
        </div>
    )
}

export default Card
