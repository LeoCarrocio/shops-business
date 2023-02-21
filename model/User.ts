import { Mode } from 'fs';
import mongoose, { Schema, model, Model } from 'mongoose';
import { IUser } from '../interfaces';


const userSchema = new Schema({

  name : {type: 'string', required: true},
  email : {type: 'string', required: true, unique: true},
  password : {type: 'string', required: true},
  role : {
    type: 'string',
    enum:{
      values:['admin','client'],
      message : '{VALUE} no es un role valido',
      default: 'client',
      required: true,
    },
  }

},{
  timestamps:true,
})


const User:Model<IUser> = mongoose.models.User || model('User',userSchema);

export default User;