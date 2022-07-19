import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Pressable, Modal, Button, Alert, ToastAndroid } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import configData from '../../env.json';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import usePressability from 'react-native/Libraries/Pressability/usePressability';

// const Stack = createNativeStackNavigator();

// const [email, setemail] = useState('');
// const [password, setpassword] = useState('');
// const [iconsize, seticonsize] = useState(23);
// const [email_founded, setemail_founded] = useState(false);
// const [passsword_founded, setpasssword_founded] = useState(false);
// const [modelFlag, setmodelFlag] = useState(false);
// const [model2Flag, setmodel2Flag] = useState(false);
// const [OTP, setOTP] = useState(null);
// const [generatedOTP, setgeneratedOTP] = useState(null);
// const [EnteredOTP, setEnteredOTP] = useState(null);
// const [newPassword, setnewPassword] = useState('');
// const [confirmPassword, setconfirmPassword] = useState('');

function Home() {
    return (
        <Text>hello</Text>
    );
};

export default Home;