//user loggedin or not middleware.

import jwt from "jsonwebtoken";

export const authrnticateUser = (req,res,next) => {
    try {
        const token = req.cookies.accessToken 
        if(!token) {
           return res.status(401).json({
            success:false,
            message:"Unauthorized, Access Token is Missing"
           })
        }

        const decoded = jwt.verify(token,process.env.ACCESS_TOKEN)
        req.user = decoded;
        next();

    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"Unauthorized, Invalid Access Token"
        })
    }
}