import React from 'react';
import { VStack, HStack, Button, Heading, Icon, Text, View } from 'native-base';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import AppLoading from 'expo-app-loading';
import { OptimizedHeavyScreen } from 'react-navigation-heavy-screen';
import Screen from '../components/Screen';

export const AccountTypeScreen = ({ navigation }: any) => {
	return (
		<View>
			<AppLoading />
			<OptimizedHeavyScreen>
				<Screen backButton navigation={navigation}>
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
				</Screen>
			</OptimizedHeavyScreen>
		</View>
	);
};
