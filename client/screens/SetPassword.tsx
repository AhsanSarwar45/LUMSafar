import React from 'react';
import { VStack, Button, Heading } from 'native-base';
import { Formik } from 'formik';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Axios from 'axios';
import * as Crypto from 'expo-crypto';
import * as Yup from 'yup';

import { LUMSAFAR_SERVER_URL } from '@env';
import { RootStackParamList } from '../config/RouteParams';
import TextInput from '../components/TextInput';
import Screen from '../components/Screen';
import { JsonHeader } from '../config/ControlHeader';
import ScreenHeader from '../components/ScreenHeader';

type SetPasswordScreenProps = NativeStackScreenProps<RootStackParamList, 'SetPassword'>;

export const SetPasswordScreen = ({ route, navigation }: SetPasswordScreenProps) => {
	const { email } = route.params;

	interface SetPasswordData {
		password?: string;
		confirmPassword?: string;
	}

	const SetPasswordSchema = Yup.object().shape({
		password: Yup.string()
			.min(6, 'Password must be at least 6 characters long')
			.max(20, 'Password must be shorter than 20 characters long')
			.required('Required'),
		confirmPassword: Yup.string()
			.oneOf([ Yup.ref('password'), null ], 'Passwords do not match')
			.required('Required')
	});

	// Does not enter user in database. That is done after verification. Only checks for duplicates etc.
	function SetPassword(data: SetPasswordData, formikProps: any) {
		// const digest = await Crypto.digestStringAsync(
		// 	Crypto.CryptoDigestAlgorithm.SHA256,
		// 	data.password as string,
		// 	{ encoding: Crypto.CryptoEncoding.HEX } as Crypto.CryptoDigestOptions
		//   );
		Axios.post(
			`${LUMSAFAR_SERVER_URL}/users/set-password`,
			{ email: email, passwordNew: data.password },
			{
				headers: JsonHeader
			}
		)
			.then((response) => {
				formikProps.setSubmitting(false);
				if (response.data === 'success') {
					navigation.navigate('PasswordResetSuccess');
				} else if (response.data === 'failure') {
					// setIsDup(true);
				}
			})
			.catch((response) => {
				formikProps.setSubmitting(false);
				console.log(response);
			});
	}

	return (
		<Screen scrollType="keyboardAware" header={<ScreenHeader backButton />}>
			<Heading size="lg" width="100%">
				Enter your new password
			</Heading>

			<Formik
				initialValues={{
					password: '',
					confirmPassword: ''
				}}
				onSubmit={SetPassword}
				validationSchema={SetPasswordSchema}
			>
				{(formikProps) => (
					<VStack space="15px" py="20px" width="full">
						<TextInput label="New Password" name="password" isPassword={true} formikProps={formikProps} />
						<TextInput
							label="Confirm Password"
							name="confirmPassword"
							isPassword={true}
							formikProps={formikProps}
						/>
						<Button
							disabled={formikProps.isSubmitting}
							onPress={() => {
								formikProps.handleSubmit();
							}}
							marginTop="20px"
							width="100%"
							isLoading={formikProps.isSubmitting}
							isLoadingText="Checking"
						>
							Next
						</Button>
					</VStack>
				)}
			</Formik>
		</Screen>
	);
};
