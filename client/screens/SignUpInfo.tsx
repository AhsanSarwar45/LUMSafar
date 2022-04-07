import React, { useEffect } from 'react';
import { Box, VStack, HStack, Button, Text, Center, Heading, Pressable, View } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TextInput from '../components/TextInput';
import { FontAwesome5 } from '@expo/vector-icons';
import { Formik } from 'formik';
import { OptimizedHeavyScreen } from 'react-navigation-heavy-screen';
import AppLoading from 'expo-app-loading';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Axios from 'axios';
import { LUMSAFAR_SERVER_URL } from '@env';

// const SubmitForm = (data: SignUpData, setSubmitting: Function) => {
// 	console.log('submitting with ', data);
// 	setSubmitting(false);
// };

type RootStackParamList = {
	Login: undefined;
	AccountType: undefined;
	SignUp: { isSociety: boolean };
};

type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

interface SignUpInfoData {
	name?: string;
	batch?: string;
}

const Validate = (values: SignUpInfoData) => {
	const errors: SignUpInfoData = {};

	if (!values.name) {
		errors.name = 'Required';
	}
	if (!values.batch) {
		errors.batch = 'Required';
	}
	return errors;
};

export const SignUp = ({ route, navigation }: SignUpScreenProps) => {
	const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

	const { isSociety } = route.params;

	async function SubmitForm(data: SignUpInfoData, actions: any) {
		Axios.post(`${LUMSAFAR_SERVER_URL}/sign_up`, data, {
			headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
		})
			.then((response) => {
				console.log(response.data);
				if (response.data === 'success') {
					// navigate('/sign_up_success');
				} else if (response.data === 'duplicate-entry') {
					// setIsDup(true);
				}
			})
			.catch((response) => {
				console.log(response);
			});
		await delay(500);
		actions.setSubmitting(false);
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
									name: '',
									batch: ''
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
												Tell us more about yourself
											</Heading>
										</HStack>
										<TextInput label="Name" name="name" isRequired formikProps={formikProps} />
										<TextInput label="Batch" name="batch" isRequired formikProps={formikProps} />
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
												Get Started
											</Button>
										</HStack>
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
