const express = require("express")
const bcrypt = require("bcryptjs")
const pool = require("../db")
const userValidationScehma = require("../validation/userValidation")

const router = express.Router()
const users = 'project_db.users'

// route to register the user
router.post('/register', async(req, res) =>{
    const {email, password, role = 'user'} = req.body
    const {error} = userValidationScehma.validate(req.body)
    if(error){
        return res.status(400).json({message : error.details[0].message})
    }
    try {
        // hash the password and add the salt of length n
        const passwordHash = await bcrypt.hash(password, 10)
        const users = await pool.query(
            `SELECT * FROM ${users} WHERE email = $1`, 
            [email]
        )
        if(users.rows.length > 0){
            return res.status(400).json({message : 'Email Already exists !!!'}) 
        }
        const result = await pool.query(
            `INSERT IN TO ${users} (email, password_hash, role) VALUES ($1, $2, $3)\
            RETURNING user_id, email;`,
            [email, passwordHash, role]
        )
        return res.status(201).json(result.rows[0]);
    } catch (error) {
        return res.status(500).json({message : 'Error occurred at server, please try again.'})
    }
})

//route to log in user
router.post('/login', async(req, res)=>{
    const {email, password} = req.body
    try {
        const result = await pool.query(
            `SELECT * from ${users} WHERE email = $1;`,
            [email]
        )
        if(result.rows.length == 0){
            return res.status(401).json({message :'Invalid Email id or Password !'})
        }
        const user = result.rows[0]
        const match = bcrypt.compare(password, user.password_hash)

        if(!match){
            return res.status(401).json({message :'Invalid Email id or Password !'})
        }
        // establish the session

        req.session.user = {
            userID : user.user_id,
            email: user.email,
            role: user.role,
        } 
        return res.status(200).json({ message: 'Logged in successfully' });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
})

// route to logout
router.post('/logout', async (req, res)=>{

    req.session.destroy((error)=>{
        if(error){
            return res.status(500).json({message : "Failed to logout !"})
        }
        // connect.sid is the default name for cookie stored in browser by express-session
        res.clearCookie('connect.sid')
        return res.status(200).json({ message: 'Logged out successfully' });
    })
})

module.exports = router