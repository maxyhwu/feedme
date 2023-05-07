import React, { useState, useEffect } from "react";
import Modal from 'react-modal';
import FridgeAddIngredientModal from  "./fridgeadd"
import { FaTrashAlt } from 'react-icons/fa';
import { IoFilterCircleOutline } from 'react-icons/io5';
import './myfridge.css'
import './fridgeadd.css';
import '../Recipe/Components/SearchBar.css'
import { data } from "./fridgedata";
import { getNoTokenData } from '../utils/useNoTokenApis'
import { UseDataContext } from "../Context/useUserData";
import { apiEditFridge } from '../axios/withToken'

Modal.setAppElement('#root');


const allCategories = [
    "Vegetables",
    "Meat and Poultry",
    "Seafood",
    "Grains",
    "Fruits",
    "Dairy",
    "Nuts and Seeds",
];


const allSortMethods = [
    "Category", 
    "Expiration Date", 
    "Purchase Date",
];


const paletteCategory2Color = {
    "Vegetables": "#F6C478",
    "Meat and Poultry": "#E9A894",
    "Seafood": "#F0C9D6",
    "Grains": "#AAC2B4",
    "Fruits": "#C2BBE3",
    "Dairy": "#B4C8E4",
    "Nuts and Seeds": "#DDBFA5",
    "notActive": "#DDDDDD"
};


const customModalStyles = {
    content: {
        width: '80%',
        transform: 'translate(10%, 0%)', // Translate the modal to the center of the screen
        boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.15)',
        borderRadius: '15px',
    }
};


const FridgeSearchBar = ({ searchBarValue, setSearchBarValue }) => {

    return (
        <div className="searchbar-container">
            <div className="searchbar">
                <div className="search-filter">
                    <div className="default-filter">
                        <IoFilterCircleOutline />
                        Ingredients
                    </div>
                </div>
        
                <input
                    id="fridge-search-bar"
                    type="text"
                    placeholder="Search ingredients"
                    value={searchBarValue}
                    onChange={(e) => setSearchBarValue(e.target.value)}
                />
            </div>
        </div>
    );
};


const FridgeFilterButton = ({ category, addRenderFilter, removeRenderFilter }) => {
    const [active, setActive] = useState(true);
    const buttonColor = paletteCategory2Color[category];
  
    const toggleActive = () => {
        setActive(!active);
    };

    useEffect(() => {
        if (active) {
            addRenderFilter(category);
        } else {
            removeRenderFilter(category);
        }
    }, [active]);
  
    return (
        <>
            <button 
                type="button"
                className="btn btn-secondary fridge-functional-button"
                style={{ backgroundColor: active ? buttonColor : paletteCategory2Color['notActive'] }}
                onClick={toggleActive}
            >
                {category}
            </button>
        </>
    );
};


const FridgeOrderButton = ({ orderBy, isActive, onClick }) => {
    const buttonStyle = {
        backgroundColor: isActive ? '#B5D6E9' : '#DDDDDD',
    };

    const handleClick = () => {
        onClick(orderBy);
    };

    return (
        <>
            <button 
                type="button" 
                className="btn btn-secondary fridge-functional-button" 
                style={buttonStyle} 
                onClick={handleClick}
            >
                {orderBy}
            </button>
        </>
    );
};


const FridgeEditIngredientRow = ({ rowId, quantity, purchaseDate, expirationDate, onInputChange, onDelete }) => {
    return (
        <div>
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
                <button className='btn btn-secondary fridgeadd-delete-btn' onClick={() => onDelete(rowId)}>
                    <FaTrashAlt />
                </button>
            </div>
            <hr />
        </div>
    );
};


const FridgeRenderButton = ({ ingredient }) => {
    const [modalIsOpen, setModalOpenState] = useState(false);
    const [nextID, setNextID] = useState(20000);
    const [fridgeData, setFridgeData] = useState(ingredient.raw);
    const [fridgeDataCopy, setFridgeDataCopy] = useState(ingredient.raw);

    const checkExpirationStatus = (expirationDate) => {
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

    const handleOpenModal = () => {
        setModalOpenState(true);
    }

    const handleCloseModal = () => {
        // const confirmed = window.confirm('Are you sure you want to discard all changes?');
        // if (confirmed) {
        //     setFridgeData(fridgeDataCopy);
        //     setModalOpenState(false);
        // }

        setFridgeData(fridgeDataCopy);
        setModalOpenState(false);
        
    }

    const handleSave = () => {
        // const confirmed = window.confirm('Are you sure you want to save all changes?');
        // if (confirmed) {
        //     setFridgeDataCopy(fridgeData);
        //     setModalOpenState(false);
        // }

        setFridgeDataCopy(fridgeData);
        setModalOpenState(false);
    }

    const handleInputChange = (rowId, fieldName, value) => {
        // Modify the data in state based on the input change
        const newData = fridgeData.map((row) => {
            if (row.userIngredientID === rowId) {
                return {
                    ...row,
                    [fieldName]: value,
                };
            } else {
                return row;
            }
        });

        setFridgeData(newData);
    }

    const handleRemoveRow = (rowId) => {
        const newData = fridgeData.filter(row => row.userIngredientID !== rowId);
        setFridgeData(newData);
    }

    const handleAddRow = () => {
        // Add a new row to the data array in state
        const newRow = {
            userIngredientID: nextID,
            quantity: 0,
            purchaseDate: '',
            expirationDate: '',
        };

        setFridgeData([...fridgeData, newRow]);
        setNextID(nextID + 1);
    }

    const bgColor = paletteCategory2Color[ingredient.category];
    const { statusLabel, statusColor } = checkExpirationStatus(ingredient.expirationDate);

    return (
        <>
            <div className="fridge-render-card">
                <span className="fridge-render-span" style={{ color: statusColor }}>
                    {statusLabel}
                </span>
                <button type="button" className="btn fridge-render-button" style={{ backgroundColor: bgColor }} onClick={handleOpenModal}>
                    {ingredient.name}
                    {/* <span style={{ float: "left" }}>{ingredient.name}</span> */}
                    {/* <span style={{ float: "right" }}>{ingredient.quantity}g</span> */}
                </button>
            </div>
            
            <Modal isOpen={modalIsOpen} onRequestClose={handleCloseModal} style={customModalStyles}>
                <div className="modal-header">
                    <div className='fridge-edit-title'>{ingredient.name}</div>
                    <button className="modal-close btn btn-secondary fridge-edit-btn" onClick={handleCloseModal}>
                        <span>&times;</span>
                    </button>
                </div>

                <div className="modal-body">
                    <div className="recipeadd-table">
                        {fridgeData.map((row) => (
                            <FridgeEditIngredientRow
                                key={row.userIngredientID}
                                rowId={row.userIngredientID}
                                quantity={row.quantity}
                                purchaseDate={row.purchaseDate}
                                expirationDate={row.expirationDate}
                                onInputChange={handleInputChange}
                                onDelete={handleRemoveRow}
                            />
                        ))}

                        <div>
                            <button className="btn btn-secondary fridgeadd-btn" onClick={handleAddRow}>Add Ingredient</button>
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <button className='btn btn-secondary fridgeadd-btn' onClick={handleSave}>Save</button>
                    <button className='btn btn-secondary fridgeadd-btn' onClick={handleCloseModal}>Cancel</button>
                </div>
            </Modal>
        </>
    );
};


const FridgeRenderBlock = ({ title, ingredients }) => {
    return (
        <div className="fridge-render-block">
            <div className="fridge-category-title">{title}</div>
            {ingredients.map((ingredient, index) => (
                <FridgeRenderButton key={index} ingredient={ingredient} />
            ))}
            <hr />
        </div>
    );
};


const FridgeRender = ({ fridgeData, renderCondition }) => {
    const groupDataByRenderOrder = (filteredData) => {
        const { renderOrder } = renderCondition;
        const groupedData = {};
        let groupKey;
    
        filteredData.forEach((ingredient) => {
            if (renderOrder === "Category") {
                groupKey = ingredient.category;
            } else if (renderOrder === "Expiration Date") {
                groupKey = ingredient.expirationDate;
            } else if (renderOrder === "Purchase Date") {
                groupKey = ingredient.purchaseDate;
            }
    
            if (groupedData[groupKey]) {
                groupedData[groupKey].push(ingredient);
            } else {
                groupedData[groupKey] = [ingredient];
            }
        });
    
        return groupedData;
    };
  
    const { searchBarValue, renderFilter, renderOrder } = renderCondition;
  
    // Filter the data array based on the categories in renderFilter
    let filteredData = fridgeData.filter((ingredient) =>
        renderFilter.includes(ingredient.category)
    );
  
    // Filter the data array based on the searchBarValue if it's not an empty string
    if (searchBarValue !== "") {
        filteredData = filteredData.filter((ingredient) =>
            ingredient.name.toLowerCase().startsWith(searchBarValue.toLowerCase())
        );
    }
  
    // Group and Sort by Category/Expiration Date/Purchase Date
    const groupedData = groupDataByRenderOrder(filteredData);
    const groupedKeys = Object.keys(groupedData).sort((a, b) => {
        if (renderOrder === "Expiration Date" || renderOrder === "Purchase Date") {
            return new Date(a) - new Date(b);
        } else if (renderOrder === "Category") {
            const categoryOrder = allCategories;
            return categoryOrder.indexOf(a) - categoryOrder.indexOf(b);
        } else {
            return 0;
        }
    });
  
    // Create an array of FridgeRenderBlock components for each category
    const fridgeBlocks = groupedKeys.map((groupKey, index) => (
        <FridgeRenderBlock
            key={index}
            title={groupKey}
            ingredients={groupedData[groupKey]}
        />
    ));
  
    return (
        <div>
            {fridgeBlocks}
        </div>
    );
};


const MyFridge = () => {
    // const {data} = UseDataContext();
    // const {fridge} = data;
    const [noTokenData, setNoTokenData] = useState({});
    const [allIngredients, setAllIngredients] = useState([]);
    const [ingredient2id, setIngredient2Id] = useState([]);
    const [id2ingredient, setId2Ingredient] = useState([]);
    const [origData, setOrigData] = useState({});
    const [fridgeData, setFridgeData] = useState([]);
    const [searchBarValue, setSearchBarValue] = useState('');
    const [renderFilter, setRenderFilter] = useState(allCategories);
    const [renderOrder, setRenderOrder] = useState('Category');
    const rawData = {
        "6": [
            {
                "count": "3",
                "purchase_date": "2023-05-03",
                "expire_date": "2023-05-16"
            },
            {
                "count": "3",
                "purchase_date": "2023-04-27",
                "expire_date": "2023-04-28"
            }
        ],
        "25": [
            {
                "count": "3",
                "purchase_date": "2023-05-10",
                "expire_date": "2023-05-25"
            }
        ]
    }

    useEffect(() => {
        const promise = getNoTokenData();
        const transformData = (origFridgeData, id2ingredient, ingredient2category) => {
            const transformedFridgeData = [];
            for (const key in origFridgeData) {
                const ingredientId = parseInt(key);
                const ingredientName = id2ingredient[ingredientId];
                const ingredientCategory = ingredient2category[ingredientName];
                const content = origFridgeData[key].map((item) => ({
                    quantity: item.count,
                    purchaseDate: item.purchase_date,
                    expirationDate: item.expire_date,
                }));
                const earliestExpirationDate = Math.min(...origFridgeData[key].map((item) => new Date(item.expire_date)));
                const earliestExpirationDateString = new Date(earliestExpirationDate).toISOString().substring(0, 10);
                const earliestPurchasenDate = Math.min(...origFridgeData[key].map((item) => new Date(item.purchase_date)));
                const earliestPurchasenDateString = new Date(earliestPurchasenDate).toISOString().substring(0, 10);

                transformedFridgeData.push({
                    ingredientId,
                    ingredientName,
                    ingredientCategory,
                    earliestExpirationDate,
                    earliestExpirationDateString,
                    earliestPurchasenDate,
                    earliestPurchasenDateString,
                    content,
                });
            }
            return transformedFridgeData;
        }
        
        promise.then((value) => {
            setNoTokenData(value);
            setAllIngredients(value.ingredientDataWithCateName.map(row => row.ingredName));
            setIngredient2Id(value.ingredient2id);
            setId2Ingredient(value.id2ingredient);
            setFridgeData(transformData(rawData, value.id2ingredient, value.ingredient2category));
        })
    }, [])

    console.log(data)
    console.log(fridgeData)

    const addRenderFilter = (category) => {
        setRenderFilter([...renderFilter, category]);
    };

    const removeRenderFilter = (category) => {
        const newRenderFilter = renderFilter.filter((item) => item !== category);
        setRenderFilter(newRenderFilter);
    };

    const handleOrderButtonClick = (orderBy) => {
        setRenderOrder(orderBy);
    };

    return (
        <>
            <FridgeSearchBar searchBarValue={searchBarValue} setSearchBarValue={setSearchBarValue} />
            <div className="fridge-container">
                <div className="fridge-ingredients-container">
                <FridgeAddIngredientModal />
                <div className="fridge-condition-section">
                    <div className="fridge-category-title">Filters</div>
                    <div>
                        {allCategories.map((category, index) => (
                            <FridgeFilterButton
                                key={index}
                                category={category}
                                addRenderFilter={addRenderFilter}
                                removeRenderFilter={removeRenderFilter}
                            />
                        ))}
                    </div>

                    <div className="fridge-category-title">Sort By</div>
                    <div>
                        {allSortMethods.map((method, index) => (
                            <FridgeOrderButton
                                key={index}
                                orderBy={method}
                                isActive={renderOrder === method}
                                onClick={handleOrderButtonClick}
                            />
                        ))}
                    </div>
                </div>

                <div className="fridge-render-section">
                    <FridgeRender fridgeData={ data } renderCondition={{ searchBarValue, renderFilter, renderOrder }}/>
                </div>
                </div>
            </div>
        </>
    );
};


// Export the MyFridge component
export default MyFridge;
