import { AppRegistry } from 'react-native';
import App from './App';
import Login from './assets/screens/Login';
import Navigate from './assets/navigation/Navigation';
import Home from './assets/screens/Home';
import ProfileScreen from './assets/screens/Profile';
import EditProfile from './assets/screens/Edit_profile';
import Splash from './assets/screens/splash'
import { name as appName } from './app.json';
import MyComplaints from './assets/screens/MyComplaints';
import ToiletScreen from './assets/screens/toiletScreen'


// AppRegistry.registerComponent(appName, () => Splash);
// AppRegistry.registerComponent(appName, () => App);
// AppRegistry.registerComponent(appName, () => Login);
AppRegistry.registerComponent(appName, () => Navigate);
// AppRegistry.registerComponent(appName, () => demo);
// AppRegistry.registerComponent(appName, () => remakeadd);
// AppRegistry.registerComponent(appName, () => Home);
// AppRegistry.registerComponent(appName, () => ProfileScreen);
// AppRegistry.registerComponent(appName, () => EditProfile);
// AppRegistry.registerComponent(appName, () => MyComplaints);
// AppRegistry.registerComponent(appName, () => ToiletScreen);


