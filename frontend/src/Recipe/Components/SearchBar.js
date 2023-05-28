import { useState, useRef, useEffect } from 'react';
import './SearchBar.css';
import { IoIosArrowDown } from 'react-icons/io';
import { IoFilterCircleOutline, IoClose } from 'react-icons/io5';
import { apiAllIngredient } from '../../axios/noToken';
import { apiQueryRecipeByName, apiQueryRecipeByIngredient } from '../../axios/withToken';
import Spinner from './Spinner';
import { width } from '@mui/system';
import { stringify } from 'uuid';
import { UseGeneralContext } from './../../Context/generalTables'


const EmptyResultDisplay = () => {
    return(
        <div>
            <p>No related ingredients :(</p>
        </div>
    )
}

const SearchBar = ({ setRecipe, setSearching }) => {

    const [toggle, setToggle] = useState(false);
    const [filter, setFilter] = useState('Name');
    const [inputDropdown, setInputDropdown] = useState(false);
    const [ingredients, setIngredients] = useState([]);
    const [searchedIng, setSearchedIng] = useState([]);

    const [choseIngred, setChoseIngred] = useState([]);
    const [choseIngredId, setChoseIngredId] = useState([])

    const [loading, setLoading] = useState(false);
    const [resultIsEmpty, setResultIsEmpty] = useState(false);

    const [input, setInput] = useState("");

    const { id2ingredient } = UseGeneralContext();
    const [tempRecipe, setTempRecipe] = useState([]);

    //const ingredients = [];

    const dropdownRefFilter = useRef(null);
    const dropdownRefInput = useRef(null);

    // const paletteCategory2Color = {
    //     "Vegetables": "#F6C478",
    //     "Meat and Poultry": "#E9A894",
    //     "Seafood": "#F0C9D6",
    //     "Grains": "#AAC2B4",
    //     "Fruits": "#C2BBE3",
    //     "Dairy": "#B4C8E4",
    //     "Nuts and Seeds": "#DDBFA5",
    //     "notActive": "#DDDDDD"
    // };

    // const categoryRows = {
    //     0: {id: 1, cateName: 'Vegetables'},
    //     1: {id: 2, cateName: 'Dairy'},
    //     2: {id: 3, cateName: 'Meat and Poultry'},
    //     3: {id: 4, cateName: 'Seafood'},
    //     4: {id: 5, cateName: 'Grains'}, 
    //     5: {id: 6, cateName: 'Fruits'}, 
    //     6: {id: 7, cateName: 'Nuts and Seeds'}, 
    //     7: {id: 8, cateName: 'Soures'}
    // }

    const ingredientswColor = [
        {
            id: 1,
            category: 'Vegetables',
            color: "#F6C478"
        },
        {
            id: 2,
            category: 'Diary',
            color: "#B4C8E4"
        },
        {
            id: 3,
            category: 'Meat and Poultry',
            color: "#E9A894"
        },
        {
            id: 4,
            category: 'Seafood',
            color: "#F0C9D6"
        },
        {
            id: 5,
            category: 'Grains',
            color: "#AAC2B4"
        },
        {
            id: 6,
            category: 'Fruits',
            color: "#C2BBE3"
        },
        {
            id: 7,
            category: 'Nuts and Seeds',
            color: "#DDBFA5"
        },
        {
            id: 8,
            category: 'Soures',
            color: "#C2BBE3"
        }
    ]

    const handleIngSearch = async() => {
        setLoading(true);
        const allIngredients = await apiAllIngredient();
        setLoading(false);
        // ingredients.push(allIngredients.data.rows);
        setIngredients(allIngredients.data.rows);
        setSearchedIng(allIngredients.data.rows);
        console.log('All ingredients', allIngredients);
        // categoryColor();
    }
    
    const handleSelect = (e) => {
        const select = e.target.innerHTML;
        // console.log(select);
        setFilter(select);
    }

    const handleFilterToggle = () => {
        // console.log('filter clicked!');
        setToggle(!toggle)
    }

    const handleInputDropdown = () => {
        // console.log('click input');
        if (filter != 'Name' && choseIngredId.length === 0) {
            setInputDropdown(!inputDropdown);
            setSearching(false);
            if (choseIngredId.length === 0) {
                handleIngSearch();
            }
        }
        //display all ingredients
        
    }

    const handleFilterClickOutside = (event) => {
        if (dropdownRefFilter.current && !dropdownRefFilter.current.contains(event.target)) {
            //if dropdown is opened and do not click on dropdown content
            // console.log('event target', event.target);
            if (choseIngredId.length === 0) {
                setToggle(false);
            }
        }
    }

    const handleInputClickOutside = (event) => {
        if (dropdownRefInput.current && !dropdownRefInput.current.contains(event.target)) {
            //if dropdown is opened and do not click on dropdown content
            // console.log('event target', event.target);
            
            if (choseIngredId.length === 0) {
                setInputDropdown(false);
            } 
            // setSearching(false);
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleFilterClickOutside);
        document.addEventListener('mousedown', handleInputClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleFilterClickOutside);
          document.removeEventListener('mousedown', handleInputClickOutside);
        };
    }, []);

    const handleDataTraverse = (recipes) => {
        const newRecipes = [];
        recipes.map((recipe, idx) => {
            const { id, title, overview, servingSize, instructions, image, video, likeCount, labels, ingredients, comments, createdAt, updatedAt, userName } = recipe;
            const formatIngredients = Object.entries(ingredients).map(([id, amount]) => [id2ingredient[id], amount]);  // ...amount => ! amount is not iterable
            newRecipes.push({
                recipeID: id,
                recipeName: title,
                serving: servingSize,
                ingredients: formatIngredients,
                instructions: instructions,
                image_link: image,
            })
        })
        console.log('orig recipe', recipes, 'new recipe', newRecipes);
        return newRecipes;
    }

    async function handleKeyUp(event) {
        if (event.key === 'Enter') {
            setInput(event.target.value);
            console.log('handle key up', event.target.value);
            //console.log('handle curr input value', input); //curry
            
            const result = await apiQueryRecipeByName(input);
            console.log('name search result', result.data.rows);
            setSearching(true)
            setRecipe(handleDataTraverse(result.data.rows));
            return true
        }
    }

    const handleSearch = async(filter, input, event) => {
        if (filter === 'Name'){
            setInput(input);
            
            // setRecipeData(result.data.rows);
        } else {
            // console.log('search by', filter);
            setInput(input);
            let searchResult = []
            ingredients.forEach((ingred) => {
                if (ingred.ingredName.toLowerCase().includes(input.toLowerCase())) {
                    // console.log('searched ingredients: ', ingred.ingredName);
                    searchResult.push(ingred)
                }
            })
            if (searchResult.length === 0) {
                setResultIsEmpty(true);
            } else {
                setResultIsEmpty(false);
            }
            setSearchedIng(searchResult);
            // console.log('searched', searchedIng);
        }
    }

    const handleClearInput = () => {
        setInput('');
        setSearching(false);
        setSearching(false);
    }

    const clickIngredToSearch = async(ingredient, type) => {
        if (type === 'add') {
            // const choseIngredId = []
            choseIngredId.push(ingredient.id)
            // setChoseIngredId((prev) => [...prev, ingredient.id])

            // choseIngredId.map(async(id) => {
            //     const searchResult = await apiQueryRecipeByIngredient(parseInt(id));
            //     console.log('id', id, 'result', searchResult);
            // })
            // const testArr = [16, 11, 1]
            const searchResult = await apiQueryRecipeByIngredient(JSON.stringify(choseIngredId));
            console.log('ids', choseIngredId, 'result', searchResult.data.rows);
            setSearching(true);
            setRecipe(handleDataTraverse(searchResult.data.rows));
            setChoseIngred(prev => [...prev, ingredient]);
            setSearchedIng((prev) => prev.filter(element => element != ingredient));
        } else {
            const removeSearchId = choseIngredId.filter(element => element !== ingredient.id)
            // setChoseIngredId((prev) => prev.filter(element => element != ingredient.id))

            const intChoseIngredId = choseIngredId.map((element) => parseInt(element))
            console.log('choosed ingredient ids', intChoseIngredId);

            // choseIngredId.map(async(id) => {
            //     const searchResult = await apiQueryRecipeByIngredient(parseInt(id));
            //     console.log('id', id, 'result', searchResult);
            // })
            // const testArr = [16, 11, 1]

            const searchResult = await apiQueryRecipeByIngredient(JSON.stringify(removeSearchId));
            console.log('ids', removeSearchId, 'result', searchResult.data.rows);
            setSearching(true);
            setRecipe(handleDataTraverse(searchResult.data.rows));
            setChoseIngred(prev => prev.filter(element => element !== ingredient));
            setChoseIngredId((prev) => prev.filter(element => element != ingredient.id))
            setSearchedIng(prev => [...prev, ingredient]);
        }
        
    }

    const handleRemoveOnclick = (removeIngred) => {
        setChoseIngred((prev) => prev.filter(element => element != removeIngred));
        setChoseIngredId((prev) => prev.filter(element => element != removeIngred.id))
        setSearchedIng(prev => [...prev, removeIngred]);
    }

    return(
        <div className="searchbar-container">
            {/* <div className="search-introduction">
                Today you want to find recipes by...
            </div> */}
            <div className="searchbar">
                <div className="search-filter" onClick={handleFilterToggle}>
                    <div className="default-filter">
                        <IoFilterCircleOutline style={{ height: '1.5em' }}/>
                        <div className="default-filter-text">
                            {filter}
                        </div>
                        <IoIosArrowDown />
                    </div>
                    <ul className='filter-list' 
                        style={ toggle? {maxHeight: '300px', width: '100%'}:{}}
                        ref={dropdownRefFilter}
                    >
                        <li className='options' onClick={handleSelect} value='name'>Name</li>
                        <li className='options' onClick={handleSelect} value='ingredients'>Ingredients</li>
                    </ul>
                </div>
                <div className="inputbar-container" >
                    <input type="text" 
                        id='input-bar' 
                        placeholder={'Search recipes by ' + filter} 
                        onClick={handleInputDropdown}
                        onKeyUp={handleKeyUp}
                        value={input}
                        onChange={(e) => {
                            setSearchedIng([]);
                            handleSearch(filter, e.target.value, e);}}/>
                    {
                        input.length != 0 && <IoClose onClick={handleClearInput}/>
                    }
                </div>
                
            </div>
            <div className="search-dropdown" 
                style={ inputDropdown? {maxHeight: 'fit-content'}:{maxHeight: '0'}}
                ref={dropdownRefInput}
                >
                <div className="choosed-ingred" style={ choseIngred.length === 0? {borderBottom: 'none'}:{} }>
                    {
                        choseIngred.length != 0 && choseIngred.map((cIngred, idx) => {
                            return <button type="button"
                                key={idx} 
                                className="ingredient able-cancel" 
                                // onClick={() => handleRemoveOnclick(cIngred)}
                                onClick={() => clickIngredToSearch(cIngred, 'remove')}
                                style={{ background: ingredientswColor.find(obj => obj.id === cIngred.categoryID).color }}>
                                    <IoClose style={{ height: '1.2em', width: '1.2em', marginRight: '0.5em' }}/>
                                    {cIngred.ingredName}
                            </button>
                        })
                    }
                </div>
                <div className="search-ingredients">
                    {loading && <Spinner />}
                    {resultIsEmpty && <EmptyResultDisplay />}
                    {
                        searchedIng.map((ingred, idx) => {
                            return <button type="button"
                                key={idx} 
                                className="ingredient" 
                                onClick={() => clickIngredToSearch(ingred, 'add')}
                                style={{ background: ingredientswColor.find(obj => obj.id === ingred.categoryID).color }}>
                                    {ingred.ingredName}
                            </button>
                        })
                    }
                    {/* <button type="button" 
                        className="ingredient" 
                        style={{ background: paletteCategory2Color['Vegetables'] }}>
                            Potato
                    </button>
                    <button type="button" 
                        className="ingredient" 
                        style={{ background: paletteCategory2Color['Vegetables'] }}>
                            Potato
                    </button>
                    <button type="button" 
                        className="ingredient" 
                        style={{ background: paletteCategory2Color['Vegetables'] }}>
                            Potato
                    </button> */}
                </div>
            </div>
        </div>
    )
}

export default SearchBar;