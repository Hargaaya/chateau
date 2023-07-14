import GithubProvider from "next-auth/providers/github";

const githubClientId = process.env.GITHUB_APP_ID;
const githubClientSecret = process.env.GITHUB_APP_PRIVATE_KEY;
const nextAuthSecret = process.env.NEXTAUTH_SECRET;

if (!githubClientId || !githubClientSecret || !nextAuthSecret)
  throw new Error("Missing GITHUB_ID and GITHUB_SECRET env variables. Did you forget to put in the envs?");

const authOptions = {
  providers: [
    GithubProvider({
      clientId: githubClientId,
      clientSecret: githubClientSecret,
    }),
  ],
  secret: nextAuthSecret,
};

export default authOptions;
