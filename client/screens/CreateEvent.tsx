import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import { VStack, Button } from 'native-base';
import React from 'react';
import * as Yup from 'yup';

import ImagePicker from '../components/ImagePicker';
import Screen from '../components/Screen';
import TextInput from '../components/TextInput';
import { RootStackParamList } from '../config/RouteParams';

type CreateEventScreenProps = NativeStackScreenProps<RootStackParamList, 'CreateEvent'>;

const Tags = [ 'Badminton', 'Study', 'Cricket', 'Party', 'Music', 'Concert', 'Shugul', 'Sports Fest' ];

const CreateEventScreen = (props: CreateEventScreenProps) => {
	const { data } = props.route.params;

	const CreateEventSchema = Yup.object().shape({
		title: Yup.string().required('Required'),
		location: Yup.string().required('Required')
	});

	const Submit = (values: any, formikProps: any) => {
		let eventData = data;
		data.title = values.title;
		data.description = values.description;
		data.location = values.location;
		data.imagePath = formikProps.values.imagePath;
		props.navigation.navigate('CreateEventTags', {
			data: eventData
		});
	};

	return (
		<Screen backButton scrollType="keyboardAware" heading="Create Event">
			<Formik
				initialValues={{
					title: data.title,
					description: data.description,
					location: data.location,
					imagePath: data.imagePath
				}}
				onSubmit={Submit}
				validationSchema={CreateEventSchema}
				height="full"
				enableReinitialize={true}
			>
				{(formikProps) => (
					<VStack space="15px" width="full">
						<TextInput label="Title" name="title" formikProps={formikProps} fontSize="2xl" />
						<TextInput label="Description" name="description" formikProps={formikProps} multiline />

						<TextInput label="Location" name="location" formikProps={formikProps} />

						<ImagePicker
							imagePath={formikProps.values.imagePath}
							setImage={(imagePath: string) => {
								formikProps.setFieldValue('imagePath', imagePath);
							}}
						/>

						<Button width="100%" onPress={() => formikProps.handleSubmit()}>
							Next
						</Button>

						{/* <SelectableChips initialChips={["Person", "Chair","Coma","Dog"]} onChangeChips={(chips : any) => console.log(chips)} alertRequired={false}/> */}
					</VStack>
				)}
			</Formik>
		</Screen>
	);
};

export default CreateEventScreen;
