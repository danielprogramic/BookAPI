var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://localhost/bookAPI');

var Book = require('./models/bookModel');

var app = express();
var port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//injetando o modelo na rota
bookRouter = require('./routes/bookRoutes')(Book);
app.use('/api/books', bookRouter);

app.get('/', function(req, res) {
  res.send('Vindo a minha API!');
});

app.listen(port, function() {
  console.log('Executando na Porta:' + port);
});