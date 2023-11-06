import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      profile(profile) {
        console.log("Github Profile: ", profile);
        let userRole = "Github User";
        if (profile?.email == "pdrmenezes1@gmail.com") {
          userRole = "admin";
        }
        // returns the user with the oauth info + custom role
        return {
          ...profile,
          role: userRole,
        };
      },
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      profile(profile) {
        console.log("Google Profile: ", profile);

        return {
          ...profile,
          // Google provider does not offer an id property, so we'll create one with the equivalent sub property it's sent back in the returned profile
          id: profile.sub,
        };
      },
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // SERVER SIDE - to use the information on the server side we'll set up inside the jwt token
      // gets the role from the user and set it in the token so we can use inseide the application
      if (user) token.role = user.role;
      return token;
    },
    // CLIENT SIDE - to use the info we'll also set this info inside the session token based on the jwt token info
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
  },
};
