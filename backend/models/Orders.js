const mongoose = require('mongoose')
const {Schema} = mongoose;
const orderSchema = new mongoose.Schema({
    email: { type: String, required: true },
    order_data: { type: Array, required: true },
    order_date: { type: String, required: true }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;