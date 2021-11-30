require('dotenv').config();
const router = require('express').Router();
// const plaidClient = require('../app.js');
const {
  Configuration,
  PlaidApi,
  PlaidEnvironments,
  Products,
} = require('plaid');

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

router.post('/transactions', async (req, res) => {
  const { accessToken } = req.body;
  const request = {
    access_token: accessToken,
    start_date: '2018-01-01',
    end_date: '2021-11-28',
  };
  try {
    const response = await plaidClient.transactionsGet(request);
    let transactions = response.data.transactions;
    res.send(transactions);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;