import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const search = req.nextUrl.searchParams.get('search');

	if (!search) {
		return NextResponse.json({
			message: "Missing 'search' parameter",
		});
	}

	try {
		const response = await fetch(
			// `https://lior.hackclub.app/api/search?search=${search}`
			`http://localhost:42107/api/search?search=${search}`
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
