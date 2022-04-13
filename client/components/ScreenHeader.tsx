import { HStack, Icon, Heading } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

interface ScreenHeaderProps {
	text: string;
	backButton: boolean;
	onBackButton: Function;
}

const ScreenHeader = (props: ScreenHeaderProps) => {
	const navigation = useNavigation();
	return (
		<HStack alignItems="center" width="full" space={5}>
			{props.backButton ? (
				<Icon
					as={
						<FontAwesome5
							onPress={() => (props.onBackButton ? props.onBackButton() : navigation.goBack())}
							name="arrow-left"
						/>
					}
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
	backButton: false,
	onBackButton: null
};

export default ScreenHeader;
