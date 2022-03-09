const UserModel = require('../models/users')

class Users{
    


    async get(email){
        return await UserModel.findOne({email}).exec()
    }

    async getAll (query){
        return await UserModel.find(query)
    }

    async create(data){
        console.log(data.User)
        return await UserModel.create(data)

       
    }

    async update(query){
    
        return await UserModel.findByIdAndUpdate(query.id, query.user,{new:true})
    }

}

module.exports = Users