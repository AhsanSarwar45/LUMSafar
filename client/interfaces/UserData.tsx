export interface UserData {
	username: string;
	email: string;
	id: number;
	accountType: 'student' | 'society';
	interests: Array<string>;
	profile_pic_path: string;
	friendRequests: number;
	friends: number;
	following: Array<number>;
}
