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

type SetPasswordScreenProps = NativeStackScreenProps<RootStackParamList, 'SetPassword'>;

export interface SetPasswordData {
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

export const SetPasswordScreen = ({ route, navigation }: SetPasswordScreenProps) => {
	const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

	// Does not enter user in database. That is done after verification. Only checks for duplicates etc.
	async function SetPassword(data: SetPasswordData, actions: any) {
		Axios.post(`${LUMSAFAR_SERVER_URL}/users/set-password`, data, {
			headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
		})
			.then((response) => {
				console.log(response.data);
				if (response.data === 'success') {
					navigation.navigate('PasswordResetSuccess');
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
								onSubmit={SetPassword}
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
											label="New Password"
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
