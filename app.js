require('dotenv').config({
  path: `./env-files/${process.env.NODE_ENV || 'development'}.env`,
});

const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redis = require('redis');


const initAuthMiddleware = require('./features/login/init-auth-middleware');
const indexRouter = require('./routes/index');

const redisStoreConfig = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
};

if (process.env.REDIS_URL) {
  redisStoreConfig.url = process.env.REDIS_URL; // this will use the REDIS_URL required for logging into the Redis addon provided by Heroku
}

if (process.env.REDIS_PASSWORD) {
  redisStoreConfig.password = process.env.REDIS_PASSWORD; // this will use the REDIS_PASSWORD if required
}
console.log('r==============edisStoreConfig',redisStoreConfig,'pwd:',process.env.REDIS_PASSWORD)
const redisStore = new RedisStore(redisStoreConfig);

const staticFolder = process.env.NODE_ENV === 'development' ? 'public' : 'dist';
console.log("LoG !!! process.env.NODE_ENV",process.env.NODE_ENV)
 

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, staticFolder)));
//cors
const cors = require('cors');
app.use(cors({
    origin: '*'
}));

const { COOKIE_EXPIRATION_MS } = process.env;
//console.log("------------------------------------------------",COOKIE_EXPIRATION_MS,process.env)
//console.log("redis",   redisStore)

const redisClient = redis.createClient({
  host: 'localhost',
  port: 6379
})
redisClient.on('error', function (err) {
  console.log('Could not establish a connection with redis. ' + err);
});
redisClient.on('connect', function (err) {
  console.log('Connected to redis successfully');
});

 app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret :    'keyboard cat',
    name: process.env.SESSION_COOKIE_NAME,
    resave: true,// // if true only transmit cookie over https
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: false, // if true prevent client side JS from reading the cookie 
      expires: Date.now() + parseInt(COOKIE_EXPIRATION_MS, 10),
      maxAge: parseInt(COOKIE_EXPIRATION_MS, 10),
    },
  })
);

initAuthMiddleware(app);

// Middleware used for setting error and success messages as available in _ejs_ templates
app.use((req, res, next) => {
  if (req.session) {
    res.locals.messages = req.session.messages;
    res.locals.userInfo = req.session.userInfo;
    req.session.messages = {};
  }
  next();
});

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res) => {
  res.status(404).render('vpages/404');
});

module.exports = app;
