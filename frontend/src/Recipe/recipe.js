import "./recipe.css"
import { IoIosArrowForward } from 'react-icons/io';
import SearchBar from "./searchbar";

const Recipe = () => {
    return (
        <div className="recipe">
            <SearchBar />
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
                        <IoIosArrowForward/>
                    </div>
                    <div className="popRecipe">
                        <div className="popImg">
                            <img src="https://tmbidigitalassetsazure.blob.core.windows.net/rms3-prod/attachments/37/1200x1200/Easy-Fresh-Strawberry-Pie_EXPS_TMBBP19_34179_B06_20_3b.jpg" alt="" />
                        </div>
                        <div className="poptitle">Strawberry Pie</div>
                        <IoIosArrowForward/>
                    </div>
                    <div className="popRecipe">
                        <div className="popImg">
                            <img src="https://www.deliciousmagazine.co.uk/wp-content/uploads/2018/08/302612-1-eng-GB_thyme-roasted-rib-of-beef.jpg" alt="" />
                        </div>
                        <div className="poptitle">Rib</div>
                        <IoIosArrowForward/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Recipe;
