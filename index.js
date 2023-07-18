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

// start the app
const app = express();

// variables
const PORT = process.env.PORT || 4000;
const MONGO_DB = process.env.MONGO_DB;

// middlewares
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

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
