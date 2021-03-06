/*
 * @Author: czy0729
 * @Date: 2020-04-04 16:10:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-09-24 17:47:58
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { TabsV2 } from '@components'
import List from './list'
import { tabs } from './store'

function Tabs(props, { $ }) {
  const { page } = $.state
  return (
    <TabsV2
      routes={tabs}
      page={page}
      renderItem={item => <List key={item.key} type={item.key} />}
      onChange={$.onTabChange}
    />
  )
}

Tabs.contextTypes = {
  $: PropTypes.object
}

export default observer(Tabs)
