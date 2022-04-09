import React from 'react';
import EventIcon from '../assets/icons/EventIcon.svg';
import MapIcon from '../assets/icons/MapIcon.svg';
import MicIcon from '../assets/icons/MicIcon.svg';
import PersonIcon from '../assets/icons/PersonIcon.svg';

import { Box } from 'native-base';

interface TabIconProps {
	size: number;
	color: string;
	iconName: 'Events' | 'Map' | 'Spaces' | 'Connect';
}

const TabIcon = (props: TabIconProps) => {
	return (
		<Box>
			{
				{
					Events: <EventIcon fill={props.color} width={props.size} height={props.size} />,
					Map: <MapIcon fill={props.color} width={props.size} height={props.size} />,
					Spaces: <MicIcon fill={props.color} width={props.size} height={props.size} />,
					Connect: <PersonIcon fill={props.color} width={props.size} height={props.size} />
				}[props.iconName]
			}
		</Box>
	);
};

export default TabIcon;
