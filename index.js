import "react-native-gesture-handler";
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './App';

AppRegistry.registerComponent(appName, _ => App);
