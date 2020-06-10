const express = require('express');
const router = express.Router()
const {transactionController} = require('../controller')
// const {auth} = require('../helper/jwt')
const {
  getUserCart,
  getUserAddress,
  addPayment,
  addImageTrans,
  getWaitingPayment,
  updatePaymentStatus
}= transactionController

router.get('/getUserCart/:userId', getUserCart)
router.get('/getUserAddress/:userId', getUserAddress)
router.post('/add-payment/:userId', addPayment)
router.post('/add-image/:id', addImageTrans)
router.get('/add-wait-pay/:userId', getWaitingPayment)
router.post('/update-status/:status/:id', updatePaymentStatus)

module.exports = router