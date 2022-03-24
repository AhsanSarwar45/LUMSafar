import React from 'react';
import {
	Box,
	Flex,
	VStack,
	FormControl,
	HStack,
	Button,
	Text,
	Center,
	useTheme,
	View,
	Input,
	Heading
} from 'native-base';
import { Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInput } from '../components/TextInput';
import LUMSafarLogo from '../assets/logos/LUMSafar.svg';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { Form, Formik } from 'formik';

interface SignUpData {
	email?: string;
	password?: string;
	confirmPassword?: string;
}

const Validate = (values: SignUpData) => {
	const errors: SignUpData = {};

	if (!values.email) {
		errors.email = 'Required';
	}
	if (!values.password) {
		errors.password = 'Required';
	}
	if (!values.confirmPassword) {
		errors.confirmPassword = 'Required';
	} else if (values.confirmPassword != values.password) {
		errors.confirmPassword = 'Passwords do not match';
	}

	return errors;
};

export const SignUp = () => {
	const OnSubmit = (data: SignUpData) => {
		console.log('submitting with ', data);
	};
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
							password: '',
							confirmPassword: ''
						}}
						onSubmit={OnSubmit}
						validate={Validate}
					>
						{(props) => (
							<VStack pt="40px" space="15px" width="80%" height="full" justifyContent="center">
								<HStack alignItems="center" space={5}>
									<FontAwesome5 name="arrow-left" size={24} color="black" />
									<Heading size="xl" py="20px" color="black" mt={1}>
										Sign Up
									</Heading>
								</HStack>
								<TextInput
									label="University Email"
									name="email"
									isRequired
									placeholder="example@site.com"
									formikProps={props}
								/>
								<TextInput
									label="Password"
									name="password"
									isRequired
									isPassword={true}
									formikProps={props}
								/>

								<TextInput
									label="Confirm Password"
									name="confirmPassword"
									isRequired
									isPassword={true}
									formikProps={props}
								/>

								<HStack marginTop="20px" justifyContent="center">
									<Button
										size="lg"
										borderRadius={100}
										width="50%"
										variant="ghost"
										colorScheme="primary"
										_text={{
											fontWeight: 700
										}}
									>
										Login
									</Button>
									<Button
										onPress={() => props.handleSubmit()}
										size="lg"
										borderRadius={100}
										width="50%"
										variant="solid"
										colorScheme="primary"
										shadow={2}
										_text={{
											fontWeight: 700
										}}
									>
										SignUp
									</Button>
								</HStack>
								<Text width="100%" textAlign="center" fontSize={10} color="rgba(0, 0, 0, 0.5)">
									By signing up, you agree to our terms and conditions
								</Text>

								<HStack space="5px" justifyContent="center" py={5}>
									<Text fontSize="md" color="black" fontWeight={700}>
										Sign up as a society instead
									</Text>

									<MaterialIcons name="arrow-forward" size={24} color="black" />
								</HStack>
							</VStack>
						)}
					</Formik>
				</Center>
			</KeyboardAwareScrollView>
		</Box>
	);
};
