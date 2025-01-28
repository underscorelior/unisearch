import UniversityInfo from '@/components/uni';

// Random data I made up
const ucla_ex: UniversityInfoProps = {
	id: 1001,
	general: {
		name: 'University of California, Los Angeles (UCLA)',
		location: {
			city: 'Los Angeles',
			state: 'California',
			coords: { longitude: -118.4452, latitude: 34.0689 },
			campusLocale: 11,
		},
		description:
			'A public research university in Los Angeles, known for its academic excellence and vibrant campus life.',
		controlOfInst: 1,
		foundedYear: 1919,
		// TODO:
		imageUrl:
			'https://commons.wikimedia.org/wiki/File:Royce_Hall,_University_of_California,_Los_Angeles_(23-09-2003).jpg',
		URLs: {
			general: 'https://www.ucla.edu',
			admissions: 'https://admission.ucla.edu',
			financialAid: 'https://financialaid.ucla.edu',
			application: 'https://admission.ucla.edu/apply',
			netPriceCalc: 'https://npc.ucla.edu',
		},
		// TODO:
		missionStatement:
			'UCLA is dedicated to creating, disseminating, preserving, and applying knowledge for the betterment of our global society.',
	},
	academics: {
		highestDegreeOffered: 11,
		calendarSystem: ['Quarter'], // TODO:
		studentFacultyRatio: '18:1',
		graduationRate: {
			'4yr': 0.75,
			'5yr': 0.89,
			'6yr': 0.92,
		},
		retentionRate: 0.97,
	},
	enrollment: {
		total: 46500,
		graduate: 14500,
		undergraduate: 32000,
		demographics: {
			gender: {
				male: { percent: 0.44, total: 14080 },
				female: { percent: 0.56, total: 17920 },
			},
			race: {
				Asian: { percent: 0.28, total: 8960 },
				White: { percent: 0.26, total: 8320 },
				Hispanic: { percent: 0.22, total: 7040 },
				AfricanAmerican: { percent: 0.06, total: 1920 },
				International: { percent: 0.14, total: 4480 },
				Other: { percent: 0.04, total: 1280 },
			},
		},
	},
	admissions: {
		applicationFee: 70,
		averageGPA: 4.18,
		testScores: {
			sat: {
				pctSubmit: 30,
				math: {
					'25th': 670,
					'50th': 740,
					'75th': 790,
				},
				reading: {
					'25th': 650,
					'50th': 710,
					'75th': 760,
				},
			},
			act: {
				pctSubmit: 20,
				'25th': 29,
				'50th': 32,
				'75th': 35,
			},
		},
		acceptanceRate: {
			overall: 0.108,
			male: 0.1,
			female: 0.115,
		},
		yieldRate: 0.45,
		applicants: {
			total: 140500,
			male: 62800,
			female: 76700,
			other: 1000,
		},
		admitted: {
			total: 15050,
			male: 6300,
			female: 8700,
			other: 50,
		},
		enrolled: {
			total: 6710,
			male: 2900,
			female: 3800,
			other: 10,
		},
		considerations: {
			gpa: 5,
			rank: 3,
			record: 5,
			collegePrep: 5,
			recommendations: 3,
			demonstration: 1,
			tests: 4,
			workExp: 2,
			essay: 5,
			legacy: 1,
		},
	},
	financial: {
		tuitionvaries: true,
		costs: {
			inState: {
				tuition: 13420,
				fees: 2400,
				percentage: 0.3,
				totalcost: 16120,
				net: 12500,
			},
			outOfState: {
				tuition: 43420,
				fees: 2400,
				percentage: 0.7,
				totalcost: 45820,
				net: 42000,
			},
			room: {
				offered: true,
				capacity: 15000,
				cost: 14400,
			},
			board: {
				offered: true,
				mealsWk: 21,
				cost: 6000,
			},
		},
		aid: {
			general: {
				percentage: 0.65,
				average: 14000,
			},
			federal: {
				percentage: 0.3,
				average: 5500,
			},
			state: {
				percentage: 0.4,
				average: 7500,
			},
			institutional: {
				percentage: 0.55,
				average: 10000,
			},
		},
	},
};

export default function UniversityPage() {
	return <UniversityInfo {...ucla_ex} />;
}

// export default async function Page({
// 	params,
// }: {
// 	params: Promise<{ slug: string }>;
// }) {
// 	const slug = (await params).slug;
// 	return <div>UniId: {slug}</div>;
// }
