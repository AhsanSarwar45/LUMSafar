import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AppLoading from 'expo-app-loading';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import { HStack, Icon, View, VStack, Text, useTheme, Button } from 'native-base';
import React from 'react';
import { OptimizedHeavyScreen } from 'react-navigation-heavy-screen';
import Screen from '../components/Screen';
import TextInput from '../components/TextInput';
import { RootStackParamList } from '../config/RouteParams';
import ErrorMessage from '../components/ErrorMessage';
import { FontAwesome5 } from '@expo/vector-icons';
import Chip from '../components/Chip';
import TimeCard from '../components/TimeCard';
import moment from 'moment';
import ImagePicker from '../components/ImagePicker';

// import SelectableChips from 'react-native-chip/SelectableChips'

type CreateEventScreenProps = NativeStackScreenProps<RootStackParamList, 'CreateEvent'>;

interface CreateEventData {
	title?: string;
	description?: string;
	location?: string;
	tags?: Array<string>;
	startTime?: moment.Moment;
	endTime?: moment.Moment;
}

const Tags = [ 'Badminton', 'Study', 'Cricket', 'Party', 'Music', 'Concert', 'Shugul', 'Sports Fest' ];

const CreateEventScreen = (props: CreateEventScreenProps) => {
	const { colors } = useTheme();

	const Validate = (values: CreateEventData) => {
		const errors: CreateEventData = {};

		return errors;
	};

	return (
		<View>
			<AppLoading />
			<OptimizedHeavyScreen>
				<Screen backButton keyboardAware heading="Create Event">
					<Formik
						initialValues={{
							title: '',
							description: '',
							location: '',
							tags: [ 'Badminton', 'Study', 'Cricket', 'Party' ],
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
									<HStack flexWrap="wrap">
										{formikProps.values.tags.map((tag: string, index: number) => (
											<Chip
												key={index}
												color={colors.cards[index % Object.keys(colors.cards).length]}
												label={tag}
											/>
										))}
									</HStack>
								</VStack>
								<ImagePicker />
								<Button width="100%">Create</Button>

								{/* <SelectableChips initialChips={["Person", "Chair","Coma","Dog"]} onChangeChips={(chips : any) => console.log(chips)} alertRequired={false}/> */}
							</VStack>
						)}
					</Formik>
				</Screen>
			</OptimizedHeavyScreen>
		</View>
	);
};

export default CreateEventScreen;
