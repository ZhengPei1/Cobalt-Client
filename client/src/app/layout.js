"use client"
import { AuthContextProvider } from "@/util/firebase/AuthContext";
import Head from 'next/head'
import "./globals.css";



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Cobalt</title>
      </head>
      <body>
        <AuthContextProvider>
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
