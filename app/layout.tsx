import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LevelUp – Links & Arquivos',
  description: 'Gerenciamento de links e arquivos para games',
  icons: {
    icon: '/control.png',
    shortcut: '/control.png',
    apple: '/control.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${inter.className} bg-gray-900 text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}