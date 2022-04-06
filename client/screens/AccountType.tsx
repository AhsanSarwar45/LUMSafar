import React from 'react';
import { VStack, HStack, Button, Heading, Icon, Text } from 'native-base';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';

export const AccountType = ({ navigation }: any) => {
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
				Are you signing up as a student or society?
			</Heading>

			{/* <VStack alignItems="center" space={5} height="20%" width="100%" px="10%"> */}
			<Button
				onPress={() => {
					navigation.navigate('SignUp', { isSociety: false });
				}}
				height="30%"
				width="100%"
			>
				<VStack width="full" alignItems="center" justifyContent="center">
					<Icon as={<MaterialIcons name="person" />} size={20} color="white" />
					<Text fontSize={24} fontWeight={700} color="white">
						Student
					</Text>
				</VStack>
			</Button>
			<Button
				onPress={() => {
					navigation.navigate('SignUp', { isSociety: true });
				}}
				height="30%"
				width="100%"
			>
				<VStack width="full" alignItems="center" justifyContent="center">
					<Icon as={<MaterialIcons name="groups" />} size={20} color="white" />
					<Text fontSize={24} fontWeight={700} color="white">
						Society
					</Text>
				</VStack>
			</Button>
			{/* </VStack> */}
		</VStack>
	);
};
