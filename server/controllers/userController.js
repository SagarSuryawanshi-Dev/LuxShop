import User from "../models/userModel.js";


export const registerUser = async(req,res)=>{
    
    try {
        console.log("Request Recevied")
        const {username,email,phonenumber,password} = req.body;
        if(!username || !email || !phonenumber || !password){
            return res.status(400).json({
                success:false,
                message:"All feilds are required"
            })
        }


            const existingUser = await User.findOne({email});
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
            console.log(user)
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

         
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export const loginUser = async(req,res) => {
    try {
        console.log("Login Request Recevied")
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"All feilds are required"
            })
        }
        const user = await User.findOne({ email }).select("+password");
        if(!user){
            return res.status(404).json({
                success:false,
                message: "User not Found"
            })
        }

    } catch (error) {
        
    }
}