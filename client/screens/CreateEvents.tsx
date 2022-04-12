import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AppLoading from 'expo-app-loading';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import { View, VStack } from 'native-base';
import React from 'react';
import { OptimizedHeavyScreen } from 'react-navigation-heavy-screen';
import Screen from '../components/Screen';
import TextInput from '../components/TextInput';
import { RootStackParamList } from '../config/RouteParams';
import ErrorMessage from '../components/ErrorMessage';

type CreateEventScreenProps = NativeStackScreenProps<RootStackParamList, 'CreateEvent'>;

interface CreateEventData {
	title?: string;
	description?: string;
	location?: string;
}

const CreateEventScreen = (props: CreateEventScreenProps) => {
	const Validate = (values: CreateEventData) => {
		const errors: CreateEventData = {};

		return errors;
	};

	return (
		<View>
			<AppLoading />
			<OptimizedHeavyScreen>
				<KeyboardAwareScrollView>
					<Formik
						initialValues={{
							title: '',
							description: '',
							location: ''
						}}
						onSubmit={() => {}}
						validate={Validate}
						height="full"
					>
						{(formikProps) => (
							<Screen backButton heading="Create Event">
								<VStack space="15px" width="full">
									<TextInput label="Title" name="title" formikProps={formikProps} fontSize="2xl" />
									<TextInput
										label="Description"
										name="description"
										formikProps={formikProps}
										multiline
									/>
									<TextInput label="Location" name="location" formikProps={formikProps} />
								</VStack>
							</Screen>
						)}
					</Formik>
				</KeyboardAwareScrollView>
			</OptimizedHeavyScreen>
		</View>
	);
};

export default CreateEventScreen;
