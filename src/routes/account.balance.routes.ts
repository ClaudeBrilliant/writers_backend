const express = require('express');
const router = express.Router();
const { getUserBalance, updateUserBalance } = require('../controllers/accountController');

// Get user balance
router.get('/accountbalance', getUserBalance);

// Update user balance (for example, after payment or transaction)
router.post('/updatebalance', updateUserBalance);

module.exports = router;
