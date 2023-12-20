const expressJwt = require('express-jwt');

const util = require('util');
const getConfig = require('next/config').default; // Use require for compatibility

const { serverRuntimeConfig } = getConfig();

export { jwtMiddleware };

function jwtMiddleware(req, res) {
    const middleware = expressJwt({ secret: serverRuntimeConfig.secret, algorithms: ['HS256'] }).unless({
        path: [
            // public routes that don't require authentication
            
            '/api/users/authenticate'
        ]
    });

    return util.promisify(middleware)(req, res);
}