import React, { useState } from 'react';
import { Button, Center, Heading, View, VStack, Text } from 'native-base';
import TextInput from '../components/TextInput';
import { Formik } from 'formik';
import * as Yup from 'yup';
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

	interface ForgotPasswordData {
		email?: string;
	}

	const ForgotPasswordSchema = Yup.object().shape({
		email: Yup.string()
			.matches(/^\"?[\w-_\.]*\"?@lums\.edu\.pk$/, 'Please enter your LUMS email')
			.required('Required')
	});

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
				validationSchema={ForgotPasswordSchema}
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
