
import React from 'react';
import { StyleSheet, View, Text, Button, Pressable } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import ScreenA from './assets/screens/ScreenA';
import ScreenB from './assets/screens/ScreenB';


const Stack = createNativeStackNavigator();

function Nav() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Screen_A"
                    component={ScreenA}
                />
                <Stack.Screen
                    name="Screen_B"
                    component={ScreenB}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Nav;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
    },
    fonts: {
        fontSize: 30,
        fontWeight: "900",
    },
    button: {
        backgroundColor: '#3483eb',
        padding: 20,
        borderRadius: 10,
        width: '40%',
        alignItems: 'center'
    },
});