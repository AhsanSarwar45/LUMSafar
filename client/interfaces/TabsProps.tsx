import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../config/RouteParams';

interface TabsProps {
	navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
}

export default TabsProps;
