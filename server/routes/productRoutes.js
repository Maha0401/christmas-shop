const router = require("express").Router();
const knex = require('knex')(require('../knexfile').development);

let productList = []

knex("product")
.then((data) => {
    productList = data;
})
.catch((err) => console.log(`Error retrieving products: ${err}`))

//http://localhost:8080/product/
router.route("/")
    .get((req,res) =>{
        res.status(200).json(productList);
    })

//http://localhost:8080/product/search/camera
router.route("/search/:searchquery").get((req,res)=>{
    let filteredproducts = productList.filter(product=> product.productName.toLowerCase().includes(req.params.searchquery.toLowerCase()))
    res.status(200).json(filteredproducts);
});

//http://localhost:8080/product/category/sweater
router.route("/category/:category").get((req,res)=>{
    let filteredProducts = productList.filter(product => product.category === req.params.category)
    res.status(200).json(filteredProducts);
});

//http://localhost:8080/product/stocks
router.route("/stocks").get((_req,res)=>{
    let stockList = productList.map(product => {
        let stock = {
            id: product.id,
            name: product.productName,
            stock: product.stock,
            picUrlPath: product.picUrlPath
        }
        return stock
    })
    res.status(200).json(stockList)
});

//http://localhost:8080/product/1
router.get('/:id', (req, res) => {
    knex('product').where('id', req.params.id).then((response) => res.status(200).json(response))
})

module.exports = router;
