const { verify } = require("jsonwebtoken");

module.exports = {
    checkToken: (req, res, next)=>{
         let token = req.get("authorization");
         if(token){
             token=token.slice(7);
             verify(token,"qwe1234",(err,decoded)=>{ //for security we will hide this code qwe1234
                 if(err){
                     res.json({
                         success: 0,
                         msg: "invalid token"
                     });
                 }else{
                     next();
                 }
             })
         }else{
             return res.json({
                 success: 0,
                 msg : "Access denied! unauthorized user"
             });
         }
    }
}