import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const id = req.nextUrl.searchParams.get('id');

	if (!id) {
		return NextResponse.json({
			message: "Missing 'id' parameter",
		});
	}

	try {
		const response = await fetch(
			`https://lior.hackclub.app/api/ai/overview?id=${id}`
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
