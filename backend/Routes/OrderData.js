const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

router.post('/orderData', async (req, res) => {
    try {
        let data = req.body.order_data;
        await data.splice(0, 0, { Order_date: req.body.order_date });

        let existingOrder = await Order.findOne({ email: req.body.email });
        if (existingOrder) {
            await Order.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: data } }
            );
        } else {
            await Order.create({
                email: req.body.email,
                order_data: [data],
                order_date: req.body.order_date
            });
        }

        res.json({ success: true });
    } catch (error) {
        console.error('Database operation failed:', error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
