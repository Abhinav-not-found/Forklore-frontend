import React, { useState } from 'react'

const Recipe = () => {
    const [state,setState]=useState(1)
    return (
        <div className='flex'>
            <div className='LEFT w-3/4 h-[100vh]'>
                <div className='TOP w-full h-2/6 flex gap-6'>
                    <div className='bg-red-300 h-full w-80 rounded-lg'></div>
                    <div className='flex flex-col justify-between'>
                        <div>
                            <h1 className='text-4xl'>Heading</h1>
                            <p className='text-2xl'>Desc</p>
                        </div>
                        <div>
                            <p>others</p>
                        </div>
                    </div>
                </div>
                <div className='BOTTOM bg-green-300 w-full h-4/6 mt-5'>
                    <button className='border border-black px-2 mr-1' onClick={()=>setState(1)}>Ingredients</button>
                    <button className='border border-black px-2 mr-1' onClick={()=>setState(2)}>Recipe</button>
                    <button className='border border-black px-2' onClick={()=>setState(3)}>Comments</button>
                    <div className='mt-3'>
                        {state===1?
                            <div>
                                Ingredients Page
                            </div>
                            : state===2?
                            <div>
                                Recipe Page
                            </div>
                            : 
                            <div>
                                Comment Section
                            </div>
                        }
                        
                
                    </div>
                </div>
            </div>
            <div className='RIGHT w-1/4 h-[100vh] '>
                <div className='PROFILE  h-40 px-5'>
                    <p>Posted By:</p>
                    <div className='flex items-center gap-5 mt-5'>
                        <div className='PROFILE_PICTURE w-20 h-20 ml-6 bg-yellow-300 rounded-full'></div>
                        <div>
                            <h1 className='text-2xl'>Name</h1>
                            <h2>UserId</h2>
                        </div>
                    </div>
                </div>
                <div className='SUGGESTIONS'></div>
            </div>
        </div>
    )
}

export default Recipe
