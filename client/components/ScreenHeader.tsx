import { HStack, Icon, Heading } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';

interface ScreenHeaderProps {
	text: string;
	navigation: any;
	backButton: boolean;
}

const ScreenHeader = (props: ScreenHeaderProps) => {
	return (
		<HStack alignItems="center" width="full" space={5} pt="8%">
			{props.backButton ? (
				<Icon
					as={<FontAwesome5 onPress={() => props.navigation.goBack()} name="arrow-left" />}
					size={6}
					color="black"
				/>
			) : null}

			<Heading py="0px" mt={1}>
				{props.text}
			</Heading>
		</HStack>
	);
};

ScreenHeader.defaultProps = {
	text: '',
	backButton: false
};

export default ScreenHeader;
