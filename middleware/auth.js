const jwt = require("jsonwebtoken")

function verifyToken(req,res,next)
{
    const bearerHeader = req.headers['authorization']
    if(typeof(bearerHeader )!== undefined)
    {
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]

        req.token = bearerToken
        jwt.verify(bearerToken,process.env.SECERTE_KEY,(err,res)=>
        {
            if(err)
            {
                res.status(403).json({
                    code : 403,
                    name: 'invalid_token',
                    error : 'Invalid Token'
                })
            }else
            {
                next()
            }
        })
    }else
    {
        res.status(400).json(
            {
                code : 400,
                name :'token_not_found',
                error : 'Token not found'
            }
        )
    }
}

module.exports = verifyToken