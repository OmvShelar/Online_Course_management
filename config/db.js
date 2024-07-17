
const mongoose = require('mongoose')

async function connectDB(){
try{
await mongoose.connect("mongodb+srv://omshelar09:Om07@cluster0.sbsvgb3.mongodb.net/");
console.log("Connection succesful");
}catch(error){
console.log("error in connection", error);
}
}
module.exports= {connectDB};