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
      client_name: 'Budget Duck',
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
    start_date: '2015-01-01',
    end_date,
  };

  let dateToday = new Date();
  dateToday = dateToday.toISOString().slice(0, 10);
  // if the user already pulled from Plaid before, change the start_date for the query to the date of the last pull
  if (dateOfLastPull != null) {
    request.start_date = user.dateOfLastPull;
    if (dateOfLastPull == dateToday) request.start_date = end_date;
  }
  try {
    // fetch all transactions according to the date constraints
    const response = await plaidClient.transactionsGet(request);
    // if the response succeeds, update the user's dateOfLastPull to today
    if (response.status != 400) {
      await user.update({
        dateOfLastPull: dateToday,
      });

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
          const transToCreate = await Transaction.create({
            bankTransactionId: transactionFromPlaid.transaction_id,
            name: transactionFromPlaid.name,
            merchantName: transactionFromPlaid.merchant_name,
            amount: transactionFromPlaid.amount,
            date: transactionFromPlaid.date,
            userId: user.id,
            categoryId: categoryId,
          });
          const transToAdd = await Transaction.findOne({
            where: {
              userId: user.id,
              id: transToCreate.id,
            },
            include: [
              {
                model: Category,
                where: {
                  id: categoryId,
                },
                as: 'category',
              },
            ],
          });

          responseArray.push(transToAdd);
        }
      }
      // returns only transactions that are not currently in our db
      res.send(responseArray);
    } else {
      res.sendStatus(400);
    }
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
