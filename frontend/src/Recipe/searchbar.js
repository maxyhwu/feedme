import "./searchbar.css"
import React,{useState} from 'react'
import searchimg from './img/search-icon.png';



const SearchBar = () => {
  const [searchInput,setSearchInput] = useState("");
  const ingredients = [
    { name: "pork", type: "Meat and Poultry" },
    { name: "potato", type: "Vegetables" },
  ];
  const recipe = [
    { name: "curry", type: "India" }, //maybe add country? or something else..
  ]

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  if(searchInput.length > 0) {
    ingredients.filter((recipe_ingre) => {
      return recipe_ingre.name.match(searchInput);
    });
  }

  return <div className="searchbar">
      <div className="searchline">
        <input className="searchText"
          type="text"
          placeholder="Search recipe"
          onChange={handleChange}
          value={searchInput} />
      <img className="searchButton" src={searchimg} alt="searchButton" onClick={(e) => {
        e.preventDefault();
        window.location.href = './recipe-search-result';
      }}/>
      </div>
      <div className="search-ingredients">
      </div>
    </div>

};

export default SearchBar;
