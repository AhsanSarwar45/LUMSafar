import React from 'react';
import {
	Text,
	Link,
	HStack,
	Center,
	Heading,
	Switch,
	useColorMode,
	NativeBaseProvider,
	extendTheme,
	VStack,
	Code,
	Box,
	Flex
} from 'native-base';

export const SignUp = () => {
	return (
		<Box
			bg={{
				linearGradient: {
					colors: [ '#5D429D', '#28BDD7' ],
					start: [ -0.5, 0 ],
					end: [ 1.5, 0 ]
				}
			}}
			_text={{
				fontSize: 'md',
				fontWeight: 'bold',
				color: 'white'
			}}
			height="full"
			width="full"
		/>
	);
};
