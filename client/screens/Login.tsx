import React from 'react';
import { Box, VStack, HStack, Button, Text, Center, Heading, Pressable } from 'native-base';
import { Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInput } from '../components/TextInput';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { Form, Formik } from 'formik';

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

	async function SubmitForm(data: LoginData) {
		console.log('submitted', data);
		await delay(500);
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
								<Pressable onPress={() => navigation.navigate('SignUp')}>
									<HStack space="5px" justifyContent="center" alignItems="center" py={5}>
										<Text fontSize="md" color="black" fontWeight={700}>
											New here? Sign Up
										</Text>

										<FontAwesome5
											onPress={() => navigation.goBack()}
											name="arrow-right"
											size={16}
											color="black"
											// marginTop={5}
										/>
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
