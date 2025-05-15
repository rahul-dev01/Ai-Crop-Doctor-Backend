const mongoose = require("mongoose")

const UserSchema =  new mongoose.Schema (
    {
       first_name : {
        type : String ,
        required :[ true ,  "First name is required"],
        trim : true ,
       },

       last_name : {
        type : String , 
        required : [true , "Last Name is required"] ,
        trim : true 
       }, 

       email : {
        type :String ,
        required : [true , "Password is required "],
        lowercase : true , 
        unique : true ,
        match: [/\S+@\S+\.\S+/, "Email format is invalid"]
       } , 
       
       password : {
        type : String , 
        required : true , 
        min_length : [6 , "Password must be atleast 6 character;"]
       } , 

       createAt  : {
        type : Date , 
        default : Date.now
       }

    }
    
)


module.exports = mongoose.model( "User" , UserSchema)