import React from "react";
import Modal from 'react-modal';
import { FaTrashAlt } from 'react-icons/fa';
import './myfridge.css'
import './fridgeadd.css';
import '../Recipe/Components/SearchBar.css'
import { data } from "./fridgedata";
import FridgeAddIngredientModal from  "./fridgeadd"
import { IoIosArrowDown } from 'react-icons/io';
import { IoFilterCircleOutline } from 'react-icons/io5';

Modal.setAppElement('#root');


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

const customModalStyles = {
    content: {
        width: '80%',
        transform: 'translate(10%, 0%)', // Translate the modal to the center of the screen
        boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.15)',
        borderRadius: '15px',
    }
};

class FridgeSearchBar extends React.Component {
    handleFormSubmit = (event) => {
        event.preventDefault();
    }

    render() {
        return (
            <div className="searchbar-container">
                <div className="searchbar">
                    <div className="search-filter">
                        <div className="default-filter">
                            <IoFilterCircleOutline />
                            Ingredients
                            <IoIosArrowDown />
                        </div>
                    </div>
                    
                    <input
                        id="fridge-search-bar"
                        type="text"
                        placeholder="Search ingredients"
                        value={this.props.searchBarValue}
                        onChange={(e) => this.props.setSearchBarValue(e.target.value)}
                    />
                </div>
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
            <>
                <button 
                    type="button"
                    className="btn btn-secondary fridge-functional-button"
                    style={{ backgroundColor: active ? buttonColor : paletteCategory2Color['notActive'] }}
                    onClick={this.toggleActive}
                >
                    {category}
                </button>
            </>
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
            <>
                <button 
                    type="button"
                    className="btn btn-secondary fridge-functional-button"
                    style={buttonStyle}
                    onClick={this.handleClick}
                >
                    {orderBy}
                </button>
            </>
        )
    }
}


class FridgeEditIngredientRow extends React.Component {
    render() {
        const { rowId, quantity, purchaseDate, expirationDate, onInputChange, onDelete } = this.props;

        return (
            <>
            <tr>
                <div className='d-inline-block'>
                    <div className='d-inline-block fridgeadd-label'>Quantity</div>
                    <input className='fridgeadd-input' type="number" min="0" name="quantity" value={quantity} onChange={(e) => onInputChange(rowId, e.target.name, e.target.value)} />
                </div>

                <div className='d-inline-block'>
                    <div className='d-inline-block fridgeadd-label'>Purchase Date</div>
                    <input className='fridgeadd-input' type="date" name="purchaseDate" value={purchaseDate} onChange={(e) => onInputChange(rowId, e.target.name, e.target.value)} />
                </div>

                <div className='d-inline-block'>
                    <div className='d-inline-block fridgeadd-label'>Expiration Date</div>
                    <input className='fridgeadd-input' type="date" name="expirationDate" value={expirationDate} onChange={(e) => onInputChange(rowId, e.target.name, e.target.value)} />
                </div>
                
                <div className='d-inline-block'>
                    <button className='btn btn-secondary fridgeadd-delete-btn' onClick={e => onDelete(rowId)}>
                        <FaTrashAlt />
                    </button>
                </div>
                <hr />
            </tr>
            </>
        );
    }
}


class FridgeRenderButton extends React.Component {
    state = {
        modalIsOpen: false,
        nextID: 20000,
        data: this.props.ingredient.raw,
        dataCopy: this.props.ingredient.raw,
    };

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

    handleOpenModal = () => {
        this.setState({ modalIsOpen: true });
        console.log(this.state.data);
    }

    handleCloseModal = () => {
        // const confirmed = window.confirm('Are you sure you want to discard all changes?');
        // if (confirmed) {
        //     this.setState({ modalIsOpen: false, data: this.state.dataCopy });
        // }

        this.setState({ modalIsOpen: false, data: this.state.dataCopy });
    }

    handleSave = () => {
        // const confirmed = window.confirm('Are you sure you want to save all changes?');
        // if (confirmed) {
        //     this.setState({ modalIsOpen: false, dataCopy: this.state.data });
        // }

        this.setState({ modalIsOpen: false, dataCopy: this.state.data });
    }

    handleInputChange = (rowId, fieldName, value) => {
        // Modify the data in state based on the input change
        const newData = this.state.data.map((row) => {
            if (row.userIngredientID === rowId) {
                return {
                    ...row,
                    [fieldName]: value,
                };
            } else {
                return row;
            }
        });
    
        this.setState({ data: newData });
    }

    handleRemoveRow = (rowId) => {
        const newData = this.state.data.filter(row => row.userIngredientID !== rowId)
        this.setState({ data: newData });
    }

    handleAddRow = () => {
        // Add a new row to the data array in state
        const newRow = {
            userIngredientID: this.state.nextID,
            quantity: 0,
            purchaseDate: '',
            expirationDate: '',
        };

        this.setState({
            data: [...this.state.data, newRow],
            nextID: this.state.nextID + 1,
        });
    }

    render() {
        const { ingredient } = this.props;
        const bgColor = paletteCategory2Color[ingredient.category];
        const { statusLabel, statusColor } = this.checkExpirationStatus(ingredient.expirationDate);

        return (
            <>
                <div className="fridge-render-card">
                    <span className="fridge-render-span" style={{ color: statusColor }}>
                        {statusLabel}
                    </span>
                    <button type="button" className="btn fridge-render-button" style={{ backgroundColor: bgColor }} onClick={this.handleOpenModal}>
                        {ingredient.name}
                        {/* <span style={{ float: "left" }}>{ingredient.name}</span> */}
                        {/* <span style={{ float: "right" }}>{ingredient.quantity}g</span> */}
                    </button>
                </div>
                
                <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.handleCloseModal} style={customModalStyles}>
                    <div className="modal-header">
                        <div className='fridge-edit-title'>{ingredient.name}</div>
                        <button className="modal-close btn btn-secondary fridge-edit-btn" onClick={this.handleCloseModal}>
                            <span>&times;</span>
                        </button>
                    </div>

                    <div className="modal-body">
                        <table class="table recipeadd-table">
                            <tbody>
                                {this.state.data.map((row) => (
                                    <FridgeEditIngredientRow
                                        key={row.userIngredientID}
                                        rowId={row.userIngredientID}
                                        quantity={row.quantity}
                                        purchaseDate={row.purchaseDate}
                                        expirationDate={row.expirationDate}
                                        onInputChange={this.handleInputChange}
                                        onDelete={this.handleRemoveRow}
                                    />
                                ))}
                            </tbody>

                            <div>
                                <button className="btn btn-secondary fridgeadd-btn" onClick={this.handleAddRow}>Add Ingredient</button>
                            </div>
                        </table>
                    </div>

                    <div className="modal-footer">
                        <button className='btn btn-secondary fridgeadd-btn' onClick={this.handleSave}>Save</button>
                        <button className='btn btn-secondary fridgeadd-btn' onClick={this.handleCloseModal}>Cancel</button>
                    </div>                    
                </Modal>
            </>
        );
    }
}


class FridgeRenderBlock extends React.Component {
    render() {
        const { title, ingredients } = this.props;
        return (
            <div className="fridge-render-block">
                <div className="fridge-category-title">{title}</div>
                {ingredients.map((ingredient, index) => (
                    <FridgeRenderButton key={index} ingredient={ingredient} />
                ))}
                <hr />
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
            <div>{fridgeBlocks}</div>
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
            <>
            <FridgeSearchBar searchBarValue={this.state.searchBarValue} setSearchBarValue={this.setSearchBarValue}/>
            <div className="fridge-container">
                <div className="fridge-ingredients-container">
                    <FridgeAddIngredientModal />
                    <div className="fridge-condition-section">
                        <div className="fridge-category-title">Filters</div>
                        <div>
                            <FridgeFilterButton category="Vegetables" addRenderFilter={this.addRenderFilter} removeRenderFilter={this.removeRenderFilter} />
                            <FridgeFilterButton category="Meat and Poultry" addRenderFilter={this.addRenderFilter} removeRenderFilter={this.removeRenderFilter} />
                            <FridgeFilterButton category="Seafood" addRenderFilter={this.addRenderFilter} removeRenderFilter={this.removeRenderFilter} />
                            <FridgeFilterButton category="Grains" addRenderFilter={this.addRenderFilter} removeRenderFilter={this.removeRenderFilter} />
                            <FridgeFilterButton category="Fruits" addRenderFilter={this.addRenderFilter} removeRenderFilter={this.removeRenderFilter} />
                            <FridgeFilterButton category="Dairy" addRenderFilter={this.addRenderFilter} removeRenderFilter={this.removeRenderFilter} />
                            <FridgeFilterButton category="Nuts and Seeds" addRenderFilter={this.addRenderFilter} removeRenderFilter={this.removeRenderFilter} />
                        </div>

                        <div className="fridge-category-title">Order By</div>

                        <div>
                            <FridgeOrderButton orderBy="Category" isActive={this.state.renderOrder === "Category"} onClick={this.handleOrderButtonClick}/>
                            <FridgeOrderButton orderBy="Expiration Date" isActive={this.state.renderOrder === "Expiration Date"} onClick={this.handleOrderButtonClick}/>
                            <FridgeOrderButton orderBy="Purchase Date" isActive={this.state.renderOrder === "Purchase Date"} onClick={this.handleOrderButtonClick}/>
                        </div>
                    </div>
                    
                    <div className="fridge-render-section">
                        <FridgeRender renderCondition={this.state}/>
                    </div>
                </div>
            </div>
            </>
        )
    }
}


// Export the MyFridge component
export default MyFridge;
