import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import async from '../seed';
import { User } from '../../../model';
import bcrypt from 'bcryptjs';
import { jwt } from '../../../utils';

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
    return loguinUser(req, res)

    default:
      res.status(400).json({message:'Bad request'})

  }
}



const  loguinUser = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

  const { email = '', password = '' } = req.body; 

  await db.connect();

  const user = await User.findOne({ email })

  await db.disconnect();


  if(!user){
    return res.status(400).json({ message: 'correo o contraseña no validos'})
  }

  if( !bcrypt.compareSync(password, user.password!)){
    return res.status(400).json({ message: 'correo o contraseña no validos'})
  }

  const { name , role, _id } = user
 
  const token = jwt.signToken( _id, email);

  return res.status(200).json({

    token, //jwt
    userData:{
      email, name, role
    }

  })

}

