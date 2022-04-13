import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AppLoading from 'expo-app-loading';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import moment from 'moment';
import { HStack, Icon, View, VStack, Text, useTheme, Button, Pressable, Modal } from 'native-base';
import React, { useState } from 'react';
import { OptimizedHeavyScreen } from 'react-navigation-heavy-screen';
import { FontAwesome5 } from '@expo/vector-icons';

import Chip from '../components/Chip';
import TimeCard from '../components/TimeCard';
import ImagePicker from '../components/ImagePicker';
import Screen from '../components/Screen';
import TextInput from '../components/TextInput';
import { RootStackParamList } from '../config/RouteParams';
import ErrorMessage from '../components/ErrorMessage';
import ChipsSearch from '../components/ChipsSearch';

// import SelectableChips from 'react-native-chip/SelectableChips'

type CreateEventScreenProps = NativeStackScreenProps<RootStackParamList, 'CreateEvent'>;

interface CreateEventData {
	title?: string;
	description?: string;
	location?: string;
	tags?: Array<string>;
	startTime: moment.Moment;
	endTime: moment.Moment;
}

interface CreateEventErrors {
	title?: string;
	description?: string;
	location?: string;
	tags?: string;
	startTime?: string;
	endTime?: string;
}

const Tags = [ 'Badminton', 'Study', 'Cricket', 'Party', 'Music', 'Concert', 'Shugul', 'Sports Fest' ];

const CreateEventScreen = (props: CreateEventScreenProps) => {
	const { colors } = useTheme();
	const [ showModal, setShowModal ] = useState(false);
	const [ selectedTags, setSelectedTags ] = useState<Array<string>>([ 'Badminton', 'Study', 'Cricket', 'Party' ]);

	const Validate = (values: CreateEventData) => {
		const errors: CreateEventErrors = {};

		return errors;
	};

	return (
		<Screen backButton keyboardAware heading="Create Event">
			<Modal isOpen={showModal} onClose={() => setShowModal(false)}>
				<Modal.Content width="90%" rounded="2xl" bgColor="background">
					<Modal.Body>
						<ChipsSearch items={Tags} selectedItems={selectedTags} setSelectedItems={setSelectedTags} />
					</Modal.Body>
					<Modal.Footer bgColor="background">
						<Button.Group space={2}>
							<Button
								variant="unstyled"
								shadow={0}
								// colorScheme="primary"
								_text={{
									color: 'primary.500'
								}}
								onPress={() => {
									setShowModal(false);
								}}
							>
								Cancel
							</Button>
							<Button
								onPress={() => {
									setShowModal(false);
								}}
							>
								Save
							</Button>
						</Button.Group>
					</Modal.Footer>
				</Modal.Content>
			</Modal>
			<Formik
				initialValues={{
					title: '',
					description: '',
					location: '',
					// tags: [ 'Badminton', 'Study', 'Cricket', 'Party' ],
					startTime: moment(),
					endTime: moment().add(1, 'hour')
				}}
				onSubmit={() => {}}
				validate={Validate}
				height="full"
			>
				{(formikProps) => (
					<VStack space="15px" width="full">
						<TextInput label="Title" name="title" formikProps={formikProps} fontSize="2xl" />
						<TextInput label="Description" name="description" formikProps={formikProps} multiline />
						<HStack justifyContent="space-between">
							<TimeCard time={formikProps.values.startTime} label="From" />
							<TimeCard time={formikProps.values.endTime} label="To" />
						</HStack>
						<TextInput label="Location" name="location" formikProps={formikProps} />
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
							<Pressable onPress={() => setShowModal(true)}>
								<HStack flexWrap="wrap">
									{selectedTags.map((tag: string, index: number) => (
										<Chip
											key={index}
											color={colors.cards[index % Object.keys(colors.cards).length]}
											label={tag}
										/>
									))}
								</HStack>
							</Pressable>
						</VStack>
						<ImagePicker />

						<Button width="100%">Create</Button>

						{/* <SelectableChips initialChips={["Person", "Chair","Coma","Dog"]} onChangeChips={(chips : any) => console.log(chips)} alertRequired={false}/> */}
					</VStack>
				)}
			</Formik>
		</Screen>
	);
};

export default CreateEventScreen;
