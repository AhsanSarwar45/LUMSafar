import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import Axios from 'axios';

import EventCard from '../components/EventCard';
import Screen from '../components/Screen';

import { RootStackParamList } from '../config/RouteParams';
import { LUMSAFAR_SERVER_URL } from '@env';
import { JsonHeader } from '../config/ControlHeader';
import { EventData } from '../interfaces/EventsData';

type CreateEventPreviewScreenProps = NativeStackScreenProps<RootStackParamList, 'CreateEventPreview'>;

const CreateEventPreviewScreen = (props: CreateEventPreviewScreenProps) => {
	const { data } = props.route.params;

	const [ isSubmitting, setSubmitting ] = useState(false);

	function CreateEvent(data: EventData) {
		console.log(data);
		Axios.post(`${LUMSAFAR_SERVER_URL}/events/add`, data, {
			headers: JsonHeader
		})
			.then((response) => {
				setSubmitting(false);
				if (response.data === 'success') {
				} else if (response.data === 'failure') {
				}
			})
			.catch((response) => {
				console.log(response);
			});
	}

	useEffect(() => {
		console.log(data.image);
	}, []);

	return (
		<Screen
			heading="Preview"
			backButton
			onBackButton={() => {
				props.navigation.navigate('CreateEventTime', {
					data: data
				});
			}}
		>
			<EventCard data={data} index={0} />
			<Button
				disabled={isSubmitting}
				isLoading={isSubmitting}
				isLoadingText="Checking"
				width="100%"
				onPress={() => CreateEvent(data)}
			>
				Create Event
			</Button>
		</Screen>
	);
};

export default CreateEventPreviewScreen;
