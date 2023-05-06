const template_data = [
    { userIngredientID: 0, name: 'Carrots', quantity: 2, category: 'Vegetables', purchaseDate: '2023-04-15', expirationDate: '2023-04-30' },
    { userIngredientID: 1, name: 'Milk', quantity: 1, category: 'Dairy', purchaseDate: '2023-04-12', expirationDate: '2023-04-26' },
    { userIngredientID: 2, name: 'Beef', quantity: 1, category: 'Meat and Poultry', purchaseDate: '2023-04-10', expirationDate: '2023-04-25' },
]

const raw_data = [
    // { userIngredientID: 0, name: 'Carrots', quantity: 200, category: 'Vegetables', purchaseDate: '2023-04-15', expirationDate: '2023-04-30' },
    { userIngredientID: 1, name: 'Milk', quantity: 100, category: 'Dairy', purchaseDate: '2023-04-12', expirationDate: '2023-04-16' },
    { userIngredientID: 2, name: 'Beef', quantity: 100, category: 'Meat and Poultry', purchaseDate: '2023-04-10', expirationDate: '2023-04-15' },
    // { userIngredientID: 3, name: 'Salmon', quantity: 200, category: 'Seafood', purchaseDate: '2023-04-13', expirationDate: '2023-04-28' },
    // { userIngredientID: 4, name: 'Brown rice', quantity: 30, category: 'Grains', purchaseDate: '2023-04-11', expirationDate: '2023-04-31' },
    { userIngredientID: 5, name: 'Apples', quantity: 50, category: 'Fruits', purchaseDate: '2023-04-14', expirationDate: '2023-04-20' },
    { userIngredientID: 6, name: 'Almonds', quantity: 100, category: 'Nuts and Seeds', purchaseDate: '2023-04-17', expirationDate: '2023-04-27' },
    // { userIngredientID: 7, name: 'Broccoli', quantity: 100, category: 'Vegetables', purchaseDate: '2023-04-16', expirationDate: '2023-04-20' },
    { userIngredientID: 8, name: 'Chicken', quantity: 100, category: 'Meat and Poultry', purchaseDate: '2023-04-12', expirationDate: '2023-04-23' },
    // { userIngredientID: 9, name: 'Yogurt', quantity: 20, category: 'Dairy', purchaseDate: '2023-04-09', expirationDate: '2023-04-25' },
    // { userIngredientID: 10, name: 'Tilapia', quantity: 200, category: 'Seafood', purchaseDate: '2023-04-14', expirationDate: '2023-04-18' },
    { userIngredientID: 11, name: 'Onions', quantity: 100, category: 'Vegetables', purchaseDate: '2023-04-17', expirationDate: '2023-04-23' },
    { userIngredientID: 12, name: 'Almonds', quantity: 100, category: 'Nuts and Seeds', purchaseDate: '2023-04-12', expirationDate: '2023-04-15' },
    { userIngredientID: 13, name: 'Pork', quantity: 200, category: 'Meat and Poultry', purchaseDate: '2023-04-16', expirationDate: '2023-04-24' },
    { userIngredientID: 14, name: 'Oranges', quantity: 30, category: 'Fruits', purchaseDate: '2023-04-13', expirationDate: '2023-04-28' },
    { userIngredientID: 15, name: 'Oatmeal', quantity: 100, category: 'Grains', purchaseDate: '2023-04-10', expirationDate: '2023-04-18' },
    { userIngredientID: 16, name: 'Spinach', quantity: 100, category: 'Vegetables', purchaseDate: '2023-04-10', expirationDate: '2023-04-16' },
    { userIngredientID: 17, name: 'Cod', quantity: 100, category: 'Seafood', purchaseDate: '2023-04-09', expirationDate: '2023-04-15' },
    { userIngredientID: 18, name: 'Eggs', quantity: 100, category: 'Dairy', purchaseDate: '2023-04-04', expirationDate: '2023-04-11' },
    { userIngredientID: 19, name: 'Shrimp', quantity: 100, category: 'Seafood', purchaseDate: '2023-04-12', expirationDate: '2023-04-21' },
    { userIngredientID: 20, name: 'Tomatoes', quantity: 50, category: 'Vegetables', purchaseDate: '2023-04-12', expirationDate: '2023-04-15' },
    { userIngredientID: 21, name: 'Cashews', quantity: 50, category: 'Nuts and Seeds', purchaseDate: '2023-04-03', expirationDate: '2023-04-13' },
    { userIngredientID: 22, name: 'Chicken', quantity: 300, category: 'Meat and Poultry', purchaseDate: '2023-04-10', expirationDate: '2023-04-16' },
    { userIngredientID: 23, name: 'Lettuce', quantity: 100, category: 'Vegetables', purchaseDate: '2023-04-04', expirationDate: '2023-04-11' },
    { userIngredientID: 24, name: 'Bananas', quantity: 50, category: 'Fruits', purchaseDate: '2023-04-09', expirationDate: '2023-04-14' },
    // { userIngredientID: 25, name: 'Salmon', quantity: 100, category: 'Seafood', purchaseDate: '2023-04-08', expirationDate: '2023-04-13' },
    { userIngredientID: 26, name: 'White Rice', quantity: 100, category: 'Grains', purchaseDate: '2023-04-06', expirationDate: '2023-04-16' },
    { userIngredientID: 27, name: 'Grapes', quantity: 50, category: 'Fruits', purchaseDate: '2023-04-13', expirationDate: '2023-04-22' },
    { userIngredientID: 28, name: 'Cucumber', quantity: 50, category: 'Vegetables', purchaseDate: '2023-04-01', expirationDate: '2023-04-08' },
    // { userIngredientID: 29, name: 'Cheddar Cheese', quantity: 50, category: 'Dairy', purchaseDate: '2023-04-05', expirationDate: '2023-04-15' },
    // { userIngredientID: 30, name: 'Quinoa', quantity: 50, category: 'Grains', purchaseDate: '2023-04-07', expirationDate: '2023-04-10' },
]

export const data = raw_data.reduce((accumulator, currentIngredient) => {
    const existingIngredient = accumulator.find(ingredient => ingredient.name === currentIngredient.name);

    if (existingIngredient) {
        existingIngredient.raw.push({...currentIngredient})
        existingIngredient.quantity += currentIngredient.quantity;
      
        if (currentIngredient.purchaseDate < existingIngredient.purchaseDate) {
            existingIngredient.purchaseDate = currentIngredient.purchaseDate;
        }
      
        if (currentIngredient.expirationDate < existingIngredient.expirationDate) {
            existingIngredient.expirationDate = currentIngredient.expirationDate;
        }
    } else {
        currentIngredient.raw = [{...currentIngredient}];
        accumulator.push({...currentIngredient});
    }
    
    return accumulator;
}, []); 

export const allIngredients = [
    'Apple',
    'Banana',
    'Cherry',
    'Chicken',
    'Corn',
    'Carrots',
    'Coconut',
    'Cinnamon',
];