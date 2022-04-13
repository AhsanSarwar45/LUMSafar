// import { useNavigation } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../config/RouteParams';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// interface LoginData {
// 	email?: string;
// 	password?: string;
// }

// export async function StoreUserToken(data: LoginData, formikProps: any, navigation: any) {
// 	try {
// 		await AsyncStorage.setItem('userData', JSON.stringify(data));
// 		formikProps.setSubmitting(false);
// 		navigation.reset({
// 			index: 0,
// 			routes: [ { name: 'Home' } ]
// 		});
// 	} catch (error) {
// 		console.log('Something went wrong', error);
// 	}
// }
