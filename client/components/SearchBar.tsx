import { Icon, Input, View } from 'native-base';
import React, { useState } from 'react';

import { MaterialIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../config/RouteParams';

interface SearchBarProps {
	onSubmit: Function;
}

const SearchBar = (props: SearchBarProps) => {
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	const [ searchTerm, setSearchTerm ] = useState('');
	return (
		<View width="full" px="8%" pt="6%" pb="2%" zIndex={5}>
			<Input
				placeholder="Search"
				variant="unstyled"
				borderWidth={1}
				borderColor="border.light"
				bgColor="background"
				borderRadius="2xl"
				value={searchTerm}
				returnKeyType="search"
				onSubmitEditing={() => {
					props.onSubmit(searchTerm);
				}}
				onChangeText={(text: string) => {
					setSearchTerm(text);
				}}
				fontSize="md"
				_focus={{ borderColor: 'border.light' }}
				px={5}
				py={3}
				InputRightElement={
					<Icon
						as={<Ionicons name="ios-close" />}
						size={6}
						color="text.primary"
						onPress={() => setSearchTerm('')}
						mr={3}
					/>
				}
				InputLeftElement={
					<Icon
						as={<Ionicons name="chevron-back" />}
						size={6}
						color="text.primary"
						onPress={() => navigation.goBack()}
						mr={-1}
						ml={3}
					/>
				}
			/>
		</View>
	);
};

export default SearchBar;
