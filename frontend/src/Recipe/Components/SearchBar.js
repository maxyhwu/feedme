import { useState, useRef, useEffect } from 'react';
import './SearchBar.css';
import { IoIosArrowDown } from 'react-icons/io';
import { IoFilterCircleOutline } from 'react-icons/io5';
import { apiAllIngredient } from '../../axios/noToken';
import { apiQueryRecipeByName, apiQueryRecipeByIngredient } from '../../axios/withToken';
import Spinner from './Spinner';


const EmptyResultDisplay = () => {
    return(
        <div>
            <p>No related ingredients :(</p>
        </div>
    )
}

const SearchBar = () => {

    const [toggle, setToggle] = useState(false);
    const [filter, setFilter] = useState('Name');
    const [inputDropdown, setInputDropdown] = useState(false);
    const [ingredients, setIngredients] = useState([]);
    const [searchedIng, setSearchedIng] = useState([]);

    const [loading, setLoading] = useState(false);
    const [resultIsEmpty, setResultIsEmpty] = useState(false);

    const [input, setInput] = useState("");

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
        if (filter != 'Name') {
            setInputDropdown(!inputDropdown);
        }
        handleIngSearch();
    }

    const handleFilterClickOutside = (event) => {
        if (dropdownRefFilter.current && !dropdownRefFilter.current.contains(event.target)) {
            //if dropdown is opened and do not click on dropdown content
            // console.log('event target', event.target);
            setToggle(false);
        }
    }

    const handleInputClickOutside = (event) => {
        if (dropdownRefInput.current && !dropdownRefInput.current.contains(event.target)) {
            //if dropdown is opened and do not click on dropdown content
            // console.log('event target', event.target);
            setInputDropdown(false);
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

    function handleKeyUp(event) {
        if (event.key === 'Enter') {
        //   setInput(event.target.value);
          console.log('Enter clicked', event.target.value);
        }
    }

    const handleSearch = async(filter, input, event) => {
        if (filter === 'Name'){
            setInput(input);
            // console.log('search by', filter);
            if (event.key === 'Enter' && input.length > 0) {
                console.log('Enter clicked', input);
                // console.log('search recipe', input);
                const result = await apiQueryRecipeByName(input.toLowerCase());
                console.log('name search result', result.data.rows);
            }
            
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

    const clickIngredToSearch = async(id) => {
        const searchResult = await apiQueryRecipeByIngredient(id);
        console.log('id', id, 'result', searchResult);
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
                <input type="text" 
                    id='search-bar' 
                    placeholder={'Search recipes by ' + filter} 
                    onClick={handleInputDropdown}
                    onKeyUp={handleKeyUp}
                    value={input}
                    onChange={(e) => {
                        setSearchedIng([]);
                        handleSearch(filter, e.target.value, e);}}/>
            </div>
            <div className="search-dropdown" style={ inputDropdown? {maxHeight: 'fit-content'}:{maxHeight: '0'}}>
                <div className="search-ingredients" ref={dropdownRefInput}>
                    {loading && <Spinner />}
                    {resultIsEmpty && <EmptyResultDisplay />}
                    {
                        searchedIng.map((ingred, idx) => {
                            return <button type="button"
                                key={idx} 
                                className="ingredient" 
                                onClick={() => clickIngredToSearch(ingred.id)}
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