import {
  NextAuthMiddlewareOptions,
  NextRequestWithAuth,
  withAuth,
} from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
import { JWTToken } from "./libs/AuthenTypes";

export const config = {
  matcher: ["/"],
};

export async function middleware(req: NextRequest) {
  let isAuthenticated = false;

  const options: NextAuthMiddlewareOptions = {
    callbacks: {
      authorized: async ({ token, req }) => {
        const jwtToken = token as JWTToken;
        if (
          jwtToken?.accessToken?.expired &&
          jwtToken?.accessToken?.expired * 1000 < Date.now()
        ) {
          return false;
        }

        isAuthenticated = jwtToken?.accessToken?.code != null;

        return isAuthenticated;
      },
    },
  };

  const withAuthRequest = req as unknown as NextRequestWithAuth;

  const response = await withAuth(withAuthRequest, options);

  if (response) {
    return response;
  }

  if (isAuthenticated) {
    //todo: authenticated
  }

  const res = NextResponse.next();

  return res;
}
