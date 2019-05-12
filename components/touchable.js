/*
 * @Author: czy0729
 * @Date: 2019-03-28 15:35:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-07 01:36:24
 */
import React from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback,
  View
} from 'react-native'
import { IOS } from '@constants'
import { colorHighLight } from '@styles'

const Touchable = ({
  style,
  withoutFeedback,
  highlight,
  children,
  ...other
}) => {
  if (withoutFeedback) {
    return (
      <TouchableOpacity style={style} activeOpacity={1} {...other}>
        {children}
      </TouchableOpacity>
    )
  }

  if (IOS) {
    if (highlight) {
      return (
        <View style={style}>
          <TouchableHighlight
            style={styles.touchable}
            activeOpacity={1}
            underlayColor={colorHighLight}
            {...other}
          >
            <View />
          </TouchableHighlight>
          {children}
        </View>
      )
    }

    return (
      <TouchableOpacity style={style} activeOpacity={0.64} {...other}>
        {children}
      </TouchableOpacity>
    )
  }

  return (
    <View style={style}>
      <TouchableNativeFeedback {...other}>
        <View style={styles.touchable} />
      </TouchableNativeFeedback>
      {children}
    </View>
  )
}

Touchable.defaultProps = {
  withoutFeedback: false,
  highlight: false
}

export default Touchable

const styles = StyleSheet.create({
  touchable: {
    ...StyleSheet.absoluteFill,
    zIndex: 1
  }
})