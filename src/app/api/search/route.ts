import { BACKEND_URL } from '@/utils/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const search = req.nextUrl.searchParams.get('search');

	if (!search) {
		return NextResponse.json({ message: "Missing 'search' parameter" }, { status: 400 });
	}

	try {
		const response = await fetch(`${BACKEND_URL}/search?search=${search}`);
		const data = await response.json();
		return NextResponse.json({ data: data.data, success: true });
	} catch (error) {
		return NextResponse.json(
			{ message: 'An error occurred while processing the request', error: (error as Error).message, success: false },
			{ status: 500 },
		);
	}
}
