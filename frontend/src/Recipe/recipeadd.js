import React, { useState } from 'react';
import Modal from 'react-modal';
import { FaTrashAlt, FaJournalWhills } from 'react-icons/fa';
import './recipeadd.css'


const customModalStyles = {
    content: {
        width: '80%',
        transform: 'translate(10%, 0%)', // Translate the modal to the center of the screen
        boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.15)',
        borderRadius: '15px',
    }
};


function RecipeAddButton() {
    const [showModal, setShowModal] = useState(false);
    const [recipeImage, setRecipeImage] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const [recipeName, setRecipeName] = useState("");
    const [servingSize, setServingSize] = useState(0);
    const [ingredients, setIngredients] = useState([{name: "", quantity: ""}]);
    const [instructions, setInstructions] = useState([""]);

    const handleButtonClick = () => {
        setShowModal(true);
    };

    const handleImageChange = (event) => {
        event.preventDefault();
    
        const file = event.target.files[0];
        setRecipeImage(file);
    
        // Create a file reader
        const reader = new FileReader();
    
        // Set the file reader onload function
        reader.onload = () => {
            setImagePreviewUrl(reader.result);
        };
    
        // Read the file as a data URL
        reader.readAsDataURL(file);
    }

    const handleRecipeNameChange = (event) => {
        setRecipeName(event.target.value);
    };
    
    const handleServingSizeChange = (event) => {
        setServingSize(event.target.value);
    };
    
    const handleIngredientNameChange = (event, index) => {
        const newIngredients = [...ingredients];
        newIngredients[index].name = event.target.value;
        setIngredients(newIngredients);
    };
    
    const handleIngredientQuantityChange = (event, index) => {
        const newIngredients = [...ingredients];
        newIngredients[index].quantity = event.target.value;
        setIngredients(newIngredients);
    };
    
    const handleInstructionChange = (event, index) => {
        const newInstructions = [...instructions];
        newInstructions[index] = event.target.value;
        setInstructions(newInstructions);
    };

    const handleAddIngredient = () => {
        setIngredients([...ingredients, {name: "", quantity: ""}]);
    };
    
    const handleRemoveIngredient = (index) => {
        if (ingredients.length === 1) {
            setIngredients([{name: "", quantity: ""}]);
        }
        else {
            const newIngredients = [...ingredients];
            newIngredients.splice(index, 1);
            setIngredients(newIngredients);
        }
    };
    
    const handleAddInstruction = () => {
        setInstructions([...instructions, ""]);
    };
    
    const handleRemoveInstruction = (index) => {
        if (instructions.length === 1) {
            setInstructions([""]);
        }
        else {
            const newInstructions = [...instructions];
            newInstructions.splice(index, 1);
            setInstructions(newInstructions);
        }
    };

    const handleSaveRecipe = () => {
        // Create an object to store the recipe information
        const recipeData = {
            image: recipeImage,
            name: recipeName,
            servingSize: servingSize,
            ingredients: ingredients,
            instructions: instructions
        };

        // Add code to save recipe data
        console.log(recipeData);

        // Close the modal
        handleCloseModal();
    };

    const handleCloseModal = () => {
        // Reset the state variables to their initial values
        setRecipeImage(null);
        setImagePreviewUrl(null);
        setRecipeName("");
        setServingSize("");
        setIngredients([{name: "", quantity: ""}]);
        setInstructions([""]);

        // Close the modal
        setShowModal(false);
    };

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
                    <button className="modal-close btn btn-secondary recipeadd-btn" onClick={handleCloseModal}>
                        <span>&times;</span>
                    </button>
                </div>

                <div className="modal-body">
                    <table class="table recipeadd-table">
                        <tbody>
                            <tr>
                                <th scope="row">
                                    <label htmlFor="recipe-name">Recipe Name</label>
                                </th>
                                <td>
                                    <input type="text" id="recipe-name" value={recipeName} onChange={handleRecipeNameChange} className='recipeadd-input' />
                                </td>
                            </tr>

                            <tr>
                                <th scope="row">
                                    <label htmlFor="serving-size">Serving Size</label>
                                </th>
                                <td>
                                    <input type="number" id="serving-size" value={servingSize} onChange={handleServingSizeChange} className='recipeadd-input' />
                                </td>
                            </tr>

                            <tr>
                                <th scope="row">
                                    <label htmlFor="ingredients">Ingredients</label>
                                </th>
                                <td>
                                    {ingredients.map((ingredient, index) => (
                                        <div key={index} className="recipe-add-ingredient">
                                            <input type="text" placeholder={`Ingredient ${index + 1}`} value={ingredient.name} onChange={(event) => handleIngredientNameChange(event, index)} className='recipeadd-input' />
                                            <input type="text" placeholder="Quantity" value={ingredient.quantity} onChange={(event) => handleIngredientQuantityChange(event, index)} className='recipeadd-input' />
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
                                            <textarea placeholder={`Step ${index + 1}`} value={instruction} onChange={(event) => handleInstructionChange(event, index)} className='recipeadd-textarea' />
                                            <button type="button" className='btn btn-secondary recipeadd-instruction-btn' onClick={() => handleRemoveInstruction(index)}><FaTrashAlt /></button>
                                        </div>
                                    ))}
                                    <button type="button" className='btn btn-secondary recipeadd-btn' onClick={handleAddInstruction}>Add Step</button>
                                </td>
                            </tr>

                            <tr>
                                <th scope="row">
                                    <label htmlFor="recipe-image">Recipe Image</label>
                                </th>
                                <td>
                                    <input type="file" id="recipe-image" onChange={handleImageChange} />
                                    {imagePreviewUrl && <div className='recipeadd-preview'><img src={imagePreviewUrl} alt="Preview" className='recipeadd-preview-image' /></div>}
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>

                <div className="modal-footer">
                    <button className='btn btn-secondary recipeadd-btn' onClick={handleSaveRecipe}>Save Recipe</button>
                    <button className='btn btn-secondary recipeadd-btn' onClick={handleCloseModal}>Cancel</button>
                </div>
            </Modal>
        </>
    );
}

export { RecipeAddButton };