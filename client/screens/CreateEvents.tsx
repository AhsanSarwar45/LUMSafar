import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import moment, { Moment } from 'moment';
import { HStack, Icon, View, VStack, Text, useTheme, Button, Pressable, Modal } from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import * as Yup from 'yup';
import Axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';

import Chip from '../components/Chip';
import TimeCard from '../components/TimeCard';
import ImagePicker from '../components/ImagePicker';
import Screen from '../components/Screen';
import TextInput from '../components/TextInput';
import { RootStackParamList } from '../config/RouteParams';
import ErrorMessage from '../components/ErrorMessage';
import ChipsSearch from '../components/ChipsSearch';
import { LUMSAFAR_SERVER_URL } from '@env';
import { JsonHeader } from '../config/ControlHeader';
// import TimePicker from '../components/TimePicker';

// import SelectableChips from 'react-native-chip/SelectableChips'

type CreateEventScreenProps = NativeStackScreenProps<RootStackParamList, 'CreateEvent'>;

interface CreateEventData {
	title: string;
	description: string;
	location: string;
	tags: Array<string>;
	startTime: Moment;
	endTime: Moment;
}

const Tags = [ 'Badminton', 'Study', 'Cricket', 'Party', 'Music', 'Concert', 'Shugul', 'Sports Fest' ];

const CreateEventScreen = (props: CreateEventScreenProps) => {
	const { colors } = useTheme();
	const [ showSearchChips, setShowSearchChips ] = useState(false);
	const [ selectedTags, setSelectedTags ] = useState<Array<string>>([ 'Badminton', 'Study', 'Cricket', 'Party' ]);
	const [ showTimePicker, setShowTimePicker ] = useState(false);
	const [ formikValues, setFormikValues ] = useState({});

	const [ startTime, setStartTime ] = useState(moment().add(1, 'hour').startOf('hour'));
	const [ endTime, setEndTime ] = useState(moment().add(2, 'hour').startOf('hour'));

	function CreateEvent(data: CreateEventData, formikProps: any) {
		Axios.post(
			`${LUMSAFAR_SERVER_URL}/events/add`,
			{},
			{
				headers: JsonHeader
			}
		)
			.then((response) => {
				formikProps.setSubmitting(false);
				if (response.data === 'success') {
				} else if (response.data === 'failure') {
				}
			})
			.catch((response) => {
				console.log(response);
			});
	}

	const CreateEventSchema = Yup.object().shape({
		title: Yup.string().required('Required'),
		location: Yup.string().required('Required')
	});

	const SetTime = (event: any, selectedDate: any, formikProps: any) => {
		const currentDate = selectedDate;
		formikProps.handleChange('startTime');
	};

	return showSearchChips ? (
		<ChipsSearch
			close={() => setShowSearchChips(false)}
			items={Tags}
			selectedItems={selectedTags}
			setSelectedItems={setSelectedTags}
		/>
	) : (
		<Screen backButton keyboardAware heading="Create Event">
			{showTimePicker ? (
				<DateTimePicker
					testID="dateTimePicker"
					value={startTime.toDate()}
					mode={'time'}
					is24Hour={false}
					onChange={(event: any, selectedDate: any) => {
						console.log(selectedDate);
						setStartTime(moment(selectedDate));
						setShowTimePicker(false);
					}}
				/>
			) : (
				<Formik
					initialValues={{
						title: '',
						description: '',
						location: ''
						// tags: [ 'Badminton', 'Study', 'Cricket', 'Party' ],
					}}
					onSubmit={() => {}}
					validationSchema={CreateEventSchema}
					height="full"
					enableReinitialize={true}
				>
					{(formikProps) => (
						<VStack space="15px" width="full">
							<TextInput label="Title" name="title" formikProps={formikProps} fontSize="2xl" />
							<TextInput label="Description" name="description" formikProps={formikProps} multiline />
							<HStack justifyContent="space-between">
								<TimeCard onPress={() => setShowTimePicker(true)} time={startTime} label="From" />
								<TimeCard time={endTime} label="To" />
							</HStack>
							<TextInput label="Location" name="location" formikProps={formikProps} />
							<Pressable onPress={() => setShowSearchChips(true)}>
								<VStack
									borderWidth={1}
									borderColor="border.light"
									bgColor="background"
									rounded="2xl"
									px={5}
									py={3}
									space={2}
								>
									<HStack justifyContent="space-between" alignItems="center">
										<Text fontSize="xs" color="text.secondary">
											Tags
										</Text>
										<Icon
											as={<FontAwesome5 onPress={() => {}} name="arrow-right" />}
											size={5}
											color="black"
										/>
									</HStack>

									<HStack flexWrap="wrap">
										{selectedTags.map((tag: string, index: number) => (
											<Chip
												key={index}
												color={colors.cards[index % Object.keys(colors.cards).length]}
												label={tag}
											/>
										))}
									</HStack>
								</VStack>
							</Pressable>
							<ImagePicker />

							<Button width="100%">Create</Button>

							{/* <SelectableChips initialChips={["Person", "Chair","Coma","Dog"]} onChangeChips={(chips : any) => console.log(chips)} alertRequired={false}/> */}
						</VStack>
					)}
				</Formik>
			)}
		</Screen>
	);
};

export default CreateEventScreen;
