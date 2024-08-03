import React, { useState } from 'react'

const Comment = () => {
    const [typeBox,setTypeBox]=useState(false)
    const [comment,setComment]=useState('')
    // console.log(comment)
    const handleCommentAdd =()=>{
        if(typeBox){
            setTypeBox(false)
        }
        else{
            setTypeBox(true)
        }
    }
    const checkEnter = (e)=>{
        if(e.key === 'enter'){
            alert('Enter Pressed')
        }
    }
    return (
        <div className='px-4 scrollable-content'>
            <div className='VIEW bg-red-400 w-fit px-4 py-1 rounded-xl'>
                <p className='text-sm -mb-1'>@username</p>
                <p className='text-lg'>commment</p>
            </div>
            <button onClick={handleCommentAdd} className='border border-black px-3 py-1'>Add</button>
            {
                typeBox? 
                <div className='TYPE-BOX w-1/2 h-40 bg-slate-300 flex items-center justify-center p-4 rounded-lg'>
                    <textarea onKeyDown={checkEnter} value={comment} onChange={(e)=>{setComment(e.target.value)}} className='w-full h-full resize-none outline-none'></textarea>
                </div>
                :
                <></>
            }
            
        </div>
    )
}

export default Comment
