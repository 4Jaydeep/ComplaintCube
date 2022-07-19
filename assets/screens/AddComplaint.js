import React from 'react';
import { StyleSheet, View, TextInput, Text, Button, Image, Pressable, ScrollView, ToastAndroid, RefreshControl, Modal, TouchableOpacity, ActivityIndicator, Dimensions, SafeAreaView, PermissionsAndroid } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import configData from '../../env.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Swiper from 'react-native-swiper';

const { height } = Dimensions.get('screen');
const { width } = Dimensions.get('screen');

const images = [
  'https://i.redd.it/maad00s1ktf81.jpg',
  // 'https://www.nsbpictures.com/wp-content/uploads/2021/01/background-for-thumbnail-youtube-2.png',
  // 'https://i.redd.it/ci1lwz80bpf81.jpg',
  // 'https://about.easil.com/wp-content/uploads/image_in_text_-_1_poster_10_ways_graphics_custom-2.jpg',
  // 'https://i.redd.it/sabp9rmdk6s61.png',
  // 'https://i.redd.it/1dbvj7e7q7p61.jpg',
  // 'https://i.redd.it/pasyvlv0n4f81.jpg',
]

export default class Add extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      logindata: {},
      Area: configData.Surat,
      complaint_Catagories: configData.complaint_Catagories,
      Selected_Taluka: [],
      Selected_Village: "Select Village",
      address: '',
      discription: '',
      pincode: '',
      user_id: '',
      image: '',
      user_image: '',
      username: '',
      showimage: '',
      currentLatLong: {},
      choose_Location: {},
      currentLatitude: '',
      currentLongitude: '',
      chooseLatitude: '',
      chooseLongitude: '',
      zooming: 0.01,
      location: '',
      pin_address: '',
      imageset: false,
      pressed: false,
      onrefreshing: false,
      modelVisibility2: false,
      loader: false,
      talukaModal: false,
      villageModel: false,
      complaintModel: false,
      mapmodal: false,
      is_location_set: false,
      talukaLabel: 'Select Taluka',
      villageLabel: 'Select village',
      complaint: 'Select Compalin Catagory',
    }
  };

  componentDidMount = async () => {
    this.requestPermission();
    await this.getCurrentLocation();
    try {
      const val = JSON.parse(await AsyncStorage.getItem('logindata'));
      // console.log('val: ', val);

      const fetch_User_Data = await axios.post(configData.SERVER_URL + 'fetch_userDataForProfile.php', { id: val.id });

      if (fetch_User_Data.data.success) {
        const user_data = fetch_User_Data.data.data;
        this.setState({ user_id: user_data.id, user_image: user_data.image, username: user_data.username });
      } else {
        alert("Please Login Again.");
      }

    } catch (error) {
      console.log('error is : ', error);
      this.on_refresh();
    }
    this.on_refresh;
  };

  on_refresh = () => {
    this.setState({
      onrefreshing: true,
      discription: '',
      pincode: '',
      address: '',
      talukaLabel: 'Select Taluka',
      villageLabel: 'Select village',
      Selected_Village: 'Select Village',
      complaint: 'Select Compalin Catagory',
      image: '',
      showimage: '',
      currentLatitude: 21.1960328338997,
      currentLongitude: 72.83230767809606,
      zooming: 0.3,
      pressed: false,
      loader: false,
      is_location_set: false,
      onrefreshing: false,

    });
  };

  requestPermission = async () => {

    // try {
    //   const granted = await PermissionsAndroid.request(
    //     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    //   );
    //   if (granted.RESULTS.GRANTED) {
    //     console.log("Location Service: true");
    //   } else {
    //     console.log("Location Service: false");
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
  };

  getCurrentLocation = async () => {

    Geolocation.getCurrentPosition(
      (position) => {
        this.setState({ currentLatLong: position.coords });
        this.setState({ choose_Location: position.coords });
        this.setState({ location: position.coords.latitude + "," + position.coords.longitude });
        console.log("Locaion in default : ", this.state.location);

      },
      (error) => {
        console.log(error);
        <Text style={{ fontSize: 14, color: '#fff', textAlign: 'center' }}>{error}</Text>
      },
      {
        enableHighAccuracy: true,
      },
    );
  };

  setLocation = async (e) => {
    await this.setState({ choose_Location: e });
    await this.setState({ currentLatLong: Object.assign(this.state.choose_Location) });
    await this.setState({ location: e.latitude + "," + e.longitude });
    console.log("Locaion afer choose : ", this.state.location);
    this.setState({ is_location_set: true });
  };

  render() {
    const { Area, complaint, Selected_Taluka, talukaLabel, villageLabel, complaint_Catagories, Selected_Village,
      address, pincode, discription, image, user_id, imageset, user_image, username, showimage, modelVisibility2,
      currentLongitude, currentLatitude, zooming, location, chooseLatitude, chooseLongitude, pin_address, is_location_set
    } = this.state;

    const on_submit = async () => {
      if (image && address && discription != '' && talukaLabel != 'Select Taluka' && villageLabel != 'Select village' && complaint != 'Select Compalin Catagory' && pincode.length > 5) {
        this.setState({ loader: true });

        try {
          const response = await axios.post(configData.SERVER_URL + 'post_Upload.php', {
            description: discription,
            pincode: pincode,
            address: address,
            taluka: talukaLabel,
            village: villageLabel,
            user_id: user_id,
            user_image: user_image,
            image: image,
            complaint: complaint,
            location: location,
            username: username,
          });

          if (response.data.success) {
            // console.log(response.data);
            ToastAndroid.show('Successfully Post', ToastAndroid.LONG);
            this.setState({
              pressed: true,
              loader: false,
            });
            await this.on_refresh();

          } else {
            // console.log(response.data);
            throw new Error(" 29 try An error has occurred");
            // this.setState({ onrefreshing: false });

          }
        } catch (error) {
          // console.log('error section');
          ToastAndroid.show(error, ToastAndroid.LONG);
          this.setState({ onrefreshing: false });
        }

      } else {
        alert("Please Fill All The Fields");
      }
    };
    const fromCamera = async (image) => {
      let a = Math.floor(Math.random() * 10000) + 10000;
      let c = Math.floor(Math.random() * 10000) + 10000;
      const b = {
        fileName: a + "" + c,
        base64: image.data
      }
      this.setState({ image: b });
      this.setState({ showimage: image.path })
    };
    const Choose_Picture = async () => {
      this.setState({ modelVisibility2: false });
      ImagePicker.openPicker({
        cropping: true,
        includeBase64: true

      }).then(image => {
        fromCamera(image)
        // console.log('msgg000000g', image);
      });
    };
    const take_Picture = async () => {
      this.setState({ modelVisibility2: false });
      await ImagePicker.openCamera({
        cropping: true,
        includeBase64: true
      }).then(image => {
        fromCamera(image);
      });
    };
    const optionsToChoose = () => {
      this.setState({ modelVisibility2: true });
    };
    const complaint_selection = (text) => {
      this.setState({ complaintModel: false });
      this.setState({ complaint: text });
      // console.log(text);
    };
    const taluka_selection = async (text) => {
      this.setState({ talukaModal: false });
      this.setState({ talukaLabel: Object.keys(text)[0] });
      this.setState({ villageLabel: 'Select village' });
      await this.setState({ Selected_Taluka: Object.values(text) });
      // console.log('msggg138888', this.state.talukaLabel);
    };
    const village_selection = (text) => {
      this.setState({ villageModel: false })
      this.setState({ villageLabel: text });

    };
    return (

      <View style={styles.container}>

        <>
          <Modal
            transparent={true}
            visible={this.state.modalVisibility}
            onRequestClose={() => { this.setState({ modalVisibility: false }) }}
          >
            <View style={styles.infomodealView} >
              <View style={styles.infofilterModel} >
                <View style={styles.infoheaderClose}>
                  <Text style={styles.infomodelTop}>Importent Before Posting</Text>
                  <TouchableOpacity style={styles.infoeditbtn} onPress={() => { this.setState({ modalVisibility: false }) }}>
                    <FontAwesome5 name={'times'} size={22} color={'black'} />
                  </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} >
                  <View>
                    <Text style={styles.infotitle}>How To Post:</Text>
                    <Image source={require('../imgs/Background/HowToPost.png')} style={{ width: '100%', height: 200, top: 10, borderRadius: 20, }} />
                  </View>

                  <View style={{ top: 20, height: 110 }}>
                    <Text style={styles.infotitle}>Supported File Extensions: </Text>
                    <View>
                      <Text style={styles.infotext}>• PNG</Text>
                      <Text style={styles.infotext}>• JPG </Text>
                      <Text style={styles.infotext}>• JPEG</Text>

                    </View>
                  </View>
                </ScrollView>

              </View>
            </View>
          </Modal>
        </>

        <ScrollView contentContainerStyle={{}} showsVerticalScrollIndicator={true} refreshControl={<RefreshControl refreshing={this.state.onrefreshing} onRefresh={this.on_refresh} />}>

          <View style={styles.logobox}>
            <Text style={styles.complainttext}>Register Your Complaint</Text>
            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}
              onPress={() => { this.setState({ modalVisibility: true }) }}
            >
              <Image style={{ width: 20, height: 20, paddingLeft: 20, justifyContent: 'center', alignItems: 'center' }} source={require('../imgs/icons/info.png')} />
            </TouchableOpacity>

          </View>

          <ScrollView style={{ top: 10 }} >
            <View style={{
              sliderContainer: {
                width: width - 20, //375
                height: 160, //150
                marginTop: 10,
                justifyContent: 'center',
                alignSelf: 'center',
                borderRadius: 8,
              },
            }}>
              <Swiper
                autoplay
                horizontal={true}
                height={110}
                activeDotColor="#fff"
                dotColor='#000'
                // dotStyle={{ top: 10 }}
                // activeDotStyle={{ top: 5 }}
                autoplayTimeout={5}>

                <TouchableOpacity style={{ paddingHorizontal: 20, justifyContent: 'center', alignSelf: 'center' }} onPress={() => { this.setState({ modalVisibility: true }) }}>
                  <View style={{ justifyContent: 'space-between', alignSelf: 'center', padding: 20, backgroundColor: '#ff8c00', borderRadius: 20, width: width - 40, flexDirection: 'row', overflow: 'hidden' }}>
                    <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 15, justifyContent: 'center', alignSelf: 'center', textAlign: 'left', lineHeight: 25 }}>Dont Know How To Post? Click Poster</Text>
                    <Image style={{ width: 50, height: 50, left: 5 }} source={require('../imgs/icons/customer-support.png')} />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={{ paddingHorizontal: 20 }} onPress={() => { this.props.navigation.navigate('ComplaintRules'); }}>
                  <View style={{ justifyContent: 'center', alignSelf: 'center', padding: 20, backgroundColor: '#ff8c00', borderRadius: 20, width: width - 40, paddingHorizontal: 30, }}>
                    <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 17, justifyContent: 'center', alignSelf: 'center', textAlign: 'center', lineHeight: 25 }}>Submit Proper Details. Must Read<Text style={{ color: 'red' }}> Rules and regulation* </Text> <TouchableOpacity style={{ justifyContent: 'center', alignSelf: 'center', alignContent: 'center', top: 10 }}><Text style={{ fontWeight: 'bold', fontSize: 17, justifyContent: 'center', alignSelf: 'center', textAlign: 'center', top: 4, color: '#000', textDecorationLine: 'underline' }}>Click Here</Text></TouchableOpacity>  </Text>
                  </View>
                </TouchableOpacity>

              </Swiper>
            </View>
          </ScrollView>

          <View style={styles.data}>

            <>
              <Modal
                visible={this.state.modelVisibility2}
                animationType='slide'
                transparent={true}
                onRequestClose={() => { this.setState({ modelVisibility2: false }) }}
              >
                <View style={styles.image_option} >
                  <View style={styles.header}><Text style={{ fontWeight: '900', fontSize: 17, color: '#000' }}>How would you like to choose your photo?</Text></View>
                  <TouchableOpacity style={styles.takePhoto} onPress={take_Picture} ><Text style={{ fontWeight: '700', fontSize: 17, color: '#000' }}>Take Photo</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.ChoosPhoto} onPress={Choose_Picture}><Text style={{ fontWeight: '700', fontSize: 17, color: '#000' }}>Choos Photo From Galary</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.closebtn} onPress={() => { this.setState({ modelVisibility2: false }) }} >
                    <FontAwesome5 name={'times'} size={30} color={'black'} />
                  </TouchableOpacity>
                </View>
              </Modal>
            </>
            {/*---------------------------------------------- TALUKA MODAL------------------------------------------------------ */}
            <>
              <Modal
                visible={this.state.talukaModal}
                // visible={true}
                transparent={true}
                onRequestClose={() => { this.setState({ talukaModal: false }) }}>
                <View style={styles.modealView} >
                  {/* <Text style={{ fontWeight: '700', fontSize: 30, color: '#ffffff', marginBottom: 50 }}>Select Taluka</Text> */}
                  <Text style={styles.modelhead}>Select Taluka</Text>
                  <View style={styles.filterModel} >
                    <ScrollView showsVerticalScrollIndicator={false} >
                      {
                        Area.map((item, index) => {
                          {
                            return (
                              <TouchableOpacity style={styles.sortoptions} onPress={() => { taluka_selection(item) }}>
                                {<Text style={{ fontWeight: '700', elevation: 20, color: 'black' }}>{Object.keys(item)}</Text>}
                              </TouchableOpacity>
                            )
                          }
                        })
                      }
                    </ScrollView>
                  </View>
                </View>
              </Modal>
            </>
            {/*---------------------------------------------- VILLAGE MODAL------------------------------------------------------ */}
            <>
              <Modal visible={this.state.villageModel} // visible={true} 
                transparent={true} onRequestClose={() => { this.setState({ villageModel: false }) }} >
                {
                  Selected_Taluka.length > 0 ?
                    <View style={styles.modealView}  >
                      <Text style={styles.modelhead}>Select Village</Text>

                      <View style={styles.filterModel} >
                        <ScrollView showsVerticalScrollIndicator={false} >

                          {
                            Selected_Taluka[0].map((element, index) => {
                              return (
                                <TouchableOpacity style={styles.sortoptions} onPress={() => { village_selection(element) }}>
                                  <Text style={{ fontWeight: '700', elevation: 20, color: 'black' }}>{element}</Text>
                                </TouchableOpacity>
                              )
                            })
                          }

                        </ScrollView>
                      </View>
                    </View>
                    :
                    <View style={styles.modealView}  >
                      <Text style={styles.modelhead}>Select Village</Text>
                      <View style={styles.filterModel} >
                        <View style={{ width: '100%', height: '100%', justifyContent: 'center' }}>
                          <Text style={{ fontWeight: '700', fontSize: 17, width: '100%', height: '100%', textAlign: 'center' }}>Please select a taluka first</Text>
                        </View>
                      </View>
                    </View>
                }
              </Modal>
            </>
            {/*---------------------------------------------- CHOOSE COMPLAINT MODAL------------------------------------------------------ */}
            <>
              <Modal
                visible={this.state.complaintModel}
                // visible={true}
                transparent={true} onRequestClose={() => { this.setState({ complaintModel: false }) }} >
                {

                  <View style={styles.modealView}  >
                    <Text style={styles.modelhead}>Select Complaint Type</Text>
                    <View style={styles.filterModel} >
                      <ScrollView showsVerticalScrollIndicator={false} >

                        {
                          complaint_Catagories.map((element, index) => {
                            return (
                              <TouchableOpacity style={styles.sortoptions} onPress={() => { complaint_selection(element) }}>
                                <Text style={{ fontWeight: '700', elevation: 20, color: 'black' }}>{element}</Text>
                              </TouchableOpacity>
                            )
                          })
                        }

                      </ScrollView>
                    </View>
                  </View>
                }
              </Modal>
            </>
            {/*------------------------------------------------------ MAP MODAL ------------------------------------------------------ */}
            <>
              <Modal
                visible={this.state.mapmodal}
                // visible={true}
                transparent={true} onRequestClose={() => { this.setState({ mapmodal: false }) }}
              >
                <View style={styles.modealView}>
                  <View style={styles.mapbox}>
                    <MapView
                      style={styles.map}
                      // provider={PROVIDER_GOOGLE}
                      region={{
                        latitude: Number(this.state.currentLatLong.latitude),
                        longitude: Number(this.state.currentLatLong.longitude),
                        latitudeDelta: zooming,
                        longitudeDelta: zooming,
                      }}
                      showsUserLocation={true}
                      showsMyLocationButton={true}
                      onPress={(e) => { this.setLocation(e.nativeEvent.coordinate) }}
                    >
                      <Marker
                        coordinate={{
                          latitude: Number(this.state.choose_Location.latitude),
                          longitude: Number(this.state.choose_Location.longitude),
                        }}
                        pinColor={configData.theme_color}
                        title='ADDRESS'
                        description={pin_address}
                      ></Marker>
                    </MapView>

                    <View style={{ width: '95%' }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity style={[styles.cancelBtn, { width: '47%' }]} onPress={() => { this.setState({ mapmodal: false, is_location_set: true }) }}>
                          <Text style={{ fontWeight: '600', fontSize: 17, color: '#000' }}>Choose this location</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.cancelBtn, { width: '47%' }]} onPress={this.getCurrentLocation}>
                          <Text style={{ fontWeight: '600', fontSize: 17, color: '#000' }}>Current Location</Text>
                        </TouchableOpacity>
                      </View>
                      <TouchableOpacity style={[styles.cancelBtn, { marginBottom: 50 }]} onPress={() => { this.setState({ mapmodal: false }) }}>
                        <Text style={{ fontWeight: '600', fontSize: 17, color: '#000' }}>Cancel</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

              </Modal>
            </>

            <View>
              <Pressable style={styles.choosphoto} onPress={optionsToChoose} >
                {

                  (this.state.showimage != '') ?
                    <>
                      <Image style={{ height: '100%', width: "100%" }} source={{ uri: showimage }} />
                    </>
                    :
                    <>
                      <FontAwesome5 name='images' style={{ position: 'absolute' }} color={'#000'} size={60} solid />
                    </>
                }
              </Pressable>

              <Pressable style={styles.catagorybox} onPress={() => { this.setState({ complaintModel: true }) }} >
                <Text style={[styles.catagorytxt, { color: (complaint === 'Select Compalin Catagory') ? '#000' : '#000000' }]} >{complaint}</Text>
                <FontAwesome5 name='sort' color={'#000'} />
              </Pressable>

              <TextInput style={styles.fields} multiline={true} placeholder='Enter Address Of Area' placeholderTextColor={'#000'} defaultValue={address}
                autoCapitalize='words' onChangeText={(text) => { this.setState({ address: text }) }} />

              <TextInput style={styles.fields} multiline={true} placeholder='Discription' placeholderTextColor={'#000'} defaultValue={discription}
                autoCapitalize='words' onChangeText={(text) => { this.setState({ discription: text }) }} />

              <TextInput style={styles.pincode} placeholder='Pincode' placeholderTextColor={'#000'} defaultValue={pincode}
                keyboardType='numeric' maxLength={6} onChangeText={(text) => { this.setState({ pincode: text }) }} />

              <TouchableOpacity style={styles.locationbox} activeOpacity={0.8} onPress={() => { this.setState({ mapmodal: true }) }}>
                <Text style={{
                  width: '85%',
                  fontWeight: '700',
                  fontSize: 17,
                  color: (is_location_set) ? 'green' : '#000'
                }}>Pin the Area on the Map</Text>

                <FontAwesome5 name='map-marked' size={25} color={(is_location_set) ? 'green' : '#000'} />


              </TouchableOpacity>

              <View style={styles.pincodeField}>

                <TouchableOpacity style={styles.villagebox} onPress={() => { this.setState({ talukaModal: true }) }} >
                  <Text style={{ textAlign: 'center', width: '80%', fontWeight: '700', fontSize: 17, color: (talukaLabel === 'Select Taluka') ? '#000' : '#000000' }} >{this.state.talukaLabel}</Text>
                  <FontAwesome5 name='sort' color={'#000'} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.villagebox} onPress={() => { this.setState({ villageModel: true }) }} >
                  <Text style={{ textAlign: 'center', width: '80%', fontWeight: '700', fontSize: 17, color: (villageLabel === 'Select village') ? '#000' : '#000000' }} >{this.state.villageLabel}</Text>
                  <FontAwesome5 name='sort' color={'#000'} />
                </TouchableOpacity>


                {/* {
                  (this.state.Area.map((item, index) => {
                    return (
                      console.log(item)
                    )
                  }))
                } */}

              </View>

              {
                (this.state.loader) ?
                  <TouchableOpacity style={[styles.SubmitBtn, { backgroundColor: '#008CBA' }]} disabled={true}  >
                    <Text style={styles.BtnText}>Uploading...</Text>
                  </TouchableOpacity>
                  :
                  <TouchableOpacity style={styles.SubmitBtn} onPress={on_submit} disabled={this.state.loader}  >
                    <Text style={styles.BtnText2} >Submit</Text>
                  </TouchableOpacity>
              }
            </View>
          </View>
        </ScrollView>
      </View>
    )
  };
};

const shadow = {
  shadowColor: '#ff8c00',
  shadowRadius: 10,
  shadowOpacity: 0.6,
  elevation: 5,
  shadowOffset: {
    width: 0,
    height: 4
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#ff8c00',
    justifyContent: 'center',
    alignItems: 'center',
    height: height,
    width: '100%',
    backgroundColor: '#fff',
  },
  logobox: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 5,
    shadowOpacity: 0.4,

  },
  data: {
    flex: 2,
    // backgroundColor: '#fff',
    width: '100%',
    // height: height,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    top: -10
  },
  complainttext: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#000',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image_option: {
    flex: 2,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 20,
    paddingLeft: 20,
  },
  header: {
    backgroundColor: '#ffffff',
    width: 400,
    height: 60,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#ff8c00',
    justifyContent: 'center',
    alignItems: 'center',

  },
  wrap: {
    width: width - 25, //375
    height: 150,
    borderRadius: 30,
    // shadowOffset: { width: 1, height: 2 },
    // shadowRadius: 5,
    // elevation: 3,
    // shadowOpacity: 0.4,
  },
  wrapDot: {
    position: 'absolute',
    // bottom: 0,
    bottom: -28,
    flexDirection: 'row',
    alignSelf: 'center'
  },
  dot: {
    margin: 3,
    color: 'black'
  },
  dotActive: {
    margin: 3,
    color: '#ff8c00'
  },
  takePhoto: {
    backgroundColor: '#ffffff',
    width: 400,
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ChoosPhoto: {
    backgroundColor: '#ffffff',
    width: 400,
    height: 60,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modelhead: {
    fontWeight: '700',
    fontSize: 30,
    color: '#000000',
    backgroundColor: '#ff8c00',
    width: width - 50,
    textAlign: 'center',
    paddingVertical: 15,
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
  },
  closebtn: {
    height: 50,
    width: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 10,
  },
  headertext: {
    // fontWeight: '700',
    fontSize: 30,
    color: '#000000',
    backgroundColor: '#ffffff',
    width: "100%",
    textAlign: 'center',
    paddingVertical: 15,
    borderRadius: 17,
    // elevation: 10,
    marginVertical: 20,
  },
  choosphoto: {
    width: '100%',
    height: 200,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    overflow: 'hidden',
    marginVertical: 10,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 3,
    shadowOpacity: 0.4,
    borderColor: '#000',
    borderWidth: 2,
    bottom: 10
  },
  fields: {
    width: '100%',
    borderRadius: 12,
    fontWeight: "bold",
    fontSize: 17,
    marginVertical: 5,
    backgroundColor: '#fff',
    color: 'rgb(0,0,0)',
    paddingLeft: 15,
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 5,
    elevation: 5,
    shadowOpacity: 0.4,
    // textAlign: 'center',
    bottom: 10,
    borderColor: '#000',
    borderWidth: 0.5,
  },
  catagorybox: {
    flexDirection: "row",
    backgroundColor: '#fff',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
    bottom: 10,
    borderColor: '#000',
    borderWidth: 0.5,
  },
  // locationbox: {
  //   width: '100%',
  //   borderRadius: 12,
  //   fontWeight: "bold",
  //   fontSize: 17,
  //   marginVertical: 5,
  //   backgroundColor: '#fff',
  //   color: 'rgb(0,0,0)',
  //   paddingLeft: 15,
  //   shadowOffset: { width: 5, height: 5 },
  //   shadowRadius: 5,
  //   elevation: 5,
  //   shadowOpacity: 0.4,
  //   bottom: 10,
  // },
  catagorytxt: {
    fontSize: 17,
    fontWeight: '700',
    color: '#000000',
  },
  pincodeField: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginVertical: 15,
    justifyContent: 'space-between',
    color: '#000',
  },
  pincode: {
    width: '100%',
    backgroundColor: '#fff',
    color: '#000',
    borderRadius: 12,
    paddingLeft: 15,
    fontWeight: "bold",
    fontSize: 17,
    marginVertical: 5,
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 5,
    elevation: 5,
    shadowOpacity: 0.4,
    bottom: 10,
    borderColor: '#000',
    borderWidth: 0.5,
  },
  villagebox: {
    backgroundColor: '#fff',
    width: '48%',
    borderRadius: 12,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: "row",
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 5,
    elevation: 5,
    shadowOpacity: 0.4,
    // bottom: 5,
    bottom: 10,
    borderColor: '#000',
    borderWidth: 0.5,
  },
  SubmitBtn: {
    width: '100%',
    paddingVertical: 15,
    fontWeight: "bold",
    backgroundColor: '#ff8c00',
    alignItems: 'center',
    borderRadius: 12,
    marginTop: 10,
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 5,
    elevation: 5,
    shadowOpacity: 0.4,
    bottom: 10,
    borderColor: '#000',
    borderWidth: 0.5,
  },
  BtnText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white'
  },
  BtnText2: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white'
  },
  sortoptions: {
    paddingVertical: 20,
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.5)',
  },
  locationbox: {
    width: '100%',
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    elevation: 5,
    bottom: 5,
    borderColor: '#000',
    borderWidth: 0.5,
  },
  mapbox: {
    height: '100%',
    width: '100%',
    // flex: 1,
    // marginHorizontal: 30,
    backgroundColor: '#b6b6b6b6',
    // marginTop: 30,
    // borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    alignItems: 'center',

  },
  map: {
    flex: 1,
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  cancelBtn: {
    width: '100%',
    height: 60,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    elevation: 10,
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

  //Model
  headerClose: {
    height: 50,
    width: '100%',
    backgroundColor: 'rgb(255, 140, 0)',
    justifyContent: 'center',
    alignItems: "flex-start",
    // position: 'absolute',
    top: 0,
  },
  modealView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterModel: {
    padding: 15,
    width: width - 50,
    height: 500,
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 17,
    borderBottomRightRadius: 17,
    overflow: 'hidden',
    elevation: 20,
  },

  //InfoModel
  infomodealView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  infofilterModel: {
    padding: 15,
    width: width,
    height: 410,
    backgroundColor: '#ffffff',
    borderTopRightRadius: 17,
    borderTopLeftRadius: 17,
    overflow: 'hidden',
    elevation: 20,
  },
  infoheaderClose: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    // borderBottomWidth: 1,
    // borderColor: '#000'
  },
  infomodelTop: {
    fontWeight: '700',
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
    width: '100%',
  },
  infoeditbtn: {
    right: 10
  },
  infosortoptions: {
    paddingVertical: 20,
  },
  infotitle: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#000'
  },
  infotext: {
    fontWeight: '500',
    fontSize: 15,
    color: '#000',
    left: 10,
    top: 10
  }
});