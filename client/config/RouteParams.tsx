import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { EventData } from '../interfaces/EventData';
import { UserData } from '../interfaces/UserData';

export type RootStackParamList = {
	Login: undefined;
	AccountType: undefined;
	SignUp: { accountType: 'student' | 'society' };
	SignUpInfo: { email: string; accountType: 'student' | 'society' };
	Verification: { data: any; type: 'SignUp' | 'ForgotPassword' };
	ForgotPassword: undefined;
	SetPassword: { email: string };
	PasswordResetSuccess: undefined;
	Home: undefined;
	CreateEvent: { data: EventData };
	CreateEventTags: { data: EventData };
	CreateEventTime: { data: EventData };
	CreateEventPreview: { data: EventData };
	EventDetails: { data: EventData };
	EventsSearch: undefined;
	UsersSearch: { type: 'users' | 'friends' | 'following' };
	ChipsSearch: undefined;
	Menu: undefined;
	Splash: undefined;
	Profile: { data: UserData };
	EditProfile: { data: UserData };
	EditProfileTags: { data: UserData };
	FriendRequests: undefined;
};
