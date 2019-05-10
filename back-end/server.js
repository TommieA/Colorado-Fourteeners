const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
require('./db/db');
const store = new MongoDBStore({
    uri: 'mongodb://localhost/Colorado-Fourteeners',
    collection: 'mySessions'
  });
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200
}))
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

const reviewController = require('./controllers/ReviewController');
app.use('/reviews', reviewController);

app.listen(process.env.PORT || 3000, ()=>{
    console.log("ITS ALIIIIVE and wearing panties")
})