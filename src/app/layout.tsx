import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

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
				{/* <Providers> */}
				<main className='pb-10'>{children}</main>
				{/* </Providers> */}
			</body>
		</html>
	);
}
