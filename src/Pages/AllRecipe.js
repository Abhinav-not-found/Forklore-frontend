import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Card from '../Components/Card';

const AllRecipe = () => {
    const [allRecipe, setAllRecipe] = useState([]);
    useEffect(() => {
        const getAllRecipe = async () => {
            try {
                const response = await axios.get('https://froklore-backend.onrender.com/getAllRecipe');
                if (response.status === 200) {
                    setAllRecipe(response.data);
                } else {
                    console.log('No data');
                }
            } catch (error) {
                console.log(error);
            }
        };
        getAllRecipe();
    }, []);
    return (
        <div className='h-screen'>
            <div className='grid grid-cols-6 grid-rows-3 gap-y-5'>
                {Array.isArray(allRecipe) && allRecipe.map((recipe, index) => (
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

export default AllRecipe
