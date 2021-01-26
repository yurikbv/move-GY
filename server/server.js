const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const connectDB = require('./config/db');

const app = express();
const host = "127.0.0.1";

//Connect to Database
connectDB();

//Use bodyparser
app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit: 50000}));
app.use(express.json({limit: "50mb"}));
app.use(express.text());

app.use(express.static('www'));

//Load all routes
const authRouter = require('./routes/auth.route.js');
const userRouter = require('./routes/user.route.js');
const vehicleRouter = require('./routes/vehicle.route.js');
const adminRoute = require('./routes/admin.route.js');
const advertsRoute = require('./routes/adverts.route.js');
const faqRoute = require('./routes/faq.route');
const routesRoute = require('./routes/route.route');
const cityRoute = require('./routes/city.route');

//Config for only development
if(process.env.NODE_ENV === 'development') {
  app.use(cors({
    origin: process.env.CLIENT_URL
  }))
  app.use(morgan('dev'));
  //morgan give information about each request
  //Cors it's allow to deal with react for localhost at port 3000 without any problem
}

//Use routes
app.use('/api/', authRouter);
app.use('/api/', userRouter);
app.use('/api/', vehicleRouter);
app.use('/api/', adminRoute);
app.use('/api/', advertsRoute);
app.use('/api/', faqRoute);
app.use('/api/', routesRoute);
app.use('/api/', cityRoute);

const PORT = process.env.PORT || 6200;
// Default route for production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname,'../www','index.html'))
  });
}

app.listen(PORT,() => {
  console.log(`Server running at ${PORT}/`);
});