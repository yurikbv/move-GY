const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db')

const app = express();

//Connect to Database
connectDB();

//Use bodyparser
app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit: 50000})); 
app.use(express.json({limit: "50mb"}));
app.use(express.text());

app.use(express.static('client/build'));

//Load all routes
const authRouter = require('./routes/auth.route.js');
const userRouter = require('./routes/user.route.js');
const vehicleRouter = require('./routes/vehicle.route.js');
const adminRoute = require('./routes/admin.route.js');
const advertsRoute = require('./routes/adverts.route.js');
const faqRoute = require('./routes/faq.route');
const routesRoute = require('./routes/route.route');

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


app.use( (req, res, next) => {
  console.log(res);
  res.status(404).json({
    success: false,
    message: res
  })
} )

const PORT = process.env.PORT || 5000;
// Default route for production
if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname,'../client','build','index.html'))
  });
}

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});