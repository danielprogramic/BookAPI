var express = require('express');
var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/bookAPI');

var Book = require('./models/bookModel');

var app = express();
var port = process.env.PORT || 3000;

var bookRouter = express.Router();
bookRouter.route('/Books')
  .get(function(req, res) {
    // var responseJson = { hello: 'This is my api' };
    // res.json(responseJson);
    var query = req.query;

    Book.find(query, function(err, books) {
      if (err)
      // console.log(err)
        res.status(500).send(err);
      else
        res.json(books);
    });
  });

app.use('/api', bookRouter);

app.get('/', function(req, res) {
  res.send('Vindo a minha API!');
});

app.listen(port, function() {
  console.log('Executando na Porta:' + port);
});