interface UniversityInfoProps {
	id: number;
	general: {
		name: string;
		location: {
			city: string;
			state: string;
			coords: { longitude: number; latitude: number };
		};
		description?: string; // TODO: CANNOT BE FOUND IN IPEDS
		controlOfInst: string; // public/private
		foundedYear?: number; // TODO: cannot be found in IPEDS
		imageUrl?: string; // TODO: Not found in IPEDS
		URLs: {
			general: string;
			admissions: string;
			financialAid: string;
			application: string;
			netPriceCalc: string;
		};
		missionStatement: string;
	};
	academics: {
		highestDegreeOffered: string;
		calendarSystem: string[];
		studentFacultyRatio: string;
		graduationRate: {
			'4yr': number;
			'5yr': number;
			'6yr': number;
		};
		retentionRate: number;
	};
	enrollment: {
		students: {
			graduate: number;
			undergraduate: number;
		};
		demographics: {
			gender: { [key: string]: { percent: number; total: number } };
			race: { [key: string]: { percent: number; total: number } };
		};
	};
	admissions: {
		applicationFee: number;
		averageGPA?: number; // TODO: NOT INCLUDED IN IPEDS
		testScores: {
			sat: {
				pctSubmit: number;
				math: {
					'25th': number;
					'50th': number;
					'75th': number;
				};
				reading: {
					'25th': number;
					'50th': number;
					'75th': number;
				};
			};
			act: {
				pctSubmit: number;
				'25th': number;
				'50th': number;
				'75th': number;
			};
		};
		acceptanceRate: {
			overall: number;
			male: number;
			female: number;
		};
		yieldRate: number;
		applicants: {
			total: number;
			male: number;
			female: number;
			another: number;
			unknown: number;
		};
		admitted: {
			total: number;
			male: number;
			female: number;
			another: number;
			unknown: number;
		};
		enrolled: {
			total: number;
			male: number;
			female: number;
			another: number;
			unknown: number;
		};
		considerations: {
			gpa: number;
			rank: number;
			record: number;
			collegePrep: number;
			recommendations: number;
			demonstration: number;
			tests: number;
			workExp: number;
			essay: number;
			legacy: number;
		};
	};
	financial: {
		costs: {
			inState: {
				tuition: number;
				fees: number;
				percentage: number;
				total: number;
				net: number;
			};
			outOfState: {
				tuition: number;
				fees: number;
				percentage: number;
				total: number;
				net: number;
			};
		};
		aid: {
			general: {
				percentage: number;
				average: number;
			};
			federal: {
				percentage: number;
				average: number;
			};
			state: {
				percentage: number;
				average: number;
			};
			institutional: {
				percentage: number;
				average: number;
			};
		};
	};
	otherStats?: {
		[key: string]: string | number;
	};
}
