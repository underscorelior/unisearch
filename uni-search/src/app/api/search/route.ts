import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'node-html-parser';

export async function GET(req: NextRequest) {
	const search = req.nextUrl.searchParams.get('search');
	console.log(search);

	if (!search) {
		return NextResponse.json({
			message: "Missing 'search' parameter",
		});
	}

	try {
		const response = await fetch(
			'https://nces.ed.gov/ipeds/datacenter/BGP.aspx',
			{
				headers: {
					accept: '*/*',
					'accept-language': 'en-US,en;q=0.6',
					'cache-control': 'no-cache',
					'content-type':
						'application/x-www-form-urlencoded; charset=UTF-8',
					pragma: 'no-cache',
					'sec-ch-ua':
						'"Brave";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
					'sec-ch-ua-mobile': '?0',
					'sec-ch-ua-platform': '"macOS"',
					'sec-fetch-dest': 'empty',
					'sec-fetch-mode': 'cors',
					'sec-fetch-site': 'same-origin',
					'sec-gpc': '1',
					'x-requested-with': 'XMLHttpRequest',
					cookie: 'OnlineSurvey=URL=; ASPSESSIONIDSADTTCBQ=OPAHLKMDKBHKLHCBPHLGEMPJ; ASP.NET_SessionId=k2shr145pb0pxj55sjkv0rui; fromIpeds=true; DATACENTER_SessionGuid=2e004e5b-e135-43d5-b5ac-109a0b3dc7fd; DATACENTER_MAINTABLE=HD2023; DATACENTER_FLAGSTABLE=Institutional Characteristics 2023-24; DATACENTER_currentYear=2023; DATACENTER_PermitLevel=1; DATACENTER_universe=main_table_1; DATACENTER_sessionStart=1/22/2025 10:57:20 PM; DATACENTER_RvData=yes; DATACENTER_STEPID=1; DATACENTER_cdsmaintable=HD2023',
					Referer:
						'https://nces.ed.gov/ipeds/datacenter/InstitutionByName.aspx?goToReportId=5&sid=2e004e5b-e135-43d5-b5ac-109a0b3dc7fd&rtid=5',
					'Referrer-Policy': 'same-origin',
				},
				body: `action=institutionbyname&method=searchforinstitutions&searchvalue=${encodeURIComponent(
					search
				)}&adduniturl=InstitutionList.aspx&199`,
				method: 'POST',
			}
		);

		const data = await response.text();

		if (data.startsWith('TOOMANY')) {
			return NextResponse.json({
				message: 'Too many results',
				success: false,
			});
		}

		if (data.startsWith('NOTFOUND')) {
			return NextResponse.json({
				message: 'No results found',
				success: false,
			});
		}

		const doc = parse(
			data.slice(data.indexOf('|') + 1, data.lastIndexOf('|'))
		);

		return NextResponse.json({
			rawData: data,
			parsedHTML: doc.getElementsByTagName('a').map((a) => a.innerHTML),
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
