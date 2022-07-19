import { Text, StyleSheet, View, ScrollView, Dimensions, Image, Linking, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import MapView, { Marker } from 'react-native-maps'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { } from 'react-native-gesture-handler';
import { Button } from 'react-native-elements/dist/buttons/Button';
import ToiletScreen from './toiletScreen';

const { height } = Dimensions.get('screen');
const { width } = Dimensions.get('screen');

export default class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fatchData: [],
      isArrayEmpty: undefined,
      Latitude: 21.2254484,
      Longitude: 72.8413231,
      zooming: 0.01,
      mapmodal: false,
    }
  };

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
  render() {

    return (
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Text style={{ paddingTop: 20, paddingLeft: 10, color: '#000', fontSize: 18, fontWeight: 'bold' }}>Helpfull Links</Text>

            <ScrollView
              horizontal={true}
              decelerationRate={0}
              snapToInterval={220}
              snapToAlignment={"center"}
              showsHorizontalScrollIndicator={false}>

              <TouchableOpacity style={[styles.view, { backgroundColor: '#fff' }]} onPress={() => Linking.openURL('https://uidai.gov.in/my-aadhaar/avail-aadhaar-services.html')}>
                <View style={{ justifyContent: 'flex-start', alignSelf: 'flex-start', flex: 1 }}>
                  <Image style={{ width: 50, height: 50, justifyContent: 'flex-end', alignSelf: 'flex-end', }} source={require('../imgs/Links/aadhar.png')} />
                </View>
                <View style={{ justifyContent: 'center', alignSelf: 'center', flex: 1 }}>
                  <Text style={{ color: '#000', textAlign: 'left', alignSelf: 'center', top: 5, fontWeight: 'bold', }}>Aadhar Releted Service</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.view, { backgroundColor: '#fff' }]} onPress={() => Linking.openURL('https://www.utiitsl.com/itServices')}>
                <View style={{ justifyContent: 'flex-start', alignSelf: 'flex-start', flex: 1 }}>
                  <Image style={{ width: 50, height: 50, justifyContent: 'flex-end', alignSelf: 'flex-end', }} source={require('../imgs/Links/idcard.png')} />
                </View>
                <View style={{ justifyContent: 'center', alignSelf: 'center', flex: 1 }}>
                  <Text style={{ color: '#000', textAlign: 'left', alignSelf: 'center', top: 5, fontWeight: 'bold', }}>it related services</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.view, { backgroundColor: '#fff' }]} onPress={() => Linking.openURL('https://www.pan.utiitsl.com/PAN/')}>
                <View style={{ justifyContent: 'flex-start', alignSelf: 'flex-start', flex: 1 }}>
                  <Image style={{ width: 50, height: 50, justifyContent: 'flex-end', alignSelf: 'flex-end', }} source={require('../imgs/Links/idcard.png')} />
                </View>
                <View style={{ justifyContent: 'center', alignSelf: 'center', flex: 1 }}>
                  <Text style={{ color: '#000', textAlign: 'left', alignSelf: 'center', top: 5, fontWeight: 'bold', }}>pan card services</Text>
                </View>
              </TouchableOpacity>

              

            </ScrollView>

            <ScrollView
              horizontal={true}
              decelerationRate={0}
              snapToInterval={220}
              snapToAlignment={"center"}
              showsHorizontalScrollIndicator={false}>

              <TouchableOpacity style={[styles.view, { backgroundColor: '#fff' }]} onPress={() => Linking.openURL('https://parivahan.gov.in/parivahan//en/content/vehicle-related-services')}>
                <View style={{ justifyContent: 'flex-start', alignSelf: 'flex-start', flex: 1 }}>
                  <Image style={{ width: 50, height: 50, justifyContent: 'flex-end', alignSelf: 'flex-end', }} source={require('../imgs/Links/idcard.png')} />
                </View>
                <View style={{ justifyContent: 'center', alignSelf: 'center', flex: 1 }}>
                  <Text style={{ color: '#000', textAlign: 'left', alignSelf: 'center', top: 5, fontWeight: 'bold', }}>licence related services</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.view, { backgroundColor: '#fff' }]} onPress={() => Linking.openURL('https://www.pmjay.utiitsl.com/pmjayecard/')}>
                <View style={{ justifyContent: 'flex-start', alignSelf: 'flex-start', flex: 1 }}>
                  <Image style={{ width: 50, height: 50, justifyContent: 'flex-end', alignSelf: 'flex-end', }} source={require('../imgs/Links/idcard.png')} />
                </View>
                <View style={{ justifyContent: 'center', alignSelf: 'center', flex: 1 }}>
                  <Text style={{ color: '#000', textAlign: 'left', alignSelf: 'center', top: 5, fontWeight: 'bold', }}>pmjay related services</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.view, { backgroundColor: '#fff' }]} onPress={() => Linking.openURL('https://services.india.gov.in/service/detail/ration-card')}>
                <View style={{ justifyContent: 'flex-start', alignSelf: 'flex-start', flex: 1 }}>
                  <Image style={{ width: 50, height: 50, justifyContent: 'flex-end', alignSelf: 'flex-end', }} source={require('../imgs/Links/idcard.png')} />
                </View>
                <View style={{ justifyContent: 'center', alignSelf: 'center', flex: 1 }}>
                  <Text style={{ color: '#000', textAlign: 'left', alignSelf: 'center', top: 5, fontWeight: 'bold', }}>ration card related services</Text>
                </View>
              </TouchableOpacity>

              
            </ScrollView>
          </View>

          {/* Near By Area */}


          <View>
            <Text style={{ paddingTop: 20, paddingLeft: 10, color: '#000', fontSize: 18, fontWeight: 'bold' }}>Area Near You</Text>
            <ScrollView
              // horizontal={true}
              decelerationRate={0}
              snapToInterval={220}
              snapToAlignment={"center"}
              showsHorizontalScrollIndicator={false}>

              <TouchableOpacity style={[styles.view1]} onPress={() => { Linking.openURL('https://www.google.com/maps/search/public+toilates/@21.232239,72.790941,12.42z') }}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                  <Text style={{ color: '#000', fontWeight: 'bold', alignSelf: 'center', fontSize: 14 }}>Near By Toilet</Text>
                  <Image style={{ width: 30, height: 30, alignSelf: 'center' }} source={require('../imgs/icons/orangemap.png')} />
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.view1]} onPress={() => { Linking.openURL('https://www.google.com/maps/search/hospitals+near+me/@21.2258768,72.816384,13z/data=!3m1!4b1') }}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                  <Text style={{ color: '#000', fontWeight: 'bold', alignSelf: 'center', fontSize: 14 }}>Near By Hospitals</Text>
                  <Image style={{ width: 30, height: 30, alignSelf: 'center' }} source={require('../imgs/icons/orangemap.png')} />
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.view1]} onPress={() => { Linking.openURL('https://www.google.com/maps/search/police+station+near+me/@21.2193016,72.7932096,13z') }}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                  <Text style={{ color: '#000', fontWeight: 'bold', alignSelf: 'center', fontSize: 14 }}>Near By Police Station</Text>
                  <Image style={{ width: 30, height: 30, alignSelf: 'center' }} source={require('../imgs/icons/orangemap.png')} />
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.view1]} onPress={() => { Linking.openURL('https://www.google.com/maps/search/brts+stop+near+me/@21.2212767,72.8176568,14.42z') }}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                  <Text style={{ color: '#000', fontWeight: 'bold', alignSelf: 'center', fontSize: 14 }}>Near By Public Transpot Bus Stops</Text>
                  <Image style={{ width: 30, height: 30, alignSelf: 'center' }} source={require('../imgs/icons/orangemap.png')} />
                </View>
              </TouchableOpacity>
            </ScrollView>
          </View>


          {/* HelpLine Numbers */}

          <View>
            <Text style={{ paddingTop: 20, paddingLeft: 10, color: '#000', fontSize: 18, fontWeight: 'bold' }}>Emergency Numbers</Text>

            <TouchableOpacity style={styles.buttonContainer}
              activeOpacity={0.8}
              onPress={() => { this.props.navigation.navigate('Help_line_numbers') }}>
              <Text style={{ color: '#000', alignSelf: 'center', fontSize: 14, fontWeight: 'bold' }}>Helpline Numbers</Text>
              <FontAwesome5 name='chevron-right' style={{justifyContent: 'center', alignSelf: 'center'}} size={25} color={'#ff8c00'}/>
            </TouchableOpacity>
          </View>


        </View>
      </ScrollView>
    )
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  view: {
    marginTop: 20, //50
    backgroundColor: '#fff',
    width: 200,
    margin: 10,
    height: 100,
    borderRadius: 20,
    paddingHorizontal: 30,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 5,
    elevation: 5,
    shadowOpacity: 0.4,
    // borderWidth: 1,
    // borderColor: '#ff8c00'
  },
  view1: {
    flex: 1,
    marginTop: 20, //50
    backgroundColor: '#fff',
    width: width - 20,
    margin: 10,
    height: 80,
    borderRadius: 20,
    paddingHorizontal: 20,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowColor: '#000000',
    elevation: 4,
    // borderWidth: 1,
    // borderColor: '#ff8c00',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20, //50
    backgroundColor: '#fff',
    width: width - 20,
    margin: 10,
    height: 80,
    borderRadius: 20,
    paddingHorizontal: 20,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowColor: '#000000',
    elevation: 4,
    // borderWidth: 1,
    // borderColor: '#ff8c00',
  },
  buttons: {
    // lineHeight: 50,
    color: "#000000",
  },
})