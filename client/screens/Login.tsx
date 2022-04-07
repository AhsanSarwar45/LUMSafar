import React, { useEffect, useState } from 'react';
import { Box, VStack, HStack, Button, Text, Center, Heading, Pressable, Icon } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TextInput from '../components/TextInput';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { Form, Formik } from 'formik';
import { LUMSAFAR_SERVER_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';

interface LoginData {
	email?: string;
	password?: string;
}

const Validate = (values: LoginData) => {
	const errors: LoginData = {};

	if (!values.email) {
		errors.email = 'Required';
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
		AsyncStorage.getItem('user-email').then((value) => {
			// Go to Home page
		});
	}, []);

	async function Login(data: LoginData, actions: any) {
		let response = await Axios.post(`${LUMSAFAR_SERVER_URL}/users/login`, data, {
			headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
		});
		if (response.data === 'success') {
			setUserNotFound(false);
			AsyncStorage.setItem('user-email', data.email as string);
			// Go to Home page
		} else if (response.data === 'not-found') {
			setUserNotFound(true);
		}
		await delay(500);
		actions.setSubmitting(false);
	}

	// let x;
	// x.toString();
	return (
		<Box bg="white" height="full" width="full">
			<KeyboardAwareScrollView
				style={{
					width: '100%'
				}}
			>
				<Center width="full">
					{/* <LUMSafarLogo width="70%" height={200} /> */}
					<Formik
						initialValues={{
							email: '',
							password: ''
						}}
						onSubmit={Login}
						validate={Validate}
					>
						{(formikProps) => (
							<VStack pt="40px" space="15px" width="80%" height="full" justifyContent="center">
								<HStack alignItems="center" space={5}>
									<Heading py="20px" mt={1}>
										Login
									</Heading>
								</HStack>
								{userNotFound ? (
									<Text width="full" color="red.500">
										We couldn't find you. Please make sure your email and password are correct!
									</Text>
								) : null}
								<TextInput
									label="University Email"
									name="email"
									isRequired
									placeholder="example@site.com"
									formikProps={formikProps}
								/>
								<TextInput
									label="Password"
									name="password"
									isRequired
									isPassword={true}
									formikProps={formikProps}
								/>
								<Pressable onPress={() => navigation.navigate('ForgotPassword')}>
									<Text width="full" textAlign="right" color="rgba(0, 0, 0, 0.4)">
										Forgot Password?
									</Text>
								</Pressable>

								<HStack marginTop="20px" justifyContent="center">
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
								</HStack>
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
							</VStack>
						)}
					</Formik>
				</Center>
			</KeyboardAwareScrollView>
		</Box>
	);
};
function setGetValue(value: string | null): any {
	throw new Error('Function not implemented.');
}
