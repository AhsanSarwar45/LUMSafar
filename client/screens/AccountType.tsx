import React from 'react';
import { VStack, HStack, Button, Heading, Icon, Text, View } from 'native-base';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import AppLoading from 'expo-app-loading';
import { OptimizedHeavyScreen } from 'react-navigation-heavy-screen';
import Screen from '../components/Screen';
import OptionCard from '../components/Option';

export const AccountTypeScreen = ({ navigation }: any) => {
	return (
		<View>
			<AppLoading />
			<OptimizedHeavyScreen>
				<Screen backButton navigation={navigation}>
					<Heading size="lg" width="100%">
						Are you signing up as a student or society?
					</Heading>

					<OptionCard
						label="Student"
						height="150px"
						width="full"
						icon={<MaterialIcons name="person" />}
						onPress={() => {
							navigation.navigate('SignUp', { isSociety: false });
						}}
					/>
					<OptionCard
						label="Society"
						height="150px"
						width="full"
						icon={<MaterialIcons name="groups" />}
						onPress={() => {
							navigation.navigate('SignUp', { isSociety: false });
						}}
					/>
				</Screen>
			</OptimizedHeavyScreen>
		</View>
	);
};
