import { StatusBar } from 'expo-status-bar';
import {LogBox, StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import AuthNavigation from "./navigations/AllScreensNavigation";


export default function App() {
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);
  return (
    <AuthNavigation/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
