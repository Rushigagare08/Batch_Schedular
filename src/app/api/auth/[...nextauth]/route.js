import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import NextAuth from "next-auth";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;

        // 1️⃣ Hardcoded admin check
        if (email === "admin" && password === "admin@123") {
          return {
            _id: "0",
            name: "Admin",
            email: "admin",
            role: "admin",
          };
        }

        // 2️⃣ Database users
        try {
          await connectMongoDB();
          const user = await User.findOne({ email });

          if (!user) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (!passwordsMatch) return null;

          return user; // returns the user object including role
        } catch (error) {
          console.log("Error", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role; // store role in JWT
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role; // make role available in session
      session.user.email = token.email;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
