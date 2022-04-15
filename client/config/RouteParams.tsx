import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { EventData } from '../interfaces/EventsData';
import { UserData } from '../interfaces/UserData';

export type RootStackParamList = {
	Login: undefined;
	AccountType: undefined;
	SignUp: { isSociety: boolean };
	SignUpInfo: { email: string; isSociety: boolean };
	Verification: { data: any; type: 'SignUp' | 'ForgotPassword' };
	ForgotPassword: undefined;
	SetPassword: { email: string };
	PasswordResetSuccess: undefined;
	Home: undefined;
	CreateEvent: { data: EventData };
	CreateEventTags: { data: EventData };
	CreateEventTime: { data: EventData };
	CreateEventPreview: { data: EventData };
	ChipsSearch: undefined;
	Menu: undefined;
	Splash: undefined;
	Profile: { data: UserData };
};
