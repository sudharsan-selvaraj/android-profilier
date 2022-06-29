import React, { useCallback } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { getSelectedTheme } from "../../../store/selectors/ui/theme-selector";

const Container = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.div`
  color: ${(props) => props.theme.colors.font_secondary}!important;
  font-size: 14px;
`;

export type RichInputProps = {
  defaultValue: string;
  onChange: (value: string) => any;
  label?: string;
  name?: string;
  height?: string;
};

export default function RichInput(props: RichInputProps) {
  const { defaultValue, onChange, label, height } = props;
  const theme = useSelector(getSelectedTheme);

  const onChangeCallback = useCallback((value) => {
    onChange(value);
  }, []);

  return (
    <Container>
      {!!label && <Label>{label}</Label>}
      <CodeMirror
        theme={theme.isDark ? "dark" : "light"}
        value={
          typeof defaultValue === "object"
            ? JSON.stringify(defaultValue, null, 2)
            : defaultValue
        }
        onChange={onChangeCallback}
        color={theme.colors.font_primary as string}
        height={height}
        extensions={[javascript()]}
      />
    </Container>
  );
}
