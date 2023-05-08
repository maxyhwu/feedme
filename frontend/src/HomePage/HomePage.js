import { useState } from "react";
import "./HomePage.css"
import { FaHeart } from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io'
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import { recipe_data } from "../Recipe/recipedata";
import { RecipeDetail } from '../Recipe/detail';

const HomePage = () => {

    function scrollDown() {
        var div = document.getElementById("middlePart");
        div.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    const navigate = useNavigate();
    const navigateToDetail = () => {
        navigate('/modal');
    }

    const [activeHeart, setActiveHeart] = useState(false);
    const [activeHeart1, setActiveHeart1] = useState(false);

    const toggle = () => {
        setActiveHeart(!activeHeart);
        // console.log('heart clicked.');
    }

    const toggle1 = () => {
        setActiveHeart1(!activeHeart1);
        // console.log('heart clicked.');
    }

    const RecommendRecipeBlock = ({ recipe }) => {
        const { recipeName, ingredients, instructions } = recipe;
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

        const [activeHeart, setActiveHeart] = useState(false);
        const toggleHeart = () => {
            setActiveHeart(!activeHeart);
        }

        return (
            <div className="recipe">
                <div className="recipe-header">
                    <div className="recipe-title"> {recipeName} </div>
                    <FaHeart style={{ color: activeHeart ? 'red' : '' }} onClick={toggleHeart}/>
                </div>
                <div className="view-block">
                    
                    <div className="recipe-content">
                        Ingredients:<br/><br/>

                        {ingredients.map((ingredient, idx) => (
                            <div key={idx}>{ingredient[0]}: {ingredient[1]}<br/></div>
                        ))}
                        
                        <br/>
                        Instructions:<br/>
                        <ol className="instructions">
                            {instructions.map((instruction, idx) => (
                                <li key={idx}>{instruction}</li>
                            ))}
                        </ol>
                    </div>
                </div>
                
                <div className="learnmore">
                    <button className="button-learnmore" onClick={handleOpenModal}>Learn More</button>
                    <Modal
                        isOpen={showModal}
                        onRequestClose={handleCloseModal}
                        style={customModalStyles}
                    >
                        <RecipeDetail recipe={recipe} handleCloseModal={handleCloseModal} />
                    
                    </Modal>
                </div>
            </div>
        )
    }

    const PopularRecipeBlock = ({ recipe }) => {
        const { recipeName, image_link } = recipe;
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

        return (
            <>
                <div className="popRecipe" onClick={handleOpenModal}>
                    <div className="popImg">
                        <img src={image_link} alt="" />
                    </div>
                    <div className="poptitle"> {recipeName} </div>
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
    
    const recommendData = recipe_data.slice(3, 5);
    const popularData = recipe_data.slice(0, 3);

    return (
        <div className="main-container">
            <div className="main-homepage">
                <div className="top">
                    <div className="main-title">
                        A recipe has no soul. You, as a cook, must bring soul to the recipe. -Thomas Keller
                    </div>
                    <div className="subtitle">
                        We provide all kinds of functions to serve others innovative cuisines to your table.
                    </div>
                    <button onClick={scrollDown}> Discover more </button>
                </div>
                <div className="middle" id="middlePart">
                    <div className="section-title" id="recommend-recipe">
                        Recommended Recipes
                    </div>
                    <div className="recipes-container">
                        {recommendData.map((recipe, index) => (
                            <RecommendRecipeBlock key={index} recipe={ recipe } />
                        ))}

                        {/* <div className="recipe">
                            <div className="recipe-header">
                                <div className="recipe-title"> Curry Rice </div>
                                <FaHeart style={{ color: activeHeart ? 'red' : '' }} onClick={toggle}/>
                            </div>
                            <div className="view-block">
                                
                                <div className="recipe-content">
                                    Ingredients:<br/><br/>

                                    2 cups Japanese rice<br/>
                                    4 cups water<br/>
                                    1 large onion, chopped<br/>
                                    2 carrots, chopped<br/>
                                    2 potatoes, chopped<br/>
                                    1 lb. chicken or beef, cut into bite-sized pieces<br/>
                                    2 tbsp. vegetable oil<br/>
                                    1 box (8.4 oz.) Japanese curry roux<br/>
                                    Salt and pepper to taste<br/><br/>

                                    Instructions:<br/>
                                    <ol className="instructions">
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
                            
                            <div className="learnmore">
                                <button className="button-learnmore" onClick={navigateToDetail}>Learn More</button>
                            </div>
                        </div>
                        <div className="recipe">
                            <div className="recipe-header">
                                    <div className="recipe-title"> Scrambled Egg </div>
                                    <FaHeart style={{ color: activeHeart1 ? 'red' : '' }} onClick={toggle1}/>
                                </div>
                            <div className="view-block">
            
                                <div className="recipe-content">
                                    Ingredients:<br/><br/>

                                    2-3 medium-sized tomatoes, chopped<br/>
                                    3-4 eggs<br/>
                                    2 cloves garlic, minced<br/>
                                    1/2 tsp cumin powder<br/>
                                    1/2 tsp red chili flakes<br/>
                                    Salt and black pepper to taste<br/>
                                    2-3 tbsp oil<br/><br/>

                                    Instructions:<br/>
                                    <ol className="instructions">
                                        <li>Heat oil in a non-stick frying pan over medium heat.</li>
                                        <li>Add the minced garlic and sauté for a minute or until fragrant.</li>
                                        <li>Add the chopped tomatoes, cumin powder, red chili flakes, salt, and black pepper. Stir everything together and cook for 5-7 minutes or until the tomatoes have softened and reduced into a thick sauce.</li>
                                        <li>Crack the eggs directly into the tomato sauce, making sure to space them out evenly.</li>
                                        <li>Cover the pan with a lid and cook for another 5-7 minutes, or until the eggs are cooked to your desired doneness.</li>
                                        <li>Serve hot with your favorite bread or as a side dish to your main meal.</li>
                                    </ol>
                                </div>
                            </div>
                            <div className="learnmore">
                                <button className="button-learnmore" onClick={navigateToDetail}>Learn More</button>
                            </div>
                        </div> */}
                    </div>
                </div>
                <div className="bottom">
                    <div className="section-title">
                        Our Popular Recipes
                    </div>
                    <div className="popRecipes-container">
                        {popularData.map((recipe, index) => (
                            <PopularRecipeBlock key={index} recipe={ recipe } />
                        ))}
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
                </div>
            </div>
        </div>
    )
}

export default HomePage;