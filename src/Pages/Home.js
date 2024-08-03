import React, { useEffect, useState } from 'react';
import Card from '../Components/Card';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [userId, setUserId] = useState('');
    const [allRecipe, setAllRecipe] = useState([]);
    const [arr, setArr] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    useEffect(() => {
        if (!userId) {
            return;
        }
        const getMyRecipe = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/getRecipe/${userId}`);
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

    useEffect(() => {
        const getAllRecipe = async () => {
            try {
                const response = await axios.get('http://localhost:5001/getAllRecipe');
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
    const displayedRecipes = allRecipe.slice(0, 12);
    return (
        <div className=''>
            {isLoggedIn ? (
                <div className='h-full pb-10'>
                    <div className='flex justify-between'>
                        <h1>All Recipes</h1>
                        <button onClick={()=>navigate('/allRecipe')}>See All</button>
                    </div>
                    <div className='grid grid-cols-6 grid-rows-2 gap-y-7 gap-x-10 mb-12'>
                        {Array.isArray(displayedRecipes) && displayedRecipes.map((recipe, index) => (
                            <Card
                                key={index}
                                title={recipe.title}
                                image={recipe.image}
                                id={recipe._id}
                            />
                        ))}
                    </div>
                    <div className='flex justify-between'>
                        <h1>My Recipes</h1>
                        <button onClick={()=>navigate('/myRecipe')}>See All</button>
                    </div>
                    <div className='grid grid-cols-6 gap-y-7 gap-x-10'>
                        {arr.slice(0,12).map((recipe, index) => (
                            <Card
                                key={index}
                                title={recipe.title}
                                image={recipe.image}
                                id={recipe._id}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <div className='h-full pb-10'>
                    <h1>All Recipes</h1>
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
            )}
        </div>
    );
};

export default Home;
