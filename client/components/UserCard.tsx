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
	Pressable
} from 'native-base';
import React, { useContext, useEffect, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { UserData } from '../interfaces/UserData';
import HeartIcon from '../assets/icons/HeartIcon.svg';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../config/RouteParams';
import { LUMSAFAR_SERVER_URL } from '@env';
import { JsonHeader } from '../config/ControlHeader';
import { UserDataContext } from '../data/UserDataContext';
import moment from 'moment';

interface UserCardProps {
	index: number;
	data: UserData;
}

const UserCard = (props: UserCardProps) => {
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const { userData, setUserData } = useContext(UserDataContext);

	const { colors } = useTheme();

	const colorIndex: number = props.index % Object.keys(colors.cards).length;
	const isTitleLong = props.data.username.length > 14;

	function CapitalizeFirstLetter(string: string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

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
