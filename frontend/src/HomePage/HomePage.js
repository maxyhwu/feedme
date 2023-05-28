import { useState, useEffect } from "react";
import "./HomePage.css"
import { FaHeart } from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io'
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import { RecipeObject } from '../Recipe/recipe';
import { recipe_data } from "../Recipe/recipedata";
import { RecipeDetail } from '../Recipe/detail';
import { UseGeneralContext } from '../Context/generalTables'
import { apiQueryRecipeByTop } from '../axios/withToken'

const HomePage = () => {

    function scrollDown() {
        var div = document.getElementById("middlePart");
        div.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    const navigate = useNavigate();
    const navigateToDetail = () => {
        navigate('/modal');
    }

    const { id2ingredient } = UseGeneralContext();
    const [activeHeart, setActiveHeart] = useState(false);
    const [activeHeart1, setActiveHeart1] = useState(false);
    const [apiRecipeData, setApiRecipeData] = useState([]);

    useEffect(() => {
        const getRecipe = (page) => {
            const promise = apiQueryRecipeByTop(page);
            promise.then((value) => {
                // console.log(value.data.rows);
                setApiRecipeData((prevData) => {
                    const newData = [...prevData];
                    const startIndex = (page - 1) * 15;
                    for (let i = 0; i < value.data.rows.length; i++) {
                        const { id, title, overview, servingSize, instructions, image, video, likeCount, labels, ingredients, comments, createdAt, updatedAt, userName } = value.data.rows[i];
                        const formatIngredients = Object.entries(ingredients).map(([id, amount]) => [id2ingredient[id], amount]);  // ...amount => ! amount is not iterable
                        newData[startIndex + i] = {
                            recipeID: id,
                            recipeName: title,
                            serving: servingSize,
                            ingredients: formatIngredients,
                            instructions: instructions,
                            image_link: image,
                        }
                    }
                    return newData;
                });
            })
        }
        getRecipe(1);
    }, [])

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
                {/* <div className="middle" id="middlePart">
                    <div className="section-title" id="recommend-recipe">
                        Recommended Recipes
                    </div>
                    <div className="recipes-container">
                        {recommendData.map((recipe, index) => (
                            <RecommendRecipeBlock key={index} recipe={ recipe } />
                        ))}
                    </div>
                </div> */}
                <div className="bottom">
                    <div className="section-title">
                        Our Popular Recipes
                    </div>
                    <div className="popRecipes-container">
                        {popularData.map((recipe, index) => (
                            <RecipeObject key={index} recipe={ recipe } />
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