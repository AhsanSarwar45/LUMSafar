import React from 'react';
import { VStack, Button, Heading } from 'native-base';
import { Formik } from 'formik';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Axios from 'axios';
import * as Crypto from 'expo-crypto';

import { LUMSAFAR_SERVER_URL } from '@env';
import { LUMSAFAR_PASSWORD_ENCRYPTION_KEY } from '@env';
import { RootStackParamList } from '../config/RouteParams';
import TextInput from '../components/TextInput';
import Screen from '../components/Screen';
import { JsonHeader } from '../config/ControlHeader';

type SetPasswordScreenProps = NativeStackScreenProps<RootStackParamList, 'SetPassword'>;

export const SetPasswordScreen = ({ route, navigation }: SetPasswordScreenProps) => {
	const { email } = route.params;

	interface SetPasswordData {
		password?: string;
		confirmPassword?: string;
	}

	const Validate = (values: SetPasswordData) => {
		const errors: SetPasswordData = {};

		if (!values.password) {
			errors.password = 'Required';
		}
		if (!values.confirmPassword) {
			errors.confirmPassword = 'Required';
		} else if (values.confirmPassword != values.password) {
			errors.confirmPassword = 'Passwords do not match';
		}

		return errors;
	};

	// Does not enter user in database. That is done after verification. Only checks for duplicates etc.
	async function SetPassword(data: SetPasswordData, formikProps: any) {
		const digest = await Crypto.digestStringAsync(
			Crypto.CryptoDigestAlgorithm.SHA256,
			data.password as string,
			{ encoding: Crypto.CryptoEncoding.HEX } as Crypto.CryptoDigestOptions
		  );
		Axios.post(
			`${LUMSAFAR_SERVER_URL}/users/set-password`,
			{ email: email, passwordNew: digest },
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
		<Screen keyboardAware backButton>
			<Heading size="lg" width="100%">
				Enter your new password
			</Heading>

			<Formik
				initialValues={{
					password: '',
					confirmPassword: ''
				}}
				onSubmit={SetPassword}
				validate={Validate}
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
