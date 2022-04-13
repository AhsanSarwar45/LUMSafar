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
import { DeviceEventEmitter } from 'react-native';
import { JsonHeader } from '../config/ControlHeader';

type ForgotPasswordScreenProps = NativeStackScreenProps<RootStackParamList, 'ForgotPassword'>;

export const ForgotPasswordScreen = ({ route, navigation }: ForgotPasswordScreenProps) => {
	const [ userNotFound, setUserNotFound ] = useState(false);

	const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

	interface ForgotPasswordData {
		email?: string;
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

	// Does not enter user in database. That is done after verification. Only checks for duplicates etc.
	function CheckIfUserExists(data: ForgotPasswordData, formikProps: any) {
		Axios.post(
			`${LUMSAFAR_SERVER_URL}/users/exists`,
			{ email: data.email },
			{
				headers: JsonHeader
			}
		)
			.then((response) => {
				formikProps.setSubmitting(false);
				if (response.data === 'not-found') {
					setUserNotFound(false);

					navigation.navigate('Verification', {
						data: data,
						type: 'ForgotPassword'
					});
				} else if (response.data === 'not-found') {
					setUserNotFound(true);
				}
			})
			.catch((response) => {
				console.log(response);
			});
	}

	return (
		<Screen keyboardAware backButton>
			<Heading size="lg" width="100%">
				Lets get you a new password 🚀
			</Heading>

			{userNotFound ? (
				<Text width="full" color="red.500">
					We couldn't find you. Please make sure your email is correct!
				</Text>
			) : null}
			<Formik
				initialValues={{
					email: ''
				}}
				onSubmit={CheckIfUserExists}
				validate={Validate}
			>
				{(formikProps) => (
					<VStack space="15px" py="20px" width="full">
						<TextInput
							label={'Email'}
							name="email"
							placeholder="example@lums.edu.pk"
							formikProps={formikProps}
						/>
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
					</VStack>
				)}
			</Formik>
		</Screen>
	);
};
