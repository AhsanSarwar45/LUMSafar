import React, { useEffect } from 'react';
import { Box, VStack, HStack, Button, Text, Center, Heading, Pressable, View } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TextInput from '../components/TextInput';
import Switch from '../components/Switch';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { Formik } from 'formik';
import { OptimizedHeavyScreen } from 'react-navigation-heavy-screen';
import AppLoading from 'expo-app-loading';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

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

// const SubmitForm = (data: SignUpData, setSubmitting: Function) => {
// 	console.log('submitting with ', data);
// 	setSubmitting(false);
// };

type RootStackParamList = {
	Login: undefined;
	SignUpStart: undefined;
	SignUp: { isSociety: boolean };
};

type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

export const AccountType = ({ navigation }: any) => {
	return (
		<VStack pt="40px" space="15px" width="100%" height="full" alignItems="center">
			<HStack alignItems="center" space={5} width="100%" px="10%">
				<FontAwesome5 onPress={() => navigation.goBack()} name="arrow-left" size={24} color="black" />
				<Heading size="lg" color="black">
					Are you a...
				</Heading>
			</HStack>

			<HStack alignItems="center" space={5} height="20%" width="100%" px="10%">
				<Button
					onPress={() => {
						navigation.navigate('SignUp', { isSociety: false });
					}}
					size="lg"
					borderRadius={24}
					height="full"
					width="50%"
					variant="solid"
					colorScheme="primary"
					shadow={5}
					_text={{
						fontWeight: 700
					}}
				>
					Student
				</Button>
				<Button
					onPress={() => {
						navigation.navigate('SignUp', { isSociety: true });
					}}
					size="lg"
					borderRadius={24}
					height="full"
					width="50%"
					variant="solid"
					colorScheme="primary"
					shadow={5}
					_text={{
						fontWeight: 700
					}}
				>
					Society
				</Button>
			</HStack>
		</VStack>
	);
};

export const SignUp = ({ route, navigation }: SignUpScreenProps) => {
	const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

	const { isSociety } = route.params;

	async function SubmitForm(data: SignUpData) {
		console.log('submitted', data);
		await delay(500);
	}

	useEffect(() => {
		console.log(isSociety);
	}, []);
	// let x;
	// x.toString();
	return (
		<View>
			<AppLoading />
			<OptimizedHeavyScreen>
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
								onSubmit={SubmitForm}
								validate={Validate}
							>
								{(formikProps) => (
									<VStack pt="40px" space="15px" width="80%" height="full" justifyContent="center">
										<HStack alignItems="center" space={5}>
											<FontAwesome5
												onPress={() => navigation.goBack()}
												name="arrow-left"
												size={24}
												color="black"
											/>
											<Heading size="xl" py="20px" color="black" mt={1}>
												Sign Up
											</Heading>
										</HStack>
										{/* <Switch
											borderRadius={12}
											option1="Student"
											option2="Society"
											selectionColor="red"
											onSelectSwitch={(value: number) => console.log(value)}
										/> */}
										<TextInput
											label={isSociety ? 'Society Email' : 'University Email'}
											name="email"
											isRequired
											placeholder="example@lums.edu.pk"
											formikProps={formikProps}
										/>
										<TextInput
											label="Password"
											name="password"
											isRequired
											isPassword={true}
											formikProps={formikProps}
										/>

										<TextInput
											label="Confirm Password"
											name="confirmPassword"
											isRequired
											isPassword={true}
											formikProps={formikProps}
										/>

										<HStack marginTop="20px" justifyContent="center">
											{/* <Button
										onPress={() => navigation.navigate('Login')}
										size="lg"
										borderRadius={100}
										width="50%"
										variant="ghost"
										colorScheme="primary"
										_text={{
											fontWeight: 700
										}}
									>
										Login Instead
									</Button> */}
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
												SignUp
											</Button>
										</HStack>
										<Text width="100%" textAlign="center" fontSize={10} color="rgba(0, 0, 0, 0.5)">
											By signing up, you agree to our terms and conditions
										</Text>

										<Pressable onPress={() => navigation.navigate('Login')}>
											<HStack space="5px" justifyContent="center" alignItems="center" py={5}>
												<Text fontSize="md" color="black" fontWeight={700}>
													Already one of us? Login
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
			</OptimizedHeavyScreen>
		</View>
	);
};
