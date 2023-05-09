import './MyArchive.css';

import { UseDataContext } from "../Context/useUserData"
import { RecipeObject } from '../Recipe/recipe';
import { apiQueryRecipeByID } from '../axios/withToken'

const MyArchive = () => {
    const { data } = UseDataContext();
    const favList = data.like;

    return (
        <div className="favRecipeList">
            {
                (favList == null || favList.length === 0)
                ? <h3 id="nothingText">Nothing here.<br/> Go find some mouthwatering recipes.</h3> 
                : <div className="savedRecipes-container">
                    {favList.map((recipeID) => {
                        const recipe = apiQueryRecipeByID(recipeID).then((recipe) => {return recipe});
                        return (
                            <RecipeObject
                                recipe={{recipe}}
                            />
                        )
                    })}
                </div>
            }
        </div>
    )
}

export default MyArchive;