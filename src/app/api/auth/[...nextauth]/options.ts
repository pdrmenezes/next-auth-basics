import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import bcrypt from "bcrypt";

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
        let userRole = "Google User";

        return {
          ...profile,
          // Google provider does not offer an id property, so we'll create one with the equivalent sub property it's sent back in the returned profile
          id: profile.sub,
          role: userRole,
        };
      },
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      // stating the user information used to login as well as using the built in generated form from next-auth
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "your email",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "work your magic",
        },
      },
      // manually handle how it will authenticate
      async authorize(credentials) {
        try {
          const foundUser = await User.findOne({ email: credentials.email }).lean().exec();
          if (foundUser) {
            console.log("User exists");
            const match = await bcrypt.compare(credentials?.password, foundUser.password);
            if (match) {
              console.log("Password matches");
              // for security measures, after we compare the password we will delete the property from the object to avoid any shenanigans
              delete foundUser.password;
              // givint it an arbitrary role that's not admin
              foundUser["role"] = "Unverified Email";
              return foundUser;
            }
          }
        } catch (error) {
          console.log(error);
        }
        return null;
      },
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
