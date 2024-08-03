import React from 'react'

const SuggestionCard = ({title,image}) => {
    return (
        <div className='border border-gray-300 px-2 py-2 rounded-md flex items-center gap-5'>
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
