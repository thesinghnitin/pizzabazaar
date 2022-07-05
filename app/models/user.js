const mongoose = require('mongoose')

// in js naming convention if the variable is saved with 
// capital name then it is either class or constructor
// it shoulf be calles by slight diff method
const Schema= mongoose.Schema


const userSchema= new Schema( {
    name: {type: String, required: true},
    email: {type: String, required: true,unique: true},
    password: {type: String, required: true},
    role: {type: String, default: 'customer'},
  
}, {timestamps: true})


// the name of model must be singular that of collection saved
// in database, here in database collection name is Users 
// so model name here is User
// now we export that model from here and use in serever ,js 
// by importing

module.exports= mongoose.model('User', userSchema) 