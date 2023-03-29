import React from "react";
import './myfridge.css'
import { data } from "./fridgedata";


const paletteCategory2Color = {
    "Vegetables": "#F6C478",
    "Meat and Poultry": "#E9A894",
    "Seafood": "#F0C9D6",
    "Grains": "#AAC2B4",
    "Fruits": "#C2BBE3",
    "Dairy": "#B4C8E4",
    "Nuts and Seeds": "#DDBFA5",
    "notActive": "#DDDDDD"
}


class FridgeSearchBar extends React.Component {
    handleFormSubmit = (event) => {
        event.preventDefault();
    }
    render() {
        return (
            <div className="col-3 mb-2" style={{ marginLeft: 'auto' }}>
                <form onSubmit={this.handleFormSubmit}>
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            style={{ borderRadius: '10rem' }}
                            placeholder="Search"
                            value={this.props.searchBarValue}
                            onChange={(e) => this.props.setSearchBarValue(e.target.value)}
                        />
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
        const { category } = this.props;
        const { active } = this.state;
        const buttonColor = paletteCategory2Color[category];

        return (
            <div className="col-auto mb-2">
                <button 
                    type="button"
                    className="btn btn-secondary fridge-functional-button"
                    style={{ backgroundColor: active ? buttonColor : paletteCategory2Color['notActive'] }}
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
            backgroundColor: isActive ? "#B5D6E9" : "#DDDDDD"
        };
        return (
            <div className="col-auto">
                <button 
                    type="button"
                    className="btn btn-secondary fridge-functional-button"
                    style={buttonStyle}
                    onClick={this.handleClick}
                >
                    {orderBy}
                </button>
            </div>
        )
    }
}


class FridgeRenderButton extends React.Component {
    checkExpirationStatus = (expirationDate) => {
        let expirationStatus = {
            statusLabel: ".",
            statusColor: "white"
        };
        // Check if ingredient is expired or expiring soon
        const today = new Date();
        const timeDiff = new Date(expirationDate).getTime() - today.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        const expirationMMDD = new Date(expirationDate).toLocaleString('en-US', { month: '2-digit', day: '2-digit' });

        if (timeDiff < 0) {
            expirationStatus.statusLabel = `Expired ${expirationMMDD}`;
            expirationStatus.statusColor = "#FF0000";
        } else if (daysDiff <= 5) {
            expirationStatus.statusLabel = `Expiring ${expirationMMDD}`;
            expirationStatus.statusColor = "#FF860D";
        }

        return expirationStatus;
    }

    render() {
        const { ingredient } = this.props;
        const bgColor = paletteCategory2Color[ingredient.category];
        const { statusLabel, statusColor } = this.checkExpirationStatus(ingredient.expirationDate);

        return (
            <div className="col-auto mb-2">
                <span style={{ display: "block", textAlign: "right", fontSize: "0.3rem", color: statusColor }}>
                    {statusLabel}
                </span>
                <button type="button" className="btn" style={{ backgroundColor: bgColor, width: "14rem" }}>
                    <span style={{ float: "left" }}>{ingredient.name}</span>
                    <span style={{ float: "right" }}>{ingredient.quantity}</span>
                </button>
            </div>
        );
    }
}


class FridgeRenderBlock extends React.Component {
    render() {
        const { title, ingredients } = this.props;
        return (
            <div className="row mt-2 mb-2">
                <h5>{title}</h5>
                {ingredients.map((ingredient, index) => (
                    <FridgeRenderButton key={index} ingredient={ingredient} />
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
        const fridgeBlocks = groupedKeys.map((groupKey, index) => (
            <FridgeRenderBlock key={index} title={groupKey} ingredients={groupedData[groupKey]} />
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
                    <div className="col-auto mb-2">
                        <h4>My Refrigerator</h4>
                    </div>
                    <div className="col-auto mb-2">
                        <button type="button" className="btn btn-secondary fridge-functional-button">Fridge Setting</button>
                    </div>
                    <div className="col-auto mb-2">
                        <button type="button" className="btn btn-secondary fridge-functional-button">Suggested Recipes</button>
                    </div>
                    <FridgeSearchBar searchBarValue={this.state.searchBarValue} setSearchBarValue={this.setSearchBarValue}/>

                    <div className="row mt-3 mb-3 p-3 fridge-condition-section">
                        <div className="row">
                            <div className="col">
                                <h5>Filters</h5>
                            </div>
                        </div>

                        <div className="row mt-2 mb-2">
                            <FridgeFilterButton category="Vegetables" addRenderFilter={this.addRenderFilter} removeRenderFilter={this.removeRenderFilter} />
                            <FridgeFilterButton category="Meat and Poultry" addRenderFilter={this.addRenderFilter} removeRenderFilter={this.removeRenderFilter} />
                            <FridgeFilterButton category="Seafood" addRenderFilter={this.addRenderFilter} removeRenderFilter={this.removeRenderFilter} />
                            <FridgeFilterButton category="Grains" addRenderFilter={this.addRenderFilter} removeRenderFilter={this.removeRenderFilter} />
                            <FridgeFilterButton category="Fruits" addRenderFilter={this.addRenderFilter} removeRenderFilter={this.removeRenderFilter} />
                            <FridgeFilterButton category="Dairy" addRenderFilter={this.addRenderFilter} removeRenderFilter={this.removeRenderFilter} />
                            <FridgeFilterButton category="Nuts and Seeds" addRenderFilter={this.addRenderFilter} removeRenderFilter={this.removeRenderFilter} />
                        </div>

                        <div className="row">
                            <div className="col">
                                <h5>Order By</h5>
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
