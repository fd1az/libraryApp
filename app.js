var express = require('express');
var app = express();
var bodyParse = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');

var port = process.env.PORT || 5000;
var nav = [{
    Link: '/Libros',
    Text: 'Libros'
}, {
    Link: '/Autores',
    Text: 'Autores'
}];
var bookRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);
var authRouter = require('./src/routes/authRoutes')(nav);

app.use(express.static('public'));
app.use(bodyParse.json());
app.use(bodyParse.urlencoded());
app.use(cookieParser());
app.use(session({
    secret: 'library'
}));

require('./src/config/passport')(app);

app.set('views', './src/views');

app.set('view engine', 'ejs');

app.use('/Libros', bookRouter);
app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);

app.get('/', function(req, res) {
    res.render('index', {
        title: 'Hello render',
        nav: [{
            Link: '/Libros',
            Text: 'Libros'
        }, {
            Link: '/Autores',
            Text: 'Autores'
        }]
    });
});

app.get('/books', function(req, res) {
    res.send('Hello books');
});

app.listen(port, function(error) {
    console.log('Servidor corriendo en puerto: ' + port);
});
