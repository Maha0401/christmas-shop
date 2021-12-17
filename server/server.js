const express = require('express');
const app = express();
const knex = require('knex')(require('./knexfile').development);
require('dotenv').config();
const PORT = process.env.PORT || 9000;
const cors = require('cors')

app.use(cors()); 
app.use(express.json())
app.use(express.static('public'))

const userRoutes = require('./routes/userRoutes');
app.use('/user', userRoutes);

const orderRoutes = require('./routes/orderRoutes');
app.use('/order', orderRoutes);

const productRoutes = require('./routes/productRoutes');
app.use('/product', productRoutes);

app.listen(PORT, ()=> {
    console.log(`running at http://localhost:${PORT}`);
})