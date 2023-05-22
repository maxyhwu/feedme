import './MyArchive.css';
import { useState, useEffect } from "react";
import { UseDataContext } from "../Context/useUserData"
import { RecipeObject } from '../Recipe/recipe';
import { apiQueryRecipeByID } from '../axios/withToken'
import { recipe_data } from "../Recipe/recipedata";

const MyArchive = () => {
    const { data } = UseDataContext();
    const [favList, setFavList] = useState(null);
    useEffect(() => {
        setFavList(data.like);
    }, []);
    
    return (
        <div className="favRecipeList">
            {
                (favList == null || favList.length === 0)
                ? <h3 id="nothingText">Nothing here.<br/> Go find some mouthwatering recipes.</h3> 
                : <div className="savedRecipes-container">
                    {favList.map((recipeID, index) => {
                        // const recipeAPI = apiQueryRecipeByID(recipeID).then((recipe) => {return recipe});
                        const recipe = recipe_data[recipeID];
                        return (
                            <RecipeObject
                                key={index} recipe={recipe}
                            />
                        )
                    })}
                </div>
            }
        </div>
    )
}

export default MyArchive;