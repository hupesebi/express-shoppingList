const express = require('express');
const ExpressError = require("./ExpressError");
const router = new express.Router();
const items = require("./fakeDb");


//routes to get, add, change an delete items
router.get('/', (req,res, next) =>{
    return res.json(items);
});

router.get ('/:name', (req, res, next) => {
    const item = items.find((i) => i.name == req.params.name);
    if (item === undefined){
        throw new ExpressError ("Item not found", 404)
    } else{
        return res.json(item)
    }
})

router.post('/', (req,res,next) => {
    try{
        if (!req.body.name || !req.body.price){
            throw new ExpressError ('Name and price are required', 400);
        }
        if (!parseFloat(req.body.price)){
            throw new ExpressError ('Price must be a number', 400);
        }
        const newItem = {name : req.body.name, price: +req.body.price };
        items.push(newItem);
        return res.status(201).json(newItem);
    } catch(e){
        return next(e)
    }   
});

router.patch('/:name', (req, res, next) => {
    const item = items.find((i) => i.name == req.params.name);
    if (item === undefined){
        throw new ExpressError ("Item not found", 404);
    } else {
        item.name = req.body.name;
        item.price = req.body.price;
        return res.json({updated : item})
    }
});

router.delete('/:name', (req, res, next) => {
    const item = items.findIndex((i) => i.name == req.params.name);
    if (item === -1){
        throw new ExpressError ("Item not found", 404);
    } else {
        items.splice(item, 1);
        return res.json({message : "Deleted"});
    }
});

module.exports = router;