import React from 'react';
import { View, StyleSheet, Text, TextInput, Image, ToastAndroid, Dimensions, ScrollView, Alert, TouchableOpacity, Modal, Pressable, ActivityIndicator, LogBox } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import configData from './env.json';
import ImagePicker from 'react-native-image-crop-picker';
import { FlatGrid } from 'react-native-super-grid';
// import  from '@react-native-community/datetimepicker';

const { height } = Dimensions.get('screen');

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
  'new NativeEventEmitter()` was called with a non-null argument without the required `addListener` method.',
  'new NativeEventEmitter()` was called with a non-null argument without the required `removeListeners` method.',
  'Each child in a list should have a unique "key" prop.'
]);

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
      is_image_uploaded: false,
      show_date_model: false,
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
  };

  mobileFormat(mob) {
    if (typeof mob !== undefined) {

      this.setState({ mobile: mob.replace(/([- .,])/g, "") });

      console.log('mobile: ', mob, ' length: ', mob.length);
    }
  };

  optionsToChoose = () => {
    this.setState({ modelVisibility: true });
  };

  onSuccess = async (res) => {
    console.log('msgggdssdsdd', res);
    this.setState({ image: res['assets'][0] });

  };

  fromCamera = async (image) => {

    let a = Math.floor(Math.random() * 10000) + 10000;
    const b = {
      fileName: a,
      base64: image.data
    }
    this.setState({ image: b });
    // console.log('IMAGE: ', this.state.image);
    this.setState({ is_image_uploaded: true })
    this.setState({ showimage: image.path })
  };

  Choose_Picture = async () => {
    this.setState({ modelVisibility: false });
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      includeBase64: true

    }).then(image => {
      this.fromCamera(image)
    });
  };

  take_Picture = async () => {
    this.setState({ modelVisibility: false });
    await ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: false,
      includeBase64: true
    }).then(image => {
      this.fromCamera(image);
    });
  };

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
      const response = await axios.post(configData.SERVER_URL + 'otp_generate.php', {
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
      ToastAndroid.show('Verified', ToastAndroid.SHORT);
      console.log('register? :: ', response.data);
      this.setState({ verifyLoader: false });
      this.setState({ otp_verify_model: false });
      await this.onpores();
    } else {
      alert("Please enter valied OTP.");
      this.setState({ verifyLoader: false });
    }
  };

  onpores = async () => {
    const { username, password, mobile, email, repassword, validemail, selectegender, age, address, image, pincode, talukaLable } = this.state;

    if (username.length > 5 && (email.length > 5 && validemail) && mobile.trim && mobile.length == 10 && pincode.length == 6) {
      if (age != 'Age' && selectegender != 'Select Your Gender' && talukaLable != 'Select City') {
        if (password != '' && repassword != '') {
          if ((password === repassword) && (password.length > 7) && (repassword.length > 7) && address.length > 20) {
            this.setState({ loader: true });
            this.setState({ pressed: true });
            // console.log(EXIST.data);

            try {
              const response = await axios.post(configData.SERVER_URL + 'insert.php', {
                username: username,
                email: email,
                password: password,
                mobile: mobile,
                gender: selectegender,
                age: age,
                image: image,
                address: address,
                city: talukaLable,
                pincode: pincode,
              });

              if (response.data.success) {
                ToastAndroid.show('Congratulations Your Succesfully Registreted', ToastAndroid.LONG);
                this.props.navigation.navigate('Login', { new_created: email });
                this.setState({ loader: false });
              } else {
                console.log('message : ', response.data);
                this.setState({ loader: false });
                throw new Error(" 29 try An error has occurred");
              }
            } catch (error) { alert(error); this.setState({ loader: false }); }
            // }
          } else { null }
        } else { alert("Password is important for your privacy."); }
      } else { alert("Please Select Your  gender and Age"); }
    } else { alert("There is no way to SignUp without filling all fields.\nPlease fill all the fields propperly."); }
  };

  render() {

    const { username, password, mobile, email, repassword, talukaModal, is_image_uploaded, loader, address, talukaLable, agemodel, modelVisibility, age, selectegender, gendermodel, show_date_model } = this.state;
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} >
        {/* CHOOSE-IMAGE---------------------------------------------------------------- */}
        <>
          <Modal
            visible={modelVisibility}
            animationType='slide'
            transparent={true}
            onRequestClose={() => { this.setState({ modelVisibility: false }) }}
          >
            <View style={styles.modelview} >
              <View style={styles.header}><Text style={{ fontWeight: '900', fontSize: 14 }}>How would you like to choose your photo?</Text></View>
              <TouchableOpacity activeOpacity={0.8} style={styles.takePhoto} onPress={this.take_Picture} ><Text style={{ fontWeight: '700', fontSize: 14 }}>Take Photo</Text></TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} style={styles.ChoosPhoto} onPress={this.Choose_Picture}><Text style={{ fontWeight: '700', fontSize: 14 }}>Choos Photo From Galary</Text></TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} style={styles.closebtn} onPress={() => { this.setState({ modelVisibility: false }) }} >
                <FontAwesome5 name={'times'} size={30} color={'black'} />
              </TouchableOpacity>
            </View>
          </Modal>
        </>
        {/* TALUKA MODAL----------------------------------------------------------- */}
        <>
          <Modal
            visible={talukaModal}
            // visible={true}
            transparent={true}
            onRequestClose={() => { this.setState({ talukaModal: false }) }}
          >
            <View style={styles.modelview}>
              <View style={{ height: 600, width: '85%', borderRadius: 17, overflow: 'hidden', backgroundColor: '#ffffff' }}>
                <Text style={styles.modelHeader}>Select Tluka</Text>
                <ScrollView style={{ flex: 1 }}>
                  {configData.surat_Talukas.map((item) => {
                    return (
                      <TouchableOpacity
                        onPress={async () => {
                          await this.setState({ talukaLable: item });
                          this.setState({ talukaModal: false });
                          console.log('taluka lable : ', this.state.talukaLable);
                        }}
                        activeOpacity={0.8} style={styles.list} >
                        {<Text style={{ fontWeight: '700', elevation: 20, color: '#000000' }}>{item}</Text>}
                      </TouchableOpacity>
                    )
                  })}
                </ScrollView>
              </View>
            </View>
          </Modal>
        </>
        {/* AGE MODAL----------------------------------------------------------- */}
        <>
          <Modal
            visible={agemodel}
            // visible={true}
            transparent={true}
            onRequestClose={() => { this.setState({ agemodel: false }) }}
          >
            <View style={{
              height: 600, width: 170,
              marginLeft: 30, marginTop: '20%',
              borderRadius: 17, overflow: 'hidden',
              backgroundColor: '#ffffff', elevation: 10,
            }}>
              <ScrollView>
                {
                  configData.age.map((item) => {
                    return (
                      <TouchableOpacity
                        style={{
                          backgroundColor: '#ffffff',
                        }}
                        onPress={async () => {
                          await this.setState({ age: item });
                          this.setState({ agemodel: false });
                          console.log('age selection :: ', this.state.age);
                        }}
                      >
                        <Text style={{
                          fontWeight: '700',
                          elevation: 20, color: '#000000',
                          lineHeight: 40, backgroundColor: '#ffffff',
                          fontSize: 12, textAlign: 'center',
                        }}>{item}</Text>
                      </TouchableOpacity>
                    )
                  })
                }
              </ScrollView>
            </View>
            {/* </View> */}
          </Modal>
        </>
        {/* GENDER MODAL----------------------------------------------------------- */}
        <>
          <Modal
            visible={gendermodel}
            // visible={true}
            transparent={true}
            onRequestClose={() => { this.setState({ gendermodel: false }) }}
          >
            <View style={{
              width: 250,
              borderRadius: 17,
              overflow: 'hidden',
              backgroundColor: '#000000',
              elevation: 20,
              top: '40%',
              left: '40%',
            }}>
              <ScrollView>
                {configData.gender.map((genderItem) => {
                  return (
                    <TouchableOpacity
                      style={{ backgroundColor: '#ffffff' }}
                      activeOpacity={0.8}
                      onPress={async () => {
                        await this.setState({ selectegender: genderItem });
                        console.log('gender: ', this.state.selectegender);
                        await this.setState({ gendermodel: false });
                      }}>
                      {<Text style={{
                        fontWeight: '700',
                        elevation: 20,
                        color: '#000000',
                        backgroundColor: '#ffffff',
                        lineHeight: 60,
                        textAlign: 'center', fontSize: 12
                      }}>{genderItem}</Text>}
                    </TouchableOpacity>
                  )
                })}
              </ScrollView>
            </View>
            {/* </View> */}
          </Modal>
        </>
        {/* OTP VERIFICATION MODAL------------------------------------------------------ */}
        <>
          <Modal
            visible={this.state.otp_verify_model}
            // visible={true}
            transparent={true}
            onRequestClose={() => { this.setState({ otp_verify_model: false }) }}
          >
            <View style={styles.modelview}>
              <View style={styles.modelviewdata}>
                <Text style={{ letterSpacing: 2, marginTop: 30, color: 'white', fontWeight: '800', textAlign: 'center', fontSize: 17, lineHeight: 25 }}>Enter your One Time Password below which is sent in your Email : <Text style={{ color: '#000', fontWeight: 'bold', textDecorationLine: 'underline' }}>{email}</Text></Text>

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
                      ? <ActivityIndicator color={'black'} />
                      : <FontAwesome5 name={'arrow-circle-right'} size={this.state.iconsize} solid color={'black'} />
                  }

                </Pressable>
                <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'black' }}>*Note: <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'white' }}>If you dont receive any OTP from our side please request again or let us know <Text style={{ color: '#000', textDecorationLine: 'underline' }}>Click Here</Text></Text></Text>

              </View>
            </View>

          </Modal>
        </>

        <View style={styles.container}>

          {/* LOGO------------------------------------------------------------------------------------ */}
          <>
            <View style={styles.logobox}>
              <Image style={styles.logo} source={require('./assets/imgs/icons/logo1.png')} />
            </View>
          </>
          <View style={styles.data}>

            <Text style={styles.heading}>
              Hello, {'\n'}
              Create New Account
            </Text>

            {/* NAME---------------------------------------------------------------------------------- */}
            <>
              <View style={styles.fieldNicon}>

                <FontAwesome5 name={'user-tie'} style={{ color: '#ff8c00', marginRight: 7, width: 25, height: 25 }} size={this.state.iconsize} solid color={'white'} />
                <TextInput
                  style={styles.fields}
                  placeholder='Enter Your Full Name'
                  placeholderTextColor={'#000'}
                  autoCapitalize='words'
                  onChangeText={(text) => { this.setState({ username: text }) }}
                />
                {(username == '')
                  ? null
                  : (username.length > 5)
                    ? <FontAwesome5 style={styles.iconbox} name={'check-circle'} size={this.state.iconsize} color={'green'} solid /> /* green */
                    : <FontAwesome5 style={styles.iconbox} name={'times-circle'} size={this.state.iconsize} color={'red'} solid /> /* falce red */}
              </View>
              <View style={{ width: '100%' }}>
                {(username == '') ? null : (username.length > 5) ? <Text style={styles.doneText}>Matched!</Text> : < Text style={styles.alertText}>Name Must Be 6 Charectors Long*</Text>}
              </View>
            </>

            {/* EMAIL--------------------------------------------------------------------------------- */}
            <>
              <View style={styles.fieldNicon}>
                <FontAwesome5 name={'envelope'} style={{ color: '#ff8c00', marginRight: 7, width: 25, height: 25 }} size={this.state.iconsize} solid color={'white'} />
                <TextInput style={styles.fields} placeholder='Email Address' placeholderTextColor={'#000'} keyboardType='email-address' onEndEditing={this.alertbox} onChangeText={(text) => { this.validate(text) }} />
                {(email == '') ? null : (email.length > 5 && this.state.validemail) ? <FontAwesome5 style={styles.iconbox} name={'check-circle'} size={this.state.iconsize} color={'green'} solid /> /* green */ : <FontAwesome5 style={styles.iconbox} name={'times-circle'} size={this.state.iconsize} color={'red'} solid /> /* falce red */}
              </View>
              <View style={{ width: '100%' }}>
                {(email == '') ? null :
                  (email.length > 5 && this.state.validemail) ? <Text style={styles.doneText}>Seems good!</Text> : <Text style={styles.alertText}>Please enter Valied Email.</Text>}
              </View>
            </>

            {/* MOBILE-------------------------------------------------------------------------------- */}
            <>
              <View style={styles.fieldNicon}>
                <FontAwesome5 name={'phone-alt'} style={{ color: '#ff8c00', marginRight: 7, width: 25, height: 25 }} size={this.state.iconsize} solid color={'white'} />
                <TextInput style={styles.fields} placeholder='Mobile Number' placeholderTextColor={'#000'} maxLength={10} keyboardType='numeric' onChangeText={(mob) => this.mobileFormat(mob)} />

                {(mobile.length == 0) ? null : (mobile.length == 10) ? <FontAwesome5 style={styles.iconbox} name={'check-circle'} size={this.state.iconsize} color={'green'} solid /> /* GREEN */ : <FontAwesome5 style={styles.iconbox} name={'times-circle'} size={this.state.iconsize} color={'red'} solid /> /* falce red */}
              </View>
              <View style={{ width: '100%' }}>
                {(mobile.length == 0) ? null : (mobile.length == 10) ? <Text style={styles.doneText}>Ok!</Text> : <Text style={styles.alertText}>10 Digit Mobile Number Required*</Text>}
              </View>
            </>

            {/* ADDRESS--------------------------------------------------------------------------------*/}
            <>
              <View style={[styles.fieldNicon, { alignItems: 'center' }]}>
                <FontAwesome5 style={{ width: 30, height: 30 }} name='map-marker-alt' size={25} color="#ff8c00" solid />

                <TextInput style={[styles.fields, { width: '90%' }]} placeholder='Enter Your Detailed Address' placeholderTextColor={'#000'} multiline={true} autoCapitalize='words' onChangeText={(text) => this.setState({ address: text })} />
              </View>
              <View style={{ width: '90%' }}>
                {(address == '') ? null : (address.length > 20) ? null : <Text style={styles.alertText} >Please Enter Detailed Address</Text>}
              </View>
            </>

            {/* CITY AND PINCODE---------------------------------------------------------------------- */}
            <>
              <View style={{ width: '100%', flexDirection: 'row', marginVertical: 5, justifyContent: 'space-between' }}>

                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[styles.picker, { width: '49%', justifyContent: 'center', alignItems: 'center' }]}
                  onPress={() => { this.setState({ talukaModal: true }) }}>
                  <Text style={{
                    // fontWeight: '700',
                    fontSize: 14,
                    color: (talukaLable == 'Select Taluka') ? '#000' : '#000000'
                  }}
                  >{talukaLable}</Text>
                </TouchableOpacity>

                <View style={{
                  backgroundColor: '#ffffff',
                  borderRadius: 12,
                  // fontWeight: "bold",
                  height: 50,
                  width: '49%',
                  paddingHorizontal: 15,
                  flexDirection: 'row',
                  elevation: 5,
                }}>
                  <FontAwesome5 name={'map-pin'} style={{ color: '#ff8c00', top: 12, width: 25, height: 25, justifyContent: 'center', alignItems: 'center' }} size={this.state.iconsize} solid color={'white'} />
                  <TextInput style={styles.fields} placeholder='Pincode' placeholderTextColor={'#000'} maxLength={6} keyboardType='number-pad' onChangeText={(text) => { this.setState({ pincode: text }) }} />
                </View>
              </View>
            </>

            {/* Gender AND AGE ----------------------------------------------------------------------- */}
            <>
              <View style={{ width: '100%', flexDirection: 'row', marginVertical: 5, justifyContent: 'space-between' }}>
                <View style={[{ width: '49%' }]}>
                  <TouchableOpacity
                    style={[styles.picker, { width: '100%', justifyContent: 'center' }]}
                    onPress={() => { this.setState({ agemodel: true }) }}>

                    <Text
                      style={{
                        // fontWeight: '700',
                        fontSize: 14,
                        color: (age == 'Age') ? "#000" : "#000000",
                        textAlign: 'center'
                      }}>{age}</Text>
                  </TouchableOpacity>
                </View>
                <View style={[{ width: '49%' }]}>
                  <TouchableOpacity
                    style={[styles.picker, {
                      width: '100%',
                      justifyContent: 'center'
                    }]}
                    onPress={() => { this.setState({ gendermodel: true }) }}>

                    <Text
                      style={{
                        // fontWeight: '700',
                        fontSize: 14,
                        color: (selectegender == 'Select Your Gender') ? "#000" : "#000000",
                        textAlign: 'center'
                      }}>{selectegender}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>

            {/* PASSWORD ------------------------------------------------------------------------------ */}
            <>
              <View style={styles.fieldNicon}>
                <FontAwesome5 style={{ width: 30, height: 30 }}
                  name={
                    (password == '')
                      ? 'unlock'
                      : (password.length >= 8)
                        ? 'lock'
                        : 'unlock'
                  } size={25} color="#ff8c00" solid />

                <TextInput
                  style={styles.fields}
                  secureTextEntry={!this.state.show_Password}
                  placeholder="Create Password"
                  placeholderTextColor={'#000'}
                  onChangeText={(pass) => { this.setState({ password: pass }) }} />
                {(password == '') ? null : (password.length >= 8) ? <FontAwesome5 style={styles.iconbox} name={'check-circle'} size={this.state.iconsize} color={'green'} solid /> /* green */ : <FontAwesome5 style={styles.iconbox} name={'times-circle'} size={this.state.iconsize} color={'red'} solid /> /* falce red */}
              </View>
              <View style={{ width: '100%' }}>
                {(password == '') ? null : (password.length > 0 && password.length <= 3) ? <Text style={styles.alertText}>Short*</Text> : (password.length >= 4 && password.length <= 7) ? <Text style={styles.weakpassword}>Weak !</Text> : <Text style={styles.doneText}>Strong !</Text>}
              </View>
            </>

            {/* CONFIRM PASSWORD----------------------------------------------------------------------- */}
            <>
              <View style={styles.fieldNicon}>
                <FontAwesome5 style={{ color: '#ff8c00', marginRight: 7, width: 25, height: 25 }}
                  name={
                    (repassword == '')
                      ? 'unlock'
                      : (repassword.length >= 8 && repassword == password)
                        ? 'lock'
                        : 'unlock'
                  } size={25} color="#ff8c00" solid />

                <TextInput
                  style={styles.fields}
                  secureTextEntry={!this.state.show_Password}
                  placeholder='Confirm Password'
                  placeholderTextColor={'#000'}
                  onChangeText={(repass) => { this.setState({ repassword: repass }) }} />
                {(repassword == '') ? null : (repassword == password) ? <FontAwesome5 style={styles.iconbox} name={'check-circle'} size={this.state.iconsize} color={'green'} solid /> /* green */ : <FontAwesome5 style={styles.iconbox} name={'times-circle'} size={this.state.iconsize} color={'red'} solid /> /* falce red */}
              </View>
              <View style={{ width: '100%' }}>
                {(password == '' && repassword == '') ? null : (repassword == password) ? <Text style={styles.doneText}>Matched!</Text> : <Text style={styles.alertText}>Password not matched*</Text>}
              </View>
            </>

            {/* Show Password */}
            <>
              <View style={{
                justifyContent: 'flex-start',
                // marginLeft: 10,
                alignSelf: 'flex-start',
                alignItems: 'center',
                width: '100%',
                // paddingLeft: 10,
                flexDirection: 'row',
                left: 5,
              }}>
                <FontAwesome5
                  name={(this.state.show_Password) ? 'check-square' : 'square'}
                  onPress={() => { this.setState({ show_Password: !this.state.show_Password }) }}
                  size={20}
                  solid={this.state.show_Password}
                  color={this.state.show_Password ? 'green' : '#000'}
                />

                <Text
                  onPress={() => { this.setState({ show_Password: !this.state.show_Password }) }}
                  style={{
                    fontSize: 14,
                    lineHeight: 50,
                    fontWeight: '500',
                    color: '#ffffff',
                    justifyContent: 'center',
                    marginLeft: 10,
                  }}>
                  Show Password</Text>
              </View>
            </>

            {/* UPLOAD BTN----------------------------------------------------------------------------- */}
            <>
              <TouchableOpacity activeOpacity={0.8}
                style={[styles.uploadbtn, { backgroundColor: (is_image_uploaded) ? '#33c435' : '#ffffff' }]}
                onPress={this.optionsToChoose}>
                <FontAwesome5 style={{ marginRight: 25, color: '#ff8c00' }} name={'upload'} size={25} />
                <Text style={{
                  color: (is_image_uploaded) ? '#ffffff' : '#000',
                  fontSize: 14,
                }} >Upload Your Profile Picture</Text>
              </TouchableOpacity>
            </>

            {/* SIGNUP BUTTON-------------------------------------------------------------------------- */}
            <>
              {
                (loader) ?
                  <TouchableOpacity activeOpacity={0.8} style={styles.succsessbtn} disabled={true}>
                    <Text style={styles.btntxt}>Loading...</Text>
                  </TouchableOpacity>
                  :
                  <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={this.on_Register}>
                    <Text style={styles.btntxt}>Register</Text>
                  </TouchableOpacity>
              }
            </>

            {/* Already Account-------------------------------------------------------------------------- */}
            <>


              <View style={{ justifyContent: 'center', alignSelf: 'center', padding: 10 }}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17 }}>Already Have An Account? <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 17, textDecorationLine: 'underline' }} onPress={() => this.props.navigation.navigate('Login')}>Click Here.</Text></Text>
              </View>
            </>

          </View>
        </View>


      </ScrollView>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logobox: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30

  },
  logo: {
    width: 400,
    height: 100,
  },
  heading: {
    color: '#fff',
    fontSize: 31,
    fontWeight: 'bold',
    marginBottom: 10
  },
  modelview: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modelviewdata: {
    height: 400,
    width: '90%',
    backgroundColor: configData.theme_color,
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
  modelHeader: {
    width: '100%',
    lineHeight: 60,
    backgroundColor: 'rgb(255, 140, 0)',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 17,
    color: '#ffffff',
  },
  list: {
    paddingVertical: 20,
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.5)',
  },
  header: {
    backgroundColor: '#ffffff',
    width: 400,
    height: 60,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomWidth: 2,
    borderBottomColor: 'rgb(255, 140, 0)',
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
  data: {
    flex: 1,
    backgroundColor: 'rgb(255, 140, 0)',
    width: '100%',
    height: '100%',
    padding: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  fieldNicon: {
    // maxHeight: 70,
    width: '100%',
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginVertical: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    elevation: 5,
  },
  fields: {
    width: '80%',
    borderRadius: 12,
    // fontWeight: "bold",
    fontSize: 15,
    color: '#000000'
  },
  iconbox: {
    alignSelf: "center",
    left: 15,
  },
  picker: {
    // width: '49%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    fontWeight: "bold",
    height: 50,
    elevation: 5
  },
  btn: {
    width: '100%',
    marginTop: 15,
    backgroundColor: '#fff',
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 12,
    height: 50,
    justifyContent: 'center',
    flexDirection: 'row',
    elevation: 5,
    borderWidth: 0.5,
    borderColor: '#000'
  },
  succsessbtn: {
    width: '100%',
    marginTop: 15,
    backgroundColor: '#008CBA',
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 12,
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: '#000'
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
    elevation: 5,

  },
  btntxt: {
    fontSize: 17,
    lineHeight: 50,
    color: 'black',
    fontWeight: "bold",
    textAlign: 'left',
  },
  alertText: {
    color: 'red',
    alignSelf: 'flex-start',
    fontWeight: "bold",
    fontSize: 12,
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
    fontSize: 12,
    paddingLeft: 20
  },
  closebtn: {
    height: 50,
    width: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 50,
  },
  ageBtns: {
    backgroundColor: '#ffb254',
    height: 50, width: 50,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 1
  },

});