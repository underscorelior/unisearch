import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'img.logo.dev',
			},
			{
				protocol: 'https',
				hostname: '**.edu',
			},
		],
	},
};

export default nextConfig;
