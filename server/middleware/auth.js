const jwt=
require(
"jsonwebtoken"
);

module.exports=(req,res,next)=>{

let token=

req.headers.authorization;

let decoded=

jwt.verify(

token,
process.env.JWT_SECRET
);

req.userId=
decoded.id;

next();

};