import { BACKEND_URL } from '@/utils/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const col = req.nextUrl.searchParams.get('col');
	const table = req.nextUrl.searchParams.get('table');

	if (!col) {
		return NextResponse.json({ message: "Missing 'col' parameter" }, { status: 400 });
	}

	if (!table) {
		return NextResponse.json({ message: "Missing 'table' parameter" }, { status: 400 });
	}

	try {
		const response = await fetch(
			`${BACKEND_URL}/get-values?col=${col}&table=${table}`,
			{ next: { revalidate: 86400 } },
		);
		const data = await response.json();
		return NextResponse.json(
			{ data, success: true },
			{
				headers: {
					'Cache-Control':
						'public, s-maxage=86400, stale-while-revalidate=86400',
				},
			},
		);
	} catch (error) {
		return NextResponse.json(
			{ message: 'An error occurred while processing the request', error: (error as Error).message, success: false },
			{ status: 500 },
		);
	}
}
