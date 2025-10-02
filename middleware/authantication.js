const { validToken } = require("../services/authantication");

function checkForAuthanticationCookies(cookiesName){
    return(req,res,next)=>{
        const tokenCookiesValue = req.cookies[cookiesName];
        if(!tokenCookiesValue){
            return next()
        }

        try {
            const userpayload = validToken(tokenCookiesValue)
            req.user = userpayload 
        } catch (error) {
            return next()
        }    
    }
}

module.exports = {checkForAuthanticationCookies}