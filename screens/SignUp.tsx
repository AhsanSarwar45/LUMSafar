import React from 'react';
import { Flex, VStack } from 'native-base';

import { TextInput } from '../components/TextInput';

export const SignUp = () => {
	return (
		<Flex
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
		>
			<VStack top="30%" padding="10px">
				<TextInput label="Username" text="Hello" />
				<TextInput label="Email" text="Hello" />
				<TextInput label="Password" text="Hello" />
			</VStack>
		</Flex>
	);
};
