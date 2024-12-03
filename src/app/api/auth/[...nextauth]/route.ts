import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongoDB } from "@/app/libs/mongodb";
import bcrypt from "bcryptjs";
import { SessionStrategy } from "next-auth";
import User from "@/app/models/User";


const authOptions: any = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" }, // username input field
        password: { label: "Password", type: "password" }, // password input field
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("No credentials provided");
        }

        const { username, password } = credentials as { username: string; password: string };

        try {
          await connectMongoDB(); // connect to database 
          const user = await User.findOne({ username }); // find user by user name 

          if (!user) {
            console.log("User not found");
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password); // compare passwords

          if (!passwordsMatch) {
            console.log("Password mismatch");
            return null;
          }

          // Return user object with necessary fields if authentication is successful

          return { id: user._id, name: user.username, email: user.email };

        } catch (error) {
          console.error("Error during authentication:", error);
          throw new Error("Failed to authorize");
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt' as SessionStrategy,  // use JWT for session management
  },
  callbacks: {
    // JWT callback to add user information to token
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    // session callback to include token information in session
    async session({ session, token }) {
      if (token) {
        session.userId = token.id; // attach user ID to the token
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

// Export the handler for GET and POST requests to handle authentication

export { handler as GET, handler as POST };
