// Other.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

const Other = ({ handleEdit }) => {
    const [recipeData, setRecipeData] = useState('');
    const [validUser, setValidUser] = useState(false);
    const [userId, setUserId] = useState('');
    const [liked, setLiked] = useState(false);
    const [likeCounter, setLikeCounter] = useState(0); // Initialize with 0
    const { recipeId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getUserId = () => {
            const temp = localStorage.getItem('userId');
            setUserId(temp);
        };
        getUserId();

        const getRecipeData = async () => {
            if (!recipeId) {
                return;
            }
            try {
                const response = await axios.get(`https://froklore-backend.onrender.com/recipe/${recipeId}`);
                if (response.status === 200) {
                    setRecipeData(response.data.recipe);
                } else {
                    console.log('Nothing Found');
                }
            } catch (error) {
                console.log(error);
            }
        };

        const checkValidUser = async (recipeOwnerId) => {
            if (!userId || userId.trim() === "") {
                return;
            }

            if (userId !== recipeOwnerId) {
                setValidUser(false);
                return;
            }

            try {
                const response = await axios.post('https://froklore-backend.onrender.com/checkUserValidity', { userId });
                if (response.status === 200) {
                    setValidUser(true);
                } else {
                    setValidUser(false);
                }
            } catch (error) {
                console.log("Error in checkValidUser", error);
            }
        };

        const fetchData = async () => {
            await getRecipeData();
            if (recipeData.userId) {
                await checkValidUser(recipeData.userId);
            }

            // Fetch like info
            try {
                const response = await axios.get(`https://froklore-backend.onrender.com/getLikeInfo/${recipeId}`);
                if (response.status === 200) {
                    setLikeCounter(response.data.data.like.length);
                    setLiked(response.data.data.like.includes(userId));
                }
            } catch (error) {
                // console.log(error);
            }
        };

        fetchData();
    }, [recipeId, userId, recipeData.userId]);

    const handleDelete = async () => {
        if (window.confirm('Are you sure?')) {
            try {
                const response = await axios.delete(`https://froklore-backend.onrender.com/delete/${recipeId}`);
                if (response.status === 200) {
                    toast.success('Deleted Successfully');
                    navigate('/');
                } else {
                    toast('Delete Failed');
                }
            } catch (error) {
                console.log('Error in deleting:', error);
            }
        }
    };

    const handleLike = () => {
        if (liked) {
            setLiked(false);
            setLikeCounter(likeCounter - 1);
            handleUnLikeReq();
        } else {
            setLiked(true);
            setLikeCounter(likeCounter + 1);
            handleLikeReq();
        }
    };

    const handleLikeReq = async () => {
        try {
            const response = await axios.put('https://froklore-backend.onrender.com/like', { userId, recipeId });
            if (response.status === 200 || response.status === 201) {
                console.log('like added');
            } else if (response.status === 400) {
                console.log('User already Liked');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleUnLikeReq = async () => {
        try {
            const response = await axios.put('https://froklore-backend.onrender.com/unLike', { userId, recipeId });
            if (response.status === 200) {
                console.log('like removed');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='flex gap-5 items-center'>
            {liked ? (
                <div className='flex gap-1 items-center'>
                    <button onClick={handleLike} className='LIKE'>
                        <i className="fa-solid fa-heart text-xl"></i>
                    </button>
                    <p className='text-xl'>{likeCounter}</p>
                </div>
            ) : (
                <div className='flex gap-1 items-center'>
                    <button onClick={handleLike} className='LIKE hover:text-red-600'>
                        <i className="fa-regular fa-heart text-xl"></i>
                    </button>
                    <p className='text-xl'>{likeCounter}</p>
                </div>
            )}

            {validUser ? (
                <div className='flex gap-5'>
                    <button className='Edit hover:text-yellow-500' onClick={handleEdit}>
                        <i className="fa-regular fa-pen-to-square text-xl"></i>
                    </button>
                    <button onClick={handleDelete} className='Delete hover:text-red-600'>
                        <i className="fa-solid fa-trash text-xl"></i>
                    </button>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default Other;
