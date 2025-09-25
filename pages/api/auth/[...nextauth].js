// Implement NextAuth - (Google login config).

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "../../../lib/mongodb";
import User from "../../../models/User";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
        await dbConnect();
        // Save user if not exists
        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
            await User.create({
                name: user.name,
                email: user.email,
                image: user.image,
                googleId: user.id, // Save Google ID in a separate field
            });
        }
        return true;
    },
    async session({ session }) {
      await dbConnect();
      const dbUser = await User.findOne({ email: session.user.email });
      session.user.id = dbUser?._id?.toString();
      // Ensure latest name/image are reflected in the session
      if (dbUser) {
        session.user.name = dbUser.name || session.user.name;
        session.user.image = dbUser.image || session.user.image;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // After successful login, redirect to /workspace
      if (url === baseUrl || url === `${baseUrl}/`) {
        return `${baseUrl}/workspace`;
      }
      // If it's a relative URL, make it absolute
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }
      // If it's the same origin, allow it
      if (url.startsWith(baseUrl)) {
        return url;
      }
      // Otherwise, redirect to workspace
      return `${baseUrl}/workspace`;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);