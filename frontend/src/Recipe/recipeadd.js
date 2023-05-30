import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { FaTrashAlt, FaJournalWhills } from 'react-icons/fa';
import './recipeadd.css'
import { getNoTokenData } from '../utils/useNoTokenApis'
import { apiAddNew } from '../axios/withToken'
import { UseGeneralContext } from '../Context/generalTables'
import { IoCloseCircleOutline } from 'react-icons/io5';
import "./detail.css"


const customModalStyles = {
    content: {
        width: '80%',
        transform: 'translate(10%, 0%)', // Translate the modal to the center of the screen
        boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.15)',
        borderRadius: '15px',
    }
};


function RecipeAddButton() {
    const { labelTable, label2id } = UseGeneralContext();
    const [noTokenData, setNoTokenData] = useState({});
    const [allIngredients, setAllIngredients] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const [ingredient2id, setIngredient2Id] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [recipeVideoLink, setRecipeVideoLink] = useState(null);
    const [recipeVideoLinkValid, setRecipeVideoLinkValid] = useState(true);
    const [video2YoutubeLink, setVideo2YoutubeLink] = useState(null);
    const [video2YoutubeLinkValid, setVideo2YoutubeLinkValid] = useState(true);
    const [recipeImage, setRecipeImage] = useState(null);
    const [recipeImageValid, setRecipeImageValid] = useState(true);
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const [recipeName, setRecipeName] = useState("");
    const [recipeNameValid, setRecipeNameValid] = useState(true);
    const [recipeCategory, setRecipeCategory] = useState("");
    const [recipeCategoryValid, setRecipeCategoryValid] = useState(true);
    const [matchingCategories, setMatchingCategories] = useState([]);
    const [servingSize, setServingSize] = useState(1);
    const [ingredients, setIngredients] = useState([{name: "", quantity: "", nameValid: true, quantityValid: true}]);
    const [matchingIngredients, setMatchingIngredients] = useState([]);
    const [instructions, setInstructions] = useState([{instruction: "", instructionValid: true}]);
    const [submitSave, setSubmitSave] = useState(false);

    useEffect(() => {
        const promise = getNoTokenData();
        promise.then((value) => {
            setNoTokenData(value);
            const mappedIngredients = value.ingredientDataWithCateName.map(row => row.ingredName);
            setAllIngredients(mappedIngredients);
            setMatchingIngredients(mappedIngredients.slice(0, 5));
            setIngredient2Id(value.ingredient2id);
            const mappedLabel = value.labelData.map(row => row.labelName)
            setAllCategories(mappedLabel);
            setMatchingCategories(mappedLabel.slice(0, 5));
        })
    }, []);

    const handleButtonClick = () => {
        setShowModal(true);
    };

    const convert2YoutubeLink = (link) => {
        if (!link.startsWith('https://youtu.be/')) {
            return setVideo2YoutubeLinkValid(false);
        } else {
            const videoId = link.split('/').pop();
            setVideo2YoutubeLink("https://www.youtube.com/embed/" + videoId);
            return setVideo2YoutubeLinkValid(true);
        }
    };

    const handleVideoLinkChange = (event) => {
        setRecipeVideoLink(event.target.value);
        convert2YoutubeLink(event.target.value);
    };

    const handleImageChange = (event) => {
        event.preventDefault();
    
        const file = event.target.files[0];
        setRecipeImage(file);
    
        // Create a file reader
        const reader = new FileReader();

        if (file) {
            // Check if the file size is less than 1MB (1MB = 1,048,576 bytes)
            if (file.size < 1048576 * 2) {
                // Set the file reader onload function
                reader.onloadend = () => {
                    setImagePreviewUrl(reader.result);
                };
            
                // Read the file as a data URL
                reader.readAsDataURL(file);
            } 
        }
    }

    const handleRecipeNameChange = (event) => {
        setRecipeName(event.target.value);
    };

    const handleRecipeCategoryChange = (event) => {
        const matched = allCategories.filter(category => category.toLowerCase().startsWith(event.target.value.toLowerCase()));
        setRecipeCategory(event.target.value);
        setMatchingCategories(matched.slice(0, 5));
    };
    
    const handleServingSizeChange = (event) => {
        setServingSize(event.target.value);
    };
    
    const handleIngredientNameChange = (event, index) => {
        const newIngredients = [...ingredients];
        newIngredients[index].name = event.target.value;
        const matchingIngredients = allIngredients.filter(row => row.toLowerCase().startsWith(event.target.value.toLowerCase()));
        setIngredients(newIngredients);
        setMatchingIngredients(matchingIngredients.slice(0, 5));
    };
    
    const handleIngredientQuantityChange = (event, index) => {
        const newIngredients = [...ingredients];
        newIngredients[index].quantity = event.target.value;
        setIngredients(newIngredients);
    };
    
    const handleInstructionChange = (event, index) => {
        const newInstructions = [...instructions];
        newInstructions[index].instruction = event.target.value;
        setInstructions(newInstructions);
    };

    const handleAddIngredient = () => {
        setIngredients([...ingredients, {name: "", quantity: "", nameValid: true, quantityValid: true}]);
    };
    
    const handleRemoveIngredient = (index) => {
        if (ingredients.length === 1) {
            setIngredients([{name: "", quantity: "", nameValid: true, quantityValid: true}]);
        }
        else {
            const newIngredients = [...ingredients];
            newIngredients.splice(index, 1);
            setIngredients(newIngredients);
        }
    };
    
    const handleAddInstruction = () => {
        setInstructions([...instructions, {instruction: "", instructionValid: true}]);
    };
    
    const handleRemoveInstruction = (index) => {
        if (instructions.length === 1) {
            setInstructions([{instruction: "", instructionValid: true}]);
        }
        else {
            const newInstructions = [...instructions];
            newInstructions.splice(index, 1);
            setInstructions(newInstructions);
        }
    };

    const handleCheckValidSave = (addData, allIngredients) => {
        let valid = true;
        const { recipeName, imagePreviewUrl, ingredients, instructions } = addData;

        if (recipeName !== '') {
            setRecipeNameValid(true);
        }
        else {
            setRecipeNameValid(false);
            valid = false;
        }

        if (allCategories.includes(recipeCategory)) {
             setRecipeCategoryValid(true);
        }
        else {
            setRecipeCategoryValid(false);
            valid = false;
        }

        // TODO: Video Link
        // if (recipeVideoLink && recipeVideoLink.startsWith('https://youtu.be/')) {
        //     setRecipeVideoLinkValid(true);
        // }
        // else {
        //     setRecipeVideoLinkValid(false);
        //     valid = false;
        // }

        if (imagePreviewUrl) {
            setRecipeImageValid(true);
        }
        else {
            setRecipeImageValid(false);
            valid = false;
        }
        
        const newIngredients = [...ingredients];
        ingredients.forEach((row, index) => {
            if (allIngredients.includes(row.name)) {
                newIngredients[index].nameValid = true;
            }
            else {
                newIngredients[index].nameValid = false;
                valid = false;
            }

            if (row.quantity !== '') {
                newIngredients[index].quantityValid = true;
            }
            else {
                newIngredients[index].quantityValid = false;
                valid = false;
            }
        });
        setIngredients(newIngredients);

        const newInstructions = [...instructions];
        instructions.forEach((row, index) => {
            if (row.instruction !== '') {
                newInstructions[index].instructionValid = true;
            }
            else {
                newInstructions[index].instructionValid = false;
                valid = false;
            }
        });
        setInstructions(newInstructions);

        return valid;
    };

    const handleSaveRecipe = () => {
        if (handleCheckValidSave({recipeName, imagePreviewUrl, ingredients, instructions}, allIngredients)) {
            // Create an object to store the recipe information
            const formatIngredients = ingredients.reduce((acc, cur) => {
                var curIngredId = ingredient2id[cur.name];
                acc[curIngredId] = [cur.quantity]
                return acc;
            }, {});
            // const recipeData = {
            //     title: recipeName,
            //     overview: '',
            //     servingSize: parseInt(servingSize),
            //     instructions: instructions.map(row => row.instruction),
            //     image: recipeImage,
            //     video: '',
            //     labels: [],
            //     ingredients: formatIngredients,
            // };
            // console.log(recipeData);

            const recipeFormData = new FormData();
            recipeFormData.append('title', recipeName);
            recipeFormData.append('overview', '');
            recipeFormData.append('servingSize', parseInt(servingSize));
            recipeFormData.append('instructions', JSON.stringify(instructions.map(row => row.instruction)))
            recipeFormData.append('image', recipeImage);
            recipeFormData.append('video', recipeVideoLink);
            recipeFormData.append('labels', JSON.stringify([]));
            recipeFormData.append('ingredients', JSON.stringify(formatIngredients));
            // for (var pair of recipeFormData.entries()) {
            //     console.log(pair[0]+': '+pair[1]);
            // }


            // Add code to save recipe data
            setSubmitSave(true);
            const response = apiAddNew(recipeFormData);
            response.then((value) => {
                console.log(value);
                window.location.reload(true);
            }) 

            // Close the modal
            // handleCloseModal();
        }
        
    };

    const handleCloseModal = () => {
        // Reset the state variables to their initial values
        setRecipeVideoLink(null);
        setRecipeVideoLinkValid(true);
        setVideo2YoutubeLink(null);
        setVideo2YoutubeLinkValid(true);
        setRecipeImage(null);
        setRecipeImageValid(true);
        setImagePreviewUrl(null);
        setRecipeCategory("")
        setRecipeCategoryValid(true);
        setRecipeName("");
        setRecipeNameValid(true);
        setServingSize("");
        setIngredients([{name: "", quantity: "", nameValid: true, quantityValid: true}]);
        setInstructions([{instruction: "", instructionValid: true}]);

        // Close the modal
        setShowModal(false);
    };
    
    // console.log(noTokenData.labelData)
    // console.log(labelTable);
    // console.log(allCategories);

    return (
        <>
            <button className='btn btn-secondary recipeadd-fixed-button' onClick={handleButtonClick}>
                <div className='recipeadd-icon'><FaJournalWhills /></div>
                Add Recipe
            </button>
            <Modal
                isOpen={showModal}
                onRequestClose={handleCloseModal}
                contentLabel="Add Recipe Modal"
                style={customModalStyles}
            >
                <div className="modal-header">
                    <div className='recipe-add-title'>Add Recipe</div>
                    <div className="exit">
                        <IoCloseCircleOutline size={25} onClick={handleCloseModal}/>
                    </div>
                </div>

                <div className="modal-body">
                    <table className="table recipeadd-table">
                        <tbody>
                            <tr>
                                <th scope="row">
                                    <label htmlFor="recipe-name">Recipe Name</label>
                                </th>
                                <td>
                                    <input type="text" id="recipe-name" value={recipeName} onChange={handleRecipeNameChange} className={`${recipeNameValid ? 'recipeadd-input' : 'recipeadd-input-invalid'}`} />
                                </td>
                            </tr>

                            <tr>
                                <th scope="row">
                                    <label htmlFor="recipe-category">Category</label>
                                </th>
                                <td>
                                    <input list='matching-category' type="text"  id="recipe-category" maxLength="255" value={recipeCategory} onChange={handleRecipeCategoryChange} className={`${recipeCategoryValid ? 'recipeadd-input' : 'recipeadd-input-invalid'}`} />
                                    <datalist id='matching-category'>
                                        {matchingCategories.map((category, index) => (
                                            <option key={index} value={category} />
                                        ))}
                                    </datalist>
                                </td>
                            </tr>

                            <tr>
                                <th scope="row">
                                    <label htmlFor="serving-size">Serving Size</label>
                                </th>
                                <td>
                                    <input type="number" id="serving-size" min={1} placeholder={servingSize} value={servingSize} onChange={handleServingSizeChange} className='recipeadd-input' />
                                </td>
                            </tr>

                            <tr>
                                <th scope="row">
                                    <label htmlFor="ingredients">Ingredients</label>
                                </th>
                                <td>
                                    {ingredients.map((ingredient, index) => (
                                        <div key={index} className="recipe-add-ingredient">
                                            <input list='matching-ingredients' type="text" maxLength="255" placeholder={`Ingredient ${index + 1}`} value={ingredient.name} onChange={(event) => handleIngredientNameChange(event, index)} className={`${ingredient.nameValid ? 'recipeadd-input' : 'recipeadd-input-invalid'}`} />
                                            <datalist id='matching-ingredients'>
                                                {matchingIngredients.map(ingredient => (
                                                    <option key={ingredient} value={ingredient} />
                                                ))}
                                            </datalist>
                                            <input type="text" placeholder="Quantity" maxLength="255" value={ingredient.quantity} onChange={(event) => handleIngredientQuantityChange(event, index)} className={`${ingredient.quantityValid ? 'recipeadd-input' : 'recipeadd-input-invalid'}`} />
                                            <button type="button" className='btn btn-secondary recipeadd-btn recipeadd-btn' onClick={() => handleRemoveIngredient(index)}><FaTrashAlt /></button>
                                        </div>
                                    ))}
                                    <button type="button" className='btn btn-secondary recipeadd-btn' onClick={handleAddIngredient}>Add Ingredient</button>
                                </td>
                            </tr>
                            
                            <tr>
                                <th scope="row">
                                    <label htmlFor="instructions">Instructions</label>
                                </th>
                                <td>
                                    {instructions.map((instruction, index) => (
                                        <div key={index} className="recipe-add-instruction">
                                            <textarea placeholder={`Step ${index + 1}`} value={instruction.instruction} maxLength="255" onChange={(event) => handleInstructionChange(event, index)} className={`${instruction.instructionValid ? 'recipeadd-textarea' : 'recipeadd-textarea-invalid'}`} />
                                            <button type="button" className='btn btn-secondary recipeadd-instruction-btn' onClick={() => handleRemoveInstruction(index)}><FaTrashAlt /></button>
                                        </div>
                                    ))}
                                    <button type="button" className='btn btn-secondary recipeadd-btn' onClick={handleAddInstruction}>Add Step</button>
                                </td>
                            </tr>

                            {/* TODO: Video */}
                            {/* <tr>
                                <th scope="row">
                                    <label htmlFor="recipe-video">Recipe Video (YouTube)</label>
                                </th>
                                <td>
                                    <div>
                                        <input type="text" id="recipe-video" placeholder='Format: https://youtu.be/...' style={{ width: '50%' }} onChange={handleVideoLinkChange} className={`${recipeVideoLinkValid ? 'recipeadd-input' : 'recipeadd-input-invalid'}`} />
                                    </div>
                                    {recipeVideoLink && video2YoutubeLinkValid && <iframe width="560" height="315" src={video2YoutubeLink} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>}
                                </td>
                            </tr> */}

                            <tr>
                                <th scope="row">
                                    <label htmlFor="recipe-image">{`Recipe Image (< 2MB)`}</label>
                                </th>
                                <td>
                                    <input type="file" accept="image/png, image/jpg, image/jpeg" id="recipe-image" onChange={handleImageChange} className={`${recipeImageValid ? '' : 'recipeadd-image-invalid'}`} />
                                    {imagePreviewUrl && <div className='recipeadd-preview'><img src={imagePreviewUrl} alt="Preview" className='recipeadd-preview-image' /></div>}
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>

                <div className="modal-footer">
                    <button className={`btn btn-secondary recipeadd-btn ${submitSave ? 'disabled' : ''}`} onClick={handleSaveRecipe}>Save Recipe</button>
                    <button className={`btn btn-secondary recipeadd-btn ${submitSave ? 'disabled' : ''}`} onClick={handleCloseModal}>Cancel</button>
                </div>
            </Modal>
        </>
    );
}

export { RecipeAddButton };