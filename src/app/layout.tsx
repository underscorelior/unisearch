import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'University Search',
	description: 'Simple, uncluttered university searching',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<head>
				<link rel='icon' href='/school.svg' />
			</head>
			<body className={`${geistSans.variable} ${geistMono.variable}`}>
				<main className='flex flex-col items-center h-screen min-h-screen min-w-screen font-[family-name:var(--font-geist-sans)]'>
					<Navbar />
					{children}
				</main>
			</body>
		</html>
	);
}
