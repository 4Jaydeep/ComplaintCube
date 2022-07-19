import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, Linking, TouchableOpacity } from 'react-native';
import configData from '../../env.json';

export default class Help_line_numbers extends Component {

    dialCall = (phone) => {

        let phoneNumber = '';

        if (Platform.OS === 'android') {
            phoneNumber = 'tel:${' + { phone } + '}';
        }
        else {
            phoneNumber = 'telprompt:${1234567890}';
        }
        Linking.openURL(phone);
    };

    render() {
        return (
            <>
                <Text style={styles.header}>Helpline Numbers</Text>
                <ScrollView>
                    <View style={{ flex: 1, padding: 30 }}>
                        <Text style={{ marginVertical: 5, fontSize: 17, fontWeight: '500', color: '#000000', textAlign: 'center',bottom: 5 }}>Tap To Dial</Text>

                        {
                            configData.gov_HhelpLine.map((item) => {
                                return (
                                    <TouchableOpacity style={styles.row} onPress={() => { this.dialCall('tel:${' + Object.values(item) + '}') }}>
                                        <Text style={styles.cell1}>{Object.keys(item)}</Text>
                                        <Text style={styles.cell1}>{Object.values(item)}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                        {
                            console.log("sorted:::", Object.keys(configData.gov_HhelpLine).sort((a, b) => { a.localeCompare(b) }))
                        }
                    </View>

                </ScrollView>
            </>
        )
    }
};

const styles = StyleSheet.create({
    header: {
        width: '100%',
        lineHeight: 75,
        backgroundColor: configData.theme_color,
        textAlign: 'center',
        fontSize: 20,
        color: '#ffffff',
        fontWeight: 'bold',
    },
    row: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        marginVertical: 6,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: "#ffffff",
        padding: 15,
        elevation: 5,
    },
    cell1: {
        fontSize: 14,
        fontWeight: '600',
        color: "#000000",

    },
});
