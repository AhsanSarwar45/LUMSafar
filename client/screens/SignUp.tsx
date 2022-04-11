import React, { useEffect, useState } from 'react';
import { Box, VStack, HStack, Button, Text, Center, Heading, Pressable, View, Icon } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import { OptimizedHeavyScreen } from 'react-navigation-heavy-screen';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AppLoading from 'expo-app-loading';
import Axios from 'axios';
import { DeviceEventEmitter } from 'react-native';

import { LUMSAFAR_SERVER_URL } from '@env';
import { RootStackParamList } from '../config/RouteParams';
import TextInput from '../components/TextInput';
import Screen from '../components/Screen';
import { JsonHeader } from '../config/ControlHeader';
import ErrorMessage from '../components/ErrorMessage';

type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

export const SignUpScreen = ({ route, navigation }: SignUpScreenProps) => {
	const [ isDuplicate, setIsDuplicate ] = useState(false);

	const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

	const { isSociety } = route.params;

	interface SignUpData {
		email?: string;
		password?: string;
		confirmPassword?: string;
		isSociety?: boolean;
	}

	const Validate = (values: SignUpData) => {
		const errors: SignUpData = {};

		const email: string = values.email as string;

		if (!values.email) {
			errors.email = 'Required';
		}
		if (!/^\"?[\w-_\.]*\"?@lums\.edu\.pk$/.test(email)) {
			errors.email = 'Please enter your LUMS email';
		}
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
	async function CheckDuplicate(data: SignUpData, actions: any) {
		Axios.post(
			`${LUMSAFAR_SERVER_URL}/users/exists`,
			{ email: data.email },
			{
				headers: JsonHeader
			}
		)
			.then((response) => {
				if (response.data === 'not-found') {
					// DeviceEventEmitter.addListener('event.verify-email', (eventData) => SignUp(data));
					navigation.navigate('Verification', {
						data: data,
						type: 'SignUp'
					});
				} else if (response.data === 'success') {
					setIsDuplicate(true);
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
							email: '',
							password: '',
							confirmPassword: ''
						}}
						onSubmit={CheckDuplicate}
						validate={Validate}
					>
						{(formikProps) => (
							<Screen heading="Sign Up" backButton>
								<ErrorMessage show={isDuplicate}>
									The email you entered is already registered. Maybe you meant to login?
								</ErrorMessage>

								<VStack space="15px" width="full">
									<TextInput
										label={isSociety ? 'Society Email' : 'University Email'}
										name="email"
										placeholder="example@lums.edu.pk"
										formikProps={formikProps}
									/>
									<TextInput
										label="Password"
										name="password"
										isPassword={true}
										formikProps={formikProps}
									/>

									<TextInput
										label="Confirm Password"
										name="confirmPassword"
										isPassword={true}
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
									SignUp
								</Button>
								<Text width="100%" textAlign="center" fontSize={10} color="rgba(0, 0, 0, 0.5)">
									By signing up, you agree to our terms and conditions
								</Text>

								<Pressable onPress={() => navigation.navigate('Login')}>
									<HStack space="5px" justifyContent="center" alignItems="center" py={5}>
										<Text fontSize="md">Already one of us?</Text>

										<Text fontSize="md" color="primary.500">
											Login
										</Text>
									</HStack>
								</Pressable>
							</Screen>
						)}
					</Formik>
				</KeyboardAwareScrollView>
			</OptimizedHeavyScreen>
		</View>
	);
};
