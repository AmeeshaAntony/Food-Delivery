const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Ensure jwtSecret is properly defined
const jwtSecret = "your-secret-key";

// Route to create a new user
router.post('/createuser',
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password', 'Incorrect Password').isLength({ min: 5 }), // Incorrect password message if criteria not satisfied
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const salt = await bcrypt.genSalt(10); // Generate salt
            let secPassword = await bcrypt.hash(req.body.password, salt); // Hash password with salt

            await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location,
            });

            res.json({ success: true });
        } catch (error) {
            console.log(error);
            res.json({ success: false, error: error.message });
        }
    }
);

router.post('/loginuser',
    body('email').isEmail(),
    body('password', 'Incorrect Password').isLength({ min: 5 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('Validation errors:', errors.array());
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            let email = req.body.email;
            let userData = await User.findOne({ email });
            if (!userData) {
                console.log('User not found');
                return res.status(400).json({ errors: [{ msg: "Try logging in again" }] });
            }

            const pwdCompare = await bcrypt.compare(req.body.password, userData.password);
            if (!pwdCompare) {
                console.log('Password does not match');
                return res.status(400).json({ errors: [{ msg: "Try logging in again" }] });
            }

            const data = {
                user: {
                    id: userData.id
                }
            };

            const authToken = jwt.sign(data, jwtSecret);
            res.json({ success: true, authToken: authToken });
        } catch (error) {
            console.log('Error occurred:', error);
            res.json({ success: false, error: error.message });
        }
    }
);

module.exports = router;
