import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

const Other = () => {
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
                const response = await axios.get(`http://localhost:5001/recipe/${recipeId}`);
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
                const response = await axios.post('http://localhost:5001/checkUserValidity', { userId });
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
                const response = await axios.get(`http://localhost:5001/getLikeInfo/${recipeId}`);
                if (response.status === 200) {
                    setLikeCounter(response.data.data.like.length);
                    setLiked(response.data.data.like.includes(userId));
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [recipeId, userId, recipeData.userId]);

    const handleDelete = async () => {
        if (window.confirm('Are you sure?')) {
            try {
                const response = await axios.delete(`http://localhost:5001/delete/${recipeId}`);
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
            const response = await axios.put('http://localhost:5001/like', { userId, recipeId });
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
            const response = await axios.put('http://localhost:5001/unLike', { userId, recipeId });
            if (response.status === 200) {
                console.log('like removed');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='flex gap-2 items-center'>
            <div className='STAR-RATING'>
                <i className="fa-regular fa-star text-xl"></i>
                <i className="fa-regular fa-star text-xl"></i>
                <i className="fa-regular fa-star text-xl"></i>
                <i className="fa-regular fa-star text-xl"></i>
                <i className="fa-regular fa-star text-xl"></i>
            </div>
            {liked ? (
                <div className='flex gap-1 items-center'>
                    <button onClick={handleLike} className='LIKE'>
                        <i className="fa-solid fa-heart text-xl"></i>
                    </button>
                    <p className='text-xl'>{likeCounter}</p>
                </div>
            ) : (
                <div className='flex gap-1 items-center'>
                    <button onClick={handleLike} className='LIKE'>
                        <i className="fa-regular fa-heart text-xl"></i>
                    </button>
                    <p className='text-xl'>{likeCounter}</p>
                </div>
            )}

            {validUser ? (
                <div className='flex gap-2'>
                    <button className='Edit'>
                        <i className="fa-regular fa-pen-to-square text-xl"></i>
                    </button>
                    <button onClick={handleDelete} className='Delete'>
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
