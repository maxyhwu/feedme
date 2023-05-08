import './MyArchive.css';

import { UseDataContext } from "../Context/useUserData"

import { RecipeObject } from '../Recipe/recipe';

const MyArchive = () => {
    const { data } = UseDataContext();
    const favList = data.favorite;

    return (
        <div className="favRecipeList">
            {
                (favList == null || favList.length === 0)
                ? <h3 id="nothingText">Nothing here.<br/> Go find some nice recipes.</h3> 
                : <div className="savedRecipes-container">
                    {favList.map((recipe) => (
                        <RecipeObject
                            recipe={recipe}
                        />
                    ))}
                </div>
            }
        </div>
    )
}

export default MyArchive;