import { HStack, Icon, Input, VStack, useTheme, Text, ScrollView } from 'native-base';
import React, { useEffect, useState } from 'react';

import SearchIcon from '../assets/icons/SearchIcon.svg';
import Chip from './Chip';
import Screen from '../components/Screen';
import SimpleScreen from './SimpleScreen';

interface ChipsSearchProps {
	items: Array<string>;
	selectedItems: Array<string>;
	setSelectedItems: Function;
}

const ChipsSearch = (props: ChipsSearchProps) => {
	const MaxSearchItems = 3;

	const { colors } = useTheme();
	const [ isFocused, setFocused ] = useState(false);

	const [ searchTerm, setSearchTerm ] = useState<string>('');
	const [ searchItems, setSearchItems ] = useState<Array<string>>([]);

	// useEffect(() => {
	// 	return () => {

	// 	};
	// }, []);

	useEffect(
		() => {
			FilterItems();
		},
		[ props.selectedItems ]
	);

	useEffect(
		() => {
			FilterItems();
		},
		[ searchTerm ]
	);

	const FilterItems = () => {
		let itemsAdded = 0;
		setSearchItems(
			props.items.filter((item: string) => {
				if (itemsAdded >= MaxSearchItems) return false;
				const itemData = item.toLowerCase();
				const searchData = searchTerm.toLowerCase();
				if (props.selectedItems.includes(item)) return false;
				if (itemData.indexOf(searchData) > -1) {
					itemsAdded++;
					return true;
				}
				return false;
			})
		);
	};

	const SelectItem = (item: string) => {
		// console.log('selected', item);
		props.setSelectedItems((oldArray: Array<string>) => [ ...oldArray, item ]);
	};

	const RemoveItem = (item: string) => {
		// console.log('removed', item);
		props.setSelectedItems(props.selectedItems.filter((selectedItem: string) => selectedItem !== item));
	};

	return (
		<VStack width="full" space="5">
			<HStack flexWrap="wrap" width="full">
				{props.selectedItems.map((item: string, index: number) => (
					<Chip
						onPress={() => RemoveItem(item)}
						key={index}
						color={colors.cards[index % Object.keys(colors.cards).length]}
						label={item}
					/>
				))}
			</HStack>
			<Input
				placeholder="Search"
				variant="unstyled"
				borderWidth={1}
				borderColor="border.light"
				bgColor="background"
				borderRadius="2xl"
				value={searchTerm}
				onChangeText={(text: string) => {
					setSearchTerm(text);
				}}
				fontSize="md"
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
				_focus={{ borderColor: 'border.light' }}
				px={5}
				py={3}
				// InputLeftElement={<Icon as={<SearchIcon fill="black" width={24} height={24} />} />}
			/>

			<HStack flexWrap="wrap" width="full">
				{searchItems.map((item: string, index: number) => (
					<Chip onPress={() => SelectItem(item)} label={item} key={index} />
				))}
			</HStack>
		</VStack>
	);
};

ChipsSearch.defaultProps = {
	selectedItem: []
};

export default ChipsSearch;
