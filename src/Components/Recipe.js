import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Other from './Other';
import defaultImage from '../Assets/Images/image-square.png';
import "../App.css"
const Recipe = () => {
    const [state, setState] = useState(1);
    const [recipeData, setRecipeData] = useState({});
    const [validUser, setValidUser] = useState(false);
    const [userId, setUserId] = useState('');
    const { recipeId } = useParams();
    const [username,setUsername]=useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const getUserId = () => {
            const temp = localStorage.getItem('userId');
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
                // console.log('recipe id: ',recipeId)
                if (response.status === 200) {
                    setRecipeData(response.data.recipe);
                    setUsername(response.data.userInfo.username)
                    // console.log(response.data.userInfo.username); 
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
                // console.log('UserId does not match the recipe owner');
                setValidUser(false);
                return;
            }

            try {
                const response = await axios.post('http://localhost:5001/checkUserValidity', { userId });
                if (response.status === 200) {
                    setValidUser(true);
                    // console.log(response.data.checkUser.username)
                    setUsername(response.data.checkUser.username)
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
                    {recipeData.image ? 
                        <div style={{ 
                            backgroundImage: `url('${recipeData.image}')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                        }}
                            className='IMAGE bg-red-300 h-full w-1/3 rounded-lg'>
                        </div>
                        :
                        <div style={{ 
                            backgroundImage: `url('${defaultImage}')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                        }}
                            className='IMAGE bg-red-300 h-full w-1/3 rounded-lg'>
                        </div>
                    }
                    <div className='w-2/3 flex flex-col justify-between'>
                        <div>
                            <p className='text-xs -mb-1'>{recipeData.createdAt}</p>
                            <h1 className='text-4xl font-bold'>{recipeData.title}</h1>
                            <p className='text-xl mt-2'>{recipeData.shortDesc}</p>
                        </div>
                        <Other />
                    </div>
                </div>
                <div className='BOTTOM bg-green-300 w-full h-4/6 mt-5'>
                    <button className='border border-black px-2 mr-1' onClick={() => setState(1)}>Ingredients</button>
                    <button className='border border-black px-2 mr-1' onClick={() => setState(2)}>Recipe</button>
                    <button className='border border-black px-2' onClick={() => setState(3)}>Comments</button>
                    <div className='mt-3'>
                        {state === 1 ?
                            <div className='scrollable-content px-4' dangerouslySetInnerHTML={{ __html: recipeData.ingredients }} />
                            : state === 2 ?
                                <div className='scrollable-content px-4' dangerouslySetInnerHTML={{ __html: recipeData.recipe }} /> 
                                :
                                <div>
                                    Comment Section
                                </div>
                        }
                    </div>
                </div>
            </div>
            <div className='RIGHT w-1/4 h-[100vh]'>
                <div className='PROFILE h-40 px-5'>
                    <p>Posted By:</p>
                    <div className='flex items-center gap-5 mt-1 rounded-lg  cursor-pointer border border-gray-300 py-4'>
                        <div className='PROFILE_PICTURE w-20 h-20 ml-6 bg-yellow-300 rounded-full'></div>
                        <div>
                            <h1 className='text-2xl'>{username}</h1>
                            {/* <h2>UserId</h2> */}
                        </div>
                    </div>
                </div>
                <div className='SUGGESTIONS'></div>
            </div>
        </div>
    )
}

export default Recipe;
