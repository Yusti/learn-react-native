/**
 *
 * Card
 *
 */

import React from 'react'
import {
  View,
  Animated,
  Easing,
  StatusBar,
  Image,
  Dimensions,
} from 'react-native'
import { ScreenOrientation } from 'expo'
import { FontAwesome, MaterialIcons, Entypo } from '@expo/vector-icons'
import FooterButton from '@/components/FooterButton'

import cat from 'assets/cat.jpg'

import styles from './styles'

export default class Card extends React.Component {
  state = {
    countSpin: 1,
    countFlip: 0,
    imageWrapperLayout: false,
    imageLayout: false,
    isPortrait: true,
  }

  render() {
    const {
      imageWrapperLayout,
      imageLayout,
      maxImageWidth,
      maxImageHeight,
    } = this.state

    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: [
        `${(this.state.countSpin + this.state.countSpin % 2 - 2) * 90}deg`,
        `${(this.state.countSpin + (this.state.countSpin + 1) % 2 - 2) *
          90}deg`,
      ],
    })

    const animated = {
      transform: [
        { scale: this.scaleValue },
        { scaleX: this.flipValue },
        { rotate: spin },
      ],
    }

    const imageSize = { width: maxImageWidth, height: maxImageHeight }

    return (
      <View style={styles.container}>
        <StatusBar hidden />

        <View style={styles.content} onLayout={this._onContentLayout}>
          {imageLayout ? (
            <Animated.Image
              source={cat}
              style={[
                styles.image,
                imageSize,
                animated,
                // {
                //   transform: [
                //     { rotateZ: '25deg' },
                //     { rotateX: '180deg' },
                //     { rotateY: '180deg' },
                //     { rotate: '140deg' },
                //   ],
                // },
              ]}
            />
          ) : null}
        </View>

        {imageWrapperLayout && !imageLayout ? (
          <Image
            source={cat}
            style={styles.imageStub}
            onLayout={this._onImageLayout}
          />
        ) : null}

        <View style={styles.footer}>
          <FooterButton
            onPress={this._handleRotation}
            icon={<FontAwesome name="rotate-right" size={30} />}
          />

          <FooterButton
            onPress={this._handleFlip}
            icon={<MaterialIcons name="flip" size={30} />}
          />

          <FooterButton
            onPress={this._handleResize}
            icon={<Entypo name="resize-100-" size={30} />}
          />

          <FooterButton
            onPress={this._handleResize}
            icon={<Entypo name="document-landscape" size={30} />}
          />
        </View>
      </View>
    )
  }

  componentWillMount() {
    this.scaleValue = new Animated.Value(1)
    this.spinValue = new Animated.Value(0)
    this.flipValue = new Animated.Value(1)
  }

  _onContentLayout = e => {
    console.log('_onContentLayout')

    const contentWidth = e.nativeEvent.layout.width
    const contentHeight = e.nativeEvent.layout.height

    this.setState({ contentWidth, contentHeight, imageWrapperLayout: true })

    console.info('contentWidth: ', contentWidth)
    console.info('contentHeight: ', contentHeight)
  }

  _onImageLayout = e => {
    console.log('_onImageLayout')

    const { contentWidth, contentHeight } = this.state

    const originalImageWidth = e.nativeEvent.layout.width
    const originalImageHeight = e.nativeEvent.layout.height

    const imageRatio = originalImageWidth / originalImageHeight

    console.info('originalImageHeight: ', originalImageHeight)
    console.info('originalImageWidth: ', originalImageWidth)

    console.info('imageRatio: ', imageRatio)

    let maxImageWidth, maxImageHeight

    if (imageRatio >= 1) {
      maxImageWidth = contentWidth
      maxImageHeight = contentWidth / imageRatio
    } else {
      maxImageHeight = contentHeight
      maxImageWidth = contentHeight * imageRatio
    }

    this.scaleValue.setValue(1)

    this.setState({
      imageRatio,
      maxImageWidth,
      maxImageHeight,
      imageLayout: true,
    })
  }

  componentDidMount() {
    ScreenOrientation.allow(ScreenOrientation.Orientation.ALL)
    Dimensions.addEventListener('change', this._orientationChangeHandler)
  }

  componentWillUnmount() {
    ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT)
    Dimensions.removeEventListener('change', this._orientationChangeHandler)
  }

  _orientationChangeHandler = dims => {
    const { width, height } = dims.window

    const isLandscape = width > height

    const { imageRatio, contentWidth, contentHeight } = this.state

    let maxImageWidth, maxImageHeight

    if (isLandscape) {
      if (imageRatio >= 1) {
        maxImageWidth = contentHeight
        maxImageHeight = contentHeight / imageRatio
      } else {
        maxImageHeight = contentWidth
        maxImageWidth = contentWidth * imageRatio
      }
    } else {
      if (imageRatio >= 1) {
        maxImageWidth = contentWidth
        maxImageHeight = contentWidth / imageRatio
      } else {
        maxImageHeight = contentHeight
        maxImageWidth = contentHeight * imageRatio
      }
    }

    this.setState({ isPortrait: !isLandscape, maxImageWidth, maxImageHeight })

    ScreenOrientation.allow(ScreenOrientation.Orientation.ALL)
  }

  _handleRotation = () => {
    this.setState({ countSpin: this.state.countSpin + 1 })

    const toValue = this.state.countSpin % 2

    Animated.timing(this.spinValue, {
      toValue,
      duration: 1000,
      easing: Easing.linear,
    }).start()
  }

  _handleFlip = () =>
    Animated.timing(this.flipValue, {
      toValue: this.state.countFlip % 2 ? 1 : -1,
      duration: 300,
      easing: Easing.linear,
    }).start(() =>
      this.setState(prevState => ({ countFlip: prevState.countFlip + 1 }))
    )

  _handleResize = () =>
    Animated.timing(this.scaleValue, {
      toValue: 0.3,
      duration: 300,
      easing: Easing.linear,
    }).start(() =>
      Animated.spring(this.scaleValue, {
        toValue: 0.7,
        friction: 2,
        tension: 50,
      }).start(() =>
        Animated.timing(this.scaleValue, {
          toValue: 2,
          duration: 300,
          easing: Easing.linear,
        }).start(() =>
          Animated.spring(this.scaleValue, {
            toValue: 0.9,
            speed: 2,
            bounciness: 8,
          }).start()
        )
      )
    )
}
