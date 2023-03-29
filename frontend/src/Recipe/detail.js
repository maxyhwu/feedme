import "./detail.css"
import { FiHeart, FiBookmark, FiShare } from 'react-icons/fi';
import { IoCloseCircleOutline } from 'react-icons/io5';

const Detail = () => {
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
                <div className="action-bar">
                    <div className="action">
                        <div className="icon">
                            <FiHeart />
                        </div>
                        <div className="text">Like</div>
                    </div>
                    <div className="action">
                        <div className="icon">
                            <FiBookmark />
                        </div>
                        <div className="text">Save</div>
                    </div>
                    <div className="action">
                        <div className="icon">
                            <FiShare />
                        </div>
                        <div className="text">Share</div>
                    </div>
                </div>
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
                    <IoCloseCircleOutline size={25}/>
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
        </div>
    )
}

export default Detail;