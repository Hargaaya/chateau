import { User } from "@/models/User";
import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import mongoConnection from "./mongoConnection";
import defaultSettings from "@/constants/defaultSettings";

const githubClientId = process.env.GITHUB_APP_ID;
const githubClientSecret = process.env.GITHUB_APP_PRIVATE_KEY;
const nextAuthSecret = process.env.NEXTAUTH_SECRET;

if (!githubClientId || !githubClientSecret || !nextAuthSecret)
  throw new Error("Missing GITHUB_ID and GITHUB_SECRET env variables. Did you forget to put in the envs?");

const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: githubClientId,
      clientSecret: githubClientSecret,
    }),
  ],
  secret: nextAuthSecret,
  callbacks: {
    async signIn({ user }) {
      await mongoConnection();
      const email = user?.email ?? "";
      if (email) {
        createUser(email);
      }

      return true;
    },
  },
};

async function createUser(email: string) {
  const userExists = await User.exists({ _id: email });
  if (!userExists) {
    await User.create({
      _id: email,
      chats: [],
      boards: [],
      settings: defaultSettings,
    });
  }
}

export default authOptions;
