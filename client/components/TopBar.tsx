import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AspectRatio, Button, Heading, HStack, Icon, Input, Pressable, View } from 'native-base';
import React from 'react';
import { MaterialIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { RootStackParamList } from '../config/RouteParams';

interface TopBarProps {
	search: boolean;
	onSearchPress: Function;
	overlay: boolean;
	type: 'bar' | 'icons';
	label: string;
}

const TopBar = (props: TopBarProps) => {
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	return (
		<HStack
			width="full"
			// height="40%"
			position={props.overlay ? 'absolute' : 'relative'}
			top={0}
			// bgColor="red.500"
			// opacity={props.transparent?0:1}
			justifyContent="space-between"
			px="10%"
			pt="6%"
			pb="2%"
			zIndex={5}
			alignItems="center"
		>
			<Heading size="xl">{props.label}</Heading>
			<HStack alignItems="center" justifyContent="center" space={4}>
				{props.search ? (
					//  <SearchIcon fill="black" height={32} onPress={() => props.onSearchPress} />
					<Icon
						fontWeight={900}
						as={<FontAwesome5 name="search" />}
						size={6}
						color="text.primary"
						onPress={() => props.onSearchPress()}
					/>
				) : null}
				{/* <HamburgerIcon
						fill="black"
						height={32}
						onPress={() => {
							navigation.navigate('Menu');
						}}
					/> */}
				<Icon
					fontWeight={900}
					as={<Ionicons name="menu" />}
					size={9}
					color="text.primary"
					onPress={() => {
						navigation.navigate('Menu');
					}}
				/>
			</HStack>
		</HStack>
	);
};

TopBar.defaultProps = {
	search: false,
	overlay: false,
	type: 'bar',
	label: '',
	onSearchPress: () => {},
	searchTerm: '',
	setSearchTerm: () => {}
};

export default TopBar;

{
	/* <HStack
			width="full"
			position="absolute"
			top={0}
			// opacity={props.transparent?0:1}
			justifyContent="space-between"
			px="10%"
			alignItems="center"
			zIndex={5}
			// elevation={5}
		>
			<AspectRatio
				width="20%"
				ratio={{
					base: 1 / 1,
					md: 1 / 1
				}}
			>
				<Button
					rounded="full"
					bgColor="background"
					onPress={() => {
						navigation.navigate('Menu');
					}}
					justifyContent="center"
					alignItems="center"
				>
					<Icon as={<HamburgerIcon fill="black" width={32} height={32} />} />
				</Button>
			</AspectRatio>

			{props.search ? (
				<AspectRatio
					width="20%"
					ratio={{
						base: 1 / 1,
						md: 1 / 1
					}}
				>
					<Button
						rounded="full"
						bgColor="background"
						onPress={() => {
							navigation.navigate('Menu');
						}}
						justifyContent="center"
						alignItems="center"
					>
						<Icon as={<SearchIcon fill="black" width={32} height={32} />} />
					</Button>
				</AspectRatio>
			) : null}
		</HStack> */
}
