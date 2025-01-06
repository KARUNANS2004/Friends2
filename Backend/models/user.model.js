const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        minlength:[6,'Username must be atleast 6 character long']
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:[5, 'Password must be atleast 5 characters long']
    },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
})

const User=mongoose.model('user',userSchema)

module.exports=User;