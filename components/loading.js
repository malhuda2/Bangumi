/*
 * @Author: czy0729
 * @Date: 2019-03-13 22:49:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-03 13:26:48
 */
import React from 'react'
import { StyleSheet, View, Animated } from 'react-native'
import _, { colorDesc, radiusSm } from '@styles'

const arr = [1, 2, 3, 4, 5]

class Raw extends React.Component {
  static defaultProps = {
    color: colorDesc
  }

  constructor() {
    super()

    const initState = {}
    arr.forEach(
      item => (initState[`heightAnim${item}`] = new Animated.Value(20))
    )
    this.state = initState
  }

  componentDidMount() {
    arr.forEach(item => {
      const animation = Animated.sequence([
        Animated.timing(this.state[`heightAnim${item}`], {
          toValue: 40,
          duration: 640,
          delay: 200
        }),
        Animated.timing(this.state[`heightAnim${item}`], {
          toValue: 20,
          duration: 640,
          delay: 200
        }),
        Animated.timing(this.state[`heightAnim${item}`], {
          toValue: 20,
          duration: 400
        })
      ])
      setTimeout(() => {
        Animated.loop(animation).start()
      }, item * 240)
    })
  }

  render() {
    const { color } = this.props
    return arr.map(item => (
      <Animated.View
        key={item}
        style={[
          styles.line,
          {
            backgroundColor: color,
            height: this.state[`heightAnim${item}`]
          }
        ]}
      />
    ))
  }
}

const Loading = ({ style }) => (
  <View style={[_.container.row, style]}>
    <Raw />
  </View>
)

Loading.Raw = Raw
export default Loading

const styles = StyleSheet.create({
  line: {
    width: 6,
    marginHorizontal: 2,
    borderRadius: radiusSm
  }
})