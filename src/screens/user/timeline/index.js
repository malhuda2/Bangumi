/*
 * @Author: czy0729
 * @Date: 2020-07-20 16:30:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-07-31 11:08:01
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { ListView } from '@components'
import { _ } from '@stores'
import { inject, withHeader, observer } from '@utils/decorators'
import MosaicTile from './mosaic-tile'
import List from './list'
import Store from './store'

const title = '时间线'

export default
@inject(Store)
@withHeader({
  screen: title,
  hm: ['user/timeline', 'UserTimeline']
})
@observer
class UserTimeline extends React.Component {
  static navigationOptions = {
    title
  }

  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  componentDidMount() {
    const { $, navigation } = this.context
    $.init()

    const { userName } = $.params
    if (userName) {
      navigation.setParams({
        title: `${userName}的${title}`
      })
    }
  }

  renderItem = () => <View />

  render() {
    const { $ } = this.context
    return (
      <ListView
        style={_.container.plain}
        data={$.timeline}
        ListHeaderComponent={
          <>
            <MosaicTile />
            <List />
          </>
        }
        renderItem={this.renderItem}
        onHeaderRefresh={async () => {
          await $.fetchMosaicTile()
          return $.fetchTimeline(true)
        }}
        onFooterRefresh={$.fetchTimeline}
      />
    )
  }
}
