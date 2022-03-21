import React from 'react';
import { Flex, VStack, HStack, Button, KeyboardAvoidingView, Text, Center, useTheme } from 'native-base';
import { Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInput } from '../components/TextInput';

export const SignUp = () => {
	const { gradient } = useTheme();

	return (
		<Flex
			bg={{
				linearGradient: {
					colors: [ gradient.start, gradient.end ],
					start: [ -0.5, 0 ],
					end: [ 1.75, 0 ]
				}
			}}
			height="full"
			width="full"
		>
			<VStack px="40px" width="full">
				<KeyboardAvoidingView behavior="position" width="full">
					<Center paddingTop="200px" width="full">
						<VStack space="10px" width="full">
							<TextInput label="University Email" placeholder="example@site.com" />
							<TextInput label="Password" placeholder="" />
							<TextInput label="Confirm Password" placeholder="" />
						</VStack>
					</Center>
				</KeyboardAvoidingView>
				<HStack marginTop="20px" justifyContent="center">
					<Button
						size="lg"
						borderRadius={100}
						width="50%"
						variant="ghost"
						_text={{
							color: 'white',
							fontWeight: 700
						}}
					>
						Login
					</Button>
					<Button
						size="lg"
						borderRadius={100}
						width="50%"
						variant="solid"
						bg="white"
						_text={{
							color: 'primary.500',
							fontWeight: 700
						}}
					>
						SignUp
					</Button>
				</HStack>
				<Text p="20px" width="full" textAlign="center" fontSize="xs" color="rgba(255, 255, 255, 0.5)">
					By signing up, you agree to our terms and conditions
				</Text>
			</VStack>
		</Flex>
	);
};
