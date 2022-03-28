import React, { FunctionComponent } from 'react';
// import { Box, Input, Text, VStack, Icon, FormControl, HStack } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { Shadow } from 'react-native-shadow-2';
import { FormikProps } from 'formik';
import { TextInput as Input, Flex, Text, H1, P, View } from 'dripsy';

interface TextInputProps {
	label: string;
	placeholder: string;
	name: string;
	isRequired: boolean;
	isPassword: boolean;
	formikProps: any;
}

export const TextInput = (props: TextInputProps) => {
	const [ show, setShow ] = React.useState(false);
	const [ isFocused, setFocused ] = React.useState(false);
	const handleClick = () => setShow(!show);

	var InputInner = (
		<Flex
			sx={{
				flexDirection: 'column',
				borderWidth: isFocused ? 0 : 1,
				borderColor: 'rgba(0, 0, 0, 0.08)',
				borderRadius: 20,
				bg: 'rgba(255, 255, 255, 1)',
				py: 2,
				px: 3
			}}
		>
			<Text sx={{ color: 'rgba(0, 0, 0, 0.4)', fontSize: 12, fontWeight: 'bold' }}>{props.label}</Text>
			<Input
				sx={{
					fontSize: 20,
					color: 'rgba(0, 0, 0, 1)',
					fontWeight: '700'
				}}
				onBlur={() => {
					props.formikProps.handleBlur(props.name);
					// setFocused(false);
				}}
				onChangeText={props.formikProps.handleChange(props.name)}
				secureTextEntry={props.isPassword && show}
				value={props.formikProps.values[props.name]}
				onFocus={() => {
					// setFocused(true);
				}}
				placeholder={props.placeholder}
				placeholderTextColor="rgba(0, 0, 0, 0.2)"

				// InputRightElement={
				// 	props.isPassword ? (
				// 		<Icon
				// 			as={
				// 				show ? <MaterialIcons name="visibility" /> : <MaterialIcons name="visibility-off" />
				// 			}
				// 			color="rgba(0, 0, 0, 0.4)"
				// 			size={5}
				// 			onPress={handleClick}
				// 		/>
				// 	) : (
				// 		<Icon size={0} />
				// 	)
				// }
			/>
			{props.name in props.formikProps.errors && props.formikProps.touched[props.name] ? (
				<Text>{props.formikProps.errors[props.name]}</Text>
			) : null}
		</Flex>
	);

	return (
		// <FormControl
		// 	isRequired
		// 	isInvalid={props.name in props.formikProps.errors && props.formikProps.touched[props.name]}
		// >
		<View sx={{ my: 1 }}>
			{isFocused ? (
				<Shadow
					startColor={'rgba(0, 0, 1, 0.1)'}
					offset={[ 0, 3 ]}
					distance={6}
					radius={20}
					viewStyle={{ alignSelf: 'stretch' }}
				>
					{InputInner}
				</Shadow>
			) : (
				InputInner
			)}
		</View>
		// </FormControl>
	);
};

TextInput.defaultProps = {
	name: '',
	placeholder: '',
	isRequired: false,
	isPassword: false
};
