
import React from 'react';
import { ImageBackground, StyleSheet, View, Dimensions, TextInput, Text, Pressable, FlatList, Image, ScrollView, RefreshControl, TouchableOpacity, Modal, ActivityIndicator, SafeAreaView } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import configData from '../../env.json';
import moment from 'moment';
import { LogBox } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swiper from 'react-native-swiper';

// import moment from 'moment';
import MapView, { Marker } from 'react-native-maps';
import _ from 'lodash';
import { colors } from 'debug/src/browser';
import { BackgroundImage } from 'react-native-elements/dist/config';

const images = [
    // 'https://www.nsbpictures.com/wp-content/uploads/2021/01/background-for-thumbnail-youtube-2.png',
    'https://i.redd.it/ci1lwz80bpf81.jpg',
    'https://about.easil.com/wp-content/uploads/image_in_text_-_1_poster_10_ways_graphics_custom-2.jpg',
    // 'https://i.redd.it/sabp9rmdk6s61.png',
    // 'https://i.redd.it/1dbvj7e7q7p61.jpg',
    // 'https://i.redd.it/maad00s1ktf81.jpg',
    // 'https://i.redd.it/pasyvlv0n4f81.jpg',
]

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
    'Each child in a list should have a unique "key" prop.'
]);
const { height } = Dimensions.get('screen');
const { width } = Dimensions.get('screen');
export default class Home extends React.Component {
    prop = [];
    fatchPostsVar = [];
    constructor(props) {
        super(props);
        // prop = props;
        this.state = {
            fatchData: [],
            onrefreshing: false,
            modelvisibility: false,
            selectedRow: {},
            loader: false,
            // POSTS=[],
            home_data: props.route.params.dataa.route.params.data,
            isArrayEmpty: undefined,
            Latitude: 21.1960328338997,
            Longitude: 72.83230767809606,
            zooming: 0.3,
            mapmodal: false,
        }
        // console.log('Home Screen-->', props.route.params.dataa.route.params.data);
        // this.state = {
        //     home_data:  props.route.params.dataa.route.params.data,
        // }
        // this.componentDidMount();
    }

    componentDidMount = async () => {
        this.setState({ loader: true });
        const POSTS = await axios.post(configData.SERVER_URL + 'fatch_posts.php', {});

        console.log(POSTS);
        if (POSTS.data) {
            this.setState({ fatchData: [] });
            this.setState({ fatchData: POSTS.data.data });
            this.setState({ onrefreshing: false });
            this.setState({ loader: false });

        } else {
            this.setState({ fatchData: POSTS.data });
        }
    }

    on_refresh = async () => {
        this.setState({ loader: true });
        this.setState({ fatchdata: [] });
        await this.componentDidMount();
        this.setState({ loader: false });
    }

    toggleModal = () => {
        this.setState({ modelvisibility: true });
    }
    async fnGetSingleRow(item) {
        await this.setState({ modelvisibility: true });
        await this.setState({ selectedRow: item });
        console.log('msggg600fdfdf0', this.state.modelvisibility, this.state.selectedRow);
    }
    // Hori Images //
    change(nativeEvent) {
        console.log("nativeEvent:", nativeEvent)
        if (nativeEvent) {
            const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
            if (slide !== this.state.active) {
                this.setState({
                    active: slide
                })
            }
        }

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

    render() {
        let dimensions = Dimensions.get("window");
        let imageHeight = Math.round((dimensions.width * 9) / 16);
        let imageWidth = dimensions.width;
        const { home_data } = this.state;
        const { active } = this.state;

        return (
            <ScrollView
                refreshControl={<RefreshControl refreshing={false} onRefresh={this.on_refresh} />}>
                <View style={styles.Contaii} >

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

                    <View style={styles.container}>
                        <View style={{ padding: 10, }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                                <Text style={{ color: '#000', fontSize: 15, }}>Hy, {home_data.username} 👋</Text>
                                <FontAwesome5 onPress={() => { this.prop.navigation.navigate('Notification') }} name={'bell'} size={25} color={'#ff8c00'} />
                            </View>
                        </View>

                        {/*Style 2 */}

                        <ScrollView >
                            <View style={styles.sliderContainer}>
                                <Swiper
                                    autoplay
                                    horizontal={true}
                                    height={160}
                                    activeDotColor="#FF6347"
                                    dotColor='#fff'
                                    dotStyle={{ top: 10 }}
                                    activeDotStyle={{ top: 5 }}
                                    autoplayTimeout={5}>
                                    <View style={styles.slide}>
                                        <Image
                                            source={require('../imgs/Background/tree.jpg')}
                                            resizeMode="cover"
                                            style={styles.sliderImage}
                                        />
                                    </View>
                                    <View style={styles.slide}>
                                        <Image
                                            source={require('../imgs/Background/tree2.jpg')}
                                            resizeMode="cover"
                                            style={styles.sliderImage}
                                        />
                                    </View>
                                    <View style={styles.slide}>
                                        <Image
                                            source={require('../imgs/Background/tree.jpg')}
                                            resizeMode="cover"
                                            style={styles.sliderImage}
                                        />
                                    </View>
                                </Swiper>
                            </View>
                        </ScrollView>

                        {/* Event Menu */}
                        <View>
                            <Text style={{ paddingTop: 20, paddingLeft: 10, color: '#000', fontSize: 18, fontWeight: 'bold' }}>Events</Text>

                            <ScrollView
                                horizontal={true}
                                decelerationRate={0}
                                snapToInterval={width - 160}
                                snapToAlignment={"center"}
                                showsHorizontalScrollIndicator={false}>
                                <View style={[styles.view,]}>
                                    <Image source={require('../imgs/Logos/White.png')} style={{ width: 30, height: 30, top: 100, alignSelf: 'center' }} />

                                </View>
                                <View style={[styles.view,]}>
                                    <Image source={require('../imgs/Background/background.jpg')} style={{ width: width - 180, height: 250, alignSelf: 'center', borderRadius: 30 }} />

                                </View>
                                <View style={[styles.view,]}>
                                    <Image source={require('../imgs/Logos/White.png')} style={{ width: 30, height: 30, top: 100, alignSelf: 'center' }} />

                                </View>
                                <View style={[styles.view,]}>
                                    <Image source={require('../imgs/Background/background.jpg')} style={{ width: width - 180, height: 250, alignSelf: 'center', borderRadius: 30 }} />

                                </View>
                                <View style={[styles.view,]}>
                                    <Image source={require('../imgs/Logos/White.png')} style={{ width: 30, height: 30, top: 100, alignSelf: 'center' }} />

                                </View>
                            </ScrollView>

                        </View>


                        {/* Cpmplaint Section */}

                        <View style={[styles.container, { paddingLeft: 10, paddingRight: 10 }]}>
                            <View
                                style={{
                                    marginVertical: 15,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between'
                                }}>
                                <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>Complaint by Peoples</Text>
                                <TouchableOpacity onPress={() => { }}>
                                    <Text style={{ color: 'black', fontWeight: 'bold', color: 'red', top: 3 }} onPress={() => { this.props.navigation.navigate('complaints'); }}>View More</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={[styles.postcontainers]} >

                        {
                            (this.state.loader) ?
                                <View style={styles.loader} >
                                    <ActivityIndicator size='large' color={'#ff8c00'} animating={this.state.loader} />
                                </View>
                                :
                                this.state.fatchData.map((item) => {
                                    console.log("item: ", item.id);
                                    return (
                                        <View style={styles.postcontainer} >

                                            <View style={styles.status /* maintop */}  >
                                                <View style={[styles.user_profile_Pic]}>
                                                    <Image
                                                        style={{ height: '100%', width: '100%', }}
                                                        source={{ uri: configData.SERVER_URL + 'assets/users/' + item.user_image }}
                                                    />
                                                </View>
                                                <Text style={styles.user_name_style}>{item.username}</Text>
                                                {/* <Text style={styles.user_id_style}>#{item.id}</Text> */}
                                                <TouchableOpacity style={{ position: 'absolute', right: 24, justifyContent: 'center', top: 4 }} onPress={() => this.fnGetSingleRow(item)}>
                                                    <Image style={{ height: 23, width: 23, top: 3, }} source={require('../imgs/icons/2.png')} />
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{ flex: 4 }}>

                                                <Image style={{ width: '100%', height: '100%' }} source={{ uri: configData.SERVER_URL + 'assets/UploadedPosts/' + item.image }} />

                                            </View>

                                            <View style={styles.footerbar} >
                                                <ScrollView horizontal showsHorizontalScrollIndicator={false} pagingEnabled={true} >
                                                    <Text style={styles.footer}>{item.address}</Text>
                                                </ScrollView>
                                                <Text style={styles.username}>{item.date}</Text>
                                            </View>
                                        </View>

                                    );

                                })
                        }
                    </View>
                </View>
            </ScrollView>
        )
    };
};


const styles = StyleSheet.create({
    Contaii: {
        justifyContent: "center",
        backgroundColor: '#fff',
    },

    postcontainers: {
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        height: 300,
        width: 100,
        borderRadius: 17,
        alignSelf: 'center',
        bottom: 10,
    },

    // Complaint Post Style

    user_profile_Pic: {
        height: 27,
        width: 27,
        borderRadius: 50,
        backgroundColor: '#000',
        marginLeft: 5,
        elevation: 5,
        overflow: 'hidden',
        alignSelf: 'center',
    },
    user_name_style: {
        fontSize: 15,
        color: "#000000",
        fontWeight: 'bold',
        marginLeft: 7,
        alignSelf: 'center',

    },
    user_id_style: {
        fontSize: 15,
        color: "#000000",
        fontWeight: 'bold',
        marginLeft: 2,
        alignSelf: 'center',

    },

    postcontainer: {
        width: '95%', //375
        height: 275,
        marginVertical: 10,
        borderRadius: 20,
        overflow: 'hidden',
        top: -10,
        elevation: 5,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    image: {
        top: 35,
        bottom: 35,
        height: height - 5300,
        width: '100%',
        position: 'absolute',
    },
    imagecontainer: {
        height: 300,
        width: '100%',
        overflow: 'scroll',
    },

    // Complaint Post Style END //

    modelimage: {
        height: 200,
        width: "100%",
    },

    date: {
        fontWeight: "900",
        width: 110,
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
        backgroundColor: '#ff8c00',
        lineHeight: 40,
        borderBottomRightRadius: 20,
    },

    maintop: {
        fontWeight: "900",
        width: '100%',
        color: 'white',
        fontSize: 15,
        zIndex: 1,
        backgroundColor: '#ff8c00',
        lineHeight: 20,
    },

    status: {
        flexDirection: 'row',
        fontWeight: "bold",
        width: '100%',
        height: 35,
        color: 'white',
        fontSize: 15,
        paddingLeft: 10,
        backgroundColor: '#FFB050',
        lineHeight: 40,
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
        alignItems: 'center',
        borderRadius: 20,
        overflow: 'hidden',
    },

    // Event Style

    view: {
        marginTop: 20, //50
        backgroundColor: '#ff8c00',
        width: width - 180,
        margin: 10,
        height: 250,
        borderRadius: 30,
        paddingHorizontal: 30,
        shadowOffset: { width: 1, height: 2 },
        shadowRadius: 5,
        elevation: 5,
        shadowOpacity: 0.4,
    },
    // Event Style END //

    view2: {
        marginTop: 20, //50
        backgroundColor: '#fff',
        width: width - 180,
        margin: 10,
        height: 250,
        borderRadius: 30,
        paddingHorizontal: 30,
        shadowOffset: { width: 1, height: 2 },
        shadowRadius: 5,
        elevation: 5,
        shadowOpacity: 0.4,
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
    container: {
        flex: 1,
    },

    // Help Slide Style 

    sliderContainer: {
        width: width - 20, //375
        height: 160, //150
        marginTop: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 8,
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

    // Help Slide Style END //

    categoryContainer: {
        flexDirection: 'row',
        width: '90%',
        alignSelf: 'center',
        marginTop: 25,
        marginBottom: 10,
    },
    categoryBtn: {
        flex: 1,
        width: '30%',
        marginHorizontal: 0,
        alignSelf: 'center',
    },
    categoryIcon: {
        borderWidth: 0,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: 70,
        height: 70,
        backgroundColor: '#fdeae7' /* '#FF6347' */,
        borderRadius: 8,
    },
    categoryBtnTxt: {
        alignSelf: 'center',
        marginTop: 5,
        color: '#de4f35',
    },
    cardsWrapper: {
        marginTop: 20,
        width: '90%',
        alignSelf: 'center',
    },
    card: {
        height: 100,
        marginVertical: 10,
        flexDirection: 'row',
        shadowColor: '#999',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    cardImgWrapper: {
        flex: 1,
    },
    cardImg: {
        height: '100%',
        width: '100%',
        alignSelf: 'center',
        borderRadius: 30,
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0,
    },
    cardInfo: {
        flex: 2,
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderBottomRightRadius: 8,
        borderTopRightRadius: 8,
        backgroundColor: '#fff',
    },
    cardTitle: {
        fontWeight: 'bold',
    },
    cardDetails: {
        fontSize: 12,
        color: '#444',
    },

    // Detail Complaint Style

    modelimage: {
        height: 200,
        width: "100%",
    },
    headerClose: {
        height: 40,
        width: '100%',
        backgroundColor: '#FFB050',
        justifyContent: 'center',
        alignItems: "flex-start",
        top: 0,
    },
    detailViewRow: {
        borderTopWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderColor: '#ff8c00'
    },
    detailViewRow1: {
        borderTopWidth: 1,
        alignItems: 'center',
        padding: 16,
        borderColor: '#ff8c00'

    },
    cell1: {
        width: '25%',
        fontWeight: 'bold',
        color: '#000',
        fontSize: 15,
        marginLeft: 1,

    },
    cell2: {
        color: '#000',
        fontSize: 15,
        width: '75%',
    },
    locationBTN: {
        lineHeight: 50,
        backgroundColor: '#000000',
        paddingHorizontal: 20,
        color: '#ffffff',
        borderRadius: 12,
        textAlign: 'center',
    },
    Details: {
        height: 550,
        width: '90%',
        backgroundColor: 'rgb(255,255,255)',
        borderRadius: 20,
        overflow: 'hidden',
        justifyContent: 'center',
    },
    modealView: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    editbtn: {
        position: 'absolute',
        height: '100%',
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
        right: 0
    },
});

// #ff8c00