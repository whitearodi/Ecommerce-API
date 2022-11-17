//Here is whereby I'm assuming the issues exists as to why I'm unable to perform crud operations on the specified models 


jwt = require("jsonwebtoken");

const Verifytoken = (req,res,next)=>{
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, (err,user) =>{
      if(err) res.status(403).json("Token is not valid");
      req.user = user;
      next();
    });

  }else{
    return res.status(401).json("You are not authenticated!");

  }

};

 const VerifytokenAndAuthorization = ( req,res,next)=>{
  Verifytoken(req,res,()=>{
    if(req.user.id  === req.params.id || req.user.isAdmin){
    next();
    }else{
      res.status(403).json("Not allowed to do so");
    }
  });
 };




const VerifytokenAndAdmin = (req, res, next) => {
  Verifytoken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("Still not alowed to do that!");
    }
  });
};

module.exports = {
  Verifytoken,
  VerifytokenAndAuthorization,
  VerifytokenAndAdmin,
  
};