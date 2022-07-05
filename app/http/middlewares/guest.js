

function guest (req,res,next){

    // if user is not logged in, then process to next
    if(!req.isAuthenticated()){
        return next()
    }


// if user is logged in then redirect it to homepage not on login page

    return res.redirect('/')


}

module.exports= guest