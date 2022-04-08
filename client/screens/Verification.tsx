import React, { useState, useEffect } from 'react';
import { VStack, HStack, Button, Heading, Pressable, Text, Box, useTheme } from 'native-base';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import Axios from 'axios';

import { LUMSAFAR_SERVER_URL } from '@env';
import { RootStackParamList } from '../config/RouteParams';
import Screen from '../components/Screen';
import { JsonHeader } from '../config/ControlHeader';
import { DeviceEventEmitter } from 'react-native';

type VerificationScreenProps = NativeStackScreenProps<RootStackParamList, 'Verification'>;

const CODE_LENGTH = 4;

export const VerificationScreen = ({ route, navigation }: VerificationScreenProps) => {
	const [ value, setValue ] = useState<string>('');
	const [ verificationCode, setVerificationCode ] = useState<string>('');
	const ref = useBlurOnFulfill({ value, cellCount: CODE_LENGTH });
	const [ props, getCellOnLayoutHandler ] = useClearByFocusCell({
		value,
		setValue
	});

	const { borderRadius } = useTheme();

	const [ isWrong, setIsWrong ] = useState(false);

	const { email } = route.params;

	async function SendEmail() {
		Axios.post(
			`${LUMSAFAR_SERVER_URL}/users/send-email`,
			{ email: email },
			{
				headers: JsonHeader
			}
		)
			.then((response) => {
				// if (response.data === 'success') {
				// 	// success
				// } else if (response.data === 'failure') {
				// 	// failure
				// }

				if (response.data === 'failure') {
					console.log('Error occured please try again later');
				} else {
					//verCode received
					setVerificationCode(response.data);
				}
			})
			.catch((response) => {
				console.log(response);
			});
	}

	useEffect(() => {
		SendEmail();
		return () => {
			DeviceEventEmitter.removeAllListeners('event.verify-email');
		};
	}, []);

	function Verify() {
		if (value == verificationCode) {
			setIsWrong(false);
			DeviceEventEmitter.emit('event.verify-email');
		} else {
			setIsWrong(true);
		}
	}

	return (
		<Screen backButton navigation={navigation}>
			<VStack width="full">
				<Heading size="lg" width="100%">
					Enter the 4-digit code sent to
				</Heading>
				<Heading size="lg" width="100%" color="primary.500">
					{email}
				</Heading>
			</VStack>

			<CodeField
				ref={ref}
				{...props}
				// Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
				// caretHidden={false}
				value={value}
				onChangeText={setValue}
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

			{isWrong ? <Text color="red.500">Wrong Code</Text> : null}

			<Button onPress={Verify} marginTop="20px" width="100%">
				Verify
			</Button>

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

			{/* <VStack alignItems="center" space={5} height="20%" width="100%" px="10%"> */}

			{/* </VStack> */}
		</Screen>
	);
};
