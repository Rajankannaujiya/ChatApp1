import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose"

const Users=new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    confirmPassword:String,

})
Users.plugin(passportLocalMongoose);

// Users.statics.findByCredentials = async function(email, password) {
//     const user = await Users.findOne({ email });

//     if (!user) {
//         throw new Error('User not found');
//     }

//     if(!(user instanceof Users)){
//         throw new Error('Invalid user instance');
//     }

//     const isMatch = await user.comparePassword(password)

//     if (!isMatch) {
//         throw new Error('Incorrect password');
//     }
//     console.log(user)

//     return user;
// };


export default mongoose.model("Users",Users);