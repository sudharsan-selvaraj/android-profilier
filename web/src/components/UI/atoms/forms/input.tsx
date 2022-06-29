import React, { useCallback, useState } from "react";
import { TextField } from "@mui/material";
import styled from "styled-components";
import _ from "lodash";

type ValidatorResult = {
  error: boolean;
  errorMessage: string;
};

type FieldValidator = (
  value: string,
) => ValidatorResult | Promise<ValidatorResult>;

export type FormInputPropsType = {
  label: string;
  id: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  helperText?: string;
  validators?: FieldValidator[];
  name?: string;
  error?: boolean;
};

const StyledTextField = styled(TextField)`
  width: 100%;

  & {
    .MuiFormHelperText-root,
    label,
    label.Mui-focused {
      color: ${(props) => props.theme.colors.font_secondary}!important;
    }

    .Mui-error {
      color: ${(props) => props.theme.colors.error}!important;
    }

    label[data-shrink="false"] {
      line-height: 20px;
    }

    label[data-shrink="true"] {
      font-size: 18px;
    }

    label[data-shrink="false"] {
      font-size: 15px;
    }

    .MuiInput-underline:hover:before,
    .MuiInput-underline:before {
      border-bottom: 1px solid
        ${(props) => props.theme.colors.font_secondary}!important;
    }

    .Mui-focused ~ .MuiInputBase-root:after {
      all: unset;
    }

    input[type="text"] {
      color: ${(props) => props.theme.colors.font_primary};
      font-size: 14px;
      font-weight: 600;
    }
  }
`;

export default function FormInput(props: FormInputPropsType) {
  const {
    label,
    id,
    value,
    onChange,
    validators,
    helperText,
    name,
    error: hasError,
  } = props;
  const [error, setIsError] = useState(false);
  const [errorText, setErrorText] = useState("");

  const onValueChanged = _.debounce(
    useCallback(async (value) => {
      if (validators) {
        for (const validator of validators) {
          const result = await validator(value);
          if (!!result.error) {
            setIsError(true);
            setErrorText(result.errorMessage);
            return;
          }
        }
      }
      setIsError(false);
      onChange && onChange(value);
    }, []),
    300,
  );

  return (
    <StyledTextField
      error={error || hasError}
      fullWidth
      id={id}
      label={label}
      defaultValue={value}
      variant={"standard" as any}
      helperText={error ? errorText : helperText}
      onChange={(e) => onValueChanged(e.target.value)}
      name={name}
    />
  );
}
