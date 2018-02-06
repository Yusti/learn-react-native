/**
 *
 * App
 *
 */

import React from 'react'
import { View } from 'react-native'

import Card from '@/components/Card'

import styles from './styles'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Card />
      </View>
    )
  }
}
