const jwt = require('jsonwebtoken');
// const User = require('../models/usermodel')

const authorise = (req, res, next) => {
    const token = req.header('Authorization');
    const bearerword = (token.split(" ")[0]).trim();
    const bearerToken = token.split(" ")[1];

if(bearerword != "Bearer"){
    return res.status(400).json({ message: 'Invalid Header'});

}
if (!bearerToken){
    return res.status(401).json({ message: 'No token, authorization denied'});
}try{
    const decoded =jwt.verify(bearerToken,'sprouts');
 req.user = decoded;
 next();
 } catch (error) {
 res.status(401).json({messsage: 'Token is not valid' });
 }
};

module.exports = authorise;