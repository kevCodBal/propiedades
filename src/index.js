 const express = require('express');
 const {port } = require('./config/index')
 const cors = require('cors')
 const cookie = require('cookie-parser')
 const passport = require('passport')

//IMPORTANDO RUTAS
const graphql = require('./routes/graphql')
const auth = require('./routes/auth')
const user = require('./routes/user')
const googleProvider = require('./middleware/google')
const propiedad = require('./routes/propiedad')


//DB\
const {connection } = require('./config/db')
connection()

//Inicio de Aplicacion 
const app = express()
app.use(express.json())
app.use(cookie())
app.use(cors({
    origin:['http://localhost:3000'],
    credentials: true
}))
app.use(passport.initialize())
passport.use(googleProvider())




//ROUTES
graphql(app)
user(app)
auth(app)
propiedad(app)


//Listener
app.listen(port, ()=>{
    console.log("Listenin on port 4000  ")
})