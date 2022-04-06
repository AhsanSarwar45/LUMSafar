import React, { FunctionComponent } from 'react';
import { Box, Input, Text, VStack, Icon, FormControl, HStack } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { Shadow } from 'react-native-shadow-2';
import { FormikProps } from 'formik';

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

	var InputInner = (
		<VStack
			shadow={isFocused ? 5 : 0}
			borderWidth={isFocused ? 0 : 1}
			borderColor="rgba(0, 0, 0, 0.08)"
			space={0}
			bg="rgba(255, 255, 255, 1)"
			borderRadius={20}
			px={5}
			py={3}
		>
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
				onBlur={() => {
					props.formikProps.handleBlur(props.name);
					setFocused(false);
				}}
				onChangeText={props.formikProps.handleChange(props.name)}
				value={props.formikProps.values[props.name]}
				onFocus={() => setFocused(true)}
				color="rgba(0, 0, 0, 1)"
				placeholder={props.placeholder}
				placeholderTextColor="rgba(0, 0, 0, 0.2)"
				InputRightElement={
					props.isPassword ? (
						<Icon
							as={show ? <MaterialIcons name="visibility" /> : <MaterialIcons name="visibility-off" />}
							color="rgba(0, 0, 0, 0.4)"
							size={5}
							onPress={handleClick}
						/>
					) : (
						<Icon size={0} />
					)
				}
			/>
			<FormControl.ErrorMessage
				my={0}
				_text={{
					fontWeight: 'bold',
					fontSize: 10
				}}
			>
				{props.formikProps.errors[props.name]}
			</FormControl.ErrorMessage>
		</VStack>
	);

	return (
		<FormControl
			isRequired
			isInvalid={props.name in props.formikProps.errors && props.formikProps.touched[props.name]}
		>
			{/* {isFocused ? (
				<Shadow
					startColor={'rgba(0, 0, 1, 0.1)'}
					offset={[ 0, 3 ]}
					distance={6}
					radius={20}
					viewStyle={{ alignSelf: 'stretch' }}
				>
					{InputInner}
				</Shadow>
			) : ( */}
			{InputInner}
			{/* )} */}
		</FormControl>
	);
};

TextInput.defaultProps = {
	name: '',
	placeholder: '',
	isRequired: false,
	isPassword: false
};

export default TextInput;
