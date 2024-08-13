import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the Quill styles
import toast from 'react-hot-toast';

const EditPage = () => {
    const { recipeId } = useParams();
    const [recipeData, setRecipeData] = useState({});
    const [title, setTitle] = useState('');
    const [shortDesc, setShortDesc] = useState('');
    const [image, setImage] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [recipe, setRecipe] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const getRecipeData = async () => {
            try {
                const response = await axios.get(`https://froklore-backend.onrender.com/recipe/${recipeId}`);
                if (response.status === 200) {
                    const data = response.data.recipe;
                    setRecipeData(data);
                    setTitle(data.title);
                    setShortDesc(data.shortDesc);
                    setImage(data.image);
                    setIngredients(data.ingredients);
                    setRecipe(data.recipe);
                } else {
                    console.log('Recipe not found');
                }
            } catch (error) {
                console.log(error);
            }
        };

        getRecipeData();
    }, [recipeId]);

    const handleSave = async () => {
        try {
            const response = await axios.patch(`https://froklore-backend.onrender.com/updateRecipe/${recipeId}`, {
                title,
                shortDesc,
                image,
                ingredients,
                recipe,
            });
            if (response.status === 200) {
                toast.success('Updated')
                navigate(`/recipe/${recipeId}`);
            } else {
                toast.error('Error')
                console.log('Update failed');
            }
        } catch (error) {
            console.log('Error in updating recipe:', error);
        }
    };

    const handleCancel = () => {
        navigate(`/recipe/${recipeId}`);
    };

    return (
        <div className="h-full flex flex-col w-fit">
            <h1>Edit Recipe</h1>

            <label className='text-2xl mt-5 mb-1'>Title</label>
            <input className=' w-fit text-xl px-2 py-1 rounded-lg outline-none bg-transparent border border-black' type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

            <label className='text-2xl mt-5 mb-1'>Short Description</label>
            <textarea cols='50' rows='7' className='text-xl px-2 py-1 rounded-lg outline-none bg-transparent border border-black' type="text" value={shortDesc} onChange={(e) => setShortDesc(e.target.value)} />

            <label className='text-2xl mt-5 mb-1'>Image URL</label>
            <input className=' w-full text-xl px-2 py-1 rounded-lg outline-none bg-transparent border border-black' type="text" value={image} onChange={(e) => setImage(e.target.value)} />

            <label className='text-2xl mt-5 mb-1'>Ingredients</label>
            <ReactQuill theme="snow" value={ingredients} onChange={setIngredients} />

            <label className='text-2xl mt-5 mb-1'>Recipe</label>
            <ReactQuill theme="snow" value={recipe} onChange={setRecipe} />

            <div className="buttons flex gap-4 mt-5 mb-10">
                <button className='border border-black px-3 py-1 rounded hover:bg-red-300' onClick={handleCancel}>Cancel</button>
                <button className='border border-black px-3 py-1 rounded hover:bg-green-300' onClick={handleSave}>Save</button>
            </div>
        </div>
    );
};

export default EditPage;
