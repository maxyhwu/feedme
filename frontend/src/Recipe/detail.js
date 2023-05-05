import "./detail.css"
import { IoCloseCircleOutline } from 'react-icons/io5';
import ActionBar from "./Components/ActionBar";
import { useNavigate } from "react-router-dom";
import { recipe_data } from "../Recipe/recipedata";


const Detail = () => {

    const navigate = useNavigate();
    const navigateToRecipe = () => {
        navigate('/recipe');
    }

    return(
        <div className="background-page">
        <div className="modal-container">
            <div className="modal-left">
                <div className="top-part">
                    <div className="image">
                        <img src="https://sudachirecipes.com/wp-content/uploads/2022/08/beef-curry-rice-thumbnail.jpg" alt="" />
                    </div>
                    <div className="description">
                        <div className="title"> Curry Rice </div>
                        <div className="serving-size"> For 4 people </div>
                        <div className="change-btn">
                            <button> Change serving size </button>
                        </div>
                    </div>
                </div>
                <ActionBar />
                <div className="ingredients">
                    <div className="topic">Ingredients</div>
                    <div className="content">
                        <ul>
                            <li>2 cups Japanese rice</li>
                            <li>4 cups water</li>
                            <li>1 large onion, chopped</li>
                            <li>2 carrots, chopped</li>
                            <li>2 potatoes, chopped</li>
                            <li>1 lb. chicken or beef, cut into bite-sized pieces</li>
                            <li>2 tbsp. vegetable oil</li>
                            <li>1 box (8.4 oz.) Japanese curry roux</li>
                            <li>Salt and pepper to taste</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="modal-right">
                <div className="exit">
                    <IoCloseCircleOutline size={25} onClick={navigateToRecipe}/>
                </div>
                <div className="instructions">
                    <div className="topic">Instructions</div>
                    <div className="content">
                        <ol>
                            <li>Rinse the rice in a strainer and let it soak in water for 30 minutes.</li>
                            <li>In a large pot, heat the vegetable oil over medium heat. Add the chopped onions and cook until they are translucent.</li>
                            <li>Add the chicken or beef to the pot and cook until it's no longer pink.</li>
                            <li>Add the chopped carrots and potatoes to the pot and cook for a few minutes until they start to soften.</li>
                            <li>Add 4 cups of water to the pot and bring it to a boil.</li>
                            <li>Turn the heat down to low and simmer for about 20 minutes until the vegetables are fully cooked.</li>
                            <li>Add the curry roux to the pot and stir until it dissolves. Simmer for another 10 minutes until the curry thickens.</li>
                            <li>Season with salt and pepper to taste.</li>
                            <li>To make the rice, drain the water from the rice and put it in a rice cooker with 2 cups of water. Cook according to the manufacturer's instructions.</li>
                            <li>Serve the curry over the rice and enjoy!</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
        <div className="comment-container">
            <div className="comment">Comments</div>
            <div className="single-comment-container">Very impressive!</div>
            <div className="single-comment-container">This looks soooooo delicious.</div>
            <div className="single-comment-container">I love curry~</div>
            <div className="comment-input">
                <input classname= "input-text" type = "text" placeholder="leave your comment..."/>
                <input classname= "submit-text" type = "submit"/>
            </div>
        </div>
        </div>
    )
}


const RecipeDetail = ({ recipe, handleCloseModal }) => {
    const { recipeID, recipeName, serving, ingredients, instructions, image_link } = recipe

    const comments = [
        {
            name: 'Teresa',
            content: 'Very impressive.',
            time: '12:00'
        },
        {
            name: 'Bob',
            content: 'Delicious~',
            time: '3:12'
        }
    ]

    return(
        <>
            <div className="exit">
                <IoCloseCircleOutline size={25} onClick={handleCloseModal}/>
            </div>
            <div className="modal-container-from-data">
                <div className="modal-left">
                    <div className="top-part">
                        <div className="image">
                            <img src={image_link} alt="" />
                        </div>
                        <div className="description">
                            <div className="title"> {recipeName} </div>
                            <div className="serving-size"> For {serving} people </div>
                            {/* <div className="change-btn">
                                <button> Change serving size </button>
                            </div> */}
                        </div>
                    </div>
                    <ActionBar recipeID={recipeID} />
                    <div className="ingredients">
                        <div className="topic">Ingredients</div>
                        <div className="content">
                            <ul>
                                {ingredients.map((ingredient) => (
                                    <li>{ingredient[0]}: {ingredient[1]}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="modal-right">
                    <div className="instructions">
                        <div className="topic">Instructions</div>
                        <div className="content">
                            <ol>
                                {instructions.map((instruction) => (
                                    <li>{instruction}</li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>      
            </div>

            <div className="comment-container">
                <div className="comments">Comments</div>
                {
                    comments.map((comment) => {
                    return <div className="single-comment-container">
                        <div className="comment-avatar">
                            <img src="https://static.vecteezy.com/system/resources/previews/009/734/564/original/default-avatar-profile-icon-of-social-media-user-vector.jpg" alt="" />
                        </div>
                        <div className="comment">
                            <div className="nameAndTime">
                                <div className="commenter">{comment.name}</div>
                                <div className="comment-time">{comment.time}</div>
                            </div>
                            <div className="comment-content">{comment.content}</div>
                        </div>
                    </div>
                    })
                }
                {/* <div className="single-comment-container" style={{width: '100%'}}>This looks soooooo delicious.</div>
                <div className="single-comment-container" style={{width: '100%'}}>I love curry~</div> */}
                <div className="comment-input">
                    <div className="comment-avatar">
                        <img src="https://static.vecteezy.com/system/resources/previews/009/734/564/original/default-avatar-profile-icon-of-social-media-user-vector.jpg" alt="" />
                    </div>
                    <input classname= "input-text" type = "text" placeholder="leave your comment..."/>
                    <button className="submit-text"> Submit </button>
                    {/* <input classname= "submit-text" type = "submit">Submit</input> */}
                </div>
            </div> 
        </>
    )
}


const RecipeDetailShare = () => {
    const recipe = recipe_data[2];
    const { recipeID, recipeName, serving, ingredients, instructions, image_link } = recipe;
    const comments = [
        {
            name: 'Teresa',
            content: 'Very impressive.',
            time: '12:00'
        },
        {
            name: 'Bob',
            content: 'Delicious~',
            time: '3:12'
        }
    ]

    return(
        <>
            <div className="modal-container">
                <div className="modal-left">
                    <div className="top-part">
                        <div className="image">
                            <img src={image_link} alt="" />
                        </div>
                        <div className="description">
                            <div className="title"> {recipeName} </div>
                            <div className="serving-size"> For {serving} people </div>
                        </div>
                    </div>
                    <ActionBar recipeID={recipeID} />
                    <div className="ingredients">
                        <div className="topic">Ingredients</div>
                        <div className="content">
                            <ul>
                                {ingredients.map((ingredient) => (
                                    <li>{ingredient[0]}: {ingredient[1]}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="modal-right">
                    <div className="instructions">
                        <div className="topic">Instructions</div>
                        <div className="content">
                            <ol>
                                {instructions.map((instruction) => (
                                    <li>{instruction}</li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

        </> 
    )
}


export default Detail;
export { RecipeDetail, RecipeDetailShare };