const express = require('express');
const router = express.Router()
const {transactionController} = require('../controller')
// const {auth} = require('../helper/jwt')
const {
  getUserCart,
  addPayment,
  updatePaymentStatus
}= transactionController

router.get('/getUserCart', getUserCart)

module.exports = router