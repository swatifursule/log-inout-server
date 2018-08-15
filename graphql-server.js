const express    = require('express')
const bodyParser = require('body-parser')
const { graphqlExpress } = require('apollo-server-express')
const { graphiqlExpress } = require('graphql-server-express');
const schema = require('./data/schema')
const jwt = require('express-jwt')
require('dotenv').config()

/*a third-party authentication service like Auth0*/
//const jwksRsa = require('jwks-rsa')

const app = express();
const PORT = 3000

// bodyparser
app.use(bodyParser.json())

// authentication middleware
const authMiddleware = jwt({
    // does not make - automatically makes all our queries, mutations etc. secured.
    credentialsRequired: false,
    /* JWT*/
    secret: process.env.JWT_SECRET

    /*a third-party authentication service like Auth0*/
    // dynamically provide a signing key based on the kid in the header and
    // the signing keys provided by the JWKS endpoint.
    //secret: jwksRsa.expressJwtSecret({
    //    cache: true,
    //    rateLimit: true,
    //    jwksRequestsPerMinute: 5,
    //    jwksUri: `https://YOUR_AUTH0_DOMAIN/.well-known/jwks.json`
    //}),

    // validate the audience and the issuer.
    //audience: '{YOUR_API_IDENTIFIER}',
    //issuer: `https://YOUR_AUTH0_DOMAIN/`,
    //algorithms: ['RS256']
});

app.use(authMiddleware);



app.use('/graphiql', graphiqlExpress({
    endpointURL: '/api',
}));
app.use('/api', graphqlExpress(req => ({
        schema,
        context: {
            user: req.user
        }
    })));

/*To authenticate users, we can add a login resolver function like below:
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')

login (_, { email, password }) {
    const user = await User.findOne({ where: { email } })

    if (!user) {
        throw new Error('No user with that email')
    }

    const valid = await bcrypt.compare(password, user.password)

    if (!valid) {
        throw new Error('Incorrect password')
    }

    // return json web token
    return jsonwebtoken.sign({
        id: user.id,
        email: user.email
    }, 'somesuperdupersecret', { expiresIn: '1y' })
}
/*To authenticate users*/

app.listen(PORT, () => {
    console.log('Server is up on 3000');
})