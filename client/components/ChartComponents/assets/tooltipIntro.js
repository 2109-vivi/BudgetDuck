const getIntroOfPage = (label) => {
  switch(label) {
    case 'Transfer':
      return 'Transfer is a type of transaction that transfers money from one account to another.';
    case 'Food and Drink':
      return 'Food and Drink is a type of transaction that is related to food and drink.';
    case 'Recreation':
      return 'Recreation is a type of transaction that is related to recreation.';
    case 'Service':
      return 'Service is a type of transaction that is related to services.';
    case 'Community':
      return 'Community is a type of transaction that is related to community.';
    case 'Shops':
      return 'Shops is a type of transaction that is related to shops.';
    case 'Cash Advance':
      return 'Cash Advance is a type of transaction that is related to cash advance.';
    case 'Travel':
      return 'Travel is a type of transaction that is related to travel.';
    case 'Healthcare':
      return 'Healthcare is a type of transaction that is related to healthcare.';
    case 'Interest':
      return 'Interest is a type of transaction that is related to interest.';
    case 'Payment':
      return 'Payment is a type of transaction that is related to payment.';
    case 'Tax':
      return 'Tax is a type of transaction that is related to tax.';
    default:
      return 'Other is a type of transaction that is not related to any of the other categories.';
  }
  return `${label} is a type of transaction that is related ${label}s.`;
}

export default getIntroOfPage;
