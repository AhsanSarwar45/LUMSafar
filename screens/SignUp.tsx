import React from 'react';
import { Flex, VStack, useTheme } from 'native-base';

import { TextInput } from '../components/TextInput';

export const SignUp = () => {
	const { gradient } = useTheme();

	return (
		<Flex
			bg={{
				linearGradient: {
					colors: [ gradient.start, gradient.end ],
					start: [ -0.5, 0 ],
					end: [ 1.75, 0 ]
				}
			}}
			height="full"
			width="full"
		>
			<VStack top="30%" padding="10px">
				<TextInput label="Username" placeholder="" />
				<TextInput label="Email" placeholder="example@site.com" />
				<TextInput label="Password" placeholder="" />
			</VStack>
		</Flex>
	);
};
