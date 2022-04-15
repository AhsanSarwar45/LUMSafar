import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CreateEventData } from '../interfaces/Events';

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
	CreateEvent: { data: CreateEventData };
	CreateEventTags: { data: CreateEventData };
	CreateEventTime: { data: CreateEventData };
	CreateEventPreview: { data: CreateEventData };
	ChipsSearch: undefined;
	Menu: undefined;
	Splash: undefined;
};
