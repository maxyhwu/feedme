import { apiAllIngredient, apiAllCategory, apiAllLabel } from '../axios/noToken';


const getNoTokenData = async () => {
    const ingredientData = await getIngredientData();
    const categoryData = await getCategoryData();
    const labelData = await getLabelData();

    const category2id = categoryData.reduce((acc, cur) => {
        acc[cur.cateName] = cur.id;
        return acc;
    }, {});
      
    const id2category = categoryData.reduce((acc, cur) => {
        acc[cur.id] = cur.cateName;
        return acc;
    }, {});

    const ingredientDataWithCateName = ingredientData.map((ingredient) => {
        const category = categoryData.find((category) => category.id === ingredient.categoryID);
        return {
            ...ingredient,
            cateName: category.cateName,
        };
    });

    const ingredient2id = ingredientDataWithCateName.reduce((acc, cur) => {
        acc[cur.ingredName] = cur.id;
        return acc;
    }, {});
      
    const id2ingredient = ingredientDataWithCateName.reduce((acc, cur) => {
        acc[cur.id] = cur.ingredName;
        return acc;
    }, {});

    const ingredient2category = ingredientDataWithCateName.reduce((acc, cur) => {
        acc[cur.ingredName] = cur.cateName;
        return acc;
    }, {});

    return { ingredientDataWithCateName, ingredient2id, id2ingredient, ingredient2category, categoryData, category2id, id2category, labelData };
}


const getIngredientData = async () => {
    const response = await apiAllIngredient();
    const result = response.data.rows;
    return result;
};


const getCategoryData = async () => {
    const response = await apiAllCategory();
    const result = response.data.rows;
    return result;
};


const getLabelData = async () => {
    const response = await apiAllLabel();
    const result = response.data.rows;
    return result;
};


export { getNoTokenData };