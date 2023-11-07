import { Account } from "next-auth";
import { JWT } from "next-auth/jwt";

export type JWTToken = JWT & {
  accessToken: {
    code: string;
    expired: number;
  };

  refreshToken: {
    code: string;
    expired: number;
  };
};

export type AzureAccount = Account & {
  id_token: string;
  not_before: number;
  id_token_expires_in: number;
  profile_info: string;
  scope: string;
  refresh_token: string;
  refresh_token_expires_in: number;
};
