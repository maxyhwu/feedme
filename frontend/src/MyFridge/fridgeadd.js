import React, { Component } from 'react';
import Modal from 'react-modal';
import { FaTrashAlt } from 'react-icons/fa';
import './myfridge.css';

Modal.setAppElement('#root');

class FridgeAddIngredientRow extends Component {
    render() {
        const { minId, rowId, ingredient, quantity, purchaseDate, expirationDate, onInputChange, onDelete } = this.props;

        return (
            <div className='row'>
                <div className='col-auto'>
                    <div className='row mb-3'>
                        <div className='col-auto'>
                            {rowId === minId && (
                                <strong>Ingredient</strong>
                            )}  
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-auto'>
                            <input className='fridge-add-ing-input' type="text" name="ingredient" value={ingredient} onChange={(e) => onInputChange(rowId, e.target.name, e.target.value)} />
                        </div>
                    </div>
                </div>
                
                <div className='col-auto'>
                    <div className='row mb-3'>
                        <div className='col-auto'>
                            {rowId === minId && (
                                <strong>Quantity</strong>
                            )}
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-auto'>
                            <input className='fridge-add-ing-input' type="text" name="quantity" value={quantity} onChange={(e) => onInputChange(rowId, e.target.name, e.target.value)} />
                        </div>
                    </div>
                </div>
                
                <div className='col-auto'>
                    <div className='row mb-3'>
                        <div className='col-auto'>
                            {rowId === minId && (
                                <strong>Purchase Date</strong>
                            )}
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-auto'>
                            <input  className='fridge-add-ing-input' type="date" name="purchaseDate" value={purchaseDate} onChange={(e) => onInputChange(rowId, e.target.name, e.target.value)} />
                        </div>
                    </div>
                </div>
                
                <div className='col-auto'>
                    <div className='row mb-3'>
                        <div className='col-auto'>
                            {rowId === minId && (
                                <strong>Expiration Date</strong>
                            )}
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-auto'>
                            <input className='fridge-add-ing-input' type="date" name="expirationDate" value={expirationDate} onChange={(e) => onInputChange(rowId, e.target.name, e.target.value)} />
                        </div>
                    </div>
                </div>

                <div className='col-auto'>
                    <div className='row mb-3'>
                        <div className='col-auto'>
                            {rowId === minId && (
                                <strong>Delete</strong>
                            )}
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-auto'>
                            <button className='btn btn-secondary fridge-add-ing-delete-button' type="button" onClick={e => onDelete(rowId)}>
                                <FaTrashAlt />
                            </button>
                        </div>
                    </div>
                </div>              
            </div>
        );
    }
}


class FridgeAddIngredientModal extends Component {
    state = {
        modalIsOpen: false,
        minID: 0,
        nextID: 1,
        data: [{
            id: 0,
            ingredient: '',
            quantity: '',
            purchaseDate: '',
            expirationDate: '',
        }],
    };
  
    handleOpenModal = () => {
        this.setState({ modalIsOpen: true });
    }

    handleCloseModal = () => {
        const confirmed = window.confirm('Are you sure you want to discard all changes?');
        if (confirmed) {
            this.setState({ modalIsOpen: false });
        }
    }

    handleInputChange = (rowId, fieldName, value) => {
        // Modify the data in state based on the input change
        const newData = this.state.data.map((row) => {
          if (row.id === rowId) {
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
            quantity: '',
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
            this.setState({ data: newData, minID: newData[0].id });
        }
    }

    handleSave = () => {
        const confirmed = window.confirm('Are you sure you want to save all changes?');
        if (confirmed) {
            console.log(this.state.data);
            this.setState({ modalIsOpen: false });
        }
    }

    render() {
        return (
        <div className="col-auto mb-2">
            <button type="button" className="btn btn-secondary fridge-functional-button" onClick={this.handleOpenModal}>Add Ingredients</button>
            <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.handleCloseModal} style={{ content: {borderRadius: '0.5rem', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'} }}>
                <div className='row mb-5'>
                    <div className='col-auto' style={{ flexGrow: 1 }}>
                        <h4>Add Ingredients</h4>
                    </div>
                    <div className='col-auto ml-auto'>
                        <button type="button" className="btn btn-secondary fridge-functional-button" onClick={this.handleSave}>Save</button>
                    </div>
                    <div className='col-auto'>
                        <button type="button" className="btn btn-secondary" style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }} onClick={this.handleCloseModal}>Cancel</button>
                    </div>
                </div>

                {this.state.data.map((row) => (
                    <FridgeAddIngredientRow
                        key={row.id}
                        minId={this.state.minID}
                        rowId={row.id}
                        ingredient={row.ingredient}
                        quantity={row.quantity}
                        purchaseDate={row.purchaseDate}
                        expirationDate={row.expirationDate}
                        onInputChange={this.handleInputChange}
                        onDelete={this.handleRemoveRow}
                    />
                ))}

                <div className='row mt-3'>
                    <div className='col-auto'>
                        <button type="button" className="btn btn-secondary fridge-functional-button" onClick={this.handleAddRow}>+</button>
                    </div>
                </div>
            </Modal>
        </div>
        );
    }
}

export default FridgeAddIngredientModal;