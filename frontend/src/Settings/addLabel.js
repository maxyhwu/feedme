import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import './Settings.css'

function SettingAddLabelRow ({ rowId, label, matchingLabels, onInputChange, onDelete, labelValid }) {
    const datalistId = `matching-label-${rowId}`;

    return (
        <div>
            <div className='d-inline-block'>
                {/* <div className='d-inline-block fridgeadd-label'>Choose Name</div> */}
                <input className={`${labelValid ? 'labeladd-input' : 'labeladd-input-invalid'}`} list={datalistId} type="text" name="label" value={label} onChange={(e) => onInputChange(rowId, e.target.name, e.target.value)} />
                <datalist id={datalistId}>
                    {matchingLabels.map(label => (
                        <option key={label} value={label} />
                    ))}
                </datalist>
            </div>        
            <div className='d-inline-block'>
                <button className='btn btn-secondary fridgeadd-delete-btn' onClick={() => onDelete(rowId)}>
                    <FaTrashAlt />
                </button>
            </div>
        </div>
    );
};

export default SettingAddLabelRow
