require('dotenv').config(),
require('./db/db');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const path = require('path')

const store = new MongoDBStore({
    uri: process.env.MONGODB_URI,
    collection: 'mySessions'
  });
app.use(cors({
    origin: process.env.REACT_ADDRESS,
    credentials: true,
    optionsSuccessStatus: 200
}))
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(session({
    saveUninitialized: true,
    secret: "keepitsafe",
    resave: false,
    store: store,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
      },
}))
app.use(morgan('short'));
app.use(bodyParser.json());
app.use((req, res, next)=>{
    console.log(`request incoming from user ${req.session.userId}`)
    next();
})

const reviewController = require('./Controllers/ReviewController');
app.use('/reviews', reviewController);
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});
app.listen(process.env.PORT || 9000, ()=>{
    console.log("Listening")
})