const express = require('express')
const router = express.Router()
const {getTickets, createTicket,getTicket,updateTicket,deleteTicket} = require('../controller/ticketController')
const {protect} =require('../middleware/authMiddleware')

//Re-route into note
const noteRouter = require('./noteRoutes')
router.use('/:ticketId/notes',noteRouter)
//router.post('/',registerUser)
//router.post('/login',loginUser)
//router.get('/me',protect,getMe)

router.route('/').get(protect,getTickets).post(protect,createTicket)
router.route('/:id').get(protect,getTicket).put(protect,updateTicket).delete(protect,deleteTicket)

//router.post('/',createTicket)
//router.get('/get-register',protect,getTickets)

module.exports = router