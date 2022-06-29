import React from "react";
import styled from "styled-components";
import { Menu, Item } from "react-contexify";
import Icon, { Sizes } from "./icon";

export type ContextMenuItems = {
  name: string;
  icon?: string;
  handler: (options: any) => any;
};

type PropsType = {
  id: string;
  menuItems: ContextMenuItems[];
};

const StyledMenu = styled(Menu)`
  background: ${(props) => props.theme.colors.bg_secondary};
  border: 1px solid ${(props) => props.theme.colors.border};
  font-family: ${(props) => props.theme.components.font_default};

  & {
    .react-contexify__item__content {
      font-size: 14px;
      font-weight: 500;
      color: ${(props) => props.theme.colors.font_primary}!important;
    }
  }
`;

const MenuItemWrapper = styled(Item)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 10px;
  padding-bottom: 5px;
  width: 100%;

  & {
    :hover {
      color: ${(props) => props.theme.colors.primary}!important;

      & > .react-contexify__item__content {
        background: transparent !important;
        color: ${(props) => props.theme.colors.primary}!important;
      }
    }

    .icon {
      padding-top: 3px;
      padding-right: 10px;
    }
  }
`;

export default function ContextMenu(props: PropsType) {
  const { id, menuItems } = props;

  const renderMenuItems = (items: ContextMenuItems[]) => {
    return items.map((item: ContextMenuItems) => {
      return (
        <MenuItemWrapper key={item.name} onClick={item.handler} id={"dummy"}>
          {item.icon && <Icon name={item.icon} size={Sizes.XL} />}
          <span>{item.name}</span>
        </MenuItemWrapper>
      );
    });
  };

  return <StyledMenu id={id}>{renderMenuItems(menuItems)}</StyledMenu>;
}
