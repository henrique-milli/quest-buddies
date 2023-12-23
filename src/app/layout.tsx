import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'
import ReduxProvider from "@/app/_redux/provider";
import React from "react";
import {Analytics}  from "@vercel/analytics/react";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Pensieri di natale', description: 'Henrique ha scritto un pensiero di natale per te',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ReduxProvider>{children}</ReduxProvider>
                <Analytics/>
            </body>
        </html>
    )
}
