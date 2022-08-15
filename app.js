const express= require('express');
const bodyParser= require('body-parser');
const app = express();
const morgan = require('morgan');
const productRoutes= require('./apis/routes/product');
const orderRoutes= require('./apis/routes/orders');
const mongoose = require('mongoose');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/product', productRoutes);
app.use('/orders', orderRoutes);


//Set up default mongoose connection
const mongoDB = 'mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('connected',()=>{
    console.log("database connected");
})

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method==='OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE,GET');
        return res.status(200).json({});
    }
})
// app.use((req,res,next)=>{
//     res.status(200).json({
//         message:"hello world"
//     });
//     res.send("hello");
// });

app.use((req,res,next)=>{
    const error= new Error('Not found');
    error.status(404);
    next(error);
});
app.use((error,req,res,next)=>{
    res.status(err.status || 500);
    res.json({
        error:{
            message:error.message
        }
    })
})

module.exports= app;
