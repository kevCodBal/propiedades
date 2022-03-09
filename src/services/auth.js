const jwt = require('jsonwebtoken')
const {jwt_secret} = require('../config')
const Users = require('./user')

class Auth{

    constructor(){
        this.users = new Users()
    }

    async login(data){
        const user = await this.users.get(data.email)

        if(user && user.password===data.password){
           const data = {
               email: user.email,
               name: user.name
           }

            const token = jwt.sign(data, jwt_secret,{
                expiresIn:"1d"
            })

            return{
                logged: true,
                data,
                token,
                message: "Inicio correcto"
            }   
        }
        return{
            logged:false,
            message: "Credenciales incorrectas"
        }
    }

    async verify(token){
        const user =jwt.verify(token, jwt_secret)
        
        console.log(user)

        return user
    }

    async google(profile){
        const {id:idGoogle, displayName:Name, emails:[email],provider} = profile
        const user = await this.users.get({idGoogle})

        let data 

        if(user){
            data = {
                email:user.email,
                role:user.role
            }
        }else{

            const user = await this.users.create({
                idGoogle,
                name,
                email: email.value,
                provider,
                role: "REGULAR"
            })
            
            data ={
                email:user.email,
                role:user.role
            }
        }


        const token = jwt.sign(data, jwt_secret,{ expiresIn:"1d"})

        return{
            logged: true,
            data,
            token,
            message:"Inicio correcto"
        }
    }


}

module.exports = Auth