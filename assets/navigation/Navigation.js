import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import App from '../../App';
import Login from '../screens/Login'
import Home from '../screens/Home';
import Search from '../screens/search';
import AddComplaint from '../screens/AddComplaint';
import Demo from '../screens/Demo';
import Setting from '../screens/setting';
import complaints from '../screens/Complaints'
import Notification from '../screens/notification';
import Splash from '../screens/splash'
import Onboarding from '../screens/onboarding'
import ProfileScreen from '../screens/Profile';
import EditProfile from '../screens/Edit_profile';
import MyComplaints from '../screens/MyComplaints'
import { View, Image, Text } from 'react-native';
import ToiletScreen from '../screens/toiletScreen';
import Feedback from '../screens/Feedback';
import Aboutcomplaintcube from '../screens/Aboutcomplaintcube';
import Help_line_numbers from '../model/Help_line_numbers';
import ComplaintRules from '../screens/ComplaintRules';

const BottomTab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default Navigate = (dataa) => {

    function Editable(login_data) {
        // console.log('PROFILE----IN---NAVIGATION___first---->', login_data.route.params.dataa.route.params.data);
        var editable_data = login_data.route.params.dataa.route.params.data;
        var editable_data_id = login_data.route.params.dataa.route.params.data.id;
        // console.log('PROFILE----IN---NAVIGATION--NEW-->', editable_data);
        return (
            <NavigationContainer independent={true}  >
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                        tabBarShowLabel: false,
                    }}
                >
                    <Stack.Screen name="ProfileScreen" component={ProfileScreen} initialParams={{ editable_data_id }} />
                    <Stack.Screen name='EditProfile' component={EditProfile} initialParams={{ editable_data_id }} />
                    <Stack.Screen name='MyComplaints' component={MyComplaints} initialParams={{ editable_data_id }} />
                    <Stack.Screen name="Notification" component={Notification} initialParams={{ dataa }} />
                    <Stack.Screen name="setting" component={Setting} initialParams={{ dataa }} />
                    <Stack.Screen name="Feedback" component={Feedback} initialParams={{ dataa }} />
                    <Stack.Screen name="Aboutcomplaintcube" component={Aboutcomplaintcube} initialParams={{ dataa }} />

                </Stack.Navigator>
            </NavigationContainer>
        )
    }

    function Home_Gov() {
        return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Demo" component={Demo} />
                <Stack.Screen name="ToiletScreen" component={ToiletScreen} />
                <Stack.Screen name="Help_line_numbers" component={Help_line_numbers} />

            </Stack.Navigator>
        )
    }

    function Add_Complaint() {
        return (


            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="AddComplaint" component={AddComplaint} initialParams={{ dataa }} />
                <Stack.Screen name="ComplaintRules" component={ComplaintRules} initialParams={{ dataa }} />
            </Stack.Navigator>
        )
    }

    function HomeScreen(dataa) { // parameter
        // console.log('HOMESCREEN_------NAVIGATION----->', dataa.route.params.data);
        var login_data = dataa.route.params.data;
        return (
            <NavigationContainer independent={true} screenOptions={{
                tabBarShowLabel: false,

                style: {
                    position: 'absolute',
                    bottom: 25,
                    left: 20,
                    right: 20,
                    elevation: 0,
                    backgroundColor: '#fff',
                    borderRadius: 15,
                    hight: 19,

                }

            }} >

                <BottomTab.Navigator
                    tabBarOptions={{ keyboardHidesTabBar: true, }}
                    screenOptions={{
                        headerShown: false,
                        tabBarShowLabel: false,
                    }}
                >
                    <BottomTab.Screen name="Home" component={Home} options={{
                        tabBarIcon: ({ focused }) => (
                            <View style={{ alignItems: 'center', justifyContent: 'center', }} >
                                <Image
                                    source={require('../imgs/icons/home.png')}
                                    resizeMode='contain'
                                    style={{
                                        width: 27,
                                        height: 27,
                                        justifyContent: 'center',
                                        alignSelf: 'center',
                                        tintColor: focused ? '#ff8c00' : '#748c94',
                                    }}
                                />
                                {/* <Text style={{ fontSize: 10, paddingTop: 5, color: '#000', justifyContent: 'center', alignSelf: 'center', }}>Home</Text> */}

                            </View>
                        ),
                    }}
                        initialParams={{ dataa }}
                    />


                    <BottomTab.Screen name="complaints" component={complaints} options={{
                        tabBarIcon: ({ focused }) => (
                            <View style={{ alignItems: 'center', justifyContent: 'center', }} >
                                <Image
                                    source={require('../imgs/icons/complain.png')}
                                    resizeMode='contain'
                                    style={{
                                        width: 27,
                                        height: 27,
                                        justifyContent: 'center',
                                        alignSelf: 'center',
                                        tintColor: focused ? '#ff8c00' : '#748c94',
                                    }}
                                />
                                {/* <Text style={{ fontSize: 10, paddingTop: 5, color: '#000', justifyContent: 'center', alignSelf: 'center', }}>Complaint</Text> */}

                            </View>
                        ),
                    }}
                        initialParams={{ dataa }}
                    />

                    <BottomTab.Screen name="MakeComplaint" component={Add_Complaint} options={{
                        tabBarIcon: ({ focused }) => (
                            <View style={{ alignItems: 'center', justifyContent: 'center', }} >
                                <Image
                                    source={require('../imgs/icons/add1.png')}
                                    resizeMode='contain'
                                    style={{
                                        width: 30,
                                        height: 30,
                                        justifyContent: 'center',
                                        alignSelf: 'center',
                                        tintColor: focused ? '#ff8c00' : '#748c94',
                                    }}
                                />
                                {/* <Text style={{ fontSize: 10, paddingTop: 5, color: '#000', justifyContent: 'center', alignSelf: 'center', }}>Make Complaint</Text> */}

                            </View>
                        ),
                    }}
                        initialParams={{ dataa }}
                    />

                    <BottomTab.Screen name="demo" component={Home_Gov} options={{
                        tabBarIcon: ({ focused }) => (
                            <View style={{ alignItems: 'center', justifyContent: 'center', }} >
                                <Image
                                    source={require('../imgs/icons/orangemap.png')}
                                    resizeMode='contain'
                                    style={{
                                        width: 27,
                                        height: 27,
                                        justifyContent: 'center',
                                        alignSelf: 'center',
                                        tintColor: focused ? '#ff8c00' : '#748c94',

                                    }}

                                />
                                {/* <Text style={{ fontSize: 10, paddingTop: 5, color: '#000', justifyContent: 'center', alignSelf: 'center', }}>Near By</Text> */}
                            </View>
                        ),
                    }}
                        initialParams={{ dataa }}
                    />

                    <BottomTab.Screen name="Profile" component={Editable} options={{
                        tabBarIcon: ({ focused }) => (
                            <View style={{ alignItems: 'center', justifyContent: 'center', }} >
                                <Image
                                    source={require('../imgs/icons/profile.png')}
                                    resizeMode='contain'
                                    style={{
                                        width: 27,
                                        height: 27,
                                        justifyContent: 'center',
                                        alignSelf: 'center',
                                        tintColor: focused ? '#ff8c00' : '#748c94',

                                    }}
                                />
                                {/* <Text style={{ fontSize: 10, paddingTop: 5, color: '#000', justifyContent: 'center', alignSelf: 'center', }}>Profile</Text> */}

                            </View>
                        ),
                    }}
                        initialParams={{ dataa }}
                    />

                </BottomTab.Navigator>
            </NavigationContainer>
        )
    };
    return (

        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} >
                <Stack.Screen name="Splash" component={Splash} />
                {/* <Stack.Screen name="Onboarding" component={Onboarding} /> */}
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="App" component={App} />
                <Stack.Screen name="HomeScreen" component={HomeScreen} initialParams={{ dataa }} />
            </Stack.Navigator>
        </NavigationContainer>

    );
};
