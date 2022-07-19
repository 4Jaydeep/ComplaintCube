import React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, ScrollView, RefreshControl, Image, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import configData from '../../env.json';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


export default class Feedback extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            feedback: '',
            user_id: '',
            user_name: '',
            image: '',
            fatch_image: '',
            fatch_user_id: '',
            fatch_user_name: '',
            onrefreshing: false,
            image_loading: false,
            list_of_feedback: [],
        };
    };

    componentDidMount = async () => {
        const { list_of_feedback } = this.state;
        let data = await AsyncStorage.getItem('logindata');
        let userdata = JSON.parse(data);
        // console.log('userdata::: ', userdata);
        this.setState({ user_id: userdata.id });
        this.setState({ user_name: userdata.username });
        this.setState({ image: userdata.image });

        const fatch_feedback = await axios.post(configData.SERVER_URL + 'fatch_all_fidback.php', {});

        if (fatch_feedback.data.success) {
            console.log('Fatched_____FEEDBACKS::::', fatch_feedback.data.feedback);
            this.setState({ list_of_feedback: fatch_feedback.data.feedback.reverse() });
        } else {
            console.log('Fatched_____FEEDBACKS::::', fatch_feedback.data);
            console.log('component else:: not run');
        }
    };

    onpress_Submit = async () => {
        const { feedback, user_id, image, user_name } = this.state;
        if (feedback !== '') {
            const response = await axios.post(configData.SERVER_URL + 'Feedback_upload.php', {
                user_id: user_id,
                feedback: feedback,
                image: image,
                username: user_name,
            });
            if (response.data.success) {
                await this.on_refresh();
                alert("thanks for feedback.");
            } else {
                alert("feedback not sent.");
            }
        } else {
            alert("Fidback Is Empty !");
        }


    };

    on_refresh = async () => {
        this.setState({ onrefreshing: true });
        this.setState({ feedback: "" });
        this.componentDidMount();
        this.setState({ onrefreshing: false });
    };

    render() {
        const { list_of_feedback, image } = this.state;
        return (
            <ScrollView style={{ flex: 1 }}
                refreshControl={
                    <RefreshControl refreshing={this.state.onrefreshing} onRefresh={this.on_refresh} />
                }>
                <View style={styles.container}>
                    <Text style={styles.headertext}>Feedback</Text>
                    <TextInput
                        placeholder='Give Your Feedback'
                        placeholderTextColor={'#858585'}
                        style={styles.inputFeedbck}
                        defaultValue={this.state.feedback}
                        multiline={true}
                        onChangeText={(text) => { this.setState({ feedback: text }) }}
                    />
                    <TouchableOpacity
                        style={{ alignSelf: 'flex-end' }}
                        onPress={this.onpress_Submit}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.submitBtn}>Submit</Text>
                    </TouchableOpacity>

                    {
                        (list_of_feedback.length === 0) ?
                            <>
                                <View style={{ justifyContent: 'center', alignSelf: 'center', flex: 1, }}>
                                    {/* <Text style={styles.texstyle}>No Feedback Found. Come Back After Some Time..</Text>
                                    <Text style={styles.texstyle}>Give Us Your Valuable Review</Text>  */}
                                    <ActivityIndicator size='large' color='#ff8c00' />

                                </View>
                            </>
                            :
                            list_of_feedback.map((item) => {

                                return (
                                    <View style={styles.feedback_List}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <View style={styles.feedback_profile}>
                                                {this.state.image_loading &&
                                                    <FontAwesome5 style={{ flex: 1 }} name='user' size={25} color={'#000000'} solid />
                                                }
                                                {<Image
                                                    style={styles.image}
                                                    source={{ uri: configData.SERVER_URL + 'assets/users/' + item.image }}
                                                    onLoadStart={() => { this.setState({ image_loading: true }) }}
                                                    onLoadEnd={() => { this.setState({ image_loading: false }) }}
                                                />}
                                            </View>
                                            <Text style={styles.texstyle}>{item.username}</Text>
                                        </View>
                                        <Text style={{ marginLeft: 40, marginTop: 15, fontSize: 12, color: '#000' }}>{item.feedback}</Text>

                                    </View>
                                );
                            })

                    }
                </View>
            </ScrollView>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headertext: {
        fontWeight: 'bold',
        fontSize: 30,
        color: '#000000',
        backgroundColor: configData.theme_color,
        width: "100%",
        textAlign: 'center',
        paddingVertical: 15,
        // borderRadius: 17,
        elevation: 5,
        marginVertical: 20,
        top: -20
    },
    inputFeedbck: {
        width: '90%',
        padding: 10,
        borderRadius: 12,
        backgroundColor: '#ffffffff',
        elevation: 5,
        fontSize: 17,
        fontWeight: '700',
        color: '#000000',
        top: -10
    },
    submitBtn: {
        padding: 10,
        paddingHorizontal: 30,
        backgroundColor: '#ff8c00',
        borderRadius: 12,
        color: '#ffffff',
        fontSize: 17,
        fontWeight: '700',
        margin: 20,
        elevation: 15,
    },
    feedback_List: {
        width: "90%",
        backgroundColor: '#ffffff',
        elevation: 5,
        padding: 10,
        marginVertical: 10,
        borderRadius: 12,
        justifyContent: 'space-between'
    },
    feedback_profile: {
        height: 30,
        width: 30,
        borderRadius: 50,
        elevation: 5,
        backgroundColor: '#ffffff',
        overflow: 'hidden',
        marginRight: 10,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    texstyle: {
        fontSize: 14,
        color: "#000000",
        fontWeight: "500",
    },
});