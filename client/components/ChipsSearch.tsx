import { HStack, Icon, Input, VStack, useTheme } from 'native-base';
import React, { useState } from 'react';

import SearchIcon from '../assets/icons/SearchIcon.svg';
import Chip from './Chip';

interface ChipsSearchProps {
	items: Array<string>;
	selectedItems: Array<string>;
	setSelectedItems: Function;
}

const ChipsSearch = (props: ChipsSearchProps) => {
	const { colors } = useTheme();

	const [ selectedItems, setSelectedItems ] = useState<Array<string>>(props.selectedItems);

	return (
		<VStack space={2}>
			<HStack flexWrap="wrap">
				{selectedItems.map((tag: string, index: number) => (
					<Chip key={index} color={colors.cards[index % Object.keys(colors.cards).length]} label={tag} />
				))}
			</HStack>
			<Input
				placeholder="Search"
				variant="unstyled"
				borderWidth={1}
				borderColor="border.light"
				bgColor="background"
				borderRadius="2xl"
				px={5}
				py={3}
				// InputLeftElement={<Icon as={<SearchIcon fill="black" width={24} height={24} />} />}
			/>
		</VStack>
	);
};

ChipsSearch.defaultProps = {
	selectedItem: []
};

export default ChipsSearch;
