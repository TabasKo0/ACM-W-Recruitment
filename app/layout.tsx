import type { Metadata } from "next";
import { Anybody, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const anybody = Anybody({
  variable: "--font-anybody",
  subsets: ["latin"],
  weight: ["400", "500", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["500"],
});

export const metadata: Metadata = {
  title: "ACM-W Chennai - Built for Execution",
  description: "Recruitment portal for ACM-W Chennai",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${anybody.variable} ${jetbrainsMono.variable} antialiased min-h-screen flex flex-col uppercase font-body-md text-body-md overflow-x-hidden selection:bg-accent-pink selection:text-on-tertiary bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
