import { useTlDesignApp } from '@/hooks/useTlDesignApp'
import { Tabs } from 'antd'
import React from 'react'
import styled from 'styled-components'

const StyledSidebar = styled.div`
  .ant-tabs-left {
    & > .ant-tabs-nav {
      .ant-tabs-tab {
        padding: 4px 18px;
      }
    }
  }
`

export function Sidebar() {
  const app = useTlDesignApp()
  const { sections } = app
  const {
    appState: { currentSectionName }
  } = app.useStore()

  const sectionList = Array.from(sections.values())

  const onTabChange = React.useCallback((key: string) => {
    app.selectSection(key)
  }, [])

  return (
    <StyledSidebar>
      <Tabs
        tabPosition="left"
        activeKey={currentSectionName}
        onChange={onTabChange}
        items={sectionList.map((section) => ({
          key: section.name,
          label: <section.Tab></section.Tab>
        }))}
      ></Tabs>
    </StyledSidebar>
  )
}
