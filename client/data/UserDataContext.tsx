import React from 'react';
import { UserData } from '../interfaces/UserData';

export const UserDataContext = React.createContext({
	userData: {} as UserData,
	setUserData: (userData: UserData) => {}
});
