const {mongoose} = require('../config/db')

const { Schema}= mongoose

const UserSchema = new Schema({
    name: String,
    email:String,
    role:String,
    password:String,
    provider:String,
    idGoogle:String
})

const UserModel = mongoose.model("users", UserSchema)

module.exports = UserModel