var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var books = [{
    titulo: 'Hopscotch',
    autor: 'Cortazar',
    genero: 'surrealista',
    bookId: 53413,
    leido: false
}, {
    titulo: 'Upside Down',
    autor: 'Eduardo Galeano',
    genero: 'Politico',
    bookId: 264894,
    leido: true
}, {
    titulo: 'One Hundred Years of Solitude',
    autor: 'Garcia Marquez',
    genero: 'Realismo mágico',
    bookId: 320,
    leido: false
}, {
    titulo: 'Gödel, Escher, Bach: An Eternal Golden Braid',
    autor: 'Douglas Hofstadter',
    genero: 'Divulgacion cientifica',
    bookId: 24113,
    leido: false
}, {
    titulo: 'The Hobbit',
    autor: ' J. R. R. Tolkien',
    genero: 'Fantasía heroica',
    bookId: 5907,
    leido: false
}];

var router = function(nav) {
    adminRouter.route('/addBooks')
        .get(function(req, res) {
            var url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function(err, db) {
                var collection = db.collection('books');
                collection.insertMany(books,
                    function(err, results) {
                        res.send(results);
                        db.close();
                    }
                );

            });
            //res.send('inserting books');
        });
    return adminRouter;
};

module.exports = router;
