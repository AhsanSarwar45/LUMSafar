import * as React from 'react';
import { Dimensions, StatusBar } from 'react-native';
import { TabView, SceneMap, SceneRendererProps } from 'react-native-tab-view';
import { Center, HStack } from 'native-base';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Box, Pressable, Icon, useTheme } from 'native-base';
import { NavigationState, Route } from 'react-native-tab-view';
import { Shadow } from 'react-native-shadow-2';

import DrawerVector from '../assets/vector/Drawer.svg';
import TabIcon from '../components/TabIcon';
import { Events } from './tabs/Events';
import { useState } from 'react';
import PlusIcon from '../assets/icons/PlusIcon.svg';
import MicIcon from '../assets/icons/MicIcon.svg';

const SecondRoute = () => (
	<Center flex={1} my="4">
		This is Tab 2
	</Center>
);

const ThirdRoute = () => (
	<Center flex={1} my="4">
		This is Tab 3
	</Center>
);

const FourthRoute = () => (
	<Center flex={1} my="4">
		This is Tab 4{' '}
	</Center>
);

const initialLayout = {
	width: Dimensions.get('window').width
};
const renderScene = SceneMap({
	events: Events,
	map: SecondRoute,
	spaces: ThirdRoute,
	connect: FourthRoute
});

export const Home = () => {
	const [ index, setIndex ] = useState(0);
	const [ routes ] = useState([
		{
			key: 'events',
			icon: 'Events'
		},
		{
			key: 'map',
			icon: 'Map'
		},
		{
			key: 'spaces',
			icon: 'Spaces'
		},
		{
			key: 'connect',
			icon: 'Connect'
		}
	]);

	const [ firstHalf ] = useState(routes.slice(0, 2));
	const [ secondHalf ] = useState(routes.slice(2));

	interface NaveIconSetProps {
		routeSet: any;
		offset: number;
	}

	const NavIconSet = (props: NaveIconSetProps) => {
		return (
			<HStack>
				{props.routeSet.map((route: any, i: number) => {
					const color = index === i + props.offset ? 'white' : 'rgba(255, 255, 255,0.5)';
					return (
						<Pressable
							alignItems="center"
							py="2"
							px="3"
							// flex={1}
							key={route.key}
							onPress={() => {
								setIndex(i + props.offset);
							}}
						>
							<TabIcon iconName={route.icon} color={color} size={36} />
							{/* {route.title} */}
						</Pressable>
					);
				})}
			</HStack>
		);
	};

	const NavBar = (props: SceneRendererProps & { navigationState: NavigationState<Route> }) => {
		const { borderRadius, colors } = useTheme();
		return (
			<Box>
				<Box
					position="absolute"
					width={`${initialLayout.width * 0.16}px`}
					height={`${initialLayout.width * 0.16}px`}
					bottom={'32px'}
					shadow={2}
					left="42%"
					rounded="full"
					bgColor="background"
					justifyContent="center"
					alignItems="center"
				>
					<PlusIcon fill={colors.accent} height={40} width={40} />
				</Box>
				<Box position="absolute" bottom="0px" left={1}>
					<DrawerVector width={initialLayout.width - 8} fill={colors.accent} />
				</Box>
				<HStack justifyContent="space-between" px="5%" py="10px">
					<NavIconSet routeSet={firstHalf} offset={0} />
					<NavIconSet routeSet={secondHalf} offset={2} />
				</HStack>
			</Box>
		);
	};

	return (
		<TabView
			navigationState={{
				index,
				routes
			}}
			renderScene={renderScene}
			renderTabBar={NavBar}
			onIndexChange={setIndex}
			initialLayout={initialLayout}
			tabBarPosition="bottom"
			style={{
				marginTop: StatusBar.currentHeight
			}}
		/>
	);
};
