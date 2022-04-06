import React, { useState } from 'react';
import { VStack, HStack, Button, Heading, Pressable, Text } from 'native-base';
import { Text as NativeText } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { RootStackParamList } from '../config/RouteParams';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import Axios from 'axios';
import { LUMSAFAR_SERVER_URL } from '@env';

type VerificationScreenProps = NativeStackScreenProps<RootStackParamList, 'Verification'>;

const CODE_LENGTH = 4;

export const Verification = ({ route, navigation }: VerificationScreenProps) => {
	const [ value, setValue ] = useState('');
	const ref = useBlurOnFulfill({ value, cellCount: CODE_LENGTH });
	const [ props, getCellOnLayoutHandler ] = useClearByFocusCell({
		value,
		setValue
	});

	const [ isWrong, setIsWrong ] = useState(false);

	const { data } = route.params;

	async function SubmitForm(code: string) {
		const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
		Axios.post(`${LUMSAFAR_SERVER_URL}/users/add`, data, {
			headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
		})
			.then((response) => {
				console.log(response.data);
				if (response.data === 'success') {
					// login user
				}
			})
			.catch((response) => {
				console.log(response);
			});
		await delay(500);
		// actions.setSubmitting(false);
	}

	return (
		<VStack pt="60px" space="25px" width="100%" height="full" alignItems="center" px="10%">
			<HStack alignItems="center" space={5} width="100%">
				<FontAwesome5 onPress={() => navigation.goBack()} name="arrow-left" size={24} color="black" />
			</HStack>

			<Heading size="lg" color="black" width="100%">
				Enter the 4-digit code sent to {data.email}
			</Heading>

			<CodeField
				ref={ref}
				{...props}
				// Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
				value={value}
				onChangeText={setValue}
				cellCount={CODE_LENGTH}
				// rootStyle={styles.codeFieldRoot}
				keyboardType="number-pad"
				textContentType="oneTimeCode"
				renderCell={({ index, symbol, isFocused }) => (
					<NativeText
						key={index}
						style={[
							{
								width: 60,
								marginHorizontal: 5,
								height: 60,
								lineHeight: 58,
								fontSize: 24,
								borderWidth: 1,
								borderRadius: 8,
								borderColor: 'rgba(0, 0, 0, 0.08)',
								textAlign: 'center'
							},
							isFocused && {
								shadowColor: 'rgba(0, 0, 1, 0.01)',
								shadowOffset: {
									width: 0,
									height: 1
								},
								shadowOpacity: 0.18,
								shadowRadius: 1.0,
								elevation: 2,
								borderWidth: 0
							}
						]}
						onLayout={getCellOnLayoutHandler(index)}
					>
						{symbol || (isFocused ? <Cursor /> : null)}
					</NativeText>
				)}
			/>

			{isWrong ? <Text>Wrong Code</Text> : null}

			<Button
				onPress={() => {}}
				marginTop="20px"
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
				Verify
			</Button>

			<Pressable onPress={() => navigation.navigate('Login')}>
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
		</VStack>
	);
};
