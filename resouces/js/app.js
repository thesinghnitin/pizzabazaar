
import axios from 'axios'
// //   console.log("welcome to app.js")

import Noty from 'noty'

import {initAdmin} from './admin'

import moment from 'moment'

 


// // get all add-to-cart  class in the form of array addToCart
let addToCart= document.querySelectorAll('.add-to-cart ')

// let cartCounter= document.querySelector('#cartCounter')
  
function updateCart(pizza){
//     // send req to server and add pizza clicked to cart
//     // we can use ajax call , js api for thsi
//     // but we cal also use axios library thats bettr


//     //client send post req to server bcz it is sending data
//     // while in get req client is req data from server

    axios.post('/update-cart',pizza).then(res =>{
        console.log(res)
      
        cartCounter.innerText= res.data.totalQty

        new Noty({

           type: 'success' ,
           timeout:1000,   
           progressBar:false,
           layout: 'bottomCenter',

            text: 'Item added to cart'
        }).show();
    }).catch(err => {

        new Noty({

            type: 'error' ,
            timeout:1000,   
            progressBar:false,
            layout: 'bottomCenter',
 
             text: 'Something went wrong'
         }).show();

    })

}


// now we will add event listener to each button,
// we cal loop through the array by forEach

addToCart.forEach((btn) =>{
    btn.addEventListener('click',(e)=>{
        // console.log(e)

        // conert string to object by parsing
        let pizza= JSON.parse(btn.dataset.pizza)
       updateCart(pizza)
        // console.log(pizza)

    })
})

const alertMsg= document.querySelector('#success-alert')

if(alertMsg){
    setTimeout(()=>{
        alertMsg.remove()
    },2000)
}

// initAdmin()  


//change order status

let statuses= document.querySelectorAll('.status_line')
let hiddenInput= document.querySelector( '#hiddenInput')

let order= hiddenInput ? hiddenInput.value: null

order= JSON.parse(order)

let time= document.createElement('small')

// console.log(order)

function updateStatus(order)    {

    statuses.forEach((status) => {
      
        status.classList.remove('step-completed')
        status.classList.remove('current')

    })

     

    let stepCompleted=true;

    statuses.forEach((status) => {
        let dataProp= status.dataset.status
          
        if(stepCompleted){
            status.classList.add('step-completed')
        }

        if(dataProp === order.status)
        {
            stepCompleted=false
            time.innerText=moment(order.updatedAt).format('hh:mm A')

            status.appendChild(time)
            if(status.nextElementSibling)
            {
                status.nextElementSibling.classList.add('current')
            }
        }
     
    })

     

}

updateStatus(order);





//Socket

let socket= io()
initAdmin(socket)

// // Join

// // in socket we create private room for each client so that the changes we mak=de in one client cannot affect others client
// // private room name must be unique so we use order_id to name it and emit the same imfo from clien side to server side

 if(order)
 {
   socket.emit('join',`order_${order._id}`) 
   //order_ghwdqggqqwg
  
 }

 let adminAreaPath= window.location.pathname;
//  console.log(adminAreaPath)

 if(adminAreaPath.includes('admin')) {

   socket.emit('join', 'adminRoom')
 }

socket.on('orderUpdated' , (data) =>{
   const updatedOrder= { ...order}
   updatedOrder.updatedAt= moment().format()
   updatedOrder.status= data.status
   updateStatus(updatedOrder)
//    console.log(data)


   new Noty({

       type: 'success' ,
       timeout:1000,   
       progressBar:false,
       layout: 'bottomCenter',
        text: 'Order Updated'
    }).show(); 

})



