import { getSession } from "next-auth/react";
import { Providers } from "./providers";
import SessionProvider from "./lib/SessionProvider";

export const metadata = {
 title: "mychat-francostan",
 description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
 const session = await getSession();
 return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          <Providers>{children}</Providers>
        </SessionProvider>
      </body>
    </html>
 );
}