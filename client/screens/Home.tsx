import * as React from 'react';
import { Dimensions } from 'react-native';
import { TabView, SceneMap, SceneRendererProps } from 'react-native-tab-view';
import { Center, HStack } from 'native-base';
import { Box, Pressable, Icon, useTheme } from 'native-base';
import { NavigationState, Route } from 'react-native-tab-view';

import DrawerVector from '../assets/vector/Drawer.svg';
import DrawerFlatVector from '../assets/vector/DrawerFlat.svg';
import TabIcon from '../components/TabIcon';
import { EventsTab } from './tabs/Events';
import MapTab from './tabs/Map';

import { useEffect, useState } from 'react';

import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../config/RouteParams';
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import CAB from '../components/CAB';
// import {BottomTabBarP}

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
		This is Tab 4
	</Center>
);

const initialLayout = {
	width: Dimensions.get('window').width
};

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const TabNavigator = createBottomTabNavigator();

export const Home = (props: HomeScreenProps) => {
	interface NaveIconSetProps {
		routeSet: any;
		offset: number;
	}

	interface CABInterface {
		icon: 'Add' | 'Search';
		onPress: Function;
	}

	interface Tab {
		name: string;
		component: any;
		cab: CABInterface;
	}

	const tabs: Array<Tab> = [
		{
			name: 'Events',
			component: EventsTab,
			cab: {
				icon: 'Add',
				onPress: () => {
					props.navigation.navigate('CreateEvent');
				}
			}
		},
		{
			name: 'Map',
			component: MapTab,
			cab: {
				icon: 'Search',
				onPress: () => {}
			}
		},
		{
			name: 'Spaces',
			component: ThirdRoute,
			cab: {
				icon: 'Add',
				onPress: () => {}
			}
		},
		{
			name: 'Connect',
			component: FourthRoute,
			cab: {
				icon: 'Search',
				onPress: () => {}
			}
		}
	];

	const NavBar2 = ({ state, descriptors, navigation }: BottomTabBarProps) => {
		const [ firstHalf ] = useState(state.routes.slice(0, 2));
		const [ secondHalf ] = useState(state.routes.slice(2));

		const { borderRadius, colors } = useTheme();
		const cabSize = 15;

		const NavIconSet = (props: NaveIconSetProps) => {
			return (
				<HStack>
					{props.routeSet.map((route: any, index: number) => {
						const { options } = descriptors[route.key];

						const isFocused = state.index === index + props.offset;

						const onPress = () => {
							const event = navigation.emit({
								type: 'tabPress',
								target: route.key,
								canPreventDefault: true
							});

							if (!isFocused && !event.defaultPrevented) {
								navigation.navigate(route.name);
							}
						};

						const onLongPress = () => {
							navigation.emit({
								type: 'tabLongPress',
								target: route.key
							});
						};

						const color = isFocused ? 'white' : 'rgba(255, 255, 255,0.5)';
						return (
							<Pressable
								alignItems="center"
								py="2"
								px="4"
								testID={options.tabBarTestID}
								key={route.key}
								onPress={onPress}
							>
								<TabIcon iconName={route.name} color={color} size={32} />
								{/* {route.title} */}
							</Pressable>
						);
					})}
				</HStack>
			);
		};

		return (
			<Box
				// bgColor="red.500"
				position="absolute"
				bottom={0}
				width="100%"

				// p={0}
				// m={0}
			>
				<CAB icon={tabs[state.index].cab.icon} onPress={tabs[state.index].cab.onPress} />
				<Box position="absolute" bottom={0} left={2}>
					<DrawerFlatVector width={initialLayout.width - 16} fill={colors.accent} />
				</Box>
				<HStack justifyContent="space-between" px="5%" py="5px">
					<NavIconSet routeSet={firstHalf} offset={0} />
					<NavIconSet routeSet={secondHalf} offset={2} />
				</HStack>
			</Box>
		);
	};

	return (
		<TabNavigator.Navigator tabBar={(props) => <NavBar2 {...props} />}>
			{tabs.map((tab: Tab, index: number) => (
				<TabNavigator.Screen
					key={index}
					options={{ headerShown: false }}
					name={tab.name}
					component={tab.component}
				/>
			))}
		</TabNavigator.Navigator>
	);
};
