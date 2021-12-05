export default function categoryMerger(data) {
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
