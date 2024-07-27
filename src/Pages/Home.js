import React, { useEffect, useState } from 'react';
import Card from '../Components/Card';
import axios from 'axios';

const Home = () => {
    const [userId, setUserId] = useState('');
    const [allRecipe,setAllRecipe]=useState([])
    const [arr,setArr]=useState([])
    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);
    // console.log('hello',userId)

    useEffect(() => {
        if (!userId) {
            return;
        }
        // console.log('hello' ,userId)
        const getMyRecipe = async () => {
            try {
                // console.log("inside function",userId)
                const response = await axios.get(`http://localhost:5001/getRecipe/${userId}`);
                if (response.status === 200) {
                    // console.log(response.data);
                    setArr(response.data)
                    // console.log(arr)
                }
                else if(response.status === 201){
                    console.log('user doesnot exist')
                }
            } catch (error) {
                console.log(error);
            }
        };
        getMyRecipe();
    }, [userId]);
    useEffect(()=>{
        try {
            const getAllRecipe = async()=>{
                try {
                    const response = await axios.get('http://localhost:5001/getAllRecipe')
                    if(response.status===200){
                        setAllRecipe(response.data)
                        // console.log(allRecipe)
                    }
                    else{
                        console.log('no data')
                    }
                } catch (error) {
                    console.log(error)
                }
            }
            getAllRecipe()
        } catch (error) {
            console.log(error)
        }
    },[])
    return (
        <div className='h-full'>
            <h1>All Recipes</h1>
            <div className='grid grid-cols-6 grid-rows-3 gap-y-0'>
                {Array.isArray(allRecipe) && allRecipe.map((recipe,index)=>(
                    
                    <Card key={index} 
                    title={recipe.title} 
                    image={recipe.image}
                    id={recipe._id}
                    />
                ))}
                
            </div>
            <h1>My Recipes</h1>
            <div className='grid grid-cols-6 grid-rows-3 gap-y-5'>
                {arr.map((recipe,index)=>(
                    <Card
                    key={index}
                    title={recipe.title}
                    image={recipe.image}
                    id={recipe._id}
                    // {...console.log(recipe._id)}
                    />
                ))}
            
            </div>
        </div>
    );
};

export default Home;
