/*
 * @Author: czy0729
 * @Date: 2019-03-23 09:16:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-09 16:06:55
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex, Button, Icon, Text, Touchable } from '@components'
import { SectionTitle } from '@screens/_'
import { getType, getRating } from '@utils/app'
import _, { colorPlain, shadow } from '@styles'

const Box = ({ style }, { $, navigation }) => {
  const { typeNum } = $.subjectFormHTML
  const { status = { name: '未收藏' }, rating = 0 } = $.collection
  const leftStyle = []
  const rightStyle = []
  const btnText = $.isLogin ? status.name : '登陆管理'
  const onPress = $.isLogin ? $.showManageModel : () => navigation.push('Login')
  if (rating) {
    leftStyle.push(styles.left)
    rightStyle.push(styles.right)
  }
  return (
    <View style={[_.container.wind, style]}>
      <SectionTitle>收藏盒</SectionTitle>
      <View style={[shadow, _.mt.md]}>
        <Touchable onPress={onPress}>
          <Flex justify='center'>
            <Flex.Item>
              <Button style={leftStyle} type={getType(btnText)}>
                {btnText}
              </Button>
            </Flex.Item>
            {!!rating && (
              <Flex.Item>
                <Button style={rightStyle} type={getType(btnText)}>
                  {getRating(rating)}{' '}
                  {[1, 2, 3, 4, 5].map(item => {
                    let type
                    if (rating / 2 >= item) {
                      type = 'ios-star'
                    } else if (rating / 2 >= item - 0.5) {
                      type = 'ios-star-half'
                    } else {
                      type = 'ios-star-outline'
                    }
                    return (
                      <Icon
                        key={item}
                        name={type}
                        size={16}
                        color={colorPlain}
                      />
                    )
                  })}
                </Button>
              </Flex.Item>
            )}
          </Flex>
        </Touchable>
      </View>
      {!!typeNum && (
        <Text style={_.mt.md} size={12} type='sub'>
          {typeNum}
        </Text>
      )}
    </View>
  )
}

Box.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Box)

const styles = StyleSheet.create({
  touchable: {
    ...shadow
  },
  left: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  },
  right: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  }
})