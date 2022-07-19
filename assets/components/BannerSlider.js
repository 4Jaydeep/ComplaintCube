import React from 'react'; 
// import { sliderData, image } from '../components/data';
import {View, Image} from 'react-native';

export default function BannerSlider({data}) {
  return (
    <View>
      <Image
        source={data.image}
        style={{height: 150, width: 300, borderRadius: 10}}
      />
    </View>
  );
}