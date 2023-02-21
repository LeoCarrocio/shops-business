
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import async from '../seed';
import { User } from '../../../model';
import bcrypt from 'bcryptjs';
import { jwt, validation } from '../../../utils';

type Data = | { message: string } 
| { token: string,
  userData:{
    email: string, 
    name: string, 
    role: string
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {

  switch(req.method) {

    case 'POST':
    return registerUser(req, res)

    default:
      res.status(400).json({message:'Bad request'})

  }
}


const registerUser = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

  const { email = '', password = '' , name = '' } = req.body as { email: string, password: string, name:string }
  
  if(password.length < 6 ){
    return res.status(400).json({ message: 'Password tineen q ser mayor o igual a seis caracteres'})
  }
  
  if(name.length < 3 ){
    return res.status(400).json({ message: 'Name tineen q ser mayor o igual a tres  caracteres'})
  }

  if(!validation.isValidEmail(email)){
    return res.status(400).json({ message: 'El email no es vaido '})
  }
  
  await db.connect();
  const user = await User.findOne({ email }) 
  if(user){
    await db.disconnect();
    return res.status(400).json({ message: 'Ese correo ya esta registrado'})
  } 

 const newUser = new User({
    name,
    email: email.toLocaleLowerCase(),
    password: bcrypt.hashSync(password),
    role:'client'
 }) 
 
 try {
  await newUser.save({validateBeforeSave:true});
  await db.disconnect(); 
  
 } catch (error) {
  console.log(error);
  return res.status(500).json({ message:'Revisar logs del servidor ' })
 }

  const {_id } = newUser
 
  const token = jwt.signToken( _id, email);

  return res.status(200).json({

    token, //jwt
    userData:{
      email, name, role:'client'
    }

  })

}

