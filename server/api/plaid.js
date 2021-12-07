require('dotenv').config();
const { requireToken } = require('./gatekeeping.js');
const router = require('express').Router();
const {
  models: { Transaction },
} = require('../db');

const { Configuration, PlaidApi, PlaidEnvironments, Products } = require('plaid');
const Category = require('../db/models/Category');

const configuration = new Configuration({
  basePath: PlaidEnvironments['sandbox'],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET,
    },
  },
});

const plaidClient = new PlaidApi(configuration);

router.post('/create_link_token', async (req, res) => {
  try {
    const response = await plaidClient.linkTokenCreate({
      user: {
        client_user_id: '123-test-user-id',
      },
      client_name: 'Plaid Test App',
      products: [Products.Auth, Products.Transactions],
      country_codes: ['US'],
      language: 'en',
      webhook: 'https://sample-web-hook.com',
      account_filters: {
        depository: {
          account_subtypes: ['checking', 'savings'],
        },
      },
    });
    return res.send({ link_token: response.data.link_token });
  } catch (err) {
    return res.send({ err: err.message });
  }
});

router.post('/get_access_token', async (req, res) => {
  const { linkToken } = req.body;
  const response = await plaidClient.itemPublicTokenExchange({ public_token: linkToken }).catch((err) => {
    if (!linkToken) {
      return 'no public token';
    }
  });
  return res.send({ access_token: response.data.access_token });
});

router.post('/transactions', requireToken, async (req, res) => {
  const { user } = req.body;
  const { accessToken } = req.body;
  const { dateOfLastPull } = user;

  // start_date would be the day of the user's last pull from plaid
  // end_date would be the the day before today's date
  let end_date = new Date();
  end_date.setDate(end_date.getDate() - 1);
  end_date = end_date.toISOString().slice(0, 10);

  let request = {
    access_token: accessToken,
    start_date: dateOfLastPull,
    end_date,
  };

  // if the user never pulled from plaid, update their lastPulledDate to today, and change the start_date to way back when
  if (dateOfLastPull == null) {
    let dateToday = new Date();
    dateToday = dateToday.toISOString().slice(0, 10);
    await user.update({
      dateOfLastPull: dateToday,
    });
    request.start_date = '2015-01-01';
  }
  try {
    // fetch all transactions according to the date constraints
    const response = await plaidClient.transactionsGet(request);
    let transactions = response.data.transactions;
    const categories = await Category.findAll({ raw: true });

    let responseArray = [];
    for (const transactionFromPlaid of transactions) {
      if (transactionFromPlaid.amount > 0) {
        let categoryId;
        categories.forEach((category) => {
          if (transactionFromPlaid.category[0] == category.categoryName) {
            categoryId = category.id;
          }
        });
        const transToAdd = await Transaction.create({
          bankTransactionId: transactionFromPlaid.transaction_id,
          name: transactionFromPlaid.name,
          merchantName: transactionFromPlaid.merchant_name,
          amount: transactionFromPlaid.amount,
          date: transactionFromPlaid.date,
          userId: user.id,
          categoryId: categoryId,
        });
        responseArray.push(transToAdd);
      }
    }
    // returns only transactions that are not currently in our db
    res.send(responseArray);
  } catch (e) {
    console.log(e);
  }
});

router.get('/categories/get', async (req, res, next) => {
  try {
    const response = await plaidClient.categoriesGet({});
    const categories = response.data.categories;
    res.send(categories);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
