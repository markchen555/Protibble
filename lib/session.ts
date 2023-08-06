import { getServerSession } from "next-auth/next";
import { NextAuthOptions, User } from "next-auth";
// import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import jsonwebtoken from 'jsonwebtoken'
import { JWT } from "next-auth/jwt";

import { SessionInterface, UserProfile } from "@/common.types";
import { createUser, getUser } from "./actions";

export const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!, // "!" is short hand of this can be undefind as well
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
	],
	jwt: {
		encode: ({ secret, token }) => {
			const encodedToken = jsonwebtoken.sign(
				{
					...token,
					iss: "grafbase",
					exp: Math.floor(Date.now() / 1000) + 60 * 60,
				},
				secret
			);

			return encodedToken;
		},
		decode: async ({ secret, token }) => {
			const decodeToken = jsonwebtoken.verify(token!, secret) as JWT;

			return decodeToken;
		},
	},
	theme: {
		colorScheme: "light",
		logo: "/logo.svg",
	},
	callbacks: {
		async session({ session }) {
			// getting user session data from Google 
			const email = session?.user?.email as string;

			try {
				// getting project data from graphql database of the user
				const data = await getUser(email) as { user?: UserProfile }

				// combine the two into new session
				const newSession = {
					...session,
					user: {
						...session.user,
						...data?.user
					}
				}

				return newSession;

			} catch (error) {
				console.log('Error retrieving user data', error);
				return session;
			}

		},
		// temporary AdapterUser 
		// async signIn({ user }: { user: AdapterUser | User }) {
		async signIn({ user }: { user: User }) {

			try {
				// get the user if they exist
				const userExists = await getUser(user?.email as string) as { user?: UserProfile }

				// if they don't exist, create them
				if (!userExists.user) {
					await createUser(user.name as string, user.email as string, user.image as string);
				}

				return true;
			} catch (error: any) {
				console.log('Sign In Error: ', error);
				return false;
			}
		},
	}
}

export async function getCurrentUser() {
	const session = await getServerSession(authOptions) as SessionInterface;

	return session;
}