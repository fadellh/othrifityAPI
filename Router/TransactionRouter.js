const express = require('express');
const router = express.Router()
const {transactionController} = require('../controller')
// const {auth} = require('../helper/jwt')
const {
  getUserCart,
  getUserAddress,
  addPayment,
  updatePaymentStatus
}= transactionController

router.get('/getUserCart/:userId', getUserCart)
router.get('/getUserAddress/:userId', getUserAddress)

module.exports = router