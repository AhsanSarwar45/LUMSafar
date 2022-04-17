import React, { useState } from 'react';
import * as ExpoImagePicker from 'expo-image-picker';
import { AspectRatio, Button, Image, Text, Pressable } from 'native-base';

interface ImagePickerProps {
	imagePath: string;
	setImage: Function;
	setImagePath: Function;
	rounded: string | number;
	ratioX: number;
	ratioY: number;
	width: string | number;
}

const ImagePicker = (props: ImagePickerProps) => {
	const pickImage = async () => {
		// No permissions request is necessary for launching the imagePath library
		let result = await ExpoImagePicker.launchImageLibraryAsync({
			mediaTypes: ExpoImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [ props.ratioX, props.ratioY ],
			base64: true,
			quality: 0.2
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
			width={props.width}
			ratio={{
				base: props.ratioX / props.ratioY,
				md: props.ratioX / props.ratioY
			}}
		>
			<Button
				onPress={pickImage}
				shadow={0}
				borderWidth={1}
				borderColor="border.light"
				bgColor="background"
				color="black"
				rounded={props.rounded}
				p={0}
			>
				{props.imagePath ? (
					<AspectRatio
						width={'full'}
						ratio={{
							base: props.ratioX / props.ratioY,
							md: props.ratioX / props.ratioY
						}}
					>
						<Image
							rounded={props.rounded}
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

ImagePicker.defaultProps = {
	rounded: '2xl',
	ratioX: 4,
	ratioY: 3,
	width: 'full'
};

export default ImagePicker;
