import React from 'react';
import Modal from 'react-modal';
import { FaTrashAlt } from 'react-icons/fa';
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


class FridgeAddIngredientRow extends React.Component {
    render() {
        const { rowId, ingredient, matchingIngredients, quantity, purchaseDate, expirationDate, onInputChange, onDelete } = this.props;
        const datalistId = `matching-ingredients-${rowId}`;

        return (
            <>
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
            </>
        );
    }
}


class FridgeAddIngredientModal extends React.Component {
    state = {
        modalIsOpen: false,
        nextID: 1,
        data: [{
            id: 0,
            ingredient: '',
            matchingIngredients: [],
            quantity: 0,
            purchaseDate: '',
            expirationDate: '',
        }],
    };
  
    handleOpenModal = () => {
        this.setState({ modalIsOpen: true });
    }

    handleCloseModal = () => {
        // const confirmed = window.confirm('Are you sure you want to discard all changes?');
        // if (confirmed) {
        //     this.setState({ modalIsOpen: false });
        // }

        this.resetData()
        this.setState({ modalIsOpen: false });
    }

    handleInputChange = (rowId, fieldName, value) => {
        // Modify the data in state based on the input change
        const newData = this.state.data.map((row) => {
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
    
        this.setState({ data: newData });
    }
    
    handleAddRow = () => {
        // Add a new row to the data array in state
        const newRow = {
            id: this.state.nextID,
            ingredient: '',
            matchingIngredients: [],
            quantity: 0,
            purchaseDate: '',
            expirationDate: '',
        };

        this.setState({
            data: [...this.state.data, newRow],
            nextID: this.state.nextID + 1,
        });
    }

    handleRemoveRow = (rowId) => {
        if (this.state.data.length > 1) {
            const newData = this.state.data.filter(row => row.id !== rowId)
            this.setState({ data: newData });
        }
        else {
            this.resetData()
        }
    }

    handleSave = () => {
        // const confirmed = window.confirm('Are you sure you want to save all changes?');
        // if (confirmed) {
        //     console.log(this.state.data);
        //     this.setState({ modalIsOpen: false });
        // }

        this.setState({ modalIsOpen: false });
    }

    resetData = () => {
        this.setState({ data: [{
            id: 0,
            ingredient: '',
            matchingIngredients: [],
            quantity: 0,
            purchaseDate: '',
            expirationDate: '',
        }]})
    }

    render() {
        return (
        <div>
            <button type="button" className="btn btn-secondary fridgeadd-fixed-button" onClick={this.handleOpenModal}>Add Ingredients</button>
            <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.handleCloseModal} style={customModalStyles}>
                <div className="modal-header">
                    <div className='fridgeadd-title'>Add Ingredients</div>
                    <button className="modal-close btn btn-secondary fridgeadd-btn" onClick={this.handleCloseModal}>
                        <span>&times;</span>
                    </button>
                </div>

                <div className="modal-body">
                    <table class="table fridgeadd-table">
                        <tbody>
                            {this.state.data.map((row) => (
                                <FridgeAddIngredientRow
                                    key={row.id}
                                    rowId={row.id}
                                    ingredient={row.ingredient}
                                    matchingIngredients={row.matchingIngredients}
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
                    <button className='btn btn-secondary fridgeadd-btn' onClick={this.handleSave}>Save Ingredients</button>
                    <button className='btn btn-secondary fridgeadd-btn' onClick={this.handleCloseModal}>Cancel</button>
                </div>
            </Modal>
        </div>
        );
    }
}

export default FridgeAddIngredientModal;