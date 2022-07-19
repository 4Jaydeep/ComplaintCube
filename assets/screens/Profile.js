
import React from 'react';
import { StyleSheet, View, Text, Button, Pressable, Image, ScrollView, TextInput, Dimensions, RefreshControl, TouchableOpacity, ActivityIndicator } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import configData from '../../env.json';
import Clipboard from '@react-native-community/clipboard';
import setting from './setting';


const { height } = Dimensions.get('screen');
const { width } = Dimensions.get('screen');

export default class ProfileScreen extends React.Component {
    prop = [];
    constructor(props) {
        super(props);
        prop = props;
        // console.log('PROFIOLE SCREEN--1---->', prop.route.params.editable_data_id);
        this.state = {
            up_id: prop.route.params.editable_data_id,
            username: '',
            mobile: '',
            email: '',
            address: '',
            city: '',
            pincode: '',
            age: '',
            gender: '',
            gotimage: '',
            refreshing: false,
        }
        // console.log('PROFIOLE SCREEN--1--ID-->', this.state.up_id);

    };


    componentDidMount = async () => {
        this.setState({ refreshing: true });
        const refresh = await axios.post(configData.SERVER_URL + 'fetch_userDataForProfile.php', {
            id: this.state.up_id,
        });
        if (refresh.data.success) {
            // console.log("Profile Data : ", refresh.data.data.image);
            this.setState({ username: refresh.data.data.username });
            this.setState({ mobile: refresh.data.data.mobile });
            this.setState({ email: refresh.data.data.email });
            this.setState({ address: refresh.data.data.address });
            this.setState({ city: refresh.data.data.city });
            this.setState({ pincode: refresh.data.data.pincode });
            this.setState({ age: refresh.data.data.age });
            this.setState({ gender: refresh.data.data.gender });
            this.setState({ gotimage: configData.SERVER_URL + 'assets/users/' + refresh.data.data.image });
            this.setState({ refreshing: false });
            // console.log("gotimage: ", this.state.gotimage);

        } else {
            // console.log(refresh.data);
            this.setState({ refreshing: false });
        }
    }

    on_refresh = () => {
        this.setState({ refreshing: true });
        this.componentDidMount();
        this.setState({ refreshing: false });
    }



    goto_EditProfile = () => {
        this.props.navigation.navigate('EditProfile');
    }

    render() {
        const { up_id, username, id, email, mobile, address, city, pincode, age, gender, gotimage } = this.state;
        return (

            <View style={styles.container}>
                <ScrollView
                    refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.on_refresh} />} >
                    <View style={styles.photoAndname}>
                        <View style={styles.imagebox}>
                            {
                                (!this.state.refreshing) ?
                                    <Image style={styles.image} source={(gotimage != "") ? { uri: gotimage } : require('../imgs/icons/google.png')} />
                                    : <ActivityIndicator size="large" animating={this.state.refreshing} />
                            }
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', top: 8, alignSelf: 'center' }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000' }}>{username}</Text>
                            <Text onPress={() => Clipboard.setString('up_id')} style={{ fontSize: 15, fontWeight: 'bold', color: '#000', top: 2 }}>Your User ID:- {up_id}</Text>
                        </View>
                        <Pressable style={styles.editbtn} onPress={this.goto_EditProfile} >
                            <FontAwesome5 name={'pen'} size={20} color={'#ff8c00'} />
                        </Pressable>
                    </View>

                    <View style={styles.headingtext}>
                        {/* <Text style={{
                            fontWeight: 'bold', fontSize: 20, color: '#000'
                        }}>Your Information</Text> */}


                    </View>
                    <View style={styles.databox}>
                        <View style={styles.detailboxes}>
                            <View style={{ width: '12%', alignItems: 'center' }}>
                                <FontAwesome5 name='envelope' size={22} color={'#ff8c00'} style={{ marginRight: 15 }} solid />
                            </View>
                            <Text style={styles.detaitext}>{email}</Text>
                        </View>

                        <View style={styles.detailboxes}>
                            <View style={{ width: '12%', alignItems: 'center' }}>
                                <FontAwesome5 name='mobile-alt' size={25} color={'#ff8c00'} style={{ marginRight: 15 }} solid />
                            </View>
                            <Text style={styles.detaitext}>{mobile}</Text>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            width: "100%",
                            padding: 10,
                            marginVertical: 10,
                            backgroundColor: '#ffffff',
                            alignItems: 'center',
                            borderRadius: 15,
                            shadowOffset: { width: 1, height: 1 },
                            shadowOpacity: 0.4,
                            shadowRadius: 3,
                            elevation: 5,
                        }}>
                            <View style={{ width: '12%', alignItems: 'center' }}>
                                <FontAwesome5 name='map-marker-alt' size={25} color={'#ff8c00'} style={{ marginRight: 15 }} solid />
                            </View>
                            <Text style={[styles.detaitext, { paddingRight: 25 }]}>{address}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={styles.detailboxes}>
                                <FontAwesome5 name='building' size={25} color={'#ff8c00'} style={{ marginRight: 15 }} solid />
                                <Text style={styles.detaitext}>{city} - {pincode}</Text>
                            </View>

                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={[styles.detailboxes, { width: '48%' }]}>
                                <FontAwesome5 name='venus-mars' size={25} style={{ marginRight: 11 }} color={'#ff8c00'} />
                                <Text style={styles.detaitext} >{gender}</Text>
                            </View>
                            <View style={[styles.detailboxes, { width: '48%' }]}>
                                <FontAwesome5 name='caret-up' size={25} style={{ marginRight: 11 }} color={'#ff8c00'} />
                                <Text style={styles.detaitext} >{age}</Text>
                            </View>
                        </View>

                        <View style={{}}>
                            <TouchableOpacity style={[styles.detailboxes, { width: '100%', justifyContent: 'center', borderColor: '#ff8c00', borderWidth: 1.5 }]} onPress={() => { this.props.navigation.navigate('MyComplaints'); }} >
                                {/* <FontAwesome5 name='scroll' size={25} style={{ marginRight: 15 }} color={'#ff8c00'} /> */}
                                <Text style={styles.detaitext} >My Complaints</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={[styles.detailboxes, { width: '100%', justifyContent: 'center', borderColor: '#ff8c00', borderWidth: 1.5 }]} onPress={() => { this.props.navigation.navigate('setting'); }} >
                            {/* <FontAwesome5 name='wrench' size={25} style={{ marginRight: 15 }} color={'#ff8c00'} /> */}
                            <Text style={styles.detaitext}>Settings</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.logout, { width: '100%', justifyContent: 'center', borderColor: '#ff8c00', borderWidth: 1.5 }]} onPress={() => { this.props.navigation.navigate('setting'); }} >
                            <Text style={styles.detaitext}>Logout</Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </View>

        )
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    photoAndname: {
        // flexDirection: 'row',
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
        alignSelf: 'center',
        height: 100,
        width: 100,
        overflow: 'hidden',
        borderRadius: 20,
        borderColor: '#555',
        borderWidth: 1.5,
    },
    image: {
        height: 100,
        width: 100,
        // top: 25,
        // left: 25
    },
    databox: {

        width: '100%',
        height: '100%',
        // padding: 30,
        paddingLeft: 30,
        paddingRight: 30,
    },
    detailboxes: {

        flexDirection: 'row',
        width: "100%",
        padding: 10,
        marginVertical: 10,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
        // borderWidth: 0.5,
        // borderColor: '#000'
    },
    logout: {
        flexDirection: 'row',
        width: "100%",
        padding: 10,
        marginVertical: 10,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
        // borderWidth: 0.5,
        // borderColor: '#000'
    },
    detaitext: {
        fontSize: 17,
        // fontWeight: "bold",
        color: '#000'
    },
    settingbtn: {
        // position: 'absolute',
        backgroundColor: 'white',
        width: '48%',
        alignSelf: 'flex-end',
        padding: 10,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: '10%',
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
        elevation: 3,
        shadowOpacity: 0.4,
        bottom: 20,
    },
    logout: {
        // position: 'absolute',
        backgroundColor: '#ff8c00',
        width: '48%',
        alignSelf: 'flex-end',
        padding: 10,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: '10%',
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
        elevation: 3,
        shadowOpacity: 0.4,
        bottom: 20,
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
    headingtext: {
        textAlign: 'center',
        paddingTop: 30,
        paddingBottom: 10,
    }
});