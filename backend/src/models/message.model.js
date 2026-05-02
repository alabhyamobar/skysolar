import mongoose from "mongoose";


const messageSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },
    phone:{
        type:String,
    },
    subject:{
        type:String,
        default:"General Inquery"
    },
    message:{
        type:String,
        required:true,
    },
    
},
{
        timeStamps:true
});

const Message = mongoose.model("Message" , messageSchema );

export default Message;