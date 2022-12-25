import type {StatusBarStyle} from 'react-native';

type LightAndDark = {
	buttonProfileAndAddCar: string;
	statusBarStyle: 'default' | 'light-content' | 'dark-content';
	navigationColor: string;
	text: string;
	color: string;
	backgroundComponent: string;
	backgroundScreen: string;
	textColor: string;
	nightMapColor: boolean;
	themeViewColor: [string, string];
};

type Theme = {
	light: LightAndDark;
	dark: LightAndDark;
};

const theme: Theme = {
	light: {
		buttonProfileAndAddCar: '#544d4d',
		navigationColor: '#ffffff',
		text: 'тёмную',
		color: 'black',
		backgroundComponent: '#FFFFFF',
		backgroundScreen: '#EFF1FB',
		textColor: 'black',
		nightMapColor: false,
		statusBarStyle: 'dark-content',
		themeViewColor: ['#100f12', '#25144a'],
	},
	dark: {
		buttonProfileAndAddCar: '#EFF1FB',
		navigationColor: '#000000',
		text: 'светлую',
		color: 'white',
		backgroundComponent: '#1C1C1C',
		backgroundScreen: '#151719',
		textColor: 'white',
		nightMapColor: true,
		statusBarStyle: 'light-content',
		themeViewColor: ['#A8A8A8', '#9d50bb'],
	},
};

export default theme;
