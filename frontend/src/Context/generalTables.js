import React, {useContext, useState} from 'react'
import { apiAllIngredient, apiAllCategory, apiAllLabel } from "../axios/noToken";

const GeneralContext = React.createContext({
        ingredientTable: [],
        categoryTable: [],
        labelTable: [],
        changeIngredientTable: () => {},
        changeCategoryTable: () => {},
        changeLabelTable: () => {}
    }
);

const getIngredient = () => {
    const ingredientPromise = apiAllIngredient();
    ingredientPromise.then((value) => {
        return value;
    })
}
const getCategory = () => {
    const categoryPromise = apiAllCategory();
    categoryPromise.then((value) => {
        return value;
    })
}
const getLabel = () => {
    const labelPromise = apiAllLabel();
    labelPromise.then((value) => {
        return value;
    })
}

const GeneralContextProvider = (props) => {
    const [ingredientTable, setIngredientTable] = useState([])
    const changeIngredientTable = () => {
        setIngredientTable(getIngredient());
    }
    const [categoryTable, setCategoryTable] = useState([])
    const changeCategoryTable = () => {
        setCategoryTable(getCategory())
    }
    const [labelTable, setLabelTable] = useState([])
    const changeLabelTable = () => {
        setLabelTable(getLabel())
    }
    return (
        <GeneralContext.Provider 
            value={{ingredientTable,
                    categoryTable,
                    labelTable,
                    changeIngredientTable,
                    changeCategoryTable,
                    changeLabelTable}}>
            {props.children}
        </GeneralContext.Provider>
    );
}

const UseGeneralContext = () => {
    return useContext(GeneralContext)
}

export { GeneralContextProvider, UseGeneralContext };