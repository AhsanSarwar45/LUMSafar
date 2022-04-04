import React, { useEffect } from 'react';
import { Box, VStack, HStack, Button, Text, Center, Heading, Pressable, View } from 'native-base';
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

// const SubmitForm = (data: SignUpData, setSubmitting: Function) => {
// 	console.log('submitting with ', data);
// 	setSubmitting(false);
// };

type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

export interface SignUpData {
	email?: string;
	password?: string;
	confirmPassword?: string;
	isSociety?: boolean;
}

const Validate = (values: SignUpData) => {
	const errors: SignUpData = {};

	if (!values.email) {
		errors.email = 'Required';
	}
	// if (!values.email.includes("@lums.edu.pk")){
	// 	errors.email = 'Please enter your LUMS email';
	// }
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

export const SignUp = ({ route, navigation }: SignUpScreenProps) => {
	const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

	const { isSociety } = route.params;

	// Does not enter user in database. That is done after verification. Only checks for duplicates etc.
	async function SubmitForm(data: SignUpData, actions: any) {
		Axios.post(`${LUMSAFAR_SERVER_URL}users/add`, data, {
			headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
		})
			.then((response) => {
				console.log(response.data);
				if (response.data === 'success') {
					navigation.navigate('Verification', { data: data });
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
									confirmPassword: '',
									isSociety: isSociety
								}}
								onSubmit={SubmitForm}
								validate={Validate}
							>
								{(formikProps) => (
									<VStack pt="40px" space="15px" width="80%" height="full" justifyContent="center">
										<HStack alignItems="center" space={5}>
											<FontAwesome5
												onPress={() => navigation.goBack()}
												name="arrow-left"
												size={24}
												color="black"
											/>
											<Heading size="xl" py="20px" color="black" mt={1}>
												Sign Up
											</Heading>
										</HStack>
										{/* <Switch
											borderRadius={12}
											option1="Student"
											option2="Society"
											selectionColor="red"
											onSelectSwitch={(value: number) => console.log(value)}
										/> */}
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

										<HStack marginTop="20px" justifyContent="center">
											<Button
												disabled={formikProps.isSubmitting}
												onPress={() => {
													formikProps.handleSubmit();
												}}
												size="lg"
												borderRadius={100}
												width="100%"
												variant="solid"
												colorScheme="primary"
												shadow={2}
												isLoading={formikProps.isSubmitting}
												isLoadingText="Checking"
												_text={{
													fontWeight: 700
												}}
											>
												SignUp
											</Button>
										</HStack>
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
