import React from 'react';
import { Flex, VStack, HStack, Button, KeyboardAvoidingView, Center, useTheme } from 'native-base';
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
			<VStack padding="20px" width="full">
				<KeyboardAvoidingView behavior="position" width="full">
					<Center paddingTop="200px" width="full">
						<VStack space="10px" width="full">
							<TextInput label="Username" placeholder="" />
							<TextInput label="Email" placeholder="example@site.com" />
							<TextInput label="Password" placeholder="" />
						</VStack>
					</Center>
				</KeyboardAvoidingView>
				<HStack marginTop="20px" justifyContent="center">
					<Button size="lg" borderRadius={100} width="50%" variant="ghost" colorScheme="whiteColor">
						Login
					</Button>
					<Button size="lg" borderRadius={100} width="50%" variant="solid" colorScheme="whiteColor">
						SignUp
					</Button>
				</HStack>
			</VStack>
		</Flex>
	);
};
