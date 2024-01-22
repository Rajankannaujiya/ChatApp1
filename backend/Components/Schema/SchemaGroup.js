import mongoose from "mongoose";

const groupChat=new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    participants: [String],
    messages: [
        { sender:{
            type:String,
            required:true
        } ,
         content: {
            type:String,
            required:true
         } ,
         time:{
            type:Date,
            default:Date.now
         }},
    ],
  })


  export default mongoose.model("groupChat",groupChat);
