import React from 'react';
import { Heading } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import Screen from '../components/Screen';
import OptionCard from '../components/Option';
import ScreenHeader from '../components/ScreenHeader';

export const AccountTypeScreen = ({ navigation }: any) => {
	return (
		<Screen header={<ScreenHeader backButton />}>
			<Heading size="lg" width="100%">
				Are you signing up as a student or society?
			</Heading>

			<OptionCard
				label="Student"
				height="150px"
				width="full"
				icon={<MaterialIcons name="person" />}
				onPress={() => {
					navigation.navigate('SignUp', { accountType: 'student' });
				}}
			/>
			<OptionCard
				label="Society"
				height="150px"
				width="full"
				icon={<MaterialIcons name="groups" />}
				onPress={() => {
					navigation.navigate('SignUp', { accountType: 'society' });
				}}
			/>
		</Screen>
	);
};
