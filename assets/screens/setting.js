import { Text, StyleSheet, View, Dimensions, Image, ScrollView, TouchableOpacity, Linking } from 'react-native'
import React, { Component } from 'react'
import { } from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const { height } = Dimensions.get('screen');
const { width } = Dimensions.get('screen');

export default class Setting extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', padding: 20, }} >
                    <TouchableOpacity style={{ justifyContent: 'center', alignSelf: 'center' }} onPress={() => { this.props.navigation.navigate('ProfileScreen'); }}>
                        <Image source={require('../imgs/icons/backmain.png')} style={{ width: 30, height: 30, }} />
                    </TouchableOpacity>
                    <Text style={{ color: '#000', fontWeight: 'bold', justifyContent: 'center', alignSelf: 'center', fontSize: 20, }}>Setting</Text>
                    <TouchableOpacity style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Image style={{ width: 20, height: 20, paddingLeft: 20, justifyContent: 'center', alignItems: 'center' }} source={require('../imgs/icons/info.png')} />
                    </TouchableOpacity>
                </View>

                <ScrollView style={{ flex: 2, padding: 20 }}>
                    <View style={{ width: '100%' }}>
                        <View>
                            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20, color: '#000' }}>Help And Feedback</Text>
                        </View>
                        <View style={{ paddingTop: 20 }}>
                            <TouchableOpacity onPress={() => { Linking.openURL('mailto:complaintcube@gmail.com') }} style={{ width: '100%', height: 50, flexDirection: 'row', justifyContent: 'space-between', borderStyle: "dashed", backgroundColor: "rgba(255,255,255,1)", }}>
                                <Image source={require('../imgs/icons/customer-support.png')} style={{ width: 25, height: 25, justifyContent: 'center', alignSelf: 'center', }} />
                                <Text style={{ justifyContent: 'center', alignSelf: 'center', fontWeight: 'bold', color: '#000', paddingRight: 170 }}>Help And Support</Text>
                                <Image source={require('../imgs/icons/right.png')} style={{ width: 25, height: 25, justifyContent: 'center', alignSelf: 'center', }} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ paddingTop: 10 }}>
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate('Feedback'); }} style={{ width: '100%', height: 50, flexDirection: 'row', justifyContent: 'space-between', borderStyle: "dashed", backgroundColor: "rgba(255,255,255,1)", }}>
                                <Image source={require('../imgs/icons/customer-support.png')} style={{ width: 25, height: 25, justifyContent: 'center', alignSelf: 'center', }} />
                                <Text style={{ justifyContent: 'center', alignSelf: 'center', fontWeight: 'bold', color: '#000', paddingRight: 215 }}>Feedback</Text>

                                <Image source={require('../imgs/icons/right.png')} style={{ width: 25, height: 25, justifyContent: 'center', alignSelf: 'center', }} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ paddingTop: 10 }}>
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate('Aboutcomplaintcube'); }} style={{ width: '100%', height: 50, flexDirection: 'row', justifyContent: 'space-between', borderStyle: "dashed", backgroundColor: "rgba(255,255,255,1)", }}>
                                {/* <TouchableOpacity style={{ width: width - 40, height: 50, flexDirection: 'row', justifyContent: 'space-between', borderStyle: "dashed", backgroundColor: "rgba(255,255,255,1)", borderColor: "#ff8c00", borderWidth: 0, borderTopWidth: 2, borderBottomWidth: 2, }}> */}
                                <Image source={require('../imgs/icons/customer-support.png')} style={{ width: 25, height: 25, justifyContent: 'center', alignSelf: 'center', }} />

                                <Text style={{ justifyContent: 'center', alignSelf: 'center', fontWeight: 'bold', color: '#000', paddingRight: 150 }}>About ComplainCube</Text>

                                <Image source={require('../imgs/icons/right.png')} style={{ width: 25, height: 25, justifyContent: 'center', alignSelf: 'center', }} />
                            </TouchableOpacity>
                        </View>


                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
})