import { Tooltip } from "@mui/material";
import React from "react";
import styled from "styled-components";
import FlexContainer from "../layouts/flex-container";

const Container = styled(FlexContainer)<{ disabled: boolean }>`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background: ${(props) => props.theme.colors.primary};
  align-content: center;
  -webkit-box-shadow: 8px 8px 18px -8px rgba(77, 74, 77, 1);
  -moz-box-shadow: 8px 8px 18px -8px rgba(77, 74, 77, 1);
  box-shadow: 8px 8px 18px -8px rgba(77, 74, 77, 1);
  cursor: ${(props) => (props.disabled ? "" : "pointer")};
`;

const Label = styled.span`
  color: ${(props) => props.theme.colors.font_white};
  font-weight: 600;
  font-size: 24px;
`;

type PropsType = {
  disabled?: boolean;
  tooltip?: string;
  onClick?: () => any;
};

export default function CreateNewButton(props: PropsType) {
  const { disabled = false, tooltip = "", onClick } = props;
  return (
    <Tooltip
      title={tooltip}
      placement={"top"}
      arrow
      classes={{
        tooltip: "custom-tooltip-container",
        arrow: "custom-tooltip-arrow",
      }}
      onClick={onClick}
    >
      <Container disabled={disabled}>
        <Label>+</Label>
      </Container>
    </Tooltip>
  );
}
