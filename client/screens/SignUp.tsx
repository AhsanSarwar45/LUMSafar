import React, { useEffect } from 'react';
import { Box, VStack, HStack, Button, Text, Center, Heading, Pressable, View, Icon } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TextInput from '../components/TextInput';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { Formik } from 'formik';
import { OptimizedHeavyScreen } from 'react-navigation-heavy-screen';
import AppLoading from 'expo-app-loading';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Axios from 'axios';
import { LUMSAFAR_SERVER_URL } from '@env';
import { RootStackParamList } from '../config/RouteParams';

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
		data.verificationCode = '1111';
		Axios.post(`${LUMSAFAR_SERVER_URL}/users/validate`, data, {
			headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
		})
			.then((response) => {
				console.log(response.data);
				if (response.data === 'success') {
					navigation.navigate('Verification', {
						email: data.email as string,
						verificationCode: data.verificationCode as string,
						verifyCallback: () => SignUp(data)
					});
				} else if (response.data === 'duplicate-entry') {
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
				<Box bg="white" height="full" width="full">
					<KeyboardAwareScrollView
						style={{
							width: '100%'
						}}
					>
						<Center width="full">
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
									<VStack pt="40px" space="15px" width="80%" height="full" justifyContent="center">
										<HStack alignItems="center" space={5}>
											<Icon
												as={
													<FontAwesome5
														onPress={() => navigation.goBack()}
														name="arrow-left"
													/>
												}
												size={6}
												color="black"
											/>
											<Heading py="20px" mt={1}>
												Sign Up
											</Heading>
										</HStack>

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
											SignUp
										</Button>
										<Text width="100%" textAlign="center" fontSize={10} color="rgba(0, 0, 0, 0.5)">
											By signing up, you agree to our terms and conditions
										</Text>

										<Pressable onPress={() => navigation.navigate('Login')}>
											<HStack space="5px" justifyContent="center" alignItems="center" py={5}>
												<Text fontSize="md" color="black" fontWeight={700}>
													Already one of us?
												</Text>

												<Text fontSize="md" color="primary.500" fontWeight={700}>
													Login
												</Text>
											</HStack>
										</Pressable>
									</VStack>
								)}
							</Formik>
						</Center>
					</KeyboardAwareScrollView>
				</Box>
			</OptimizedHeavyScreen>
		</View>
	);
};
