const template_data = [
    { userIngredientID: 0, name: 'Carrots', quantity: 2, category: 'Vegetables', purchaseDate: '2023-07-15', expirationDate: '2023-07-30' },
    { userIngredientID: 1, name: 'Milk', quantity: 1, category: 'Dairy', purchaseDate: '2023-07-12', expirationDate: '2023-07-26' },
    { userIngredientID: 2, name: 'Beef', quantity: 1, category: 'Meat and Poultry', purchaseDate: '2023-07-10', expirationDate: '2023-07-25' },
]

const raw_data = [
    { userIngredientID: 0, name: 'Carrots', quantity: 2, category: 'Vegetables', purchaseDate: '2023-07-15', expirationDate: '2023-03-30' },
    { userIngredientID: 1, name: 'Milk', quantity: 1, category: 'Dairy', purchaseDate: '2023-07-12', expirationDate: '2023-03-26' },
    { userIngredientID: 2, name: 'Beef', quantity: 1, category: 'Meat and Poultry', purchaseDate: '2023-07-10', expirationDate: '2023-03-25' },
    { userIngredientID: 3, name: 'Salmon', quantity: 2, category: 'Seafood', purchaseDate: '2023-07-13', expirationDate: '2023-03-28' },
    { userIngredientID: 4, name: 'Brown rice', quantity: 3, category: 'Grains', purchaseDate: '2023-07-11', expirationDate: '2023-03-31' },
    { userIngredientID: 5, name: 'Apples', quantity: 5, category: 'Fruits', purchaseDate: '2023-07-14', expirationDate: '2023-03-20' },
    { userIngredientID: 6, name: 'Almonds', quantity: 1, category: 'Nuts and Seeds', purchaseDate: '2023-07-17', expirationDate: '2023-03-27' },
    { userIngredientID: 7, name: 'Broccoli', quantity: 1, category: 'Vegetables', purchaseDate: '2023-07-16', expirationDate: '2023-07-20' },
    { userIngredientID: 8, name: 'Chicken', quantity: 1, category: 'Meat and Poultry', purchaseDate: '2023-07-12', expirationDate: '2023-07-23' },
    { userIngredientID: 9, name: 'Yogurt', quantity: 2, category: 'Dairy', purchaseDate: '2023-07-09', expirationDate: '2023-07-25' },
    { userIngredientID: 10, name: 'Tilapia', quantity: 2, category: 'Seafood', purchaseDate: '2023-07-14', expirationDate: '2023-07-18' },
    { userIngredientID: 11, name: 'Broccoli', quantity: 1, category: 'Vegetables', purchaseDate: '2023-07-17', expirationDate: '2023-07-23' },
    { userIngredientID: 12, name: 'Almonds', quantity: 1, category: 'Nuts and Seeds', purchaseDate: '2023-07-22', expirationDate: '2023-03-15' },
    { userIngredientID: 13, name: 'Pork', quantity: 1, category: 'Meat and Poultry', purchaseDate: '2023-07-16', expirationDate: '2023-07-24' },
    { userIngredientID: 14, name: 'Oranges', quantity: 3, category: 'Fruits', purchaseDate: '2023-07-13', expirationDate: '2023-07-28' },
    { userIngredientID: 15, name: 'Oatmeal', quantity: 1, category: 'Grains', purchaseDate: '2023-07-18', expirationDate: '2023-03-18' },
    { userIngredientID: 16, name: 'Spinach', quantity: 1, category: 'Vegetables', purchaseDate: '2023-07-15', expirationDate: '2023-07-26' },
    { userIngredientID: 17, name: 'Cod', quantity: 1, category: 'Seafood', purchaseDate: '2023-07-19', expirationDate: '2023-07-25' },
    { userIngredientID: 18, name: 'Eggs', quantity: 12, category: 'Dairy', purchaseDate: '2023-07-14', expirationDate: '2023-07-31' },
    { userIngredientID: 19, name: 'Brown Rice', quantity: 1, category: 'Grains', purchaseDate: '2023-07-21', expirationDate: '2023-07-21' },
    { userIngredientID: 20, name: 'Tomatoes', quantity: 2, category: 'Vegetables', purchaseDate: '2023-07-12', expirationDate: '2023-07-25' },
    { userIngredientID: 21, name: 'Cashews', quantity: 1, category: 'Nuts and Seeds', purchaseDate: '2023-07-23', expirationDate: '2023-03-23' },
    { userIngredientID: 22, name: 'Chicken', quantity: 1, category: 'Meat and Poultry', purchaseDate: '2023-07-20', expirationDate: '2023-07-26' },
    { userIngredientID: 23, name: 'Lettuce', quantity: 1, category: 'Vegetables', purchaseDate: '2023-07-14', expirationDate: '2023-07-21' },
    { userIngredientID: 24, name: 'Bananas', quantity: 3, category: 'Fruits', purchaseDate: '2023-07-19', expirationDate: '2023-07-24' },
    { userIngredientID: 25, name: 'Salmon', quantity: 1, category: 'Seafood', purchaseDate: '2023-07-18', expirationDate: '2023-07-23' },
    { userIngredientID: 26, name: 'White Rice', quantity: 1, category: 'Grains', purchaseDate: '2023-07-16', expirationDate: '2023-07-16' },
    { userIngredientID: 27, name: 'Grapes', quantity: 2, category: 'Fruits', purchaseDate: '2023-07-13', expirationDate: '2023-07-20' },
    { userIngredientID: 28, name: 'Cucumber', quantity: 1, category: 'Vegetables', purchaseDate: '2023-07-21', expirationDate: '2023-07-28' },
    { userIngredientID: 29, name: 'Cheddar Cheese', quantity: 1, category: 'Dairy', purchaseDate: '2023-07-15', expirationDate: '2023-03-15' },
    { userIngredientID: 30, name: 'Quinoa', quantity: 1, category: 'Grains', purchaseDate: '2023-07-17', expirationDate: '2023-03-17' },
]

export const data = raw_data.reduce((accumulator, currentIngredient) => {
    const existingIngredient = accumulator.find(ingredient => ingredient.name === currentIngredient.name);
    
    if (existingIngredient) {
      existingIngredient.raw.push(currentIngredient)
      existingIngredient.quantity += currentIngredient.quantity;
      
      if (currentIngredient.purchaseDate < existingIngredient.purchaseDate) {
        existingIngredient.purchaseDate = currentIngredient.purchaseDate;
      }
      
      if (currentIngredient.expirationDate < existingIngredient.expirationDate) {
        existingIngredient.expirationDate = currentIngredient.expirationDate;
      }
    } else {
      currentIngredient.raw = [currentIngredient];
      accumulator.push(currentIngredient);
    }
    
    return accumulator;
  }, []
); 