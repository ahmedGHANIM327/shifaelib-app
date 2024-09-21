import type { Metadata } from 'next';
import { Work_Sans } from 'next/font/google';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { EdgeStoreProvider } from '@/lib/edgestore';

const work_sans = Work_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Shifaelib',
  description: 'Votre app pour gérer votre cabinet',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${work_sans.className}`}>
        <ToastContainer
          position={'bottom-right'}
          rtl={false}
          closeOnClick
          theme={'colored'}
          pauseOnHover={false}
          pauseOnFocusLoss={false}
        />
        <EdgeStoreProvider>
          {children}
        </EdgeStoreProvider>
      </body>
    </html>
  );
}
