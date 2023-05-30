import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./detail.css"
import { IoCloseCircleOutline } from 'react-icons/io5';
import ActionBar from "./Components/ActionBar";
import { recipe_data } from "../Recipe/recipedata";
import { UseGeneralContext } from '../Context/generalTables'
import { apiQueryRecipeByID, apiGetRecipeComment, apiAddComment, apiGetUserData, apiUpdateRecipe, apiDeleteRecipeByID, apiQueryRecipeByUser } from '../axios/withToken'
import { UseLoginContext } from "../Context/LoginCnt";
import { FaTrashAlt, FaJournalWhills } from 'react-icons/fa';
import { getNoTokenData } from '../utils/useNoTokenApis'
import { disconnectSocket, initiateSocket, sendMessage, subscribeToAddLikeCnt, subscribeToChat, subscribeToMinusLikeCnt } from "../Context/commentSocketHooks";
import { BsFillTrashFill } from 'react-icons/bs';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UseDataContext } from "../Context/useUserData";

const RecipeDetail = ({ recipe, handleCloseModal, /*setUpdatedRecipe*/ }) => {
    const { recipeID, recipeName, serving, ingredients, instructions, image_link, comments_arr, likeCnt } = recipe
    const {login} = UseLoginContext()
    const { id2ingredient, ingredient2id } = UseGeneralContext();
    const { data } = UseDataContext()

    const [userComment, setUserComment] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [editingInst, setEditingInst] = useState(false);
    const [editingIng, setEditingIng] = useState(false);

    const [instruContent, setInstruContent] = useState(instructions);
    const initIngredCount = ingredients.map((ingred) =>  ingred[1]);
    const [ingredCount, setIngredCount] = useState(initIngredCount);
    // const [ingredient2id, setIngredient2Id] = useState([]);

    const [titleValue, setTitleValue] = useState(recipeName);
    const [servingValue, setServingValue] = useState(serving);

    const [likeCount, setLikeCount] = useState(likeCnt);
    // const [commentUser, setCommentUser] = useState([]);

    const textareaRef = useRef(null);
    const [comments, setComments] = useState([]);
    const [isEmptyComment, setIsEmptyComment] = useState(false);
    const [commentTransformed, setCommentTransformed] = useState(false);
    const [isRecipeOwner, setIsRecipeOwner] = useState(false);

    // const comments = [
    //     {
    //         name: 'Teresa',
    //         content: 'Very impressive.',
    //         time: '12:00'
    //     },
    //     {
    //         name: 'Bob',
    //         content: 'Delicious~',
    //         time: '3:12'
    //     }
    // ]

    useEffect(() => {
        initiateSocket(recipeID);
        subscribeToChat((err, newMessage) => {
            if (err) return;
            // newMessage = {content: {
            //     comment_str: comment,
            //     time: "just now",
            //     user_id: "cur"
            // }, user: {
            //     photo: data.image,
            //     userName: data.userName
            // }}
            setComments(prev => [newMessage, ...prev]);
            console.log('comment socket newMessage', newMessage);
        });
        subscribeToAddLikeCnt((err) => {
            if (err) return;
            setLikeCount(prev => prev + 1);
        })
        subscribeToMinusLikeCnt((err) => {
            if (err) return;
            setLikeCount(prev => prev - 1);
        })
        return () => {
            disconnectSocket();
        }
    }, [])

    const addComments = async(comment) => {
        const content = {
            comment: comment,
            Rid: recipeID
        }
        console.log('add content :', content);
        const addResult = await apiAddComment(content);
        console.log('add result', addResult.data);
        if (addResult.data === 'success') {
            // window.alert('comment added!')
            toast.success('Comment added!')
        }
        const message = {
            comment_str: comment,
            time: "just now",
            user_id: "cur"
        }
        const user = {
            photo: data.image,
            userName: data.userName
        }
        const newMessage = {content: message, user: user};
        sendMessage(recipeID, newMessage);
        // setComments(prev => [newMessage, ...prev])s;

        setUserComment("");
    }

    const handleCommentKeyUp = (event, comments) => {
        if (event.key === 'Enter') {
            addComments(comments);
        }
    }

    const editOnClick = async() => {
        // await handleEditSave();
        setEditMode(!editMode);
        setEditingInst(false);
        setEditingIng(false);
        //setInstruContent(instructions);
        // console.log('edit mode set');
    }

    const editSaveOnclick = async() => {
        const result = await handleEditSave();
        // console.log('save result', result);
        setEditMode(false);
        window.location.reload(true);
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

    // useEffect(() => {
    //     const promise = getNoTokenData();
    //     promise.then((value) => {
    //         setIngredient2Id(value.ingredient2id)
    //     })
    // }, [])

    const refreshAfterSave = async(rid) => {
        const result = await apiQueryRecipeByID(rid);
        const refreshedRecipe = result.data.rows;
        console.log('refreshed result', refreshedRecipe);
    }

    const handleEditSave = async() => {

        function combineIngredCount() {
            const editedIngredients = []
            ingredients.map((ingred, idx) => {
                editedIngredients[idx] = [ingred[0], ingredCount[idx]]
            })
            return editedIngredients
        }

        // console.log('combined', combineIngredCount());
        const testIngred = [['Milk', '1 cup'], ['Carrots', '1']]

        const formatIngredients = combineIngredCount().reduce((acc, cur) => {
            console.log('ingredient2id', ingredient2id);
            console.log('current value', cur);
            var curIngredId = ingredient2id[cur[0]]; //id
            acc[curIngredId] = [cur[1]]
            return acc;
        }, {});

        const recipeFormData = new FormData();
        recipeFormData.append('title', titleValue);
        // recipeFormData.append('overview', '');
        recipeFormData.append('servingSize', parseInt(servingValue));
        recipeFormData.append('instructions', JSON.stringify(instruContent))
        // recipeFormData.append('image', {});
        // recipeFormData.append('video', '');
        // recipeFormData.append('labels', JSON.stringify([]));
        recipeFormData.append('ingredients', JSON.stringify(formatIngredients));
        recipeFormData.append('id', recipeID)

        for (var pair of recipeFormData.entries()) {
            console.log(pair[0]+': '+pair[1]);
        }
        // console.log('recipe from data', recipeFormData);

        const formDataObject = {};
        for (const [key, value] of recipeFormData.entries()) {
            formDataObject[key] = value;
        }

        // Print the FormData object as a plain JavaScript object
        console.log('form data object', formDataObject);

        const updateResult = await apiUpdateRecipe(formDataObject);
        console.log('update result', updateResult);
        if (updateResult.data === 'success') {
            // window.alert('Edit saved!')
            toast.success('Recipe updated!')
            refreshAfterSave(recipeID)
        }

        // setUpdatedRecipe({
        //     recipeID: recipeID,
        //     recipeName: titleValue,
        //     serving: servingValue,
        //     ingredients: combineIngredCount(),
        //     instructions: instruContent,
        //     image_link: image_link
        // })
    }

    const handleEditDelete = async() => {
        const deleteResult = await apiDeleteRecipeByID(recipeID);
        console.log('delete result', deleteResult);
        if (deleteResult.data === 'success') {
            // window.alert('Successfully remove')
            toast.success('Successfully remove')
        }
        handleCloseModal();

        // refreshRecipePage();

    }

    const handleEditCancel = () => {
        setEditMode(!editMode)
    }

    const handleTitleEdit = (event) => {
        setTitleValue(event.target.value);
    }

    const handleServingEdit = (event) => {
        setServingValue(Number(event.target.value));
    }


    function dateTransformer(dateString) {
        if (dateString === 'just now') {
            return "Just Now"
        } else {
            const date = new Date(dateString);
            const formattedDate = date.toLocaleDateString(); // Get the formatted date
            const formattedTime = date.toLocaleTimeString(); // Get the formatted time
        
            console.log('Original date string:', dateString);
            console.log('Date:', formattedDate);
            console.log('Time:', formattedTime);
        
            const localizedTime = formattedDate + ' ' + formattedTime;
        
            console.log('Transformed new time:', localizedTime);
        
            return localizedTime;
        }
    }

    async function gatherComments() {
        console.log('init recipe', recipe);
        const initComments = recipe.comments_arr;
        const commentUserData = {};
        let combinedComments = {};

        const handleCommentDetail = async(userID) => {
            const commentDetail = await apiGetRecipeComment(userID);
            // console.log('user in comment', userID, commentDetail.data);
            return commentDetail.data;
        }

        const allComments = async(initComments) => {
            // Map over the initial comments array asynchronously
            await Promise.all(
                initComments.map(async (comment, idx) => {
                const userID = comment[0].user_id;
                const commentDetail = await handleCommentDetail(parseInt(userID));
                // commentUserData.push(commentDetail[0]);
                commentUserData[idx] = commentDetail[0];
                })
            );
            // console.log('comment user data', commentUserData, 'init', initComments);
            combinedComments = initComments.map((item, idx) => {
                return { user: commentUserData[idx], content: item[0] }
            })
            console.log('combined', combinedComments);
            // const transformedComment = dateTransformer(combinedComments);
            setComments(combinedComments.reverse());
            // console.log('complete comments', completeComments);
        }

        if (initComments === null) {
            setIsEmptyComment(true);
        } else {
            allComments(initComments);
        }
        
        // setComments(combinedComments);
        return combinedComments;
    }

    useEffect(() => {

        gatherComments();
        console.log('comment', comments);

        const handleEditAccess = async() => {
            const recipeByUser = await apiQueryRecipeByUser();
            console.log('query recipe by user', recipeByUser);
            const userRecipe = recipeByUser.data.rows;
            userRecipe.map((recipe) => {
                if (recipeID === recipe.id) {
                    setIsRecipeOwner(true);
                }
            })
        }
        handleEditAccess();
        // setIsRecipeOwner(true);
    }, [])

    // console.log(recipe)

    return(
        <div className='whole-modal'>
            <div className={`exit ${editMode ? 'disabled-icon' : ''}`}>
                <IoCloseCircleOutline size={25} onClick={handleCloseModal}/>
            </div>
            <div className="modal-container-from-data">
                <div className="modal-top">
                    <div className="top-part">
                        <div className="image">
                            <img src={image_link} alt="" className={`${editMode ? 'hover-effect':''}`}/>

                        </div>
                        <div className="description">
                            <div className={`title ${editMode ? 'hover-effect':''}`}> 
                                {
                                    editMode?
                                    <textarea value={titleValue} onChange={handleTitleEdit}/>
                                    : 
                                    <>
                                    {recipeName}
                                    </>
                                }
                            </div>
                            <div className={`serving-size ${editMode ? 'hover-effect':''}`}> 
                                {
                                    editMode ?
                                    <>
                                        For <input type="number"
                                                id="serving-input" 
                                                value={servingValue}
                                                onChange={handleServingEdit}
                                            /> people
                                    </>:
                                    <>
                                        For {serving} people
                                    </>
                                }
                                
                            </div>
                            {/* <div className="change-btn">
                                <button> Change serving size </button>
                            </div> */}
                        </div>
                    </div>
                    <ActionBar recipeID={recipeID} likeCnt={likeCount} setLikeCnt={setLikeCount} />
                </div>

                <div className='modal-content'>
                    <div className={`ingredients ${editingIng ? 'editing-box' : ''}`}>
                        <div className="topic">Ingredients</div>
                        <div className="content">
                            <ul>
                                {ingredients.map((ingredient, idx) => (
                                    editMode?
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
                                    <li className={`${editMode ? 'hover-effect':''}`} key={idx}>
                                        {ingredient[0]}: {ingredient[1]}
                                    </li>
                                ))}
                            </ul>
                            {/* {
                                editingIng?
                                (<>
                                    <button onClick={handleEditSave}>save</button>
                                    <button onClick={handleIngredEditCancel}>cancel</button>
                                </>):''
                            } */}
                        </div>
                    </div>
                    <div className={`instructions ${editingInst ? 'editing-box' : ''}`}>
                        <div className="topic">Instructions</div>
                        <div className='content'>
                            <ol>
                                {instructions.map((instruction, idx) => (
                                    editMode?
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
                                    <li className={`${editMode ? 'hover-effect':''}`} key={idx}>
                                        {instruction}
                                    </li>
                                ))}
                            </ol>
                            {/* {
                                editingInst?
                                (<>
                                    <button onClick={handleInstruEditSave}>save</button>
                                    <button onClick={handleInstruEditCancel}>cancel</button>
                                </>):''
                            } */}
                            
                        </div>
                    </div>
                </div>      
            </div>

            <div className={`comment-container ${editMode ? 'blur-all':''}`}>
                <div className="comments">Comments</div>
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
                {
                    // content = { comment_str: "df comment test", time: "2023-05-26T09:09:21+00:00", user_id: "7"}
                    // user = 0: {photo: '', userName: 'Yu'}
                    !isEmptyComment ? 
                    comments.map((comment, idx) => {
                        const user = comment.user;
                        const content = comment.content
                        // console.log('comment data', user, content);
                            return <div className="single-comment-container">
                                <div className="comment-avatar">
                                    {
                                        (user.photo === '') ? 
                                            <img src="https://static.vecteezy.com/system/resources/previews/009/734/564/original/default-avatar-profile-icon-of-social-media-user-vector.jpg" />
                                        :
                                            <img src={user.photo}/>
                                    }
                                    {/* {
                                        comment.photo.length === 0? */}
                                        
                                        {/* :<img src={comment.photo} alt="" />  */}
                                    {/* } */}
                                </div>
                                <div className="comment">
                                    <div className="nameAndTime">
                                        <div className="commenter">{user.userName}</div>
                                        <div className="comment-time">{dateTransformer(content.time)}</div>
                                    </div>
                                    <div className="comment-content">{content.comment_str}</div>
                                </div>
                            </div>
                        })
                    :
                    <p>Nobody leave comments yet.</p>
                }
                {/* <div className="single-comment-container" style={{width: '100%'}}>This looks soooooo delicious.</div>
                <div className="single-comment-container" style={{width: '100%'}}>I love curry~</div> */}
            </div> 
            {
                editMode ?
                <>
                    <button className="btn btn-secondary recipeedit-fixed-button" 
                        id="cancel-btn" 
                        onClick={handleEditCancel}> Cancel </button>
                    <button className="btn btn-secondary recipeedit-fixed-button" 
                        onClick={editSaveOnclick}> Save </button>
                </>
                : 
                    login && isRecipeOwner ?
                    <>
                        <button className="btn btn-secondary recipeedit-fixed-button" 
                            id="cancel-btn" 
                            onClick={editOnClick}> Edit Recipe </button>
                        <button className="btn btn-secondary recipeedit-delete-button"
                            onClick={handleEditDelete}> <BsFillTrashFill /> </button>
                    </>:''
                
            }
            {/* <button className='btn btn-secondary recipeedit-fixed-button' onClick={editOnClick}>
                {
                    editMode ?
                    <>Save</> : <>Edit Recipe</>
                }
            </button> */}
        </div>
    )
}


const RecipeDetailShare = () => {
    const { recipeID } = useParams();
    const {login} = UseLoginContext();
    const { id2ingredient } = UseGeneralContext();
    const [apiRecipe, setApiRecipe] = useState({ recipeName: '' });
    const recipe = recipe_data[recipeID];
    const [userComment, setUserComment] = useState("");
    // const comments = [
    //     {
    //         name: 'Teresa',
    //         content: 'Very impressive.',
    //         time: '12:00'
    //     },
    //     {
    //         name: 'Bob',
    //         content: 'Delicious~',
    //         time: '3:12'
    //     }
    // ]

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
                likeCnt: likeCount
            });
        })
    }, [recipeID, id2ingredient])

    // console.log(recipeID);
    // console.log(recipe);
    // console.log(apiRecipe);
    // console.log(id2ingredient)

    const { recipeName, serving, ingredients, instructions, image_link, comments } = apiRecipe;

    return(
        <div className="whole-modal" style={{ width: '80%' }}>
            { recipeName !== '' &&
            <>
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
                        <ActionBar recipeID={parseInt(recipeID)} />
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
            </>
            }

            { recipeName === '' &&
                <div className="recipe-not-exist">
                    <h3 style={{ 'text-align': 'center', 'color': 'gray' }}>
                        Recipe does not exist.
                    </h3>
                </div>
            }
            
        </div> 
    )
}

export { RecipeDetail, RecipeDetailShare };