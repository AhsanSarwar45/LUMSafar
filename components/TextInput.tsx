import React from 'react';
import { Box, Input, Text, VStack } from 'native-base';

interface TextInputProps {
	label: string;
	placeholder: string;
}

export const TextInput = (props: TextInputProps) => {
	return (
		<VStack paddingLeft="10px" paddingRight="10px" paddingBottom="5px">
			<Text margin={0} color="rgba(255, 255, 255, 0.5)" fontWeight="bold" paddingLeft={6}>
				{props.label}
			</Text>
			<Input
				bg="rgba(255, 255, 255, 0.2)"
				variant="filled"
				borderRadius={100}
				paddingLeft={6}
				paddingTop={3}
				paddingBottom={3}
				margin="5px"
				fontWeight="bold"
				fontSize="lg"
				// shadow="4"
				// style={{ color: 'rgba(255, 255, 255, 0.5)' }}
				placeholder={props.placeholder}
				placeholderTextColor="rgba(255, 255, 255, 0.5)"
			/>
		</VStack>
	);
};
