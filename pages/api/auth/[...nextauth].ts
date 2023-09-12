import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import { dbUsers } from "../../../database"


export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    // ...add more providers here
    // Credentials({
    //   name:'Custom Login',
    //   credentials:{
    //     email:{lavel:'Correo:', type:'email', placeholder:'correo@example.com'},
    //     password:{lavel:'Contraseña:', type:'password', placeholder:'Contraseña'},
    //   },
    //   async authorize(credentials){
    //     return await dbUsers.checkUserEmailPassword(credentials!.email, credentials!.password);
    //   }
    // }),

    Credentials({
      name: 'Custom Login',
      credentials: {
        email: { label: 'Correo:', type: 'email', placeholder: 'correo@google.com'  },
        password: { label: 'Contraseña:', type: 'password', placeholder: 'Contraseña'  },
      },
      async authorize(credentials, req) {
        //console.log({credentials})
        // return { name: 'Juan', correo: 'juan@google.com', role: 'admin' };

        const user = await dbUsers.checkUserEmailPassword( credentials!.email, credentials!.password );

        if (user) {
          return {
              id: user._id,
              name: user.name,
              email: user.email,
          };
      }
      return null;

      }
    }),


    // PROOVEDORES DE AUTENTICACION 
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
  
  
  ],
  
  // CUSTON PAGE 
  pages:{
    signIn: '/auth/login',
    newUser: '/auth/register',
  }, 
    
  jwt:{
    // secret deprecado 
  },

  session:{
    maxAge: 2592000, // 30 diasa
    strategy: 'jwt',
    updateAge: 86400, // cada dia 
  }, 


    //CALLBACKS 
    //En la parte hay que especificar varios procedimientos, como quiero que se firme el JWT, que data es la que voy a grabar en el en los tokens, que información es la que va a fluir
  callbacks:{
      
    async jwt({token, account, user}){
      
      if(account){
        token.accessToken = account.access_token;
        
        switch(account.type){
          
          case 'oauth':
            token.user = await dbUsers.oAuthToDbUser(user?.email || '', user?.name || '');
            break;
            
            case 'credentials':
              token.user = user;
              break;
            }
        
        }
            
      return token;
    },
        
    async session({session, token, user}){
            
      //session.accessToken = token.accessToken;z
      //session.user = token.user as any;
      session.accessToken = token.accessToken as string;
      session.user = token.user as any;
  
            
      return session;
    }
        
  }
})
