import { Text, View, Image, Dimensions } from 'react-native';
import React, { Component } from 'react';

export class Category extends Component {

  render() {
    const WIDTH = Dimensions.get('window').width;
    const HEIGHT = Dimensions.get('window').height;
    return (
      <View style={{ height:165, width: 300, marginLeft: 5 }}>
        <View style={{ flex: 5 }}>
          <Image source={this.props.imageUri}
            style={{ flex: 1, width: null, height: null, resizeMode: 'cover', borderRadius: 20, }}
          />
        </View>
        {/* <View style={{flex: 1, alignItems: 'center'}}>
         <Text
         style={{flex: 1, color: '#000', fontWeight: 'bold', paddingTop: 5}}
         >{this.props.name}</Text>
       </View> */}
      </View>
    );
  }
}

export default Category;
