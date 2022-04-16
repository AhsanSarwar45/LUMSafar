import React, { useContext, useEffect, useState } from 'react';
import { AspectRatio, Box, FlatList, HStack, Icon, Input, Text, View, VStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import Axios from 'axios';
import { MaterialIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';

import TopBar from '../../components/TopBar';
import Screen from '../../components/Screen';
import TabsProps from '../../interfaces/TabsProps';
import { RootStackParamList } from '../../config/RouteParams';
import EventCard, { EventSkeletonCard } from '../../components/EventCard';
import { EventData } from '../../interfaces/EventsData';
import { LUMSAFAR_SERVER_URL } from '@env';
import { JsonHeader } from '../../config/ControlHeader';
import { UserDataContext } from '../../data/UserDataContext';
import StatusBar from '../../components/StatusBar';

export const EventsTab = (props: TabsProps) => {
	const { userData, setUserData } = useContext(UserDataContext);
	const [ isFetching, setIsFetching ] = useState(false);
	const [ areEventsFinished, setAreEventsFinished ] = useState(false);
	const [ events, setEvents ] = useState<Array<EventData>>([]);
	const [ isSearching, setIsSearching ] = useState(false);

	useEffect(
		() => {
			if (isFetching) {
				Refresh();
			}
		},
		[ isFetching ]
	);

	useEffect(
		() => {
			if (events.length === 0) {
				FetchRecommendations(() => setIsFetching(false));
				// console.log('refreshing');
			}
		},
		[ events ]
	);

	const Refresh = () => {
		setAreEventsFinished(false);
		setEvents([]);
	};

	function FetchRecommendations(callback: Function) {
		const currentEvents = events.map((value: EventData, index: number) => value._id);
		// console.log(currentEvents);
		Axios.post(
			`${LUMSAFAR_SERVER_URL}/events/fetch-recommendations`,
			{ userId: userData._id, currentEvents: currentEvents },
			{
				headers: JsonHeader
			}
		)
			.then((response) => {
				if (response.data.length === 0) {
					setAreEventsFinished(true);
				} else {
					setEvents((old) => [ ...old, ...response.data ]);
				}
				callback();

				// setIsFetching(false);
			})
			.catch((response) => {
				console.log(response);
			});
	}

	const ModifyEvent = (index: number, data: EventData) => {
		let newArr = [ ...events ]; // copying the old datas array
		newArr[index] = data; // replace e.target.value with whatever you want to change it to
		setEvents(newArr);
	};

	// useEffect(
	// 	() => {
	// 		console.log(searchTerm);
	// 	},
	// 	[ searchTerm ]
	// );

	const SearchBar = () => {
		const [ searchTerm, setSearchTerm ] = useState('');
		return (
			<View width="full" px="10%" pt="6%" pb="2%" zIndex={5}>
				<Input
					placeholder="Search"
					variant="unstyled"
					borderWidth={1}
					borderColor="border.light"
					bgColor="background"
					borderRadius="2xl"
					value={searchTerm}
					returnKeyType="search"
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
							onPress={() => setIsSearching(false)}
							mr={-2}
							ml={3}
						/>
					}
				/>
			</View>
		);
	};

	return (
		<View marginTop="5%">
			<StatusBar />
			{isSearching ? (
				<SearchBar />
			) : (
				<TopBar onSearchPress={() => setIsSearching(true)} search label={'Events'} />
			)}
			{/* <Screen lightScreen stacked={false} scrollType="none" topBar={<TopBar search label={'Events'} />}> */}
			<View px="8%" pb="20%" width="full">
				<FlatList
					showsVerticalScrollIndicator={false}
					data={events}
					refreshing={isFetching}
					onRefresh={() => setIsFetching(true)}
					ListFooterComponent={
						areEventsFinished ? (
							<VStack pt="40px" width="100%" alignItems={'center'} height="500px">
								<Text fontSize="xl" key={0}>
									You have reached the end 😲
								</Text>
							</VStack>
						) : (
							<VStack space={0.5} height="500px">
								{[ ...Array(3) ].map((value: any, index: number) => <EventSkeletonCard key={index} />)}
							</VStack>
						)
					}
					renderItem={({ item, index }) => (
						<EventCard setEvents={ModifyEvent} data={item as EventData} index={index} key={index} />
					)}
					keyExtractor={(item: EventData) => item._id}
					onEndReached={() => {
						if (!areEventsFinished) FetchRecommendations(() => {});
					}}
					onEndReachedThreshold={0.5}
				/>
			</View>
			{/* {events.map((item, index) => <EventCard data={item as EventData} index={index} key={index} />)} */}
			<Box height="120px" />
			{/* </Screen> */}
		</View>
	);
};
