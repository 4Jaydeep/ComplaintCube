import { View, Text,StatusBar,Image } from 'react-native'
import React from 'react'


const Splash = ({navigation}) => {

  setTimeout(() =>{
    // navigation.replace('Onboarding')
    navigation.replace('Login')

  }, 1000)
  return (
    <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center' ,alignItems: 'center',backgroundColor: '#fff'}}>
        <StatusBar barStyle='light-content' hidden={false} backgroundColor={'#ff8c00'} />
        <Image source={require('../imgs/Logos/Orange.png')} style={{width: 100,height: 110,justifyContent: 'center',alignItems: 'center'}} />
        {/* <Text style={{fontSize: 30, color: '#fff'}}>Welcome To ComplaintCube</Text> */}
      </View>
  )
}

export default Splash