import React, { useState, useEffect, useContext, useRef } from 'react';
import { VStack, HStack, Button, Heading, Pressable, Text, Box, useTheme } from 'native-base';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import Axios from 'axios';

import { LUMSAFAR_SERVER_URL } from '@env';
import { RootStackParamList } from '../config/RouteParams';
import Screen from '../components/Screen';
import { JsonHeader } from '../config/ControlHeader';
import { DeviceEventEmitter } from 'react-native';
import ErrorMessage from '../components/ErrorMessage';
import { Formik } from 'formik';
import TextInput from '../components/TextInput';
import SimpleScreen from '../components/SimpleScreen';
import { UserData } from '../interfaces/UserData';
import { StoreUserData } from '../data/AsyncStorage';
import { UserDataContext } from '../data/UserDataContext';

type VerificationScreenProps = NativeStackScreenProps<RootStackParamList, 'Verification'>;

const CODE_LENGTH = 4;

export const VerificationScreen = ({ route, navigation }: VerificationScreenProps) => {
	const { userData, setUserData } = useContext(UserDataContext);
	const isMountedRef = useRef(false);

	const [ value, setValue ] = useState<string>('');
	const [ verificationCode, setVerificationCode ] = useState<string>('');
	const ref = useBlurOnFulfill({ value, cellCount: CODE_LENGTH });
	const [ props, getCellOnLayoutHandler ] = useClearByFocusCell({
		value,
		setValue
	});

	const { borderRadius } = useTheme();

	const [ isWrong, setIsWrong ] = useState(false);

	const { data, type } = route.params;

	async function SendEmail() {
		Axios.post(
			`${LUMSAFAR_SERVER_URL}/users/send-email`,
			{ email: data.email },
			{
				headers: JsonHeader
			}
		)
			.then((response) => {
				if (response.data === 'failure') {
					console.log('Error occurred please try again later');
				} else {
					//verCode received
					setVerificationCode(response.data);
				}
			})
			.catch((response) => {
				console.log(response);
			});
	}

	useEffect(
		() => {
			if (isMountedRef.current) {
				// navigation.navigate('SignUpInfo', {
				// 	email: data.email as string,
				// 	isSociety: data.isSociety as boolean
				// });
				navigation.reset({
					index: 0,
					routes: [ { name: 'Home' } ]
				});
			}
			isMountedRef.current = true;
		},
		[ userData ]
	);

	const ForgotPassword = (formikProps: any) => {
		formikProps.setSubmitting(false);
		navigation.navigate('SetPassword', { email: data.email as string });
	};

	function SignUp(formikProps: any) {
		Axios.post(`${LUMSAFAR_SERVER_URL}/users/add`, data, {
			headers: JsonHeader
		})
			.then((response) => {
				if (response.data === 'failure') {
					console.log('something went wrong');
				} else {
					//login user
					StoreUserData(response.data, (userData: UserData) => {
						formikProps.setSubmitting(false);
						setUserData(userData);
					});
				}
			})
			.catch((response) => {
				console.log(response);
			});

		// actions.setSubmitting(false);
	}

	function Verify(values: any, formikProps: any) {
		if (values.code == verificationCode) {
			setIsWrong(false);
			if (type === 'SignUp') {
				SignUp(formikProps);
			} else if (type === 'ForgotPassword') {
				ForgotPassword(formikProps);
			}
		} else {
			formikProps.setSubmitting(false);
			setIsWrong(true);
		}
	}

	useEffect(() => {
		SendEmail();
	}, []);

	return (
		<SimpleScreen backButton>
			<VStack width="full">
				<Heading size="lg" width="100%">
					Enter the 4-digit code sent to
				</Heading>
				<Heading size="lg" width="100%" color="primary.500">
					{data.email}
				</Heading>
			</VStack>
			<Formik
				initialValues={{
					code: ''
				}}
				onSubmit={Verify}
			>
				{(formikProps) => (
					<VStack space="15px" py="20px" width="full">
						{/* <TextInput label={'Society Name'} formikProps={formikProps} /> */}
						<CodeField
							ref={ref}
							{...props}
							// Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
							// caretHidden={false}
							value={formikProps.values.code}
							onChangeText={formikProps.handleChange('code')}
							onBlur={() => {
								formikProps.handleBlur('code');
							}}
							cellCount={CODE_LENGTH}
							// keyboardType="number-pad"
							textContentType="oneTimeCode"
							renderCell={({ index, symbol, isFocused }) => (
								<Box
									key={index}
									mx={1}
									shadow={isFocused ? 5 : 0}
									borderWidth={isFocused ? 0 : 1}
									borderColor="border.light"
									width={60}
									height={60}
									bgColor="background"
									rounded={borderRadius}
									alignItems="center"
									justifyContent="center"
									onLayout={getCellOnLayoutHandler(index)}
								>
									<Text fontSize="lg">{symbol || (isFocused ? <Cursor /> : null)}</Text>
								</Box>
							)}
						/>

						<ErrorMessage textAlign="center" show={isWrong}>
							Wrong Code
						</ErrorMessage>

						<Button
							disabled={formikProps.isSubmitting}
							onPress={() => {
								formikProps.handleSubmit();
							}}
							width="100%"
							isLoading={formikProps.isSubmitting}
							isLoadingText="Checking"
						>
							Verify
						</Button>
					</VStack>
				)}
			</Formik>

			<Pressable onPress={SendEmail}>
				<HStack space="5px" justifyContent="center" alignItems="center" py={5}>
					<Text fontSize="md" color="black" fontWeight={700}>
						Didn't receive?
					</Text>

					<Text fontSize="md" color="primary.500" fontWeight={700}>
						Send Again
					</Text>
				</HStack>
			</Pressable>
		</SimpleScreen>
	);
};
