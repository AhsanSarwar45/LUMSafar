import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Heading, VStack, Button, Text, Image, HStack, useTheme, Icon, Pressable, useToast } from 'native-base';
import React, { useContext, useState } from 'react';
import Axios from 'axios';
import * as Yup from 'yup';

import { LUMSAFAR_SERVER_URL } from '@env';

import Screen from '../components/Screen';
import TextInput from '../components/TextInput';
import { RootStackParamList } from '../config/RouteParams';
import { ProfilePlaceholder } from '../assets/images';
import { UserDataContext } from '../data/UserDataContext';
import Chip from '../components/Chip';
import { Ionicons } from '@expo/vector-icons';
import * as ExpoImagePicker from 'expo-image-picker';
import { JsonHeader } from '../config/ControlHeader';
import { ShowToast } from '../components/Toast';
import ScreenHeader from '../components/ScreenHeader';
import { Formik } from 'formik';
import ImagePicker from '../components/ImagePicker';
import { UserData } from '../interfaces/UserData';
import { StoreUserData } from '../data/AsyncStorage';

type EditProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'EditProfile'>;

const EditProfileScreen = (props: EditProfileScreenProps) => {
	const { userData, setUserData } = useContext(UserDataContext);
	const { colors } = useTheme();
	const [ profilePicture, setProfilePicture ] = useState(userData.profilePicPath);
	const toast = useToast();
	// const [ isSubmitting, setSubmitting ] = useState(false);

	function SaveUserData(newData: any, formikProps: any) {
		if (newData.bio.length === 0) {
			newData.bio = 'Empty';
		}

		// console.log(responseData);
		let dataCopy = userData;
		dataCopy.username = newData.username;
		dataCopy.bio = newData.bio;
		dataCopy.profilePicPath = newData.profilePicPath;

		// console.log(data);
		Axios.post(`${LUMSAFAR_SERVER_URL}/users/update/${userData._id}`, dataCopy, {
			headers: JsonHeader
		})
			.then((response) => {
				if (response.data === 'success') {
					formikProps.setSubmitting(false);

					setUserData(dataCopy);
					StoreUserData(newData, () => {});
					ShowToast(toast, 'Profile updated! 🚀', 'success');
				} else {
					ShowToast(toast, "We couldn't connect to our servers 😔", 'failure');
					formikProps.setSubmitting(false);
				}
			})
			.catch((response) => {
				formikProps.setSubmitting(false);
				ShowToast(toast, "We couldn't connect to our servers 😔", 'failure');
			});
	}

	function SaveProfile(newData: any, formikProps: any) {
		if (userData.profilePicPath !== newData.profilePicPath) {
			const cloudName = 'lumsafar';
			const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

			let fileData = {
				file: newData.profilePicBase64,
				upload_preset: 'lumsafar_cloudinary'
			};

			fetch(url, {
				body: JSON.stringify(fileData),
				headers: {
					'content-type': 'application/json'
				},
				method: 'POST'
			})
				.then(async (response) => {
					let responseData = await response.json();
					newData.profilePicPath = responseData.secure_url;
					SaveUserData(newData, formikProps);
				})
				.catch((response) => {
					ShowToast(toast, "We couldn't connect to our servers 😔", 'failure');
					formikProps.setSubmitting(false);
				});
		} else {
			SaveUserData(newData, formikProps);
		}
	}

	const EditProfileSchema = Yup.object().shape({
		username: Yup.string().required('Required')
	});

	return (
		<Screen
			lightScreen
			scrollType="keyboardAware"
			header={<ScreenHeader text={'Edit Profile'} backButton icons={[]} />}
		>
			<Formik
				initialValues={{
					username: userData.username,
					bio: userData.bio,
					profilePicPath: userData.profilePicPath,
					profilePicBase64: userData.profilePicBase64
				}}
				onSubmit={SaveProfile}
				validationSchema={EditProfileSchema}
				height="full"
				enableReinitialize={true}
			>
				{(formikProps) => (
					<VStack space="15px" width="full" alignItems="center">
						{/* <Text>{formikProps.values.profilePicPath}</Text> */}
						<ImagePicker
							rounded="full"
							ratioX={1}
							ratioY={1}
							width="60%"
							imagePath={formikProps.values.profilePicPath}
							setImage={(imageBase64: string) => {
								formikProps.setFieldValue('profilePicBase64', imageBase64);
							}}
							setImagePath={(imagePath: string) => {
								formikProps.setFieldValue('profilePicPath', imagePath);
							}}
						/>

						<TextInput label="Name" name="username" formikProps={formikProps} fontSize="xl" />
						<TextInput label="Bio" name="bio" formikProps={formikProps} multiline />

						<Button
							disabled={formikProps.isSubmitting}
							onPress={() => {
								formikProps.handleSubmit();
							}}
							width="100%"
							isLoading={formikProps.isSubmitting}
							isLoadingText="Saving"
						>
							Save
						</Button>

						{/* <SelectableChips initialChips={["Person", "Chair","Coma","Dog"]} onChangeChips={(chips : any) => console.log(chips)} alertRequired={false}/> */}
					</VStack>
				)}
			</Formik>
		</Screen>
	);
};

export default EditProfileScreen;
