import { HStack, Pressable } from 'native-base';
import HamburgerIcon from '../assets/icons/HamburgerIcon.svg';
import SearchIcon from '../assets/icons/SearchIcon.svg';

interface TopBarProps {
	search?: boolean;
	onSearchPress?: Function;
}

const TopBar = (props: TopBarProps) => {
	return (
		<HStack py="6%" px="6%" justifyContent="space-between">
			<HamburgerIcon fill="black" width={'10%'} />
			{props.search ? <SearchIcon fill="black" width={'10%'} onPress={() => props.onSearchPress} /> : null}
		</HStack>
	);
};

TopBar.defaultProps = {
	search: false,
	onSearchPress: () => {}
};

export default TopBar;
