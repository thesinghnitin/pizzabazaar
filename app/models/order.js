

const mongoose = require('mongoose')

// in js naming convention if the variable is saved with 
// capital name then it is either class or constructor
// it shoulf be calles by slight diff method
const Schema= mongoose.Schema


const orderSchema= new Schema( {

    customerId: {
                   type: mongoose.Schema.Types.ObjectId,
                   ref:'User',
                   required: true
    },

    items: {type:Object, required: true},

    phone: {type:String, required: true},


    address: {type:String, required: true},


    paymentType: {type:String, default: 'COD'},

   status: {type:String, default: 'order_placed'}

  
}, {timestamps: true})


// the name of model must be singular that of collection saved
// in database, here in database collection name is Users 
// so model name here is User
// now we export that model from here and use in serever ,js 
// by importing

module.exports= mongoose.model('Order', orderSchema) 