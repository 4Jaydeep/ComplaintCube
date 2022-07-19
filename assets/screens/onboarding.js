import { ImageBackground, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Buttons from '../components/Buttons'
// import {  } from 'react-native-gesture-handler'

const onboarding = (navigation) => {
    return (
        <View style={{ flex: 1, backgroundColor: '#fff', }}>
            {/*Image Section */}
            <View style={{ flex: 3, flexDirection: 'column', backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
                <ImageBackground source={require('../imgs/Background/splash.png')} style={{ flex: 1, width: '100%', height: '50%', top: 120 }} />
            </View>

            {/*Button Section */}
            <View style={{ flex: 2, backgroundColor: 'gray', borderTopRightRadius: 30, borderTopLeftRadius: 30, backgroundColor: '#fff' }}>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', bottom: 100 }}>
                    <Text style={{ color: 'black', fontSize: 30 }}>ComplaintCube</Text>
                    <Text style={{ maxWidth: '50%', color: '#999', fontSize: 14, textAlign: 'center', paddingTop: 10 }}>Dont Face It Just Solve It</Text>
                </View>
                {/* Buttons */}
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', bottom: 50 }}>
                    <TouchableOpacity style={{
                        justifyContent: 'center', width: '90%', height: 50, backgroundColor: '#ff8c00', marginTop: 30, borderRadius: 20, shadowOffset: { width: 0, height: 1 }, shadowRadius: 2, elevation: 3, shadowOpacity: 0.4,
                    }} >
                        <Text style={{ fontSize: 15, letterSpacing: 1.5, textAlign: 'center', color: '#000', justifyContent: 'center', fontWeight: 'bold' }}>SignIn</Text>
                    </TouchableOpacity>
                    <Text style={{ justifyContent: 'center', alignItems: 'center', top: 15, color: '#000', fontWeight: 'bold' }}>Or</Text>
                    <TouchableOpacity style={{
                        justifyContent: 'center', width: '90%', height: 50, backgroundColor: '#fff', marginTop: 30, borderRadius: 20, shadowOffset: { width: 0, height: 1 }, shadowRadius: 2, elevation: 3, shadowOpacity: 0.4,
                    }} >
                        <Text style={{ fontSize: 15, letterSpacing: 1.5, textAlign: 'center', color: '#000', justifyContent: 'center', fontWeight: 'bold' }}>Create An Account</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    )
}

export default onboarding

const styles = StyleSheet.create({})