import { NativeStackScreenProps } from '@react-navigation/native-stack';

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
	CreateEvent: undefined;
	ChipsSearch: undefined;
	Menu: undefined;
};
