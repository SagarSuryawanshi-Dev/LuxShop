import User from "../models/userModel.js";


export const regsiterUser = async(req,res)=>{
    try {
        const {username,email,phonenumber,password} = req.body;
        if(!username,!email,!phonenumber,!password){
            return res.status(400).json({
                success:false,
                message:"All feilds are required"
            })


            const existingUser = await User.find({email});
            if(existingUser){
                return res.status(400).json({
                    success:false,
                    message:"User Already Exists"
                })
            }
            const user = await User.create({
                username,
                email,
                password,
                phonenumber
            })
            if(!user){
               return res.status(500).json({
                success:false,
                message:"User Registration Failed"
               })  
          }
          await user.save();
          user.password = undefined;
          return res.status(201).json({
            success:true,
            message:"User Register Successfully",
            user
          })

         }
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}