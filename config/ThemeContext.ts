import React, {createContext} from 'react';

const themeContext = createContext({
	navigationColor: '#ffffff',
	text: 'тёмную',
	color: 'black',
	backgroundComponent: '#FFFFFF',
	backgroundScreen: '#EFF1FB',
	textColor: 'black',
	nightMapColor: false,
	statusBarStyle: 'dark-content',
	themeViewColor: ['#100f12', '#25144a'],
});

export default themeContext;
