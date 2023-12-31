import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      authorize(credentials, req) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };
        // validate here your username and password
        var adminUsername = process.env.ADMIN_USERNAME;
        var adminPassword = process.env.ADMIN_PASSWORD;
        if (username !== adminUsername || password !== adminPassword) {
          throw new Error("Username atau password salah");
        }
        // confirmed users
        return { id: "1", name: "admin", isLoggedIn: true };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
