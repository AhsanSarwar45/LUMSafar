export interface UserData {
	username: string;
	email: string;
	_id: string;
	accountType: 'student' | 'society';
	interests: Array<string>;
	profile_pic_path: string;
	friendRequests: number;
	friends: number;
	following: Array<number>;
}
