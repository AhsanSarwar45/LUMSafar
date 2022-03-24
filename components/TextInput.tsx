import React, { FunctionComponent } from 'react';
import { Box, Input, Text, VStack, Icon, FormControl, HStack } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { Shadow } from 'react-native-shadow-2';

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
	const [ isFocused, setFocused ] = React.useState(false);
	const handleClick = () => setShow(!show);

	return (
		<FormControl isRequired isInvalid={props.isInvalid && props.isTouched}>
			<Shadow
				startColor={'rgba(0, 0, 1, 0.03)'}
				offset={isFocused ? [ 0, 3 ] : [ 0, 0 ]}
				distance={isFocused ? 6 : 0}
				radius={20}
				viewStyle={{ alignSelf: 'stretch' }}
			>
				<VStack
					borderWidth={isFocused ? 0 : 1}
					borderColor="rgba(0, 0, 0, 0.06)"
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
							props.handleBlur(props.name);
							setFocused(false);
						}}
						onChangeText={props.handleChange(props.name)}
						value={props.value}
						onFocus={() => setFocused(true)}
						color="rgba(0, 0, 0, 1)"
						// shadow="cardLight"
						placeholder={props.placeholder}
						placeholderTextColor="rgba(0, 0, 0, 0.2)"
						InputRightElement={
							props.isPassword ? (
								<Icon
									as={
										show ? (
											<MaterialIcons name="visibility" />
										) : (
											<MaterialIcons name="visibility-off" />
										)
									}
									color="rgba(0, 0, 0, 0.4)"
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
			</Shadow>
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
