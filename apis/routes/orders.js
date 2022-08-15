const express = require('express');
const router = express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:'here is your order'
    });
});

router.post('/',(req,res,next)=>{
    const order={
        productId:req.body.productId,
        quantity:req.body.quantity
    };
    res.status(201).json({
        message:'create your order here',
        order:order
    });
});
router.patch('/:productId',(req,res,next)=>{
    res.status(200).json({
        message:'update your order',
        id:id
    });
});

router.delete('/:productId',(req,res,next)=>{
    res.status(200).json({
        message:'you order is deleted',
        id:id
    });
});

module.exports=router;