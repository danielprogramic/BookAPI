var express = require('express');

var routes = function(Book) {

  var bookRouter = express.Router();
  //Route Books//
  bookRouter.route('/')
    .post(function(req, res) {
      var book = new Book(req.body);
      console.log(book);
      book.save();
      res.status(201).send(book);
    })
    .get(function(req, res) {
      // var responseJson = { hello: 'This is my api' };
      // res.json(responseJson);
      //fazendo o filtro com genero
      var query = req.query;
      var query = {};
      if (req.query.genre) {
        query.genre = req.query.genre;
      }
      Book.find(query, function(err, books) {
        if (err)
        // console.log(err)
          res.status(500).send(err);
        else
          res.json(books);
      });
    });
  //implementar o middleware para o get e put do livro
  bookRouter.use('/:bookId', function(req, res, next) {
    //essa função vai ser proximo para todos os metodos desta rota.
    Book.findById(req.params.bookId, function(err, book) {
      //se for id errado 
      if (err)
        res.status(500).send(err);
      //se existir
      else if (book) {
        req.book = book;
        next();
      } else {
        res.status(404).send('no book found');
      }

    });
  });
  //Route ID//
  bookRouter.route('/:bookId')
    .get(function(req, res) {
      // recebe o resultado que foi passado para o req.book
      res.json(req.book);
    })
    .put(function(req, res) {
      // altera o req.book 
      req.book.title = req.body.title;
      req.book.author = req.body.author;
      req.book.genre = req.body.genre;
      req.book.read = req.body.read;
      req.book.save();
      res.json(req.book);
    });

  return bookRouter;
};

module.exports = routes;