const express= require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product= require('../models/product');

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:"Handling GET requests to /product"
    });
    // res.status(200).send("he")
});

router.post('/',(req,res,next)=>{
    const product= new Product({
        _id: new mongoose.Types.ObjectId,
        name:req.body.name,
        price:req.body.price
    });
    product.save()
    .then(result=>{
        console.log(result);
    }).catch
    res.status(200).json({
        message:"Handling POST request to /product",
        createdProduct:product
    });
});

router.get('/:productId', (req,res,next)=>{
    const id = req.params.productId;
    if (id=== 'special'){
        res.status(200).send.json({
            message: 'You discovered the special ID',
            id:id
        });
    }else{
        res.status(200).json({
            message:'You passed an ID'
        });
    }
})
router.patch('/:productId',(req,res,next)=>{
    res.status(200).json({
        message:'Updated product'
    })
})

router.delete('/:productId',(req,res,next)=>{
    res.status(200).json({
        message:'Deleted product!'
    })
})

module.exports= router;