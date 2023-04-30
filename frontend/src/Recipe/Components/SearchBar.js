import { useState, useRef, useEffect } from 'react';
import './SearchBar.css';
import { IoIosArrowDown } from 'react-icons/io';
import { IoFilterCircleOutline } from 'react-icons/io5';

const SearchBar = () => {

    const [toggle, setToggle] = useState(false);
    const [filter, setFilter] = useState('Name');
    const [inputDropdown, setInputDropdown] = useState(false);

    const dropdownRefFilter = useRef(null);
    const dropdownRefInput = useRef(null);

    const ingredients = [
        {
            name: 'Potato',
            category: 'Vegetables',
            color: "#F6C478"
        },
        {
            name: 'Chicken',
            category: 'Meat and Poultry',
            color: "#E9A894"
        },
        {
            name: 'Beef',
            category: 'Meat and Poultry',
            color: "#E9A894"
        },
        {
            name: 'Onion',
            category: 'Vegetables',
            color: "#F6C478"
        },
        {
            name: 'All ingredients in my fridge',
            category: 'My fridge',
            color: "#C2BBE3"
        }
    ]
    
    const handleSelect = (e) => {
        const select = e.target.innerHTML;
        // console.log(select);
        setFilter(select);
    }

    const handleFilterToggle = () => {
        // console.log('filter clicked!');
        setToggle(!toggle)
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

    return(
        <div className="searchbar-container">
            {/* <div className="search-introduction">
                Today you want to find recipes by...
            </div> */}
            <div className="searchbar">
                <div className="search-filter" onClick={handleFilterToggle}>
                    <div className="default-filter">
                        <IoFilterCircleOutline />
                        {filter}
                        <IoIosArrowDown />
                    </div>
                    <ul className='filter-list' 
                        style={ toggle? {maxHeight: '300px'}:{}}
                        ref={dropdownRefFilter}
                    >
                        <li className='options' onClick={handleSelect} value='name'>Name</li>
                        <li className='options' onClick={handleSelect} value='ingredients'>Ingredients</li>
                    </ul>
                </div>
                <input type="text" 
                    id='search-bar' 
                    placeholder={'Search recipes by ' + filter} 
                    onClick={() => {setInputDropdown(!inputDropdown)}}/>
            </div>
            <div className="search-dropdown" style={ inputDropdown? {maxHeight: '50vh'}:{maxHeight: '0'}}>
                <div className="ingredients" ref={dropdownRefInput}>
                    {
                        ingredients.map((ingred) => {
                            return <button type="button" 
                                className="ingredient" 
                                style={{ background: ingred.color }}>
                                    {ingred.name}
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