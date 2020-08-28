const path = require('path');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const multer = require('multer');
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const connectMongo = require('connect-mongo');
const mongoose = require('mongoose');
const passport = require('passport');
const cloudinary = require('cloudinary');


const routes = require('../routes/index');

const errorHandler = require('errorhandler');

require('../config/passport');

module.exports = app => {

    //Settings
    app.set('port', process.env.PORT || 3000);

    //Handlebars configuration
    app.set('views', path.join(__dirname, '../views'));
    app.engine('.hbs', exphbs({
        defaultLayout: 'main',
        partialsDir: path.join(app.get('views'), 'partials'),
        layoutsDir: path.join(app.get('views'), 'layouts'),
        extname: '.hbs',
        helpers: require('./helpers')
    }));

    app.set('view engine', '.hbs');

    //Middlewares
    app.use(morgan('dev'));
    app.use(multer({
        dest: path.join(__dirname, '../public/upload/temp')
    }).single('image'));
    app.use(express.urlencoded({
        extended: false
    }));
    const MongoStore = connectMongo(session);
    app.use(session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
        store: new MongoStore({mongooseConnection: mongoose.connection})
    }));
    app.use(express.json());
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());

    // Global variables
    app.use((req, res, next) => {
        res.locals.success_msg = req.flash('success_msg');
        res.locals.error_msg = req.flash('error_msg');
        res.locals.error = req.flash('error');
        res.locals.user = req.user || null;
        next();
    });

    //Routes
    routes(app);
    app.use(require('../routes/users.routes'));

    //Static falis
    app.use('/public', express.static(path.join(__dirname, '../public')))

    //Error Handlers
    if ('development' === app.get('env')){
        app.use(errorHandler)
    }

    return app;

}