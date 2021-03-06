/*
 * @Author: czy0729
 * @Date: 2019-11-17 12:10:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-11-10 20:20:24
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { Flex, Text, Image, Iconfont, Touchable } from '@components'
import { _ } from '@stores'
import { formatNumber, toFixed } from '@utils'
import { observer } from '@utils/decorators'
import { tinygrailOSS, getCoverLarge } from '@utils/app'
import { t } from '@utils/fetch'

const maxSize = _.window.width / 3

function Info(props, { $, navigation }) {
  const styles = memoStyles()
  const { showCover } = $.state
  const {
    icon,
    id,
    name,
    bonus,
    marketValue,
    current,
    total,
    level,
    fluctuation
  } = $.chara
  let color = 'tinygrailPlain'
  if (fluctuation < 0) {
    color = 'ask'
  } else if (fluctuation > 0) {
    color = 'bid'
  }

  let fluctuationText = '-%'
  if (fluctuation > 0) {
    fluctuationText = `+${toFixed(fluctuation, 2)}%`
  } else if (fluctuation < 0) {
    fluctuationText = `${toFixed(fluctuation, 2)}%`
  }

  return (
    <View style={styles.container}>
      {showCover && !!icon && (
        <Flex justify='center'>
          <Image
            style={styles.image}
            src={tinygrailOSS(getCoverLarge(icon))}
            autoSize={maxSize}
            shadow
            placholder={false}
            imageViewer
            imageViewerSrc={tinygrailOSS(getCoverLarge(icon), 480)}
            event={{
              id: '资产重组.封面图查看',
              data: {
                monoId: $.monoId
              }
            }}
          />
        </Flex>
      )}
      <Flex style={showCover && _.mt.md} justify='center'>
        <Touchable
          onPress={() => {
            t('资产重组.跳转', {
              to: 'Mono',
              from: '顶部',
              monoId: $.monoId
            })

            navigation.push('Mono', {
              monoId: `character/${id}`,
              _name: name
            })
          }}
        >
          <Flex justify='center'>
            <Text type='tinygrailPlain' size={15} bold>
              #{id} - {name}
              {!!bonus && (
                <Text type='warning' size={15}>
                  {' '}
                  x{bonus}
                </Text>
              )}
              <Text type='ask' size={15}>
                {' '}
                lv{level}
              </Text>
            </Text>
            <Iconfont
              style={_.ml.xs}
              name='right'
              size={14}
              color={_.colorTinygrailText}
            />
          </Flex>
        </Touchable>
        <Touchable style={_.ml.sm} onPress={$.toggleCover}>
          <Text type='tinygrailText' size={15}>
            [{showCover ? '隐藏' : '显示'}封面]
          </Text>
        </Touchable>
      </Flex>
      <Flex
        style={[_.container.wind, _.mt.sm]}
        justify='center'
        align='baseline'
      >
        <Text type='tinygrailText' align='center' size={13}>
          市值{formatNumber(marketValue, 0, $.short)} / 量
          {formatNumber(total, 0, $.short)} / 发行价 {toFixed($.issuePrice, 1)}{' '}
          /{' '}
          <Text type='tinygrailPlain' size={13}>
            {current && toFixed(current, 2)}
          </Text>
          <Text type={color} align='center' size={13}>
            {' '}
            {fluctuationText}
          </Text>
        </Text>
      </Flex>
    </View>
  )
}

Info.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Info)

const memoStyles = _.memoStyles(_ => ({
  image: {
    backgroundColor: _.tSelect(_._colorDarkModeLevel2, _.colorTinygrailBg)
  },
  container: {
    paddingVertical: _.space,
    paddingHorizontal: _.wind
  }
}))
