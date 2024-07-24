import React from 'react'
import Card from '../Components/Card'

const Home = () => {
    return (
        <div className='h-screen'>
                
            <div className='grid grid-cols-9 grid-rows-3 gap-y-5'>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
            </div>
        </div>
    )
}

export default Home
