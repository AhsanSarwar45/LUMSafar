import React, { useEffect, useState } from 'react';
import { Box, HStack, Button, Text, Center, Pressable, VStack } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';

import { LUMSAFAR_SERVER_URL } from '@env';
import Screen from '../components/Screen';
import TextInput from '../components/TextInput';
import ErrorMessage from '../components/ErrorMessage';

interface LoginData {
	email?: string;
	password?: string;
}

const Validate = (values: LoginData) => {
	const errors: LoginData = {};

	if (!values.email) {
		errors.email = 'Required';
	}
	if (!/^\"?[\w-_\.]*\"?@lums\.edu\.pk$/.test(values.email as string)) {
		errors.email = 'Please enter your LUMS email';
	}
	if (!values.password) {
		errors.password = 'Required';
	}
	return errors;
};

export const LoginScreen = ({ navigation }: any) => {
	const [ userNotFound, setUserNotFound ] = useState(false);

	const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

	useEffect(() => {
		// AsyncStorage.getItem('user-email').then((value) => {
		// 	// Go to Home page
		// });
	}, []);

	async function Login(data: LoginData, actions: any) {
		let response = await Axios.post(`${LUMSAFAR_SERVER_URL}/users/login`, data, {
			headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
		});
		if (response.data === 'success') {
			setUserNotFound(false);
			// AsyncStorage.setItem('user-email', data.email as string);
			// Go to Home page
		} else if (response.data === 'not-found') {
			setUserNotFound(true);
		}
		await delay(500);
		actions.setSubmitting(false);
	}

	return (
		<KeyboardAwareScrollView>
			<Formik
				initialValues={{
					email: '',
					password: ''
				}}
				onSubmit={Login}
				validate={Validate}
				height="full"
			>
				{(formikProps) => (
					<Screen heading="Login" navigation={navigation}>
						<ErrorMessage show={userNotFound}>
							We couldn't find you. Please make sure your email and password are correct!
						</ErrorMessage>

						<VStack space="15px" width="full">
							<TextInput
								label="University Email"
								name="email"
								placeholder="example@site.com"
								formikProps={formikProps}
							/>
							<TextInput label="Password" name="password" isPassword={true} formikProps={formikProps} />
							<Pressable onPress={() => navigation.navigate('ForgotPassword')} width="full">
								<Text width="full" textAlign="right" color="rgba(0, 0, 0, 0.4)">
									Forgot Password?
								</Text>
							</Pressable>
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
							Login
						</Button>
						<Pressable onPress={() => navigation.navigate('AccountType')}>
							<HStack space="5px" justifyContent="center" alignItems="center" py={5}>
								<Text fontSize="md" color="black" fontWeight={700}>
									New here?
								</Text>
								<Text fontSize="md" color="primary.500" fontWeight={700}>
									Sign Up
								</Text>
							</HStack>
						</Pressable>
					</Screen>
				)}
			</Formik>
		</KeyboardAwareScrollView>
	);
};
