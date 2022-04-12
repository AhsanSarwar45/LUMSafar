import * as React from 'react';
import { Dimensions, StatusBar, TouchableOpacity } from 'react-native';
import { TabView, SceneMap, SceneRendererProps } from 'react-native-tab-view';
import { Button, Center, HStack, View, Text } from 'native-base';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Box, Pressable, Icon, useTheme } from 'native-base';
import { NavigationState, Route } from 'react-native-tab-view';
import { Shadow } from 'react-native-shadow-2';

import DrawerVector from '../assets/vector/Drawer.svg';
import TabIcon from '../components/TabIcon';
import { EventsTab } from './tabs/Events';
import { useEffect, useState } from 'react';
import PlusIcon from '../assets/icons/PlusIcon.svg';
import MicIcon from '../assets/icons/MicIcon.svg';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../config/RouteParams';
import TabsProps from '../interfaces/TabsProps';
import { Layout } from '../interfaces/Layout';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
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
		This is Tab 4{' '}
	</Center>
);

const initialLayout = {
	width: Dimensions.get('window').width
};

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Tab = createBottomTabNavigator();

export const Home = (props: HomeScreenProps) => {
	const [ navBarLayout, setNavBarLayout ] = useState<Layout>({ x: 0, y: 0, width: 0, height: 0 });

	interface NaveIconSetProps {
		routeSet: any;
		offset: number;
	}

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
								// flex={1}
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
				// onPress={()=>console.log("hello")}
				// bgColor="red.500"
				position="absolute"
				bottom={0}
				// left={0}
				width="100%"
				// onLayout={(event) => {
				// 	setNavBarLayout(event.nativeEvent.layout);
				// }}
			>
				<Box
					position="absolute"
					width={`${initialLayout.width * (cabSize / 100)}px`}
					height={`${initialLayout.width * (cabSize / 100)}px`}
					bottom={'32px'}
					shadow={2}
					left={`${50 - cabSize / 2}%`}
					rounded="full"
					bgColor="background"
					justifyContent="center"
					alignItems="center"
				>
					<PlusIcon fill={colors.accent} height={40} width={40} />
				</Box>
				<Box position="absolute" bottom={0} left={2}>
					<DrawerVector width={initialLayout.width - 16} fill={colors.accent} />
				</Box>
				<HStack justifyContent="space-between" px="5%" py="10px">
					<NavIconSet routeSet={firstHalf} offset={0} />
					<NavIconSet routeSet={secondHalf} offset={2} />
				</HStack>
			</Box>
		);
	};

	return (
		<Tab.Navigator tabBar={(props) => <NavBar2 {...props} />}>
			<Tab.Screen options={{ headerShown: false }} name="Events" component={EventsTab} />
			<Tab.Screen options={{ headerShown: false }} name="Map" component={SecondRoute} />
			<Tab.Screen options={{ headerShown: false }} name="Spaces" component={ThirdRoute} />
			<Tab.Screen options={{ headerShown: false }} name="Connect" component={FourthRoute} />
		</Tab.Navigator>
		// <Box width="full" height="50%" bgColor="red.100" />
	);
	// </View>
};
