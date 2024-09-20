import type { Metadata } from 'next';
import { Work_Sans } from 'next/font/google';
import './globals.css';

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
      <body className={`${work_sans.className}`}>{children}</body>
    </html>
  );
}
