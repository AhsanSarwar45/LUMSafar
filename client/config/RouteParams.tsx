import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
	Login: undefined;
	AccountType: undefined;
	SignUp: { isSociety: boolean };
	SignUpInfo: { email: string; isSociety: boolean };
	Verification: { email: string };
	ForgotPassword: undefined;
	SetPassword: { email: string };
	PasswordResetSuccess: undefined;
};
