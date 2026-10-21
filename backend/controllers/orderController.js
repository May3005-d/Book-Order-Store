const Book = require('../models/Book');
const Order = require('../models/Order');

async function createOrder(req, res, next) {
  try {
    const { items, customer } = req.body;
    if (!Array.isArray(items) || items.length === 0 || !customer?.name || !customer?.phone || !customer?.address) {
      return res.status(400).json({ message: 'Items and complete customer details are required' });
    }
    const books = await Book.find({ _id: { $in: items.map((item) => item.bookId) } });
    const orderItems = items.map((item) => {
      const book = books.find((candidate) => String(candidate._id) === String(item.bookId));
      if (!book || !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > book.stock) throw new Error(`Invalid stock for book ${item.bookId}`);
      return { bookId: book._id, quantity: item.quantity, price: book.price };
    });
    const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const order = await Order.create({ items: orderItems, total, customer });
    res.status(201).json({ id: order.id, total: order.total });
  } catch (error) { next(error); }
}

module.exports = { createOrder };
