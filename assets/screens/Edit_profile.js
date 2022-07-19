import React from 'react';
import {
    StyleSheet, View, Text, Button, Pressable, Image, TextInput, Modal, ScrollView, Alert, RefreshControl, ToastAndroid
    , TouchableOpacity, ActivityIndicator, Dimensions
} from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import configData from '../../env.json';
import axios from 'axios';

import { LogBox } from 'react-native';
LogBox.ignoreLogs([
    "User cancelled image selection",
]);
const { height } = Dimensions.get('screen');
const { width } = Dimensions.get('screen');

export default class EditProfile extends React.Component {
    prop = [];
    constructor(props) {
        super(props);
        prop = props;
        this.state = {
            up_id: prop.route.params.editable_data_id,
            up_username: '',
            up_email: '',
            password: '',
            enteredPassword: '',
            up_mobile: '',
            up_address: '',
            up_city: '',
            up_pincode: '',
            image: undefined,
            showimage: undefined,

            hide: true,
            showpass: false,
            imageset: false,
            refreshing: false,
            modelvisiblity: false,
            modelVisibility2: false,
        }
    };

    componentDidMount = async () => {
        const FETCH = await axios.post(configData.SERVER_URL + 'fetch_userDataForProfile.php', {
            id: this.state.up_id,
        });
        if (FETCH.data.success) {
            // console.log('data :: ', FETCH.data.data);
            // console.log('image_path :: ', configData.SERVER_URL + 'assets/users/' + FETCH.data.data.image);
            this.setState({ refreshing: true });
            this.setState({ up_username: FETCH.data.data.username });
            this.setState({ username: FETCH.data.data.username });
            this.setState({ up_email: FETCH.data.data.email });
            this.setState({ up_mobile: FETCH.data.data.mobile });
            this.setState({ up_address: FETCH.data.data.address });
            this.setState({ up_city: FETCH.data.data.city });
            this.setState({ up_pincode: FETCH.data.data.pincode });
            this.setState({ password: FETCH.data.data.password });
            this.setState({ image: configData.SERVER_URL + 'assets/users/' + FETCH.data.data.image });
            this.setState({ showimage: configData.SERVER_URL + 'assets/users/' + FETCH.data.data.image });
            this.setState({ refreshing: false });
        } else {
            console.log('Data Can not load', FETCH.data.data);
        }
    };



    onpress_update = async () => {
        const { password, enteredPassword } = this.state;

        if (password === enteredPassword) {
            try {
                const { up_id, up_username, up_mobile, up_address, up_city, up_pincode, image } = this.state;
                const response = await axios.post(configData.SERVER_URL + 'update_profile.php', {
                    id: up_id,
                    username: up_username,
                    mobile: up_mobile,
                    address: up_address,
                    city: up_city,
                    pincode: up_pincode,
                    image: image,
                });

                if (response.data.success) {
                    ToastAndroid.show('Update Successfully', ToastAndroid.LONG);
                    // console.log(response.data);
                    this.setState({ refreshing: false });
                    this.setState({ modelvisiblity: false });


                } else {
                    // console.log("_________PROFILE DOESN'T CHANGE_________", response.data);
                    // console.log('image in api :: ', image);
                    ToastAndroid.show('Failed To Update', ToastAndroid.LONG);

                }
            } catch (error) {
                alert(error);
            }
        } else {
            alert("Please Enter Valied Password.");
        }


    }

    onpress_Password = () => {
        this.setState({ modelvisiblity: true });
    }

    on_refresh = () => {
        this.componentDidMount();
    }

    render() {
        const { image, imageset, modelvisiblity,
            up_id, up_username, username, up_mobile, up_address, up_city, up_pincode, Surat
            , showimage } = this.state;

        const toggle = () => {
            this.setState({ hide: !this.state.hide });
        };

        const optionsToChoose = () => {
            this.setState({ modelVisibility2: true });
        }

        const fromCamera = async (image) => {

            let a = Math.floor(Math.random() * 10000) + 10000;
            const b = {
                fileName: a,
                base64: image.data
            }
            this.setState({ image: b });
            console.log('set imae :: ', this.state.image);
            this.setState({ showimage: image.path });
        };

        const Choose_Picture = async () => {
            this.setState({ modelVisibility2: false });
            ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: true,
                includeBase64: true

            }).then(image => {
                fromCamera(image)
            });
        };

        const take_Picture = async () => {
            this.setState({ modelVisibility2: false });
            await ImagePicker.openCamera({
                width: 300,
                height: 400,
                cropping: false,
                includeBase64: true
            }).then(image => {
                fromCamera(image);
            });
        }
        return (

            <ScrollView refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.on_refresh} />}>
                <Modal
                    visible={modelvisiblity}
                    // visible={true}
                    onRequestClose={() => { this.setState({ modelvisiblity: false }) }}>
                    <View style={styles.modelcontainer}>
                        <View>
                            <View style={styles.logobox}>
                                <Image style={styles.logo} source={require('../imgs/Logos/Long.png')} />
                            </View>
                        </View>
                        <View style={styles.modeldata}>
                            <Text style={styles.UPheader}>Enter your current password</Text>
                            <View style={[styles.detailboxes, { alignItems: 'center' }]}>
                                <FontAwesome5 name={'lock'} style={{ color: '#ff8c00', justifyContent: 'center', alignItems: 'center', width: 25, height: 25, alignSelf: 'center',bottom: 2 }} size={25} solid color={'white'} />
                                <TextInput
                                    style={[{ fontSize: 17, width: '85%', color: '#000', letterSpacing: 2.5 , left: 5}]}
                                    placeholder='Current Password'
                                    placeholderTextColor={'#000'}
                                    secureTextEntry={this.state.hide}
                                    onChangeText={(text) => { this.setState({ enteredPassword: text }) }}
                                />
                                <FontAwesome5 style={{ alignSelf: 'center',right:5 }} onPress={() => { this.setState({ hide: !this.state.hide }) }} name={(this.state.hide) ? 'eye-slash' : 'eye'} color={'#000000'} size={20} solid />
                            </View>
                            <TouchableOpacity style={styles.UPmodelbtn} onPress={this.onpress_update} >
                                <Text style={styles.UPmodeltxt}>Update</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <Modal
                    visible={this.state.modelVisibility2}
                    animationType='slide'
                    transparent={true}
                    onRequestClose={() => { this.setState({ modelVisibility2: false }) }}
                >
                    <View style={styles.image_option} >
                        <View style={styles.header}><Text style={{ fontWeight: '900', fontSize: 17, color: '#000' }}>How would you like to choose your photo?</Text></View>
                        <TouchableOpacity style={styles.takePhoto} onPress={take_Picture} ><Text style={{ fontWeight: '700', fontSize: 17, color: '#000' }}>Take Photo</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.ChoosPhoto} onPress={Choose_Picture}><Text style={{ fontWeight: '700', fontSize: 17, color: '#000' }}>Choos Photo From Galary</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.closebtn} onPress={() => { this.setState({ modelVisibility2: false }) }} >
                            <FontAwesome5 name={'times'} size={30} color={'black'} />
                        </TouchableOpacity>
                    </View>
                </Modal>
                <View style={styles.Conatii}>
                    <View style={styles.photoAndname}>
                        <View style={styles.imagebox}>
                            {/* <Image style={styles.image} source={(showimage != '') ? { uri: showimage } : require('../imgs/avatar.jpg')} /> */}
                            {
                                (!this.state.refreshing)
                                    ? <Image style={styles.image} source={(showimage != "") ? { uri: showimage } : require('../imgs/icons/back.png')} />
                                    : <ActivityIndicator size="large" animating={this.state.refreshing} />
                            }
                            <View style={styles.iconedit}>
                                <FontAwesome5 onPress={optionsToChoose} name={'pen'} size={17} color={'#ff8c00'} />
                            </View>

                        </View>
                        <Pressable style={styles.editbtn} onPress={() => { this.props.navigation.navigate('ProfileScreen'); }} >
                            {/* <FontAwesome5 name={'controller-fast-backward'} size={20} color={'#ff8c00'} /> */}
                            <Image source={require('../imgs/icons/orangeback.png')} style={{ width: 35, height: 35,  }} />
                        </Pressable>
                        <View style={{ justifyContent: 'center', alignItems: 'center', top: 8, alignSelf: 'center' }}>
                            <Text style={{ fontSize: 20, color: '#000' }}>{username}</Text>
                            <Text onPress={() => Clipboard.setString('up_id')} style={{ fontSize: 15, fontWeight: 'bold', color: '#000', top: 2 }}>Your User ID:- {up_id}</Text>
                        </View>
                    </View>
                    <View style={styles.databox}>
                        <Text style={{ color: '#000' }}>Name</Text>
                        <View style={styles.detailboxes}>
                            <TextInput style={styles.fields} keyboardAppearance='default'
                                defaultValue={up_username} autoCapitalize='words' maxLength={60}
                                onChangeText={(text) => { this.setState({ up_username: text }) }}
                            />
                        </View>

                        <Text style={{ color: '#000' }}>Mobile Number</Text>
                        <View style={styles.detailboxes}>
                            <TextInput style={styles.fields} keyboardAppearance='default'
                                defaultValue={up_mobile} keyboardType='numeric' maxLength={10}
                                onChangeText={(text) => { this.setState({ up_mobile: text }) }}

                            />
                        </View>

                        <Text style={{ color: '#000' }}>Address</Text>
                        <View style={styles.detailboxes}>
                            <TextInput style={styles.fields} keyboardAppearance='default'
                                multiline={true} maxLength={100}
                                defaultValue={up_address}
                                onChangeText={(text) => { this.setState({ up_address: text }) }}
                            />
                        </View>

                        <Text style={{ color: '#000' }}>City</Text>
                        <View style={[styles.Cityfields, { paddingHorizontal: 0, backgroundColor: 'white', marginVertical: 10 }]} >
                            <Picker style={{ color: '#000', fontWeight: '800' }} selectedValue={up_city}
                                onValueChange={(text) => this.setState({ up_city: text })} >

                                {configData.surat_Talukas.map((item, index) => {
                                    return (
                                        (item == 'Remove FIlter') ? null
                                            : (<Picker.Item label={item} value={item} key={index} />)
                                    );
                                })}

                            </Picker>
                        </View>
                        <Text style={{ color: '#000' }}>Pincode</Text>
                        <View style={styles.detailboxes}>
                            <TextInput style={styles.fields} keyboardAppearance='default'
                                keyboardType='number-pad' maxLength={6}
                                defaultValue={up_pincode}
                                onChangeText={(text) => { this.setState({ up_pincode: text }) }}
                            />
                        </View>

                        <TouchableOpacity style={[styles.modelbtn]}
                            onPress={this.onpress_Password}
                        >
                            <Text style={styles.modeltxt}>Update</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        )
    };
};

const styles = StyleSheet.create({
    Conatii: {
        flex: 1,
        // justifyContent: "center",
        alignItems: 'center',
        backgroundColor: '#fff',
        height: height - 10, //100
        // padding: 30,
    },
    iconedit: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        height: '30%',
        width: '35%',
        bottom: 0,
        right: 0,
        backgroundColor: 'white',
        // borderRadius: 5,
        borderTopLeftRadius: 14,
    },
    photoAndname: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ff8c00',
        width: '100%',
        height: 200,
        paddingHorizontal: 30,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,

    },
    imagebox: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
        width: 100,
        overflow: 'hidden',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#000',
    },

    // OLD
    // imagebox: {
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     height: 100,
    //     width: 100,
    //     overflow: 'hidden',
    //     borderRadius: 20,
    // },

    image: {
        height: 100,
        width: 100
    },
    databox: {
        width: '100%',
        height: '100%',
        padding: 30,
    },
    fields: {
        width: '100%',
        borderRadius: 12,
        fontSize: 17,
        marginRight: 10,
        color: '#000',
    },
    Cityfields: {
        width: '100%',
        borderRadius: 12,
        letterSpacing: 1.5,
        fontWeight: "bold",
        fontSize: 17,
        marginRight: 10,
        color: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
        elevation: 5,
        shadowOpacity: 0.4,
    },
    detailboxes: {
        flexDirection: 'row',
        width: "100%",
        paddingHorizontal: 10,
        marginVertical: 10,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        borderRadius: 15,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
        elevation: 5,
        shadowOpacity: 0.4,

    },
    detailboxes2: {
        flexDirection: 'row',
        width: "40%",
        paddingHorizontal: 10,
        marginVertical: 10,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        borderRadius: 15,
    },
    detaitext: {
        fontSize: 20,
        fontWeight: "900",
    },
    detaitext: {
        fontSize: 18,
        fontWeight: "bold",
        color: '#000'
    },
    modeltxt: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "#ffffff",
        textAlign: 'center',
        // padding: 20
    },
    modelbtn: {
        backgroundColor: '#ff8c00',
        width: '100%',
        paddingVertical: 15,
        alignItems: 'center',
        borderRadius: 12,
        // marginVertical: 20,
        marginTop: 10,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
        elevation: 3,
        shadowOpacity: 0.4,
    },
    UPmodelbtn: {
        backgroundColor: '#fff',
        width: '100%',
        paddingVertical: 13,
        alignItems: 'center',
        borderRadius: 10,
        // marginVertical: 20,
        marginTop: 10,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
        elevation: 3,
        shadowOpacity: 0.4,
    },
    UPmodeltxt: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "#ffffff",
        textAlign: 'center',
        color: '#000'
    },
    UPheader: {
        padding: 20,
        fontSize: 20,
        fontWeight: 'bold',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#fff'
    },
    editbtn: {
        position: 'absolute',
        top: 0,
        right: 0,
        height: 60,
        width: 60,
        borderBottomLeftRadius: 50,
        borderTopLeftRadius: 5,
        borderBottomRightRadius: 5,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 15,
        paddingBottom: 15,
    },

    logobox: {
        width: width,
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        top: '40%',
    },
    logo: {
        width: 400,
        height: 83,
    },

    modelcontainer: {
        flex: 1,
        flexDirection: 'column',
        // backgroundColor: '#ededed',
        justifyContent: 'center',
        // alignItems: 'center',
        height: width,
        width: '100%',
    },
    modeldata: {
        flex: 2,
        backgroundColor: '#ff8c00',
        width: '100%',
        height: '100%',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    image_option: {
        flex: 2,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 20,
        paddingLeft: 20,
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