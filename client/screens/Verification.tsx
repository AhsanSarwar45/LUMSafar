import React from 'react';
import { VStack, HStack, Button, Heading } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { RootStackParamList } from '../config/RouteParams';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type VerificationScreenProps = NativeStackScreenProps<RootStackParamList, 'Verification'>;

export const Verification = ({ route, navigation }: VerificationScreenProps) => {
	const { data } = route.params;

	return (
		<VStack pt="60px" space="25px" width="100%" height="full" alignItems="center" px="10%">
			<HStack alignItems="center" space={5} width="100%">
				<FontAwesome5 onPress={() => navigation.goBack()} name="arrow-left" size={24} color="black" />
			</HStack>

			<Heading size="lg" color="black" width="100%">
				Enter the 4-digit code sent to {data.email}
			</Heading>

			{/* <VStack alignItems="center" space={5} height="20%" width="100%" px="10%"> */}

			{/* </VStack> */}
		</VStack>
	);
};
