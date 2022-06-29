import React from "react";
import { useSelector } from "react-redux";
import Select, { components } from "react-select";
import styled from "styled-components";
import { getSelectedTheme } from "../../../../store/selectors/ui/theme-selector";

export type DropdownPropsType = {
  width?: string;
  placeholder: string;
  options: Array<{ value: string | number; label: string }>;
  onChange: (option: any) => void;
  defaultValue?: any;
};

const SytledSelect = styled(Select)<{ width?: string }>`
  width: ${(props) => (props.width ? props.width : "100%")};
  font-family: inherit;
  font-weight: 400;
  font-size: 14px;
  cursor: pointer !important;
`;

const OptionsSubLabel = styled.div`
  font-size: 12px;
  color: ${(props) => props.theme.colors.font_secondary};
`;

const Option = (props: any) => {
  return (
    <components.Option {...props}>
      <div>{props.data.label}</div>
      {props.data.subLabel && (
        <OptionsSubLabel>{props.data.subLabel}</OptionsSubLabel>
      )}
    </components.Option>
  );
};

export default function FormDropDown(props: DropdownPropsType) {
  const { placeholder, options, onChange, defaultValue, width } = props;
  const theme = useSelector(getSelectedTheme);

  return (
    <SytledSelect
      width={width}
      components={{ Option }}
      isClearable
      options={options}
      placeholder={placeholder}
      onChange={onChange}
      className="basic-single"
      defaultValue={options.find(
        (o: { label: string; value: any }) => o.value == defaultValue,
      )}
      styles={{
        option: (styles, { isDisabled, isFocused, isSelected }) => {
          return {
            ...styles,
            backgroundColor: isSelected
              ? theme.components.table_row_hover
              : isFocused
              ? (theme.components.table_row_hover as any)
              : undefined,
            cursor: isDisabled ? "not-allowed" : "pointer",
            color: theme.components.font_primary as any,
          };
        },
        control: (styles, { isDisabled }) => {
          return {
            ...styles,
            cursor: isDisabled ? "not-allowed" : "pointer",
            border: `1px solid ${theme.colors.border}`,
            backgroundColor: `${theme.colors.bg_primary}`,
            fontWeight: "600",
            fontSize: "14px",
            ":hover": {
              border: `1px solid ${theme.colors.border}`,
            },
          };
        },
        menu: (styles) => {
          return {
            ...styles,
            backgroundColor: `${theme.colors.bg_primary}`,
            border: `1px solid ${theme.colors.border}`,
          };
        },
        menuList: (styles) => {
          return {
            ...styles,
            maxHeight: "150px",
          };
        },
        singleValue: (styles) => {
          return {
            ...styles,
            color: theme.components.font_primary as any,
          };
        },
      }}
      theme={(_theme: any) => ({
        ..._theme,
        borderRadius: 0,
        colors: {
          ..._theme.colors,
          primary: theme.components.primary as any,
          primary25: theme.components.primary as any,
        },
      })}
    />
  );
}
