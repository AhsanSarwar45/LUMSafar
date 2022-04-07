import React from 'react';
import { VStack, HStack, Button, Heading, Icon } from 'native-base';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

export const PasswordResetSuccessScreen = ({ route, navigation }: any) => {
	return (
		<VStack bg="white" pt="60px" space="25px" width="100%" height="full" alignItems="center" px="10%">
			<HStack alignItems="center" space={5} width="100%">
				<Icon
					as={<FontAwesome5 onPress={() => navigation.goBack()} name="arrow-left" />}
					size={6}
					color="black"
				/>
			</HStack>
			<Heading size="lg" width="100%">
				You now have a new password!
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
		</VStack>
	);
};
