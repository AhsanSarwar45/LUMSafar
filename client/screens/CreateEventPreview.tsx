import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box, Button, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import Axios from 'axios';

import { useToast, useTheme } from 'native-base';

import EventCard from '../components/EventCard';
import Screen from '../components/Screen';
import { RootStackParamList } from '../config/RouteParams';
import { LUMSAFAR_SERVER_URL } from '@env';
import { JsonHeader } from '../config/ControlHeader';
import { EventData } from '../interfaces/EventsData';

type CreateEventPreviewScreenProps = NativeStackScreenProps<RootStackParamList, 'CreateEventPreview'>;

const CreateEventPreviewScreen = (props: CreateEventPreviewScreenProps) => {
	const { data } = props.route.params;
	const toast = useToast();
	const { borderRadius } = useTheme();
	const [ isSubmitting, setSubmitting ] = useState(false);

	useState;

	const FetchImageFromUri = async (uri: string) => {
		const response = await fetch(uri);
		const blob = await response.blob();
		return blob;
	};

	function CreateEvent(data: EventData) {
		setSubmitting(true);
		FetchImageFromUri(data.imagePath).then((value: Blob) => {
			const formData = new FormData();
			formData.append('file', value);
			formData.append('upload_preset', 'lumsafar_cloudinary');

			Axios.post(
				'cloudinary://996178665614644:lIrHB-5ng1tqpnqjSJKgJkVVRa4@lumsafar',
				formData
			).then((response) => {
				data.imagePath = response.data.url;
				Axios.post(`${LUMSAFAR_SERVER_URL}/events/add`, data, {
					headers: JsonHeader
				})
					.then((response) => {
						setSubmitting(false);
						if (response.data === 'success') {
							toast.show({
								render: () => {
									return (
										<Box
											_text={{ color: 'white' }}
											bg="emerald.500"
											px="3"
											py="2"
											rounded={borderRadius}
											mb={10}
										>
											Event created! 🚀
										</Box>
									);
								}
							});
							props.navigation.navigate('Home');
						} else if (response.data === 'failure') {
							console.log('Failure creating event');
						}
					})
					.catch((response) => {
						console.log(response);
					});
			});
		});
	}

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
