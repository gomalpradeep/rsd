const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel') 
const jwt = require('jsonwebtoken')

const registerUser = asyncHandler(async (req,res) =>{
    const {name,email, password} = req.body

    if(!name || !email || !password){
        res.status(400)
        throw new Error('please include all fiedl')
        
    }

    //Find if user already exists

    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }
    
    //Hash password

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    //create user
    const user = await User.create({
        name,
        email,
        password:hashedPassword
    })
    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token : generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new error('Invalid user data')
    }

    res.send('Register Route')
})

const loginUser =asyncHandler(async (req, res) =>{

    const {email,password} =req.body
    const user = await User.findOne({email})
    console.log(user)
    if(user &&(await  bcrypt.compare(password, user.password))){
        res.status(200).json({ _id:user._id,
        name:user.name,
        email:user.email,
        token : generateToken(user._id)

    })
    }else{
        res.status(401)
        throw new Error('Invalid Credential')
    }
    res.send('Login Route')
})

const getMe =asyncHandler(async (req, res) =>{

//    const {email,password} =req.body
    const user ={
        id:req.user._id,
        name:req.user.name,
        email:req.user.email
    }
    res.status(400).json(user)
})

const  generateToken= (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d'
    } )
}


module.exports = {
    registerUser,
    loginUser,
    getMe
}