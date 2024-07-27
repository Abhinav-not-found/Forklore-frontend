import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Recipe = () => {
    const [state, setState] = useState(1);
    const [recipeData, setRecipeData] = useState('');
    const [validUser, setValidUser] = useState(false);
    const [userId, setUserId] = useState('');
    const { recipeId } = useParams();

    useEffect(() => {
        const getUserId = () => {
            const temp = localStorage.getItem('userId');
            console.log("Retrieved userId from local storage: ", temp);
            setUserId(temp);
        }
        getUserId();

        const getRecipeData = async () => {
            if (!recipeId) {
                console.log('Missing recipeId');
                return;
            }
            try {
                const response = await axios.get(`http://localhost:5001/recipe/${recipeId}`);
                if (response.status === 200) {
                    setRecipeData(response.data);
                } else {
                    console.log('Nothing Found');
                }
            } catch (error) {
                console.log(error);
            }
        }

        const checkValidUser = async (recipeOwnerId) => {
            if (!userId || userId.trim() === "") {
                console.log("Invalid userId: ", userId);
                return;
            }

            if (userId !== recipeOwnerId) {
                console.log('UserId does not match the recipe owner');
                setValidUser(false);
                return;
            }

            try {
                const response = await axios.post('http://localhost:5001/checkUserValidity', { userId });
                if (response.status === 200) {
                    console.log('User is valid');
                    setValidUser(true);
                } else {
                    console.log('User is Invalid');
                    setValidUser(false);
                }
            } catch (error) {
                console.log("Error in checkValidUser", error);
            }
        }

        const fetchData = async () => {
            await getRecipeData();
            if (recipeData.userId) {
                await checkValidUser(recipeData.userId);
            }
        }

        fetchData();
    }, [recipeId, userId, recipeData.userId]);

    return (
        <div className='flex'>
            <div className='LEFT w-3/4 h-[100vh]'>
                <div className='TOP w-full h-2/6 flex gap-6'>
                    <div style={{ backgroundImage: `url('${recipeData.image}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat '
                    }}
                        className='IMAGE bg-red-300 h-full w-1/3 rounded-lg'></div>
                    <div className='w-2/3 flex flex-col justify-between'>
                        <div>
                            <h1 className='text-4xl font-bold'>{recipeData.title}</h1>
                            <p className='text-xl mt-2'>{recipeData.shortDesc}</p>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <div className='STAR-RATING'>
                                <i className="fa-regular fa-star text-xl"></i>
                                <i className="fa-regular fa-star text-xl"></i>
                                <i className="fa-regular fa-star text-xl"></i>
                                <i className="fa-regular fa-star text-xl"></i>
                                <i className="fa-regular fa-star text-xl"></i>
                            </div>
                            <button className='LIKE'>
                                <i className="fa-regular fa-heart text-xl"></i>
                            </button>
                            {validUser ?
                                <div className='flex gap-2'>
                                    <button className='Edit'>
                                        <i className="fa-regular fa-pen-to-square text-xl"></i>
                                    </button>
                                    <button className='Delete'>
                                        <i className="fa-solid fa-trash text-xl"></i>
                                    </button>
                                </div>
                                :
                                <></>
                            }
                        </div>
                    </div>
                </div>
                <div className='BOTTOM bg-green-300 w-full h-4/6 mt-5'>
                    <button className='border border-black px-2 mr-1' onClick={() => setState(1)}>Ingredients</button>
                    <button className='border border-black px-2 mr-1' onClick={() => setState(2)}>Recipe</button>
                    <button className='border border-black px-2' onClick={() => setState(3)}>Comments</button>
                    <div className='mt-3'>
                        {state === 1 ?
                            <div>
                                {recipeData.ingredients}
                            </div>
                            : state === 2 ?
                                <div>
                                    {recipeData.recipe}
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
                <div className='PROFILE h-40 px-5'>
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

export default Recipe;
