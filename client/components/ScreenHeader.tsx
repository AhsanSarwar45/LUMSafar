import { HStack, Icon, Heading, Spacer } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import React, { ReactNode } from 'react';
import { useNavigation } from '@react-navigation/native';

interface ScreenHeaderProps {
	text: string;
	backButton: boolean;
	onBackButton: Function;
	icons: Array<ReactNode>;
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
			<Spacer />
			{props.icons.map((icon: ReactNode, index: number) => {
				return <Icon key={index} as={icon} size={6} color="black" />;
			})}
		</HStack>
	);
};

ScreenHeader.defaultProps = {
	text: '',
	backButton: false,
	onBackButton: null,
	icons: []
};

export default ScreenHeader;
