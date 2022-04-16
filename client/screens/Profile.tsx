import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Heading, VStack, Button, Text, Image, HStack, useTheme, Icon, Pressable } from 'native-base';
import React, { useContext, useState } from 'react';
import Axios from 'axios';
import { LUMSAFAR_SERVER_URL } from '@env';

import Screen from '../components/Screen';
import TextInput from '../components/TextInput';
import { RootStackParamList } from '../config/RouteParams';
import { ProfilePlaceholder } from '../assets/images';
import { UserDataContext } from '../data/UserDataContext';
import Chip from '../components/Chip';
import { Ionicons } from '@expo/vector-icons';
import * as ExpoImagePicker from 'expo-image-picker';
import { JsonHeader } from '../config/ControlHeader';

type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const ProfileScreen = (props: ProfileScreenProps) => {
	const { data } = props.route.params;
	const { userData, setUserData } = useContext(UserDataContext);
	const { colors } = useTheme();
	const [ profilePicture, setProfilePicture ] = useState(userData.profilePicPath);
	const [ ownProfile, setOwnProfile ] = useState(userData._id === data._id);

	const PickImage = async () => {
		// No permissions request is necessary for launching the imagePath library
		let result = await ExpoImagePicker.launchImageLibraryAsync({
			mediaTypes: ExpoImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [ 1, 1 ],
			base64: true,
			quality: 1
		});

		// console.log(result);

		if (!result.cancelled) {
			console.log(result.uri);
			const imageBase64 = `data:image/jpg;base64,${result.base64}`;

			const cloudName = 'lumsafar';
			const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

			let fileData = {
				file: imageBase64,
				upload_preset: 'lumsafar_cloudinary'
			};

			// console.log('base64', data.imageBase64);

			fetch(url, {
				body: JSON.stringify(fileData),
				headers: {
					'content-type': 'application/json'
				},
				method: 'POST'
			})
				.then(async (response) => {
					let responseData = await response.json();
					// console.log(responseData);
					let userDataCopy = userData;
					userDataCopy.profilePicPath = responseData.secure_url;
					setProfilePicture(responseData.secure_url);
					setUserData(userDataCopy);
					Axios.post(
						`${LUMSAFAR_SERVER_URL}/users/set-profile-pic`,
						{ userId: userData._id, imagePath: responseData.secure_url },
						{
							headers: JsonHeader
						}
					)
						.then((response) => {
							if (response.data === 'success') {
								console.log('success');
							} else {
							}
						})
						.catch((response) => {
							console.log(response);
						});
				})
				.catch((response) => console.log('response'));
		}
	};

	return (
		<Screen backButton heading="Profile">
			<Button variant="unstyled" shadow={0} onPress={PickImage}>
				<Image
					size="lg"
					rounded="full"
					source={{
						uri: profilePicture
					}}
					fallbackSource={{
						uri: 'https://wallpaperaccess.com/full/317501.jpg'
					}}
					alt="Profile Picture"
				/>
			</Button>

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
			<Pressable width="full">
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
					<VStack justifyContent="flex-start">
						<Text color="text.secondary">Bio</Text>
						<Text color="text.primary">My name Jeff</Text>
					</VStack>
					<Icon as={<Ionicons name="md-information-circle" />} size={6} color="primary.500" />
				</HStack>
			</Pressable>
			<Pressable width="full">
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
					<VStack space={2}>
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
			</Pressable>
		</Screen>
	);
};

export default ProfileScreen;
