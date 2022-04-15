import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Heading, Box, Button, Text } from 'native-base';
import React, { useContext } from 'react';
import Screen from '../components/Screen';
import TextInput from '../components/TextInput';
import { RootStackParamList } from '../config/RouteParams';

type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const ProfileScreen = (props: ProfileScreenProps) => {
	const { data } = props.route.params;

	return (
		<Screen backButton heading="Profile">
			<Heading>{data.username} </Heading>
			<Button variant="minimal" shadow={0} width="full" justifyContent="flex-start">
				<Text color="text.secondary">Bio</Text>
				My name Jeff
			</Button>
		</Screen>
	);
};

export default ProfileScreen;
