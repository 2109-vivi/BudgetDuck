# Budget-Duck

Budget duck is a visualization-focused budget tracking application for users
who find spreadsheets and numbers intimidating. Simply connect to your bank, 
tweak what you want, and visualize your data!

## Setup

To develop on this app you will have to take the following steps:

* clone the repo
* run `npm install`
* Create postgres database (should match the `name`
  parameter in `package.json`):

```
createdb <APP NAME HERE FROM package.json>
```

## Start

Sync and seed your database by running `npm run seed`.

* if you are on a mac run `npm run start:dev`
* if you are on a windows run `npm run start:dev` and `npm run start:dev:windows`

- start:dev will both start your server and build your client side files using webpack
- start:dev:logger is the same as start:dev, but you will see your SQL queries (can be helpful for debugging)
- start:dev:seed will start your server and also seed your database

- Logging into Plaid can be done with the credentials `user_good` and `pass_good`

### Deployed Heroku Link

- http://budgetduck.herokuapp.com/
