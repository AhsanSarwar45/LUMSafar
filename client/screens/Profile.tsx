import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Heading, VStack, Button, Text, Image, HStack, useTheme, Icon, Pressable, useToast } from 'native-base';
import React, { useContext, useState } from 'react';
import Axios from 'axios';
import { LUMSAFAR_SERVER_URL } from '@env';

import Screen from '../components/Screen';
import TextInput from '../components/TextInput';
import { RootStackParamList } from '../config/RouteParams';
import { ProfilePlaceholder } from '../assets/images';
import { UserDataContext } from '../data/UserDataContext';
import Chip from '../components/Chip';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ExpoImagePicker from 'expo-image-picker';
import { JsonHeader } from '../config/ControlHeader';
import { ShowToast } from '../components/Toast';
import ScreenHeader from '../components/ScreenHeader';

type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const ProfileScreen = (props: ProfileScreenProps) => {
	const { data } = props.route.params;
	const { userData, setUserData } = useContext(UserDataContext);
	const { colors } = useTheme();
	const [ profilePicture, setProfilePicture ] = useState(userData.profilePicPath);
	const [ ownProfile, setOwnProfile ] = useState(userData._id === data._id);
	const toast = useToast();

	return (
		<Screen
			header={
				<ScreenHeader
					text={'Profile'}
					backButton
					icons={[
						<MaterialCommunityIcons
							name="lead-pencil"
							onPress={() => props.navigation.navigate('EditProfile')}
						/>
					]}
				/>
			}
		>
			<Image
				size="xl"
				rounded="full"
				source={{
					uri: profilePicture
				}}
				fallbackSource={{
					uri: 'https://www.gravatar.com/avatar/0?d=mp'
				}}
				alt="Profile Picture"
			/>

			<Heading>{data.username} </Heading>
			{/* <Text>{data.accountType}</Text> */}
			{ownProfile ? (
				<HStack space="5%">
					<Button _text={{ fontSize: 'sm' }} width="47.5%">
						Friend Request
					</Button>
					<Button _text={{ fontSize: 'sm' }} width="47.5%">
						Follow
					</Button>
				</HStack>
			) : null}

			<HStack
				bgColor="background"
				rounded="2xl"
				shadow={2}
				px={5}
				py={3}
				width="full"
				justifyContent="space-between"
				alignItems="center"
			>
				<VStack justifyContent="flex-start" width="90%">
					<Text color="text.secondary">Bio</Text>
					<Text color="text.primary">{data.bio}</Text>
				</VStack>
				<Icon as={<Ionicons name="md-information-circle" />} size={6} color="primary.500" />
			</HStack>

			<HStack
				bgColor="background"
				rounded="2xl"
				shadow={2}
				px={5}
				py={3}
				width="full"
				justifyContent="space-between"
				alignItems="center"
			>
				<VStack space={2} width="90%">
					<Text color="text.secondary">Tags</Text>
					{/* <Spacer /> */}
					{data.interests.length === 0 ? (
						<Text color="text.primary">None</Text>
					) : (
						<HStack flexWrap="wrap" width="full">
							{data.interests.map((item: string, index: number) => (
								<Chip
									key={index}
									color={colors.cards[index % Object.keys(colors.cards).length]}
									label={item}
								/>
							))}
						</HStack>
					)}
				</VStack>
				<Icon as={<Ionicons name="ios-pricetag" />} size={6} color="primary.500" />
			</HStack>
		</Screen>
	);
};

export default ProfileScreen;
