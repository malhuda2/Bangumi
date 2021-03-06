/*
 * @Author: czy0729
 * @Date: 2019-09-19 00:35:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-11-04 15:13:20
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Loading, ListView } from '@components'
import { _ } from '@stores'
import { keyExtractor } from '@utils/app'
import { observer } from '@utils/decorators'
import Item from './item'

function List({ title }, { $ }) {
  if (!$.balance._loaded) {
    return <Loading style={_.container.flex} color={_.colorTinygrailText} />
  }

  let data
  switch (title) {
    case '刮刮乐':
      data = {
        ...$.balance,
        list: $.balance.list.filter(item => item.desc.includes('刮刮乐'))
      }
      break
    case '道具':
      data = {
        ...$.balance,
        list: $.balance.list.filter(item => item.desc.includes('使用「'))
      }
      break
    case '卖出':
      data = {
        ...$.balance,
        list: $.balance.list.filter(
          item => item.desc.includes('卖出') && item.change > 0
        )
      }
      break
    case '买入':
      data = {
        ...$.balance,
        list: $.balance.list.filter(
          item => item.desc.includes('买入') && item.change < 0
        )
      }
      break
    case '圣殿':
      data = {
        ...$.balance,
        list: $.balance.list.filter(item => item.desc.includes('融资'))
      }
      break
    case '竞拍':
      data = {
        ...$.balance,
        list: $.balance.list.filter(item => item.desc.includes('竞拍'))
      }
      break
    case 'ICO':
      data = {
        ...$.balance,
        list: $.balance.list.filter(item => item.desc.includes('ICO'))
      }
      break
    case '分红':
      data = {
        ...$.balance,
        list: $.balance.list.filter(
          item => item.desc.includes('分红') || item.desc.includes('奖励')
        )
      }
      break
    default:
      data = $.balance
      break
  }

  return (
    <ListView
      style={_.container.flex}
      contentContainerStyle={_.container.bottom}
      keyExtractor={keyExtractor}
      refreshControlProps={{
        color: _.colorTinygrailText
      }}
      footerTextType='tinygrailText'
      data={data}
      renderItem={renderItem}
      onHeaderRefresh={() => $.fetchBalance()}
    />
  )
}

List.defaultProps = {
  title: '全部'
}

List.contextTypes = {
  $: PropTypes.object
}

export default observer(List)

function renderItem({ item, index }) {
  return <Item index={index} {...item} />
}
