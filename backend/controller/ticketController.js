const asyncHandler = require('express-async-handler')
const Ticket = require('../models/ticketModel') 
const User = require('../models/userModel') 

const jwt = require('jsonwebtoken')
//getTickets, createTicket

const getTickets =asyncHandler(async (req, res) =>{
        //get user using the id in the JWT
        const user = await User.findById(req.user.id)
        if(!user){
            res.status(401)
            throw new Error("User not found")
        }
        const tickets = await Ticket.find({ user: req.user.id})
        res.status(200).json(tickets)
    })

//single ticket

const getTicket =asyncHandler(async (req, res) =>{
    //get user using the id in the JWT
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error("User not found")
    }
    const ticket = await Ticket.findById(req.params.id)

    if(!ticket){
        res.status(404)
        throw new Error("Tciket not found")
    }

    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error("Not Authericared")
    }
    res.status(200).json(ticket)
})



const createTicket =asyncHandler(async (req, res) =>{
        const {product ,description } =req.body
        if(!product || !description) {
            res.status(401)
            throw new Error("Please add a product and description")
        }
        const ticket = await Ticket.create({
            product,
            description,
            user:req.user.id,
            status:'new'
        })
       
        res.status(200).json(ticket)

    })
//update


const updateTicket =asyncHandler(async (req, res) =>{
    //get user using the id in the JWT
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error("User not found")
    }
    const ticket = await Ticket.findById(req.params.id)

    if(!ticket){
        res.status(404)
        throw new Error("Tciket not found")
    }

    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error("Not Authericared")
    }

    const updatesTicket =await Ticket.findByIdAndUpdate(req.params.id,
        req.body, {new:true})
    res.status(200).json(updatesTicket)
})



//deeltet 
    const deleteTicket =asyncHandler(async (req, res) =>{
        //get user using the id in the JWT
        const user = await User.findById(req.user.id)
        if(!user){
            res.status(401)
            throw new Error("User not found")
        }
        const ticket = await Ticket.findById(req.params.id)
    
        if(!ticket){
            res.status(404)
            throw new Error("Tciket not found")
        }
    
        if(ticket.user.toString() !== req.user.id){
            res.status(401)
            throw new Error("Not Authericared")
        }

        await ticket.remove()

        res.status(200).json({success:true})
    })
    
    
module.exports = {
    getTickets,getTicket,updateTicket,
    createTicket,deleteTicket
}