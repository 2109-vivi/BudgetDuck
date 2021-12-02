require('dotenv').config();
const { requireToken } = require('./gatekeeping.js');
const router = require('express').Router();
const {
  models: { Transaction },
} = require('../db');

const {
  Configuration,
  PlaidApi,
  PlaidEnvironments,
  Products,
} = require('plaid');
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
  const response = await plaidClient
    .itemPublicTokenExchange({ public_token: linkToken })
    .catch((err) => {
      if (!linkToken) {
        return 'no public token';
      }
    });
  return res.send({ access_token: response.data.access_token });
});

router.post('/transactions', requireToken, async (req, res) => {
  const { user } = req.body;
  const { accessToken } = req.body;
  const request = {
    access_token: accessToken,
    start_date: '2018-01-01',
    end_date: '2021-12-01',
  };
  try {
    // fetch all transactions
    const response = await plaidClient.transactionsGet(request);
    let transactions = response.data.transactions;

    let filteredTransactions = [];

    for (const transactionFromPlaid of transactions) {
      // TransactionIDs from plaid change on every request so we have no way to identify existing bank transactions in database. This is our scuffed way of working around the issue
      const transAlreadyExists = await Transaction.findOne({
        where: {
          userId: user.id,
          amount: transactionFromPlaid.amount,
          date: transactionFromPlaid.date,
          merchantName: transactionFromPlaid.merchant_name,
          name: transactionFromPlaid.name,
        },
      });

      // if it doesn't, create new transaction and associate with the logged in user
      if (!transAlreadyExists) {
        const addedTransaction = await Transaction.create({
          bankTransactionId: transactionFromPlaid.transaction_id,
          name: transactionFromPlaid.name,
          merchantName: transactionFromPlaid.merchant_name,
          amount: transactionFromPlaid.amount,
          date: transactionFromPlaid.date,
          userId: user.id,
          categoryId: 1,
        });
        filteredTransactions.push(addedTransaction);
      }
    }

    // returns only transactions that are not currently in our db
    res.send(filteredTransactions);
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
