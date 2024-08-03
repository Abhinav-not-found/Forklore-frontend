import React from 'react';
import { useNavigate } from 'react-router-dom';
import defaultImage from '../Assets/Images/image-square.png'
const Card = ({ title, image, id }) => {
    const navigate = useNavigate();
    const truncateTitle = (title) => {
        const words = title.split(' ');
        if (words.length > 2) {
            return `${words.slice(0, 2).join(' ')}...`;
        }
        return title;
    };

    return (
        <div 
            onClick={() => navigate(`/recipe/${id}`)} 
            className='shadow-md border-black w-fit p-3 rounded-lg flex flex-col items-center cursor-pointer bg-transparent'
        >
            { image ? 
                <div
                style={{
                    backgroundImage: `url('${image}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
                className='IMAGE h-28 w-36 bg-red-200 rounded-lg'
                />
                :
                <div
                    style={{
                        backgroundImage: `url('${defaultImage}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                    className='IMAGE h-28 w-36 bg-green-200 rounded-lg'
                />
            } 
            
            <div className='mt-2 w-full px-1'>
                {title ? 
                <h1 className='text-lg text-start capitalize font-semibold'>
                    {truncateTitle(title)}
                </h1>
                :
                <h1 className='text-lg'>title</h1>
                }
                
            </div>
        </div>
    );
};

export default Card;
