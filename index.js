// dependencies
require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const bodyParser = require('body-parser');

// import ROUTERS
const UserRouter = require('./routes/UserRouter');
const CategoryRouter = require('./routes/CategoryRouter');
const ProductRouter = require('./routes/ProductRouter'); 
const ReviewRouter = require('./routes/ReviewRouter'); 
const OrderRouter = require('./routes/OrderRouter'); 
const OverviewRouter = require('./routes/OverviewRouter'); 
const PixelRouter = require('./routes/PixelRouter'); 
const StoreRouter = require('./routes/StoreRouter'); 

// start the app
const app = express();

// variables
const PORT = process.env.PORT || 4000;
const MONGO_DB = process.env.MONGO_DB;

// middlewares
// app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use((err, req, res, next) => {
    if (err) {
      res.status(500).json({ error: err.message });
    }
});
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'https://e-dashboard-mu.vercel.app/');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// database connection
mongoose.connect(MONGO_DB)
        .then(()=>{
            // listen to requests
            app.listen(PORT, () =>{
                console.log('listning to port' , process.env.PORT , 'and connected to db' )
            });
        })
        .catch((error)=>{
            console.log(error)
        });

// api routes
app.use('/api/user/', UserRouter);
app.use('/api/category/', CategoryRouter);
app.use('/api/product/', ProductRouter);
app.use('/api/review/', ReviewRouter);
app.use('/api/order/', OrderRouter);
app.use('/api/overview/', OverviewRouter);
app.use('/api/pixel/', PixelRouter);
app.use('/api/store/', StoreRouter);
