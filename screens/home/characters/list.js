/*
 * @Author: czy0729
 * @Date: 2020-05-21 17:07:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-21 17:49:15
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Loading, ListView } from '@components'
import { ItemCharacter } from '@screens/_'
import { _ } from '@stores'
import { keyExtractor } from '@utils/app'
import { observer } from '@utils/decorators'

const event = {
  id: '更多角色.跳转'
}

export default
@observer
class List extends React.Component {
  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  renderItem = ({ item, index }) => {
    const { navigation } = this.context
    return (
      <ItemCharacter
        style={_.container.item}
        navigation={navigation}
        index={index}
        event={event}
        {...item}
      />
    )
  }

  render() {
    const { $ } = this.context
    const { _loaded } = $.characters
    if (!_loaded) {
      return <Loading />
    }

    return (
      <ListView
        contentContainerStyle={this.styles.contentContainerStyle}
        keyExtractor={keyExtractor}
        data={$.characters}
        renderItem={this.renderItem}
      />
    )
  }

  get styles() {
    return memoStyles()
  }
}

const memoStyles = _.memoStyles(_ => ({
  contentContainerStyle: {
    paddingBottom: _.bottom
  }
}))
