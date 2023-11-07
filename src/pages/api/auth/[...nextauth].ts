import { AzureAccount, JWTToken } from "@/libs/AuthenTypes";
import NextAuth, { User } from "next-auth";
import { JWT } from "next-auth/jwt";
import AzureADB2CProvider from "next-auth/providers/azure-ad-b2c";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    AzureADB2CProvider({
      tenantId: process.env.AZURE_AD_B2C_TENANT_NAME,
      clientId: process.env.AZURE_AD_B2C_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_B2C_CLIENT_SECRET!,
      primaryUserFlow: process.env.AZURE_AD_B2C_PRIMARY_USER_FLOW,
      authorization: { params: { scope: "offline_access openid" } },
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn(props: any) {
      console.log("🚀Sign In", props);
      return true;
    },

    async session({ session, token, user }: any) {
      const jwtToken = token as JWTToken;
      //console.log("🚀 Session", session);
      return { ...session, accessToken: jwtToken.accessToken };
    },
    async jwt({ token, user, account, profile, isNewUser }: any) {
      const azureAccount: AzureAccount = account;
      if (account) {
        //console.log("🚀 jwt", token, user, account, profile);
        return {
          ...token,
          accessToken: {
            code: azureAccount.id_token,
            expired:
              Number(azureAccount.not_before) +
              Number(azureAccount.id_token_expires_in), //120s
          },
          refreshToken: {
            code: azureAccount.refresh_token,
            expired:
              Number(azureAccount.not_before) +
              azureAccount.refresh_token_expires_in,
          },
        };
      }

      const jwtToken = token as JWTToken;
      //check expired
      const expired = jwtToken.accessToken.expired * 1000 < Date.now();
      if (expired) {
        //todo: refresh token
      }

      return jwtToken;
    },
  },
};

export default NextAuth(authOptions);
