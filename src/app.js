const express = require('express');
require('dotenv').config();

const app = express();

//Config
const { UserAPI } = require('./routes/users.routes')
const { ProductAPI } = require('./routes/products.routes')
const { ProviderAPI } = require('./routes/providers.routes')
const { LiqueurAPI } = require('./routes/liqueurs.routes')
const { BeerAPI } = require('./routes/beers.routes')
const { CustomerAPI } = require('./routes/customers.routes')
const { SaleAPI } = require('./routes/sales.routes')
app.use(express.json());
app.set('port', process.env.PORT);

//Routes
UserAPI(app);
ProviderAPI(app);
ProductAPI(app);
LiqueurAPI(app);
BeerAPI(app);
CustomerAPI(app);
SaleAPI(app);

module.exports = {
    app
}