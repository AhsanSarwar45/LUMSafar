import React from 'react';
import { Button, Center, Heading, View, VStack } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TextInput from '../components/TextInput';
import { Formik } from 'formik';
import { OptimizedHeavyScreen } from 'react-navigation-heavy-screen';
import AppLoading from 'expo-app-loading';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Axios from 'axios';

import { LUMSAFAR_SERVER_URL } from '@env';
import { RootStackParamList } from '../config/RouteParams';
import Screen from '../components/Screen';

type ForgotPasswordScreenProps = NativeStackScreenProps<RootStackParamList, 'ForgotPassword'>;

export interface ForgotPasswordData {
	email?: string;
	verificationCode?: string;
}

const Validate = (values: ForgotPasswordData) => {
	const errors: ForgotPasswordData = {};

	const email: string = values.email as string;

	if (!values.email) {
		errors.email = 'Required';
	}
	if (!/^\"?[\w-_\.]*\"?@lums\.edu\.pk$/.test(email)) {
		errors.email = 'Please enter your LUMS email';
	}
	return errors;
};

export const ForgotPasswordScreen = ({ route, navigation }: ForgotPasswordScreenProps) => {
	const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

	// Does not enter user in database. That is done after verification. Only checks for duplicates etc.
	async function SendEmail(data: ForgotPasswordData, actions: any) {
		data.verificationCode = '1111';
		Axios.post(`${LUMSAFAR_SERVER_URL}/users/forgot-password`, data, {
			headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
		})
			.then((response) => {
				console.log(response.data);
				if (response.data === 'success') {
					navigation.navigate('Verification', {
						email: data.email as string,
						verificationCode: data.verificationCode as string,
						verifyCallback: () => navigation.navigate('SetPassword', { email: data.email as string })
					});
				} else if (response.data === 'not-found') {
					// setIsDup(true);
				}
			})
			.catch((response) => {
				console.log(response);
			});
		await delay(500);
		actions.setSubmitting(false);
	}

	return (
		<View>
			<AppLoading />
			<OptimizedHeavyScreen>
				<KeyboardAwareScrollView>
					<Formik
						initialValues={{
							email: ''
						}}
						onSubmit={SendEmail}
						validate={Validate}
					>
						{(formikProps) => (
							<Screen backButton navigation={navigation}>
								<Heading size="lg" width="100%">
									Lets get you a new password
								</Heading>
								<VStack space="15px" py="20px" width="full">
									<TextInput
										label={'Email'}
										name="email"
										isRequired
										placeholder="example@lums.edu.pk"
										formikProps={formikProps}
									/>
								</VStack>

								<Button
									disabled={formikProps.isSubmitting}
									onPress={() => {
										formikProps.handleSubmit();
									}}
									width="100%"
									isLoading={formikProps.isSubmitting}
									isLoadingText="Checking"
								>
									Next
								</Button>
							</Screen>
						)}
					</Formik>
				</KeyboardAwareScrollView>
			</OptimizedHeavyScreen>
		</View>
	);
};
