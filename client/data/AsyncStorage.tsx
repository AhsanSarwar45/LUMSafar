import AsyncStorage from '@react-native-async-storage/async-storage';

export async function StoreUserData(data: any, callback: Function) {
	try {
		await AsyncStorage.setItem('userData', JSON.stringify(data));
		callback(data);
	} catch (error) {
		console.log('Something went wrong', error);
	}
}

export async function GetUserData() {
	try {
		const userData = await AsyncStorage.getItem('userData');
		const data = JSON.parse(userData as string);
		return data;
	} catch (error) {
		console.log('Something went wrong', error);
	}
}
