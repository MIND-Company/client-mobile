import type {StatusBarStyle} from 'react-native';

type LightAndDark = {
	parkingDetailsText: string;
	buttonProfileAndAddCar: string;
	statusBarStyle: 'default' | 'light-content' | 'dark-content';
	navigationColor: string;
	text: string;
	color: string;
	backgroundComponent: string;
	backgroundScreen: string;
	textColor: string;
	nightMapColor: boolean;
};

type Theme = {
	light: LightAndDark;
	dark: LightAndDark;
};

const theme: Theme = {
	light: {
		parkingDetailsText: '#45005E',
		buttonProfileAndAddCar: '#544d4d',
		navigationColor: '#ffffff',
		text: 'тёмную',
		color: 'black',
		backgroundComponent: '#FFFFFF',
		backgroundScreen: '#EFF1FB',
		textColor: 'black',
		nightMapColor: false,
		statusBarStyle: 'dark-content',
	},
	dark: {
		parkingDetailsText: 'white',
		buttonProfileAndAddCar: '#EFF1FB',
		navigationColor: '#000000',
		text: 'светлую',
		color: 'white',
		backgroundComponent: '#1C1C1C',
		backgroundScreen: '#151719',
		textColor: 'white',
		nightMapColor: true,
		statusBarStyle: 'light-content',
	},
};

export default theme;
