import React from 'react';
import { Box, VStack, HStack, Button, Text, Center, Heading, Pressable, Icon } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TextInput from '../components/TextInput';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { Form, Formik } from 'formik';
import { LUMSAFAR_SERVER_URL } from '@env';
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

export const Login = ({ navigation }: any) => {
	const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

	async function SubmitForm(data: LoginData, actions: any) {
		let response = await Axios.post(`${LUMSAFAR_SERVER_URL}/users/login`, data, {
			headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
		});
		// console.log(response.data);
		if (response.data === 'success') {
			// navigate('/sign_up_success');
			//log user in
			// sessionStorage.setItem('user', response.data.email);
			// navgate('/user')
			// console.log('success');
		} else if (response.data === 'not-found') {
			console.log('not found');
		}

		await actions.setSubmitting(false);
		// Axios.post(`${LUMSAFAR_SERVER_URL}/login`, data, {
		// 	headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
		// }).then((response) => {
		// 	console.log(response.data);
		// 	if (response.data === 'success') {
		// 		// navigate('/sign_up_success');
		// 	} else if (response.data === 'not-found') {

		// 	}
		// });
		// await delay(500);
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
						onSubmit={SubmitForm}
						validate={Validate}
					>
						{(formikProps) => (
							<VStack pt="40px" space="15px" width="80%" height="full" justifyContent="center">
								<HStack alignItems="center" space={5}>
									<Heading size="xl" py="20px" color="black" mt={1}>
										Login
									</Heading>
								</HStack>
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

								<HStack marginTop="20px" justifyContent="center">
									<Button
										disabled={formikProps.isSubmitting}
										onPress={() => {
											formikProps.handleSubmit();
										}}
										size="lg"
										borderRadius={100}
										width="100%"
										variant="solid"
										colorScheme="primary"
										shadow={2}
										isLoading={formikProps.isSubmitting}
										isLoadingText="Checking"
										_text={{
											fontWeight: 700
										}}
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

										{/* <Icon
											as={FontAwesome5}
											onPress={() => navigation.goBack()}
											name="arrow-right"
											size={5}
											color="primary.500"
											// marginTop={5}
										/> */}
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
