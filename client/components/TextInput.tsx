import React from 'react';
import { Input, Text, VStack, Icon } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import ErrorMessage from './ErrorMessage';

interface TextInputProps {
	label: string;
	placeholder: string;
	name: string;
	isRequired: boolean;
	isPassword: boolean;
	formikProps: any;
}

const TextInput = (props: TextInputProps) => {
	const [ show, setShow ] = React.useState(false);
	const [ isFocused, setFocused ] = React.useState(false);
	const handleClick = () => setShow(!show);

	return (
		<VStack
			shadow={isFocused ? 2 : 0}
			borderWidth={isFocused ? 0 : 1}
			borderColor="border.light"
			bgColor="background"
			space={0}
			rounded="2xl"
			px={5}
			py={3}
		>
			<Text margin={0} color="text.secondary" fontSize={12} fontWeight="bold">
				{props.label}
			</Text>
			<Input
				px={0}
				py={0}
				type={props.isPassword ? show ? 'text' : 'password' : 'text'}
				size="xs"
				variant="Unstyled"
				fontSize="md"
				onBlur={() => {
					props.formikProps.handleBlur(props.name);
					setFocused(false);
				}}
				onChangeText={props.formikProps.handleChange(props.name)}
				value={props.formikProps.values[props.name]}
				onFocus={() => setFocused(true)}
				placeholder={props.placeholder}
				placeholderTextColor="text.inactive"
				InputRightElement={
					props.isPassword ? (
						<Icon
							as={show ? <MaterialIcons name="visibility" /> : <MaterialIcons name="visibility-off" />}
							color="text.secondary"
							size={5}
							onPress={handleClick}
						/>
					) : (
						<Icon size={0} />
					)
				}
			/>
			<ErrorMessage
				fontSize={10}
				show={props.name in props.formikProps.errors && props.formikProps.touched[props.name]}
			>
				{props.formikProps.errors[props.name]}
			</ErrorMessage>
		</VStack>
	);
};

TextInput.defaultProps = {
	name: '',
	placeholder: '',
	isRequired: false,
	isPassword: false
};

export default TextInput;
