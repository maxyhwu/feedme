import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./detail.css"
import { IoCloseCircleOutline } from 'react-icons/io5';
import ActionBar from "./Components/ActionBar";
import { recipe_data } from "../Recipe/recipedata";
import { UseGeneralContext } from '../Context/generalTables'
import { apiQueryRecipeByID, apiGetRecipeComment, apiAddComment, apiGetUserData, apiUpdateRecipe } from '../axios/withToken'
import { UseLoginContext } from "../Context/LoginCnt";
import { FaTrashAlt, FaJournalWhills } from 'react-icons/fa';
import { getNoTokenData } from '../utils/useNoTokenApis'

const RecipeDetail = ({ recipe, handleCloseModal }) => {
    const { recipeID, recipeName, serving, ingredients, instructions, image_link } = recipe
    const {login} = UseLoginContext()
    const { id2ingredient } = UseGeneralContext();

    const [userComment, setUserComment] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [editingInst, setEditingInst] = useState(false);
    const [editingIng, setEditingIng] = useState(false);


    const [instruContent, setInstruContent] = useState(instructions);
    const initIngredCount = ingredients.map((ingred) =>  ingred[1]);
    const [ingredCount, setIngredCount] = useState(initIngredCount);
    const [ingredient2id, setIngredient2Id] = useState([]);

    const [completeRecipe, setCompleteRecipe] = useState([]);

    const textareaRef = useRef(null);

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


    const addComments = async(comment) => {
        const content = {
            comment: comment,
            Rid: recipeID
        }
        console.log('add content :', content);
        const addResult = await apiAddComment(content)
        console.log('add result', addResult.data);
        if (addResult.data === 'success') {
            window.alert('comment added!')
        }
        setUserComment("");
    }

    const editOnClick = async() => {
        setEditMode(!editMode);
        setEditingInst(false);
        setEditingIng(false);
        //setInstruContent(instructions);
        // console.log('edit mode set');
    }

    const handleEditInstruOnclick= () => {
        if (editMode) {
            setEditingInst(true);
            //setInstruContent(instruction);
        }
    }

    const handleEditIngredOnclick = () => {
        if (editMode) {
            setEditingIng(true)
        }
        // console.log('ingred', ingredCount);
    }

    const handleInstruChange = (event, idx) => {

        const newInstru = [...instruContent]; // Create a copy of the instruContent array
        newInstru[idx] = event.target.value; // Update the specific element in the copied array

        // Update the state with the modified array
        setInstruContent(newInstru);
    }

    const handleIngredChange = (event, idx) => {
        const newIngred = [...ingredCount]
        newIngred[idx] = event.target.value;
        // console.log('new ingred', newIngred[idx]);

        setIngredCount(newIngred)
    }

    useEffect(() => {
        const promise = getNoTokenData();
        promise.then((value) => {
            setIngredient2Id(value.ingredient2id)
        })
    }, [])

    const handleInstruEditSave = async() => {

        const formatIngredients = ingredients.reduce((acc, cur) => {
            var curIngredId = ingredient2id[cur.name];
            acc[curIngredId] = [cur.quantity]
            return acc;
        }, {});

        const recipeFormData = new FormData();
        recipeFormData.append('title', recipeName);
        recipeFormData.append('overview', '');
        recipeFormData.append('servingSize', parseInt(serving));
        recipeFormData.append('instructions', JSON.stringify(instruContent))
        // recipeFormData.append('image', recipeImage);
        recipeFormData.append('video', '');
        recipeFormData.append('labels', JSON.stringify([]));
        recipeFormData.append('ingredients', JSON.stringify(formatIngredients));

        for (var pair of recipeFormData.entries()) {
            console.log(pair[0]+': '+pair[1]);
        }
        
        // const data = {
        //     title: recipeName,
        //     overview: completeRecipe.overview,
        //     servingSize: serving,
        //     instructions: instruContent,
        //     //image: image_link,
        //     video: completeRecipe.video,
        //     labels: completeRecipe.labels,
        //     ingredients: ingredients,
        //     id: recipeID
        // }
        // const updateResult = await apiUpdateRecipe(recipeFormData);
        // console.log('update result', updateResult);
    }

    const handleInstruEditCancel = () => {
        setEditingInst(false);
    }

    const handleIngredEditSave = async() => {

        function combineIngredCount() {
            const editedIngredients = []
            ingredients.map((ingred, idx) => {
                editedIngredients[idx] = [ingred[0], ingredCount[idx]]
            })
            return editedIngredients
        }

        const testIngred = [['Milk', '1 cup'], ['Carrots', '1']]

        const formatIngredients = combineIngredCount().reduce((acc, cur) => {
            console.log('ingredient2id', ingredient2id);
            console.log('current value', cur);
            var curIngredId = ingredient2id[cur[0]]; //id
            acc[curIngredId] = [cur[1]]
            return acc;
        }, {});

        const recipeFormData = new FormData();
        recipeFormData.append('title', recipeName);
        recipeFormData.append('overview', '');
        recipeFormData.append('servingSize', parseInt(serving));
        recipeFormData.append('instructions', JSON.stringify(instruContent))
        recipeFormData.append('image', {});
        recipeFormData.append('video', '');
        recipeFormData.append('labels', JSON.stringify([]));
        recipeFormData.append('ingredients', JSON.stringify(formatIngredients));

        for (var pair of recipeFormData.entries()) {
            console.log(pair[0]+': '+pair[1]);
        }

        // const data = {
        //     title: recipeName,
        //     overview: '',
        //     servingSize: serving,
        //     instructions: instruContent,
        //     //image: image_link,
        //     video: '',
        //     labels: '',
        //     ingredients: combineIngredCount(),
        //     id: recipeID
        // }
        const updateResult = await apiUpdateRecipe(recipeFormData);
        console.log('update result', updateResult);
    }

    const handleIngredEditCancel = () => {
        setEditingIng(false);
    }

    useEffect(() => {
        const getComments = async(id) => { //OK need real data
            const comments = await apiGetRecipeComment(id);
            console.log('comments in recipe', id, comments.data);
        }

        const getUserId = async() => {
            const data = await apiGetUserData();
            console.log('user data', data);
        }
        //getUserId();
        getComments(recipeID);
    }, [])



    return(
        <div className={`${editMode ? 'blur-all' : ''} whole-modal `}>
            <div className="exit">
                <IoCloseCircleOutline size={25} onClick={handleCloseModal}/>
            </div>
            <div className="modal-container-from-data">
                <div className="modal-top">
                    <div className="top-part">
                        <div className="image">
                            <img src={image_link} alt="" className={`${editMode ? 'hover-effect':''}`}/>
                        </div>
                        <div className="description">
                            <div className={`title ${editMode ? 'hover-effect':''}`}> {recipeName} </div>
                            <div className={`serving-size ${editMode ? 'hover-effect':''}`}> For {serving} people </div>
                            {/* <div className="change-btn">
                                <button> Change serving size </button>
                            </div> */}
                        </div>
                    </div>
                    <ActionBar recipeID={recipeID} />
                </div>

                <div className='modal-content'>
                    <div className={`ingredients ${editingIng ? 'editing-box' : ''}`}>
                        <div className="topic">Ingredients</div>
                        <div className="content">
                            <ul>
                                {ingredients.map((ingredient, idx) => (
                                    editingIng?
                                    <>
                                        {ingredient[0]}
                                        <textarea 
                                            key={'0-' + idx}
                                            value={ingredCount[idx]}
                                            rows={1}
                                            onChange={(event) => handleIngredChange(event, idx)}
                                        />
                                    </>
                                    :
                                    <li className={`${editMode ? 'hover-effect':''}`} key={idx} onClick={handleEditIngredOnclick}>
                                        {ingredient[0]}: {ingredient[1]}
                                    </li>
                                ))}
                            </ul>
                            {
                                editingIng?
                                (<>
                                    <button onClick={handleIngredEditSave}>save</button>
                                    <button onClick={handleIngredEditCancel}>cancel</button>
                                </>):''
                            }
                        </div>
                    </div>
                    <div className={`instructions ${editingInst ? 'editing-box' : ''}`}>
                        <div className="topic">Instructions</div>
                        <div className='content'>
                            <ol>
                                {instructions.map((instruction, idx) => (
                                    editingInst?
                                    <li>
                                        {/* {
                                            //setInstruContent(instruction)
                                            //console.log('idx :', idx, 'content :', instruContent[idx])
                                            console.log(instruContent[10])
                                        } */}
                                        <textarea 
                                            key={idx}
                                            value={instruContent[idx]} 
                                            onChange={(event) => handleInstruChange(event, idx)} 
                                            ref={textareaRef}
                                            //rows={instruction.split('\n').length}
                                            autoFocus/>
                                        
                                    </li>
                                    :
                                    <li className={`${editMode ? 'hover-effect':''}`} key={idx} onClick={handleEditInstruOnclick}>
                                        {instruction}
                                    </li>
                                ))}
                            </ol>
                            {
                                editingInst?
                                (<>
                                    <button onClick={handleInstruEditSave}>save</button>
                                    <button onClick={handleInstruEditCancel}>cancel</button>
                                </>):''
                            }
                            
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
                            {/* {
                                comment.photo.length === 0? */}
                                <img src="https://static.vecteezy.com/system/resources/previews/009/734/564/original/default-avatar-profile-icon-of-social-media-user-vector.jpg" alt="" />
                                {/* :<img src={comment.photo} alt="" />  */}
                            {/* } */}
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
                        <input className= "input-text" 
                            type = "text" 
                            placeholder="leave your comment..."
                            value={userComment}
                            onChange={(e) => setUserComment(e.target.value)}/>
                        <button 
                            className="submit-text"
                            onClick={() => addComments(userComment)}> Submit </button>
                        {/* <input classname= "submit-text" type = "submit">Submit</input> */}
                    </div> :
                    <></>
                }
            </div> 
            <button className='btn btn-secondary recipeedit-fixed-button' onClick={editOnClick}>
                <div className='recipeadd-icon'><FaJournalWhills /></div>
                {
                    editMode?
                    <>Finish Edit</> : <>Edit Recipe</>
                }
            </button>
        </div>
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