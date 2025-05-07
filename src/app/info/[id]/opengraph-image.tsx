import { control_conv } from '@/utils/conversion';
import { headers } from 'next/headers';
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

async function loadGoogleFont(
	font: string,
	weight: string | null,
	text: string
) {
	const url = `https://fonts.googleapis.com/css2?family=${font}${
		weight ? ':wght@' + weight : ''
	}&text=${encodeURIComponent(text)}`;
	const css = await (await fetch(url)).text();
	const resource = css.match(
		/src: url\((.+)\) format\('(opentype|truetype)'\)/
	);

	if (resource) {
		const response = await fetch(resource[1]);
		if (response.status == 200) {
			return await response.arrayBuffer();
		}
	}

	throw new Error('failed to load font data');
}

function truncateText(text: string, maxLength: number) {
	if (text.length <= maxLength) return text;
	return text.slice(0, maxLength - 1) + '…';
}

export default async function GET({ params }: { params: { id: string } }) {
	const id = params.id;
	const host = (await headers()).get('host');
	const protocol = host?.includes('localhost') ? 'http' : 'https';

	const response = await fetch(`${protocol}://${host}/api/getinfo?id=${id}`);

	if (!response.ok) {
		throw new Error('Failed to fetch university data');
	}

	const university = (
		(await response.json()) as {
			data: UniversityInfoProps;
			success: boolean;
		}
	).data;
	const general = university.general;
	const enrollment = university.enrollment;

	const name = general.name;

	// const text =
	// 	`Students: ${(+enrollment.total).toLocaleString()} ${
	// 		general.location !== null
	// 			? `${general.location.city}, ${general.location.state}`
	// 			: 'N/A'
	// 	}` + 'acceptance rate';

	const text = [
		...[...Array(26)].map((q, w) => String.fromCharCode(w + 65)),
		...[...Array(26)].map((q, w) => String.fromCharCode(w + 97)),
		...Array(10).keys(),
		' ,&#@!$%^&*()_+[]{}|;:,.<>?/',
	].join('');

	const control = control_conv[general.controlOfInst as never];

	return new ImageResponse(
		(
			<div tw='flex bg-white w-full h-full p-12 flex-col'>
				<div tw='flex flex-row'>
					<img
						src={
							// TODO: Find a way to incorporate the logo into the uni db.
							`https://img.logo.dev/${general.URLs.general
								.replace('https://', '')
								.replace(
									'http://',
									''
								)}?token=pk_SlnGUaGiQEClf4KEK7bUwA&retina=true` ||
							`${general.URLs.general}${
								general.URLs.general.endsWith('/') ? '' : '/'
							}favicon.ico`
						}
						alt={`${general.name} campus`}
						width={150}
						height={150}
						tw='rounded-lg mr-6'
					/>
					<div tw='flex flex-col items-start justify-center h-[150px] py-2 pl-2 w-full max-w-[920px]'>
						<span
							tw='text-6xl leading-none mb-2 tracking-tight w-full'
							style={{
								fontFamily: 'Noto Sans',
								fontWeight: 'bold',
								textOverflow: 'ellipsis',
								overflow: 'hidden',
								whiteSpace: 'nowrap',
							}}
						>
							{truncateText(name, 33)}
						</span>
						<div tw='text-[1.375rem] text-stone-700 font-semibold flex flex-row items-center'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='24'
								height='24'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
								style={{ marginRight: '0.5rem' }}
							>
								<path d='M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0'></path>
								<circle cx='12' cy='10' r='3'></circle>
							</svg>
							<span
								tw='mr-6'
								style={{
									fontFamily: 'Geist',
									fontWeight: '600',
								}}
							>
								{general.location !== null
									? `${general.location.city}, ${general.location.state}`
									: 'N/A'}
							</span>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='24'
								height='24'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
								style={{ marginRight: '0.5rem' }}
							>
								<path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2'></path>
								<circle cx='9' cy='7' r='4'></circle>
								<path d='M22 21v-2a4 4 0 0 0-3-3.87'></path>
								<path d='M16 3.13a4 4 0 0 1 0 7.75'></path>
							</svg>
							<span
								tw='mr-6'
								style={{
									fontFamily: 'Geist',
									fontWeight: '600',
								}}
							>
								{/* Maybe instead of number say something about the size? */}
								Students: {(+enrollment.total).toLocaleString()}
							</span>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='24'
								height='24'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								stroke-width='2'
								stroke-linecap='round'
								stroke-linejoin='round'
								style={{ marginRight: '0.5rem' }}
							>
								<path d='M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z'></path>
								<path d='M22 10v6'></path>
								<path d='M6 12.5V16a6 3 0 0 0 12 0v-3.5'></path>
							</svg>
							<span
								tw='mr-6'
								style={{
									fontFamily: 'Geist',
									fontWeight: '600',
								}}
							>
								{control}
							</span>
						</div>
					</div>
				</div>
				<div tw='flex flex-col text-center items-center justify-center'>
					Acceptance Rate
					<img
						src={`https://quickchart.io/chart?w=150&h=150&c=${encodeURIComponent(
							JSON.stringify({
								type: 'doughnut',
								data: {
									datasets: [
										{
											data: [
												university.admissions
													.acceptanceRate.overall *
													100,
												100 -
													university.admissions
														.acceptanceRate
														.overall *
														100,
											],
											backgroundColor: [
												'#00c950',
												'#ababab',
											],
											borderWidth: 0,
										},
									],
								},
								options: {
									cutoutPercentage: 75,
									plugins: {
										doughnutlabel: {
											labels: [
												{
													text: `${
														Math.round(
															university
																.admissions
																.acceptanceRate
																.overall * 1000
														) / 10
													}%`,
													color: '#000',
													font: {
														size: 30,
														weight: 'semibold',
														family: 'Inter Mono',
														color: '#00c950',
													},
												},
											],
										},
										datalabels: { display: false },
									},
									format: 'svg',
								},
							})
						)}`}
						alt={`Acceptance Rate: ${
							Math.round(
								university.admissions.acceptanceRate.overall *
									1000
							) / 10
						}%`}
						width={150}
						height={150}
					/>
				</div>
			</div>
		),
		{
			width: 1200,
			height: 630,
			fonts: [
				{
					name: 'Noto Sans',
					data: await loadGoogleFont('Noto Sans', '700', name),
					style: 'normal',
				},
				{
					name: 'Geist',
					data: await loadGoogleFont('Geist', '600', text + control),
					style: 'normal',
				},
			],
		}
	);
}
