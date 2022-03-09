require('dotenv').config({
    path:process.cwd()+'/src/.env'
})

const config = {
    port: process.env.PORT,
    jwt_secret: process.env.JWT_TOKEN,
    oauthClientId: process.env.OAUTH_CLIENT_ID,
    oauthClienteSecret: process.env.OAUTH_CLIENT_SECRET,
    oauthCallbackURL: process.env.OAUTH_CALLBACK=URL
}

module.exports = config