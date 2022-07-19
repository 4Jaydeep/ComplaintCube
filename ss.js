import React from 'react';
import { View, StyleSheet, Text, TextInput, Pressable, Image, ToastAndroid, Dimensions, ScrollView, Modal, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import configData from './env.json';

import { LogBox } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import ImagePicker from 'react-native-image-crop-picker';
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const { height } = Dimensions.get('screen');
const { width } = Dimensions.get('screen');
export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            repassword: '',
            email: '',
            mobile: '',
            address: '',
            image: '',
            city: '',
            pincode: '',
            mobileValidate: [' ', '.', '-', ','],
            EnteredOTP: '',
            talukaLable: 'Select Taluka',
            selectegender: 'Select Your Gender',
            age: 'Age',
            modelVisibility: false,
            talukaModal: false,
            agemodel: false,
            pressed: false,
            loader: false,
            gendermodel: false,
            show_Password: false,
            otp_verify_model: false,
            verifyLoader: false,
            validemail: null,
            valipassword: null,
            valiusername: null,
            existornot: null,
            testName: '',
            iconsize: 23,
        };
    };

    validate = (text) => {

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(text) === false) {
            console.log("Email is Not Correct");
            // this.setState({ email: text });
            this.setState({ validemail: false });
        }
        else {
            this.setState({ email: text })
            this.setState({ validemail: true });
            console.log("Email is Correct");
        }
    }

    mobileFormat(mob) {
        if (typeof mob !== "undefined") {
            this.setState({ mobile: mob.replace(/ /g, "") })

            console.log(mob.length);
        }
    }

    upload_Picture = () => {
        ImagePicker.openPicker({
            width: 100,
            height: 100,
            cropping: true,
        }).then(image => {
            this.setState({ image: image.path });
            // try {
            //     console.log('image path stored in async storagee✅', this.state.image);
            // } catch (e) {
            //     console.log('Error in Async Storageing', e);
            // }
        });
    }

    alertbox = () => {
        Alert.alert("warning", "This email will only be used once, would you like to proceed further?",
            [
                {
                    text: "Understand",
                    style: "cancel",
                },
            ],
        );
    }



    onpores = async () => {
        const { username, password, mobile, email, repassword, selectegender, selectedage, address, image, pincode, selectedCity } = this.state;
        if (username.length > 5 && email.length > 5 && mobile.trim && mobile.length == 10) {

            if (password != '' && repassword != '') {
                if ((password === repassword) && (password.length > 7) && (repassword.length > 7) && address.length > 20) {
                    if (selectedage != 'Select Age' && selectegender != 'Select Your gender' && selectedCity != 'Select City') {
                        console.log(mobile);
                        this.setState({ pressed: true });

                        try {
                            const response = await axios.post(configData.SERVER_URL + 'insert.php', {
                                username: username,
                                email: email,
                                mobile: mobile,
                                password: password,
                                repassword: repassword,
                                gender: selectegender,
                                age: selectedage,
                                image: image,
                                address: address,
                                city: selectedCity,
                                pincode: pincode,

                            });

                            if (response.data.success) {
                                ToastAndroid.show('Congratulations Your Succesfully Registreted', ToastAndroid.LONG);
                                console.log("responce------>", response.data);
                                this.props.navigation.navigate('Login');
                            } else {
                                console.log("responce------>", response.data);
                                throw new Error(" 29 try An error has occurred");
                            }
                        } catch (error) {
                            alert(error);
                        }
                    } else {
                        null
                    }
                } else {
                    alert("Please Select Your gender and Age");
                }
            } else {
                alert("Password is important for your privacy.");
            }

        } else {
            alert("There is no way to SignUp without filling all fields.\nPlease fill all the fields propperly.");
        }
    };



    gotoaLogin = () => {
        this.props.navigation.navigate('Login');
    }

    optionsToChoose = () => {
        this.setState({ modelVisibility: true });
    }

    onSuccess = async (res) => {
        console.log('msgggdssdsdd', res);
        this.setState({ image: res['assets'][0] });

    }

    fromCamera = async (image) => {

        let a = Math.floor(Math.random() * 10000) + 10000;
        const b = {
            fileName: a,
            base64: image.data
        }
        this.setState({ image: b });
        this.setState({ showimage: image.path })
    };

    Choose_Picture = async () => {
        this.setState({ modelVisibility: false });
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            includeBase64: true

        }).then(image => {
            this.fromCamera(image);
            console.log(image);
        });
    };

    take_Picture = async () => {
        this.setState({ modelVisibility: false });
        await ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: false,
            includeBase64: true
        }).then(image => {
            this.fromCamera(image);
            console.log(image);
        });
    }

    alertbox = () => {
        Alert.alert("warning", "This email will only be used once, would you like to proceed further?",
            [
                {
                    text: "Understand",
                    style: "cancel",
                },
            ],
        );
    };

    on_Register = async () => {
        const { email, mobile } = this.state;
        const EXIST = await axios.post(configData.SERVER_URL + 'emailMobileExist.php', {
            find_email: email,
            find_mobile: mobile,
        });

        if (EXIST.data.exist) {

            console.log(EXIST.data);
            alert("You are already registrated with this email: " + email + " \nOR\n This Mobile Number: " + mobile);

        } else {
            this.setState({ otp_verify_model: true });
            const response = await axios.post(configData.SERVER_URL + 'otp_generate_with_email.php', {
                email: email,
            });
            console.log('on_register: ', response.data);
        }


    };

    isOTPvalid = async () => {
        const { email, EnteredOTP } = this.state;
        this.setState({ verifyLoader: true });
        const response = await axios.post(configData.SERVER_URL + 'verify_otp.php', {
            email: email,
            otp: EnteredOTP,
        });
        if (response.data.success) {
            console.log('register? :: ', response.data);
            await this.onpores();
            ToastAndroid.show('Verified', ToastAndroid.LONG);
            this.setState({ verifyLoader: false });
            this.setState({ otp_verify_model: false });
        } else {
            alert("Please enter valied OTP.");
            this.setState({ verifyLoader: false });
        }
    };


    render() {

        const { username, password, mobile, email, repassword, onpress2, pressed, testName, address, selectedCity, pincode } = this.state;
        return (

            <View style={styles.container}>
                <View>
                    {/* -- -NAME --- */}
                    <View
                        style={styles.logobox}>
                        <Image style={styles.logo} source={require('./assets/imgs/icons/logo1.png')} />
                    </View>
                </View>

                <View style={styles.data}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >

                        <Modal
                            visible={this.state.modelVisibility}
                            animationType='slide'
                            transparent={true}
                            onRequestClose={() => { this.setState({ modelVisibility: false }) }}
                        >
                            <View style={styles.image_option} >
                                <View style={styles.header}><Text style={{ fontWeight: '900', fontSize: 17, color: '#000' }}>How would you like to choose your photo?</Text></View>
                                <TouchableOpacity style={styles.takePhoto} onPress={this.take_Picture} ><Text style={{ fontWeight: '700', fontSize: 17, color: '#000' }}>Take Photo</Text></TouchableOpacity>
                                <TouchableOpacity style={styles.ChoosPhoto} onPress={this.Choose_Picture}><Text style={{ fontWeight: '700', fontSize: 17, color: '#000' }}>Choos Photo From Galary</Text></TouchableOpacity>
                                <TouchableOpacity style={styles.closebtn} onPress={() => { this.setState({ modelVisibility: false }) }} >
                                    <FontAwesome5 name={'times'} size={30} color={'black'} />
                                </TouchableOpacity>
                            </View>
                        </Modal>

                        {/* OTP VERIFICATION MODAL------------------------------------------------------ */}
                        <Modal

                            visible={this.state.otp_verify_model}
                            // visible={true}
                            transparent={true}
                            onRequestClose={() => { this.setState({ otp_verify_model: false }) }}
                        >
                            <View style={styles.modelview}>
                                <View style={styles.modelviewdata}>
                                    <Text style={{ letterSpacing: 2, marginTop: 30, color: 'white', fontWeight: '800', textAlign: 'center' }}>Enter your One Time Password below which is sent in your Email{email}</Text>

                                    <TextInput
                                        style={styles.modelinput}
                                        maxLength={5} placeholder='*****'
                                        placeholderTextColor={'#858585'}
                                        keyboardType="number-pad"
                                        onChangeText={(text) => this.setState({ EnteredOTP: text })}
                                    />
                                    <Pressable
                                        style={[styles.btn, { width: 150, justifyContent: 'space-between', alignItems: 'center' }]} flexDirection="row"
                                        onPress={this.isOTPvalid}
                                    >

                                        <Text style={styles.btntxt}>Verify</Text>
                                        {
                                            (this.state.verifyLoader)
                                                ? <ActivityIndicator color={'#ffffff'} />
                                                : <FontAwesome5 name={'arrow-circle-right'} size={this.state.iconsize} solid color={'white'} />
                                        }

                                    </Pressable>
                                </View>
                            </View>

                        </Modal>

                        <Text style={styles.heading}>
                            Hello, {'\n'}
                            Create New Account
                        </Text>

                        <View style={styles.fieldNicon}>
                            <FontAwesome5 name={'user-tie'} style={{ color: '#ff8c00', top: 12, marginRight: 7, width: 25, height: 25 }} size={this.state.iconsize} solid color={'white'} />
                            <TextInput style={styles.fields} placeholder='Name' placeholderTextColor='#000' autoCapitalize='words' onChangeText={(text) => { this.setState({ username: text }) }} />
                            {(username == '')
                                ? null
                                : (username.length > 5)
                                    ? <FontAwesome5 style={styles.iconbox} name={'check-circle'} size={this.state.iconsize} color={'green'} solid />
                                    : <FontAwesome5 style={styles.iconbox} name={'times-circle'} size={this.state.iconsize} color={'#f54242'} solid /> /* falce red */}
                        </View>

                        <View style={{ width: '100%' }}>
                            {(username == '') ? null : (username.length > 5) ? <Text style={styles.doneText}>Seems Good!</Text> : < Text style={styles.alertText}>Name Must Be 6 Charectors Long*</Text>}
                        </View>

                        {/* -----------------------------------------------------------------------------------------EMAIL */}

                        <View style={styles.fieldNicon}>
                            <FontAwesome5 name={'envelope'} style={{ color: '#ff8c00', top: 12, marginRight: 7, width: 25, height: 25 }} size={this.state.iconsize} solid color={'white'} />
                            <TextInput style={styles.fields} placeholder='Email' placeholderTextColor='#000' textContentType="emailAddress" onChangeText={(text) => { this.setState({ email: text }) }} />
                            {(email == '') ? null : (email.length > 5) ? <FontAwesome5 style={styles.iconbox} name={'check-circle'} size={this.state.iconsize} color={'green'} solid /> /* green */ : <FontAwesome5 style={styles.iconbox} name={'times-circle'} size={this.state.iconsize} color={'#f54242'} solid /> /* falce red */}
                        </View>
                        <View style={{ width: '100%' }}>
                            {(email == '') ? null : (email.length > 5) ? <Text style={styles.doneText}>Seems Good!</Text> : <Text style={styles.alertText}>Email Required*</Text>}
                        </View>

                        {/* -----------------------------------------------------------------------------------------MOBILE */}

                        <View style={styles.fieldNicon}>
                            <FontAwesome5 name={'phone-alt'} style={{ color: '#ff8c00', top: 12, marginRight: 7, width: 25, height: 25 }} size={this.state.iconsize} solid color={'white'} />

                            <TextInput style={styles.fields} placeholder='Mobile' placeholderTextColor='#000' maxLength={10} keyboardType="phone-pad" onChangeText={(mob) => this.mobileFormat(mob)} />

                            {(mobile.length == 0) ? null : (mobile.length == 10) ? <FontAwesome5 style={styles.iconbox} name={'check-circle'} size={this.state.iconsize} color={'green'} solid /> /* GREEN */ : <FontAwesome5 style={styles.iconbox} name={'times-circle'} size={this.state.iconsize} color={'#f54242'} solid /> /* falce red */}
                        </View>
                        <View style={{ width: '100%' }}>
                            {(mobile.length == 0) ? null : (mobile.length == 10) ? <Text style={styles.doneText}>Ok!</Text> : <Text style={styles.alertText}>10 Digit Mobile Number Required*</Text>}
                        </View>

                        {/* -----------------------------------------------------------------------------------------ADDRESS*/}

                        <View style={[styles.fieldNicon, { alignItems: 'flex-start' }]}>
                            <FontAwesome5 name={'address-book'} style={{ color: '#ff8c00', top: 12, marginRight: 10, width: 25, height: 25, justifyContent: 'center', alignItems: 'center' }} size={this.state.iconsize} solid color={'white'} />
                            <TextInput style={[styles.fields, { width: '85%' }]} placeholder='Address' placeholderTextColor={'#000'} multiline={true} autoCapitalize='words' onChangeText={(text) => this.setState({ address: text })} />
                        </View>
                        <View style={{ width: '100%' }}>
                            {(address == '') ? null : (address.length > 20) ? null : <Text style={styles.alertText} >Please Enter Detailed Address</Text>}
                        </View>

                        {/* -----------------------------------------------------------------------------------------CITY AND PINCODE */}
                        <View style={{ width: '100%', flexDirection: 'row', marginVertical: 5, justifyContent: 'space-between' }}>
                            <View style={[styles.picker, { width: '49%', justifyContent: 'center', fontWeight: 'bold' }]}>
                                <FontAwesome5 name={'city'} style={{ color: '#ff8c00', top: 26, width: 22, height: 25, left: 18 }} size={this.state.iconsize} solid color={'white'} />
                                <Picker style={{ color: '#000', bottom: 13, marginLeft: 40, width: '80%', fontSize: 100 }} selectedValue={selectedCity}
                                    onValueChange={(text) => this.setState({ selectedCity: text })} >
                                    {configData.surat_Talukas.map((item, index) => {
                                        return (
                                            (item == 'Remove FIlter') ? null
                                                : (<Picker.Item label={item} value={item} key={index} />)
                                        )
                                    })}
                                </Picker>
                            </View>
                            <View style={{
                                backgroundColor: '#ffffff',
                                borderRadius: 12,
                                fontWeight: "bold",
                                height: 50,
                                width: '49%',
                                paddingHorizontal: 15,
                                flexDirection: 'row'
                            }}>
                                <FontAwesome5 name={'map-pin'} style={{ color: '#ff8c00', top: 12, width: 25, height: 25, }} size={this.state.iconsize} solid color={'white'} />
                                <TextInput style={styles.fields} placeholder='Pincode' placeholderTextColor={'#000'} maxLength={6} keyboardType='number-pad' onChangeText={(text) => { this.setState({ pincode: text }) }} />
                                {console.log('pincode length=>', pincode.length)}
                            </View>
                        </View>
                        {/* -----------------------------------------------------------------------------------------GENDER AND AGE */}

                        <View style={{ width: '100%', flexDirection: 'row', marginVertical: 5, justifyContent: 'space-between' }}>

                            <View style={[styles.picker, { width: '49%' }]}>
                                <FontAwesome5 name={'birthday-cake'} style={{ color: '#ff8c00', top: 12, width: 22, height: 25, left: 18 }} size={this.state.iconsize} solid color={'white'} />

                                <Picker style={{ color: '#000', bottom: 25, marginLeft: 40 }} selectedValue={this.state.selectedage}
                                    onValueChange={(text) => this.setState({ selectedage: text })} >
                                    {configData.age.map((item, index) => {
                                        return (<Picker.Item label={item} value={item} key={index} />);
                                    })}

                                </Picker>
                            </View>
                            <View style={[styles.picker, { width: '49%' }]}>
                                <FontAwesome5 name={'transgender-alt'} style={{ color: '#ff8c00', top: 12, width: 22, height: 25, left: 18 }} size={this.state.iconsize} solid color={'white'} />

                                <Picker style={{ color: '#000', bottom: 25, marginLeft: 40 }} selectedValue={this.state.selectegender}
                                    onValueChange={(text) => this.setState({ selectegender: text })} >
                                    {configData.gender.map((item, index) => {
                                        return (<Picker.Item label={item} value={item} key={index} />);
                                    })}
                                </Picker>
                            </View>
                        </View>



                        {/* -----------------------------------------------------------------------------------------PASSWORD */}

                        <View style={styles.fieldNicon}>
                            <FontAwesome5 name={'unlock'} style={{ color: '#ff8c00', top: 12, marginRight: 7, width: 25, height: 25 }} size={this.state.iconsize} solid color={'white'} />

                            <TextInput style={styles.fields} placeholder="Password" placeholderTextColor='#000' secureTextEntry onChangeText={(pass) => { this.setState({ password: pass }) }} />
                            {(password == '') ? null : (password.length >= 8) ? <FontAwesome5 style={styles.iconbox} name={'check-circle'} size={this.state.iconsize} color={'green'} solid /> /* green */ : <FontAwesome5 style={styles.iconbox} name={'times-circle'} size={this.state.iconsize} color={'#f54242'} solid /> /* falce red */}
                        </View>
                        <View style={{ width: '100%' }}>
                            {(password == '') ? null : (password.length > 0 && password.length <= 3) ? <Text style={styles.alertText}>Short*</Text> : (password.length >= 4 && password.length <= 7) ? <Text style={styles.weakpassword}>Weak !</Text> : <Text style={styles.doneText}>Strong !</Text>}
                        </View>

                        {/* -----------------------------------------------------------------------------------------CONFIRM PASSWORD */}

                        <View style={styles.fieldNicon}>
                            <FontAwesome5 name={'unlock'} style={{ color: '#ff8c00', top: 12, marginRight: 7, width: 25, height: 25 }} size={this.state.iconsize} solid color={'white'} />

                            <TextInput style={styles.fields} placeholder='Confirm Password' placeholderTextColor='#000' keyboardType='visible-password' onChangeText={(repass) => { this.setState({ repassword: repass }) }} />
                            {(repassword == '') ? null : (repassword == password) ? <FontAwesome5 style={styles.iconbox} name={'check-circle'} size={this.state.iconsize} color={'green'} solid /> /* green */ : <FontAwesome5 style={styles.iconbox} name={'times-circle'} size={this.state.iconsize} color={'#f54242'} solid /> /* falce red */}
                        </View>
                        <View style={{ width: '100%' }}>
                            {(password == '' && repassword == '') ? null : (repassword == password) ? <Text style={styles.doneText}>Matched!</Text> : <Text style={styles.alertText}>Password not matched*</Text>}
                        </View>

                        {/* -----------------------------------------------------------------------------------------Profile Pic */}

                        <TouchableOpacity style={styles.uploadbtn}
                            onPress={this.optionsToChoose}
                        >
                            <FontAwesome5 name={'upload'} size={25} color={'#ff8c00'} style={{ paddingRight: 10 }} />
                            <Text style={{ color: '#000', fontSize: 17, }} >Upload Your Profile Picture</Text>
                        </TouchableOpacity>

                        {/* -----------------------------------------------------------------------------------------SIGNUP BUTTON */}
                        <View>
                            <Pressable style={(pressed) ? styles.succsessbtn : styles.SignupBtn} onPress={this.onpores} disabled={pressed} flexDirection="row" >
                                {/* <Image style={{ width: 25, height: 25, alignSelf: 'center', marginRight: 7 }} source={require('../imgs/icons/Orange.png')} /> */}

                                {(pressed) ? <Text style={styles.Sbtntxt}>Done</Text> : <Text style={styles.Sbtntxt}>SignUp</Text>}

                            </Pressable>
                        </View>


                        {/* -----------------------------------------------------------------------------------------SIGNUP BUTTON */}
                        {/* <View style={{ flexDirection: 'row', bottom: 20 }}>
              <Pressable style={(pressed) ? styles.succsessbtn : styles.GoogleBtn} onPress={this.onpores} disabled={pressed} flexDirection="row">
                <Image style={{ alignSelf: 'center', marginRight: 7, width: 22, height: 22, }} source={require('./assets/imgs/icons/google.png')} />
                <View style={{ width: '50%' }}>
                  {(pressed) ? <Text style={styles.btntxt}>Done</Text> : <Text style={styles.btntxt}>Google</Text>}
                </View>
              </Pressable>
              <View style={{
                justifyContent: 'center',
                top: 13,
              }}>
                <Text style={{
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: 20,
                  padding: 21,
                }}>
                  OR
                </Text>
              </View>
              <Pressable style={(pressed) ? styles.succsessbtn : styles.SignupBtn} onPress={this.onpores} disabled={pressed} flexDirection="row" >
                <FontAwesome5 name={'sign-in-alt'} style={{ color: '#ff8c00', alignSelf: 'center', marginRight: 7, width: 25, height: 25 }} size={22} solid color={'white'} />
                <View style={{ width: '50%' }}>
                  {(pressed) ? <Text style={styles.btntxt}>Done</Text> : <Text style={styles.btntxt}>SignUp</Text>}
                </View>
              </Pressable>
            </View> */}

                        <View style={{ justifyContent: 'center', alignSelf: 'center', padding: 10 }}>
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17 }}>Already Have An Account? <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 17, textDecorationLine: 'underline' }} onPress={this.gotoaLogin}>Click Here.</Text></Text>
                        </View>

                        {/* <View style={{
              width: '100%',
              marginTop: 15,
              backgroundColor: '#fff',
              paddingLeft: 20,
              paddingRight: 20,
              borderRadius: 12,
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
              <Text style={styles.btntxt}
                onPress={this.gotoaLogin}>SignIn</Text>
            </View> */}

                    </ScrollView>
                </View>
            </View>
        );

    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#ededed',
        justifyContent: 'center',
        alignItems: 'center',
        height: "100%",
        width: '100%',
    },
    logobox: {
        width: width,
        height: '20%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        top: '45%',
    },
    modelview: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modelviewdata: {
        height: 350,
        width: '80%',
        backgroundColor: "#ff8c00",
        alignItems: 'center',
        justifyContent: 'space-evenly',
        padding: 30,
        borderRadius: 20,
    },
    logo: {
        width: 380,
        height: 95,
    },
    data: {
        flex: 2,
        backgroundColor: '#ff8c00',
        width: '100%',
        height: height,
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    fieldNicon: {
        maxHeight: 70,
        width: '100%',
        backgroundColor: 'white',
        flexDirection: 'row',
        borderRadius: 12,
        paddingLeft: 20,
        marginVertical: 5
    },
    fields: {
        width: '80%',
        borderRadius: 12,
        letterSpacing: 1.5,
        color: '#000',
        fontSize: 17,
        marginRight: 20,
    },
    iconbox: {
        alignSelf: 'center',
        right: 15
    },
    btn: {
        width: '40%',
        // marginTop: 10,
        backgroundColor: '#fff',
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 12,
        justifyContent: 'center',
    },
    SignupBtn: {
        width: '100%',
        marginTop: 5,
        backgroundColor: '#003687',
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 12,
        justifyContent: 'center',
        alignSelf: 'center',
        // borderWidth: 1,
        // borderColor: '#000'
    },
    //Old With Google

    // SignupBtn: {  
    //   width: '40%',
    //   marginTop: 30,
    //   backgroundColor: '#fff',
    //   paddingLeft: 20,
    //   paddingRight: 20,
    //   borderRadius: 12,
    //   justifyContent: 'center',
    // },
    GoogleBtn: {
        width: '40%',
        marginTop: 30,
        backgroundColor: '#fff',
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 12,
        justifyContent: 'center',
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
    modelHeader: {
        width: '100%',
        lineHeight: 60,
        backgroundColor: '#ff8c00',
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 17,
        color: '#ffffff',
    },
    succsessbtn: {
        width: '100%',
        marginTop: 5,
        backgroundColor: 'green',
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 12,
        justifyContent: 'center',
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: '#000'
    },
    btntxt: {
        fontSize: 15.5, //17
        lineHeight: 50,
        color: 'white',
        color: '#000',
        fontWeight: "bold",
        textAlign: 'center',
    },
    Sbtntxt: {
        fontSize: 15.5, //17
        lineHeight: 50,
        // color: 'white',
        color: 'white',
        fontWeight: "bold",
    },
    alertText: {
        color: '#f54242',
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
    heading: {
        color: '#fff',
        fontSize: 31,
        fontWeight: 'bold',
        marginBottom: 10
    },
    picker: {
        // width: '49%',
        backgroundColor: '#ffffff',
        borderRadius: 12,
        fontWeight: "bold",
        height: 50
    },

    // ---------------------
    image_option: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        backgroundColor: '#ffffff',
        width: 400,
        height: 60,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#ff8c00',
        justifyContent: 'center',
        alignItems: 'center',
    },
    takePhoto: {
        backgroundColor: '#ffffff',
        width: 400,
        height: 60,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ChoosPhoto: {
        backgroundColor: '#ffffff',
        width: 400,
        height: 60,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    uploadbtn: {
        height: 50,
        width: '100%',
        backgroundColor: '#ffffff',
        marginVertical: 5,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closebtn: {
        height: 50,
        width: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        marginTop: 10,
    },
});