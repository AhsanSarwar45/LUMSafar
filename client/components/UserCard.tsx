import {
	AspectRatio,
	useTheme,
	VStack,
	Text,
	HStack,
	Image,
	Skeleton,
	Button,
	Icon,
	Heading,
	Pressable,
	useToast,
	Spacer
} from 'native-base';
import React, { useContext, useEffect, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Axios from 'axios';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { UserData } from '../interfaces/UserData';
import HeartIcon from '../assets/icons/HeartIcon.svg';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../config/RouteParams';
import { LUMSAFAR_SERVER_URL } from '@env';
import { JsonHeader } from '../config/ControlHeader';
import { UserDataContext } from '../data/UserDataContext';
import moment from 'moment';
import { ShowToast } from './Toast';
import { StoreUserData } from '../data/AsyncStorage';

interface UserCardProps {
	index: number;
	data: UserData;
}

const UserCard = (props: UserCardProps) => {
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const { userData, setUserData } = useContext(UserDataContext);

	const { colors } = useTheme();

	const colorIndex: number = props.index % Object.keys(colors.cards).length;
	// const isTitleLong = props.data.username.length > 14;

	function CapitalizeFirstLetter(string: string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	// useEffect(() => {
	// 	console.log(props);
	// }, []);

	return (
		<AspectRatio
			marginBottom={2}
			width="full"
			ratio={{
				base: 16 / 4,
				md: 16 / 4
			}}
		>
			<Pressable height="full" onPress={() => navigation.navigate('Profile', { data: props.data })}>
				<HStack
					px="3%"
					height="full"
					space={3}
					rounded={'3xl'}
					bgColor={colors.cards[colorIndex]}
					shadow={5}
					alignItems="center"
				>
					<AspectRatio
						width="20%"
						ratio={{
							base: 1,
							md: 1
						}}
					>
						<Image
							rounded="full"
							source={{
								uri: props.data.profilePicPath
							}}
							fallbackSource={{
								uri: 'https://www.gravatar.com/avatar/0?d=mp'
							}}
							alt="Profile Picture"
						/>
					</AspectRatio>

					<VStack>
						<Heading color="white" size="md">
							{props.data.username}
						</Heading>
						<Text color="rgba(255,255,255,0.75)">{CapitalizeFirstLetter(props.data.accountType)}</Text>
					</VStack>
				</HStack>
			</Pressable>
		</AspectRatio>
	);
};

interface UserRequestCardProps {
	index: number;
	data: UserData;
	removeRequest: Function;
}

export const UserRequestCard = (props: UserRequestCardProps) => {
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const { userData, setUserData } = useContext(UserDataContext);
	const toast = useToast();
	const { colors } = useTheme();

	const colorIndex: number = props.index % Object.keys(colors.cards).length;
	// const isTitleLong = props.data.username.length > 14;

	function CapitalizeFirstLetter(string: string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	function Accept() {
		Axios.post(
			`${LUMSAFAR_SERVER_URL}/users/accept-request`,
			{ userId: userData._id, friendId: props.data._id },
			{
				headers: JsonHeader
			}
		)
			.then((response) => {
				if (response.data === 'failure') {
					ShowToast(toast, "We couldn't connect to our servers 😔", 'failure');
				} else {
					setUserData(response.data);
					StoreUserData(response.data, () => {});
				}
			})
			.catch((response) => {
				ShowToast(toast, "We couldn't connect to our servers 😔", 'failure');
			});
	}

	function Decline() {
		Axios.post(
			`${LUMSAFAR_SERVER_URL}/users/decline-request`,
			{ userId: userData._id, friendId: props.data._id },
			{
				headers: JsonHeader
			}
		)
			.then((response) => {
				if (response.data === 'failure') {
					ShowToast(toast, "We couldn't connect to our servers 😔", 'failure');
				} else {
					setUserData(response.data);
					StoreUserData(response.data, () => {});
				}
			})
			.catch((response) => {
				ShowToast(toast, "We couldn't connect to our servers 😔", 'failure');
			});
	}

	// useEffect(() => {
	// 	console.log(props);
	// }, []);

	return (
		<AspectRatio
			marginBottom={2}
			width="full"
			ratio={{
				base: 16 / 4,
				md: 16 / 4
			}}
		>
			<Pressable height="full" onPress={() => navigation.navigate('Profile', { data: props.data })}>
				<HStack
					px="3%"
					space={3}
					height="full"
					width="full"
					rounded={'3xl'}
					bgColor={colors.cards[colorIndex]}
					shadow={5}
					alignItems="center"
					justifyContent="space-between"
				>
					<AspectRatio
						width="20%"
						ratio={{
							base: 1,
							md: 1
						}}
					>
						<Image
							rounded="full"
							source={{
								uri: props.data.profilePicPath
							}}
							fallbackSource={{
								uri: 'https://www.gravatar.com/avatar/0?d=mp'
							}}
							alt="Profile Picture"
						/>
					</AspectRatio>

					<VStack>
						<Heading color="white" size="md">
							{props.data.username}
						</Heading>
						<Text color="rgba(255,255,255,0.75)">{CapitalizeFirstLetter(props.data.accountType)}</Text>
					</VStack>
					<Spacer />
					<HStack height="100%" alignItems="center" space={2}>
						<AspectRatio
							height="60%"
							ratio={{
								base: 1,
								md: 1
							}}
						>
							<Button onPress={Accept} border="2xl" bgColor="green.500">
								<Icon as={<MaterialIcons name="check" />} size={6} color="white" />
							</Button>
						</AspectRatio>
						<AspectRatio
							height="60%"
							ratio={{
								base: 1,
								md: 1
							}}
						>
							<Button onPress={Decline} border="2xl" bgColor="red.500">
								<Icon as={<MaterialIcons name="close" />} size={6} color="white" />
							</Button>
						</AspectRatio>
					</HStack>
				</HStack>
			</Pressable>
		</AspectRatio>
	);
};

export const UserSkeletonCard = () => {
	return (
		<AspectRatio
			marginBottom={2}
			width="full"
			ratio={{
				base: 16 / 4,
				md: 16 / 4
			}}
		>
			<HStack px="3%" space={3} height="full" alignItems="center" rounded={'3xl'} shadow={5} bgColor={'gray.400'}>
				<AspectRatio
					width="20%"
					ratio={{
						base: 1,
						md: 1
					}}
				>
					<Skeleton height="full" startColor="gray.100" rounded="full" />
				</AspectRatio>

				<Skeleton.Text lines={2} width="60%" key={1} startColor="gray.100" />
			</HStack>
		</AspectRatio>
	);
};

export default UserCard;
