import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const col = req.nextUrl.searchParams.get('col');
	const table = req.nextUrl.searchParams.get('table');

	if (!col) {
		return NextResponse.json({
			message: "Missing 'col' parameter",
		});
	}

	if (!table) {
		return NextResponse.json({
			message: "Missing 'table' parameter",
		});
	}

	try {
		const response = await fetch(
			`${
				process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:42107'
			}/api/get-values?col=${col}&table=${table}`
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
