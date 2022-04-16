import React, { useState } from 'react';
import * as ExpoImagePicker from 'expo-image-picker';
import { AspectRatio, Button, Image, Text, Pressable } from 'native-base';

interface ImagePickerProps {
	imagePath: string;
	setImage: Function;
	setImagePath: Function;
}

const ImagePicker = (props: ImagePickerProps) => {
	const pickImage = async () => {
		// No permissions request is necessary for launching the imagePath library
		let result = await ExpoImagePicker.launchImageLibraryAsync({
			mediaTypes: ExpoImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [ 4, 3 ],
			base64: true,
			quality: 1
		});

		// console.log(result);

		if (!result.cancelled) {
			// console.log(result);
			props.setImagePath(result.uri);
			props.setImage(`data:image/jpg;base64,${result.base64}`);
		}
	};
	return (
		<AspectRatio
			width="full"
			ratio={{
				base: 4 / 3,
				md: 4 / 3
			}}
		>
			<Button
				onPress={pickImage}
				shadow={0}
				borderWidth={1}
				borderColor="border.light"
				bgColor="background"
				color="black"
				p={0}
			>
				{props.imagePath ? (
					<AspectRatio
						width="full"
						ratio={{
							base: 4 / 3,
							md: 4 / 3
						}}
					>
						<Image
							source={{
								uri: props.imagePath
							}}
							alt="Event Card Image"
						/>
					</AspectRatio>
				) : (
					<Text fontSize="lg">Pick Image</Text>
				)}
			</Button>
		</AspectRatio>
	);
};

export default ImagePicker;
