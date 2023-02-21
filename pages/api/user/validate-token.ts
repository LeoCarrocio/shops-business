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

    case 'GET':
    return checkJwt(req, res)

    default: 
      res.status(400).json({message:'Bad request'})

  }
}



const checkJwt = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

  const { token = '' } = req.cookies; 

  let userId = '';

  try {
    userId = await jwt.isValidToken(token);
  } catch (error) {
    return res.status(401).json({message:'Tokens de autorizacion no es valido'});
  }

  await db.connect();

  const user = await User.findById(userId);

  await db.disconnect();


  if(!user){
    return res.status(400).json({ message: 'No existe usuario'})
  }

  const { email , role, name, _id} = user
 
  return res.status(200).json({

    token : jwt.signToken(_id, email),
    userData:{
      email, name, role
    }

  })

}

