type TabElement = {
    key?: string;
    name: string;
    value: string;
}

interface TabComponentProps {
    selectedTab: string;
    tabsElements: TabElement[];
    onTabClick: (value: TabElement) => void;
}

export { TabComponentProps }