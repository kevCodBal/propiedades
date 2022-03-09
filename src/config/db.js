const mongoose = require("mongoose")

const connection = async ()=>{
        const conn = await mongoose.connect("mongodb://mongo2/bienesraices")
        console.log("Conectado:", conn.connection.host)
}

module.exports = { connection, mongoose}