import React, { useState } from 'react';
import Modal from 'react-modal';
import "./recipe.css"
import { IoIosArrowForward } from 'react-icons/io';
import { useNavigate } from "react-router-dom";
import SearchBar from "./Components/SearchBar";
import { useState } from "react";
import { RecipeAddButton } from "./recipeadd";
import { recipe_data } from "./recipedata";
import { RecipeDetail } from './detail';


const RecipeObject = ({ recipe }) => {
    const customModalStyles = {
        content: {
            width: '80%',
            transform: 'translate(10%, 0%)', // Translate the modal to the center of the screen
            boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.15)',
            borderRadius: '15px',
        }
    };
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const { recipeName } = recipe;
    return (
        <>
            <div className="popRecipe" onClick={handleOpenModal}>
                <div className="popImg">
                    <img src="https://sudachirecipes.com/wp-content/uploads/2022/08/beef-curry-rice-thumbnail.jpg" alt="" />
                </div>
                <div className="poptitle">{recipeName}</div>
                <IoIosArrowForward/>
            </div>
            <Modal
                isOpen={showModal}
                onRequestClose={handleCloseModal}
                style={customModalStyles}
            >
                <RecipeDetail recipe={recipe} handleCloseModal={handleCloseModal} />
            
            </Modal>
        </>
    )

}


const Recipe = () => {

    // const [rerender, setRerender] = useState(false);

    const navigate = useNavigate();
    const navigateToDetail = () => {
        navigate('/modal');
    }

    return (
    <>
        <SearchBar/>
        <div className="recipe-container">
            <div className="bottom">
                <div className="section-title">
                    Our Popular Recipes
                </div>
                <div className="popRecipes-container">
                    {recipe_data.map((recipe) => (
                        <RecipeObject
                            recipe={recipe}
                        />
                    ))}

                    {/* For comparison between versions */}
                    {/* <div className="popRecipe" onClick={navigateToDetail}>
                        <div className="popImg">
                            <img src="https://sudachirecipes.com/wp-content/uploads/2022/08/beef-curry-rice-thumbnail.jpg" alt="" />
                        </div>
                        <div className="poptitle">Curry Rice</div>
                        <IoIosArrowForward/>
                    </div>
                    <div className="popRecipe" onClick={navigateToDetail}>
                        <div className="popImg">
                            <img src="https://tmbidigitalassetsazure.blob.core.windows.net/rms3-prod/attachments/37/1200x1200/Easy-Fresh-Strawberry-Pie_EXPS_TMBBP19_34179_B06_20_3b.jpg" alt="" />
                        </div>
                        <div className="poptitle">Strawberry Pie</div>
                        <IoIosArrowForward/>
                    </div>
                    <div className="popRecipe" onClick={navigateToDetail}>
                        <div className="popImg">
                            <img src="https://www.deliciousmagazine.co.uk/wp-content/uploads/2018/08/302612-1-eng-GB_thyme-roasted-rib-of-beef.jpg" alt="" />
                        </div>
                        <div className="poptitle">Rib</div>
                        <IoIosArrowForward/>
                    </div> */}
                </div>
                <RecipeAddButton />
            </div>
        </div>
    </>
    )
}

export default Recipe;
