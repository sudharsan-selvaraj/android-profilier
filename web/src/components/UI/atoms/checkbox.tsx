import React from "react";
import styled from "styled-components";
import { Checkbox, Classes } from "@blueprintjs/core";

const Container = styled.div`
  & .${Classes.CONTROL_INDICATOR} {
    width: 10px;
    display: inline-block;
  }

  & {
    input {
      position: relative;
      top: 2px;
      accent-color: ${(props) => props.theme.colors.primary};
      cursor: pointer;
    }

    .checkbox-label {
      padding: 0 6px;
      border: 1px solid #eee;
    }

    input: checked + .checkbox-label {
      color: #fff;
    }
  }
`;

type PropsType = {
  checked?: boolean;
  label?: string;
  onChange?: (isChecked: boolean) => void;
  disabled?: boolean;
};

export default function CheckboxComponent(props: PropsType) {
  const { checked = false, label, onChange, disabled = false } = props;

  return (
    <Container>
      <Checkbox
        checked={checked}
        label={label}
        disabled={disabled}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          onChange && onChange(event.target.checked)
        }
      />
    </Container>
  );
}
