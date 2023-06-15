const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token=req.headers?.authorization?.split(" ")[1]
  
  if (token) {
    try {
      const decoded = jwt.verify(token, "masai");
      // console.log(decoded);
      if (decoded) {
        
        req.body.username = decoded.username;
        next();
      } else {
        res.send({ msg: "Please Login" });
      }
    } catch (error) {
      res.send({ err: error.message });
    }
  } else {
    res.send({ msg: "Please Login" });
  }
};

module.exports = {
  auth,
};
