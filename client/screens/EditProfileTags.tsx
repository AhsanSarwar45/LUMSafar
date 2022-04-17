import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, VStack } from 'native-base';
import React, { useState } from 'react';
import ChipsSearch from '../components/ChipsSearch';
import Screen from '../components/Screen';
import ScreenHeader from '../components/ScreenHeader';
import SimpleScreen from '../components/SimpleScreen';
import { RootStackParamList } from '../config/RouteParams';

const Tags = [
	'Art',
	'Badminton',
	'Cricket',
	'Crafts',
	'Dancing',
	'Design',
	'Football',
	'Make-up',
	'Video Making',
	'Photography',
	'Singing',
	'Writing',
	'Sports',
	'Cars',
	'Bikes',
	'Study',
	'Debate',
	'Cafe-hoping',
	'Nightclubs',
	'Cooking',
	'Board Games',
	'Video Games',
	'Movies',
	'TV Shows',
	'Reading',
	'Music',
	'Food',
	'Travelling',
	'Pets'
];

type EditProfileTagsScreenProps = NativeStackScreenProps<RootStackParamList, 'EditProfileTags'>;

const EditProfileTagsScreen = (props: EditProfileTagsScreenProps) => {
	const { data } = props.route.params;

	const [ selectedTags, setSelectedTags ] = useState<Array<string>>(data.interests);

	return (
		<SimpleScreen
			header={
				<ScreenHeader
					text="Add Tags"
					backButton
					onBackButton={() => {
						let userData = data;
						userData.interests = selectedTags;
						props.navigation.navigate('EditProfile', {
							data: userData
						});
					}}
				/>
			}
		>
			<ChipsSearch items={Tags} selectedItems={selectedTags} setSelectedItems={setSelectedTags} />
			<Button
				width="100%"
				onPress={() => {
					let userData = data;
					userData.interests = selectedTags;
					props.navigation.navigate('EditProfile', {
						data: userData
					});
				}}
			>
				Save
			</Button>
		</SimpleScreen>
	);
};

export default EditProfileTagsScreen;
