import { AuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { authLoginApi } from './services/auth'
import CredentialsProvider from 'next-auth/providers/credentials';

const auth: AuthOptions = {
  pages: {
    signIn: '/login',
  },
  theme: { logo: "https://authjs.dev/img/logo-sm.png" },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "username", type: "text" },
        password: { type: 'password', label: 'Password' }
      },
      async authorize(credentials) {
        // if (!credentials?.username || !credentials.password) {
        //   throw new Error('请输入账号和密码');
        // }

        // try {
        //   const user = await authLoginApi({
        //     name: credentials.username,
        //     password: credentials.password
        //   });
        //   return user;
        // } catch (error) {
        //   throw new Error('邮箱或密码错误');
        // }
        return { id: "1", name: "admin", password: "123456" }
      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.id = user.id;
        token.name = user.name;
        // token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        if (session.user) {
          session.user.email = token.email;
        }
      }
      return session;
    }
  }
};

export default auth;
