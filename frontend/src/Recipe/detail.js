import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./detail.css"
import { IoCloseCircleOutline } from 'react-icons/io5';
import ActionBar from "./Components/ActionBar";
import { recipe_data } from "../Recipe/recipedata";
import { UseGeneralContext } from '../Context/generalTables'
import { apiQueryRecipeByID } from '../axios/withToken'
import { UseLoginContext } from "../Context/LoginCnt";


const RecipeDetail = ({ recipe, handleCloseModal }) => {
    const { recipeID, recipeName, serving, ingredients, instructions, image_link } = recipe
    const {login} = UseLoginContext()

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
                <div className="modal-top">
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
                </div>

                <div className="modal-content">
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
                {
                    login ?
                    <div className="comment-input">
                        <div className="comment-avatar">
                            <img src="https://static.vecteezy.com/system/resources/previews/009/734/564/original/default-avatar-profile-icon-of-social-media-user-vector.jpg" alt="" />
                        </div>
                        <input classname= "input-text" type = "text" placeholder="leave your comment..."/>
                        <button className="submit-text"> Submit </button>
                        {/* <input classname= "submit-text" type = "submit">Submit</input> */}
                    </div> :
                    <></>
                }
            </div> 
        </>
    )
}


const RecipeDetailShare = () => {
    const { recipeID } = useParams();
    const { id2ingredient } = UseGeneralContext();
    const [apiRecipe, setApiRecipe] = useState({ recipeName: '' });
    const recipe = recipe_data[recipeID];
    const { recipeName, serving, ingredients, instructions, image_link } = recipe;
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

    useEffect(() => {
        const response = apiQueryRecipeByID(recipeID);
        response.then((value) => {
            // console.log(value);
            const { id, title, overview, servingSize, instructions, image, video, likeCount, labels, ingredients, comments, createdAt, updatedAt, userName } = value.data.rows[0];
            const formatIngredients = Object.entries(ingredients).map(([id, amount]) => [id2ingredient[id], ...amount]);
            setApiRecipe({
                recipeID: id,
                recipeName: title,
                serving: servingSize,
                ingredients: formatIngredients,
                instructions: instructions,
                image_link: image,
            });
        })
    }, [recipeID])

    // console.log(recipeID);
    // console.log(recipe);
    // console.log(apiRecipe);

    return(
        <>
            { recipeName !== '' &&
            <div className="modal-container-from-data">
                <div className="modal-container">
                    <div className="modal-top">
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
                    </div>
                    <div className="modal-content">
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
            </div>
            }
           
            { recipeName === '' &&
                <div>
                    <h1>
                        {/* Some message TBD */}
                    </h1>
                </div>
            }
            
        </> 
    )
}

export { RecipeDetail, RecipeDetailShare };