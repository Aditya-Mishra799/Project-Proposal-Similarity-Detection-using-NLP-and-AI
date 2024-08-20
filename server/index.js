require("dotenv").config()
const express = require("express")
const cors = require("cors")
const pool = require("./db")
const session = require("express-session")
const pgSession = require("connect-pg-simple")(session)

const app = express()
port = process.env.SERVER_PORT || 5000
// Allow specific origin and credentials
const corsOptions = {
    origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5713', 
    credentials: true, // Allows cookies to be sent
  };

// middle-ware
app.use(cors(corsOptions))

// this gives access to request.body, so that we can get json data pass by user
app.use(express.json());

//conifgure the session manager

app.use(session({
    //create a session-store to  store the session info in database
    store : new pgSession({
        pool : pool,
        tableName : 'user_sessions',
        schemaName: process.env.SCHEMA_NAME,
        createTableIfMissing: true,
    }),
    // used to sign the session id cookies
    secret: process.env.SESSION_SECRET,
    // donot save cookies if has not been modified during request
    resave: false,
    // avoid storing empty sessions in DB
    saveUninitialized: false,
    // refresh the time-out if user is active
    rolling : true,
    cookie :{
        maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
        httpOnly: true, // cookie not accessible to browers javascript (client),
        secure: process.env.NODE_ENV == "production", // in production send coookies ove https only
        sameSite: 'lax', // cookies will only be sent to certain cross-site request
    }
}))

// ROUTES ----------------------------------------------------------
app.get('/', (req,res)=>{
    return res.send({ message: 'This is backend API to interact with database and similarity checker.' });
})

// Auth routes
const authRoutes = require("./routes/auth")
app.use('/auth', authRoutes)

// start the server at specified port
app.listen(port, ()=>{
    console.log(`server has started on port ${port}`)
})