import React, {Component} from 'react'
import {
  View,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  Easing,
} from 'react-native'

import {FontAwesome, MaterialIcons, Entypo} from '@expo/vector-icons'

const image = 'http://pupjoyblog.com/wp-content/uploads/2017/06/Cute-dog-listening-to-music-1_1.jpg'

export default class Card extends Component {
  state = {
    spinValue: new Animated.Value(0),
    flipValue: new Animated.Value(1),
    cropValue: new Animated.Value(200),
    resizeValue: new Animated.Value(200),
    countSpin: 1,
    countFlip: 0,
  }

  _handleRotation = () => {
    this.setState({countSpin: this.state.countSpin + 1})
    Animated.timing(
        this.state.spinValue,
      {
        toValue: this.state.countSpin % 2,
        duration: 1000,
        easing: Easing.linear
      }
    ).start()
  }

  _handleFlip = () => {
    this.setState({countFlip: this.state.countFlip + 1})
    Animated.timing(
        this.state.flipValue,
      {
        toValue: this.state.countFlip % 2 ? -1 : 1,
        duration: 1000,
        easing: Easing.linear
      }
    ).start()
  }

  _handleResize = () => {
    Animated.timing(
        this.state.resizeValue,
      {
        toValue: 100,
        duration: 1000,
        easing: Easing.linear
      }
    ).start()
    Animated.timing(
        this.state.cropValue,
      {
        toValue: 100,
        duration: 1000,
        easing: Easing.linear
      }
    ).start()
  }

  _handleCrop = () => {
    Animated.timing(
        this.state.cropValue,
      {
        toValue: 100,
        duration: 1000,
        easing: Easing.linear
      }
    ).start()
  }

  render() {
    const spin = this.state.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: [
        `${(this.state.countSpin + (this.state.countSpin) % 2 - 2) * 90}deg`,
        `${(this.state.countSpin + (this.state.countSpin + 1) % 2 - 2) * 90}deg`
      ]
    })
    const anymatedRotation = {transform: [{rotate: spin}]}
    const anymatedFlip = {transform: [{scaleX: this.state.flipValue}]}
    const anymatedResize = {
      height: this.state.resizeValue,
      width: this.state.resizeValue,
      maxWidth: this.state.resizeValue
    }
    const anymatedCrop = {height: this.state.cropValue}
    return (
      <View style={styles.wrapper}>
        <Animated.View style={[{flex: 1, marginLeft: 20}, anymatedCrop]}>
          <Animated.View style={[{flex: 1}, anymatedRotation, anymatedResize]}>
            <Animated.Image style={[styles.image,anymatedFlip]} source={{uri: image}} />
          </Animated.View>
        </Animated.View>
        <View>
          <TouchableWithoutFeedback onPress={this._handleRotation}>
            <FontAwesome style={{margin: 10}} name={'rotate-right'} size={30} />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={this._handleFlip}>
            <MaterialIcons style={{margin: 10}} name={'flip'} size={30} />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={this._handleResize}>
            <Entypo style={{margin: 10}} name={'resize-100-'} size={30} />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={this._handleCrop}>
            <Entypo style={{margin: 10}} name={'document-landscape'} size={30} />
          </TouchableWithoutFeedback>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 50,
  },
  image: {
    flex: 1,
    minWidth: '100%',
    overflow: 'hidden',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 8,
  },
})
