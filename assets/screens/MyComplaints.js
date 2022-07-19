import React from 'react';
import {
    StyleSheet, View, Text, FlatList, Image, ScrollView, RefreshControl,
    TouchableOpacity, Modal, ActivityIndicator, Dimensions
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import MapView, { Marker } from 'react-native-maps';
import configData from '../../env.json';
import { LogBox } from 'react-native';
LogBox.ignoreLogs([
    "Ended a touch event which was not counted in `trackedTouchCount`.",
    "Got a component with the name 'demo' for the screen 'MyComplaints'. React Components must start with an uppercase letter. If you're passing a regular function and not a component, pass it as children to 'Screen' instead. Otherwise capitalize your component's name.",
]);
const { height } = Dimensions.get('screen');
const { width } = Dimensions.get('screen');
export default class demo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user_id: props.route.params.editable_data_id,
            noComplaints: 'You have made no complaints yet.',
            myComp: [],
            NomOfComp: '',
            selectedRow: {},
            loading: false,
            onrefreshing: false,
            modelvisibility: false,
            modalImageLoader: false,
            selectedRow: {},
            isArrayEmpty: undefined,
            Latitude: 21.1960328338997,
            Longitude: 72.83230767809606,
            zooming: 0.3,
            mapmodal: false,
        }
    }
    componentDidMount = async () => {
        this.setState({ loading: true });
        const { user_id } = this.state;
        const POSTS = await axios.post(configData.SERVER_URL + 'my_complaints.php', {
            user_id: user_id
        });

        if (POSTS.data) {
            this.setState({ myComp: POSTS.data.data });
            this.setState({ NomOfComp: POSTS.data.rowcount });
            console.log(this.state.myComp);
            console.log(this.state.NomOfComp);
            this.setState({ loading: false });
        } else {
            this.setState({ myComp: POSTS.data.data });
        }
    }

    on_refresh = async () => {
        this.setState({ myComp: [] });
        this.setState({ NomOfComp: [] });
        await this.componentDidMount();
    }

    toggleModal = () => {
        this.setState({ modelvisibility: true });
    }
    async fnGetSingleRow(item) {
        this.setState({ modalImageLoader: true });
        await this.setState({ modelvisibility: true });
        await this.setState({ selectedRow: item });
        this.setState({ modalImageLoader: false });
        console.log('msggg600fdfdf0', this.state.modelvisibility, this.state.selectedRow);
    }
    onpressLocation = async (text) => {
        if (text) {
            console.log('Location: ', text);
            await this.setState({ mapmodal: true });
            await this.setState({ Latitude: text[0] });
            await this.setState({ Longitude: text[1] });
            await this.setState({ zooming: 0.01 });
            // console.log('Latitude: ', _.cloneDeep(this.state.Latitude));
            // console.log('Longitude: ', _.cloneDeep(this.state.Longitude));


        } else {
            null
        }
    };
    onpressLocation = async (text) => {
        if (text) {
            console.log('Location: ', text);
            await this.setState({ mapmodal: true });
            await this.setState({ Latitude: text[0] });
            await this.setState({ Longitude: text[1] });
            await this.setState({ zooming: 0.01 });
            // console.log('Latitude: ', _.cloneDeep(this.state.Latitude));
            // console.log('Longitude: ', _.cloneDeep(this.state.Longitude));


        } else {
            null
        }
    };

    render() {

        return (
            <ScrollView>
                <View style={styles.container}>
                    <Modal
                        visible={this.state.modelvisibility}
                        // isVisible={this.state.modelvisibility}
                        transparent={true}
                        onRequestClose={() => { this.setState({ modelvisibility: false }) }}>
                        {/* <Text>{this.state.selectedRow.id}</Text> */}
                        <View style={styles.modealView}>
                            <View style={styles.Details} >
                                <View style={styles.headerClose}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 15, alignSelf: 'flex-start', alignItems: 'baseline', paddingLeft: 10, paddingTop: 10, color: '#fff' }} >Status : {this.state.selectedRow.status}<Image source={{ uri: 'https://i.pinimg.com/originals/93/6b/3a/936b3a9a817fed848e7025c0430cbb10.gif' }} /> </Text>
                                    <TouchableOpacity style={styles.editbtn} onPress={() => { this.setState({ modelvisibility: false }) }}>
                                        <Image style={[{ width: 21, height: 21, top: 16, right: 5 }]} source={require('../imgs/icons/closew.png')} />
                                    </TouchableOpacity>
                                </View>

                                <View style={{ height: 500, top: 40 }}>
                                    <Image style={{ height: '40%', width: '100%' }} source={{ uri: configData.SERVER_URL + 'assets/UploadedPosts/' + this.state.selectedRow.image }} />
                                    <Text style={{ fontWeight: '700', fontSize: 17, alignSelf: 'flex-start', alignItems: 'baseline', paddingLeft: 10, paddingTop: 10, color: '#000' }} >Id                   : {this.state.selectedRow.id}</Text>
                                    <Text style={{ fontWeight: '700', fontSize: 17, alignSelf: 'flex-start', alignItems: 'baseline', paddingLeft: 10, paddingTop: 10, color: '#000' }} >Village          : {this.state.selectedRow.village}</Text>
                                    <Text style={{ fontWeight: '700', fontSize: 17, alignSelf: 'flex-start', alignItems: 'baseline', paddingLeft: 10, paddingTop: 10, color: '#000' }} >Pincode        : {this.state.selectedRow.pincode}</Text>
                                    <Text style={{ fontWeight: '700', fontSize: 17, alignSelf: 'flex-start', alignItems: 'baseline', paddingLeft: 10, paddingTop: 10, color: '#000' }} >Description  : {this.state.selectedRow.description}</Text>
                                    {/* <Text style={{ fontWeight: '700', fontSize: 17, alignSelf: 'flex-start', alignItems: 'baseline', paddingLeft: 10, paddingTop: 10, color: 'red' }} >Status : {this.state.selectedRow.status}</Text> */}
                                    <TouchableOpacity style={styles.locationBtn} onPress={() => { this.onpressLocation(this.state.selectedRow.location) }}
                                    // onPress={this.onpressLocation(this.state.selectedRow.location)}
                                    >
                                        <Text style={{ fontWeight: 'bold', fontSize: 15, alignSelf: 'center', color: '#ffffff', marginVertical: 5, borderRadius: 12, }}>Location</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>
                    </Modal>

                    {/* MAP MODAL---------------------------------------------------------- */}

                    <Modal
                        transparent={true}
                        visible={this.state.mapmodal}
                        onRequestClose={() => { this.setState({ mapmodal: false }) }}
                    >
                        <View style={styles.modealView}>
                            <View style={{ height: '100%', width: '100%' }}>
                                <MapView
                                    style={{ flex: 1 }}
                                    region={{
                                        latitude: Number(this.state.Latitude),
                                        longitude: Number(this.state.Longitude),
                                        latitudeDelta: this.state.zooming,
                                        longitudeDelta: this.state.zooming,
                                    }}
                                >
                                    <Marker
                                        coordinate={{
                                            latitude: Number(this.state.Latitude),
                                            longitude: Number(this.state.Longitude),
                                        }}
                                    />
                                </MapView>
                            </View>
                        </View>

                    </Modal>

                    <View style={styles.logobox}>
                        <TouchableOpacity style={{ justifyContent: 'center', alignSelf: 'center' }} onPress={() => { this.props.navigation.navigate('ProfileScreen'); }}>
                            <Image source={require('../imgs/icons/backmain.png')} style={{ width: 30, height: 30, }} />
                        </TouchableOpacity>

                        <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#000', justifyContent: 'center', alignItems: 'center' }}>Your Complaints</Text>
                        <TouchableOpacity style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Image style={{ width: 20, height: 20, paddingLeft: 20, justifyContent: 'center', alignItems: 'center' }} source={require('../imgs/icons/info.png')} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.header}>
                        {
                            (this.state.NomOfComp)
                                ? <Text style={styles.headerText}>You have made {this.state.NomOfComp} complaints till now.</Text>
                                : null
                        }
                    </View>
                    {
                        (this.state.loading) ?
                            <ActivityIndicator size='large' animating={this.state.loading} />
                            :
                            (this.state.NomOfComp)
                                ?
                                this.state.myComp.map((item) => {
                                    return (
                                        <View style={[styles.postcontainer, shadow]} >
                                            <Image style={styles.image} source={{ uri: configData.SERVER_URL + 'assets/UploadedPosts/' + item.image }} />
                                            <View style={styles.maintop}>
                                                <Text style={styles.status}>Status : {item.status}</Text>
                                                <TouchableOpacity style={{ position: 'absolute', right: 24, justifyContent: 'center', top: 4 }} onPress={() => this.fnGetSingleRow(item)}>
                                                    <Image style={{ height: 23, width: 23, right: 10, top: 3, }} source={require('../imgs/icons/2.png')} />
                                                </TouchableOpacity>
                                            </View>

                                            <View style={styles.footerbar} >
                                                <ScrollView horizontal showsHorizontalScrollIndicator={false} pagingEnabled={true} >
                                                    <Text style={styles.footer}>{item.address}</Text>
                                                </ScrollView>
                                                <Text style={styles.username}>{item.date}</Text>
                                            </View>
                                        </View>

                                    )
                                })
                                :
                                <View style={styles.header2}>
                                    <Image style={{ height: 100, width: 100, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }} source={require('../imgs/Background/nopost.png')} />
                                    <Text style={styles.headerText}>{this.state.noComplaints}</Text>
                                </View>
                    }
                    {/* <View style={{ right: width - 500, textAlign: 'right' }}>
                        <Text style={{ color: 'red' }}>*You Cant Edit Complaints.</Text>
                    </View> */}
                </View>
            </ScrollView>
        )
    }
};

const shadow = {
    // shadowColor: '#ff8c00',
    // shadowRadius: 10,
    // shadowOpacity: 0.6,
    // elevation: 5,
    // shadowOffset: {
    //     width: 0,
    //     height: 4
    // }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: height,
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    modealView: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    postcontainers: {
        alignSelf: 'center',
        top: -10,
        padding: 10,
    },
    modalBackground: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
    headerClose: {
        height: 40,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#ff8c00',
        justifyContent: 'space-between',
        position: 'absolute',
        top: 0,

    },
    modalHeader: {
        height: 60,
        width: '100%',
        backgroundColor: '#ff8c00',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 25,
    },
    Details: {
        height: 500,
        width: '90%',
        backgroundColor: 'rgb(255,255,255)',
        borderRadius: 20,
        overflow: 'hidden',
        justifyContent: 'center',
    },
    postcontainer: {
        width: width - 20, //375
        height: 250,
        // width: 400,
        // height: 250,
        marginVertical: 10,
        borderRadius: 20,
        overflow: 'hidden',
        elevation: 5,
        // top: 20,

    },
    header: {
        width: width - 20,
        padding: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        // backgroundColor: '#fff',
        // borderWidth: 1,
        // borderColor: '#000',
        // borderRadius: 20,


    },
    headerText: {
        color: '#000',
        fontWeight: 'bold',
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 18,
    },
    header2: {
        height: height - 250,
        top: 10,
        width: width - 20,
        padding: 10,
        justifyContent: 'center',
        alignSelf: 'center',

    },
    editbtn: {
        position: 'absolute',
        // top: 15,
        right: 10,
        height: 25,
        width: 25,
        // borderRadius: 20,
        // backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
        paddingBottom: 15,
    },
    logobox: {
        width: width,
        flexDirection: 'row',
        // backgroundColor: '#ff8c00',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,

    },
    image: {
        top: 35,
        bottom: 35,
        height: height - 5300,
        width: '100%',
        position: 'absolute',
    },
    maintop: {
        fontWeight: "900",
        width: width,
        color: 'white',
        fontSize: 15,
        zIndex: 1,
        backgroundColor: '#000',
        lineHeight: 40,
        borderBottomRightRadius: 20,

    },
    status: {
        fontWeight: "900",
        width: width,
        color: 'white',
        fontSize: 15,
        paddingLeft: 10,
        backgroundColor: '#FFB050',
        lineHeight: 40,
        borderBottomRightRadius: 20,
        // borderBottomLeftRadius: 20,
        borderTopLeftRadius: 20,
    },
    footerbar: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        paddingHorizontal: 20,
    },
    footer: {
        lineHeight: 40,
        color: '#000',
        fontWeight: 'bold',
        overflow: 'hidden',
        marginRight: 20,
    },
    username: {
        justifyContent: 'flex-end',
        alignSelf: 'center',
        color: '#000',
        fontWeight: 'bold',
        overflow: 'hidden',
        paddingLeft: 20,
        // width: width - 100,
    },

    modalBackground: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
    modalHeader: {
        height: 60,
        width: '100%',
        backgroundColor: '#ff8c00',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 25,
    },
    modal: {
        height: '70%',
        width: '100%',
        backgroundColor: '#ffffff',
        // justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        overflow: 'hidden',
    },

    locationBtn: {
        width: "50%",
        padding: 10,
        marginVertical: 10,
        backgroundColor: '#ff8c00',
        alignSelf: 'center',
        borderRadius: 15,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
        elevation: 3,
        shadowOpacity: 0.4,

    },
});

// #ff8c00