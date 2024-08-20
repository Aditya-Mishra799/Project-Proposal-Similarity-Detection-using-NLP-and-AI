const express = require("express")
const bcrypt = require("bcryptjs")
const pool = require("../db")
const userValidationScehma = require("../validation/userValidation")

const router = express.Router()
const user_table = 'project_db.users'

// route to register the user
router.post('/register', async(req, res) =>{
    const {email, password, role = 'student'} = req.body
    const {error} = userValidationScehma.validate({email, password, role}, { context: { isRegistration: true } })
    if(error){
        return res.status(400).json({message : error.details[0].message})
    }
    try {
        // hash the password and add the salt of length n
        const passwordHash = await bcrypt.hash(password, 10)
        const users = await pool.query(
            `SELECT * FROM ${user_table} WHERE email = $1`, 
            [email]
        )
        if(users.rows.length > 0){
            return res.status(400).json({message : 'Email Already exists !!!'}) 
        }
        const result = await pool.query(
            `INSERT INTO ${user_table} (email, password_hash, role) VALUES ($1, $2, $3)\
            RETURNING user_id, email;`,
            [email, passwordHash, role]
        )
        return res.status(201).json({message : 'Registration successfull'});
    } catch (error) {
        console.error(error)
        return res.status(500).json({message : 'Error occurred at server, please try again.'})
    }
})

//route to log in user
router.post('/login', async(req, res)=>{
    if(req.session?.user){
        console.log('User already logged in')
        return res.status(200).json({ message: 'Already logged in' });
    }
    const {email, password} = req.body
    const {error} = userValidationScehma.validate({email, password}, { context: { isRegistration: false } })
    if(error){
        return res.status(400).json({message : error.details[0].message})
    }
    try {
        const result = await pool.query(
            `SELECT * from ${user_table} WHERE email = $1;`,
            [email]
        )
        if(result.rows.length == 0){
            return res.status(401).json({message :'Invalid Email id or Password !'})
        }
        const user = result.rows[0]
        const match = await bcrypt.compare(password, user.password_hash)

        if(!match){
            return res.status(401).json({message :'Invalid Email id or Password !'})
        }
        // establish the session

        req.session.user = {
            userID : user.user_id,
            email: user.email,
            role: user.role,
        } 
        return res.status(200).json({ user:req.session.user,message: 'Logged in successfully' });

    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: error.message });
    }
})

// route to logout
router.post('/logout', async (req, res)=>{

    req.session.destroy((error)=>{
        if(error){
            console.error(error)
            return res.status(500).json({message : "Failed to logout !"})
        }
        // connect.sid is the default name for cookie stored in browser by express-session
        res.clearCookie('connect.sid')
        return res.status(200).json({ message: 'Logged out successfully' });
    })
})

module.exports = router