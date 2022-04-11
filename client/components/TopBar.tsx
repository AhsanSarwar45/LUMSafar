import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HStack, Pressable } from 'native-base';
import React from 'react';
import HamburgerIcon from '../assets/icons/HamburgerIcon.svg';
import SearchIcon from '../assets/icons/SearchIcon.svg';
import { RootStackParamList } from '../config/RouteParams';

interface TopBarProps {
	search: boolean;
	onSearchPress: Function;
}

const TopBar = (props: TopBarProps) => {
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	return (
		<HStack width="full" justifyContent="space-between" py="8%">
			<HamburgerIcon
				fill="black"
				width={'10%'}
				onPress={() => {
					navigation.navigate('Menu');
				}}
			/>
			{props.search ? <SearchIcon fill="black" width={'10%'} onPress={() => props.onSearchPress} /> : null}
		</HStack>
	);
};

TopBar.defaultProps = {
	search: false,
	onSearchPress: () => {}
};

export default TopBar;
