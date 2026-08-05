import { BACKEND_URL } from '@/utils/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const filter = req.nextUrl.searchParams.get('filter');
	const page = req.nextUrl.searchParams.get('page') || '0';
	const limit = req.nextUrl.searchParams.get('limit') || '50';

	try {
		const url = `${BACKEND_URL}/list?page=${page}&limit=${limit}${filter ? `&filter=${filter}` : ''}`;
		const response = await fetch(url);
		const data = await response.json();
		return NextResponse.json({ data, success: true });
	} catch (error) {
		return NextResponse.json(
			{ message: 'An error occurred while processing the request', error: (error as Error).message, success: false },
			{ status: 500 },
		);
	}
}
