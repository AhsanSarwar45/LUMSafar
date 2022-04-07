import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
	Login: undefined;
	AccountType: undefined;
	SignUp: { isSociety: boolean };
	Verification: { email: string; verifyCallback: Function };
	ForgotPassword: undefined;
	SetPassword: { email: string };
	PasswordResetSuccess: undefined;
};
