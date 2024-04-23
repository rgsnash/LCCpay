const jwt = require("jsonwebtoken");

// decode token

module.exports = function (req, res, next) {
     try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.jwt_secret);
        if (!decoded.userId) {
            throw new Error("Missing userId in token payload");
          }
          req.body.userId = decoded.userId;
                next();
     } catch (error) {
        res.status(401).send({
           message: error.message,
           success: false,
        });
     }
}