import { Button } from "@mui/material";
import styled from "styled-components";

export enum Sizes {
  S = "small",
  M = "medium",
  L = "large",
}

const BaseButton = styled(Button)`
  font-family: inherit !important;
  text-transform: none !important;
  font-weight: 600;
`;

const PrimaryButton = styled(BaseButton)`
  background: ${(props) => props.theme.colors.primary}!important;
  & {
    span {
      color: ${(props) => props.theme.colors.font_primary}!important;
    }
  }
`;

PrimaryButton.defaultProps = {
  variant: "contained",
};

const SecondaryButton = styled(BaseButton)`
  background: ${(props) => props.theme.colors.bg_primary}!important;
  border: 1px solid ${(props) => props.theme.colors.primary}!important;
  color: ${(props) => props.theme.colors.primary}!important;
`;

SecondaryButton.defaultProps = {
  variant: "outlined",
};

export { PrimaryButton, SecondaryButton };
