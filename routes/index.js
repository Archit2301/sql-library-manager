var express = require('express');
var router = express.Router();
const Book = require('../models').Book;
const { Op } = require ('Sequelize');

/**
   * Handler function for each route.
   * Error is forwarded to the global handler in app.js.
*/
function asyncHandler(cb) {
  return async(req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      next(error);
    }
  }
}

/* Search option */
router.get('/books/search', asyncHandler(async(req,res,next) => {
  const search = req.query.search;

  const books = await Book.findAndCountAll({
    attributes: ['id', 'title', 'author', 'genre', 'year'],
    where:{
      [Op.or]:  [
        {
          title: {
            [Op.substring]: search
          }
        },
        {
          author: {
            [Op.substring]: search
          }
        },
        {
          genre:   {
           [Op.substring]: search
         }
        },
        {
          year:   {
           [Op.substring]: search
         }
        }
      ]
   },
  });
  res.render('books', {books: books.rows});
}));

/* GET Home route should redirect to the 1st page route */
router.get('/', asyncHandler(async (req, res) =>  {
  res.redirect('/books/page/1');
}));

/* GET Books route shows the list of books (5 books per page) */
router.get('/books/page/:page', asyncHandler(async (req, res, next) => {
  const page = req.params.page;
  let totalPages;
  let totalBooks;
  const books = await Book.findAll({
    limit: 5,
    offset: (page * 5) - 5,
    page: page
  });
  totalBooks = await Book.count();
  totalPages = Math.ceil(totalBooks / 5);
  if (page > 0 && page <= totalPages) {    
    res.render('books', { books, title: 'All books', totalPages });
  } else {
    const err = new Error("404 Not Found");
    err.status = 404;
    err.message = "Sorry! This page cannot be found!";
    next(err);
  }  
}));

/* GET Create new book form */
router.get('/books/new', asyncHandler(async (req, res) => {
  res.render('new_book');
}));

/* POST a new book to the database */
router.post('/books/new', asyncHandler(async (req, res) => {
  let book;
  try {
    book = await Book.create(req.body);
    res.redirect("/books/" + book.id);
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      book = await Book.build(req.body);
      res.render("form-error", { book, errors: error.errors, title: "New Book" });
    } else {
      throw error;
    }
  }  
}));

/* GET Shows a book detail form */
router.get('/books/:id', asyncHandler(async (req, res, next) => {
  const book = await Book.findByPk(req.params.id);
  if (book) {
    res.render('book_detail', { book, title: book.title });
  } else {
    const err = new Error("404 Not Found");
    err.status = 404;
    err.message = "Sorry! This page cannot be found!";
    next(err);
  }  
}));

/* POST Updates book info in the database */
router.post('/books/:id', asyncHandler(async (req, res, next) => {
  let book;
  try {
    book = await Book.findByPk(req.params.id);
    if (book) {
      await book.update(req.body);
      res.redirect('/books/' + book.id);
    } else {
      const err = new Error("404 Not Found");
      err.status = 404;
      err.message = "Sorry! This page cannot be found!";
      next(err);
    }
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      book = await Book.build(req.body);
      book.id = req.params.id;
      res.render("form-error", { book, errors: error.errors, title: "Update book" });
    } else {
      throw error;
    }
  }    
}));

/* POST Deletes a book */
router.post('/books/:id/delete', asyncHandler(async (req, res, next) => {
  const book = await Book.findByPk(req.params.id);
  if (book) {
    await book.destroy();
    res.redirect("/books/page/1");
  } else {
    const err = new Error("404 Not Found");
    err.status = 404;
    err.message = "Sorry! This page cannot be found!";
    next(err);
  }  
}));

module.exports = router;
