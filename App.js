import React, {Component} from 'react'
import {View} from 'react-native'

import Card from './card'

export default class App extends Component {

  render() {
    return (
      <View style={{flex:1}}>
        <Card />
      </View>
    )
  }
}
