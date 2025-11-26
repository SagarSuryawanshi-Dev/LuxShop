 import mongoose from 'mongoose';
 import bcrypt from 'bcrypt'

 const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Username is Required"],
        trim:true,
        maxlength:[20,'Name should not be more than 20 characters']
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
        trim:true,
        lowercase:true,

    },
    phonenumber:{
        type:Number,
        required:[true,"Phone Number is required"],
        maxlength:[10,"Phone Number should not be more than 10 digits"],
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        minlength:[6,"Password should be at least 6 characters"],
        trim:true,
        select:false
    },
    role:{
        type:String,
        required:true,
        enum:['admin','user'],
        default:'user'
    },
    
 },{timestamp:true})

 const User = mongoose.model('User',userSchema);
 export default User;




//  bcrypt Password Hashing method
userSchema.pre('save',async function (next){
    if(!this.isModified('password')){
        return next();
    }
    this.password = bcrypt.hash(this.password, 10);
})

