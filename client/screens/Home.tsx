import React from 'react';
import { VStack, HStack, Button, Heading } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';

export const AccountType = ({ navigation }: any) => {
	return (
		<VStack pt="60px" space="25px" width="100%" height="full" alignItems="center" px="10%">
			<HStack alignItems="center" space={5} width="100%">
				<FontAwesome5 onPress={() => navigation.goBack()} name="arrow-left" size={24} color="black" />
			</HStack>

			<Heading size="lg" color="black" width="100%">
				Are you signing up as a student or society?
			</Heading>

			{/* </VStack> */}
		</VStack>
	);
};
