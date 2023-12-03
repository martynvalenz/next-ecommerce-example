import prisma from '@/lib/prisma';
import NextAuth, { type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcrypt from 'bcryptjs';

const authenticatedRoutes = [
  'checkout/'
]
 
export const authConfig:NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
    // signOut: '/auth/logout',
    // error: '/auth/error',
    // verifyRequest: '/auth/verify-request',
    newUser: '/auth/new-account',
  },
  callbacks:{
    authorized({ auth, request: { nextUrl } }) {
      // console.log(auth)
      const isLoggedIn = !!auth?.user;
      // const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      // if (isOnDashboard) {
      //   if (isLoggedIn) return true;
      //   return false; // Redirect unauthenticated users to login page
      // } else if (isLoggedIn) {
      //   return Response.redirect(new URL('/dashboard', nextUrl));
      // }
      return true;
    },
    jwt({token, user}){
      // console.log({token, user});
      if(user) {
        token.data = user;
      }
      return token
    },
    session({session, token}){
      // console.log({session, token,user});
      session.user = token.data as any;
      return session;
    }
  },
  providers:[
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(7) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        // Search email
        const user = await prisma.user.findUnique(
          { where: { email:email.toLowerCase() } }
        );
        
        if(!user) return null;

        // Check password
        if(!bcrypt.compareSync(password, user.password)) return null;

        // Return user or null if not found
        const { password:_, ...rest } = user;
        return rest;
      },
    }),
  ]
}

export const {
  signIn,
  signOut,
  auth,
  handlers, //GET and POST /api/auth/session
} = NextAuth(authConfig);