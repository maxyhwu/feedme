import { useState } from 'react';
import './SearchBar.css';
import {IoIosArrowDown} from 'react-icons/io';

const SearchBar = () => {

    const [toggle, setToggle] = useState(false);
    const [filter, setFilter] = useState('name');

    const handleSelect = (e) => {
        const select = e.target.innerHTML;
        // console.log(select);
        setFilter(select);
    }

    return(
        <div className="searchbar-container">
            {/* <div className="search-introduction">
                Today you want to find recipes by...
            </div> */}
            <div className="searchbar">
                <div className="search-filter" onClick={() => setToggle(!toggle)}>
                    <div className="default-filter">
                        Name
                        <IoIosArrowDown />
                    </div>
                    <ul className='filter-list' style={ toggle? {display: 'block'}:{display: 'none'} }>
                        <li className='options' onClick={handleSelect} value='name'>Name</li>
                        <li className='options' onClick={handleSelect} value='ingredients'>Ingredients</li>
                    </ul>
                </div>
                <input type="text" id='search-bar' placeholder={'Search recipes by ' + filter}/>
            </div>
        </div>
    )
}

export default SearchBar;