import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const Buttons = ({ on_press, btn_txet }) => {
    return (
        <TouchableOpacity style={{ justifyContent: 'center', width: '90%', height: 50, backgroundColor: '#ff8c00', marginTop: 30, borderRadius: 20 }} onPress={on_press} >
            <Text style={{ fontSize: 15, letterSpacing: 1.5, textAlign: 'center', color: '#fff', justifyContent: 'center' }}>{btn_txet}</Text>
        </TouchableOpacity>


    )
}

export default Buttons

const styles = StyleSheet.create({})