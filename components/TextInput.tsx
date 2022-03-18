import React from 'react';
import { Box, Text, VStack } from 'native-base';

interface TextInputProps {
	label: string;
	text: string;
}

export const TextInput = (props: TextInputProps) => {
	return (
		<VStack paddingLeft="10px" paddingRight="10px" paddingBottom="5px">
			<Text margin={0} color="rgba(255, 255, 255, 0.5)" fontWeight="bold" paddingLeft={6}>
				{props.label}
			</Text>
			<Box
				bg="rgba(255, 255, 255, 0.2)"
				borderRadius={100}
				paddingLeft={6}
				paddingTop={3}
				paddingBottom={3}
				margin="5px"
				// shadow="1"
				_text={{
					fontSize: 'md',
					fontWeight: 'bold',
					color: 'white'
				}}
			>
				{props.text}
			</Box>
		</VStack>
	);
};
