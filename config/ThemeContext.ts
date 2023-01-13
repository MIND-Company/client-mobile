import {createContext} from 'react';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ThemeContext = createContext({
	parkingDetailsText: '#45005E',
	buttonProfileAndAddCar: '#EFF1FB',
	navigationColor: '#ffffff',
	text: 'тёмную',
	color: 'black',
	backgroundComponent: '#FFFFFF',
	backgroundScreen: '#EFF1FB',
	textColor: 'black',
	nightMapColor: false,
	statusBarStyle: 'dark-content',
});

export default ThemeContext;
