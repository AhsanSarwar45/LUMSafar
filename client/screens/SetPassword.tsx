import React from 'react';
import { VStack, Button, Text, Center, Heading, Pressable, View, Icon } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import { OptimizedHeavyScreen } from 'react-navigation-heavy-screen';
import AppLoading from 'expo-app-loading';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Axios from 'axios';

import { LUMSAFAR_SERVER_URL } from '@env';
import { RootStackParamList } from '../config/RouteParams';
import TextInput from '../components/TextInput';
import Screen from '../components/Screen';

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
				} else if (response.data === 'failure') {
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
						onSubmit={SetPassword}
						validate={Validate}
					>
						{(formikProps) => (
							<Screen backButton navigation={navigation}>
								<Heading size="lg" width="100%">
									Enter your new password
								</Heading>

								<VStack space="15px" py="20px" width="full">
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
								</VStack>
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
							</Screen>
						)}
					</Formik>
				</KeyboardAwareScrollView>
			</OptimizedHeavyScreen>
		</View>
	);
};
