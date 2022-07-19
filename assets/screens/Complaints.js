import React from 'react';
import {
    StyleSheet, View, Dimensions, TextInput, Text, Alert, BackHandler, Image, ScrollView, RefreshControl,
    TouchableOpacity, Modal, ActivityIndicator, ToastAndroid, Linking, Pressable
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import configData from '../../env.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import MapView, { Marker } from 'react-native-maps';
import { LogBox } from 'react-native';
import Swiper from 'react-native-swiper';

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
    'Bottom Tab Navigator: tabBarOptions is deprecated. Migrate the options to screenOptions instead.',
    'Each child in a list should have a unique "key" prop.',
    "Bottom Tab Navigator: 'tabBarOptions' is deprecated. Migrate the options to 'screenOptions' instead.",
]);

const { height } = Dimensions.get('screen');
const { width } = Dimensions.get('screen');

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            talukas: configData.surat_Talukas,
            home_data: props.route.params.dataa.route.params.data,
            fatchData: [],
            onrefreshing: false,
            modelvisibility: false,
            modalinfo: false,
            selectedRow: {},
            NEWS: [],
            loader: false,
            filterModelVisibility: false,
            filterbtnvisibl: false,
            selected_filter: 'Remove FIlter',
            isArrayEmpty: undefined,
            Latitude: 21.1960328338997,
            Longitude: 72.83230767809606,
            zooming: 0.3,
            mapmodal: false,
            likePressed: false,
        }
        // console.log('Dara :', this.state.home_data)
        // AsyncStorage.setItem('islogedin', 'true');

    };

    backAction = () => {
        Alert.alert("Hold on!", "Are you sure you want to exit from App ?", [
            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
            },
            {
                text: "Yes",
                onPress: () => BackHandler.exitApp()
            }
        ]);
        return true;
    };


    componentDidMount = async () => {
        this.setState({ loader: true });
        try {
            const news = await axios.get("https://newsapi.org/v2/top-headlines?country=in&category=general&apiKey=24edf34816a94433ae3d4982f45722ee");
            this.setState({ NEWS: news.data.articles });
        } catch (e) {
            console.log('ERROR IN NEWS: ', e);
        }


        const POSTS = await axios.post(configData.SERVER_URL + 'fatch_posts.php', {});
        // this.backHandler = BackHandler.addEventListener("hardwareBackPress", this.backAction);
        if (POSTS.data) {
            if (POSTS.data.data != null) {
                this.setState({ fatchData: POSTS.data.data.reverse() });
                // console.log('fatchData : ', this.state.fatchData);
                this.setState({ onrefreshing: false });
                this.setState({ loader: false });
            } else {
                this.setState({ fatchData: [] });
                this.setState({ loader: false });
            }
        } else {
            this.setState({ fatchData: [] });
            this.setState({ loader: false });
        }
    };

    on_refresh = async () => {
        this.setState({ loader: true });
        this.setState({ fatchdata: [] });
        this.setState({ selected_filter: "Remove FIlter" });
        await this.componentDidMount();
        await this.setState({ loader: false });
    };

    toggleModal = () => {
        this.setState({ modelvisibility: true });
    };

    async fnGetSingleRow(item) {
        await this.setState({ modelvisibility: true });
        await this.setState({ selectedRow: item });
    };

    on_filter_select = (text) => {
        this.setState({ selected_filter: Object.keys(text)[0] });
        this.setState({ filterModelVisibility: false });
        this.setState({ filterbtnvisibl: true });
    };

    removefilter = () => {
        this.setState({ filterbtnvisibl: false });
        this.setState({ selected_filter: 'Remove FIlter' });
    };

    onpressLocation = async (text) => {
        if (text) {
            console.log('Location: ', text);
            await this.setState({ mapmodal: true });
            await this.setState({ Latitude: text[0] });
            await this.setState({ Longitude: text[1] });
            await this.setState({ zooming: 0.01 });
        } else {
            null
        }
    };
    render() {

        const { home_data } = this.state;

        return (

            <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={false} onRefresh={this.on_refresh} />}  >
                <View style={styles.Contaii} >

                    {/* POSTDETAILS */}
                    <>
                        <Modal visible={this.state.modelvisibility} transparent={true} onRequestClose={() => { this.setState({ modelvisibility: false }) }}>
                            <View style={styles.modealView}>
                                <View style={styles.Details} >
                                    <View style={styles.headerClose}>
                                        <TouchableOpacity style={styles.editbtn} onPress={() => { this.setState({ modelvisibility: false }) }}>
                                            <Image style={{ width: 20, height: 20 }} source={require('../imgs/icons/bold.png')} />
                                        </TouchableOpacity>
                                    </View>
                                    <Image style={styles.modelimage}
                                        loadingIndicatorSource={< ActivityIndicator size='large' animating={this.state.loader} />}
                                        source={{ uri: configData.SERVER_URL + 'assets/UploadedPosts/' + this.state.selectedRow.image }} />

                                    <ScrollView>

                                        <View style={styles.detailViewRow}>
                                            <Text style={styles.cell1}>Post ID</Text>
                                            <Text style={styles.cell2}>{this.state.selectedRow.id}</Text>
                                        </View>

                                        <View style={styles.detailViewRow}>
                                            <Text style={styles.cell1}>Address</Text>
                                            <Text style={styles.cell2}>{this.state.selectedRow.address}, {this.state.selectedRow.taluka}, {this.state.selectedRow.village}, {this.state.selectedRow.pincode}</Text>
                                        </View>


                                        <View style={styles.detailViewRow}>
                                            <Text style={styles.cell1}>Status</Text>
                                            <Text style={[styles.cell2, {
                                                color: (this.state.selectedRow.status === "Not reviewed yet") ? 'red' : (this.state.selectedRow.status === "Done") ? "green" : "rgb(255, 140, 0)"
                                            }]}>{this.state.selectedRow.status}</Text>
                                        </View>

                                        <View style={styles.detailViewRow}>
                                            <Text style={styles.cell1}>Description</Text>
                                            <Text style={styles.cell2}>{this.state.selectedRow.description}</Text>
                                        </View>



                                        <View style={styles.detailViewRow1}>
                                            {/* <Text style={styles.cell1}>Location</Text> */}
                                            <TouchableOpacity style={{ width: '60%' }} onPress={() => { this.onpressLocation(this.state.selectedRow.location) }}>
                                                <Text style={styles.locationBTN}>Location</Text>
                                            </TouchableOpacity>
                                        </View>

                                    </ScrollView>
                                </View>
                            </View>
                        </Modal>
                    </>


                    <>
                        <Modal visible={this.state.modalinfo} transparent={true} onRequestClose={() => { this.setState({ modalinfo: false }) }}>
                            <View style={{
                                flex: 1,
                                backgroundColor: 'rgba(0,0,0,0.7)',
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                            }}>

                                <View style={{
                                    padding: 15,
                                    width: width,
                                    height: 600,
                                    backgroundColor: '#fff',
                                    borderTopRightRadius: 17,
                                    borderTopLeftRadius: 17,
                                    overflow: 'hidden',
                                    elevation: 20,
                                }}>
                                    <View style={{ padding: 10, top: -10 }}>
                                        <Text style={{ color: '#000', textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Information About Complaints</Text>
                                    </View>

                                    <ScrollView style={{}}>
                                        <View style={{ paddingTop: 10, paddingBottom: 10 }}>
                                            <Text style={{ color: '#000', textAlign: 'left', fontWeight: 'bold', fontSize: 15 }}>User Complaint Post:</Text>
                                            <Image style={{ width: 250, height: 200, justifyContent: 'center', alignSelf: 'center' }} source={require('../imgs/Info/UserComplaint.png')} />
                                        </View>

                                        <View style={{ paddingTop: 10, paddingBottom: 10 }}>
                                            <Text style={{ color: '#000', textAlign: 'left', fontWeight: 'bold', fontSize: 15 }}>User Complaint Post:</Text>
                                            <Image style={{ width: 250, height: 200, justifyContent: 'center', alignSelf: 'center' }} source={require('../imgs/Info/PostID.png')} />
                                        </View>

                                        <View style={{ paddingTop: 10, paddingBottom: 10 }}>
                                            <Text style={{ color: '#000', textAlign: 'left', fontWeight: 'bold', fontSize: 15 }}>User Complaint Post:</Text>
                                            <Image style={{ width: 250, height: 200, justifyContent: 'center', alignSelf: 'center' }} source={require('../imgs/Info/ComplaintAddress.png')} />
                                        </View>

                                        <View style={{ paddingTop: 10, paddingBottom: 10 }}>
                                            <Text style={{ color: '#000', textAlign: 'left', fontWeight: 'bold', fontSize: 15 }}>User Complaint Post:</Text>
                                            <Image style={{ width: 250, height: 200, justifyContent: 'center', alignSelf: 'center' }} source={require('../imgs/Info/ComplaintStatus.png')} />
                                        </View>

                                        <View style={{ paddingTop: 10, paddingBottom: 10 }}>
                                            <Text style={{ color: '#000', textAlign: 'left', fontWeight: 'bold', fontSize: 15 }}>User Complaint Post:</Text>
                                            <Image style={{ width: 250, height: 200, justifyContent: 'center', alignSelf: 'center' }} source={require('../imgs/Info/ComplaintDes.png')} />
                                        </View>
                                    </ScrollView>
                                </View>

                            </View>
                        </Modal>
                    </>
                    {/* FILTER MODEL */}
                    <>
                        <Modal
                            visible={this.state.filterModelVisibility}
                            transparent={true}
                            onRequestClose={() => { this.setState({ filterModelVisibility: false }) }}
                        >
                            <View style={styles.modealView} >
                                <View style={styles.filterModel} >
                                    <View style={styles.headerClose}>
                                        <TouchableOpacity style={styles.editbtn} onPress={() => { this.setState({ filterModelVisibility: false }) }}>
                                            <FontAwesome5 name={'times'} size={20} color={'black'} />
                                        </TouchableOpacity>
                                        <Text style={styles.modelTop} >Select City</Text>
                                    </View>
                                    <ScrollView
                                        showsVerticalScrollIndicator={false}
                                    >
                                        {configData.Surat.map((item) => {

                                            return (
                                                <TouchableOpacity style={styles.sortoptions} onPress={() => { this.on_filter_select(item) }}>
                                                    <Text style={{ fontWeight: '700', elevation: 20, color: 'black' }}>{Object.keys(item)}</Text>
                                                </TouchableOpacity>

                                            )
                                        })}
                                    </ScrollView>

                                </View>
                            </View>

                        </Modal>
                    </>
                    {/* MAP MODAL */}
                    <>
                        <Modal
                            transparent={true}
                            visible={this.state.mapmodal}
                            onRequestClose={() => { this.setState({ mapmodal: false }) }} >
                            <View style={styles.modealView}>
                                <View style={{ height: '100%', width: '100%' }}>
                                    <MapView
                                        style={{ flex: 1 }}
                                        // provider={PROVIDER_GOOGLE}
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
                    </>

                    {/* Title */}
                    <>
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', padding: 20, }} >

                            <Text style={{ color: '#000', fontWeight: 'bold', justifyContent: 'center', alignSelf: 'center', fontSize: 20, }}>All Complaints</Text>
                            <TouchableOpacity style={{ justifyContent: 'flex-end', alignItems: 'center' }} onPress={() => { this.setState({ modalinfo: true }) }}>
                                <Image style={{ width: 20, height: 20, paddingLeft: 20, justifyContent: 'center', alignItems: 'center' }} source={require('../imgs/icons/info.png')} />
                            </TouchableOpacity>
                        </View>

                        {/* FILTER BUTTON------------------------------------------------------------------- */}

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, backgroundColor: '#fff', paddingBottom: 20 }}>

                            <TouchableOpacity activeOpacity={0.5} style={[styles.filterbtn, { backgroundColor: '#ffffff', alignSelf: 'center' }]}
                                onPress={() => { this.setState({ filterModelVisibility: true }) }} >
                                <Text style={styles.filterbtnText} >Filter</Text>
                                <FontAwesome5 style={[{ marginRight: 15 }]} name='sort-amount-down-alt' color={'#000000'} />
                            </TouchableOpacity>

                            {(this.state.filterbtnvisibl) ?
                                <View visible={true} activeOpacity={0.5}
                                    style={[styles.filterbtn, {
                                        backgroundColor: '#ffbaba',
                                        alignSelf: 'flex-end',
                                    }]}>
                                    <Text style={[styles.filterbtnText, { color: '#ff6b6b' }]}
                                        onPress={this.removefilter}
                                    >Remove Filter</Text>
                                </View>

                                : null
                            }
                        </View>

                    </>

                    {/* POSTS */}
                    <>
                        {
                            (this.state.loader) ?

                                <View style={styles.loader2} >
                                    <ActivityIndicator size={60} color={'rgb(255, 140, 0)'} animating={this.state.loader} />
                                    <Text style={{ justifyContent: 'center', alignSelf: 'center', color: '#000', top: 5, }}>Loading Complaints....</Text>
                                </View>

                                :

                                (this.state.fatchData.length === 0) ?

                                    <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center', height: 180, width: '90%', backgroundColor: '#000' }}>
                                        <Text style={{}}>No any Complaints available yet</Text>
                                    </View>
                                    :
                                    this.state.fatchData.map((item) => {
                                        {/* console.log('description: : ', item.description); */}

                                        if (this.state.selected_filter === 'Remove FIlter') {
                                            return (
                                                <>

                                                    <View style={styles.postheader}>
                                                        <View style={styles.user_profile_Pic}>
                                                            <Image
                                                                style={{ height: '100%', width: '100%' }}
                                                                source={{ uri: configData.SERVER_URL + 'assets/users/' + item.user_image }}
                                                            />
                                                        </View>
                                                        <Text style={styles.user_name_style}>{item.username}</Text>

                                                        <TouchableOpacity style={{ position: 'absolute', justifyContent: 'center', right: 15, }} onPress={() => this.fnGetSingleRow(item)}>
                                                            <Image style={{ height: 25, width: 25, }} source={require('../imgs/icons/2.png')} />
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View style={styles.postcontainerbox} >
                                                        <Image style={styles.image} source={{ uri: configData.SERVER_URL + 'assets/UploadedPosts/' + item.image }}
                                                            loadingIndicatorSource={< ActivityIndicator size='large' animating={this.state.loader} />}
                                                            resizeMode="cover"
                                                        />
                                                    </View>
                                                    <View style={styles.footerbar} >
                                                        <ScrollView >
                                                            <View style={{ width: '100%', marginTop: 10, height: 50, justifyContent: 'center', alignSelf: 'center', paddingLeft: 10, paddingRight: 10 }}>
                                                                <Text numberOfLines={3} style={styles.footer}><Text style={{ fontWeight: 'bold', fontSize: 14 }}>Description : </Text>{item.description}</Text>
                                                            </View>
                                                        </ScrollView>
                                                        <Text style={{ lineHeight: 30, fontSize: 10, justifyContent: 'flex-end', alignSelf: 'flex-end', right: 5 }}>{moment.utc(item.date).local().startOf('seconds').fromNow()}</Text>
                                                    </View>
                                                </>
                                            );
                                        }
                                        else {
                                            if (this.state.selected_filter === item.taluka) {
                                                return (
                                                    <>
                                                    <View style={styles.postheader}>
                                                        <View style={styles.user_profile_Pic}>
                                                            <Image
                                                                style={{ height: '100%', width: '100%' }}
                                                                source={{ uri: configData.SERVER_URL + 'assets/users/' + item.user_image }}
                                                            />
                                                        </View>
                                                        <Text style={styles.user_name_style}>{item.username}</Text>

                                                        <TouchableOpacity style={{ position: 'absolute', justifyContent: 'center', right: 15, }} onPress={() => this.fnGetSingleRow(item)}>
                                                            <Image style={{ height: 25, width: 25, }} source={require('../imgs/icons/2.png')} />
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View style={styles.postcontainerbox} >
                                                        <Image style={styles.image} source={{ uri: configData.SERVER_URL + 'assets/UploadedPosts/' + item.image }}
                                                            loadingIndicatorSource={< ActivityIndicator size='large' animating={this.state.loader} />}
                                                            resizeMode="cover"
                                                        />
                                                    </View>
                                                    <View style={styles.footerbar} >
                                                        <ScrollView >
                                                            <View style={{ width: '100%', marginTop: 10, height: 50, justifyContent: 'center', alignSelf: 'center', paddingLeft: 10, paddingRight: 10 }}>
                                                                <Text numberOfLines={3} style={styles.footer}><Text style={{ fontWeight: 'bold', fontSize: 14 }}>Description : </Text>{item.description}</Text>
                                                            </View>
                                                        </ScrollView>
                                                        <Text style={{ lineHeight: 30, fontSize: 10, justifyContent: 'flex-end', alignSelf: 'flex-end', right: 5 }}>{moment.utc(item.date).local().startOf('seconds').fromNow()}</Text>
                                                    </View>
                                                    </>
                                                );
                                            } else {
                                                null;
                                            }
                                        }
                                    })

                        }
                    </>
                </View>
            </ScrollView>

        )
    };
};

const styles = StyleSheet.create({
    Contaii: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    modealView: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modelTop: {
        fontWeight: '700',
        fontSize: 17,
        color: '#ffffff',
        textAlign: 'center',
        width: '100%',
    },

    // Slider

    sliderContainer: {
        width: width - 20, //375
        height: 160, //150
        marginTop: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 8,
        margin: 20
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent',
        borderRadius: 8,

    },
    sliderImage: {
        height: '100%',
        width: '100%',
        alignSelf: 'center',
        borderRadius: 30,
    },

    // END

    sortoptions: {
        paddingVertical: 20,
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderTopWidth: 0.5,
        borderColor: 'rgba(0,0,0,0.5)',
    },
    filterModel: {
        paddingBottom: 15,
        width: 400,
        height: 500,
        backgroundColor: '#ffffff',
        borderRadius: 17,
        overflow: 'hidden',
    },
    modelimage: {
        height: 200,
        width: "100%",
    },
    editbtn: {
        position: 'absolute',
        height: '100%',
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
        right: 0
    },
    headerClose: {
        height: 50,
        width: '100%',
        backgroundColor: 'rgb(255, 140, 0)',
        justifyContent: 'center',
        alignItems: "flex-start",
        // position: 'absolute',
        top: 0,

    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        height: 300,
        width: width,
        borderRadius: 17,
        alignSelf: 'center',
        bottom: 10,
    },
    loader2: {
        flex: 1,
        justifyContent: 'center',
        height: height - 225,
        width: width,
        borderRadius: 17,
        alignSelf: 'center',
        bottom: 10,
    },
    Details:
    {
        height: 600,
        width: '95%',
        backgroundColor: 'rgb(255,255,255)',
        borderRadius: 20,
        overflow: 'hidden',
        elevation: 20,
        marginBottom: 20,
    },
    postheader: {
        height: 45,
        width: '95%',
        backgroundColor: '#FFB050',
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 5,
    },
    user_profile_Pic: {
        height: 35,
        width: 35,
        borderRadius: 50,
        backgroundColor: '#ffffff',
        marginLeft: 10,
        elevation: 5,
        overflow: 'hidden',
    },
    user_name_style: {
        fontSize: 12,
        color: "#000000",
        fontWeight: '700',
        marginLeft: 10,
    },
    postcontainerbox: {
        width: '100%',
        height: 250,
        overflow: 'hidden',
        elevation: 5,
    },
    image: {
        width: '95%',
        height: 250,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    footerbar: {
        width: '95%',
        backgroundColor: '#ffffff',
        marginBottom: 20,
        // paddingLeft: 20,
        elevation: 5,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        alignSelf: 'center',

    },
    footer: {
        color: '#000000',
        overflow: 'hidden',
        fontSize: 12,
        justifyContent: 'center',
        textAlign: 'justify',
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
    filterbtn: {
        width: '45%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 15,
        flexDirection: 'row',
        elevation: 5,
        // marginVertical: 20,
        // left: 15,
    },
    filterbtnText: {
        fontWeight: '700',
        fontSize: 15,
        textAlign: 'right',
        color: '#000000',
        marginHorizontal: 15,
        paddingVertical: 10,
        left: 10
    },
    newsBox: {
        height: 265,
        width: width - 30, //385
        // width: 450,
        backgroundColor: '#ffffff',
        marginVertical: 20,
        borderRadius: 12,
        overflow: 'hidden',
        margin: 15,
        elevation: 5,
    },
    newsImage: {
        // flex: 1,
        width: "100%",
        height: 200,
        // resizeMode: 'contain',
        // position: 'absolute',
    },
    newsText: {
        // lineHeight: 50,
        fontSize: 12,
        color: '#000000',
        // position: 'absolute',
        bottom: 0,
        padding: 10,
        height: 100,
    },
    newsBTN: {
        padding: 10,
        backgroundColor: "#000000",
        // width: 100,
        borderRadius: 12,
        position: 'absolute',
        right: 10,
        bottom: 75,
    },
    newsBtnText: {
        // lineHeight: 30,
        color: '#ffffff',
        fontSize: 12,
        textAlign: 'center',
        fontWeight: '500',
    },
    govHelpLine: {

        backgroundColor: '#ffffffff',
        width: '100%',
        paddingHorizontal: 20,
        borderRadius: 14,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
    },
    govtext: {
        lineHeight: 50,
        fontSize: 14,
        fontWeight: '500',
        color: '#000000',
    },
    newsnumBox: {
        height: 20,
        width: 30,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignContent: 'center',
        position: 'absolute',
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        // bottom: 160,
        top: 30,
        left: 0,
        elevation: 5,
    },
    detailViewRow: {
        borderTopWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    cell1: {
        width: '30%',
        fontWeight: '500',
        fontSize: 15,
        marginLeft: 20,
    },
    cell2: {
        fontWeight: '500',
        fontSize: 15,
        width: '60%',
    },
    locationBTN: {
        lineHeight: 50,
        backgroundColor: '#000000',
        paddingHorizontal: 20,
        color: '#ffffff',
        borderRadius: 12,
        textAlign: 'center',
    },
    detailViewRow1: {
        borderTopWidth: 1,
        alignItems: 'center',
        padding: 16,
        borderColor: '#000'

    },
});

// rgb(255, 140, 0)