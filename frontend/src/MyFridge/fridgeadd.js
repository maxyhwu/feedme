import React, { useState } from 'react';
import Modal from 'react-modal';
import { FaTrashAlt, FaDollyFlatbed } from 'react-icons/fa';
import './fridgeadd.css';
import { allIngredients } from './fridgedata'

Modal.setAppElement('#root');


const customModalStyles = {
    content: {
        width: '80%',
        transform: 'translate(10%, 0%)', // Translate the modal to the center of the screen
        boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.15)',
        borderRadius: '15px',
    }
};


const FridgeAddIngredientRow = ({ rowId, ingredient, matchingIngredients, quantity, purchaseDate, expirationDate, onInputChange, onDelete }) => {
    const datalistId = `matching-ingredients-${rowId}`;

    return (
        <tr>
            <div className='d-inline-block'>
                <div className='d-inline-block fridgeadd-label'>Ingredient Name</div>
                <input className='fridgeadd-input' list={datalistId} type="text" name="ingredient" value={ingredient} onChange={(e) => onInputChange(rowId, e.target.name, e.target.value)} />
                <datalist id={datalistId}>
                    {matchingIngredients.map(ingredient => (
                        <option key={ingredient} value={ingredient} />
                    ))}
                </datalist>
            </div>

            <div className='d-inline-block'>
                <div className='d-inline-block fridgeadd-label'>Quantity</div>
                <input className='fridgeadd-input' type="number" min="0" name="quantity" value={quantity} onChange={(e) => onInputChange(rowId, e.target.name, e.target.value)} />
            </div>

            <div className='m-0 p-0'></div>

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
    );
};


const FridgeAddIngredientModal = () => {
    const [showModal, setShowModal] = useState(false);
    const [nextID, setNextID] = useState(1);
    const [data, setData] = useState([{
        id: 0,
        ingredient: '',
        matchingIngredients: [],
        quantity: 0,
        purchaseDate: '',
        expirationDate: '',
    }]);
  
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
        const newData = data.map((row) => {
            if (row.id === rowId) {
                if (fieldName === 'ingredient') {
                    const matchingIngredients = allIngredients.filter(ingredient => ingredient.toLowerCase().includes(value.toLowerCase()));
                    return {
                        ...row,
                        [fieldName]: value,
                        'matchingIngredients': matchingIngredients.slice(0, 5),
                    };
                }
                return {
                    ...row,
                    [fieldName]: value,
                };
            } else {
                return row;
            }
        });

        setData(newData);
    }
    
    const handleAddRow = () => {
        // Add a new row to the data array in state
        const newRow = {
            id: nextID,
            ingredient: '',
            matchingIngredients: [],
            quantity: 0,
            purchaseDate: '',
            expirationDate: '',
        };
    
        setData([...data, newRow]);
        setNextID(nextID + 1);
    }

    const handleRemoveRow = (rowId) => {
        if (data.length > 1) {
            const newData = data.filter(row => row.id !== rowId);
            setData(newData);
        }
        else {
            resetData();
        }
    }

    const handleSave = () => {
        // const confirmed = window.confirm('Are you sure you want to save all changes?');
        // if (confirmed) {
        //     console.log(data);
        //     setShowModal(false);
        // }

        console.log(data);
        handleCloseModal();
    }

    const resetData = () => {
        setData([{
            id: 0,
            ingredient: '',
            matchingIngredients: [],
            quantity: 0,
            purchaseDate: '',
            expirationDate: '',
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
                    <button className="modal-close btn btn-secondary fridgeadd-btn" onClick={handleCloseModal}>
                        <span>&times;</span>
                    </button>
                </div>

                <div className="modal-body">
                    <table class="table fridgeadd-table">
                        <tbody>
                            {data.map((row) => (
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
                                />
                            ))}
                        </tbody>

                        <div>
                            <button className="btn btn-secondary fridgeadd-btn" onClick={handleAddRow}>Add Ingredient</button>
                        </div>
                    </table>
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