const mongoose = require('mongoose')

// in js naming convention if the variable is saved with 
// capital name then it is either class or constructor
// it shoulf be calles by slight diff method
const Schema= mongoose.Schema


const menuSchema= new Schema( {
    name: {type: String, required: true},
    image: {type: String, required: true},
    price: {type: Number, required: true},
    size: {type: String, required: true},

})


// the name of model must be singular that of collection saved
// in database, here in database coll name is menus 
// so model name here is Menu
// now we export that model from here and use in serever ,js 
// by importing

module.exports= mongoose.model('Menu', menuSchema)