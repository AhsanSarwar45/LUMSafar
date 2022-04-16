export interface UserData {
	username: string;
	email: string;
	_id: string;
	bio: string;
	accountType: 'student' | 'society';
	interests: Array<string>;
	profilePicPath: string;
	friendRequests: number;
	friends: number;
	following: Array<number>;
}
