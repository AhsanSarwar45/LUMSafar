import React from 'react';
import { Box, VStack, HStack, Button, Center, Heading, Pressable, View, Icon } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TextInput from '../components/TextInput';
import { FontAwesome5 } from '@expo/vector-icons';
import { Formik } from 'formik';
import { OptimizedHeavyScreen } from 'react-navigation-heavy-screen';
import AppLoading from 'expo-app-loading';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Axios from 'axios';
import { LUMSAFAR_SERVER_URL } from '@env';
import { RootStackParamList } from '../config/RouteParams';

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
				<Box bg="white" height="full" width="full">
					<KeyboardAwareScrollView
						style={{
							width: '100%'
						}}
					>
						<Center width="full">
							<Formik
								initialValues={{
									email: ''
								}}
								onSubmit={SendEmail}
								validate={Validate}
							>
								{(formikProps) => (
									<VStack pt="60px" space="20px" width="80%" height="full" justifyContent="center">
										<HStack alignItems="center" space={5} width="100%">
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
										</HStack>

										<Heading size="lg" width="100%">
											Lets get you a new password
										</Heading>

										<TextInput
											label={'Email'}
											name="email"
											isRequired
											placeholder="example@lums.edu.pk"
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
						</Center>
					</KeyboardAwareScrollView>
				</Box>
			</OptimizedHeavyScreen>
		</View>
	);
};
