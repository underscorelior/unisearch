import { ImageResponse } from 'next/og';

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	console.log(searchParams);
	const id = searchParams.get('id');
	if (!id) {
		return new ImageResponse(<>Brok {':('}</>, {
			width: 1200,
			height: 630,
		});
	}

	return new ImageResponse(
		(
			<div
				style={{
					display: 'flex',
					fontSize: 60,
					color: 'black',
					background: '#f6f6f6',
					width: '100%',
					height: '100%',
					paddingTop: 50,
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				{/* <img
					width='256'
					height='256'
					// src={`https://github.com/${id}.png`}
					style={{
						borderRadius: 128,
					}}
				/> */}
				<p>test {id}</p>
			</div>
		),
		{
			width: 1200,
			height: 630,
		}
	);
}
