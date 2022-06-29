import React from "react";
import FormInput from "./input";
import { useForm, Controller } from "react-hook-form";
import FormGroup from "./form-group";
import FormDropDown from "./dropdown";
import RichInput from "../rich-input";

interface FormItemType {
  type: "input" | "dropdown" | "rich-input";
  name: string;
  label: string;
  id?: string;
  rules?: {
    required?: boolean | string;
    validate?: Record<
      string,
      (data: any, allValues: Record<string, any>) => string | void
    >;
  };
}

export interface FormInputType extends FormItemType {
  helpText: string;
}

export interface FormRichInputType extends FormInputType {
  height?: string;
}

export interface FormDropDownType extends FormItemType {
  options: Array<{ value: any; label: any }>;
  placeholder: string;
}

export type FormItem = FormDropDownType | FormInputType;

interface FormPropstype<T> {
  id: string;
  items: FormItem[];
  onSubmit: (data: T) => void;
  defaultValue?: Record<string, any>;
  watchValues?: Array<string>;
  onFormChanged?: (args: any) => void;
}

export default function Form<T>(props: FormPropstype<T>) {
  const { items, id, onSubmit, defaultValue = {} } = props;

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: defaultValue,
  });

  const getValidators = (field: FormItem) => {
    const validators: Record<
      string,
      (data: any, allValues: Record<string, any>) => string | void
    > = {};
    if (field.rules && field.rules.validate) {
      for (const [name, _method] of Object.entries(field.rules.validate)) {
        validators[name] = (value: string) => {
          return _method(value, getValues());
        };
      }
    }
    return validators;
  };

  const renderFields = () => {
    return items.map((field: FormItem) => {
      let f: any;

      switch (field.type) {
        case "input":
          f = field as FormInputType;

          return (
            <Controller
              key={f.name}
              name={f.name}
              control={control}
              rules={{
                ...f.rules,
                validate: {
                  ...getValidators(f),
                },
              }}
              render={({ field }) => (
                <FormInput
                  id={f.id}
                  label={f.label}
                  helperText={
                    !!errors[f.name] ? errors[f.name].message : f.helpText
                  }
                  name={f.name}
                  onChange={field.onChange}
                  error={!!errors[f.name]}
                  value={defaultValue?.[f.name]}
                />
              )}
            />
          );
        case "dropdown":
          f = field as FormDropDownType;
          return (
            <Controller
              key={f.name}
              name={f.name}
              control={control}
              rules={{
                ...f.rules,
                validate: {
                  ...getValidators(f),
                },
              }}
              render={({ field }) => (
                <FormDropDown
                  placeholder={f.placeholder}
                  options={f.options}
                  onChange={(data) => field.onChange(data?.value)}
                  defaultValue={defaultValue?.[f.name]}
                />
              )}
            />
          );
        case "rich-input":
          f = field as FormRichInputType;
          return (
            <Controller
              key={f.name}
              name={f.name}
              control={control}
              rules={{
                ...f.rules,
                validate: {
                  ...getValidators(f),
                },
              }}
              render={({ field }) => (
                <RichInput
                  label={f.label}
                  onChange={field.onChange}
                  defaultValue={defaultValue?.[f.name]}
                  height={f.height}
                />
              )}
            />
          );
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit((data: any) => {
        const changedFields = {} as any;
        Object.keys(data).forEach((k) => {
          if (defaultValue?.[k] != data[k]) {
            changedFields[k] = data[k];
          }
        });
        onSubmit(changedFields);
      })}
      id={id}
    >
      <FormGroup>{renderFields()}</FormGroup>
    </form>
  );
}
