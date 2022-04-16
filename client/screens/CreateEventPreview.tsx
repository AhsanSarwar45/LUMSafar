import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box, Button, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import Axios from 'axios';

import { useToast, useTheme, Image } from 'native-base';

import EventCard from '../components/EventCard';
import Screen from '../components/Screen';
import { RootStackParamList } from '../config/RouteParams';
import { LUMSAFAR_SERVER_URL } from '@env';
import { JsonHeader } from '../config/ControlHeader';
import { EventData } from '../interfaces/EventsData';
import { ShowToast } from '../components/Toast';

type CreateEventPreviewScreenProps = NativeStackScreenProps<RootStackParamList, 'CreateEventPreview'>;

const CreateEventPreviewScreen = (props: CreateEventPreviewScreenProps) => {
	const { data } = props.route.params;
	const toast = useToast();
	const { borderRadius } = useTheme();
	const [ isSubmitting, setSubmitting ] = useState(false);

	function CreateEvent(data: EventData) {
		setSubmitting(true);

		const cloudName = 'lumsafar';
		const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

		let fileData = {
			file: data.imageBase64,
			upload_preset: 'lumsafar_cloudinary'
		};

		// console.log('base64', data.imageBase64);

		fetch(url, {
			body: JSON.stringify(fileData),
			headers: {
				'content-type': 'application/json'
			},
			method: 'POST'
		})
			.then(async (response) => {
				let responseData = await response.json();
				// console.log(responseData);
				data.imageBase64 = '';
				data.imagePath = responseData.secure_url;

				console.log(data);
				Axios.post(`${LUMSAFAR_SERVER_URL}/events/add`, data, {
					headers: JsonHeader
				})
					.then((response) => {
						if (response.data === 'success') {
							setSubmitting(false);
							ShowToast(toast, 'Event created! 🚀', 'success');
							props.navigation.navigate('Home');
						} else if (response.data === 'failure') {
							console.log('Failure creating event');
							setSubmitting(false);
						}
					})
					.catch((response) => {
						setSubmitting(false);
						console.log('Add event', response);
					});
			})
			.catch((response) => {
				console.log('Image Upload', response);
				setSubmitting(false);
			});
		// })
		// .catch((response) => {
		// 	console.log('Image Fetch', response);
		// 	setSubmitting(false);
		// });
	}

	return (
		<Screen
			lightScreen
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
			{/* <Image height="100px" width="200px" source={{ uri: blobImage as string }} /> */}
		</Screen>
	);
};

export default CreateEventPreviewScreen;
