const authControllers = require('../app/http/controllers/authControllers.js')
const cartControllers = require('../app/http/controllers/customers/cartController.js')
const homeControllers = require('../app/http/controllers/homeControllers.js')
const orderControllers = require('../app/http/controllers/customers/orderController.js')
// const AdminOrderController = require('../app/http/controllers/admin/orderController.js')

const adminOrderController = require('../app/http/controllers/admin/orderController.js')
const statusController = require('../app/http/controllers/admin/statusController.js')



// middlewares
 
const guest = require('../app/http/middlewares/guest')
const auth = require('../app/http/middlewares/auth') 
const admin = require('../app/http/middlewares/admin')


function initRoutes(app) {

    app.get('/',  homeControllers().index  )

    // using guest middleware ensure that to go to login or register route
    // user must not be already logged in
    app.get('/login', guest,authControllers().login )

    app.post('/login', authControllers().postLogin )

    app.get('/register', guest,authControllers().register )
    
    app.post('/register', authControllers().postRegister )
  
    app.post('/logout', authControllers().logout )

    app.get('/cart', cartControllers().index )
    
    app.post('/update-cart',cartControllers().update )


     
    //Customer routes

    app.post('/orders',auth, orderControllers().store)

    // app.get  ('/my_orders',auth, orderControllers().index)

    app.get  ('/customer/orders', orderControllers().index)

     // we use :id bcz it is dynamic and diff for diff user
     app.get  ('/customer/orders/:id', orderControllers().show) 

     
    // Admin routes

        // app.get  ('/admin/orders', AdminOrderController().index)
 
    app.get  ('/admin/orders', admin,adminOrderController().index)

    // app.get ('/admin_orders', admin,AdminOrderController().index)

    app.post('/admin/order/status', admin,statusController().update)
 

}


//each file in node project is a module so we can easily export it.


//exporting initRoutes function
module.exports= initRoutes