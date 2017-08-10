//Module controller da rota book
var bookController = function(Book) {
  //verbo Post
  var post = function(req, res) {
      var book = new Book(req.body);
      console.log(book);
      book.save();
      res.status(201).send(book);
    }
    //verbo Get
  var get = function(req, res) {
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
  }

  return {
    post: post,
    get: get
  }
}
module.exports = bookController;