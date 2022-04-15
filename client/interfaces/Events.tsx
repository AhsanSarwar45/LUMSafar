import { Moment } from 'moment';

export interface CreateEventData {
	title: string;
	description: string;
	location: string;
	tags: Array<string>;
	startTime: number;
	endTime: number;
	image: string;
}

export interface EventData {
	name: string;
	creator: string;
	interested: boolean;
	image: string;
}
