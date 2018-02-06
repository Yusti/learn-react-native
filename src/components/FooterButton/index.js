/**
 *
 * FooterButton
 *
 */

import React from 'react'
import PropTypes from 'prop-types'

import { TouchableOpacity } from 'react-native'

import styles from './styles'

export default class FooterButton extends React.Component {
  static propTypes = {
    onPress: PropTypes.func,
    icon: PropTypes.node,
  }

  render() {
    const { onPress, icon } = this.props

    return (
      <TouchableOpacity
        underlayColor="rgba(255,255,255,.5)"
        style={styles.button}
        onPress={onPress}
      >
        {icon}
      </TouchableOpacity>
    )
  }
}
