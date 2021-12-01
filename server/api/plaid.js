require('dotenv').config();
const { requireToken } = require('./gatekeeping.js');
const router = require('express').Router();
const {
  models: { Transaction },
} = require('./db');

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
    end_date: Date.now(),
  };
  try {
    // fetch all transactions
    const response = await plaidClient.transactionsGet(request);
    let transactions = response.data.transactions;

    transactions = transactions.map(async (transactionFromPlaid) => {
      // check whether each transaction already exists within our db
      const dbCheck = await Transaction.findOne({
        where: {
          bankTransactionId: transactionFromPlaid.transaction_id,
        },
      });
      // if it doesn't, create new transaction and associate with the logged in user
      if (!dbCheck) {
        return await Transaction.create({
          bankTransactionId: transactionFromPlaid.transaction_id,
          name: transactionFromPlaid.name,
          merchantName: transactionFromPlaid.merchant_name,
          amount: transactionFromPlaid.amount,
          date: transactionFromPlaid.date,
          userId: user.id,
          categoryId: await Category.findOne({
            where: {
              categoryName: transactionFromPlaid.category[0],
            },
          }),
        });
      }
    });

    // returns only transactions that are not currently in our db
    res.send(transactions);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
