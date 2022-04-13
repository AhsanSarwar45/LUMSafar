import { HStack, Icon, Input, VStack, useTheme, Text } from 'native-base';
import React, { useEffect, useState } from 'react';

import SearchIcon from '../assets/icons/SearchIcon.svg';
import Chip from './Chip';
import Screen from '../components/Screen';
import SimpleScreen from './SimpleScreen';

interface ChipsSearchProps {
	items: Array<string>;
	selectedItems: Array<string>;
	setSelectedItems: Function;
	close: Function;
}

const ChipsSearch = (props: ChipsSearchProps) => {
	const { colors } = useTheme();
	const [ isFocused, setFocused ] = useState(false);

	const [ selectedItems, setSelectedItems ] = useState<Array<string>>(props.selectedItems);
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
		[ selectedItems ]
	);

	useEffect(
		() => {
			FilterItems();
		},
		[ searchTerm ]
	);

	const FilterItems = () => {
		setSearchItems(
			props.items.filter((item: string) => {
				const itemData = item.toLowerCase();
				const searchData = searchTerm.toLowerCase();
				return itemData.indexOf(searchData) > -1 && !selectedItems.includes(item);
			})
		);
	};

	const SelectItem = (item: string) => {
		// console.log('selected', item);
		setSelectedItems((oldArray) => [ ...oldArray, item ]);
	};

	const RemoveItem = (item: string) => {
		// console.log('removed', item);
		setSelectedItems(selectedItems.filter((selectedItem: string) => selectedItem !== item));
	};

	return (
		<SimpleScreen
			heading="Search Tags"
			backButton
			onBackButton={() => {
				props.close(false);
				props.setSelectedItems(selectedItems);
			}}
		>
			<HStack flexWrap="wrap" width="full">
				{selectedItems.map((item: string, index: number) => (
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

			<VStack px={5} width="full">
				{searchItems.map((item: string, index: number) => (
					<Chip onPress={() => SelectItem(item)} label={item} key={index} />
				))}
			</VStack>
		</SimpleScreen>
	);
};

ChipsSearch.defaultProps = {
	selectedItem: []
};

export default ChipsSearch;
