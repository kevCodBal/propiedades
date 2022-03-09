const googleStrategy = require("passport-google-oauth")
const GoogleStrategy = googleStrategy.OAuth2Strategy

const {oauthCallbackURL,  oauthClientId, oauthClienteSecret}= require('../config')

function googleProvider(){
    return new GoogleStrategy({
        clientID: oauthClientId,
        clientSecret: oauthClienteSecret,
        callbackURL: oauthCallbackURL,
        passReqToCallback:true
    }, (req, acceesToken, refreshToken, profile, cb)=>{
        cb({profile, acceesToken})
    })
}

module.exports = googleProvider