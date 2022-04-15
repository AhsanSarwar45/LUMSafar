import moment from 'moment';
import { Button, HStack, Text, VStack } from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
import DateTimePicker, { AndroidNativeProps } from '@react-native-community/datetimepicker';

import TimeCard from '../components/TimeCard';
import Screen from '../components/Screen';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../config/RouteParams';
import SimpleScreen from '../components/SimpleScreen';

type CreateEventTimeScreenProps = NativeStackScreenProps<RootStackParamList, 'CreateEventTime'>;

const CreateEventTimeScreen = (props: CreateEventTimeScreenProps) => {
	const { data } = props.route.params;

	const [ startTime, setStartTime ] = useState(moment.unix(data.startTime));
	const [ endTime, setEndTime ] = useState(moment.unix(data.endTime));

	const [ showTimePicker, setShowDatePicker ] = useState(false);

	const didMountRef = useRef(false);
	const deadSettingsUpdateRef = useRef(false);

	const [ datePickerSettings, setDatePickerSettings ] = useState({ mode: '', timeSelection: '' });

	useEffect(
		() => {
			if (endTime.isBefore(startTime)) setEndTime(moment(startTime).add(1, 'hour'));
		},
		[ startTime ]
	);

	useEffect(
		() => {
			if (startTime.isAfter(endTime)) setStartTime(moment(endTime).subtract(1, 'hour'));
		},
		[ endTime ]
	);

	useEffect(
		() => {
			if (didMountRef.current && !deadSettingsUpdateRef.current) setShowDatePicker(true);
			didMountRef.current = true;
			deadSettingsUpdateRef.current = false;
		},
		[ datePickerSettings ]
	);

	return (
		<Screen
			heading="Set Time"
			backButton
			onBackButton={() => {
				props.navigation.navigate('CreateEventTags', {
					data: {
						title: data.title,
						description: data.description,
						location: data.location,
						image: data.image,
						tags: data.tags,
						endTime: endTime.unix(),
						startTime: startTime.unix()
					}
				});
			}}
		>
			{showTimePicker ? (
				<DateTimePicker
					testID="dateTimePicker"
					value={datePickerSettings.timeSelection === 'start' ? startTime.toDate() : endTime.toDate()}
					mode={datePickerSettings.mode as AndroidNativeProps['mode']}
					is24Hour={false}
					onChange={(event: any, selectedDate: any) => {
						deadSettingsUpdateRef.current = true;
						if (datePickerSettings.timeSelection === 'start') {
							setStartTime(moment(selectedDate));
						} else if (datePickerSettings.timeSelection === 'end') {
							setEndTime(moment(selectedDate));
						}
						setShowDatePicker(false);
						setDatePickerSettings({ mode: '', timeSelection: '' });
					}}
				/>
			) : null}

			<VStack width="full" space={2}>
				{/* <Text color="text.secondary">From</Text> */}

				<Button
					onPress={() => {
						setDatePickerSettings({ mode: 'date', timeSelection: 'start' });
					}}
					variant="minimal"
					justifyContent="flex-start"
					shadow={0}
				>
					<Text color="text.secondary">Start Date</Text>
					{startTime.format('Do MMMM YYYY')}
				</Button>
				<Button
					onPress={() => {
						setDatePickerSettings({ mode: 'time', timeSelection: 'start' });
					}}
					variant="minimal"
					justifyContent="flex-start"
					shadow={0}
				>
					<Text color="text.secondary">Start Time</Text>
					{startTime.format('hh:mm a')}
				</Button>
				<Button
					onPress={() => {
						setDatePickerSettings({ mode: 'date', timeSelection: 'end' });
					}}
					variant="minimal"
					justifyContent="flex-start"
					shadow={0}
				>
					<Text color="text.secondary">End Date</Text>
					{endTime.format('Do MMMM YYYY')}
				</Button>
				<Button
					onPress={() => {
						setDatePickerSettings({ mode: 'time', timeSelection: 'end' });
					}}
					variant="minimal"
					justifyContent="flex-start"
					shadow={0}
				>
					<Text color="text.secondary">End Time</Text>
					{endTime.format('hh:mm a')}
				</Button>
			</VStack>

			<Button
				width="100%"
				onPress={() => {
					console.log(data.image);
					props.navigation.navigate('CreateEventPreview', {
						data: {
							title: data.title,
							description: data.description,
							location: data.location,
							image: data.image,
							tags: data.tags,
							endTime: endTime.unix(),
							startTime: startTime.unix()
						}
					});
				}}
			>
				Next
			</Button>
		</Screen>
	);
};

export default CreateEventTimeScreen;
