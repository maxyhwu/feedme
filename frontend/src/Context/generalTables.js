import React, {useContext, useEffect, useState} from 'react'
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

const GeneralContextProvider = (props) => {
    const [ingredientTable, setIngredientTable] = useState([])
    const [ingredient2id, setIngredient2id] = useState([]);
    const [id2ingredient, setId2Ingredient] = useState([]);
    const [ingredient2category, setIngredient2Category] = useState([]);
    const [label2id, setLabel2Id] = useState([]);
    const [id2label, setId2Label] = useState([]);
    const changeIngredientTable = () => {
        const ingredientPromise = apiAllIngredient();
        ingredientPromise.then(({data}) => {
            // console.log("gcp cit: ", data.rows);
            setIngredientTable(data.rows);
        })
    }
    const [categoryTable, setCategoryTable] = useState([])
    const changeCategoryTable = () => {
        const categoryPromise = apiAllCategory();
        categoryPromise.then(({data}) => {
            setCategoryTable(data.rows);
        })
    }
    const [labelTable, setLabelTable] = useState([])
    const changeLabelTable = () => {
        const labelPromise = apiAllLabel();
        labelPromise.then(({data}) => {
            setLabelTable(data.rows);
        })
    }
    // useEffect(() => {
    //     console.log("ingredientTable:", ingredientTable);
    //     console.log("categoryTable:", categoryTable);
    //     if (ingredientTable.length > 0 && categoryTable.length > 0) {
    //         changeITWCN();
    //         console.log("changeITWCN", ingredientTableWithCategoryName);
    //     }
    //     changeCategory2Id();
    //     console.log("changeCategory2Id", category2id);
    //     changeId2Category();
    //     console.log("changeId2Category", id2category);
    // }, [ingredientTable, categoryTable]);

    useEffect(() => {
        //console.log("ingredientTable:", ingredientTable);
        //console.log("categoryTable:", categoryTable);
        //console.log("labelTable:", labelTable);
        if (ingredientTable.length > 0 && categoryTable.length > 0) {
            changeITWCN();
            //console.log("changeITWCN", ingredientTableWithCategoryName);
        }
        changeCategory2Id();
        //console.log("changeCategory2Id", category2id);
        changeId2Category();
        //console.log("changeId2Category", id2category);
    }, [ingredientTable, categoryTable, labelTable]);

    const [ingredientTableWithCategoryName, setITWCN] = useState([]);
    const changeITWCN = () => {
        setITWCN(ingredientTable.map((ingredient) => {
            const category = categoryTable.find((category) => category.id === ingredient.categoryID);
            return {
                ...ingredient,
                cateName: category.cateName,
            };
        }));
    }
    useEffect(() => {
        changeIngredient2id();
        //console.log("changeIngredient2id", ingredient2id);
        changeId2Ingredient();
        //console.log("changeId2Ingredient", id2ingredient);
        changeIngredient2Category();
        //console.log("changeIngredient2Category", ingredient2category);
        changeLabel2Id();
        //console.log("changeLabel2Id", label2id);
        changeId2Label();
        //console.log("changeId2Label", id2label);
    }, [ingredientTableWithCategoryName])
    useEffect(() => {
        console.log("ingredientTable",ingredientTable);
    },[ingredientTable])
    useEffect(() => {
        console.log("categoryTable",categoryTable);
    },[categoryTable])
    useEffect(() => {
        console.log("labelTable",labelTable);
    },[labelTable])
    useEffect(() => {
        console.log("changeITWCN",ingredientTableWithCategoryName);
    },[ingredientTableWithCategoryName])
    useEffect(() => {
        console.log("changeIngredient2id",ingredient2id);
    },[ingredient2id])
    useEffect(() => {
        console.log("changeId2Ingredient",id2ingredient);
    },[id2ingredient])
    useEffect(() => {
        console.log("changeIngredient2Category",ingredient2category);
    },[ingredient2category])
    useEffect(() => {
        console.log("changeLabel2Id",label2id);
    },[label2id])
    useEffect(() => {
        console.log("changeId2Label",id2label);
    },[id2label])

    const changeIngredient2id = () => {
        setIngredient2id(ingredientTableWithCategoryName.reduce((acc, cur) => {
            acc[cur.ingredName] = cur.id;
            return acc;
        }, {}));
    }

    const changeId2Ingredient = () => {
        setId2Ingredient(ingredientTableWithCategoryName.reduce((acc, cur) => {
            acc[cur.id] = cur.ingredName;
            return acc;
        }, {}));
    }

    const changeIngredient2Category = () => {
        setIngredient2Category(ingredientTableWithCategoryName.reduce((acc, cur) => {
            acc[cur.ingredName] = cur.cateName;
            return acc;
        }, {}));
    }

    const [category2id, setCategory2Id] = useState([]);
    const changeCategory2Id = () => {
        setCategory2Id(categoryTable.reduce((acc, cur) => {
            acc[cur.cateName] = cur.id;
            return acc;
        }, {}));
    }

    const [id2category, setId2Category] = useState([]);
    const changeId2Category = () => {
        setId2Category(categoryTable.reduce((acc, cur) => {
            acc[cur.id] = cur.cateName;
            return acc;
        }, {}));
    }

    const changeLabel2Id = () => {
        setLabel2Id(labelTable.reduce((acc, cur) => {
            acc[cur.labelName] = cur.id;
            return acc;
        }, {}));
    }
    const changeId2Label = () => {
        setId2Label(labelTable.reduce((acc, cur) => {
            acc[cur.id] = cur.labelName;
            return acc;
        }, {}));
    }

    return (
        <GeneralContext.Provider
            value={{ingredientTable,
                    categoryTable,
                    labelTable,
                    changeIngredientTable,
                    changeCategoryTable,
                    changeLabelTable,
                    ingredientTableWithCategoryName,
                    ingredient2id,
                    id2ingredient,
                    ingredient2category,
                    category2id,
                    id2category,
                    label2id,
                    id2label}}>
            {props.children}
        </GeneralContext.Provider>
    );
}

const UseGeneralContext = () => {
    return useContext(GeneralContext);
}

export { GeneralContextProvider, UseGeneralContext };
