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
        trim:true
    },
    role:{
        type:String,
        required:true,
        enum:['admin','user'],
        default:'user'
    },
    
 },{timestamp:true})


 //  bcrypt Password Hashing method
userSchema.pre('save',async function (next){
    if(!this.isModified('password')){
        return next();
    }
    this.password =await bcrypt.hash(this.password, 10);
    
})

// compare bcrypt password method
userSchema.methods.comparePassword = async function (plainTextPassword){
    return await bcrypt.compare(plainTextPassword,this.password);
}

// jSON web Token genration method

userSchema.methods.generateJWTToken = function (){
    const token = jwt.sign({
        _id:this.id,
        role:this.role
    },
    process.env.JWT_SECRET,
    {expiresIn:'24h'}
)};


 const User = mongoose.model('User',userSchema);
 export default User;






