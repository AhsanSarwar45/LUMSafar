import * as React from 'react';
import { Dimensions, StatusBar, Animated, Pressable } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Box, Center, useTheme } from 'native-base';

const FirstRoute = () => (
	<Center flex={1} my="4">
		This is Tab 1
	</Center>
);

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
	first: FirstRoute,
	second: SecondRoute,
	third: ThirdRoute,
	fourth: FourthRoute
});

export const Home = () => {
	const [ index, setIndex ] = React.useState(0);
	const [ routes ] = React.useState([
		{
			key: 'first',
			title: 'Events'
		},
		{
			key: 'second',
			title: 'Map'
		},
		{
			key: 'third',
			title: 'Spaces'
		},
		{
			key: 'fourth',
			title: 'Tab 4'
		}
	]);

	const renderTabBar = (props: any) => {
		const { borderRadius } = useTheme();
		const inputRange = props.navigationState.routes.map((x: any, i: any) => i);
		return (
			<Box flexDirection="row" roundedTop={borderRadius} bgColor="primary.500">
				{props.navigationState.routes.map((route: any, i: number) => {
					const color = index === i ? 'white' : 'rgba(255, 255, 255,0.5)';
					return (
						<Box flex={1} alignItems="center" p="4">
							<Pressable
								onPress={() => {
									console.log(i);
									setIndex(i);
								}}
							>
								<Animated.Text
									style={{
										color
									}}
								>
									{route.title}
								</Animated.Text>
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
			renderTabBar={renderTabBar}
			onIndexChange={setIndex}
			initialLayout={initialLayout}
			tabBarPosition="bottom"
			style={{
				marginTop: StatusBar.currentHeight
			}}
		/>
	);
};
