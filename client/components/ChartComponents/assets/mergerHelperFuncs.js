import barColors from './categoryColors'

export function categoryMerger(data) {
  let combinedDataArray = [];
  data.forEach((item) => {
    let existing = combinedDataArray.filter((value) => {
      return value.category === item.category;
    });
    if (existing.length) {
      let existingIndex = combinedDataArray.indexOf(existing[0]);
        combinedDataArray[existingIndex].amount = +combinedDataArray[existingIndex].amount + +item.amount
    } else {
      combinedDataArray.push(item);
    }
  });
  return combinedDataArray;
}

export function colorMerger(array){
  array.forEach((element, index) => element.color = barColors[index]);
}

export function budgetMerger(arrayFromState, combinedCategories) {
  for (let i = 0; i < arrayFromState.length; i++){
    let categoryFromState = arrayFromState[i];
    let stateCategoryName = categoryFromState.categoryName; //bank fees, etc.

    for (let j = 0; j < combinedCategories.length; j++){
      let combinedCategory = combinedCategories[j].category; //bank fees, etc.
      if (stateCategoryName === combinedCategory){
        if(categoryFromState.budgetCategories.length !== 0){
          combinedCategories[j].budget = categoryFromState.budgetCategories[0].budgetForCategory
        } else {
          combinedCategories[j].budget = 0;
        }
      }
    }
  }
  return combinedCategories;
}
