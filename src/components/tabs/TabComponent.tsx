import React from "react";
import { TabBar, Tab } from "@dhis2/ui";
import styles from './TabComponent.module.css'
import WithPadding from "../template/WithPadding";
import { TabComponentProps } from "../../types/tab/TabProps";

function TabComponent(props: TabComponentProps): React.ReactElement {
  const { tabsElements, selectedTab, onTabClick } = props

  return (
    <TabBar className={styles.tab} fixed>
      {tabsElements?.map((element, i) => (
        <Tab
          key={i}
          onClick={() => onTabClick(element)}
          selected={selectedTab === element.value}
        >
          <WithPadding p="5px">{element.name} </WithPadding>
        </Tab>
      ))}
    </TabBar>
  );
}

export default TabComponent;