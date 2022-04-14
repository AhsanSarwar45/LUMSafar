import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AspectRatio, Button, HStack, Icon, Pressable, View } from 'native-base';
import React from 'react';
import HamburgerIcon from '../assets/icons/HamburgerIcon.svg';
import SearchIcon from '../assets/icons/SearchIcon.svg';
import { RootStackParamList } from '../config/RouteParams';

interface TopBarProps {
	search: boolean;
	onSearchPress: Function;
	overlay: boolean;
	type: 'bar' | 'icons';
}

const TopBar = (props: TopBarProps) => {
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	return (
		<View>
			<HStack
				width="full"
				height="80px"
				position={props.overlay ? 'absolute' : 'relative'}
				top={0}
				// bgColor="red.500"
				// opacity={props.transparent?0:1}
				justifyContent="space-between"
				px="10%"
				// py="2%"
				zIndex={5}
				alignItems="center"
			>
				<HamburgerIcon
					fill="black"
					height={'45%'}
					onPress={() => {
						navigation.navigate('Menu');
					}}
				/>
				{props.search ? <SearchIcon fill="black" height={'45%'} onPress={() => props.onSearchPress} /> : null}
			</HStack>
		</View>
	);
};

TopBar.defaultProps = {
	search: false,
	overlay: false,
	type: 'bar',
	onSearchPress: () => {}
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
