import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";

export const config = {
  providers: [
    CredentialsProvider({
      name: "noop",
      credentials: {},
      authorize: async () => null, // no-op
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      const { pathname } = request.nextUrl;

      const protectedPaths = [
        /\/shipping-address/,
        /\/payment-method/,
        /\/place-order/,
        /\/profile/,
        /\/user\/(.*)/,
        /\/order\/(.*)/,
        /\/admin/,
      ];

      if (!auth && protectedPaths.some((p) => p.test(pathname))) {
        return false;
      }

      return true;
    },
  },
} satisfies NextAuthConfig;

export const { auth: middleware } = NextAuth(config);
