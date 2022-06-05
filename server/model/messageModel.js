import mongoose from 'mongoose';
import User from './User.js';
const { Schema } = mongoose;

const message = new Schema(
  {
    message: {
      text: String,
    },
    users: Array,
    sender: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model('Message', message);
export default Message;
