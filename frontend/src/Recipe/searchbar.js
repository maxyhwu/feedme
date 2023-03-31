import "./searchbar.css"
import React,{useState} from 'react'

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

  return (
    <div className="searchbar">
      <div className="searchText">
        <input
          type="text"
          placeholder="Search recipe"
          onChange={handleChange}
          value={searchInput} />
      </div>
      <div className="search-ingredients">
        {ingredients.map((recipe_ingre, index) => {
          <div className="search-ingredient">
            { ingredients.name };
          </div>
        })}
      </div>
    </div>
  )
}

export default SearchBar;
