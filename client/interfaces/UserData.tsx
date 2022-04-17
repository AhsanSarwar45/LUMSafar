export interface UserData {
	username: string;
	email: string;
	_id: string;
	bio: string;
	accountType: 'student' | 'society';
	interests: Array<string>;
	profilePicPath: string;
	profilePicBase64: string;
	friendRequests: Array<string>;
	friends: Array<string>;
	following: Array<string>;
	followers: Array<string>;
}
