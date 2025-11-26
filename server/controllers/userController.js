import User from "../models/userModel.js";


const cookieOption = {
    maxAge : 7 * 24 * 60 * 60 * 1000,
    httponly:true,

}

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
        //   await user.save();
          user.password = undefined;

          const token = user.jwtToken();
          res.cookie("token",token, cookieOption)

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
        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.status(401).json({
                success:false,
                message:"Invalid Email or Password"
            })
        }
        user.password = undefined;
        return res.status(200).json({
            success:true,
            message:"login Successfully",
            user
        })

    } catch (error) {
        return res.starus(400).json({
            success:false,
            message:error.message
        })
        
    }
}

