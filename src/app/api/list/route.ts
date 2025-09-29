import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const filter = req.nextUrl.searchParams.get('filter');
	const offset = req.nextUrl.searchParams.get('offset') || '0';
	const limit = req.nextUrl.searchParams.get('limit') || '50';

	try {
		const response = await fetch(
			// `https://lior.hackclub.app/api/list?id=${id}`
			`http://localhost:42107/api/list?${
				filter ? `filter=${filter}&` : ''
			}offset=${offset}&limit=${limit}`
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
