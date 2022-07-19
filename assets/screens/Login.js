import React from 'react';
import { View, StyleSheet, Text, TextInput, Pressable, Modal, Alert, Image, ToastAndroid, ScrollView, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import configData from '../../env.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height } = Dimensions.get('screen');
const { width } = Dimensions.get('screen');


export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            iconsize: 23,
            email_founded: null,
            passsword_founded: false,
            modelFlag: false,
            model2Flag: false,
            forgtLoader: false,
            verifyLoader: false,
            signin_loader: false,
            show_Password: false,
            show_Password_main: false,
            OTP: '',
            generatedOTP: null,
            EnteredOTP: null,
            newPassword: '',
            confirmPassword: '',
            jsonData: null
        };
    }

    findemail = async (findEmail) => {
        const { email } = this.state;

        try {
            const response = await axios.post(configData.SERVER_URL + 'search_email.php', {
                find_email: findEmail,
            });

            if (response.data.success) {
                this.setState({ email: findEmail });
                this.setState({ email_founded: true });
                // console.log("email founded: " + this.state.email_founded + " " + findEmail);
            } else {
                this.setState({ email_founded: false });
                // console.log("email founded:   ", this.state.email_founded);
                // console.log("email founded: " + this.state.email_founded + " " + findEmail);

            }
        }
        catch (error) {
            alert(error);
        }
    };

    findPassword = async (findpass) => {
        const { email, passsword_founded } = this.state;

        try {
            const response = await axios.post(configData.SERVER_URL + 'search_password.php', {
                find_password: findpass,
                find_email: email,
            });
            if (response.data.pass_success) {
                // console.log("PASSWORD founded:   Y");
                this.setState({ passsword_founded: true });
                this.setState({ password: findpass });
            } else {
                null;
            }
        }
        catch (error) {
            alert(error);
        }
    };

    OnForgetPassword = async () => {
        this.setState({ forgtLoader: true });
        const { email_founded, OTP, email, generatedOTP } = this.state;
        if (email_founded) {
            const response = await axios.post(configData.SERVER_URL + 'otp_generate.php', {
                email: email,
            });
            // console.log('onforget password: ', response.data);
            this.setState({ modelFlag: true });
            this.setState({ forgtLoader: false });
        } else {
            Alert.alert("Empty Field", "please enter email!");
            this.setState({ forgtLoader: false });
        }
    };

    isOTPvalid = async () => {
        const { email_founded, email, EnteredOTP } = this.state;
        this.setState({ verifyLoader: true });
        const response = await axios.post(configData.SERVER_URL + 'verify_otp.php', {
            email: email,
            otp: EnteredOTP,
        });
        if (response.data.success) {
            ToastAndroid.show('Verified', ToastAndroid.LONG);
            this.setState({ model2Flag: true });
            this.setState({ modelFlag: false });
            this.setState({ verifyLoader: false });
        } else {
            alert("Please enter valied OTP.");
            this.setState({ verifyLoader: false });
        }
    };

    setItem = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            // console.log('Item Does not set:',);
            alert(error);
        }
    };

    onpores = async () => {
        this.setState({ signin_loader: true });
        const { password, email, email_founded, passsword_founded } = this.state;
        if (email_founded && passsword_founded) {
            try {
                const response = await axios.post(configData.SERVER_URL + 'login.php', {
                    email: email,
                    password: password,
                });

                if (response.data.success) {
                    this.props.navigation.navigate('HomeScreen', { data: response.data.data });   //NAVIGATE TO HomeScreen.
                    ToastAndroid.show('Successfully Login', ToastAndroid.LONG);
                    this.setItem("logindata", response.data.data);

                    this.setState({ jsonData: await AsyncStorage.getItem("logindata") });
                    await AsyncStorage.setItem('isLogedIn', "true");
                    this.setState({ signin_loader: false });
                } else {
                    console.log(response.data);
                    this.setState({ signin_loader: false });
                }
            } catch (error) {
                alert(error);
                this.setState({ signin_loader: false });
            }
        } else {
            Alert.alert(configData.war, configData.EnterEmailPassword, [
                { text: "ok" }
            ], { cancelable: true });
            this.setState({ signin_loader: false });
        }


    };

    update_Password = async () => {
        const { newPassword, confirmPassword, email } = this.state;
        this.setState({ verifyLoader: true });

        if (newPassword.length > 7 && (newPassword === confirmPassword)) {
            try {
                const response = await axios.post(configData.SERVER_URL + 'update_password.php', {
                    email: email,
                    nwePassword: newPassword,
                });

                if (response.data.success) {
                    console.log(response.data);
                    this.setState({ model2Flag: false });
                    this.setState({ verifyLoader: false });
                    ToastAndroid.show('Password Successfully Updated', ToastAndroid.SHORT);
                } else {
                    // console.log("______PASSWORD DOESN'T CHANGE________" + response.data);
                    alert("Faild to change Password")
                    this.setState({ verifyLoader: false });

                }
            } catch (error) {
                alert(error);
                this.setState({ verifyLoader: false });

            }
        } else {
            alert("Your Password Must Be Strong 💪");
            this.setState({ verifyLoader: false });

        }

    };

    gotohome = () => {
        this.props.navigation.navigate('App');
    };

    render() {
        const { email, email_founded, newPassword, confirmPassword, show_Password_main, signin_loader } = this.state;

        return (
            <>
                <View style={styles.container}>
                    {/* OTP-Verification--------------------------------------------------- */}
                    <Modal
                        visible={this.state.modelFlag}
                        animationType={'slide'}
                        transparent={true}
                        onRequestClose={() => { this.setState({ modelFlag: false }) }
                        } >

                        <View style={styles.modelview}>
                            <View style={styles.modelviewdata}>
                                <Text style={{ letterSpacing: 2, marginTop: 30, color: 'white', fontWeight: '800', textAlign: 'center', fontSize: 17, lineHeight: 25 }}>Enter your One Time Password below which is sent in your Email : <Text style={{ color: '#000', fontWeight: 'bold', textDecorationLine: 'underline' }}>{email}</Text></Text>

                                <TextInput style={styles.modelinput} maxLength={5} placeholder='*****' placeholderTextColor={'#858585'} keyboardType="number-pad" onChangeText={(text) => this.setState({ EnteredOTP: text })} />
                                <Pressable style={[styles.btn, { width: 150, top: -10 }]} flexDirection="row" onPress={this.isOTPvalid}
                                >

                                    <Text style={styles.btntxt}>Verify</Text>
                                    {
                                        (this.state.verifyLoader)
                                            ? <ActivityIndicator style={{ textAlign: 'center', justifyContent: 'center', alignSelf: 'center', left: 10 }} color={'#000'} />
                                            : <FontAwesome5 name={'arrow-circle-right'} style={{ textAlign: 'center', justifyContent: 'center', alignSelf: 'center', left: 10 }} size={this.state.iconsize} solid color={'#000'} />
                                    }

                                </Pressable>
                                <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'black' }}>*Note: <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'white' }}>If you dont receive any OTP from our side please request again or let us know <Text style={{ color: '#000', textDecorationLine: 'underline' }}>Click Here</Text></Text></Text>
                            </View>

                        </View>
                    </Modal>

                    {/* PASSWORD-UPDATATION----------------------------------------------------- */}
                    <Modal
                        visible={this.state.model2Flag}
                        animationType={'slide'}
                        transparent={true}
                        onRequestClose={() => { this.setState({ model2Flag: false }) }} >
                        <View style={styles.modelview}>

                            <View style={[styles.modelviewdata,]}>
                                <Text style={{ fontSize: 17, lineHeight: 50, color: 'black', fontWeight: "bold", justifyContent: 'center', alignSelf: 'center', }} >Create New Password</Text>
                                <View style={[styles.fieldNicon, { marginVertical: 10 }]}>
                                    <TextInput style={[styles.fields, { width: '85%' }]} secureTextEntry={!this.state.show_Password} placeholder='Enter New Password' placeholderTextColor={'#858585'} onChangeText={(text) => { this.setState({ newPassword: text }) }} />
                                    <FontAwesome5
                                    onPress={() => { this.setState({ show_Password: !this.state.show_Password }) }}
                                    name={(this.state.show_Password) ? 'eye-slash' : 'eye'}
                                    solid
                                    size={22}
                                    color={'#000'}
                                    style={{ justifyContent: 'center', alignSelf: 'center' }}
                                />
                                </View>
                                
                                <View style={{ width: '100%', marginVertical: 5 }}>
                                    {(newPassword == '') ? null : (newPassword.length > 0 && newPassword.length <= 3) ? <Text style={styles.alertText}>Short*</Text> : (newPassword.length >= 4 && newPassword.length <= 7) ? <Text style={styles.weakpassword}>Weak !</Text> : <Text style={styles.doneText}>Strong !</Text>}
                                </View>

                                <View style={[styles.fieldNicon,]}>
                                    <TextInput style={[styles.fields, { width: '85%' }]} placeholder='Confirm Password' secureTextEntry={!this.state.show_Password} placeholderTextColor={'#858585'}
                                        onChangeText={(text) => { this.setState({ confirmPassword: text }) }}
                                    />
                                    <FontAwesome5
                                    onPress={() => { this.setState({ show_Password: !this.state.show_Password }) }}
                                    name={(this.state.show_Password) ? 'eye-slash' : 'eye'}
                                    solid
                                    size={22}
                                    color={'#000'}
                                    style={{ justifyContent: 'center', alignSelf: 'center' }}
                                />
                                </View>
                                <View style={{ width: '100%', marginVertical: 5 }}>
                                    {(newPassword == '' && confirmPassword == '') ? null : (newPassword == confirmPassword) ? <Text style={styles.doneText}>Matched!</Text> : <Text style={styles.alertText}>Password not matched*</Text>}
                                </View>
                                {/* <View style={{
                                    // backgroundColor: 'red',
                                    alignSelf: 'flex-start',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    width: 150,
                                    flexDirection: 'row',
                                }}>
                                    <FontAwesome5
                                        name={(this.state.show_Password) ? 'check-square' : 'square'}
                                        size={22}
                                        solid={this.state.show_Password}
                                        color={this.state.show_Password ? 'green' : '#000000'}
                                    />
                                    <Text
                                        onPress={() => { this.setState({ show_Password: !this.state.show_Password }) }}
                                        style={{
                                            fontSize: 17,
                                            // alignSelf: 'flex-start',
                                            lineHeight: 50,
                                            // backgroundColor: "pink",
                                            fontWeight: '500',
                                            color: '#ffffff',
                                            justifyContent: 'center',
                                        }}>

                                        Show Password</Text>
                                </View> */}
                                <Pressable style={styles.btn} flexDirection="row" onPress={this.update_Password}>

                                    <Text style={styles.btntxt}>Go to SignIn</Text>
                                    {
                                        (this.state.verifyLoader)
                                            ? <ActivityIndicator style={{ textAlign: 'center', justifyContent: 'center', alignSelf: 'center', left: 10 }} color={'black'} />
                                            : <FontAwesome5 name={'arrow-circle-right'} style={{ textAlign: 'center', justifyContent: 'center', alignSelf: 'center', left: 10 }} size={this.state.iconsize} solid color={'black'} />

                                    }

                                </Pressable>

                            </View>
                        </View>
                    </Modal>

                    {/* LOGO----------------------------------------------------- */}

                    <View
                        style={styles.logobox}>
                        <Image style={styles.logo} source={require('../imgs/icons/logo1.png')} />
                    </View>

                    <View style={styles.data}>

                        <Text style={styles.heading}>
                            Welcome Again, {'\n'}
                            Login Your Account :)
                        </Text>
                        {/* EMAIL----------------------------------------------------- */}
                        <>
                            <View style={styles.fieldNicon}>
                                <FontAwesome5 name={'envelope'} style={{ color: '#ff8c00', top: 10, marginRight: 7, width: 25, height: 25 }} size={this.state.iconsize} solid color={'white'} />
                                <TextInput
                                    style={styles.fields}
                                    placeholder='Email'
                                    keyboardType='email-address'
                                    placeholderTextColor={'#000'}
                                    autoCapitalize='none'
                                    onChangeText={
                                        (text) => this.findemail(text)
                                    }
                                />

                                {
                                    (email_founded == null) ?
                                        null :
                                        (email_founded) ?
                                            <FontAwesome5 style={styles.iconBox} name={'check-circle'} size={this.state.iconsize} color={'#23ab11'} solid /> //green 
                                            :
                                            <FontAwesome5 style={styles.iconBox} name={'times-circle'} size={this.state.iconsize} color={'#ab1111'} solid /> //red
                                }
                            </View>
                        </>

                        {/* PASSWORD----------------------------------------------------- */}
                        <>
                            <View style={[styles.fieldNicon,]}>
                                <FontAwesome5 name={'unlock'} style={{ color: '#ff8c00', top: 10, marginRight: 7, width: 25, height: 25 }} size={this.state.iconsize} solid color={'white'} />

                                <TextInput
                                    secureTextEntry={!show_Password_main}
                                    style={[styles.fields,]}
                                    placeholder='Password'
                                    placeholderTextColor={'#000'}
                                    autoCapitalize='none'
                                    onChangeText={
                                        (text) => { this.findPassword(text) }
                                    }
                                />
                                <FontAwesome5
                                    onPress={() => { this.setState({ show_Password_main: !show_Password_main }) }}
                                    name={(show_Password_main) ? 'eye-slash' : 'eye'}
                                    solid
                                    size={22}
                                    color={'#000'}
                                    style={{ justifyContent: 'center', alignSelf: 'center' }}
                                />
                            </View>
                        </>

                        {/* FORGET_PASSWORD----------------------------------------------------- */}
                        <>
                            <View style={{
                                width: '100%',
                                justifyContent: 'flex-end',
                                flexDirection: 'row',
                            }} >
                                <ActivityIndicator animating={this.state.forgtLoader} size={20} color={"#ffffff"} />
                                <Text style={styles.forgetPassword} onPress={this.OnForgetPassword} >
                                    Forget Password?
                                </Text>
                            </View>
                        </>

                        {/* SIGNIN_BUTTON----------------------------------------------------- */}
                        <>
                            <TouchableOpacity style={styles.btn} onPress={this.onpores}>
                                <Text style={styles.btntxt}>SignIn</Text>
                                {
                                    (signin_loader)
                                        ? <ActivityIndicator color={'#000'} style={{ justifyContent: 'center', alignSelf: 'center', left: 10 }} />
                                        : <FontAwesome5 name={'arrow-circle-right'} size={20} solid color={'black'} style={{ justifyContent: 'center', alignSelf: 'center', left: 10 }} />
                                }
                            </TouchableOpacity>
                        </>

                        {/* DON'T_ACCOUNT----------------------------------------------------- */}
                        <>
                            <Text style={[styles.forgetPassword, { textAlign: "center", marginTop: 20, fontSize: 17 }]} >Don't Have Account? <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 17, textDecorationLine: 'underline' }} onPress={this.gotohome}>Click Here.</Text></Text>

                        </>

                    </View>
                </View>
            </>
        );
    }
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        // backgroundColor: '#ededed',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logobox: {
        flex: 2,
        width: width,
        height: '100%',
        justifyContent: 'center',
        alignSelf: 'center',

    },
    logo: {
        width: 380,
        height: 95,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    data: {
        flex: 2,
        backgroundColor: 'rgb(255, 140, 0)',
        width: '100%',
        height: '100%',
        padding: 30,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 10,
    },
    forgetPasswordField: {
        width: '100%',
        backgroundColor: 'yellow',
        flexDirection: 'row',
        borderRadius: 12,
        paddingHorizontal: 10,
    },
    fieldNicon: {
        width: '100%',
        backgroundColor: 'white',
        flexDirection: 'row',
        borderRadius: 12,
        paddingLeft: 20,
        marginVertical: 5,
        shadowOffset: { width: 1, height: 2 },
        shadowRadius: 5,
        elevation: 5,
        shadowOpacity: 0.4,
    },
    fields: {
        width: '80%',
        letterSpacing: 2,
        color: '#000',
        fontSize: 17,
    },
    iconBox: {
        alignSelf: "center",
        justifyContent: 'center',
    },
    heading: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20
    },
    btn: {
        width: '100%',
        marginTop: 10,
        backgroundColor: '#fff',
        borderRadius: 12,
        alignSelf: 'center',
        // justifyContent: 'space-between',
        justifyContent: 'center',
        flexDirection: "row",
        paddingVertical: 3,
        paddingHorizontal: 20,
        shadowOffset: { width: 1, height: 2 },
        shadowRadius: 5,
        elevation: 5,
        shadowOpacity: 0.4,
    },
    forgetPassword: {
        fontWeight: "bold",
        color: '#ffffff',
        fontSize: 15,
    },
    btntxt: {
        fontSize: 17,
        lineHeight: 50,
        color: 'black',
        fontWeight: "500",
        // textAlign: 'left',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    modelview: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modelviewdata: {
        height: 400,
        width: '90%',
        backgroundColor: "rgb(255, 140, 0)",
        alignItems: 'center',
        justifyContent: 'space-evenly',
        padding: 30,
        borderRadius: 20,
    },
    modelinput: {
        fontSize: 25,
        width: '100%',
        borderRadius: 12,
        textAlign: 'center',
        marginBottom: 30,
        fontWeight: "bold",
        color: "black",
        backgroundColor: 'white',
        letterSpacing: 20,
        elevation: 10,
    },
    alertText: {
        color: 'red',
        alignSelf: 'flex-start',
        fontWeight: "bold",
        fontSize: 15,
        paddingLeft: 20
    },
    weakpassword: {
        color: 'orange',
        alignSelf: 'flex-start',
        fontWeight: "bold",
        fontSize: 15,
        paddingLeft: 20
    },
    doneText: {
        color: 'green',
        alignSelf: 'flex-start',
        fontWeight: "bold",
        fontSize: 15,
        paddingLeft: 20
    },
});