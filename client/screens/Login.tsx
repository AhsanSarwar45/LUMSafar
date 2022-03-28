import React from 'react';
// import { Box, VStack, HStack, Button, Text, Center, Heading } from 'native-base';
import { Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInput } from '../components/TextInput';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { Form, Formik } from 'formik';
import { Flex, H1, View, Text, Pressable } from 'dripsy';

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
	const OnSubmit = (data: LoginData) => {
		console.log('submitting with ', data);
	};
	// let x;
	// x.toString();
	return (
		<Flex sx={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
			<KeyboardAwareScrollView
				style={{
					width: '100%'
				}}
			>
				{/* <LUMSafarLogo width="70%" height={200} /> */}

				<Formik
					initialValues={{
						email: '',
						password: ''
					}}
					onSubmit={OnSubmit}
					validate={Validate}
				>
					{(props) => (
						<Flex
							sx={{
								flexDirection: 'column',
								paddingTop: 40,
								width: '80%',
								height: '100%',
								justifyContent: 'center'
							}}
						>
							<H1>Login</H1>
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

							{/* <HStack marginTop="20px" justifyContent="center">
									<Button
										onPress={() => props.handleSubmit()}
										size="lg"
										borderRadius={100}
										width="100%"
										variant="solid"
										colorScheme="primary"
										shadow={2}
										_text={{
											fontWeight: 700
										}}
									>
										Login
									</Button>
								</HStack>*/}
							<Pressable onPress={() => navigation.navigate('SignUp')}>
								<Flex sx={{ flexDirection: 'row', justifyContent: 'center', paddingY: 5 }}>
									<Text
										sx={{
											fontSize: 20,
											color: 'black',
											fontWeight: '700'
										}}
									>
										New here? Sign up
									</Text>
									<MaterialIcons name="arrow-forward" size={24} color="black" />
								</Flex>
							</Pressable>
						</Flex>
					)}
				</Formik>
				{/* </Center> */}
			</KeyboardAwareScrollView>
		</Flex>
	);
};
