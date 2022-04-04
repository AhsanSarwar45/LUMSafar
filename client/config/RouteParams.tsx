import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { SignUpData } from '../screens/SignUp';

export type RootStackParamList = {
	Login: undefined;
	AccountType: undefined;
	SignUp: { isSociety: boolean };
	Verification: { data: SignUpData };
};
