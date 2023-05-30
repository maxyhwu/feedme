import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { FaTrashAlt, FaDollyFlatbed } from 'react-icons/fa';
import { IoCloseCircleOutline } from 'react-icons/io5';
import "../Recipe/detail.css"
import './fridgeadd.css';
import { getNoTokenData } from '../utils/useNoTokenApis'
import { UseDataContext } from "../Context/useUserData";
import { apiEditFridge } from '../axios/withToken'

Modal.setAppElement('#root');


const customModalStyles = {
    content: {
        width: '80%',
        transform: 'translate(10%, 0%)', // Translate the modal to the center of the screen
        boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.15)',
        borderRadius: '15px',
    }
};


const FridgeAddIngredientRow = ({ rowId, ingredient, matchingIngredients, quantity, purchaseDate, expirationDate, onInputChange, onDelete, ingredientValid, quantityValid, purchaseDateValid, expirationDateValid }) => {
    const datalistId = `matching-ingredients-${rowId}`;

    return (
        <div>
            <div className='d-inline-block'>
                <div className='d-inline-block fridgeadd-label'>Ingredient Name</div>
                <input className={`${ingredientValid ? 'fridgeadd-input' : 'fridgeadd-input-invalid'}`} list={datalistId} type="text" name="ingredient" value={ingredient} onChange={(e) => onInputChange(rowId, e.target.name, e.target.value)} />
                <datalist id={datalistId}>
                    {matchingIngredients.map(ingredient => (
                        <option key={ingredient} value={ingredient} />
                    ))}
                </datalist>
            </div>

            <div className='d-inline-block'>
                <div className='d-inline-block fridgeadd-label'>Quantity</div>
                <input className={`${quantityValid ? 'fridgeadd-input' : 'fridgeadd-input-invalid'}`} type="text" name="quantity" value={quantity} onChange={(e) => onInputChange(rowId, e.target.name, e.target.value)} />
            </div>

            <div className='m-0 p-0'></div>

            <div className='d-inline-block'>
                <div className='d-inline-block fridgeadd-label'>Purchase Date</div>
                <input className={`${purchaseDateValid ? 'fridgeadd-input' : 'fridgeadd-input-invalid'}`} type="date" name="purchaseDate" value={purchaseDate} onChange={(e) => onInputChange(rowId, e.target.name, e.target.value)} />
            </div>

            <div className='d-inline-block'>
                <div className='d-inline-block fridgeadd-label'>Expiration Date</div>
                <input className={`${expirationDateValid ? 'fridgeadd-input' : 'fridgeadd-input-invalid'}`} type="date" name="expirationDate" value={expirationDate} onChange={(e) => onInputChange(rowId, e.target.name, e.target.value)} />
            </div>
            
            <div className='d-inline-block'>
                <button className='btn btn-secondary fridgeadd-delete-btn' onClick={e => onDelete(rowId)}>
                    <FaTrashAlt />
                </button>
            </div>
            
            <hr />
        </div>
    );
};


const FridgeAddIngredientModal = () => {
    const { data, changeData, fetchData } = UseDataContext();
    const [noTokenData, setNoTokenData] = useState({});
    const [allIngredients, setAllIngredients] = useState([]);
    const [ingredient2id, setIngredient2Id] = useState([]);
    const [origData, setOrigData] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [nextID, setNextID] = useState(1);
    const [addData, setData] = useState([]);

    useEffect(() => {
        const promise = getNoTokenData();
        promise.then((value) => {
            setNoTokenData(value);
            setAllIngredients(value.ingredientDataWithCateName.map(row => row.ingredName));
            setIngredient2Id(value.ingredient2id)
        })

        fetchData().then((value) => {
            setOrigData(value.fridge);
        })
    }, [])

    useEffect(() => {
        setData([
            {
                id: 0,
                ingredient: '',
                matchingIngredients: allIngredients.slice(0, 5),
                quantity: '',
                purchaseDate: '',
                expirationDate: '',
                ingredientValid: true,
                quantityValid: true,
                purchaseDateValid: true,
                expirationDateValid: true,
            }
        ])
    }, [allIngredients])

    // console.log(noTokenData);
    // console.log(allIngredients);
    // console.log(ingredient2id);
    // console.log(origData);
    // console.log(data);
    // console.log(fridge);
    
    const handleOpenModal = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        // const confirmed = window.confirm('Are you sure you want to discard all changes?');
        // if (confirmed) {
        //     resetData();
        //     setShowModal(false);
        // }

        resetData();
        setShowModal(false);
    }

    const handleInputChange = (rowId, fieldName, value) => {
        // Modify the data in state based on the input change
        setData(prevData => prevData.map((row) => {
            if (row.id === rowId) {
                if (fieldName === 'ingredient') {
                    const matchingIngredients = allIngredients.filter(row => row.toLowerCase().startsWith(value.toLowerCase()));
                    return {
                        ...row,
                        [fieldName]: value,
                        'matchingIngredients': matchingIngredients.slice(0, 5),
                    };
                }
                else {
                    return {
                        ...row,
                        [fieldName]: value,
                    };
                }
            } else {
                return row;
            }
        }));
    }
    
    const handleAddRow = () => {
        // Add a new row to the data array in state
        const newRow = {
            id: nextID,
            ingredient: '',
            matchingIngredients: allIngredients.slice(0, 5),
            quantity: '',
            purchaseDate: '',
            expirationDate: '',
            ingredientValid: true,
            quantityValid: true,
            purchaseDateValid: true,
            expirationDateValid: true,
        };
    
        setData([...addData, newRow]);
        setNextID(nextID + 1);
    }

    const handleRemoveRow = (rowId) => {
        if (addData.length > 1) {
            const newData = addData.filter(row => row.id !== rowId);
            setData(newData);
        }
        else {
            resetData();
        }
    }

    const handleCheckValidSave = (addData, allIngredients) => {
        let valid = true;
        addData.forEach((row) => {
            if (allIngredients.includes(row.ingredient)) {
                handleInputChange(row.id, 'ingredientValid', true);
            }
            else {
                handleInputChange(row.id, 'ingredientValid', false);
                valid = false;
            }

            if (row.quantity !== '') {
                handleInputChange(row.id, 'quantityValid', true);
            }
            else {
                handleInputChange(row.id, 'quantityValid', false);
                valid = false;
            }

            if (row.purchaseDate !== '') {
                handleInputChange(row.id, 'purchaseDateValid', true);
            }
            else {
                handleInputChange(row.id, 'purchaseDateValid', false);
                valid = false;
            }

            if (row.expirationDate !== '' && row.purchaseDate <= row.expirationDate) {
                handleInputChange(row.id, 'expirationDateValid', true);
            }
            else {
                handleInputChange(row.id, 'expirationDateValid', false);
                valid = false;
            }
        });

        return valid;
    };

    const updateFridgeData = (origData, addData, ingredient2id) => {
        const newData = addData.reduce((acc, cur) => {
            var curIngredId = ingredient2id[cur.ingredient];
            const curEncodedData = {
                'count': cur.quantity,
                'purchase_date': cur.purchaseDate,
                'expire_date': cur.expirationDate,
            };
            if (acc.hasOwnProperty(curIngredId)) {
                acc[curIngredId].push(curEncodedData)
            }
            else {
                acc[curIngredId] = [curEncodedData]
            }
            return acc;
        }, origData);

        apiEditFridge({ fridge: newData });
        changeData({ ...data, fridge: newData });
        // console.log(newData);
        // console.log(data);
    } 

    const handleSave = () => {
        // const confirmed = window.confirm('Are you sure you want to save all changes?');
        // if (confirmed) {
        //     console.log(data);
        //     setShowModal(false);
        // }

        if (handleCheckValidSave(addData, allIngredients)) {
            fetchData().then(value => {
                updateFridgeData(value.fridge, addData, ingredient2id)
                window.location.reload(true);
            });            
            // handleCloseModal();
        }
    }

    const resetData = () => {
        setData([{
            id: 0,
            ingredient: '',
            matchingIngredients: allIngredients.slice(0, 5),
            quantity: '',
            purchaseDate: '',
            expirationDate: '',
            ingredientValid: true,
            quantityValid: true,
            purchaseDateValid: true,
            expirationDateValid: true,
        }]);
    }


    return (
        <div>
            <button type="button" className="btn btn-secondary fridgeadd-fixed-button" onClick={handleOpenModal}>
                <div className='fridgeadd-icon'><FaDollyFlatbed /></div>
                Add Ingredients
            </button>
            <Modal isOpen={showModal} onRequestClose={handleCloseModal} style={customModalStyles}>
                <div className="modal-header">
                    <div className='fridgeadd-title'>Add Ingredients</div>
                    <div className="exit">
                        <IoCloseCircleOutline size={25} onClick={handleCloseModal}/>
                    </div>
                </div>

                <div className="modal-body">
                    <div className="fridgeadd-table">
                            {addData.map((row) => (
                                <FridgeAddIngredientRow
                                    key={row.id}
                                    rowId={row.id}
                                    ingredient={row.ingredient}
                                    matchingIngredients={row.matchingIngredients}
                                    quantity={row.quantity}
                                    purchaseDate={row.purchaseDate}
                                    expirationDate={row.expirationDate}
                                    onInputChange={handleInputChange}
                                    onDelete={handleRemoveRow}
                                    ingredientValid={row.ingredientValid}
                                    quantityValid={row.quantityValid}
                                    purchaseDateValid={row.purchaseDateValid}
                                    expirationDateValid={row.expirationDateValid}
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
        </div>
    );
};

export default FridgeAddIngredientModal;