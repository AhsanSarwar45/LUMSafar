import React, { useContext, useEffect, useState } from 'react';
import { AspectRatio, Box, FlatList, HStack, Icon, Input, Text, View, VStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import Axios from 'axios';
import { MaterialIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';

import TopBar from '../components/TopBar';
import Screen from '../components/Screen';
import TabsProps from '../interfaces/TabsProps';
import { RootStackParamList } from '../config/RouteParams';
import EventCard, { EventSkeletonCard } from '../components/EventCard';
import { EventData } from '../interfaces/EventData';
import { LUMSAFAR_SERVER_URL } from '@env';
import { JsonHeader } from '../config/ControlHeader';
import { UserDataContext } from '../data/UserDataContext';
import StatusBar from '../components/StatusBar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import SearchBar from '../components/SearchBar';

type EventsSearchScreenProps = NativeStackScreenProps<RootStackParamList, 'EventsSearch'>;

const EventsSearchScreen = (props: EventsSearchScreenProps) => {
	const { userData, setUserData } = useContext(UserDataContext);
	const [ isFetching, setIsFetching ] = useState(false);
	const [ events, setEvents ] = useState<Array<EventData>>([]);

	function FetchSearchResults(searchTerm: string) {
		setIsFetching(true);
		// console.log(currentEvents);
		Axios.post(
			`${LUMSAFAR_SERVER_URL}/events/search`,
			{ query: searchTerm },
			{
				headers: JsonHeader
			}
		)
			.then((response) => {
				setEvents(response.data);
			})
			.catch((response) => {
				console.log(response);
			})
			.finally(() => setIsFetching(false));
	}

	const ModifyEvent = (index: number, data: EventData) => {
		let newArr = [ ...events ]; // copying the old datas array
		newArr[index] = data; // replace e.target.value with whatever you want to change it to
		setEvents(newArr);
	};

	// const SearchBar = () => {
	// 	const [ searchTerm, setSearchTerm ] = useState('');
	// 	return (
	// 		<View width="full" px="8%" pt="6%" pb="2%" zIndex={5}>
	// 			<Input
	// 				placeholder="Search"
	// 				variant="unstyled"
	// 				borderWidth={1}
	// 				borderColor="border.light"
	// 				bgColor="background"
	// 				borderRadius="2xl"
	// 				value={searchTerm}
	// 				returnKeyType="search"
	// 				onSubmitEditing={() => {
	// 					FetchSearchResults(searchTerm);
	// 				}}
	// 				onChangeText={(text: string) => {
	// 					setSearchTerm(text);
	// 				}}
	// 				fontSize="md"
	// 				_focus={{ borderColor: 'border.light' }}
	// 				px={5}
	// 				py={3}
	// 				InputRightElement={
	// 					<Icon
	// 						as={<Ionicons name="ios-close" />}
	// 						size={6}
	// 						color="text.primary"
	// 						onPress={() => setSearchTerm('')}
	// 						mr={3}
	// 					/>
	// 				}
	// 				InputLeftElement={
	// 					<Icon
	// 						as={<Ionicons name="chevron-back" />}
	// 						size={6}
	// 						color="text.primary"
	// 						onPress={() => props.navigation.goBack()}
	// 						mr={-2}
	// 						ml={3}
	// 					/>
	// 				}
	// 			/>
	// 		</View>
	// 	);
	// };

	return (
		<View marginTop="5%">
			<StatusBar />

			<SearchBar onSubmit={(searchTerm: string) => FetchSearchResults(searchTerm)} />

			{/* <Screen lightScreen stacked={false} scrollType="none" topBar={<TopBar search label={'Events'} />}> */}
			<View px="8%" pb="20%" width="full">
				<FlatList
					showsVerticalScrollIndicator={false}
					data={events}
					ListFooterComponent={
						isFetching ? (
							<VStack space={0.5} height="500px">
								{[ ...Array(3) ].map((value: any, index: number) => <EventSkeletonCard key={index} />)}
							</VStack>
						) : (
							<Box height="500px" />
						)
					}
					renderItem={({ item, index }) => (
						<EventCard setEvents={ModifyEvent} data={item as EventData} index={index} key={index} />
					)}
					keyExtractor={(item: EventData) => item._id}
				/>
			</View>
			<Box height="120px" />
			{/* </Screen> */}
		</View>
	);
};

export default EventsSearchScreen;
