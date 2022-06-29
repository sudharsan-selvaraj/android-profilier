import React, { useState } from "react";
import styled from "styled-components";
import Icon, { Sizes } from "../atoms/icon";
import FlexContainer from "../layouts/flex-container";
import { NavLink } from "react-router-dom";
import ThemeSwitch from "../molecules/theme-switch";

const EXPANDED_WIDTH = 220;
const COLLAPSED_WIDTH = 70;

const Container = styled.div<{ width: number }>`
  border-right: 1px solid ${(props) => props.theme.colors.border};
  width: ${(props) => props.width + "px"};
  height: 100%;
  position: relative;
  transition: width 1s;
  background: ${(props) => props.theme.components.bg_secondary};
  display: flex;
  justify-items: center;
`;

const NavMenuContainer = styled.div`
  position: absolute;
  top: 20%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-contents: center;
`;

const NavFooter = styled(NavMenuContainer)`
  bottom: 10%;
  top: unset;
`;

const NavMenuItem = styled(NavLink)<{ active?: boolean }>`
  color: ${(props) => props.theme.components.navbar_menu_icon_default_color};
  margin: 10px 0 10px 0;
  cursor: pointer;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 5px 0 5px 0;

  .icon {
    padding-left: 25px;
  }

  &.active {
    border-right: 3px solid ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.primary};

    .icon {
      color: ${(props) => props.theme.colors.primary};
    }
  }

  @keyframes fade_in_show {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }
`;

const ExpandIcon = styled.div<{ expanded: boolean }>`
  position: absolute;
  top: 20px;
  right: -10px;
  height: 20px;
  width: 20px;
  border: 2px solid ${(props) => props.theme.colors.border};
  background: ${(props) => props.theme.components.navbar_expand_icon_bg};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  & .icon {
    color: ${(props) => props.theme.colors.primary};
    margin: 3px 2px 0 0;
  }
`;

const NavMenu = styled.div<{ hide: boolean }>`
  font-weight: 600;
  display: ${(props) => (props.hide ? "none" : "block")};
  animation: fade_in_show 1.5s;
  padding-left: 20px;
  font-size: 14px;
`;

const LogoContainer = styled(FlexContainer)`
  margin: 20px 10px;
  align-self: flex-start;
`;

const LogoIcon = styled.div`
  height: 40px;
  width: 40px;
  background: ${(props) => props.theme.colors.primary};
  border-radius: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: 500;
  font-size: 20px;
  flex-shrink: 0;
`;

const LogoText = styled.div<{ hide: boolean }>`
  color: ${(props) => props.theme.colors.primary};
  font-weight: 700;
  font-size: 18px;
  margin-left: 10px;
  display: ${(props) => (props.hide ? "none" : "block")};
  animation: fade_in_show 2s;
`;

const menuItems = [
  {
    icon: "chart",
    tooltip: "Sessions",
    path: "/sessions",
  },
  {
    icon: "mobile",
    tooltip: "Devices",
    path: "/devices",
  },
];

export default function NavBar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const getMenuItems = () => {
    return menuItems.map((menu, index) => (
      <NavMenuItem
        to={menu.path}
        key={index}
        className={(isActive) => (isActive ? "active" : "inactive")}
      >
        <Icon
          name={menu.icon}
          size={Sizes.XXL}
          tooltip={menu.tooltip}
          tooltipPosition="right"
        />
        <NavMenu hide={!isExpanded}>{menu.tooltip}</NavMenu>
      </NavMenuItem>
    ));
  };

  return (
    <Container width={isExpanded ? EXPANDED_WIDTH : COLLAPSED_WIDTH}>
      <LogoContainer>
        <LogoIcon>PR</LogoIcon>
        <LogoText hide={!isExpanded}>App Profiler</LogoText>
      </LogoContainer>
      <ExpandIcon
        expanded={isExpanded}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <Icon
          name={isExpanded ? "chevron-left" : "chevron-right"}
          size={Sizes.XL}
          tooltip={isExpanded ? "Collapse" : "Expand"}
          tooltipPosition="bottom"
        />
      </ExpandIcon>
      <NavMenuContainer>{getMenuItems()}</NavMenuContainer>
      <NavFooter>
        <ThemeSwitch />
      </NavFooter>
    </Container>
  );
}
