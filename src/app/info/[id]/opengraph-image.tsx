import { headers } from 'next/headers';
import { ImageResponse } from 'next/og';


export const runtime = 'edge';

export default async function OGImage({ params }: { params: { id: string } }) {
  const id = params.id;
  const host = (await headers()).get('host')
  const protocol = host?.includes('localhost') ? 'http' : 'https';

  const response = await fetch(`${protocol}://${host}/api/getinfo?id=${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch university data');
  }

  const university = (await response.json() as { data: UniversityInfoProps, success: boolean }).data;
  const general = university.general
  const enrollment = university.enrollment


  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          background: '#f6f6f6',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div tw='flex flex-row items-start w-full p-12'>
          <img
            src={
              `https://img.logo.dev/${general.URLs.general
                .replace('https://', '')
                .replace('http://', '')
              }?token=pk_SlnGUaGiQEClf4KEK7bUwA&retina=true` ||
              `${general.URLs.general}${general.URLs.general.endsWith('/') ? '' : '/'
              }favicon.ico`
            }
            alt={`${general.name} campus`}
            width={300}
            height={300}
            tw='rounded-lg object-cover mr-6'
          />
          <div tw='flex flex-col items-start justify-start'>
            <h1 tw='text-5xl leading-none mb-2'>
              {general.name}
            </h1>
            <div tw="text-lg text-stone-700 font-semibold flex flex-row items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginRight: "0.5rem" }}
              >
                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span tw="mr-6">
                {general.location !== null
                  ? `${general.location.city}, ${general.location.state}`
                  : 'N/A'}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginRight: "0.5rem" }}
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              <span>Students: {(+enrollment.total).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );


}
