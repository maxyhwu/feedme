import './MyArchive.css';
import { useState, useEffect } from "react";
import { UseDataContext } from "../Context/useUserData"
import { UseGeneralContext } from '../Context/generalTables'
import { RecipeObject } from '../Recipe/recipe';
import { apiQueryRecipeByID } from '../axios/withToken'
import { recipe_data } from "../Recipe/recipedata";

const MyArchive = () => {
    const { data } = UseDataContext();
    const { id2ingredient } = UseGeneralContext();
    // const [favList, setFavList] = useState([]);
    const [recipeList, setRecipeList] = useState([]);
    
    useEffect(() => {
        const likeData = [...new Set(data.like)];
        console.log(likeData);
        
        const fetchData = async () => {
            const promises = likeData.map((recipeID) =>
                apiQueryRecipeByID(recipeID)
                    .then((value) => parseData(value.data.rows[0]))
                    .catch((error) => {
                        // console.error(`Error fetching recipe with ID ${recipeID}:`, error);
                        return null; // Return null or any other value to indicate failure
                    })
            );
            
            try {
                const results = await Promise.all(promises);
                const filteredResults = results.filter((result) => result !== null); // Exclude failed promises
                setRecipeList(filteredResults);
            } catch (error) {
                console.error('Error occurred while fetching recipes:', error);
            }
        };
    
        fetchData();
    }, []);

    const parseData = (data) => {
        const { id, title, overview, servingSize, instructions, image, video, likeCount, labels, ingredients, comments, createdAt, updatedAt, userName } = data;
        const formatIngredients = Object.entries(ingredients).map(([id, amount]) => [id2ingredient[id], amount]);  // ...amount => ! amount is not iterable
        const parsedData = {
            recipeID: id,
            recipeName: title,
            serving: servingSize,
            ingredients: formatIngredients,
            instructions: instructions,
            image_link: image,
        }
        return parsedData;
    };

    console.log(recipeList);
    
    return (
        <div className="favRecipeList">
            {
                (recipeList == null || recipeList.length === 0)
                ? <h3 id="nothingText">Nothing here.<br/> Go find some mouthwatering recipes.</h3> 
                : <div className="savedRecipes-container">
                    {/* {favList.map((recipeID, index) => {
                        // const recipeAPI = apiQueryRecipeByID(recipeID).then((recipe) => {return recipe});
                        const recipe = recipe_data[recipeID];
                        return (
                            <RecipeObject
                                key={index} recipe={recipe}
                            />
                        )
                    })} */}

                    {recipeList.map((recipe, index) => (
                        <RecipeObject
                            key={index}
                            recipe={recipe}
                        />
                    ))}
                </div>
            }
        </div>
    )
}

export default MyArchive;