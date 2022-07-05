// // capital var name bcz it is class
// const LocalStrategy = require('passport-local').Strategy
// const User= require('../models/user')
// const bcrypt= require('bcrypt')

// function init(passport){

//     passport.use(new LocalStrategy ( {usernameField: 'email'}, async (email,password,done) =>{

//         //Login

//         //check if email exist
//         const user= await User.findOne({email:email})

//         if(!user){
//             return done(null, false, {message: 'No user with this email'})
//         }

//         // now if email found then we compare password enter by user 
//         //with than one saved in mongodb with hashed val

//         bcrypt.compare(password, user.password).then(match =>{
            
//             //if password matches
//             if(match){
//                 return done(null,user,{message: 'Logged in successfully'})
//             }

//             //if password doesnt match
//             return done(null,false, {message: 'Wrong username or password'})

//         }).catch(err => {
//             return done(null,false, {message: 'Something went wrong'})

//         })

//     }) )

//     passport.serializeUser((user,done) => {
//         //after logged in store user id in session
//         done(null,user._id)
//     })

// // get data stored in session
//     passport.deserializeUser((id,done) => {
      
//         User.findById(id, (err,user) => {

//             done(err,user)
//         })
//     })


// }

// module.exports=init






const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require('bcrypt')

function init(passport) {
    passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        // Login
        // check if email exists
        const user = await User.findOne({ email: email })
        if(!user) {
            return done(null, false, { message: 'No user with this email' })
        }

        bcrypt.compare(password, user.password).then(match => {
            if(match) {
                return done(null, user, { message: 'Logged in succesfully' })
            }
            return done(null, false, { message: 'Wrong username or password' })
        }).catch(err => {
            return done(null, false, { message: 'Something went wrong' })
        })
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user)
        })
    })

}

module.exports = init