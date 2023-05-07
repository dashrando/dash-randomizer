'use client'

import * as Tabs from '@radix-ui/react-tabs'
import styles from './tab.module.css'

export type TabInputItem = {
  title: string
  content: React.ReactNode
  key?: string
}

export interface TabItem extends TabInputItem {
  key: string
}

export type TabProps = {
  items: TabItem[]
}

export default (props: any) => {
  const items = props.items.map((item: TabItem) => {
    item.key = item.title.toLowerCase()
    return item
  })
  return (
    <Tabs.Root defaultValue={props.items[0].key}>
      <Tabs.List className={styles.list}>
        {items.map((item: TabItem) => (
          <Tabs.Trigger key={item.key} value={item.key} className={styles.btn}>
            {item.title}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {items.map((item: TabItem) => (
        <Tabs.Content key={item.key} value={item.key}>
          {item.content}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  )
}
