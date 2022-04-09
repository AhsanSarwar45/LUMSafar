import * as React from 'react';
import { Dimensions, StatusBar } from 'react-native';
import { TabView, SceneMap, SceneRendererProps } from 'react-native-tab-view';
import { Center } from 'native-base';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Box, Pressable, Icon, useTheme } from 'native-base';
import { NavigationState, Route } from 'react-native-tab-view';
import { Events } from './tabs/Events';

import MapIcon from '../assets/icons/MapIcon.svg';
import TabIcon from '../components/TabIcon';

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
	const [ index, setIndex ] = React.useState(0);
	const [ routes ] = React.useState([
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

	const NavBar = (props: SceneRendererProps & { navigationState: NavigationState<Route> }) => {
		const { borderRadius } = useTheme();
		return (
			<Box flexDirection="row" roundedTop={borderRadius} bgColor="primary.500">
				{props.navigationState.routes.map((route: any, i: number) => {
					const color = index === i ? 'white' : 'rgba(255, 255, 255,0.5)';
					return (
						<Box key={route.key} flex={1} alignItems="center" p="4">
							<Pressable
								onPress={() => {
									console.log(i);
									setIndex(i);
								}}
							>
								<TabIcon iconName={route.icon} color={color} size={36} />
								{/* {route.title} */}
							</Pressable>
						</Box>
					);
				})}
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
