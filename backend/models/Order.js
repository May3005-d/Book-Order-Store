const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: [{ bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true }, quantity: { type: Number, min: 1, required: true }, price: { type: Number, min: 0, required: true } }],
  total: { type: Number, min: 0, required: true },
  customer: { name: { type: String, required: true }, phone: { type: String, required: true }, address: { type: String, required: true } },
  status: { type: String, enum: ['pending', 'confirmed', 'shipped'], default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
