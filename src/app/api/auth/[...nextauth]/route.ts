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
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("No credentials provided");
        }

        const { username, password } = credentials as { username: string; password: string };

        try {
          await connectMongoDB();
          const user = await User.findOne({ username });

          if (!user) {
            console.log("User not found");
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            console.log("Password mismatch");
            return null;
          }

          return { id: user._id, name: user.username, email: user.email };

        } catch (error) {
          console.error("Error during authentication:", error);
          throw new Error("Failed to authorize");
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt' as SessionStrategy,  
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };