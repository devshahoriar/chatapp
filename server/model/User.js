import mongoose from 'mongoose';
const { Schema } = mongoose;

const user = new Schema({
  name: String, 
  email: String,
  password: String,
  image: String,
},{
  strictPopulate:false
});

const User = mongoose.model('User', user);
export default User;