import React, { useState } from 'react';
import { Button, Center, Heading, View, VStack, Text } from 'native-base';
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
import { JsonHeader } from '../config/ControlHeader';

type SignUpInfoScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUpInfo'>;

export interface UserInfoData {
	username?: string;
}

export const SignUpInfoScreen = ({ route, navigation }: SignUpInfoScreenProps) => {
	const { email, isSociety } = route.params;

	const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

	// Does not enter user in database. That is done after verification. Only checks for duplicates etc.
	async function CheckIfUserExists(data: UserInfoData, actions: any) {
		Axios.post(
			`${LUMSAFAR_SERVER_URL}/users/set-username`,
			{ email: email, name: data.username },
			{
				headers: JsonHeader
			}
		)
			.then((response) => {
				if (response.data === 'success') {
					console.log('Info entered');
				} else if (response.data === 'not-found') {
				}
			})
			.catch((response) => {
				console.log(response);
			});
		await delay(500);
		actions.setSubmitting(false);
	}

	const Validate = (values: UserInfoData) => {
		const errors: UserInfoData = {};

		if (!values.username) {
			errors.username = 'Required';
		}
		return errors;
	};

	return (
		<View>
			<AppLoading />
			<OptimizedHeavyScreen>
				<KeyboardAwareScrollView>
					<Formik
						initialValues={{
							email: ''
						}}
						onSubmit={CheckIfUserExists}
						validate={Validate}
					>
						{(formikProps) => (
							<Screen backButton navigation={navigation}>
								<Heading size="lg" width="100%">
									Just one more thing...
								</Heading>

								<VStack space="15px" py="20px" width="full">
									<TextInput
										label={isSociety ? 'Society Name' : 'Name'}
										name="username"
										isRequired
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
									Get Started
								</Button>
							</Screen>
						)}
					</Formik>
				</KeyboardAwareScrollView>
			</OptimizedHeavyScreen>
		</View>
	);
};
