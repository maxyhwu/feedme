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
import { disconnectSocket } from '../Context/commentSocketHooks';
import { apiQueryRecipeByTop, apiQueryRecipeByUser, apiQueryRecipebyFridge, apiQueryRecipeTotalCount } from '../axios/withToken'


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
        disconnectSocket();
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

                    // setUpdatedRecipe={setUpdatedRecipe}
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
    const { id2ingredient } = UseGeneralContext();
    const [pageTitle, setPageTitle] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage, setRecipesPerPage] = useState(5);
    const [apiRecipeData, setApiRecipeData] = useState([]);
    const [currentRecipes, setCurrentRecipes] = useState([]);
    // const [rerender, setRerender] = useState(false);
    const {login} = UseLoginContext()
    const [searching, setSearching] = useState(false);
    const [searchedRecipe, setSearchedRecipe] = useState([]);
    const [apiRecipesCount, setApiRecipesCount] = useState(1);
    const [totalRecipesCount, setTotalRecipesCount] = useState(1);

    const parseData = (dataArray, prevData, startIndex) => {
        // console.log(dataArray);
        const newData = [...prevData];
        for (let i = 0; i < dataArray.length; i++) {
            const { id, title, overview, servingSize, instructions, image, video, likeCount, labels, ingredients, comments, createdAt, updatedAt, userName } = dataArray[i];
            const formatIngredients = Object.entries(ingredients).map(([id, amount]) => [id2ingredient[id], amount]);  // ...amount => ! amount is not iterable
            newData[startIndex + i] = {
                recipeID: id,
                recipeName: title,
                serving: servingSize,
                ingredients: formatIngredients,
                instructions: instructions,
                image_link: image,
                comments_arr: comments,
                likeCnt: likeCount
            }
        }
        return newData;
    };

    useEffect(() => {
        setCurrentPage(1);
        if (location.pathname === '/recipe') {
            setPageTitle('Our Popular Recipes');
            apiQueryRecipeByTop(currentPage).then((value) => {
                const apiData = parseData(value.data.rows, [], 0);
                setApiRecipeData(apiData);                
            });
            apiQueryRecipeTotalCount().then((value) => {
                setApiRecipesCount(value.data);
            })
        } else if (location.pathname === '/myrecipe') {
            setPageTitle('My Recipes');
            apiQueryRecipeByUser().then((value) => {
                const apiData = parseData(value.data.rows, [], 0);
                setApiRecipeData(apiData);
                setApiRecipesCount(value.data.rows.length);
            });
        } else if (location.pathname === '/suggestrecipe') {
            setPageTitle('Suggest For You');
            apiQueryRecipebyFridge().then((value) => {
                const apiData = parseData(value.data.rows, [], 0);
                setApiRecipeData(apiData);
                setApiRecipesCount(value.data.rows.length);
            });
        }
    }, [location, id2ingredient]);

    useEffect(() => {
        if (location.pathname === '/recipe') {
            apiQueryRecipeByTop(currentPage).then((value) => {
                setApiRecipeData((prevData) => {
                    const startIndex = (currentPage - 1) * 15;
                    const newData = parseData(value.data.rows, prevData, startIndex);
                    return newData;
                });                
            });
            apiQueryRecipeTotalCount().then((value) => {
                setApiRecipesCount(value.data);
            })
        }
    }, [currentPage]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searching, searchedRecipe]);

    useEffect(() => {
        const indexOfLastRecipe = currentPage * recipesPerPage;
        const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
        if (location.pathname === '/recipe' && searching) {
            setTotalRecipesCount(searchedRecipe.length);
            setCurrentRecipes(searchedRecipe.slice(
                indexOfFirstRecipe,
                indexOfLastRecipe,
            ));
        }
        else {
            setTotalRecipesCount(apiRecipesCount);
            setCurrentRecipes(apiRecipeData.slice(
                indexOfFirstRecipe,
                indexOfLastRecipe,
            ));
        }
    }, [location, currentPage, searching, searchedRecipe, apiRecipeData]);

    const navigate = useNavigate();
    const navigateToDetail = () => {
        navigate('/modal');
    }

    const allIngredients = async() => {
        const all = await apiAllIngredient();
        console.log('get all ingredients from recipe', all.data.rows);
        return all.data.rows;
    }

    /* use front-end data */
    // let currentRecipes = recipe_data.slice(
    //     indexOfFirstRecipe,
    //     indexOfLastRecipe,
    // );
    // const totalRecipes = Math.max(recipe_data.length, recipesPerPage * 5);
  
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // console.log(id2ingredient);
    // console.log(recipe_data);
    // console.log(apiRecipeData);
    // console.log(currentRecipes);
    // console.log(apiRecipesCount);

    return (
    <>
        {location.pathname === '/recipe' && (
            <SearchBar setRecipe={setSearchedRecipe} setSearching={setSearching} />
        )}
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
                    {/* {
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
                    } */}
                    
                    {currentRecipes.map((recipe, index) => (
                        <RecipeObject
                            key={index}
                            recipe={recipe}
                            setSearching={setSearching}
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
                {login ? <RecipeAddButton /> : <></>}
                <Pagination
                    recipesPerPage={recipesPerPage}
                    totalRecipes={totalRecipesCount}
                    paginate={paginate}
                    currentPage={currentPage}
                />
            </div>
        </div>
    </>
    )
}

export { Recipe, RecipeObject };
