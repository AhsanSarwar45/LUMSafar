import { Icon, Input, VStack } from 'native-base';
import React from 'react';

import SearchIcon from '../assets/icons/SearchIcon.svg';

const AddChips = () => {
	return (
		<VStack>
			<Input
				placeholder="Search"
				variant="filled"
				width="100%"
				borderRadius="10"
				py="1"
				px="2"
				borderWidth="0"
				InputLeftElement={<Icon ml="2" size="4" as={<SearchIcon fill="black" />} />}
			/>
		</VStack>
	);
};
