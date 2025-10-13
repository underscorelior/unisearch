import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const filter = req.nextUrl.searchParams.get('filter');
	const page = req.nextUrl.searchParams.get('page') || '0';
	const limit = req.nextUrl.searchParams.get('limit') || '50';

	try {
		const response = await fetch(
			`https://lior.hackclub.app/api/list?page=${page}&limit=${limit}${
				filter && filter.length > 0 ? `&filter=${filter}` : ''
			}`
			// `http://localhost:42107/api/list?page=${page}&limit=${limit}${
			// 	filter && filter.length > 0 ? `&filter=${filter}` : ''
			// }`
		);

		const data = await response.json();

		return NextResponse.json({
			data: data,
			success: true,
		});
	} catch (error) {
		return NextResponse.json({
			message: 'An error occurred while processing the request',
			error: (error as Error).message,
			success: false,
		});
	}
}
