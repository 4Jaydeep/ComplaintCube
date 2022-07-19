import { Text, StyleSheet, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import configData from '../../env.json'
import React, { Component } from 'react'

export default class Aboutcomplaintcube extends Component {
    render() {
        return (
            <View style={styles.Compo}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backicon} onPress={() => { this.props.navigation.navigate('ProfileScreen'); }}>
                        <Image source={require('../imgs/icons/backmain.png')} style={{ width: 30, height: 30, }} />
                    </TouchableOpacity>

                </View>


                <View style={styles.data}>
                    <Text style={styles.headertext}>What Is ComplaintCube?</Text>
                    <Text style={styles.bottomtext}>         Complaint cube is a complaint solving application that is made in react native framework. In this application users can see a lot of problems around them like potholes, dead animals, Garbage dumps or overflow dustbins, etc. That should be right, So they can click photos of particular problems and upload them on the application and within a few days take action against problems and try to solve them.</Text>

                    <Text style={styles.headertext}>Contact us</Text>
                    <View style={{ flexDirection: 'row', width: '100%', marginTop: 20, paddingLeft: 30, paddingRight: 10 }}>
                        <Text style={styles.paragraphTEXT}>Email us on  :</Text>
                        <TouchableOpacity hitSlop={{ top: 20, bottom: 20, left: 30, right: 30 }} onPress={() => { Linking.openURL('mailto:complaintcube@gmail.com') }}>
                            <Text style={[styles.paragraphTEXT, { color: '#ff8c00', textDecorationLine: 'underline' }]}>complaintcube@gmail.com</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={{ flexDirection: 'row', width: '100%', marginTop: 20, paddingLeft: 30, paddingRight: 10 }} onPress={() => { Linking.openURL('https://www.google.com/maps/place/SDJ+International+College/@21.145118,72.7763813,17z/data=!4m12!1m6!3m5!1s0x0:0x672dfe4f512e4d87!2sSDJ+International+College!8m2!3d21.145118!4d72.77857!3m4!1s0x0:0x672dfe4f512e4d87!8m2!3d21.145118!4d72.77857') }}>
                        <Text style={styles.paragraphTEXT}>Address        :</Text>
                        <Text style={[styles.paragraphTEXT, { color: configData.component_color, textDecorationLine: 'underline', width: '70%' }]}>SDJ International College, Someshwara Enclave, Vesu, Surat, Gujarat 395007</Text>
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', width: '100%', marginTop: 20, paddingLeft: 30, paddingRight: 10 }}>
                        <Text style={styles.paragraphTEXT}>Contect us   :</Text>
                        <View style={{ width: '50%' }}>
                            <TouchableOpacity onPress={() => { this.dialCall('tel:${' + 8732999707 + '}') }}>
                                <Text style={[styles.paragraphTEXT, { color: configData.component_color, textDecorationLine: 'underline' }]}>+91 8732999707,</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { this.dialCall('tel:${' + 7041526621 + '}') }}>
                                <Text style={[styles.paragraphTEXT, { color: configData.component_color, textDecorationLine: 'underline', marginTop: 3 }]}>+91 7041526621,</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { this.dialCall('tel:${' + 7359312739 + '}') }}>
                                <Text style={[styles.paragraphTEXT, { color: configData.component_color, textDecorationLine: 'underline', marginTop: 3 }]}>+91 7359312739</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Text style={[styles.headertext, { paddingTop: 10 }]}>Help Us</Text>

                    <Text style={[styles.paragraphTEXT, { marginTop: 30, textAlign: 'center' }]}>Let us make our city clean and beautiful by donating to us.</Text>
                    <Text style={[styles.paragraphTEXT, { textAlign: 'center' }]}>To Donate Scan this QR Code</Text>
                    <View style={{ backgroundColor: "#ffffff", marginTop: 30, elevation: 5, alignSelf: 'center', marginBottom: 100 }}>
                        <Image style={{ height: 200, width: 200 }} source={require('../imgs/Background/QR.png')} />
                    </View>

                </View>

            </View>

        )
    }
}

const styles = StyleSheet.create({
    Compo: {
        flex: 1,
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: '#fff',
    },
    backicon: {
        justifyContent: 'center',
        left: 5,
        alignSelf: 'center',
    },
    header: {
        width: '100%',
        height: 50,
        padding: 10,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    data: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        padding: 20,
    },
    headertext: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#000'
    },
    bottomtext: {
        padding: 20,
        textAlign: 'justify',

    }
})