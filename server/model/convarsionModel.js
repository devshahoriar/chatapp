import mongoose from 'mongoose';
const { Schema } = mongoose;

const convirsion = new Schema(
  {
    u1: { type: Schema.Types.ObjectId, ref: 'User' },
    u2: { type: Schema.Types.ObjectId, ref: 'User' },
  }
);

const Convarsion = mongoose.model('Convirsion', convirsion);
export default Convarsion;
