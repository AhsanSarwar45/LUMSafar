import React, { useState } from 'react';
import { Button, Heading, VStack } from 'native-base';
import TextInput from '../components/TextInput';
import { Formik } from 'formik';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Axios from 'axios';

import { LUMSAFAR_SERVER_URL } from '@env';
import { RootStackParamList } from '../config/RouteParams';
import Screen from '../components/Screen';
import { JsonHeader } from '../config/ControlHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';

type SignUpInfoScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUpInfo'>;

export interface UserInfoData {
	username?: string;
}

export const SignUpInfoScreen = ({ route, navigation }: SignUpInfoScreenProps) => {
	const { email, isSociety } = route.params;

	const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

	interface LoginData {
		email?: string;
		password?: string;
	}

	async function StoreUserToken(data: LoginData) {
		try {
			await AsyncStorage.setItem('userData', JSON.stringify(data));

			navigation.reset({
				index: 0,
				routes: [ { name: 'Home' } ]
			});
		} catch (error) {
			console.log('Something went wrong', error);
		}
	}

	// Does not enter user in database. That is done after verification. Only checks for duplicates etc.
	async function SetUsername(data: UserInfoData, actions: any) {
		Axios.post(
			`${LUMSAFAR_SERVER_URL}/users/set-username`,
			{ email: email, name: data.username },
			{
				headers: JsonHeader
			}
		)
			.then((response) => {
				if (response.data === 'success') {
					StoreUserToken({ email: email, password: '' });
				} else if (response.data === 'failure') {
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
		<Screen keyboardAware backButton>
			<Heading size="lg" width="100%">
				Just one more thing...
			</Heading>
			<Formik
				initialValues={{
					email: ''
				}}
				onSubmit={SetUsername}
				validate={Validate}
			>
				{(formikProps) => (
					<VStack space="15px" py="20px" width="full">
						<TextInput
							label={isSociety ? 'Society Name' : 'Name'}
							name="username"
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
							Get Started
						</Button>
					</VStack>
				)}
			</Formik>
		</Screen>
	);
};
