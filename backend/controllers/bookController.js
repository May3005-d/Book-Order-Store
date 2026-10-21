const Book = require('../models/Book');

async function listBooks(req, res, next) {
  try {
    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    if (req.query.search) filter.$or = [{ title: new RegExp(req.query.search, 'i') }, { author: new RegExp(req.query.search, 'i') }];
    res.json(await Book.find(filter).sort({ createdAt: -1 }));
  } catch (error) { next(error); }
}

async function getBook(req, res, next) {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (error) { next(error); }
}

module.exports = { listBooks, getBook };
