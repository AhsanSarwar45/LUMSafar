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
	const [ profilePicture, setProfilePicture ] = useState(data.profilePicPath);
	const [ isFriend, setIsFriend ] = useState(userData.friends.includes(data._id));
	const [ ownProfile, setOwnProfile ] = useState(userData._id === data._id);
	const [ sentFriendRequest, setSentFriendRequest ] = useState(userData.sentFriendRequests.includes(data._id));
	const [ isSendingRequest, setIsSendingRequest ] = useState(false);
	const [ isSendingFollowRequest, setIsSendingFollowRequest ] = useState(false);
	const toast = useToast();

	function SendFriendRequest() {
		setIsSendingRequest(true);
		Axios.post(
			`${LUMSAFAR_SERVER_URL}/users/friend-request`,
			{ userId: userData._id, friendId: data._id },
			{
				headers: JsonHeader
			}
		)
			.then((response) => {
				if (response.data === 'success') {
					ShowToast(toast, 'Friend request sent! 🚀', 'success');
					setSentFriendRequest(true);
				} else {
					ShowToast(toast, 'Please try again later 😔', 'failure');
				}
			})
			.catch((response) => {
				ShowToast(toast, "We couldn't connect to our servers 😔", 'failure');
			})
			.finally(() => setIsSendingRequest(false));
	}

	function Follow() {
		setIsSendingRequest(true);
		Axios.post(
			`${LUMSAFAR_SERVER_URL}/users/friend-request`,
			{ userId: userData._id, friendId: data._id },
			{
				headers: JsonHeader
			}
		)
			.then((response) => {
				if (response.data === 'success') {
					ShowToast(toast, 'Friend request sent! 🚀', 'success');
					setSentFriendRequest(true);
				} else {
					ShowToast(toast, 'Please try again later 😔', 'failure');
				}
			})
			.catch((response) => {
				ShowToast(toast, "We couldn't connect to our servers 😔", 'failure');
			})
			.finally(() => setIsSendingRequest(false));
	}

	function CancelFriendRequest() {
		setIsSendingRequest(true);
		Axios.post(
			`${LUMSAFAR_SERVER_URL}/users/cancel-request`,
			{ userId: userData._id, friendId: data._id },
			{
				headers: JsonHeader
			}
		)
			.then((response) => {
				if (response.data === 'success') {
					ShowToast(toast, 'Friend request cancelled! 🚀', 'success');
					setSentFriendRequest(false);
				} else {
					ShowToast(toast, 'Please try again later 😔', 'failure');
				}
			})
			.catch((response) => {
				ShowToast(toast, "We couldn't connect to our servers 😔", 'failure');
			})
			.finally(() => setIsSendingRequest(false));
	}

	return (
		<Screen
			lightScreen
			header={
				<ScreenHeader
					text={'Profile'}
					backButton
					icons={
						ownProfile ? (
							[
								<MaterialCommunityIcons
									name="lead-pencil"
									onPress={() => props.navigation.navigate('EditProfile', { data: userData })}
								/>
							]
						) : (
							[]
						)
					}
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
			{!ownProfile ? data.accountType === 'student' && !isFriend ? (
				<HStack space="5%">
					<Button
						disabled={isSendingRequest}
						isLoading={isSendingRequest}
						isLoadingText="Sending"
						onPress={sentFriendRequest ? CancelFriendRequest : SendFriendRequest}
						_text={{ fontSize: 'sm' }}
						width="47.5%"
					>
						{sentFriendRequest ? 'Cancel Friend Request' : 'Send Friend Request'}
					</Button>
					<Button _text={{ fontSize: 'sm' }} width="47.5%">
						Follow
					</Button>
				</HStack>
			) : (
				<Button _text={{ fontSize: 'sm' }} width="100%">
					Follow
				</Button>
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
					<Text color="text.secondary">Interests</Text>
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
