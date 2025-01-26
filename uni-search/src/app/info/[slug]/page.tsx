import UniversityInfo from '@/components/uni';

// Random data I made up
const universityData = {
	basicInfo: {
		name: 'UCLA',
		location: { state: 'CA', city: 'Westwood (i think)' },
		description: 'UCLA is a university!',
		foundedYear: 1885, // TODO: NOT IN IPEDS
		imageUrl: `https://img.logo.dev/ucla.edu?token=${process.env.LOGO_KEY}`, // just add url later

		url: 'https://ucla.edu',
		admUrl: 'https://admission.ucla.edu/',
	},
	highestDegree: 'Doctoral',
	studentCount: 18654,
	admissionInfo: {
		rate: 0.68,
		averageGPA: 3.8,
		averageSAT: 1350,
		averageACT: 37,
		testScores: {
			sat: {
				math: {
					'25th': 650,
					'50th': 700,
					'75th': 770,
				},
				reading: {
					'25th': 200,
					'50th': 700,
					'75th': 770,
				},
			},
			act: {
				'25th': 25,
				'50th': 30,
				'75th': 35,
			},
		},
		applicationDeadline: 'November 15', // TODO: NOT IN IPEDS
		decisionDate: 'March?', // TODO: NOT IN IPEDS
	},

	tuition: {
		inState: 12500,
		outOfState: 28000,
	},
	demographics: {
		gender: {
			Male: 0.48,
			Female: 0.51,
			'Non-binary': 0.01, // TODO: CHANGE TO UNKNOWN OR OTHER VERSION
		},
		race: {
			Asian: 0.351,
			White: 0.25,
			Hispanic: 0.22,
			'African American': 0.065,
			Other: 0.114,
		},
	},
	enrollment: {
		studentFacultyRatio: '16:1',
		students: {
			graduate: 2000,
			undergraduate: 16300,
		},
		graduationRate: 0.78,
		retentionRate: 0.89,
	},
	financialAid: {
		percentReceivingAid: 65,
		averagePackage: 18000,
	},
	otherStats: {
		Endowment: '$750 million',
	},
} as UniversityInfoProps;

export default function UniversityPage() {
	return <UniversityInfo {...universityData} />;
}

// export default async function Page({
// 	params,
// }: {
// 	params: Promise<{ slug: string }>;
// }) {
// 	const slug = (await params).slug;
// 	return <div>UniId: {slug}</div>;
// }
