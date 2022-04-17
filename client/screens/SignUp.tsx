import React, { useEffect, useState } from 'react';
import { Box, VStack, HStack, Button, Text, Center, Heading, Pressable, View, Icon, useToast } from 'native-base';
import { Formik } from 'formik';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Axios from 'axios';
import * as Crypto from 'expo-crypto';
import * as Yup from 'yup';

import { LUMSAFAR_SERVER_URL } from '@env';
import { RootStackParamList } from '../config/RouteParams';
import TextInput from '../components/TextInput';
import Screen from '../components/Screen';
import { JsonHeader } from '../config/ControlHeader';
import ErrorMessage from '../components/ErrorMessage';
import { ShowToast } from '../components/Toast';
import ScreenHeader from '../components/ScreenHeader';

type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

export const SignUpScreen = ({ route, navigation }: SignUpScreenProps) => {
	const [ isDuplicate, setIsDuplicate ] = useState(false);
	const toast = useToast();
	const { accountType } = route.params;

	interface SignUpData {
		username: string;
		email: string;
		password: string;
		confirmPassword: string;
		accountType?: 'society' | 'student';
	}

	const SignUpSchema = Yup.object().shape({
		username: Yup.string().required('Required'),
		email: Yup.string()
			.matches(/^\"?[\w-_\.]*\"?@lums\.edu\.pk$/, 'Please enter your LUMS email')
			.required('Required'),
		password: Yup.string()
			.min(6, 'Password must be at least 6 characters long')
			.max(20, 'Password must be shorter than 20 characters long')
			.required('Required'),
		confirmPassword: Yup.string()
			.oneOf([ Yup.ref('password'), null ], 'Passwords do not match')
			.required('Required')
	});

	// Does not enter user in database. That is done after verification. Only checks for duplicates etc.
	function CheckDuplicate(data: SignUpData, formikProps: any) {
		console.log(`${LUMSAFAR_SERVER_URL}/users/exists`)
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
					navigation.navigate('Verification', {
						data: {
							email: data.email,
							username: data.username,
							accountType: accountType,
							password: data.password
						},
						type: 'SignUp'
					});
				} else if (response.data === 'success') {
					setIsDuplicate(true);
				}
			})
			.catch((response) => {
				formikProps.setSubmitting(false);
				ShowToast(toast, "We couldn't connect to our servers 😔", 'failure');
			});
	}

	return (
		<Screen scrollType="keyboardAware" header={<ScreenHeader text="Sign Up" backButton />}>
			<ErrorMessage show={isDuplicate}>
				The email you entered is already registered. Maybe you meant to login?
			</ErrorMessage>
			<Formik
				initialValues={{
					username: '',
					email: '',
					password: '',
					confirmPassword: ''
				}}
				onSubmit={CheckDuplicate}
				validationSchema={SignUpSchema}
			>
				{(formikProps) => (
					<VStack space="15px" width="full">
						<TextInput
							label={accountType === 'society' ? 'Society Name' : 'Name'}
							name="username"
							formikProps={formikProps}
						/>
						<TextInput
							label={accountType === 'society' ? 'Society Email' : 'University Email'}
							name="email"
							placeholder="example@lums.edu.pk"
							formikProps={formikProps}
						/>
						<TextInput label="Password" name="password" isPassword={true} formikProps={formikProps} />

						<TextInput
							label="Confirm Password"
							name="confirmPassword"
							isPassword={true}
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
							Sign Up
						</Button>
						<Text width="100%" textAlign="center" fontSize={10} color="rgba(0, 0, 0, 0.5)">
							By signing up, you agree to our terms and conditions
						</Text>
					</VStack>
				)}
			</Formik>

			<Pressable onPress={() => navigation.navigate('Login')}>
				<HStack space="5px" justifyContent="center" alignItems="center" py={5}>
					<Text fontSize="md">Already one of us?</Text>

					<Text fontSize="md" color="primary.500">
						Login
					</Text>
				</HStack>
			</Pressable>
		</Screen>
	);
};
