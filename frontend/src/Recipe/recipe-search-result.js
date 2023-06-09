import "./recipe-search-result.css"
import ActionBar from "./Components/ActionBar";
import { useNavigate } from "react-router-dom";

const Recipe_search_result = () => {

    const navigate = useNavigate();
    const navigateToDetail = () => {
        navigate('/modal');
    }

    return (
            <div className="recipe-result-page">
                <div className="Recipe-result-container">
                    <div className="recipe-result" onClick={navigateToDetail}>
                        <div className="result-Img">
                            <img src="https://sudachirecipes.com/wp-content/uploads/2022/08/beef-curry-rice-thumbnail.jpg" alt="" />
                        </div>
                        <div className="result-title">Curry Rice</div>
                        <div className="food-ingredients">
                            <button type="button" className="meat-and-poultry">Chicken</button>
                            <button type="button" className="meat-and-poultry">Beef</button>
                            <button type="button" className="dairy">Curry Roux</button>
                            <button type="button" className="vegetable">Potato</button>
                            <button type="button" className="vegetable">Onion</button>
                            <button type="button" className="vegetable">Carrot</button>
                            <button type="button" className="grains">Japanese Rice</button>
                        </div>
                        <ActionBar />
                    </div>
                    <div className="recipe-result" onClick={navigateToDetail}>
                        <div className="result-Img">
                            <img src="https://www.deliciousmagazine.co.uk/wp-content/uploads/2018/08/302612-1-eng-GB_thyme-roasted-rib-of-beef.jpg" alt="" />
                        </div>
                        <div className="result-title">Rib</div>
                        <div className="food-ingredients">
                            <button type="button" className="meat-and-poultry">Pork</button>
                            <button type="button" className="vegetable">Potato</button>
                        </div>
                        <ActionBar />
                    </div>
                </div>
            </div>
    )
}

export default Recipe_search_result;
