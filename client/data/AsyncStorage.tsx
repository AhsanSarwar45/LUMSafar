import AsyncStorage from '@react-native-async-storage/async-storage';


    export async function GetUserData() {
		try {
			const userData = await AsyncStorage.getItem('userData');
			const data = JSON.parse(userData as string);
            return data;
		} catch (error) {
			console.log('Something went wrong', error);
		}
	}