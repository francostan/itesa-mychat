import mongoose from "mongoose";

const { Schema } = mongoose;

let User;
if (mongoose.models.User) {
 User = mongoose.models.User;
} else {
 const UserSchema = new Schema(
   {
     email: {
       type: String,
       required: true,
       unique: true,
     },
     password: {
       type: String,
       required: false,
     },
     name: {
       type: String,
       required: false,
     },
   },
   { timestamps: true }
 );
 User = mongoose.model('User', UserSchema);
}

export default User;