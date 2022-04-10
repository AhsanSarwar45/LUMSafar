import TopBar from '../../components/TopBar';
import Screen from '../../components/Screen';
import TabsProps from '../../interfaces/TabsProps';

export const Events = (props: TabsProps) => {
	return (
		<Screen>
			<TopBar navigation={props.navigation} search />
		</Screen>
	);
};
