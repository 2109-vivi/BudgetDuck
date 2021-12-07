# Budget-Duck

## Setup

To use this app you will have to take the following steps:

* run `npm install`
* Create postgres database (should match the `name`
  parameter in `package.json`):

```
createdb <YOUR APP NAME HERE FROM package.json>
```

## Start

Sync and seed your database by running `npm run seed`.

* if you are on a mac run `npm run start:dev`
* if you are on a windows run `npm run start:dev` and `npm run start:dev:windows`

- start:dev will both start your server and build your client side files using webpack
- start:dev:logger is the same as start:dev, but you will see your SQL queries (can be helpful for debugging)
- start:dev:seed will start your server and also seed your database (this is useful when you are making schema changes and you don't want to run your seed script separately)

- Logging into Plaid can be done with the credentials `user_good` and `pass_good`

### Heroku Link

- http://budgetduck.herokuapp.com/
