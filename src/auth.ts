import NextAuth, {
  AuthError,
  CredentialsSignin,
  type Session,
} from "next-auth";
import { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import { getPocketBase } from "./lib/pocketbase";
import { type RecordModel } from "pocketbase";

class CredentialError extends CredentialsSignin {
  code = "credential_error";
}

class RefreshTokenError extends AuthError {
  code = "refresh_token_error";
}

interface DumpedAuthStore {
  token: string;
  record: RecordModel;
}

declare module "next-auth" {
  interface Session {
    pb?: DumpedAuthStore;
  }

  interface User {
    pbToken?: string;
    pbRecord?: RecordModel;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    pbToken?: string;
    pbRecord?: RecordModel;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        const pb = await getPocketBase();

        if (
          !credentials.email ||
          typeof credentials.email !== "string" ||
          !credentials.password ||
          typeof credentials.password !== "string"
        ) {
          throw new CredentialError("Missing email or password");
        }

        try {
          const response = await pb
            .collection("users")
            .authWithPassword(credentials.email, credentials.password);

          if (response.record) {
            return {
              ...response.record,
              pbToken: response.token,
              pbRecord: response.record,
            };
          }
          return null;
        } catch {
          throw new CredentialError("Invalid email or password");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      // User signin
      if (user) {
        return {
          ...token,
          pbToken: user.pbToken,
          pbRecord: user.pbRecord,
        };
      } else {
        const pocketbase = await getPocketBase({
          token: token.pbToken!,
          record: token.pbRecord!,
        });

        try {
          const refresh = await pocketbase.collection("users").authRefresh();

          if (refresh.record) {
            return {
              ...token,
              pbToken: refresh.token,
              pbRecord: refresh.record,
            };
          }
        } catch {
          throw new RefreshTokenError("Could not refresh token");
        }
      }

      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.pb = { token: token.pbToken!, record: token.pbRecord! };
      }
      return session;
    },
  },
});
