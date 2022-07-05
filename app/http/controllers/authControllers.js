
// importing model
// capital letter of var bcz it is model
const User= require('../../models/user')

const bcrypt = require('bcrypt')

const passport= require('passport')

function authControllers() {

  const _getRedirectUrl= (req)=>{
    return req.user.role ==='admin' ? '/admin/orders': '/customer/orders'
  }

    return{

        login(req,res) {
            res.render('auth/login')  
              } ,


     postLogin(req,res,next){

      const {email,password } = req.body 

      // console.log(req.body)

        // Validate request 
   if( !email || !password) {
    req.flash('error', 'All fields are required')

   return res.redirect('/login')
}

       passport.authenticate('local', (err,user,info) =>{

          if(err) {
           req.flash('error',info.message)
            return next(err)
          }

          if(!user)
          {
            req.flash('error',info.message)
            return res.redirect('/login')
          }

          req.logIn(user, (err) => {
            if(err) {

              req.flash('error',info.message)
              return next(err)
            }
            
            // return res.redirect('/')

            return res.redirect(_getRedirectUrl(req))


          })

        }) (req,res,next) 
      },
         

         register(req,res) {
            res.render('auth/register')      
          },

async postRegister(req,res){
            const {name,email,password } = req.body 

            // console.log(req.body)

              // Validate request 
         if(!name || !email || !password) {

           //   // flash messages are only for the single request
            //   // it will delete after we refresh
          req.flash('error', 'All fields are required')
          req.flash('name', name)
          req.flash('email', email)
         return res.redirect('/register')
      }

      // Check if email exist
      User.exists({email:email}, (err,result) =>{ 
      
       if(result){

        req.flash('error', 'Email already taken')
        req.flash('name', name)
        req.flash('email', email)

        return res.redirect('/register')

       }
      })

      //Hash password

// The await operator is used to wait for a 
// Promise. It can be used inside an Async block only.
// async makes a function return a Promise. await makes a function wait for a Promise.
      
      const hashedPassword= await bcrypt.hash(password,10)


      // Create a user
      const user = new User({
       name,
      email,
        //wrong, dont store passwork as such in database
        //encrypt it and then store
        // password:password

        password: hashedPassword
      })

     
      user.save().then((user) =>{

        //Login

        return res.redirect('/')
      }).catch(err => {

        req.flash('error', 'Something went wrong')
        return res.redirect('/register')

      })
          },

           logout(req,res){

            req.logout()
            return res.redirect('/login')

           }


        }
         

}

module.exports = authControllers