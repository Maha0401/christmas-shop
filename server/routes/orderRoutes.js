const router = require("express").Router();
const knex = require('knex')(require('../knexfile').development);
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

let orderList = []

knex("order")
.then((data) => {
    orderList = data;
})
.catch((err) => console.log(`Error retrieving orders: ${err}`))


router.route("/")
    //http://localhost:8080/order/
    .get((_req,res) =>{
        res.status(200).json(orderList);
    })
    //http://localhost:8080/order/
    //{"productName":"Pair Christmas Sweater","productId":"1","picUrlPath":"/product/1.jpg","orderPrice":"10"}
    .post((req,res)=> {
        const { productName, productId, picUrlPath, orderPrice } =req.body;

        const newOrder = {
            productName: productName,
            productId: productId,
            picUrlPath:picUrlPath,
            orderPrice:orderPrice,
            fulfilled:false,
        };
        
        knex('product')
        .where({ 'id': productId })
        .then((data) => {
            let updatedStock = Number(data[0].stock)-1;
            knex('product')
            .where({ 'id': productId })
            .update({'stock': updatedStock.toString() })
            .then((res)=>{})
        })
    
        knex("order").insert({productName: productName,
            productId: productId,
            picUrlPath:picUrlPath,
            orderPrice:orderPrice,
            fulfilled:false,})
        .then((_result) => {
            knex('order')
            .then((data) => { 
                orderList = data;
            })
         }) 
        res.status(204).json(newOrder);
    });

//http://localhost:8080/order/notfullfilled
router.route("/notfullfilled").get((_req,res)=>{
    let filteredOrders = orderList.filter(order=> order.fulfilled === 0)
    res.status(200).json(filteredOrders);
});

//http://localhost:8080/order/fullfilled/1
router.route("/fullfilled/:orderId").put((req,res)=>{
    const order = orderList.find(order => order.id.toString() === req.params.orderId.toString());
        if (!order) {
            return res
                    .status(404)
                    .json({
                        errorMessage: `Item ${req.params.orderId} not found`
                    })
        }

        knex('order')
        .where({ 'id': req.params.orderId })
        .update({'fulfilled': 1 })
        .then((res)=>{})

        return res.status(202).send('Order Fulfilled')
});

    module.exports = router;