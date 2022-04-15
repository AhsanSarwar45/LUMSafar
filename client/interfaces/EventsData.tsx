import { Moment } from 'moment';

export interface EventData {
	title: string;
	creator: string;
	description: string;
	location: string;
	tags: Array<string>;
	startTime: number;
	endTime: number;
	interestedUsers: Array<number>;
	image: string;
}
