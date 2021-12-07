const getIntroOfPage = (label) => {
  switch(label) {
    case 'Transfer':
      return 'Transfer is based around moving money/funds from one account to another.';
    case 'Food and Drink':
      return 'Food and Drink refers purchases made in restaurants, cafes, etc, and in this case, groceries.';
    case 'Recreation':
      return 'Recreation refers to transactions made for entertainment, such as movies, concerts, etc.';
    case 'Service':
      return 'Service refers to transactions such as laundry, cleaning, lawnmowing, etc.';
    case 'Community':
      return 'Community is related to transactions such as social services, government institutions, schools, animal shelters, etc.';
    case 'Shops':
      return 'Shops are related to both e-commerce and retail transactions made in stores.';
    case 'Cash Advance':
      return 'A Cash Advance is a request for funds from a bank using credit, which has a high apr rate.';
    case 'Travel':
      return 'Travel refers to anything related to traveling, whether international or domestic (e.g., uber, airplane tickets, etc).';
    case 'Healthcare':
      return 'Healthcare refers to purchases made in pharmacies, or payments towards hospitals/clinics.';
    case 'Interest':
      return 'Interest payments are made towards the monetary charge for borrowed money ';
    case 'Payment':
      return 'Payments refer to payments of bank transactions or statements.';
    case 'Tax':
      return 'Taxes are payments made towards government or state mandated taxes.';
    default:
      return 'Other is a type of transaction that is not related to any of the other categories.';
  }
}

export default getIntroOfPage;
