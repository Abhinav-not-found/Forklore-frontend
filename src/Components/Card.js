import React, { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Card = ({title,image,id}) => {
    const navigate = useNavigate()
    const [userId,setUserId]=useState('')
    useEffect(()=>{
        setUserId(localStorage.getItem('userId'))
    },[userId])
    const truncateTitle = (title) => {
        const words = title.split(' ');
        if (words.length > 2) {
            return `${words.slice(0, 2).join(' ')}...`;
        }
        return title;
        };
    
    return (
        <div onClick={()=>navigate(`/recipe/${id}`)} className=' shadow-md border-black w-fit p-3 rounded-lg flex flex-col items-center cursor-pointer bg-transparent'>
            <div style={{backgroundImage:`url('${image}')`,
            backgroundSize:'cover',
            backgroundPosition:'center',
            backgroundRepeat:'no-repeat'
            }}
            className='IMAGE h-28 w-36 bg-red-200 rounded-lg'>
            </div>
            <div className='mt-2 w-full px-1'>
                {title ? 
                <h1 className='text-lg text-start capitalize font-semibold'>
                    {truncateTitle(title)}
                </h1>
                :
                <h1 className='text-lg'>title</h1>
                }
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
