/*
 * @Author: czy0729
 * @Date: 2020-05-02 15:54:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-11-07 23:24:38
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Loading, ListView } from '@components'
import { ItemCatalog } from '@screens/_'
import { _ } from '@stores'
import { open } from '@utils'
import { inject, withHeader, observer } from '@utils/decorators'
import { t, hm } from '@utils/fetch'
import { keyExtractor } from '@utils/app'
import Store from './store'

const title = '条目目录'
const event = {
  id: '条目目录.跳转'
}

export default
@inject(Store)
@withHeader({
  screen: title
})
@observer
class SubjectCatalogs extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { name } = navigation.state.params
    return {
      title: name ? `包含${name}的目录` : title
    }
  }

  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  componentDidMount() {
    const { $, navigation } = this.context
    $.init()

    navigation.setParams({
      popover: {
        data: ['浏览器查看'],
        onSelect: key => {
          t('条目目录.右上角菜单', {
            key
          })

          switch (key) {
            case '浏览器查看':
              open($.url)
              break

            default:
              break
          }
        }
      }
    })

    hm(`subject/${$.subjectId}/index`, 'SubjectCatalogs')
  }

  renderItem = ({ item }) => {
    const { navigation } = this.context
    return (
      <ItemCatalog
        navigation={navigation}
        event={event}
        isUser
        id={item.id}
        name={item.userName}
        title={item.title}
        last={item.time}
      />
    )
  }

  render() {
    const { $ } = this.context
    const { _loaded } = $.list
    if (!_loaded) {
      return <Loading style={_.container.plain} />
    }

    return (
      <ListView
        style={_.select(_.container.plain, _.container.bg)}
        contentContainerStyle={_.container.bottom}
        keyExtractor={keyExtractor}
        data={$.list}
        renderItem={this.renderItem}
        onHeaderRefresh={() => $.fetchSubjectCatalogs(true)}
        onFooterRefresh={$.fetchSubjectCatalogs}
      />
    )
  }
}
