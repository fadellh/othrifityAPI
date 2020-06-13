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
  updatePaymentStatus,
  invoicePayment
}= transactionController

router.get('/getUserCart/:userId', getUserCart)
router.get('/getUserAddress/:userId', getUserAddress)
router.post('/add-payment/:userId', addPayment)
router.post('/add-image/:idTrans', addImageTrans)
router.get('/get-wait-pay/:userId', getWaitingPayment)
router.post('/update-status/:status/:id', updatePaymentStatus)
router.post('/invoice/', invoicePayment )

module.exports = router