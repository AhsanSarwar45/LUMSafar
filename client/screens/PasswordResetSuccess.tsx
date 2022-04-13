import React from 'react';
import { Button, Heading } from 'native-base';
import Screen from '../components/Screen';

export const PasswordResetSuccessScreen = ({ route, navigation }: any) => {
	return (
		<Screen backButton>
			<Heading size="lg" width="100%">
				You now have a new password! 🎉
			</Heading>

			<Button
				onPress={() => {
					navigation.navigate('Login');
				}}
				marginTop="20px"
				width="100%"
			>
				Login
			</Button>
		</Screen>
	);
};
