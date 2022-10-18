import type {StatusBarStyle} from 'react-native';

type LightAndDarkInterface = {
	statusBarStyle: StatusBarStyle;
	navigationColor: string;
	text: string;
	color: string;
	backgroundComponent: string;
	backgroundScreen: string;
	textColor: string;
	nightMapColor: boolean;
	themeViewColor: [string, string];
};

type ThemeInterface = {
	light: LightAndDarkInterface;
	dark: LightAndDarkInterface;
};

const theme: ThemeInterface = {
	light: {
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
