import React, { useEffect, useRef, useState } from 'react';
import { HStack, Button, Text, Pressable, VStack, View } from 'native-base';
import { Formik } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import { OptimizedHeavyScreen } from 'react-navigation-heavy-screen';
import * as Crypto from 'expo-crypto';
import * as Yup from 'yup';

import { LUMSAFAR_SERVER_URL } from '@env';
import Screen from '../components/Screen';
import TextInput from '../components/TextInput';
import ErrorMessage from '../components/ErrorMessage';
import { JsonHeader } from '../config/ControlHeader';

export const LoginScreen = ({ navigation }: any) => {
	const [ userNotFound, setUserNotFound ] = useState(false);

	interface LoginData {
		email: string;
		password: string;
	}

	async function StoreUserToken(data: LoginData, formikProps: any) {
		try {
			await AsyncStorage.setItem('userData', JSON.stringify(data));
			formikProps.setSubmitting(false);
			navigation.reset({
				index: 0,
				routes: [ { name: 'Home' } ]
			});
		} catch (error) {
			console.log('Something went wrong', error);
		}
	}

	const LoginSchema = Yup.object().shape({
		email: Yup.string()
			.matches(/^\"?[\w-_\.]*\"?@lums\.edu\.pk$/, 'Please enter your LUMS email')
			.required('Required'),
		password: Yup.string().required('Required')
	});

	function Login(data: LoginData, formikProps: any) {
		// const digest = Crypto.digestString(
		// 	Crypto.CryptoDigestAlgorithm.SHA256,
		// 	data.password as string,
		// 	{ encoding: Crypto.CryptoEncoding.HEX } as Crypto.CryptoDigestOptions
		// );
		Axios.post(
			`${LUMSAFAR_SERVER_URL}/users/login`,
			{ email: data.email, password: data.password },
			{
				headers: JsonHeader
			}
		)
			.then((response) => {
				if (response.data === 'success') {
					StoreUserToken(data, formikProps);

					// AsyncStorage.setItem('user-email', data.email as string);
					// Go to Home page
				} else if (response.data === 'not-found') {
					formikProps.setSubmitting(false);
					setUserNotFound(true);
				}
			})
			.catch((response) => {
				console.log(response);
			});

		// await delay(500);
	}

	return (
		<Screen keyboardAware heading="Login">
			<ErrorMessage show={userNotFound}>
				We couldn't find you. Please make sure your email and password are correct!
			</ErrorMessage>

			<Formik
				initialValues={{
					email: '',
					password: ''
				}}
				onSubmit={Login}
				validationSchema={LoginSchema}
				height="full"
			>
				{(formikProps) => (
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
					</VStack>
				)}
			</Formik>

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
	);
};
