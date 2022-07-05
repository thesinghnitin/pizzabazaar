

require('dotenv').config()

const express= require('express')
const app= express()
const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')
const path= require('path')

const PORT= process.env.PORT 

const mongoose = require('mongoose')

const session = require('express-session')

const flash = require('express-flash')

// var flash        = require('req-flash');



// var name capital for class and const func
const MongoDbStore =   require('connect-mongo')

const passport= require('passport')

const Emitter= require('events')

// Database connection



mongoose.connect(process.env.MONGO_CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true});


const connection= mongoose.connection;

connection
    .once('open', function () {
      console.log('MongoDB running');
    })
    .on('error', function (err) {
      console.log(err);
    });


    //Session store

    // let mongoStore= new MongoDbStore({
    //     mongooseConnection: connection,
    //     collection: 'sessions'
    // })

 //Event emitter

 const eventEmitter = new Emitter()

 app.set('eventEmitter', eventEmitter )


 


    //Session config

    app.use(session( {
        secret: process.env.COOKIE_SECRET,
       
        resave:false,
        store: MongoDbStore.create({
            mongoUrl:process.env.MONGO_CONNECTION_URL,
            collectionName: 'sessions'
        }),
        saveUninitialized:false,
        cookie: {maxAge: 1000*60*60*24} //24h
    }))



    //Passport config

    const passportInit= require('./app/config/passport')
    passportInit(passport)

    app.use(passport.initialize())
    app.use(passport.session())



    // flash is used as a middleware
    // for cookies and session purpose
    app.use(flash())

    

//Assets

// so that server distinguish between html and css,js files. By default server treats everything as html file.
    
app.use(express.static('public'))

//express does not know which type of data it is recieving on server
// so we explicitely tell express about the type of data

// for data recieving from register 
app.use(express.urlencoded({extended:false}))


// for data recieving from add to cart
app.use(express.json())



//Global middleware
//make available session and user on frontend part

app.use((req,res,next) => {

res.locals.session= req.session
res.locals.user= req.user
next()

})



//set Template engine

app.use(expressLayout)
app.set('views', path.join(__dirname,'resouces/views'))
app.set('view engine' , 'ejs')

//inporting function and calling it 
//this functin contains all routes of app instance
require('./routes/web')(app)



const server= app.listen(PORT, () => {
              console.log (`Listening on port ${PORT} `)
           } )


 

// Socket

 const io= require('socket.io')(server)

 io.on('connection', (socket)=>{

//   //join

  // console.log(socket.id)

  socket.on('join', (orderId) => {

    // console.log(orderId)
    socket.join(orderId)
  }) 

 })


eventEmitter.on('orderUpdated', (data) => {

  io.to(`order_${data.id}`).emit('orderUpdated', data)

})

eventEmitter.on('orderPlaced', (data) => {

  io.to('adminRoom').emit('orderPlaced', data)

})





