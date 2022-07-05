// factory funct: a funt that return object


const Menu= require('../../models/menu')

function homeControllers() {

    return{
         async index(req,res) {

            const pizzas= await Menu.find()

            // console.log(pizzas)

            return res.render('home', {pizzas: pizzas})
            // res.render('home')
        }
    }

}

module.exports = homeControllers;