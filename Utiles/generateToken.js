const jwt = require("jsonwebtoken");

const generateToken = (id) =>{
    return jwt.sign({id}, process.env.SECRETTOKEN,{expiresIn:"1d"} ) 
       
}
module.exports = generateToken