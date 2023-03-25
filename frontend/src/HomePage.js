import "./HomePage.css"

const HomePage = () => {
    return (
        <div className="main-container">
            <div className="main">
                <div className="top">
                    <div className="title">
                        A recipe has no soul. You, as a cook, must bring soul to the recipe. -Thomas Keller
                    </div>
                    <div className="subtitle">
                        We provide all kinds of functions to serve others innovative cuisines to your table.
                    </div>
                    <button> Discover more </button>
                </div>
                <div className="middle">
                    <div className="section-title">
                        Recommended Recipes
                    </div>
                    <div className="recipes-container">
                        <div className="recipe">
                            <div className="recipe-title"> Curry Rice </div>
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
                        <div className="recipe">
                            <div className="recipe-title"> Scrambled Eggs </div>
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
                    </div>
                </div>
                <div className="bottom">
                    <div className="section-title">
                        Our Popular Recipes
                    </div>
                    <div className="popRecipes-container">
                        <div className="popRecipe">
                            <div className="popImg">
                                <img src="https://sudachirecipes.com/wp-content/uploads/2022/08/beef-curry-rice-thumbnail.jpg" alt="" />
                            </div>
                            <div className="poptitle">Curry Rice</div>
                        </div>
                        <div className="popRecipe">
                            <div className="popImg">
                                <img src="data:image/jpeg;base64,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" alt="" />
                            </div>
                            <div className="poptitle">Strawberry Pie</div>
                        </div>
                        <div className="popRecipe">
                            <div className="popImg">
                                <img src="https://www.deliciousmagazine.co.uk/wp-content/uploads/2018/08/302612-1-eng-GB_thyme-roasted-rib-of-beef.jpg" alt="" />
                            </div>
                            <div className="poptitle">Rib</div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage;