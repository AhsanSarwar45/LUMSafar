import React, { FunctionComponent } from 'react';
import { Box, Input, Text, VStack, Icon, FormControl, HStack } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

interface TextInputProps {
	label: string;
	value: string;
	placeholder: string;
	name: string;
	error: string;
	isInvalid: boolean;
	isTouched: boolean;
	isRequired: boolean;
	handleBlur: Function;
	handleChange: Function;
	isPassword: boolean;
}

export const TextInput = (props: TextInputProps) => {
	const [ show, setShow ] = React.useState(false);

	const handleClick = () => setShow(!show);

	return (
		<FormControl isRequired isInvalid={props.isInvalid && props.isTouched}>
			<VStack space={0} bg="rgba(0, 0, 0, 0.05)" borderRadius={25} px={5} py={3}>
				<Text margin={0} color="rgba(0, 0, 0, 0.4)" fontSize={12} fontWeight="bold">
					{props.label}
				</Text>
				<Input
					px={0}
					py={0}
					type={props.isPassword ? show ? 'text' : 'password' : 'text'}
					size="xs"
					variant="Unstyled"
					fontWeight={700}
					fontSize="md"
					onBlur={props.handleBlur(props.name)}
					onChangeText={props.handleChange(props.name)}
					value={props.value}
					_focus={{
						borderWidth: 0,
						borderColor: 'rgba(0, 0, 0, 0.4)'
					}}
					color="rgba(0, 0, 0, 1)"
					// shadow="cardLight"
					placeholder={props.placeholder}
					placeholderTextColor="rgba(0, 0, 0, 0.4)"
					InputRightElement={
						props.isPassword ? (
							<Icon
								as={
									show ? <MaterialIcons name="visibility" /> : <MaterialIcons name="visibility-off" />
								}
								color="rgba(0, 0, 0, 1)"
								size={5}
								onPress={handleClick}
							/>
						) : (
							<Icon size={0} />
						)
					}
				/>
				<FormControl.ErrorMessage my={0} fontWeight="bold">
					{props.error}
				</FormControl.ErrorMessage>
			</VStack>
		</FormControl>
	);
};

TextInput.defaultProps = {
	name: '',
	error: '',
	placeholder: '',
	isInvalid: false,
	isRequired: false,
	isTouched: false,
	isPassword: false,
	handleBlur: (key: String) => {},
	handleChange: (key: String) => {}
};
