import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import "./recipe.css"
import { IoIosArrowForward } from 'react-icons/io';
import { useNavigate, useLocation } from "react-router-dom";
import SearchBar from "./Components/SearchBar";
import { RecipeAddButton } from "./recipeadd";
import { recipe_data } from "./recipedata";
import { RecipeDetail } from './detail';
import { UseGeneralContext } from '../Context/generalTables'
import { UseLoginContext } from "../Context/LoginCnt";
import { apiAllIngredient } from '../axios/noToken';
import { apiQueryRecipeByTop, apiQueryRecipeByUser, apiQueryRecipebyFridge } from '../axios/withToken'


const RecipeObject = ({ recipe, setSearching }) => {
    const customModalStyles = {
        content: {
            width: '75%',
            transform: 'translate(15%, 0%)', // Translate the modal to the center of the screen
            boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.15)',
            borderRadius: '15px',
        }
    };
    const [showModal, setShowModal] = useState(false);
    const [updatedRecipe, setUpdatedRecipe] = useState(recipe);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const { recipeName, image_link, recipeID, comments_arr } = recipe;
    // console.log('recipe object comment', comments_arr); //comment exist
    return (
        <>
            <div className="popRecipe" onClick={handleOpenModal}>
                <div className="popImg">
                    <img src={image_link} alt="" style={{height: '100%', width: '100%'}} />
                </div>
                <div className="poptitle">{recipeName}</div>
                <IoIosArrowForward/>
            </div>
            <Modal
                isOpen={showModal}
                onRequestClose={handleCloseModal}
                style={customModalStyles}
            >
                <RecipeDetail key={recipeID} 
                    //recipe={updatedRecipe} 
                    recipe={recipe}
                    handleCloseModal={handleCloseModal}
                    setUpdatedRecipe={setUpdatedRecipe}
                    // refreshRecipePage={setSearching(false)}
                />
            
            </Modal>
        </>
    )

}


const Pagination = ({ recipesPerPage, totalRecipes, paginate, currentPage }) => {
    const pageNumbers = [];
    const maxPageNumbers = 5;

    for (let i = 1; i <= Math.ceil(totalRecipes / recipesPerPage); i++) {
        pageNumbers.push(i);
    }

    const lastPage = pageNumbers[pageNumbers.length - 1];
    let firstPageInRange;
    if (lastPage - currentPage < Math.floor(maxPageNumbers / 2)) {
        firstPageInRange = lastPage - maxPageNumbers + 1;
    }
    else {
        firstPageInRange = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
    }
    const lastPageInRange = Math.min(lastPage, firstPageInRange + maxPageNumbers - 1);    

    const goToFirstPage = () => {
        paginate(1);
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
        paginate(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < lastPage) {
        paginate(currentPage + 1);
        }
    };

    const goToLastPage = () => {
        paginate(lastPage);
    };

    return (
        <div className="page-pagination">
            <div
                onClick={goToFirstPage}
                className={`page-number ${currentPage === 1 ? 'page-number-disabled' : ''}`}
            >
                {'<<'}
            </div>
            <div
                onClick={goToPreviousPage}
                className={`page-number ${currentPage === 1 ? 'page-number-disabled' : ''}`}
            >
                {'<'}
            </div>
            {pageNumbers.slice(firstPageInRange - 1, lastPageInRange).map((number) => (
                <div
                    key={number}
                    onClick={() => paginate(number)}
                    className={`page-number ${currentPage === number ? 'page-number-active' : ''}`}
                >
                    {number}
                </div>
            ))}
            <div
                onClick={goToNextPage}
                className={`page-number ${currentPage === lastPage ? 'page-number-disabled' : ''}`}
            >
                {'>'}
            </div>
            <div
                onClick={goToLastPage}
                className={`page-number ${currentPage === lastPage ? 'page-number-disabled' : ''}`}
            >
                {'>>'}
            </div>
        </div>
    );
};


const Recipe = () => {
    const location = useLocation();
    const [pageTitle, setPageTitle] = useState('');
    const { id2ingredient } = UseGeneralContext();
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage, setRecipesPerPage] = useState(5);
    const [apiRecipeData, setApiRecipeData] = useState([]);
    // const [rerender, setRerender] = useState(false);
    const {login} = UseLoginContext()

    useEffect(() => {
        const getRecipe = (page) => {
            let promise;
            if (location.pathname === '/recipe') {
                promise = apiQueryRecipeByTop(page);
                setPageTitle('Our Popular Recipes');
            } else if (location.pathname === '/myrecipe') {
                promise = apiQueryRecipeByUser();
                setPageTitle('My Recipes');
            } else if (location.pathname === '/suggestrecipe') {
                promise = apiQueryRecipebyFridge();
                setPageTitle('Suggest For You');
            }
            
            promise.then((value) => {
                console.log('apiRecipeData', value.data.rows);
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
                            comments_arr: comments
                        }
                        console.log('set api recipe data comments', value.data.rows[i].comments);
                    }
                    return newData;
                });
            })
        }
        getRecipe(currentPage);
    }, [location, currentPage])

    const navigate = useNavigate();
    const navigateToDetail = () => {
        navigate('/modal');
    }

    const allIngredients = async() => {
        const all = await apiAllIngredient();
        console.log('get all ingredients from recipe', all.data.rows);
        return all.data.rows;
    }

    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = recipe_data.slice(
        indexOfFirstRecipe,
        indexOfLastRecipe,
    );
    const totalRecipes = Math.max(recipe_data.length, recipesPerPage * 5);
  
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // console.log(id2ingredient);
    // console.log(recipe_data);
    // console.log(apiRecipeData);

    const [searching, setSearching] = useState(false);
    const [searchedRecipe, setSearchedRecipe] = useState([]);

    return (
    <>
        <SearchBar setRecipe={setSearchedRecipe} setSearching={setSearching}/>
        <div className="recipe-container">
            <div className="bottom">
                <div className="section-title">
                    {pageTitle}
                </div>
                <div className="popRecipes-container">
                    {/* {
                        recipe_data.map((recipe) => (
                            <RecipeObject
                                recipe={recipe}
                            />))
                    } */}
                    {/* try use backend data */}
                    {
                        searching ?
                        (
                            searchedRecipe.map((recipe, idx) => (
                                <RecipeObject
                                    key={idx}
                                    recipe={recipe}
                                    setSearching={setSearching}
                                />
                        ))): (
                            apiRecipeData.map((recipe, idx) => (
                                <RecipeObject
                                    key={idx}
                                    recipe={recipe}
                                    setSearching={setSearching}
                                />
                        )))
                    }
                    
                    {/* {currentRecipes.map((recipe, index) => (
                        <RecipeObject
                            key={index}
                            recipe={recipe}
                        />
                    ))} */}
                    
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
                {login ? <RecipeAddButton /> : <></>}
                <Pagination
                    recipesPerPage={recipesPerPage}
                    totalRecipes={totalRecipes}
                    paginate={paginate}
                    currentPage={currentPage}
                />
            </div>
        </div>
    </>
    )
}

export { Recipe, RecipeObject };
