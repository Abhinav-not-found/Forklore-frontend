import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Card from '../Components/Card';

const MyRecipe = () => {
    const [userId, setUserId] = useState('');
    const [arr, setArr] = useState([]);

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    useEffect(() => {
        if (!userId) {
            return;
        }
        const getMyRecipe = async () => {
            try {
                const response = await axios.get(`https://froklore-backend.onrender.com/getRecipe/${userId}`);
                if (response.status === 200) {
                    setArr(response.data);
                } else if (response.status === 201) {
                    console.log('User does not exist');
                }
            } catch (error) {
                console.log(error);
            }
        };
        getMyRecipe();
    }, [userId]);

    return (
        <div className='h-screen'>
            <h1 className='font-semibold'>My Recipes</h1>
            <div className=' grid grid-cols-6 gap-y-7 gap-x-10'>
                {arr.map((recipe, index) => (
                    <Card
                    key={index}
                    title={recipe.title}
                    image={recipe.image}
                    id={recipe._id}
                    />
                ))}
            </div>
        </div>
    )
}

export default MyRecipe
