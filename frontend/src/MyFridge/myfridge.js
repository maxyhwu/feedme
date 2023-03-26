import React from "react";
import { data } from "./fridgedata";


class FridgeSearchBar extends React.Component {
    handleFormSubmit = (event) => {
        event.preventDefault();
        // handle search logic here
    }
    render() {
        return (
            <div className="col-4 offset-2">
                <form onSubmit={this.handleFormSubmit}>
                    <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search"
                        value={this.props.searchBarValue}
                        onChange={(e) => this.props.setSearchBarValue(e.target.value)}
                    />
                    <button type="submit" className="btn btn-outline-secondary">
                        Search
                    </button>
                    </div>
                </form>
            </div>
        )
    }

}

class FridgeFilterButton extends React.Component {
    state = {
        active: true
    };

    toggleActive = () => {
        this.setState({ active: !this.state.active }, () => {
            if (this.state.active) {
                // add category to renderFilter if button becomes active
                this.props.addRenderFilter(this.props.category);
            } else {
                // remove category from renderFilter if button becomes inactive
                this.props.removeRenderFilter(this.props.category);
            }
        });
    }
    
    render() {
        const { category, buttonColor } = this.props;
        const { active } = this.state;

        return (
            <div className="col">
                <button 
                    type="button"
                    className="btn btn-secondary"
                    style={{ backgroundColor: active ? buttonColor : '#CCCCCC' }}
                    onClick={this.toggleActive}
                >
                    {category}
                </button>
            </div>
        )
    }
}

class FridgeOrderButton extends React.Component {
    handleClick = () => {
        const { orderBy, onClick } = this.props;
        onClick(orderBy);
    }

    render() {
        const { orderBy, isActive, onClick } = this.props;
        const buttonStyle = {
            backgroundColor: isActive ? "#88BBD8" : "#CCCCCC"
        };
        return (
            <div className="col">
                <button 
                    type="button"
                    className="btn btn-secondary"
                    style={buttonStyle}
                    onClick={this.handleClick}
                >
                    {orderBy}
                </button>
            </div>
        )
    }
}

class FridgeRenderBlock extends React.Component {
    render() {
        const { title, ingredients } = this.props;
        return (
            <div>
                <h5>{title}</h5>
                {ingredients.map((ingredient, index) => (
                    <button type="button" className="btn btn-secondary">{ingredient.name} ({ingredient.quantity})</button>
                ))}
            </div>
        );
    }
}

class FridgeRender extends React.Component {
    groupDataByRenderOrder = (filteredData) => {
        const { renderOrder } = this.props.renderCondition;
        const groupedData = {};
        let groupKey;

        filteredData.forEach((ingredient) => {
            if (renderOrder === "Category") {
                groupKey = ingredient.category;
            }
            else if (renderOrder === "Expiration Date") {
                groupKey = ingredient.expirationDate;
            }
            else if (renderOrder === "Purchase Date") {
                groupKey = ingredient.purchaseDate;
            }
            
            if (groupedData[groupKey]) {
                groupedData[groupKey].push(ingredient);
            } else {
                groupedData[groupKey] = [ingredient];
            }
        });

        return groupedData;
    }

    render() {
        const { searchBarValue, renderFilter, renderOrder } = this.props.renderCondition;
        
        // Filter the data array based on the categories in renderFilter
        let filteredData = data.filter((ingredient) => renderFilter.includes(ingredient.category));

        // Filter the data array based on the searchBarValue if it's not an empty string
        if (searchBarValue !== '') {
            filteredData = filteredData.filter((ingredient) => ingredient.name.toLowerCase().startsWith(searchBarValue.toLowerCase()));
        }

        // Group and Sort by Category/Expiration Date/Purchase Date
        const groupedData = this.groupDataByRenderOrder(filteredData);
        const groupedKeys = Object.keys(groupedData).sort((a, b) => {
            if (renderOrder === "Expiration Date" || renderOrder === "Purchase Date") {
                return new Date(a) - new Date(b);
            } else if (renderOrder === "Category") {
                const categoryOrder = [
                    "Vegetables",
                    "Meat and Poultry",
                    "Seafood",
                    "Grains",
                    "Fruits",
                    "Dairy",
                    "Nuts and Seeds",
                ];
                return categoryOrder.indexOf(a) - categoryOrder.indexOf(b);
            }
            else {
                return 0;
            }
        });

        // Create an array of FridgeRenderBlock components for each category
        const fridgeBlocks = groupedKeys.map((groupKey) => (
            <FridgeRenderBlock title={groupKey} ingredients={groupedData[groupKey]} />
        ));

        return (
            <div className="row">{fridgeBlocks}</div>
        );
    }
}

class MyFridge extends React.Component {
    state = {
        searchBarValue: '',
        renderFilter: ['Vegetables', 'Meat and Poultry', 'Seafood', 'Grains', 'Fruits', 'Dairy', 'Nuts and Seeds'],
        renderOrder: 'Category',
    };

    setSearchBarValue = (value) => {
        this.setState({ searchBarValue: value });
        // console.log(this.state.searchBarValue);
    };

    addRenderFilter = (category) => {
        this.setState({ renderFilter: [...this.state.renderFilter, category] });
        // console.log(this.state.renderFilter);
    }

    removeRenderFilter = (category) => {
        const newRenderFilter = this.state.renderFilter.filter((item) => item !== category);
        this.setState({ renderFilter: newRenderFilter });
        // console.log(this.state.renderFilter);
    }

    handleOrderButtonClick = (orderBy) => {
        this.setState({ renderOrder: orderBy });
    }
    
    render() {
        return (
            <div className="container m-5">
                <div className="row">
                    <div className="col-2">
                        My Refrigerator
                    </div>
                    <div className="col-auto">
                        <button type="button" className="btn btn-secondary">Fridge Setting</button>
                    </div>
                    <div className="col-auto">
                        <button type="button" className="btn btn-secondary">Suggested Recipe</button>
                    </div>
                    <FridgeSearchBar searchBarValue={this.state.searchBarValue} setSearchBarValue={this.setSearchBarValue}/>

                    <div className="row mt-2 mb-5 p-3">
                        <div className="row">
                            <div className="col">
                                <h4>Filters</h4>
                            </div>
                        </div>

                        <div className="row mt-2 mb-4">
                            <FridgeFilterButton category="Vegetables" buttonColor="#F0AC45" addRenderFilter={this.addRenderFilter} removeRenderFilter={this.removeRenderFilter} />
                            <FridgeFilterButton category="Meat and Poultry" buttonColor="#E58364" addRenderFilter={this.addRenderFilter} removeRenderFilter={this.removeRenderFilter} />
                            <FridgeFilterButton category="Seafood" buttonColor="#E58364" addRenderFilter={this.addRenderFilter} removeRenderFilter={this.removeRenderFilter} />
                            <FridgeFilterButton category="Grains" buttonColor="#55AC80" addRenderFilter={this.addRenderFilter} removeRenderFilter={this.removeRenderFilter} />
                            <FridgeFilterButton category="Fruits" buttonColor="#F0AC45" addRenderFilter={this.addRenderFilter} removeRenderFilter={this.removeRenderFilter} />
                            <FridgeFilterButton category="Dairy" buttonColor="#E58364" addRenderFilter={this.addRenderFilter} removeRenderFilter={this.removeRenderFilter} />
                            <FridgeFilterButton category="Nuts and Seeds" buttonColor="#55AC80" addRenderFilter={this.addRenderFilter} removeRenderFilter={this.removeRenderFilter} />
                        </div>

                        <div className="row">
                            <div className="col">
                                <h4>Order By</h4>
                            </div>
                        </div>

                        <div className="row">
                            <FridgeOrderButton orderBy="Category" isActive={this.state.renderOrder === "Category"} onClick={this.handleOrderButtonClick}/>
                            <FridgeOrderButton orderBy="Expiration Date" isActive={this.state.renderOrder === "Expiration Date"} onClick={this.handleOrderButtonClick}/>
                            <FridgeOrderButton orderBy="Purchase Date" isActive={this.state.renderOrder === "Purchase Date"} onClick={this.handleOrderButtonClick}/>
                        </div>
                    </div>
                    
                    <FridgeRender renderCondition={this.state}/>
                </div>
            </div>
        )
    }
}

// Export the MyFridge component
export default MyFridge;