import React, { useState } from 'react';
import { VStack, HStack, Button, Heading, Pressable, Text, Icon } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { RootStackParamList } from '../config/RouteParams';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';

type VerificationScreenProps = NativeStackScreenProps<RootStackParamList, 'Verification'>;

const CODE_LENGTH = 4;

export const VerificationScreen = ({ route, navigation }: VerificationScreenProps) => {
	const [ value, setValue ] = useState('');
	const ref = useBlurOnFulfill({ value, cellCount: CODE_LENGTH });
	const [ props, getCellOnLayoutHandler ] = useClearByFocusCell({
		value,
		setValue
	});

	const [ isWrong, setIsWrong ] = useState(false);

	const { email, verificationCode, verifyCallback } = route.params;

	async function Verify() {
		if (value == verificationCode) {
			verifyCallback();
		} else {
			setIsWrong(true);
		}
	}

	return (
		<VStack bg="white" pt="60px" space="25px" width="100%" height="full" alignItems="center" px="10%">
			<HStack alignItems="center" space={5} width="100%">
				<Icon
					as={<FontAwesome5 onPress={() => navigation.goBack()} name="arrow-left" />}
					size={6}
					color="black"
				/>
			</HStack>

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
				value={value}
				onChangeText={setValue}
				cellCount={CODE_LENGTH}
				// rootStyle={styles.codeFieldRoot}
				keyboardType="number-pad"
				textContentType="oneTimeCode"
				renderCell={({ index, symbol, isFocused }) => (
					<VStack
						key={index}
						mx={1}
						shadow={isFocused ? 5 : 0}
						borderWidth={isFocused ? 0 : 1}
						borderColor="rgba(0, 0, 0, 0.08)"
						space={0}
						width={60}
						height={60}
						bg="white"
						borderRadius={20}
						alignItems="center"
						justifyContent="center"
						onLayout={getCellOnLayoutHandler(index)}
					>
						<Text fontSize="lg">{symbol || (isFocused ? <Cursor /> : null)}</Text>
					</VStack>
				)}
			/>

			{isWrong ? <Text color="red.500">Wrong Code</Text> : null}

			<Button onPress={Verify} marginTop="20px" width="100%">
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
