import type { Metadata } from "next";
import "./globals.css";
import { Web3Provider } from "./providers";

export const metadata: Metadata = {
  title: "FreelancerFi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Web3Provider>{children}</Web3Provider>
      </body>
    </html>
  );
}
