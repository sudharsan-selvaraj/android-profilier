import React from "react";
import { useState } from "react";
import styled from "styled-components";
import Icon, { Sizes } from "../atoms/icon";

const TabsContainer = styled.div``;

type TabPropsType = {
  name: string;
  icon?: string;
  children: JSX.Element | null;
};

export function Tab(props: TabPropsType) {
  const { children } = props;
  return <TabsContainer>{children}</TabsContainer>;
}

export const TAB_HEADER_HEIGHT = 40;

const TabsLayoutContainer = styled.div`
  overflow: auto;
  height: 100%;
  width: 100%;
`;

const Header = styled.div`
  height: ${TAB_HEADER_HEIGHT}px;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const TabHeading = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-bottom: 3px solid
    ${(props) => (props.active ? props.theme.colors.primary : "transparent")};
  cursor: ${(props) => (props.active ? "default" : "pointer")};
  margin: 0 25px 0 15px;
  padding: 0 5px 0 5px;

  & {
    .icon {
      margin-right: 10px;
    }
  }
`;

const TabName = styled.div<{ active: boolean }>`
  font-weight: ${(props) => (props.active ? "900" : "400")};
  font-size: 14px;
  text-align: center;
`;

const Body = styled.div``;

type TabType = TabPropsType;

const useTabs = (children: JSX.Element[]) => {
  const tabs: TabType[] = [];
  React.Children.forEach(children, (children) => {
    if (children) {
      const props: TabType = children.props as TabType;

      tabs.push({
        name: props.name,
        children: props.children,
        icon: props.icon,
      });
    }
  });

  return tabs;
};

type TabsLayoutPropsType = {
  selected: string;
  children: JSX.Element[];
};

export default function TabsLayout(props: TabsLayoutPropsType) {
  const { selected } = props;
  const tabs = useTabs(props.children);
  const defaultTab = tabs.find((tab) => tab.name === selected);
  const [selectedTabName, setSelectedTabName] = useState<string | undefined>(
    defaultTab?.name,
  );
  const selectedTab =
    tabs.find((tab) => tab.name === selectedTabName) || tabs[0];

  return (
    <TabsLayoutContainer className="tab-container">
      <Header>
        {tabs.map((tab: TabType) => (
          <TabHeading
            active={selectedTab?.name === tab.name}
            onClick={() => setSelectedTabName(tab.name)}
            key={tab.name}
            className="tab-header"
          >
            {tab.icon && <Icon name={tab.icon} size={Sizes.XL} />}
            <TabName
              active={selectedTab?.name === tab.name}
              className="tab-header-name"
            >
              {tab.name}
            </TabName>
          </TabHeading>
        ))}
      </Header>
      <Body className="tab-body">{selectedTab?.children}</Body>
    </TabsLayoutContainer>
  );
}
