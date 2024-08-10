import React from 'react'
import { useNavigate } from 'react-router-dom'

const SuggestionCard = ({title,image,id}) => {
    const navigate = useNavigate()
    return (
        <div onClick={()=>{navigate(`/recipe/${id}`)}} className='border border-gray-300 px-2 py-2 rounded-md flex items-center gap-5 cursor-pointer'>
            <div className='IMAGE h-16 w-16 rounded-md bg-blue-400'
                style={{
                    backgroundImage:`url('${image}')`,
                    backgroundRepeat:'no-repeat',
                    backgroundSize:'cover',
                    backgroundPosition:'center'
                }}
            ></div>
            <h1 className='text-2xl font-semibold'>{title}</h1>
        </div>
    )
}

export default SuggestionCard
