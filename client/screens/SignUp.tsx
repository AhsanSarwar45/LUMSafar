import React, { useEffect } from 'react';
import { Box, VStack, HStack, Button, Text, Center, Heading, Pressable, View, Icon } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import { OptimizedHeavyScreen } from 'react-navigation-heavy-screen';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AppLoading from 'expo-app-loading';
import Axios from 'axios';

import { LUMSAFAR_SERVER_URL } from '@env';
import { RootStackParamList } from '../config/RouteParams';
import TextInput from '../components/TextInput';
import Screen from '../components/Screen';
import { JsonHeader } from '../config/ControlHeader';

type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

export const SignUpScreen = ({ route, navigation }: SignUpScreenProps) => {
	const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

	const { isSociety } = route.params;

	interface SignUpData {
		email?: string;
		password?: string;
		confirmPassword?: string;
		isSociety?: boolean;
		verificationCode?: string;
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

	async function SignUp(data: SignUpData) {
		const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
		Axios.post(`${LUMSAFAR_SERVER_URL}/users/add`, data, {
			headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
		})
			.then((response) => {
				console.log(response.data);
				if (response.data === 'success') {
					// login user
				}
			})
			.catch((response) => {
				console.log(response);
			});
		await delay(500);
		// actions.setSubmitting(false);
	}

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
					navigation.navigate('Verification', {
						email: data.email as string,
						verifyCallback: () => SignUp(data)
					});
				} else if (response.data === 'success') {
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
							email: '',
							password: '',
							confirmPassword: ''
						}}
						onSubmit={CheckDuplicate}
						validate={Validate}
					>
						{(formikProps) => (
							<Screen heading="Sign Up" backButton navigation={navigation}>
								<VStack space="15px" py="20px" width="full">
									<TextInput
										label={isSociety ? 'Society Email' : 'University Email'}
										name="email"
										isRequired
										placeholder="example@lums.edu.pk"
										formikProps={formikProps}
									/>
									<TextInput
										label="Password"
										name="password"
										isRequired
										isPassword={true}
										formikProps={formikProps}
									/>

									<TextInput
										label="Confirm Password"
										name="confirmPassword"
										isRequired
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
