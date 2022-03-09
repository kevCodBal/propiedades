const {mongoose} = require('../config/db')
const { Schema}= mongoose

const PropiedadySchema = new Schema({
    precio: Number,
    ubicacion:Array,
    tamano: String,
    numeroHabitaciones:Number,
    banos: Number,
    fotografias:Array,
    descripcion: String,
    parqueo:Number,
    
})

const PropiedadModel = mongoose.model("propiedad", PropiedadySchema)
module.exports = PropiedadModel